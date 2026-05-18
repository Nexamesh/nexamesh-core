"use client";
import * as React from "react";
import { Footer } from "../../../components/Footer";
import { Navigation } from "../../../components/Navigation";
import styles from "../legal.module.css";

export default function PrivacyPageClient(): React.ReactElement {
  return (
    <main className={styles.main}>
      <Navigation />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.meta}>Effective: March 2026 · Last updated: March 2026</p>
        </div>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.heading}>1. What We Collect</h2>
            <p>
              When you submit a preorder, contact form, or career application we
              collect the information you provide: name, email address, phone
              number, company, and shipping address. We do not collect payment
              card details — preorders require no deposit and payment is handled
              separately before delivery.
            </p>
            <p>
              We collect standard server and analytics logs (IP address, browser
              type, pages visited, referrer) to operate and improve the site.
              We do not sell or share this data with advertising networks.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>2. How We Use It</h2>
            <ul>
              <li>To process and confirm preorders</li>
              <li>To respond to contact and partnership inquiries</li>
              <li>To communicate delivery timelines and product updates</li>
              <li>To evaluate career applications</li>
              <li>To operate and secure the website</li>
            </ul>
            <p>
              We do not use your data for automated decision-making or profiling.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>3. Data Retention</h2>
            <p>
              Preorder records are retained until the order is fulfilled or
              cancelled. Contact and inquiry records are retained for 24 months.
              Career applications are retained for 12 months then deleted unless
              you are hired.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>4. Third Parties</h2>
            <p>
              We use industry-standard hosting and analytics infrastructure.
              We do not share personal data with third parties except as required
              to operate the service (e.g. transactional email delivery) or as
              required by law.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of personal
              data we hold about you at any time by emailing{" "}
              <a href="mailto:privacy@nexamesh.ai">privacy@nexamesh.ai</a>. We
              will respond within 30 days.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>6. Cookies</h2>
            <p>
              This site uses only functional cookies (session state, theme
              preference, shopping cart). No advertising or tracking cookies are
              used.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>7. Changes</h2>
            <p>
              We may update this policy as the product and company mature. The
              effective date at the top of this page will reflect any changes.
              Material changes will be communicated by email to preorder holders.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.heading}>8. Contact</h2>
            <p>
              Questions about this policy:{" "}
              <a href="mailto:privacy@nexamesh.ai">privacy@nexamesh.ai</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
