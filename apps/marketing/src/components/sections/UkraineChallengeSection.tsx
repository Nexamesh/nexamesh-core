import React from "react";
import { RevealSection } from "../RevealSection";
import { Button } from "../ui/button";
import { FeatureCard } from "../ui/FeatureCard";
import styles from "./UkraineChallengeSection.module.css";

export const UkraineChallengeSection: React.FC = () => {
  return (
    <section className={styles.section} id="autonomous-drone-threat">
      <div className={styles.container}>
        <RevealSection className={styles.header}>
          <div className={styles.urgentBadge}>2027 Inflection Point</div>
          <h2 className={styles.title}>The Autonomous Drone Threat Is Accelerating</h2>
          <p className={styles.description}>
            Adversarial drone doctrine is evolving faster than legacy detection
            systems can respond. AI-guided swarms, RF-denied coordination, and
            electronic warfare countermeasures are no longer theoretical — they
            are being deployed now against critical infrastructure worldwide.
          </p>
        </RevealSection>

        <RevealSection className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Where Legacy Systems Fail</h3>
            <div className={styles.cards}>
              <FeatureCard
                icon="❌"
                title="High False Positive Rates"
                description="Single-sensor systems misclassify environmental clutter — birds, weather, foliage — triggering false alarms at 8–15% rates"
                className={styles.problemCard}
              />
              <FeatureCard
                icon="📡"
                title="EW Vulnerability"
                description="Cloud-dependent and RF-reliant systems go blind under electronic warfare — exactly when detection matters most"
                className={styles.problemCard}
              />
              <FeatureCard
                icon="🐝"
                title="No Swarm Awareness"
                description="Isolated sensors cannot detect coordinated multi-vector incursions — each node hunts alone while threats arrive in formation"
                className={styles.problemCard}
              />
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>NexaMesh Solutions</h3>
            <div className={styles.cards}>
              <FeatureCard
                icon="✅"
                title="Multi-Sensor Fusion"
                description="RF + acoustic + optical sensors in consensus — sub-200ms classification with false positive rates below 0.3%"
                className={styles.solutionCard}
              />
              <FeatureCard
                icon="🔗"
                title="RF-Denied Autonomy"
                description="Mesh consensus operates without cloud or RF infrastructure — fully autonomous under electronic warfare conditions"
                className={styles.solutionCard}
              />
              <FeatureCard
                icon="⚡"
                title="Deployable Today"
                description="Production-ready edge AI stack — not a 2027 roadmap item. Operational before the threat curve steepens further"
                className={styles.solutionCard}
              />
            </div>
          </div>
        </RevealSection>

        <RevealSection className={styles.stakesSection}>
          <div className={styles.stakesCard}>
            <h3 className={styles.stakesTitle}>The Window Is Closing</h3>
            <p className={styles.stakesText}>
              &quot;Drone threats that once required nation-state resources now
              cost under $500 per unit. The gap between attacker capability and
              defender readiness is widening. Every month without autonomous
              mesh detection is a month of undefended exposure.&quot;
            </p>
            <div className={styles.actions}>
              <Button href="#contact" size="lg">
                Schedule a Demo
              </Button>
              <Button
                href="mailto:sales@nexamesh.ai?subject=NexaMesh%20-%20Defense%20Partnership%20Inquiry"
                variant="ghost"
                size="lg"
              >
                Defense Partnership Inquiry
              </Button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
