import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import en from '../i18n/en';
import pt from '../i18n/pt';
import { LanguageContext } from '../i18n/useLanguage';
import WelcomeDialog from './WelcomeDialog';

const { play, pause } = window.HTMLMediaElement.prototype;
const dialog = () => screen.queryByRole('dialog', { name: en.welcome.name });
const audioElement = () => document.querySelector('audio');
const open = () => fireEvent(window, new Event('pointerdown'));
const musicChoice = () => screen.getByRole('button', { name: new RegExp(en.welcome.withMusic) });
const silentChoice = () => screen.getByRole('button', { name: new RegExp(en.welcome.silent) });

describe('WelcomeDialog', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    play.mockClear();
    pause.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('prepares looping background music at a soft volume', () => {
    render(<WelcomeDialog />);

    expect(audioElement()).toHaveAttribute('src', '/ambient-jazz.mp3');
    expect(audioElement()).toHaveAttribute('loop');
    expect(audioElement().volume).toBe(0.18);
  });

  it('stays hidden during the intro and then appears by itself', () => {
    render(<WelcomeDialog />);
    expect(dialog()).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(2200));
    expect(dialog()).toBeInTheDocument();
  });

  it.each(['pointerdown', 'keydown', 'scroll'])('appears right away on first %s', (gesture) => {
    render(<WelcomeDialog />);
    fireEvent(window, new Event(gesture));

    expect(dialog()).toBeInTheDocument();
  });

  it('introduces Lucas as a developer with his portrait', () => {
    render(<WelcomeDialog />);
    open();

    expect(screen.getByText('Lucas Martins')).toBeInTheDocument();
    expect(screen.getByText('DEVELOPER')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: en.welcome.portraitAlt })).toHaveAttribute('src', '/lucas-suit.png');
    expect(screen.queryByText(/game master/i)).not.toBeInTheDocument();
  });

  it('never plays music before the visitor chooses', () => {
    render(<WelcomeDialog />);
    act(() => vi.advanceTimersByTime(20_000));

    expect(play).not.toHaveBeenCalled();
  });

  it('starts the music from the click on the first choice and frees the page', async () => {
    render(<WelcomeDialog />);
    open();

    await act(async () => fireEvent.click(musicChoice()));

    expect(play).toHaveBeenCalledTimes(1);
    expect(dialog()).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: en.welcome.muteMusic })).toBeInTheDocument();
  });

  it('stays silent on the second choice and frees the page', () => {
    render(<WelcomeDialog />);
    open();

    fireEvent.click(silentChoice());

    expect(play).not.toHaveBeenCalled();
    expect(dialog()).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: en.welcome.playMusic })).toBeInTheDocument();
  });

  it('keeps the dialog open and explains when the audio cannot play', async () => {
    play.mockRejectedValueOnce(new Error('NotSupportedError'));
    render(<WelcomeDialog />);
    open();

    await act(async () => fireEvent.click(musicChoice()));

    expect(dialog()).toBeInTheDocument();
    expect(screen.getByText(en.welcome.audioMissing)).toBeInTheDocument();
  });

  it('toggles the sound from the minimized controls', async () => {
    render(<WelcomeDialog />);
    open();
    fireEvent.click(silentChoice());

    await act(async () => fireEvent.click(screen.getByRole('button', { name: en.welcome.playMusic })));
    expect(play).toHaveBeenCalledTimes(1);

    await act(async () => fireEvent.click(screen.getByRole('button', { name: en.welcome.muteMusic })));
    expect(pause).toHaveBeenCalled();
  });

  it('reopens the dialog without stopping the music', async () => {
    render(<WelcomeDialog />);
    open();
    await act(async () => fireEvent.click(musicChoice()));
    pause.mockClear();

    fireEvent.click(screen.getByRole('button', { name: en.welcome.restore }));

    expect(dialog()).toBeInTheDocument();
    expect(pause).not.toHaveBeenCalled();
  });

  it.each([
    ['the close button', () => fireEvent.click(screen.getByRole('button', { name: en.welcome.minimize }))],
    ['the Escape key', () => fireEvent.keyDown(dialog(), { key: 'Escape' })],
    ['the Escape key after focus left the dialog', () => fireEvent.keyDown(window, { key: 'Escape' })],
    ['a click outside', () => fireEvent.click(screen.getByTestId('dialog-backdrop'))],
  ])('minimizes with %s', (_, minimize) => {
    render(<WelcomeDialog />);
    open();

    minimize();

    expect(dialog()).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: en.welcome.restore })).toBeInTheDocument();
  });

  it('focuses the first choice and keeps keyboard focus inside', () => {
    render(<WelcomeDialog />);
    open();
    expect(musicChoice()).toHaveFocus();

    const close = screen.getByRole('button', { name: en.welcome.minimize });
    close.focus();
    fireEvent.keyDown(dialog(), { key: 'Tab' });

    expect(musicChoice()).toHaveFocus();
  });

  it('keeps the whole speech available to screen readers while typing', () => {
    render(<WelcomeDialog />);
    open();

    expect(screen.getByText(en.welcome.message)).toHaveClass('sr-only');
  });

  it('speaks Portuguese when that is the active language', () => {
    render(
      <LanguageContext.Provider value={{ language: 'pt', setLanguage: () => {}, t: pt }}>
        <WelcomeDialog />
      </LanguageContext.Provider>,
    );
    open();

    expect(screen.getByText(pt.welcome.message)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(pt.welcome.withMusic) })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: new RegExp(pt.welcome.silent) })).toBeInTheDocument();
  });
});
