import { useEffect } from "react";
import { useLocation } from "wouter";

/** Scrolls to top on client-side navigation (fixes SPA preserving scroll position). */
export default function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
