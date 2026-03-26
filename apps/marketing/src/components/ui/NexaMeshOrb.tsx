"use client";

import * as React from "react";
import styles from "./NexaMeshOrb.module.css";

interface NexaMeshOrbProps {
  size?: number;
  className?: string;
}

/** Compute polygon points for a regular hexagon. */
function hex(cx: number, cy: number, r: number, rotDeg = 0): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((rotDeg + 60 * i - 90) * Math.PI) / 180;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

/**
 * Animated nested-hexagon orb — hero visual element.
 *
 * Eight concentric hexagon rings, each with a slight rotation offset,
 * split into counter-rotating animation groups.  An SVG feGaussianBlur
 * filter layered beneath a sharp stroke creates the neon bloom effect.
 */
export const NexaMeshOrb: React.FC<NexaMeshOrbProps> = ({
  size = 480,
  className = "",
}) => {
  const cx = 200;
  const cy = 200;

  // [radius, rotationOffset, strokeWidth, opacity]
  const rings: [number, number, number, number][] = [
    [178, 0, 1.2, 0.55],
    [162, 7, 0.8, 0.45],
    [146, 15, 1.5, 0.65],
    [130, 23, 0.8, 0.4],
    [113, 32, 1.8, 0.7],
    [96, 41, 0.7, 0.35],
    [78, 51, 1.4, 0.6],
    [58, 60, 2.0, 0.8],
  ];

  // split into two counter-rotating groups
  const groupA = rings.filter((_, i) => i % 2 === 0); // CW
  const groupB = rings.filter((_, i) => i % 2 === 1); // CCW

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${styles.root} ${className}`}
    >
      <defs>
        {/* Soft bloom layer */}
        <filter
          id="orb-bloom"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Tight halo for the innermost rings */}
        <filter
          id="orb-halo"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Bloom layer (blurred under-copy) ── */}
      <g filter="url(#orb-bloom)" opacity={0.55}>
        <g className={styles.groupA}>
          {groupA.map(([r, rot, sw], i) => (
            <polygon
              key={i}
              points={hex(cx, cy, r, rot)}
              stroke="currentColor"
              strokeWidth={sw * 2}
            />
          ))}
        </g>
        <g className={styles.groupB}>
          {groupB.map(([r, rot, sw], i) => (
            <polygon
              key={i}
              points={hex(cx, cy, r, rot)}
              stroke="currentColor"
              strokeWidth={sw * 2}
            />
          ))}
        </g>
      </g>

      {/* ── Sharp stroke layer (on top) ── */}
      <g filter="url(#orb-halo)">
        <g className={styles.groupA}>
          {groupA.map(([r, rot, sw, op], i) => (
            <polygon
              key={i}
              points={hex(cx, cy, r, rot)}
              stroke="currentColor"
              strokeWidth={sw}
              opacity={op}
            />
          ))}
        </g>
        <g className={styles.groupB}>
          {groupB.map(([r, rot, sw, op], i) => (
            <polygon
              key={i}
              points={hex(cx, cy, r, rot)}
              stroke="currentColor"
              strokeWidth={sw}
              opacity={op}
            />
          ))}
        </g>
      </g>

      {/* ── Center dot ── */}
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="currentColor"
        opacity={0.9}
        filter="url(#orb-halo)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={10}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.3}
        className={styles.centerPulse}
      />
    </svg>
  );
};
