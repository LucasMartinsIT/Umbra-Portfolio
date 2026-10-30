import { lazy, Suspense, useState } from 'react';
import { MODELS } from '../../data/portfolio';
import { useInView } from '../../hooks/useInView';
import { useLanguage } from '../../i18n/useLanguage';
import { useDarkHour } from '../../theme/useDarkHour';
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import Section from '../Section';
import CanvasErrorBoundary from './CanvasErrorBoundary';

// three.js is heavy, so it only downloads when the gallery gets close to the viewport.
const ModelCanvas = lazy(() => import('./ModelCanvas'));

function ArrowButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="clip-slant bg-foam px-5 py-3 text-abyss transition-colors hover:bg-aqua"
    >
      {children}
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="font-label text-sm font-medium tracking-widest text-aqua uppercase">{label}</dt>
      <dd className="mt-1 font-display text-2xl tracking-wide">{value}</dd>
    </div>
  );
}

function Gallery3D() {
  const { t } = useLanguage();
  const { active: darkHour } = useDarkHour();
  const [index, setIndex] = useState(0);
  const [selectedClip, setSelectedClip] = useState(null);
  const { ref, inView, hasEntered } = useInView('200px');

  const model = MODELS[index];
  const text = t.gallery.models[model.id];
  const nextModel = MODELS[(index + 1) % MODELS.length];
  const previousModel = MODELS[(index - 1 + MODELS.length) % MODELS.length];
  const clip = selectedClip ?? model.animations?.[0].clip;

  const step = (offset) => {
    setIndex((index + offset + MODELS.length) % MODELS.length);
    setSelectedClip(null);
  };

  return (
    <Section id="gallery-3d" kicker={t.gallery.kicker} title={t.gallery.title} tone="trench">
      <div ref={ref} className="grid items-center gap-8 lg:grid-cols-3">
        <div className="clip-panel relative h-[26rem] overflow-hidden bg-[radial-gradient(circle_at_50%_42%,var(--color-tide),var(--color-ocean)_45%,var(--color-abyss)_90%)] md:h-[34rem] lg:col-span-2">
          <div aria-hidden="true" className="moon absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 md:size-96" />
          <div role="img" aria-label={`${t.gallery.modelLabel}: ${text.name}`} className="relative size-full">
            {hasEntered && (
              <CanvasErrorBoundary message={t.gallery.viewerError}>
                <Suspense fallback={null}>
                  <ModelCanvas
                    file={model.file}
                    clip={clip}
                    preload={[previousModel.file, nextModel.file]}
                    active={inView}
                    darkHour={darkHour}
                  />
                </Suspense>
              </CanvasErrorBoundary>
            )}
          </div>
          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <ArrowButton label={t.gallery.previous} onClick={() => step(-1)}>
              <ChevronLeftIcon />
            </ArrowButton>
          </div>
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <ArrowButton label={t.gallery.next} onClick={() => step(1)}>
              <ChevronRightIcon />
            </ArrowButton>
          </div>
        </div>

        <div aria-live="polite">
          <p className="font-label text-lg font-bold tracking-widest text-aqua uppercase italic">
            {String(index + 1).padStart(2, '0')} / {String(MODELS.length).padStart(2, '0')} · {t.gallery.types[text.type]}
          </p>
          <h3 className="mt-1 font-display text-4xl tracking-wide uppercase">{text.name}</h3>
          <p className="mt-3 leading-relaxed text-mist">{text.description}</p>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-tide pt-6">
            <Stat label={t.gallery.stats.tris} value={model.tris.toLocaleString(t.meta.locale)} />
            <Stat label={t.gallery.stats.verts} value={model.verts.toLocaleString(t.meta.locale)} />
            <Stat label={t.gallery.stats.rig} value={model.rigged ? t.gallery.stats.yes : t.gallery.stats.no} />
          </dl>

          {model.animations && (
            <div role="group" aria-label={t.gallery.animations} className="mt-6 flex flex-wrap gap-2">
              {model.animations.map((animation) => (
                <button
                  key={animation.clip}
                  type="button"
                  aria-pressed={animation.clip === clip}
                  onClick={() => setSelectedClip(animation.clip)}
                  className="clip-slant bg-abyss px-5 py-1.5 font-label text-lg font-bold tracking-wide uppercase transition-colors hover:text-aqua aria-pressed:bg-foam aria-pressed:text-abyss"
                >
                  {t.gallery.clips[animation.labelKey]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

export default Gallery3D;
