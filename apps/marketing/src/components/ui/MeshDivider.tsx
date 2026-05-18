import * as React from "react";
import styles from "./MeshDivider.module.css";

/**
 * Decorative SVG section divider — animates a horizontal
 * network-node line to transition between sections.
 * aria-hidden; purely visual.
 */
export const MeshDivider: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`${styles.wrapper} ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svg}
    >
      {/* Main spine line */}
      <line
        x1="0"
        y1="20"
        x2="1200"
        y2="20"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeOpacity="0.15"
        strokeDasharray="6 8"
        className={styles.spine}
      />

      {/* Node dots at intervals */}
      {[60, 200, 380, 560, 640, 820, 980, 1140].map((x, i) => (
        <g key={x} className={styles.node} style={{ animationDelay: `${i * 0.18}s` } as React.CSSProperties}>
          <circle cx={x} cy={20} r={3} fill="currentColor" opacity={0.4} />
          <circle cx={x} cy={20} r={6} stroke="currentColor" strokeWidth={0.8} opacity={0.15} />
        </g>
      ))}

      {/* Secondary offset lines for depth */}
      <line
        x1="0" y1="12" x2="400" y2="12"
        stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.08"
        strokeDasharray="3 12"
      />
      <line
        x1="800" y1="28" x2="1200" y2="28"
        stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.08"
        strokeDasharray="3 12"
      />
    </svg>
  </div>
);
