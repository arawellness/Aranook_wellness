import { useEffect, useRef } from "react";
import {
  getConsent,
  initGA,
  trackButtonClick,
  trackPageView,
  trackScrollDepth,
} from "../../lib/analytics";

// Mounts once and wires up:
//   • GA initialisation (only if consent already granted from a previous visit)
//   • SPA page-view tracking (hashchange + popstate + pushState/replaceState)
//   • Delegated button-click tracking
//   • Scroll-depth tracking at 25 / 50 / 75 / 100 %
export default function AnalyticsProvider() {
  const scrollMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (getConsent() === "granted") {
      initGA();
    }

    // ── SPA page view tracking ───────────────────────────────────────────
    const handleRouteChange = () => {
      trackPageView();
    };

    // Patch history methods so we catch programmatic navigations too.
    const origPush = window.history.pushState;
    const origReplace = window.history.replaceState;
    window.history.pushState = function (...args) {
      const ret = origPush.apply(this, args as any);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };
    window.history.replaceState = function (...args) {
      const ret = origReplace.apply(this, args as any);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("locationchange", handleRouteChange);

    // ── Delegated button click tracking ──────────────────────────────────
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest<HTMLElement>(
        'button, a, [role="button"], [data-analytics]'
      );
      if (!el) return;

      const explicitLabel = el.getAttribute("data-analytics");
      const testId = el.getAttribute("data-testid");
      const ariaLabel = el.getAttribute("aria-label");
      const text = (el.innerText || el.textContent || "").trim().slice(0, 80);
      const label =
        explicitLabel || ariaLabel || testId || text || "unnamed-button";

      const tag = el.tagName.toLowerCase();
      const href = el.getAttribute("href") || undefined;
      const isOutbound =
        !!href &&
        /^https?:\/\//i.test(href) &&
        !href.includes(window.location.hostname);

      trackButtonClick(label, {
        element: tag,
        href,
        outbound: isOutbound || undefined,
        location: window.location.pathname + window.location.hash,
      });
    };
    document.addEventListener("click", handleClick, true);

    // ── Scroll depth tracking ────────────────────────────────────────────
    const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        (document.documentElement.scrollHeight ||
          document.body.scrollHeight) - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.min(100, (scrollTop / docHeight) * 100);
      for (const m of milestones) {
        if (percent >= m && !scrollMilestonesRef.current.has(m)) {
          scrollMilestonesRef.current.add(m);
          trackScrollDepth(m);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("locationchange", handleRouteChange);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("scroll", handleScroll);
      window.history.pushState = origPush;
      window.history.replaceState = origReplace;
    };
  }, []);

  return null;
}
