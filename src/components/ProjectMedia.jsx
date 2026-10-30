import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const ZOOM = 'size-full transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none';

function Placeholder({ name }) {
  return (
    <div
      data-testid="media-placeholder"
      className="flex size-full items-center justify-center bg-[linear-gradient(135deg,var(--color-abyss),var(--color-tide))] px-6 text-center"
    >
      <span className="title-slant font-display text-3xl text-foam uppercase">{name}</span>
    </div>
  );
}

function ProjectMedia({ media, name, alt }) {
  const [failed, setFailed] = useState(false);
  const { ref, hasEntered } = useInView('300px');
  const padding = media.type === 'image' ? 'p-10' : '';
  const fit = media.fit === 'contain' ? `object-contain ${padding}` : 'object-cover';

  return (
    <div ref={ref} className="aspect-video overflow-hidden bg-abyss">
      {failed && <Placeholder name={name} />}
      {!failed && media.type === 'video' && hasEntered && (
        <video
          src={media.src}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setFailed(true)}
          className={`${ZOOM} ${fit}`}
        />
      )}
      {!failed && media.type === 'image' && (
        <img
          src={media.src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`${ZOOM} ${fit}`}
        />
      )}
    </div>
  );
}

export default ProjectMedia;
