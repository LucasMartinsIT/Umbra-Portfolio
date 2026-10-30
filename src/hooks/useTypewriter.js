import { useEffect, useState } from 'react';

const CHARACTER_MS = 22;

// Reveals text one character at a time and restarts whenever the text changes.
export function useTypewriter(text, enabled = true) {
  const [progress, setProgress] = useState({ text, length: 0 });
  const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const length = progress.text === text ? progress.length : 0;
  const done = instant || length >= text.length;

  useEffect(() => {
    if (!enabled || done) return undefined;
    const interval = setInterval(() => {
      setProgress((current) => ({
        text,
        length: current.text === text ? current.length + 1 : 1,
      }));
    }, CHARACTER_MS);
    return () => clearInterval(interval);
  }, [text, enabled, done]);

  return { typed: done ? text : text.slice(0, length), done };
}
