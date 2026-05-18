"use client";

import * as React from "react";
import { RevealSection } from "../RevealSection";
import { useCountUp } from "@nexamesh/ui";
import styles from "./ThreatRealitySection.module.css";

/* SVG icons — inline so they can be styled with currentColor */
const RfIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" />
  </svg>
);

const CloudOffIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.5 19H9a7 7 0 0 1-7-7 7 7 0 0 1 7-7c.535 0 1.055.06 1.556.174" />
    <path d="M22 19a5 5 0 0 0-5-5H17A7 7 0 0 0 9.8 6.8" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const SwarmIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2" />
    <circle cx="4"  cy="6"  r="1.5" />
    <circle cx="20" cy="6"  r="1.5" />
    <circle cx="4"  cy="18" r="1.5" />
    <circle cx="20" cy="18" r="1.5" />
    <line x1="5.5"  y1="6.8"  x2="10.5" y2="10.5" strokeOpacity="0.4" />
    <line x1="18.5" y1="6.8"  x2="13.5" y2="10.5" strokeOpacity="0.4" />
    <line x1="5.5"  y1="17.2" x2="10.5" y2="13.5" strokeOpacity="0.4" />
    <line x1="18.5" y1="17.2" x2="13.5" y2="13.5" strokeOpacity="0.4" />
  </svg>
);

const gaps = [
  {
    Icon: RfIcon,
    heading: "RF-only systems go dark under EW",
    body: "Electronic warfare countermeasures are standard doctrine against RF-dependent detection. A system that relies on radio comms fails exactly when it matters most.",
  },
  {
    Icon: CloudOffIcon,
    heading: "Cloud-dependent architectures have a single point of failure",
    body: "When connectivity is severed — intentionally or by terrain — cloud-reliant platforms stop classifying. Edge autonomy is not optional; it is the baseline requirement.",
  },
  {
    Icon: SwarmIcon,
    heading: "Swarm attacks are designed to overwhelm isolated sensors",
    body: "A single node hunting alone cannot correlate simultaneous multi-vector incursions. Mesh consensus across distributed nodes is the only architecture that scales to swarm threats.",
  },
];

/** Individual stat card — animates its numeric portion with useCountUp */
function StatCard({
  value,
  label,
  detail,
  index,
}: {
  value: string;
  label: string;
  detail: string;
  index: number;
}) {
  // Extract leading number for animation; keep prefix/suffix
  const numMatch = value.match(/(\d+)/);
  const numericTarget = numMatch ? parseInt(numMatch[1], 10) : 0;
  const prefix = numMatch ? value.slice(0, numMatch.index) : value;
  const suffix = numMatch ? value.slice((numMatch.index ?? 0) + numMatch[0].length) : "";

  const [count, ref] = useCountUp(numericTarget, 1200);
  const displayValue = numericTarget > 0
    ? `${prefix}${count}${suffix}`
    : value;

  return (
    <div
      className={styles.statCard}
      style={{ "--stagger-delay": `${index * 90}ms` } as React.CSSProperties}
    >
      <div
        className={styles.statValue}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {displayValue}
      </div>
      <div className={styles.statLabel}>{label}</div>
      <p className={styles.statDetail}>{detail}</p>
    </div>
  );
}

export const ThreatRealitySection: React.FC = () => {
  const stats = [
    {
      value: "<$500",
      label: "Per threat unit",
      detail:
        "Adversarial drone cost has fallen below $500. Capability that once required nation-state resources is now off-the-shelf.",
    },
    {
      value: "8–15%",
      label: "False positive rate",
      detail:
        "Legacy single-sensor systems misclassify birds, weather, and clutter — generating alert fatigue that operators learn to ignore.",
    },
    {
      value: "47%",
      label: "C-UAS market CAGR",
      detail:
        "The counter-drone market is growing at 47% annually. The threat curve and the market opportunity are rising together.",
    },
    {
      value: "0",
      label: "Cloud required",
      detail:
        "NexaMesh nodes operate fully offline. Detection and evidence recording continue even when comms are jammed.",
    },
  ];

  return (
    <section className={styles.section} id="threat-reality">
      <div className={styles.container}>
        <RevealSection className={styles.header}>
          <div className={styles.badge}>Threat Reality</div>
          <h2 className={styles.title}>The Detection Gap Is Widening</h2>
          <p className={styles.subtitle}>
            Drone threats have commoditised faster than defences have adapted.
            Legacy systems built for a different threat model are leaving
            critical assets exposed.
          </p>
        </RevealSection>

        <RevealSection>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <div className={styles.gapsGrid}>
            {gaps.map((gap, i) => (
              <div
                key={gap.heading}
                className={styles.gapCard}
                style={{ "--stagger-delay": `${i * 120}ms` } as React.CSSProperties}
              >
                <span className={styles.gapIcon}>
                  <gap.Icon />
                </span>
                <div>
                  <h3 className={styles.gapHeading}>{gap.heading}</h3>
                  <p className={styles.gapBody}>{gap.body}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
