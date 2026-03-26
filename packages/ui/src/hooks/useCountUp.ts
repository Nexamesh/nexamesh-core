"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value from 0 to `target` when the element
 * referenced by the returned ref enters the viewport.
 */
export function useCountUp(
  target: number,
  duration = 1400,
  threshold = 0.3,
): [number, React.RefObject<HTMLElement>] {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.unobserve(el);

          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  return [value, ref as React.RefObject<HTMLElement>];
}
