"use client";

import * as React from "react";
import { useState } from "react";
import { safeGet, safeSet } from "@nexamesh/utils";
import styles from "./AnnouncementBar.module.css";

const DISMISSED_KEY = "nexamesh-announcement-dismissed-2026-q3";

/**
 * Thin dismissable banner above the nav.
 * Announcement identity is keyed by DISMISSED_KEY — bump the key
 * suffix to re-show after a new announcement goes live.
 */
export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !safeGet(DISMISSED_KEY);
  });

  const dismiss = () => {
    safeSet(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.bar} role="banner">
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.message}>
        Early access open &middot; Kestrel Mesh ships Q3 2026
      </span>
      <a href="/preorder" className={styles.cta}>
        Preorder <span aria-hidden="true">→</span>
      </a>
      <button
        type="button"
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss announcement"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};
