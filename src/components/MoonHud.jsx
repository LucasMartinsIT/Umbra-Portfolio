import { useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';
import { formatCalendarDate, getLitPath, getMoonPhase } from '../lib/moonPhase';

const MOON_RADIUS = 10;

function MoonHud({ date: dateProp }) {
  const { t } = useLanguage();
  const [today] = useState(() => new Date());
  const date = dateProp ?? today;
  const phase = getMoonPhase(date);
  const phaseName = t.moon.phases[phase.key];

  return (
    <div className="flex items-center gap-3 font-label uppercase">
      <p className="hidden text-right leading-none sm:block">
        <span className="block text-lg font-bold tracking-wide text-foam">
          {formatCalendarDate(date, t.meta.locale)}
        </span>
        <span className="block text-xs tracking-widest text-aqua">{phaseName}</span>
      </p>
      <svg viewBox="-12 -12 24 24" role="img" aria-label={`${t.moon.label}: ${phaseName}`} className="hidden size-8 min-[375px]:block">
        <circle r={MOON_RADIUS} className="fill-ocean stroke-aqua/50" strokeWidth="1" />
        <path d={getLitPath(phase, MOON_RADIUS)} className="fill-foam" />
      </svg>
    </div>
  );
}

export default MoonHud;
