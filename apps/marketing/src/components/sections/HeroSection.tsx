import * as React from "react";
import { Button } from "../ui/button";
import { NexaMeshOrb } from "../ui/NexaMeshOrb";
import styles from "./HeroSection.module.css";

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.section} id="hero">
      <div className={styles.layout}>
      <div className={styles.container}>
        {/* Status indicator with live dot */}
        <p className={styles.statusLine}>
          <span className={styles.statusDot} aria-hidden="true" />
          Early access open · Kestrel Mesh ships Q3 2026
        </p>

        {/* Clear headline - what you get */}
        <h1 className={styles.headline}>
          Detect threats.
          <span className={styles.headlineAccent}> Before they arrive.</span>
        </h1>

        {/* One line - why it matters */}
        <p className={styles.description}>
          Edge AI counter-UAS intelligence. Sub-200ms detection, RF-denied
          autonomy, blockchain-anchored evidence. Deploy anywhere.
        </p>

        {/* Single primary CTA */}
        <div className={styles.ctaSection}>
          <Button
            href="/preorder"
            size="lg"
            variant="primary"
            trackingEvent="Preorder Clicked"
            trackingProps={{ location: "hero", type: "primary" }}
            aria-label="Preorder now"
          >
            Preorder Now
          </Button>
          <Button
            href="/products"
            variant="secondary"
            size="lg"
            trackingEvent="Products Clicked"
            trackingProps={{ location: "hero", type: "secondary" }}
            aria-label="See all products"
          >
            See Products
          </Button>
        </div>

        {/* Simple proof points - not a card, just text */}
        <div className={styles.proofPoints}>
          <span className={styles.proofPoint}>
            <strong>&lt;200ms</strong> — Detection latency
          </span>
          <span className={styles.proofDivider}>·</span>
          <span className={styles.proofPoint}>
            <strong>RF-denied</strong> — Works without comms
          </span>
          <span className={styles.proofDivider}>·</span>
          <span className={styles.proofPoint}>
            <strong>Blockchain</strong> — Evidence anchoring
          </span>
        </div>

        {/* Trust signals - subtle credibility indicators */}
        <div className={styles.trustSignals}>
          <span className={styles.trustSignal}>Patent Pending</span>
          <span className={styles.trustSignal}>Edge AI Processing</span>
          <span className={styles.trustSignal}>Mesh-Deployable</span>
        </div>
      </div>

        {/* Orb — right column on desktop, hidden on small screens */}
        <div className={styles.orbColumn} aria-hidden="true">
          <NexaMeshOrb size={480} className={styles.orb} />
        </div>
      </div>
    </section>
  );
};
