"use client";
import * as React from "react";
import { RevealSection } from "../RevealSection";
import { Card } from "../ui/Card";
import styles from "./CounterDroneMethodsSection.module.css";

export const CounterDroneMethodsSection: React.FC = () => {
  const methods = [
    {
      icon: "📡",
      title: "RF Signature Analysis",
      description:
        "Passive monitoring of RF spectrum detects control links, video downlinks, and telemetry signals — without transmitting or jamming.",
      metrics: [
        { value: "Passive", label: "Mode" },
        { value: "<50ms", label: "Detection" },
        { value: "500m–2km", label: "Range" },
      ],
    },
    {
      icon: "👁️",
      title: "Visual AI Detection",
      description:
        "On-device computer vision classifies drone type, trajectory, and intent from optical cameras — effective against RF-silent autonomous threats.",
      metrics: [
        { value: "Edge AI", label: "Processing" },
        { value: "<200ms", label: "Classification" },
        { value: "100–800m", label: "Visual Range" },
      ],
    },
    {
      icon: "🎵",
      title: "Acoustic Detection",
      description:
        "Microphone arrays identify motor signatures and propeller frequencies unique to drone platforms — works in low-visibility conditions.",
      metrics: [
        { value: "Passive", label: "Mode" },
        { value: "Motor & Prop", label: "Signatures" },
        { value: "50–300m", label: "Range" },
      ],
    },
    {
      icon: "🔀",
      title: "Multi-Sensor Fusion",
      description:
        "RF, optical, and acoustic channels vote in consensus — cross-validation eliminates false positives and catches threats that fool single sensors.",
      metrics: [
        { value: "<0.3%", label: "False Positive Rate" },
        { value: "3-channel", label: "Consensus" },
        { value: "<200ms", label: "Fused Output" },
      ],
    },
    {
      icon: "🌐",
      title: "Mesh Node Coordination",
      description:
        "Distributed nodes share detections via encrypted peer mesh — no cloud required. Tracks multi-vector incursions and swarm formations across the full perimeter.",
      metrics: [
        { value: "RF-Denied", label: "Capable" },
        { value: "500m–1km", label: "Node Range" },
        { value: "Swarm-Aware", label: "Coordination" },
      ],
    },
    {
      icon: "⛓️",
      title: "Blockchain Evidence Chain",
      description:
        "Every detection event is SHA-256 hashed and anchored on-chain the moment network is available — tamper-proof chain of custody for legal proceedings.",
      metrics: [
        { value: "SHA-256", label: "Hash" },
        { value: "Immutable", label: "Record" },
        { value: "Legal-Grade", label: "Evidence" },
      ],
    },
  ];

  return (
    <RevealSection>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.header}>
              <h2 className={styles.title}>How NexaMesh Detects Threats</h2>
              <p className={styles.subtitle}>
                Passive detection only — NexaMesh does not jam, spoof, or
                interfere with any signal. Six sensor and intelligence layers
                work in concert to detect, classify, and record.
              </p>
            </div>

            <div className={styles.grid}>
              {methods.map((method, index) => (
                <Card key={index} centered {...method} />
              ))}
            </div>

            <div className={styles.integrationSection}>
              <Card
                title="Why Passive Detection Matters"
                description="RF jamming and GPS spoofing are illegal for civilian use in most jurisdictions and carry ITAR/EAR restrictions. NexaMesh's passive-only architecture means it can be deployed by airports, utilities, and event operators without regulatory permits — detection first, response by authorized personnel."
                metrics={[
                  { value: "No RF Emissions", label: "Passive System" },
                  { value: "<200ms", label: "Detection Latency" },
                  { value: "3-Sensor", label: "Fusion Consensus" },
                ]}
                centered
              />
            </div>
          </div>
        </div>
      </section>
    </RevealSection>
  );
};
