import { useEffect } from "react";
import { useLocation } from "wouter";

/** Legacy URL — canonical page is /how-much-internet-speed-do-i-need */
export default function InternetSpeedRequirementsRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate("/how-much-internet-speed-do-i-need");
  }, [navigate]);
  return null;
}
