"""Exports the rigged capybara and its gameplay animations to GLB.

Two things break a direct export of this rig, and both are handled here:
- The exporter samples the Rigify front legs differently from the poses Blender shows,
  so those joints arrive far from where they should be. Poses are captured from the
  depsgraph and baked onto a clean, constraint-free skeleton of the deform bones.
- Auto weights use up to 12 bones per vertex, but glTF and three.js keep only 4. Each
  vertex is refitted to the 4 bones and weights that best reproduce the captured poses.

Usage (Blender 5.2):
  blender --background --disable-autoexec CapyBaraRigged.blend \
    --python scripts/blender/export_capybara.py -- public/models/capybara.glb

Check the result with verify_skinning.py. The .blend is never saved.
"""
import sys
from itertools import combinations

import bpy
import numpy as np
from mathutils import Matrix

KEPT_ACTIONS = ("Capybara_Idle", "Capybara_run", "Capybara_Jump", "Capybara_Slide")
MAX_INFLUENCES = 4
CANDIDATES_PER_VERTEX = 8
POSES_PER_CLIP = 12

out = sys.argv[sys.argv.index("--") + 1]

mesh_object = bpy.data.objects["Capybara"]
rig = bpy.data.objects["rig"]
scene = bpy.context.scene


def set_action(name):
    action = bpy.data.actions[name]
    rig.animation_data.action = action
    rig.animation_data.action_slot = action.slots[0]
    return tuple(int(frame) for frame in action.frame_range)


def sample_poses(poses_per_clip):
    """Returns skinning matrices (pose, bone, 4, 4) and evaluated vertices (pose, vertex, 3)."""
    bones = [pose_bone for pose_bone in rig.pose.bones if pose_bone.bone.use_deform]
    rests = [np.linalg.inv(np.array(pose_bone.bone.matrix_local)) for pose_bone in bones]
    for track in rig.animation_data.nla_tracks:
        track.mute = True

    matrices, targets = [], []
    for name in KEPT_ACTIONS:
        first, last = set_action(name)
        for frame in np.linspace(first, last, poses_per_clip).astype(int):
            scene.frame_set(int(frame))
            evaluated = mesh_object.evaluated_get(bpy.context.evaluated_depsgraph_get())
            mesh = evaluated.to_mesh()
            coordinates = np.empty(len(mesh.vertices) * 3)
            mesh.vertices.foreach_get("co", coordinates)
            evaluated.to_mesh_clear()
            targets.append(coordinates.reshape(-1, 3))
            matrices.append([np.array(b.matrix) @ rest for b, rest in zip(bones, rests)])
    return [b.name for b in bones], np.array(matrices), np.array(targets)


def solve_weights(normal, moment):
    """Least squares with weights summing to 1. Returns None when a weight goes negative."""
    size = len(moment)
    system = np.zeros((size + 1, size + 1))
    system[:size, :size] = normal
    system[:size, size] = 1
    system[size, :size] = 1
    weights = np.linalg.lstsq(system, np.r_[moment, 1], rcond=None)[0][:size]
    return weights if (weights >= 0).all() else None


def refit_vertex(rest, candidates, matrices, target):
    homogeneous = np.r_[rest, 1]
    basis = np.einsum("pbij,j->pbi", matrices[:, candidates], homogeneous)[:, :, :3]
    basis = basis.transpose(0, 2, 1).reshape(-1, len(candidates))
    goal = target.reshape(-1)
    normal = basis.T @ basis
    moment = basis.T @ goal

    best, best_error = None, np.inf
    for count in range(1, min(MAX_INFLUENCES, len(candidates)) + 1):
        for subset in combinations(range(len(candidates)), count):
            chosen = list(subset)
            weights = solve_weights(normal[np.ix_(chosen, chosen)], moment[chosen])
            if weights is None:
                continue
            error = weights @ normal[np.ix_(chosen, chosen)] @ weights - 2 * weights @ moment[chosen]
            if error < best_error:
                best, best_error = (chosen, weights), error
    return best


