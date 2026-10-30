import { describe, expect, it } from 'vitest';
import { formatCalendarDate, getLitPath, getMoonPhase } from './moonPhase';

describe('getMoonPhase', () => {
  it('recognizes the full moon of the January 2000 lunar eclipse', () => {
    const phase = getMoonPhase(new Date(Date.UTC(2000, 0, 21, 4, 44)));
    expect(phase.key).toBe('full');
    expect(phase.illumination).toBeGreaterThan(0.99);
  });

  it('recognizes the new moon of the April 2024 solar eclipse', () => {
    const phase = getMoonPhase(new Date(Date.UTC(2024, 3, 8, 18, 21)));
    expect(phase.key).toBe('new');
    expect(phase.illumination).toBeLessThan(0.01);
  });

  it('works for dates before the reference new moon', () => {
    const phase = getMoonPhase(new Date(Date.UTC(1999, 11, 22, 17, 31)));
    expect(phase.key).toBe('full');
  });

  it('is waxing before the full moon and waning after it', () => {
    expect(getMoonPhase(new Date(Date.UTC(2024, 3, 15))).waxing).toBe(true);
    expect(getMoonPhase(new Date(Date.UTC(2024, 3, 28))).waxing).toBe(false);
  });
});

describe('getLitPath', () => {
  it('lights the right side while waxing and the left while waning', () => {
    expect(getLitPath({ illumination: 0.5, waxing: true }, 10)).toContain('0 0 1 0 10');
    expect(getLitPath({ illumination: 0.5, waxing: false }, 10)).toContain('0 0 0 0 10');
  });

  it('flips the terminator when a crescent becomes a gibbous', () => {
    const crescent = getLitPath({ illumination: 0.2, waxing: true }, 10);
    const gibbous = getLitPath({ illumination: 0.8, waxing: true }, 10);
    expect(crescent.split('A')[2]).toContain('0 0 0');
    expect(gibbous.split('A')[2]).toContain('0 0 1');
  });

  it('collapses the terminator into a straight line at half moon', () => {
    expect(getLitPath({ illumination: 0.5, waxing: true }, 10).split('A')[2].trim()).toMatch(/^0 10/);
  });
});

describe('formatCalendarDate', () => {
  it('prints month, day and weekday like an in-game calendar', () => {
    expect(formatCalendarDate(new Date(2026, 9, 30))).toBe('10/30 FRI');
  });

  it('uses the day-first Brazilian format in Portuguese', () => {
    expect(formatCalendarDate(new Date(2026, 9, 30), 'pt-BR')).toBe('30/10 SEX');
  });
});
