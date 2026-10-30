import { useEffect, useRef, useState } from 'react';

// Tracks whether an element is near the viewport, and whether it ever was.
export function useInView(rootMargin = '0px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView, hasEntered };
}
