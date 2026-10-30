const SYNODIC_MONTH_DAYS = 29.530588853;
const DAY_MS = 86_400_000;
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

const PHASES = [
  'new',
  'waxingCrescent',
  'firstQuarter',
  'waxingGibbous',
  'full',
  'waningGibbous',
  'lastQuarter',
  'waningCrescent',
];

export function getMoonPhase(date) {
  const elapsedDays = (date.getTime() - REFERENCE_NEW_MOON) / DAY_MS;
  const age = ((elapsedDays % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;
  const cycle = age / SYNODIC_MONTH_DAYS;

  return {
    key: PHASES[Math.round(cycle * PHASES.length) % PHASES.length],
    illumination: (1 - Math.cos(cycle * 2 * Math.PI)) / 2,
    waxing: cycle < 0.5,
  };
}

// SVG path of the lit side of a moon of radius r centered on the origin.
export function getLitPath({ illumination, waxing }, r) {
  const terminatorWidth = r * Math.abs(1 - 2 * illumination);
  const outerSweep = waxing ? 1 : 0;
  const terminatorSweep = illumination < 0.5 ? 1 - outerSweep : outerSweep;

  return `M 0 ${-r} A ${r} ${r} 0 0 ${outerSweep} 0 ${r} A ${terminatorWidth} ${r} 0 0 ${terminatorSweep} 0 ${-r} Z`;
}

export function formatCalendarDate(date, locale = 'en-US') {
  const weekday = date.toLocaleDateString(locale, { weekday: 'short' }).replace('.', '').toUpperCase();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return locale === 'pt-BR' ? `${day}/${month} ${weekday}` : `${month}/${day} ${weekday}`;
}
