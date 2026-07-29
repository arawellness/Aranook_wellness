declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const MEASUREMENT_ID: string =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ||
  "G-M167F4BT6D";

const CONSENT_STORAGE_KEY = "ga_consent_v1";
const SCRIPT_ID = "ga-gtag-script";

let initialized = false;

// ─── Consent helpers ──────────────────────────────────────────────────────
export type ConsentValue = "granted" | "denied" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (raw === "granted" || raw === "denied") return raw;
  return null;
}

export function setConsent(value: "granted" | "denied") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  if (value === "granted") {
    initGA();
  } else {
    // Ensure future events are ignored if user declined
    initialized = false;
  }
}

// ─── GA loader ────────────────────────────────────────────────────────────
export function initGA(): void {
  if (typeof window === "undefined") return;
  if (initialized) return;
  if (!MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // Manual page_view control so SPA route changes work correctly.
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  initialized = true;

  // Send the first page view once GA is armed.
  trackPageView(window.location.pathname + window.location.search + window.location.hash);
}

// ─── Tracking helpers ─────────────────────────────────────────────────────
export function trackPageView(path?: string, title?: string): void {
  if (!initialized || typeof window === "undefined" || !window.gtag) return;
  const page_path =
    path ??
    window.location.pathname + window.location.search + window.location.hash;
  window.gtag("event", "page_view", {
    page_path,
    page_title: title ?? document.title,
    page_location: window.location.href,
    send_to: MEASUREMENT_ID,
  });
}

export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
): void {
  if (!initialized || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export function trackButtonClick(
  label: string,
  extra: Record<string, any> = {}
): void {
  trackEvent("button_click", { label, ...extra });
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 100): void {
  trackEvent("scroll_depth", {
    percent_scrolled: depth,
    page_path:
      typeof window !== "undefined"
        ? window.location.pathname + window.location.hash
        : undefined,
  });
}

export const GA_MEASUREMENT_ID = MEASUREMENT_ID;
