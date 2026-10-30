import { describe, expect, it } from 'vitest';
import { getStageLighting } from './stageLighting';

describe('getStageLighting', () => {
  it('floods the stage with radioactive green during the Dark Hour', () => {
    const light = getStageLighting(true);

    expect(light.ambient.color).toBe('#26ff00');
    expect(light.key.color).toBe('#26ff00');
    expect(light.floor.intensity).toBeGreaterThan(0);
    expect(light.reflections).toBeLessThan(1);
  });

  it('keeps neutral lighting during the day', () => {
    const light = getStageLighting(false);

    expect(light.key.color).toBe('#ffffff');
    expect(light.floor.intensity).toBe(0);
  });
});
