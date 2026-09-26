import { useEffect } from "react";
import { trackEvent, trackPageView } from "../lib/analytics";

const NAVIGATION_EVENT = "puffbeyond:navigation";

function currentPath() {
  return `${window.location.pathname}${window.location.search}`;
}

function socialPlatform(href: string) {
  try {
    const hostname = new URL(href, window.location.origin).hostname.toLowerCase();

    if (hostname.includes("instagram.com")) return "instagram";
    if (hostname.includes("facebook.com")) return "facebook";
    if (hostname.includes("tiktok.com")) return "tiktok";
    if (hostname.includes("x.com") || hostname.includes("twitter.com")) return "x";
  } catch {
    // Ignore invalid external URLs; the link itself will still behave normally.
  }

  return undefined;
}

export function AnalyticsTracker() {
  useEffect(() => {
    let lastPath = currentPath();
    trackPageView();

    const onNavigation = () => {
      const nextPath = currentPath();
      if (nextPath === lastPath) return;

      lastPath = nextPath;
      trackPageView();
    };

    const notifyNavigation = () => window.dispatchEvent(new Event(NAVIGATION_EVENT));
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      notifyNavigation();
    };
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      notifyNavigation();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      const cta = target.closest<HTMLElement>("[data-analytics-cta]");
      const href = link?.href;

      if (link?.getAttribute("href")?.startsWith("tel:")) {
        trackEvent("click_phone", { phone_number: link.getAttribute("href")?.slice(4) });
      }

      if (href?.includes("google.com/maps")) {
        trackEvent("click_directions", { destination_url: href });
      }

      const platform = href ? socialPlatform(href) : undefined;
      if (platform) {
        trackEvent("click_social", { platform, destination_url: href });
      }

      if (cta) {
        trackEvent("click_cta", {
          button_name: cta.dataset.analyticsCta ?? cta.textContent?.trim() ?? "unknown",
          destination_url: href,
        });
      }
    };

    window.addEventListener("popstate", onNavigation);
    window.addEventListener(NAVIGATION_EVENT, onNavigation);
    document.addEventListener("click", onClick);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", onNavigation);
      window.removeEventListener(NAVIGATION_EVENT, onNavigation);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
