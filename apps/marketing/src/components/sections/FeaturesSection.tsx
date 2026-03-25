import * as React from "react";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    id: "edge-ai-detection",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    ),
    title: "Sub-200ms Edge Detection",
    description:
      "On-device AI inference runs entirely at the edge — no cloud round-trip. Threat classification in under 200ms from first RF or optical signature.",
    brand: "Both Brands",
  },
  {
    id: "rf-denied-autonomy",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "RF-Denied Autonomy",
    description:
      "Kestrel Mesh nodes operate without network connectivity. Mesh consensus keeps detection running even when comms are jammed or severed.",
    brand: "Kestrel Mesh",
  },
  {
    id: "perimeter-awareness",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Sentinel Ring Perimeter",
    description:
      "Fixed infrastructure deployments with overlapping detection arcs. Airports, utilities, and government facilities get continuous 360° coverage.",
    brand: "Sentinel Ring",
  },
  {
    id: "blockchain-evidence",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Blockchain-Anchored Evidence",
    description:
      "Every detection event is SHA-256 hashed and anchored on-chain. Tamper-proof chain of custody for legal proceedings and after-action review.",
    brand: "Both Brands",
  },
];

const useCases = [
  {
    id: "forward-deploy",
    title: "Forward Deployment",
    description: "Rapid mesh setup in contested or comms-denied environments",
    brand: "Kestrel Mesh",
  },
  {
    id: "airport-protection",
    title: "Airport Protection",
    description: "Continuous airspace awareness, tamper-proof incident logs",
    brand: "Sentinel Ring",
  },
  {
    id: "event-security",
    title: "Event Security",
    description: "Stadium and venue coverage with real-time operator alerts",
    brand: "Sentinel Ring",
  },
  {
    id: "critical-infrastructure",
    title: "Critical Infrastructure",
    description: "Power plants, water treatment, data centers",
    brand: "Sentinel Ring",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Connected Intelligence</h2>
          <p className={styles.subtitle}>
            Deployable mesh sensing with on-device AI — detect, classify, and
            anchor evidence without depending on the cloud
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.featureContent}>
                <div className={styles.featureHeader}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <span
                    className={`${styles.brandBadge} ${
                      feature.brand === "Kestrel Mesh"
                        ? styles.brandConsumer
                        : feature.brand === "Sentinel Ring"
                          ? styles.brandEnterprise
                          : styles.brandBoth
                    }`}
                  >
                    {feature.brand}
                  </span>
                </div>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.useCasesSection}>
          <h3 className={styles.useCasesTitle}>Target Markets</h3>
          <div className={styles.useCasesGrid}>
            {useCases.map((useCase) => (
              <div key={useCase.id} className={styles.useCaseCard}>
                <span
                  className={`${styles.useCaseBadge} ${
                    useCase.brand === "Kestrel Mesh"
                      ? styles.brandConsumer
                      : styles.brandEnterprise
                  }`}
                >
                  {useCase.brand}
                </span>
                <h4 className={styles.useCaseTitle}>{useCase.title}</h4>
                <p className={styles.useCaseDescription}>
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
