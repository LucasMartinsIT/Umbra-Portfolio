const DARK_HOUR_GREEN = '#26ff00';

const DAY = {
  ambient: { color: '#ffffff', intensity: 0 },
  sky: { color: '#ffffff', ground: '#0b2566', intensity: 1.2 },
  key: { color: '#ffffff', intensity: 1.8 },
  rim: { color: '#2fd6ff', intensity: 2.5 },
  floor: { color: '#2fd6ff', intensity: 0 },
  reflections: 1,
};

const DARK_HOUR = {
  ambient: { color: DARK_HOUR_GREEN, intensity: 0.45 },
  sky: { color: DARK_HOUR_GREEN, ground: '#040803', intensity: 0.7 },
  key: { color: DARK_HOUR_GREEN, intensity: 2.6 },
  rim: { color: '#39ff14', intensity: 3.5 },
  floor: { color: DARK_HOUR_GREEN, intensity: 14 },
  reflections: 0.2,
};

export function getStageLighting(darkHour) {
  return darkHour ? DARK_HOUR : DAY;
}
