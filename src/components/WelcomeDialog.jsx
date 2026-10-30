import { useEffect, useRef, useState } from 'react';
import { useAmbientAudio } from '../hooks/useAmbientAudio';
import { useTypewriter } from '../hooks/useTypewriter';
import { useLanguage } from '../i18n/useLanguage';
import { ChatIcon, CloseIcon, MusicIcon, MutedIcon } from './Icons';
import { INTRO_MS } from './IntroSequence';

const APPEAR_DELAY_MS = INTRO_MS + 400;
const FIRST_GESTURES = ['pointerdown', 'keydown', 'scroll'];

function Choice({ title, detail, onClick, buttonRef }) {
  return (
    <button ref={buttonRef} type="button" onClick={onClick} className="dialog-choice clip-slant block w-full px-7 py-2 text-left">
      <span className="block font-label text-xl font-bold tracking-wide uppercase">{title}</span>
      <span className="block text-sm opacity-80">{detail}</span>
    </button>
  );
}

function Dialog({ failed, onChooseMusic, onChooseSilence, onMinimize }) {
  const { t } = useLanguage();
  const { typed } = useTypewriter(t.welcome.message);
  const panelRef = useRef(null);
  const firstChoiceRef = useRef(null);

  useEffect(() => {
    firstChoiceRef.current.focus();
  }, []);

  // Listens on the window because the navbar stays usable while the dialog is open.
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onMinimize();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onMinimize]);

  const handleKeyDown = (event) => {
    if (event.key !== 'Tab') return;

    const focusable = [...panelRef.current.querySelectorAll('button')];
    const edge = event.shiftKey ? focusable[0] : focusable.at(-1);
    if (document.activeElement === edge) {
      event.preventDefault();
      (event.shiftKey ? focusable.at(-1) : focusable[0]).focus();
    }
  };

  return (
    <div
      data-testid="dialog-backdrop"
      className="fixed inset-0 z-45 flex items-end justify-center bg-abyss/60 p-3 md:p-8"
      onClick={(event) => event.target === event.currentTarget && onMinimize()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.welcome.name}
        onKeyDown={handleKeyDown}
        className="gm-enter w-full max-w-5xl"
      >
        <div className="mb-3 flex justify-end">
          <div
            role="group"
            aria-label={t.welcome.choicesLabel}
            className="glow-frame w-full max-w-md space-y-1.5 md:-rotate-1"
          >
            <Choice
              buttonRef={firstChoiceRef}
              title={t.welcome.withMusic}
              detail={t.welcome.withMusicDetail}
              onClick={onChooseMusic}
            />
            <Choice title={t.welcome.silent} detail={t.welcome.silentDetail} onClick={onChooseSilence} />
          </div>
        </div>

        <div className="glow-frame flex items-stretch">
          <div className="clip-portrait relative z-10 w-24 shrink-0 bg-aqua p-1 sm:w-40 md:w-56">
            <img
              src="/lucas-suit.png"
              alt={t.welcome.portraitAlt}
              className="clip-portrait size-full object-cover object-top"
            />
          </div>

          <div className="clip-speech relative -ml-6 min-h-44 flex-1 border border-edge bg-abyss/90 py-5 pr-6 pl-10 md:min-h-56 md:pr-12 md:pl-14">
            <button
              type="button"
              onClick={onMinimize}
              aria-label={t.welcome.minimize}
              title={t.welcome.minimize}
              className="absolute top-3 right-8 p-1 text-mist transition-colors hover:text-aqua"
            >
              <CloseIcon className="size-5" />
            </button>

            <div className="clip-slant inline-block bg-aqua px-6 py-1 text-abyss">
              <span className="font-display text-xl tracking-wide uppercase md:text-2xl">{t.welcome.name}</span>
              <span className="ml-3 font-label text-sm font-bold tracking-[0.25em]">{t.welcome.role}</span>
            </div>

            <p className="sr-only">{t.welcome.message}</p>
            <p aria-hidden="true" className="mt-4 text-base leading-relaxed text-foam md:text-xl">
              {typed}
            </p>
            {failed && <p className="mt-2 text-sm text-mist">{t.welcome.audioMissing}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeDialog() {
  const { t } = useLanguage();
  const { audioRef, playing, failed, play, mute, toggle } = useAmbientAudio();
  const [opened, setOpened] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (opened) return undefined;
    const open = () => setOpened(true);
    const timeout = setTimeout(open, APPEAR_DELAY_MS);
    FIRST_GESTURES.forEach((gesture) => window.addEventListener(gesture, open, { once: true, passive: true }));
    return () => {
      clearTimeout(timeout);
      FIRST_GESTURES.forEach((gesture) => window.removeEventListener(gesture, open));
    };
  }, [opened]);

  // play() runs inside the click, which is what browser autoplay policies require.
  const chooseMusic = async () => {
    if (await play()) setMinimized(true);
  };

  const chooseSilence = () => {
    mute();
    setMinimized(true);
  };

  return (
    <>
      <audio ref={audioRef} src="/ambient-jazz.mp3" loop preload="none" />
      {opened && !minimized && (
        <Dialog
          failed={failed}
          onChooseMusic={chooseMusic}
          onChooseSilence={chooseSilence}
          onMinimize={() => setMinimized(true)}
        />
      )}
      {opened && minimized && (
        <div className="gm-enter fixed right-4 bottom-4 z-45 flex gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? t.welcome.muteMusic : t.welcome.playMusic}
            title={playing ? t.welcome.muteMusic : t.welcome.playMusic}
            className="clip-slant bg-abyss px-4 py-2.5 text-aqua transition-colors hover:bg-foam hover:text-abyss"
          >
            {playing ? <MusicIcon className="size-5" /> : <MutedIcon className="size-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMinimized(false)}
            aria-label={t.welcome.restore}
            title={t.welcome.restore}
            className="clip-slant bg-aqua px-4 py-2.5 text-abyss transition-colors hover:bg-foam"
          >
            <ChatIcon className="size-5" />
          </button>
        </div>
      )}
    </>
  );
}

export default WelcomeDialog;
