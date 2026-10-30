import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import IntroSequence, { INTRO_MS } from './IntroSequence';

describe('IntroSequence', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });

  it('never holds a recruiter for more than 1.8 seconds', () => {
    expect(INTRO_MS).toBeLessThanOrEqual(1800);
  });

  it('shows the logo and removes itself when it ends', () => {
    render(<IntroSequence />);
    expect(screen.getByTestId('intro')).toHaveTextContent('UMBRA.');

    act(() => vi.advanceTimersByTime(INTRO_MS));
    expect(screen.queryByTestId('intro')).not.toBeInTheDocument();
  });

  it('can be skipped with a click', () => {
    render(<IntroSequence />);
    fireEvent.click(screen.getByTestId('intro'));

    expect(screen.queryByTestId('intro')).not.toBeInTheDocument();
  });

  it('is skipped for visitors who prefer reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    render(<IntroSequence />);

    expect(screen.queryByTestId('intro')).not.toBeInTheDocument();
  });
});
