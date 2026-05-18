import * as React from "react";
import { RevealSection } from "../RevealSection";
import { Section, SectionContainer } from "../layouts";
import { Grid } from "../layouts/Grid";
import { Card } from "../ui";
import styles from "./CapabilitiesSection.module.css";

export const CapabilitiesSection: React.FC = () => {
  const coreCapabilities = [
    {
      icon: "⚡",
      title: "Sub-Second Response",
      description:
        "120-195ms autonomous detection and neutralization. Works when all communications are jammed.",
      proof: "Verified by independent testing lab",
    },
    {
      icon: "🔍",
      title: "Detects RF-Silent Drones",
      description:
        "Multi-sensor fusion (radar, cameras, microphones) catches autonomous drones others cannot see.",
      proof: "Patent-pending sensor fusion algorithm",
    },
    {
      icon: "🌐",
      title: "100% Edge Autonomy",
      description:
        "Nodes operate as independent agents, coordinating without RF infrastructure. Each node maintains local threat detection while mesh consensus drives coordinated response. 500m–1km inter-node range.",
      proof: "No network dependency",
    },
    {
      icon: "🔗",
      title: "Act & Record Locally",
      description:
        "Records everything locally in milliseconds. Uploads to blockchain when network returns for legal evidence.",
      proof: "Military-grade local storage",
    },
    {
      icon: "🗑️",
      title: "Auto-Wipe Security",
      description:
        "Data erases itself if: no signal for 60s, leaves authorized area, or tamper detected. Military-grade protection.",
      proof: "FIPS 140-2 Level 3 certified",
    },
    {
      icon: "🎯",
      title: "Swarm Defense Capability",
      description:
        "Handles coordinated swarm attacks in real-time. Scales to hundreds of simultaneous threats.",
      proof: "Tested against 50+ drone swarms",
    },
    {
      icon: "🛡️",
      title: "Human Authorization Backup",
      description:
        "Fiber-optic link for human weapons authorization. Multiple backup paths when radios are jammed.",
      proof: "Redundant communication paths",
    },
    {
      icon: "📊",
      title: "Enhanced Intelligence (Optional)",
      description:
        "When network is available: AI enhancement, threat intelligence, and blockchain evidence for legal compliance.",
      proof: "Hybrid edge + cloud processing",
    },
    {
      icon: "⛓️",
      title: "Blockchain Evidence (Optional)",
      description:
        "Immutable evidence trails on Solana blockchain. Tamper-proof records for legal compliance and audit trails.",
      proof: "Legal-grade evidence chain",
    },
  ];

  return (
    <Section id="capabilities">
      <SectionContainer>
        <RevealSection className={styles.header}>
          <h2 className={styles.title}>Three-Tier Defense Architecture</h2>
          <p className={styles.description}>
            <strong className={styles.tierLabel}>Tier 1 (Core):</strong>{" "}
            Autonomous edge operation with sub-second response.
            <strong className={styles.tierLabel}> Tier 2 (Enhanced):</strong> AI
            and intelligence when network available.
            <strong className={styles.tierLabel}>
              {" "}
              Tier 3 (Strategic):
            </strong>{" "}
            Analytics and compliance reporting.
          </p>
        </RevealSection>
        <RevealSection>
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
            {coreCapabilities.map((capability, index) => (
              <Card key={index} {...capability} />
            ))}
          </Grid>
        </RevealSection>
      </SectionContainer>
    </Section>
  );
};
