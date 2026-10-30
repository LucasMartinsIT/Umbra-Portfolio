"""Exports Love-chan with her skeleton, which is hidden in the .blend.

Usage (Blender 5.2):
  blender --background --disable-autoexec LowPolyCharacter6.blend \
    --python scripts/blender/export_love_chan.py -- public/models/love-chan.glb

The .blend is never saved.
"""
import sys

import bpy

out = sys.argv[sys.argv.index("--") + 1]

rig = bpy.data.objects["rig"]
rig.hide_set(False)
rig.hide_viewport = False

bpy.ops.export_scene.gltf(
    filepath=out,
    export_format="GLB",
    use_visible=True,
    export_def_bones=True,
    export_animations=False,
    export_cameras=False,
    export_lights=False,
)
