"""Measures how far a GLB's skinned animation drifts from the pose Blender evaluates.

Skins the GLB by hand with the same linear blend skinning three.js uses, then compares
every vertex with the evaluated Blender mesh at sampled frames of each clip.

Usage (Blender 5.2):
  blender --background --disable-autoexec CapyBaraRigged.blend \
    --python scripts/blender/verify_skinning.py -- public/models/capybara.glb

The .blend is never saved.
"""
import json
import struct
import sys

import bpy
import numpy as np
from mathutils.kdtree import KDTree

COMPONENT_TYPES = {5120: "b", 5121: "B", 5122: "h", 5123: "H", 5125: "I", 5126: "f"}
TYPE_SIZES = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4, "MAT4": 16}
SAMPLES_PER_CLIP = 8

path = sys.argv[sys.argv.index("--") + 1]
with open(path, "rb") as file:
    blob = file.read()
json_length = struct.unpack_from("<I", blob, 12)[0]
gltf = json.loads(blob[20:20 + json_length])
binary_start = 20 + json_length + 8


def accessor(index):
    info = gltf["accessors"][index]
    view = gltf["bufferViews"][info["bufferView"]]
    size = TYPE_SIZES[info["type"]]
    data = np.frombuffer(
        blob,
        dtype=np.dtype(COMPONENT_TYPES[info["componentType"]]).newbyteorder("<"),
        count=info["count"] * size,
        offset=binary_start + view.get("byteOffset", 0) + info.get("byteOffset", 0),
    ).astype(np.float64)
    if info.get("normalized"):
        data = data / np.iinfo(np.dtype(COMPONENT_TYPES[info["componentType"]])).max
    return data.reshape(info["count"], size) if size > 1 else data


def compose(translation, rotation, scale):
    x, y, z, w = rotation / np.linalg.norm(rotation)
    r = np.array([
        [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
        [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
        [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
    ])
    matrix = np.eye(4)
    matrix[:3, :3] = r * scale
    matrix[:3, 3] = translation
    return matrix


def bind_trs(node):
    return {
        "translation": np.array(node.get("translation", [0, 0, 0]), dtype=float),
        "rotation": np.array(node.get("rotation", [0, 0, 0, 1]), dtype=float),
        "scale": np.array(node.get("scale", [1, 1, 1]), dtype=float),
    }


parents = {}
for index, node in enumerate(gltf["nodes"]):
    for child in node.get("children", []):
        parents[child] = index


def skinned_positions(animation, seconds):
    trs = [bind_trs(node) for node in gltf["nodes"]]
    for channel in animation["channels"]:
        sampler = animation["samplers"][channel["sampler"]]
        times = accessor(sampler["input"])
        values = accessor(sampler["output"])
        target = channel["target"]
        key = int(np.argmin(np.abs(times - seconds)))
        trs[target["node"]][target["path"]] = values[key]

    world = {}

    def world_matrix(index):
        if index not in world:
            local = compose(**trs[index])
            world[index] = world_matrix(parents[index]) @ local if index in parents else local
        return world[index]

    skin = gltf["skins"][0]
    inverse_binds = accessor(skin["inverseBindMatrices"]).reshape(-1, 4, 4).transpose(0, 2, 1)
    joints = np.stack([world_matrix(j) @ ib for j, ib in zip(skin["joints"], inverse_binds)])

    output = []
    for primitive in gltf["meshes"][0]["primitives"]:
        attributes = primitive["attributes"]
        positions = accessor(attributes["POSITION"])
        indices = accessor(attributes["JOINTS_0"]).astype(int)
        weights = accessor(attributes["WEIGHTS_0"])
        homogeneous = np.c_[positions, np.ones(len(positions))]
        blended = np.zeros_like(homogeneous)
        for influence in range(4):
            matrices = joints[indices[:, influence]]
            blended += weights[:, influence, None] * np.einsum("nij,nj->ni", matrices, homogeneous)
        output.append(blended[:, :3])
    return np.concatenate(output)


mesh_object = bpy.data.objects["Capybara"]
rig = bpy.data.objects["rig"]
scene = bpy.context.scene
scene.render.fps_base = 1
fps = scene.render.fps

for track in rig.animation_data.nla_tracks:
    track.mute = True

report = {}
for animation in gltf["animations"]:
    action = bpy.data.actions[animation["name"]]
    rig.animation_data.action = action
    rig.animation_data.action_slot = action.slots[0]
    first, last = (int(frame) for frame in action.frame_range)

    worst = 0.0
    for frame in np.linspace(first, last, SAMPLES_PER_CLIP).astype(int):
        scene.frame_set(int(frame))
        evaluated = mesh_object.evaluated_get(bpy.context.evaluated_depsgraph_get())
        mesh = evaluated.to_mesh()
        tree = KDTree(len(mesh.vertices))
        for index, vertex in enumerate(mesh.vertices):
            tree.insert(mesh_object.matrix_world @ vertex.co, index)
        tree.balance()

        points = skinned_positions(animation, frame / fps)
        # glTF is Y-up, Blender is Z-up.
        distances = [tree.find((x, -z, y))[2] for x, y, z in points]
        worst = max(worst, float(np.max(distances)))
        evaluated.to_mesh_clear()
    report[animation["name"]] = worst

size = float(np.ptp(np.array([v.co for v in mesh_object.data.vertices]), axis=0).max())
print("SKINDRIFT", json.dumps({k: {"max": round(v, 4), "percent_of_model": round(100 * v / size, 2)} for k, v in report.items()}))
