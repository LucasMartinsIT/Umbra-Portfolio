import { describe, expect, it } from 'vitest';
import { MODELS, PROJECTS } from '../data/portfolio';
import en from './en';
import pt from './pt';

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]));
  }
  return typeof value;
}

describe.each([
  ['en', en],
  ['pt', pt],
])('%s dictionary', (_, t) => {
  it('describes every project and model', () => {
    PROJECTS.forEach(({ id }) => expect(t.projects.items[id], id).toBeDefined());
    MODELS.forEach(({ id }) => expect(t.gallery.models[id], id).toBeDefined());
  });

  it('never states a scholarship percentage', () => {
    expect(JSON.stringify(t)).not.toMatch(/\d+\s*%/);
  });

  it('does not mention YouTube', () => {
    expect(JSON.stringify(t)).not.toMatch(/youtube|skuller/i);
  });

  it('keeps the internal tool at Deeliv, not DP Automação', () => {
    const [dp, deeliv] = t.experience.jobs;
    expect(dp.company).toBe('DP Automação');
    expect(dp.highlights.join()).not.toMatch(/JavaScript/);
    expect(deeliv.company).toBe('Deeliv');
    expect(deeliv.highlights.join()).toMatch(/JavaScript/);
  });
});

describe('dictionaries', () => {
  it('have exactly the same structure', () => {
    expect(shape(pt)).toEqual(shape(en));
  });

  it('are really translated', () => {
    expect(pt.experience.title).not.toBe(en.experience.title);
    expect(pt.education.award.title).toBe('Bolsa de Mérito Acadêmico');
    expect(en.education.award.title).toBe('Academic Merit Scholarship');
  });
});
