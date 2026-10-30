import { useEffect, useState } from 'react';

// Returns the id of the section crossing the middle of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(current.target.id);
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    ids.forEach((id) => observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
