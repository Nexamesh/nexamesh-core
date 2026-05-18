/**
 * Safe localStorage helpers — SSR guard + silent fail on quota/security errors.
 */

export function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // silent fail — caller continues with in-memory state
  }
}

export function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // silent fail
  }
}

export function safeClear(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.clear();
  } catch {
    // silent fail
  }
}
