import { useEffect, useState } from 'react';

export const INTRO_MS = 1800;

const SHARDS = [
  { top: '18%', height: '5rem', delay: '0ms' },
  { top: '44%', height: '9rem', delay: '90ms' },
  { top: '70%', height: '4rem', delay: '180ms' },
];

function IntroSequence() {
  const [visible, setVisible] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), INTRO_MS);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  // Any click skips the animation, so a returning visitor is never held back.
  return (
    <div aria-hidden="true" data-testid="intro" className="intro" onClick={() => setVisible(false)}>
      <div className="intro-panel intro-panel-top" />
      <div className="intro-panel intro-panel-bottom" />
      {SHARDS.map(({ top, height, delay }) => (
        <span key={top} className="intro-shard" style={{ top, height, animationDelay: delay }} />
      ))}
      <div className="intro-logo">
        <span className="intro-logo-text" data-text="UMBRA.">
          UMBRA.
        </span>
      </div>
    </div>
  );
}

export default IntroSequence;
