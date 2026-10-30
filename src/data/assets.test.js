// @vitest-environment node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { describe, expect, it } from 'vitest';
import { MODELS, PROJECTS, RESUMES } from './portfolio';

const PUBLIC_DIR = join(process.cwd(), 'public');
const MAX_MODEL_BYTES = 2 * 1024 * 1024;
const MAX_LOCAL_MEDIA_BYTES = 8 * 1024 * 1024;

// Waiting for Lucas: until then the cards show their styled placeholder.
// Love-chan's inverted-hull outline is a solid black material on purpose.
const OUTLINE_MATERIALS = { loveChan: 'Material' };

function readGlb(file) {
  const buffer = readFileSync(join(PUBLIC_DIR, file));
  const jsonLength = buffer.readUInt32LE(12);
  return JSON.parse(buffer.subarray(20, 20 + jsonLength).toString('utf8'));
}

function countTriangles(glb) {
  return glb.meshes
    .flatMap((mesh) => mesh.primitives)
    .reduce((total, primitive) => total + glb.accessors[primitive.indices].count / 3, 0);
}

describe.each(MODELS.map((model) => [model.id, model]))('model %s', (_, model) => {
  const glb = readGlb(model.file);

  it('stays within the download budget', () => {
    expect(statSync(join(PUBLIC_DIR, model.file)).size).toBeLessThan(MAX_MODEL_BYTES);
  });

  it('embeds its data instead of pointing at external files', () => {
    expect(glb.images?.every((image) => !image.uri) ?? true).toBe(true);
    expect(glb.buffers.every((buffer) => !buffer.uri)).toBe(true);
  });

  it('has a texture on every material, so nothing renders blank', () => {
    expect(glb.materials.length).toBeGreaterThan(0);
    const painted = glb.materials.filter((material) => material.name !== OUTLINE_MATERIALS[model.id]);
    painted.forEach((material) => {
      const texture =
        material.pbrMetallicRoughness?.baseColorTexture ?? material.emissiveTexture;
      expect(texture, material.name).toBeDefined();
    });
  });

  it('shows the real triangle count', () => {
    expect(countTriangles(glb)).toBe(model.tris);
  });

  it('declares a rig only when the file has one', () => {
    expect(Boolean(glb.skins?.length)).toBe(model.rigged);
  });

  it('lists only animation clips that exist in the file', () => {
    const clips = (glb.animations ?? []).map((animation) => animation.name);
    (model.animations ?? []).forEach(({ clip }) => expect(clips).toContain(clip));
  });
});

describe('public assets', () => {
  it('has no orphan model files', () => {
    const listed = MODELS.map((model) => model.file.replace('/models/', '')).sort();
    expect(readdirSync(join(PUBLIC_DIR, 'models')).sort()).toEqual(listed);
  });

  it('ships both resumes in both languages', () => {
    Object.values(RESUMES).flatMap(Object.values).forEach((file) => {
      expect(existsSync(join(PUBLIC_DIR, file)), file).toBe(true);
    });
  });

  it('ships the portrait and the soundtrack', () => {
    expect(existsSync(join(PUBLIC_DIR, 'lucas-suit.png'))).toBe(true);
    expect(existsSync(join(PUBLIC_DIR, 'ambient-jazz.mp3'))).toBe(true);
  });

  it('keeps removed models out of the gallery', () => {
    const ids = MODELS.map((model) => model.id);
    expect(ids).not.toContain('rocket');
    expect(ids).not.toContain('cone');
  });
});

describe('project media', () => {
  it('gives every project a media entry', () => {
    PROJECTS.forEach((project) => expect(project.media?.src, project.id).toBeTruthy());
  });

  it('only references local files that exist and stay light', () => {
    PROJECTS.map((project) => project.media.src)
      .filter((src) => src.startsWith('/'))
      .forEach((src) => {
        expect(existsSync(join(PUBLIC_DIR, src)), src).toBe(true);
        expect(statSync(join(PUBLIC_DIR, src)).size).toBeLessThan(MAX_LOCAL_MEDIA_BYTES);
      });
  });

  it('serves remote media over https', () => {
    PROJECTS.map((project) => project.media.src)
      .filter((src) => !src.startsWith('/'))
      .forEach((src) => expect(src).toMatch(/^https:\/\//));
  });
});

describe('capybara', () => {
  // Exporting the Rigify rig directly tore the front legs: only a flat baked skeleton is safe.
  it('ships a flat skeleton so no joint depends on a dropped Rigify bone', () => {
    const glb = readGlb('/models/capybara.glb');
    const joints = new Set(glb.skins[0].joints);
    joints.forEach((joint) => {
      expect(glb.nodes[joint].children?.filter((child) => joints.has(child)) ?? []).toEqual([]);
    });
  });

  it('animates every joint in every clip', () => {
    const glb = readGlb('/models/capybara.glb');
    glb.animations.forEach((animation) => {
      const animated = new Set(animation.channels.map((channel) => channel.target.node));
      expect(animated.size).toBe(glb.skins[0].joints.length);
    });
  });

  it('exposes all four gameplay animations', () => {
    const capybara = MODELS.find((model) => model.id === 'capybara');
    expect(capybara.animations.map((animation) => animation.labelKey)).toEqual(['idle', 'run', 'jump', 'slide']);
  });
});