def refit_weights():
    names, matrices, targets = sample_poses(POSES_PER_CLIP)
    bone_index = {name: index for index, name in enumerate(names)}
    groups = {group.index: group for group in mesh_object.vertex_groups}

    for vertex in mesh_object.data.vertices:
        influences = sorted(
            ((g.weight, g.group) for g in vertex.groups if groups[g.group].name in bone_index),
            reverse=True,
        )[:CANDIDATES_PER_VERTEX]
        candidates = [bone_index[groups[group].name] for _, group in influences]
        chosen, weights = refit_vertex(
            np.array(vertex.co), candidates, matrices, targets[:, vertex.index]
        )
        for group in groups.values():
            group.remove([vertex.index])
        for position, weight in zip(chosen, weights):
            mesh_object.vertex_groups[names[candidates[position]]].add([vertex.index], float(weight), "REPLACE")


def capture_clips():
    """Returns {clip: {frame: {bone: armature-space matrix}}} from the evaluated rig."""
    bones = [pose_bone for pose_bone in rig.pose.bones if pose_bone.bone.use_deform]
    clips = {}
    for name in KEPT_ACTIONS:
        first, last = set_action(name)
        clips[name] = {}
        for frame in range(first, last + 1):
            scene.frame_set(frame)
            clips[name][frame] = {b.name: b.matrix.copy() for b in bones}
    return clips


def build_clean_skeleton():
    """Creates a flat armature with one bone per deform bone at its rest transform."""
    skeleton = bpy.data.objects.new("Skeleton", bpy.data.armatures.new("Skeleton"))
    scene.collection.objects.link(skeleton)
    bpy.context.view_layer.objects.active = skeleton
    skeleton.select_set(True)

    bpy.ops.object.mode_set(mode="EDIT")
    for bone in rig.data.bones:
        if bone.use_deform:
            edit_bone = skeleton.data.edit_bones.new(bone.name)
            edit_bone.tail = (0, bone.length, 0)
            edit_bone.matrix = bone.matrix_local
    bpy.ops.object.mode_set(mode="OBJECT")
    return skeleton


def bake_clips(skeleton, clips):
    skeleton.animation_data_create()
    for name, frames in clips.items():
        bpy.data.actions.remove(bpy.data.actions[name])
        action = bpy.data.actions.new(name)
        action.use_fake_user = True
        skeleton.animation_data.action = action

        previous = {}
        for frame, poses in frames.items():
            for bone_name, pose in poses.items():
                pose_bone = skeleton.pose.bones[bone_name]
                pose_bone.rotation_mode = "QUATERNION"
                basis = pose_bone.bone.matrix_local.inverted() @ Matrix(pose)
                location, rotation, scale = basis.decompose()
                if bone_name in previous:
                    rotation.make_compatible(previous[bone_name])
                previous[bone_name] = rotation
                pose_bone.location, pose_bone.rotation_quaternion, pose_bone.scale = location, rotation, scale
                for path in ("location", "rotation_quaternion", "scale"):
                    pose_bone.keyframe_insert(path, frame=frame)


refit_weights()
clips = capture_clips()

# Drop single-frame leftovers so only gameplay clips reach the file.
for action in list(bpy.data.actions):
    if action.name not in KEPT_ACTIONS:
        bpy.data.actions.remove(action)

skeleton = build_clean_skeleton()
bake_clips(skeleton, clips)

mesh_object.parent = skeleton
mesh_object.modifiers["Armature"].object = skeleton
bpy.data.objects.remove(rig)
bpy.data.objects.remove(bpy.data.objects["metarig"])

bpy.ops.export_scene.gltf(
    filepath=out,
    export_format="GLB",
    use_visible=True,
    export_def_bones=False,
    export_animations=True,
    export_animation_mode="ACTIONS",
    export_force_sampling=True,
    export_cameras=False,
    export_lights=False,
)
