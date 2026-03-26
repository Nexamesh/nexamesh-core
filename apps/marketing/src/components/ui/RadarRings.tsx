import * as React from "react";
import styles from "./RadarRings.module.css";

interface RadarRingsProps {
  /** Size in px of the outer ring */
  size?: number;
  className?: string;
}

/**
 * Decorative animated radar / sensor-sweep SVG.
 * Purely visual — aria-hidden.
 */
export const RadarRings: React.FC<RadarRingsProps> = ({
  size = 320,
  className = "",
}) => {
  const r = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${styles.root} ${className}`}
    >
      {/* Static rings */}
      {[0.25, 0.45, 0.65, 0.85, 1].map((scale, i) => (
        <circle
          key={i}
          cx={r}
          cy={r}
          r={r * scale - 1}
          stroke="currentColor"
          strokeWidth={i === 4 ? 1 : 0.5}
          opacity={i === 4 ? 0.25 : 0.12}
          strokeDasharray={i % 2 === 1 ? "4 6" : undefined}
        />
      ))}

      {/* Cross-hair lines */}
      <line
        x1={r}
        y1={4}
        x2={r}
        y2={size - 4}
        stroke="currentColor"
        strokeWidth={0.5}
        opacity={0.1}
      />
      <line
        x1={4}
        y1={r}
        x2={size - 4}
        y2={r}
        stroke="currentColor"
        strokeWidth={0.5}
        opacity={0.1}
      />

      {/* Tick marks at cardinal points */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const inner = r * 0.83;
        const outer = r * 0.97;
        return (
          <line
            key={deg}
            x1={r + Math.cos(rad) * inner}
            y1={r + Math.sin(rad) * inner}
            x2={r + Math.cos(rad) * outer}
            y2={r + Math.sin(rad) * outer}
            stroke="currentColor"
            strokeWidth={1.5}
            opacity={0.3}
          />
        );
      })}

      {/* Rotating sweep sector */}
      <g className={styles.sweepGroup}>
        <path
          d={`M ${r} ${r} L ${r} ${r * 0.15} A ${r * 0.85} ${r * 0.85} 0 0 1 ${r + r * 0.85 * Math.sin((60 * Math.PI) / 180)} ${r - r * 0.85 * Math.cos((60 * Math.PI) / 180)} Z`}
          fill="url(#sweepGradient)"
          opacity={0.5}
        />
        {/* Sweep leading edge */}
        <line
          x1={r}
          y1={r}
          x2={r}
          y2={r * 0.15}
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.7}
        />
      </g>

      {/* Center dot */}
      <circle cx={r} cy={r} r={3} fill="currentColor" opacity={0.6} />
      <circle
        cx={r}
        cy={r}
        r={6}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.3}
        className={styles.centerPulse}
      />

      {/* Blip dots — static contact indicators */}
      {[
        { angle: 37, dist: 0.42 },
        { angle: 155, dist: 0.61 },
        { angle: 290, dist: 0.35 },
      ].map(({ angle, dist }, i) => {
        const rad = (angle * Math.PI) / 180;
        const bx = r + Math.cos(rad) * r * dist;
        const by = r + Math.sin(rad) * r * dist;
        return (
          <g key={i} className={styles.blip} style={{ animationDelay: `${i * 0.6}s` } as React.CSSProperties}>
            <circle cx={bx} cy={by} r={3} fill="currentColor" opacity={0.8} />
            <circle cx={bx} cy={by} r={7} stroke="currentColor" strokeWidth={0.8} opacity={0.3} />
          </g>
        );
      })}

      <defs>
        <radialGradient
          id="sweepGradient"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${r} ${r}) rotate(-90) scale(${r * 0.85})`}
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
