import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';

const REVEAL_MS = 1800;

function DarkHourReveal() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), REVEAL_MS);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="dark-hour-reveal pointer-events-none fixed inset-0 z-60 flex flex-col items-center justify-center bg-abyss/85 text-center"
    >
      <p className="font-label text-2xl font-bold tracking-[0.4em] text-aqua">00:00</p>
      <p className="title-slant mt-2 font-display text-6xl text-foam uppercase md:text-8xl">{t.darkHour.title}</p>
      <p className="mt-4 font-label text-xl tracking-wide text-mist">{t.darkHour.subtitle}</p>
    </div>
  );
}

export default DarkHourReveal;
