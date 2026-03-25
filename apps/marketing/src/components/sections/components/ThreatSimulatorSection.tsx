"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Button } from "../../ui/button";
import styles from "./ThreatSimulatorSection.module.css";

// Dynamically import WASM simulator to avoid SSR issues
const WasmThreatSimulator = dynamic(
  () =>
    import("../../WasmThreatSimulator").then((mod) => mod.WasmThreatSimulator),
  {
    ssr: false,
    loading: () => (
      <div className={styles.simulatorPlaceholder}>
        <div className={styles.placeholderContent}>
          <span className={styles.placeholderIcon}>🎮</span>
          <span className={styles.placeholderText}>Loading Simulator...</span>
        </div>
      </div>
    ),
  },
);

export const ThreatSimulatorSection: React.FC = () => {
  return (
    <div className={styles.demoSection}>
      <div className={styles.demoHeader}>
        <h3 className={styles.demoTitle}>Experience the System</h3>
        <p className={styles.demoSubtitle}>
          Try our interactive defense simulator to see NexaMesh
          technology in action. Experience real-time threat detection,
          autonomous response, and tactical coordination.
        </p>
      </div>

      <div className={styles.simulatorContainer}>
        <WasmThreatSimulator isTeaser />
        <div className={styles.simulatorOverlay}>
          <Button href="/interactive-demo" variant="primary" size="lg">
            🚀 Launch Fullscreen Demo
          </Button>
        </div>
      </div>

      <div className={styles.demoFeatures}>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>🎯</span>
          <span className={styles.featureText}>Real-time threat detection</span>
        </div>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>🔫</span>
          <span className={styles.featureText}>Multiple weapon systems</span>
        </div>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>📡</span>
          <span className={styles.featureText}>
            Advanced radar visualization
          </span>
        </div>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>⚡</span>
          <span className={styles.featureText}>Energy management</span>
        </div>
      </div>
    </div>
  );
};
