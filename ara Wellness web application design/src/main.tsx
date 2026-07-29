import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import AnalyticsProvider from "./app/components/AnalyticsProvider";
import CookieConsent from "./app/components/CookieConsent";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <AnalyticsProvider />
    <App />
    <CookieConsent />
  </>
);
