import * as React from "react";
import styles from "./TechStackSection.module.css";

const STACK = [
  {
    name: "Rust",
    label: "Edge runtime",
    logo: (
      <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M26 10l2.5 4.5h5L31 18l2 4.5-7-2.5-7 2.5 2-4.5-2.5-3.5h5z"
          fill="currentColor" opacity="0.85"
        />
        <rect x="20" y="22" width="12" height="9" rx="2" fill="currentColor" opacity="0.7" />
        <path d="M14 31h6m18 0h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11" cy="31" r="2.5" fill="currentColor" opacity="0.7" />
        <circle cx="41" cy="31" r="2.5" fill="currentColor" opacity="0.7" />
        <path d="M17 38c2-3 4-4 9-4s7 1 9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Azure",
    label: "Cloud backbone",
    logo: (
      <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <path
          d="M18 38h20l-8-14 6-10-14 24z"
          fill="currentColor" opacity="0.5"
        />
        <path
          d="M14 38h8L30 16l-8 8 6 14H14z"
          fill="currentColor" opacity="0.85"
        />
      </svg>
    ),
  },
  {
    name: "Solana",
    label: "Evidence anchoring",
    logo: (
      <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <path d="M12 16h24l4 4H16l-4-4z" fill="currentColor" opacity="0.9" />
        <path d="M12 24h24l4 4H16l-4-4z" fill="currentColor" opacity="0.65" />
        <path d="M16 32h24l-4 4H12l4-4z" fill="currentColor" opacity="0.45" />
      </svg>
    ),
  },
  {
    name: "WebAssembly",
    label: "Edge compute",
    logo: (
      <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <text x="12" y="33" fontFamily="monospace" fontSize="14" fontWeight="700" fill="currentColor" opacity="0.85">Wa</text>
      </svg>
    ),
  },
  {
    name: "Edge AI",
    label: "On-device inference",
    logo: (
      <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <circle cx="26" cy="26" r="6" fill="currentColor" opacity="0.85" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = Math.PI / 180;
          const x1 = 26 + 9 * Math.cos(deg * r);
          const y1 = 26 + 9 * Math.sin(deg * r);
          const x2 = 26 + 17 * Math.cos(deg * r);
          const y2 = 26 + 17 * Math.sin(deg * r);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" opacity="0.6" />;
        })}
        <circle cx="26" cy="26" r="20" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <circle cx="26" cy="26" r="13" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Blockchain",
    label: "Immutable audit trail",
    logo: (
      <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <rect x="8" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <rect x="30" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <rect x="19" y="32" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
        <path d="M15 20v5l11 7 11-7v-5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M26 32v-5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
];

/**
 * "Built on" technology stack strip — social proof through proven tech.
 */
export const TechStackSection: React.FC = () => (
  <section className={styles.section} aria-label="Technology stack">
    <p className={styles.label}>Built on proven technology</p>
    <div className={styles.strip}>
      {STACK.map(({ name, label, logo }) => (
        <div key={name} className={styles.item}>
          <span className={styles.icon}>{logo}</span>
          <span className={styles.name}>{name}</span>
          <span className={styles.sublabel}>{label}</span>
        </div>
      ))}
    </div>
  </section>
);
