/**
 * LocalStorage Utilities
 *
 * Utilities for managing localStorage with a focus on onboarding and profile data.
 * Base safe-access helpers (SSR guard + silent fail) come from @nexamesh/utils.
 */

import { safeRemove, safeClear, safeGet } from "@nexamesh/utils";

// All known localStorage keys used by the application
const ONBOARDING_KEYS = [
  "phoenix-docs-onboarding-completed",
  "phoenix-docs-onboarding-step",
  "phoenix-docs-profile-confirmed",
  "phoenix-docs-user-profile",
  "phoenix-docs-profile-pending",
  "phoenix-docs-user-details",
  "phoenix-docs-user-fun-facts",
];

/**
 * Clear all onboarding-related localStorage data.
 * Use this to reset a user's onboarding state and force them through the flow again.
 * This is useful when debugging or when there's corrupted state.
 */
export function clearOnboardingData(): void {
  ONBOARDING_KEYS.forEach((key) => safeRemove(key));
  console.debug(
    "[localStorage] Onboarding data cleared. User will see onboarding flow on next page load.",
  );
}

/**
 * Clear ALL localStorage data for the application.
 * WARNING: This will reset all user preferences, progress, and cached data.
 * Use with caution - typically only for debugging or at user request.
 */
export function clearAllLocalStorage(): void {
  safeClear();
  console.debug(
    "[localStorage] All data cleared. Page will reload to reset state.",
  );
}

/**
 * Get diagnostic information about current localStorage state.
 * Useful for debugging onboarding issues.
 */
export function getOnboardingDiagnostics(): {
  keys: Array<{ key: string; value: string | null; parsed?: unknown }>;
  totalSize: number;
} {
  let totalSize = 0;
  const keys = ONBOARDING_KEYS.map((key) => {
    const value = safeGet(key);
    // More efficient size calculation: use byte length of UTF-8 encoding
    // Fallback to simple length * 2 for environments without TextEncoder (like tests)
    const size = value
      ? typeof TextEncoder !== "undefined"
        ? new TextEncoder().encode(value).length
        : value.length * 2
      : 0;
    totalSize += size;

    let parsed: unknown = undefined;
    if (value) {
      try {
        parsed = JSON.parse(value);
      } catch {
        // Not JSON, leave as undefined
      }
    }

    return { key, value, parsed };
  });

  return { keys, totalSize };
}

/**
 * Check if onboarding data appears to be corrupted or in an invalid state.
 * Returns true if there are signs of corruption.
 */
export function isOnboardingDataCorrupted(): boolean {
  try {
    // Check if profile confirmed but no profile data
    const confirmed = safeGet("phoenix-docs-profile-confirmed");
    const profileData = safeGet("phoenix-docs-user-profile");

    if (confirmed) {
      try {
        const confirmedData = JSON.parse(confirmed);
        if (confirmedData.confirmed && !confirmedData.skipped && !profileData) {
          return true; // Profile confirmed but no profile data exists
        }
      } catch {
        // Failed to parse profile confirmation data - consider it corrupted
        return true;
      }
    }

    // Check if onboarding completed but no profile
    const completed = safeGet("phoenix-docs-onboarding-completed");
    if (completed) {
      try {
        const completedData = JSON.parse(completed);
        if (completedData.completed && !confirmed) {
          return true; // Onboarding completed but no profile confirmation
        }
      } catch {
        // Failed to parse onboarding completion data - consider it corrupted
        return true;
      }
    }

    return false;
  } catch {
    // If we encounter any unexpected error, consider it potentially corrupted
    return true;
  }
}

/**
 * Attempt to auto-fix corrupted onboarding data.
 * Returns true if a fix was attempted.
 */
export function autoFixOnboardingData(): boolean {
  if (!isOnboardingDataCorrupted()) {
    return false;
  }

  console.warn(
    "Detected corrupted onboarding data. Clearing to force fresh start.",
  );
  clearOnboardingData();
  return true;
}
