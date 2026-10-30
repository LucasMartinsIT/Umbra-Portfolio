import { useEffect, useMemo, useState } from 'react';
import DarkHourReveal from '../components/DarkHourReveal';
import { isDarkHourTime } from '../lib/darkHour';
import { DarkHourContext } from './useDarkHour';

const CLOCK_CHECK_MS = 30_000;
const GALLERY_ID = 'gallery-3d';
// The gallery counts once it crosses the middle band of the viewport, not on first pixel.
const GALLERY_BAND = '-35% 0px -35% 0px';

function DarkHourProvider({ children }) {
  const [clockActive, setClockActive] = useState(() => isDarkHourTime(new Date()));
  const [galleryActive, setGalleryActive] = useState(false);
  const [manualChoice, setManualChoice] = useState(null);
  const active = manualChoice ?? (clockActive || galleryActive);

  // The full-screen reveal would interrupt scrolling, so the gallery only shifts the palette.
  const showReveal = manualChoice === true || (manualChoice === null && clockActive);

  useEffect(() => {
    const interval = setInterval(() => setClockActive(isDarkHourTime(new Date())), CLOCK_CHECK_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setGalleryActive(entry.isIntersecting), {
      rootMargin: GALLERY_BAND,
    });
    observer.observe(document.getElementById(GALLERY_ID));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute('data-theme', active);
    if (active) document.documentElement.dataset.theme = 'dark-hour';
  }, [active]);

  const value = useMemo(() => ({ active, toggle: () => setManualChoice(!active) }), [active]);

  return (
    <DarkHourContext.Provider value={value}>
      {children}
      {showReveal && <DarkHourReveal />}
    </DarkHourContext.Provider>
  );
}

export default DarkHourProvider;
