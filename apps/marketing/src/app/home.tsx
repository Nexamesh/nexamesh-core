"use client";
import * as React from "react";

import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { ContactSection } from "../components/sections/ContactSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProductHighlightsSection } from "../components/sections/ProductHighlightsSection";
import { InteractiveMesh } from "../components/ui/InteractiveMesh";
import { serializeJsonLd } from "@nexamesh/utils";

import { usePerformanceOptimizations } from "../hooks/usePerformanceOptimizations";
import styles from "./home.module.css";

export default function HomePage(): React.ReactElement {
  // Apply performance optimizations
  usePerformanceOptimizations();

  return (
    <main className={styles.main} id="main-content">
      {/* Background mesh effect - subtle with mouse interaction */}
      <InteractiveMesh
        gridSize={50}
        color="rgba(234, 124, 28, 0.07)"
        bendStrength={25}
        bendRadius={120}
      />

      {/* Global Components */}

      {/* Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <HeroSection />
      <FeaturesSection />
      <ProductHighlightsSection />
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* FAQ Schema Markup - buyer focused */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How does NexaMesh detect drones?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "NexaMesh uses distributed mesh nodes running on-device AI to detect and classify drone threats in under 200ms. Each node operates independently, so the system keeps working even in RF-denied environments where comms are jammed.",
                },
              },
              {
                "@type": "Question",
                name: "Who uses these systems?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Government agencies, airports, critical infrastructure operators, event security teams, and property managers. Kestrel Mesh for rapid mesh-deployable detection; Sentinel Ring for persistent enterprise coverage with 24/7 SOC integration.",
                },
              },
              {
                "@type": "Question",
                name: "When can I get one?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Preorders open now with no deposit required. First deliveries Q3 2026.",
                },
              },
              {
                "@type": "Question",
                name: "Is it legal to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. NexaMesh is a passive detection and evidence platform — no RF jamming, no GPS spoofing, no signal interference. All evidence is blockchain-anchored for legal chain of custody.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
