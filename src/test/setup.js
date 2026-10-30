import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
  // Asset tests run in plain Node, without a DOM to reset.
  if (typeof document === 'undefined') return;
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

// jsdom has no layout engine, so these browser APIs need stand-ins.
const galleryObservers = new Set();

export function intersectGallery(isIntersecting) {
  const target = document.getElementById('gallery-3d');
  galleryObservers.forEach((observer) => observer.callback([{ isIntersecting, target }]));
}

class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target) {
    // The gallery band drives the Dark Hour, so tests enter it explicitly with intersectGallery().
    if (target.id === 'gallery-3d') {
      galleryObservers.add(this);
      return;
    }
    this.callback([{ isIntersecting: true, target }]);
  }

  disconnect() {
    galleryObservers.delete(this);
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
vi.stubGlobal('matchMedia', () => ({ matches: false }));

// jsdom implements no media playback.
if (typeof window !== 'undefined') {
  window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
  window.HTMLMediaElement.prototype.pause = vi.fn();
}
