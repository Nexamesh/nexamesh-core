"use client";
import dynamic from "next/dynamic";
import * as React from "react";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { CalendarIntegration } from "../../components/CalendarIntegration";
import { usePerformanceOptimizations } from "../../hooks/usePerformanceOptimizations";
import styles from "./schedule.module.css";

const InteractiveMesh = dynamic(
  () =>
    import("../../components/ui/InteractiveMesh").then(
      (mod) => mod.InteractiveMesh,
    ),
  { ssr: false },
);

/** Schedule page — demo booking and calendar integration. */
export function SchedulePage(): React.ReactElement {
  usePerformanceOptimizations();

  return (
    <main className={styles.main}>
      <InteractiveMesh
        gridSize={50}
        color="rgba(199, 122, 27, 0.07)"
        bendStrength={20}
        bendRadius={100}
      />

      <Navigation />

      <div className={styles.contentWrapper}>
        <CalendarIntegration showEventTypes={true} />
      </div>

      <Footer />
    </main>
  );
}

export default SchedulePage;
