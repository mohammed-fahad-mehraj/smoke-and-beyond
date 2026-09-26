const GA_MEASUREMENT_ID = "G-V1XP0W3ZEC";
const GA_SCRIPT_ID = "ga4-script";

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;
type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: GtagFunction;
  }
}

let isInitialized = false;
let lastTrackedPagePath: string | undefined;

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function isPublicPath(pathname = window.location.pathname) {
  return !/^\/(?:admin|private)(?:\/|$)/i.test(pathname);
}

function sendGtag(...args: unknown[]) {
  try {
    window.gtag?.(...args);
  } catch {
    // Analytics must never interrupt the storefront if a third-party script fails.
  }
}

export function initializeAnalytics() {
  if (!isBrowser() || !isPublicPath() || isInitialized) {
    return;
  }

  isInitialized = true;
  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  sendGtag("js", new Date());
  sendGtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
}

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (!isBrowser() || !isPublicPath()) {
    return;
  }

  initializeAnalytics();
  sendGtag("event", eventName, params);
}

export function trackPageView() {
  if (!isBrowser() || !isPublicPath()) {
    return;
  }

  initializeAnalytics();

  const pagePath = `${window.location.pathname}${window.location.search}`;
  if (pagePath === lastTrackedPagePath) {
    return;
  }

  lastTrackedPagePath = pagePath;
  trackEvent("page_view", {
    page_location: window.location.href,
    page_path: pagePath,
    page_title: document.title,
  });

  const locationPage = {
    "/brownsboro": { location_name: "Brownsboro", location_slug: "brownsboro" },
    "/grand-saline": { location_name: "Grand Saline", location_slug: "grand-saline" },
  }[window.location.pathname];

  if (locationPage) {
    trackEvent("view_location", locationPage);
  }
}
