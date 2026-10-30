import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CanvasErrorBoundary from './CanvasErrorBoundary';

function Broken() {
  throw new Error('WebGL unavailable');
}

describe('CanvasErrorBoundary', () => {
  it('replaces a crashed viewer with a message', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <CanvasErrorBoundary message="could not start">
        <Broken />
      </CanvasErrorBoundary>,
    );

    expect(screen.getByText(/could not start/i)).toBeInTheDocument();
  });

  it('renders its children when nothing fails', () => {
    render(<CanvasErrorBoundary>viewer</CanvasErrorBoundary>);
    expect(screen.getByText('viewer')).toBeInTheDocument();
  });
});
