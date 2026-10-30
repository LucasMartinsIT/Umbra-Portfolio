import { describe, expect, it } from 'vitest';
import en from '../i18n/en';
import { LINKS, PROJECTS, SECTION_IDS } from './portfolio';

describe('portfolio content', () => {
  it('uses unique navigation targets', () => {
    expect(new Set(SECTION_IDS).size).toBe(SECTION_IDS.length);
  });

  it('only links to secure external pages', () => {
    const urls = [LINKS.github, LINKS.linkedin, LINKS.gaiaProtector, ...PROJECTS.flatMap((p) => p.links.map((link) => link.url))];
    urls.forEach((url) => expect(url).toMatch(/^https:\/\//));
  });

  it('gives every project at least one link', () => {
    PROJECTS.forEach((project) => expect(project.links.length, project.id).toBeGreaterThan(0));
  });

  it('features exactly one project', () => {
    expect(PROJECTS.filter((project) => project.featured)).toHaveLength(1);
  });

  it('has no YouTube data', () => {
    expect(JSON.stringify({ LINKS, PROJECTS })).not.toMatch(/youtube/i);
  });

  it('matches the resume on language level and skills', () => {
    const skills = en.skills.groups.flatMap((group) => group.items.map((item) => item.name));
    expect(en.education.languages).toContainEqual({ name: 'English', level: 'Advanced' });
    ['SQL Server', 'MongoDB', 'Firebird', 'Angular', 'Vite', 'Blender 5.2'].forEach((skill) =>
      expect(skills).toContain(skill),
    );
  });
});
