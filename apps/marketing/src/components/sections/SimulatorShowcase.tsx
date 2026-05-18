import * as React from "react";
import Image from "next/image";
import styles from "./SimulatorShowcase.module.css";

/**
 * Angled product screenshot section — tactical simulator at perspective tilt.
 * Dark card with CSS perspective transform, caption strip, and CTA.
 */
export const SimulatorShowcase: React.FC = () => (
  <section className={styles.section} aria-label="Threat simulator preview">
    <div className={styles.inner}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Live Simulation Engine</span>
        <h2 className={styles.heading}>
          Plan, deploy, engage — in real time
        </h2>
        <p className={styles.sub}>
          The NexaMesh threat simulator runs on-device with no cloud dependency.
          Assign effectors, manage energy budgets, and track live ROE compliance
          in the same interface your operators train on.
        </p>
      </header>

      <div className={styles.frame} aria-hidden="true">
        <div className={styles.tilt}>
          <Image
            src="/screenshots/simulator-preview.png"
            alt="NexaMesh threat simulator — dark tactical interface showing radar display, effector panel, and engagement timeline"
            width={1440}
            height={900}
            className={styles.screenshot}
            priority={false}
          />
          {/* Subtle reflection gradient at bottom edge */}
          <div className={styles.reflection} />
        </div>
        {/* Ambient glow behind the card */}
        <div className={styles.glow} />
      </div>

      <div className={styles.features}>
        {[
          { label: "Sub-200ms", desc: "threat classification latency" },
          { label: "RF-denied", desc: "autonomous operation mode" },
          { label: "ROE-aware", desc: "rules of engagement engine" },
          { label: "Blockchain", desc: "immutable evidence anchoring" },
        ].map(({ label, desc }) => (
          <div key={label} className={styles.feature}>
            <span className={styles.featureLabel}>{label}</span>
            <span className={styles.featureDesc}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
