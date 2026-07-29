import { useEffect, useState } from "react";
import { getConsent, setConsent } from "../../lib/analytics";

// GDPR-friendly consent banner. Renders only if the user has not made a
// decision yet. Persists the choice in localStorage.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsent("granted");
    setVisible(false);
  };
  const decline = () => {
    setConsent("denied");
    setVisible(false);
  };

  return (
    <div
      data-testid="cookie-consent-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 9999,
        maxWidth: 720,
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.98)",
        color: "#1f2a1a",
        border: "1px solid rgba(166,184,155,0.4)",
        borderRadius: 14,
        boxShadow: "0 10px 30px rgba(31, 42, 26, 0.15)",
        padding: "16px 18px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 12,
        fontFamily: "inherit",
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      <div style={{ flex: "1 1 260px", minWidth: 220 }}>
        <strong style={{ display: "block", marginBottom: 4 }}>
          We value your privacy
        </strong>
        <span style={{ opacity: 0.85 }}>
          We use Google Analytics to understand how visitors interact with our
          site (page views, button clicks, scroll depth). Nothing loads until
          you accept.
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          type="button"
          data-testid="cookie-consent-decline"
          onClick={decline}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid rgba(31,42,26,0.2)",
            background: "transparent",
            color: "#1f2a1a",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Decline
        </button>
        <button
          type="button"
          data-testid="cookie-consent-accept"
          onClick={accept}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            border: "none",
            background: "#5b7a4a",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
