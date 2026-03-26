"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import styles from "./RevealSection.module.css";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  /** Animation direction — default up */
  direction?: "up" | "left" | "right" | "scale";
  /** Stagger delay in ms added to the base transition (0, 100, 200 …) */
  delay?: number;
  /** Intersection threshold (0–1) before the animation fires */
  threshold?: number;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.12,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      el.classList.add(styles.visible);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const dirClass = {
    up: styles.fromUp,
    left: styles.fromLeft,
    right: styles.fromRight,
    scale: styles.fromScale,
  }[direction];

  return (
    <div
      ref={ref}
      className={`${styles.revealSection} ${dirClass} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
};
