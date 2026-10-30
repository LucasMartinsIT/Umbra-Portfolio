import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import en from '../i18n/en';
import { isDarkHourTime } from '../lib/darkHour';
import { intersectGallery } from '../test/setup';

vi.mock('../components/gallery/ModelCanvas', () => ({ default: () => null }));

const theme = () => document.documentElement.dataset.theme;
const at = (hours, minutes = 0) => new Date(2026, 9, 30, hours, minutes);

describe('isDarkHourTime', () => {
  it.each([
    [23, 59, false],
    [0, 0, true],
    [0, 59, true],
    [1, 0, false],
    [12, 0, false],
  ])('%i:%i is %s', (hours, minutes, expected) => {
    expect(isDarkHourTime(at(hours, minutes))).toBe(expected);
  });
});

describe('Dark Hour Mode', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(at(15));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stays off during the day', () => {
    render(<App />);
    expect(theme()).toBeUndefined();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('turns on from the navbar button and shows the transition', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: en.darkHour.enter }));

    expect(theme()).toBe('dark-hour');
    expect(screen.getByRole('status')).toHaveTextContent(en.darkHour.title);
    expect(screen.getByRole('button', { name: en.darkHour.leave })).toHaveAttribute('aria-pressed', 'true');
  });

  it('removes the transition when it finishes but keeps the theme', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: en.darkHour.enter }));

    act(() => vi.advanceTimersByTime(1800));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(theme()).toBe('dark-hour');
  });

  it('turns off from the same button', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: en.darkHour.enter }));
    fireEvent.click(screen.getByRole('button', { name: en.darkHour.leave }));

    expect(theme()).toBeUndefined();
  });

  it('activates by itself when the page opens at midnight', () => {
    vi.setSystemTime(at(0, 30));
    render(<App />);
    expect(theme()).toBe('dark-hour');
  });

  it('activates while the page is open when the clock reaches midnight', () => {
    vi.setSystemTime(at(23, 59));
    render(<App />);
    expect(theme()).toBeUndefined();

    act(() => vi.advanceTimersByTime(60_000));
    expect(theme()).toBe('dark-hour');
  });

  it('ends by itself at 01:00', () => {
    vi.setSystemTime(at(0, 59));
    render(<App />);
    expect(theme()).toBe('dark-hour');

    act(() => vi.advanceTimersByTime(60_000));
    expect(theme()).toBeUndefined();
  });

  it('activates while the 3D Gallery is on screen, without the full-screen reveal', () => {
    render(<App />);
    act(() => intersectGallery(true));

    expect(theme()).toBe('dark-hour');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('returns to normal after leaving the 3D Gallery', () => {
    render(<App />);
    act(() => intersectGallery(true));
    act(() => intersectGallery(false));

    expect(theme()).toBeUndefined();
  });

  it('respects a manual opt-out when entering the 3D Gallery', () => {
    render(<App />);
    act(() => intersectGallery(true));
    fireEvent.click(screen.getByRole('button', { name: en.darkHour.leave }));
    act(() => intersectGallery(false));
    act(() => intersectGallery(true));

    expect(theme()).toBeUndefined();
  });

  it('keeps a manual activation after leaving the 3D Gallery', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: en.darkHour.enter }));
    act(() => intersectGallery(true));
    act(() => intersectGallery(false));

    expect(theme()).toBe('dark-hour');
  });

  it('lets the visitor leave during the automatic hour', () => {
    vi.setSystemTime(at(0, 30));
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: en.darkHour.leave }));

    act(() => vi.advanceTimersByTime(60_000));
    expect(theme()).toBeUndefined();
  });
});
