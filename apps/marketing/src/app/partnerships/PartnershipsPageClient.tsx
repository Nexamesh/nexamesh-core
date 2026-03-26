"use client";
import dynamic from "next/dynamic";
import * as React from "react";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { usePerformanceOptimizations } from "../../hooks/usePerformanceOptimizations";
import styles from "./partnerships.module.css";

const InteractiveMesh = dynamic(
  () =>
    import("../../components/ui/InteractiveMesh").then(
      (mod) => mod.InteractiveMesh,
    ),
  { ssr: false },
);

/** Partnership opportunities page — civilian, commercial, R&D, and licensing. */
export function PartnershipsPage(): React.ReactElement {
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

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.container}>
              {/* Section Header */}
              <div className={styles.headerSection}>
                <h1 className={styles.title}>Partnership Opportunities</h1>
                <p className={styles.subtitle}>
                  Explore collaboration opportunities with NexaMesh&apos;s
                  edge AI mesh sensor platform for counter-drone detection.
                </p>
              </div>

              {/* Partnership Categories */}
              <div className={styles.grid4Cols}>
                {/* Civilian Applications */}
                <div className={styles.partnershipCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>🏢</div>
                    <h3 className={styles.cardHeading}>
                      Civilian Applications
                    </h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        Airport Security
                      </div>
                      <div className={styles.cardItemDescription}>
                        Perimeter protection, runway monitoring
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        Critical Infrastructure
                      </div>
                      <div className={styles.cardItemDescription}>
                        Power plants, water facilities, communication towers
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>Event Security</div>
                      <div className={styles.cardItemDescription}>
                        Stadiums, concerts, public gatherings
                      </div>
                    </div>
                  </div>
                </div>

                {/* Commercial Security */}
                <div className={styles.partnershipCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>🏭</div>
                    <h3 className={styles.cardHeading}>Commercial Security</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        Corporate Campus
                      </div>
                      <div className={styles.cardItemDescription}>
                        Headquarters, R&D facilities
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        Data Center Security
                      </div>
                      <div className={styles.cardItemDescription}>
                        Server farms, cloud infrastructure
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>Port Security</div>
                      <div className={styles.cardItemDescription}>
                        Shipping terminals, cargo facilities
                      </div>
                    </div>
                  </div>
                </div>

                {/* Research & Development */}
                <div className={styles.partnershipCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>🔬</div>
                    <h3 className={styles.cardHeading}>
                      Research & Development
                    </h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        University Partnerships
                      </div>
                      <div className={styles.cardItemDescription}>
                        Academic research collaboration
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        Government Labs
                      </div>
                      <div className={styles.cardItemDescription}>
                        DARPA, NSF, national laboratories
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        International Cooperation
                      </div>
                      <div className={styles.cardItemDescription}>
                        NATO, allied defense research
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technology Licensing */}
                <div className={styles.partnershipCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>⚡</div>
                    <h3 className={styles.cardHeading}>Technology Licensing</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>Sensor Fusion</div>
                      <div className={styles.cardItemDescription}>
                        Core detection algorithms
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        Edge Processing
                      </div>
                      <div className={styles.cardItemDescription}>
                        Autonomous decision-making
                      </div>
                    </div>
                    <div className={styles.cardItem}>
                      <div className={styles.cardItemTitle}>
                        Blockchain Integration
                      </div>
                      <div className={styles.cardItemDescription}>
                        Evidence management systems
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className={styles.contactSection}>
                <h3 className={styles.contactTitle}>
                  Interested in Partnership?
                </h3>
                <p className={styles.contactDescription}>
                  Contact us to explore collaboration opportunities and learn
                  more about how NexaMesh technology can be adapted for
                  your specific needs.
                </p>
                <div className={styles.contactButtons}>
                  <a
                    href="mailto:partnerships@nexamesh.ai"
                    className="btn btn--primary"
                  >
                    Partnership Inquiries
                  </a>
                  <a
                    href="mailto:demo@nexamesh.ai"
                    className="btn btn--secondary"
                  >
                    Schedule Technical Demo
                  </a>
                </div>
              </div>

              {/* Disclaimer */}
              <div className={styles.disclaimer}>
                <p className={styles.disclaimerText}>
                  💡 These are potential applications under exploration. Actual
                  deployment would require regulatory approval, market
                  validation, and technology adaptation for specific use cases.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default PartnershipsPage;
