"""Bakes the hand-painted Ucupaint layers of the watermelon slice and exports a GLB.

glTF cannot carry layered node graphs, so the painted result is flattened into one
1K texture and exported as emission, which keeps the painted shading unaffected by
scene lights.

Usage (Blender 5.2):
  blender --background --disable-autoexec Watermelon.blend \
    --python scripts/blender/bake_watermelon.py -- public/models/watermelon.glb

The .blend is never saved.
"""
import os
import sys
import tempfile

import bpy

BAKE_SIZE = 1024

out = sys.argv[sys.argv.index("--") + 1]

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 16

slice_object = bpy.data.objects["Cube"]
material = slice_object.active_material
nodes = material.node_tree.nodes
links = material.node_tree.links

# The painted layers feed the Emission output; bake exactly what that output shows.
for node in nodes:
    if node.bl_idname == "ShaderNodeOutputMaterial":
        node.is_active_output = node.name == "Material Output.001"

baked = bpy.data.images.new("WatermelonBaked", BAKE_SIZE, BAKE_SIZE, alpha=False)
bake_node = nodes.new("ShaderNodeTexImage")
bake_node.image = baked
nodes.active = bake_node

for scene_object in bpy.context.view_layer.objects:
    scene_object.select_set(False)
bpy.context.view_layer.objects.active = slice_object
slice_object.select_set(True)
bpy.ops.object.bake(type="EMIT", margin=8)

# Pixels must be written to disk before the exporter can embed them as PNG.
baked_path = os.path.join(tempfile.gettempdir(), "watermelon_baked.png")
baked.filepath_raw = baked_path
baked.file_format = "PNG"
baked.save()

bsdf = nodes["Principled BSDF"]
bsdf.inputs["Base Color"].default_value = (0, 0, 0, 1)
for link in list(bsdf.inputs["Base Color"].links):
    links.remove(link)
links.new(bake_node.outputs["Color"], bsdf.inputs["Emission Color"])
bsdf.inputs["Emission Strength"].default_value = 1
bsdf.inputs["Roughness"].default_value = 1
for node in nodes:
    if node.bl_idname == "ShaderNodeOutputMaterial":
        node.is_active_output = node.name == "Material Output"

bpy.ops.export_scene.gltf(
    filepath=out,
    export_format="GLB",
    use_selection=True,
    export_animations=False,
    export_cameras=False,
    export_lights=False,
)

mesh = slice_object.evaluated_get(bpy.context.evaluated_depsgraph_get()).to_mesh()
mesh.calc_loop_triangles()
print(f"STATS tris={len(mesh.loop_triangles)} verts={len(mesh.vertices)}")
