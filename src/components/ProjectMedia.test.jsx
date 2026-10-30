import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectMedia from './ProjectMedia';

describe('ProjectMedia', () => {
  it('lazy-loads images with a description', () => {
    render(<ProjectMedia media={{ type: 'image', src: '/a.png' }} name="Project" alt="Demo" />);

    const image = screen.getByRole('img', { name: 'Demo' });
    expect(image).toHaveAttribute('src', '/a.png');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('falls back to a styled placeholder when the file is missing', () => {
    render(<ProjectMedia media={{ type: 'image', src: '/missing.gif' }} name="Project" alt="Demo" />);
    fireEvent.error(screen.getByRole('img', { name: 'Demo' }));

    expect(screen.getByTestId('media-placeholder')).toHaveTextContent('Project');
    expect(screen.queryByRole('img', { name: 'Demo' })).not.toBeInTheDocument();
  });

  it('plays demo videos muted so browsers allow autoplay', () => {
    const { container } = render(<ProjectMedia media={{ type: 'video', src: '/a.mp4' }} name="Project" alt="Demo" />);
    const video = container.querySelector('video');

    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
  });

  it('keeps every media slot at 16:9', () => {
    const { container } = render(<ProjectMedia media={{ type: 'image', src: '/a.png' }} name="Project" alt="Demo" />);

    expect(container.firstChild).toHaveClass('aspect-video');
  });
});
