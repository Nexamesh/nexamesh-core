"use client";
import * as React from "react";
import { Footer } from "../../../components/Footer";
import { Navigation } from "../../../components/Navigation";
import styles from "../legal.module.css";

export default function TermsPageClient(): React.ReactElement {
  return (
    <main className={styles.main}>
      <Navigation />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.meta}>Effective: March 2026 · Last updated: March 2026</p>
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.heading}>1. About NexaMesh</h2>
            <p>
              NexaMesh is an R&D-stage counter-UAS detection platform operated
              by NexaMesh Technologies (Delaware C-Corp in formation). By using
              this website you agree to these terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>2. Preorders</h2>
            <p>
              Preorders are reservations only — no payment is collected at the
              time of reservation. A preorder does not constitute a contract of
              sale. Prices, specifications, and delivery timelines are estimates
              and subject to change. We will notify you before any payment is
              requested.
            </p>
            <p>
              You may cancel your preorder at any time before payment is
              requested by emailing{" "}
              <a href="mailto:orders@nexamesh.ai">orders@nexamesh.ai</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>3. Simulations and Metrics</h2>
            <p>
              Performance figures, detection metrics, and ROI projections on
              this site are illustrative estimates based on design specifications
              and modelled scenarios. They do not represent verified,
              independently tested, or certified results. NexaMesh makes no
              warranty that actual deployed performance will match any figure
              shown on this site.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>4. Acceptable Use</h2>
            <p>
              This site is for informational and commercial purposes only. You
              may not use it to attempt to gain unauthorised access to systems,
              scrape data in bulk, or impersonate NexaMesh or its personnel.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>5. Intellectual Property</h2>
            <p>
              All content, trademarks, and technology described on this site are
              proprietary to NexaMesh Technologies. Nothing on this site grants
              any licence to NexaMesh intellectual property.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>6. Export Controls</h2>
            <p>
              NexaMesh products may be subject to export control regulations
              including ITAR and EAR. By placing a preorder you confirm you are
              not on any restricted party list and that you will comply with all
              applicable export laws. NexaMesh reserves the right to decline any
              order for compliance reasons.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, NexaMesh is not liable for
              any indirect, incidental, or consequential damages arising from use
              of this website or reliance on information presented here.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Delaware,
              United States, without regard to conflict of law principles.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>9. Contact</h2>
            <p>
              Legal enquiries:{" "}
              <a href="mailto:legal@nexamesh.ai">legal@nexamesh.ai</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
