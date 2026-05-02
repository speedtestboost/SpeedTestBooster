/** Production site origin for canonical URLs (must match sitemap & Search Console). */
export const SITE_ORIGIN = "https://speedtestboost.com";

/**
 * Sets the single document canonical URL. Uses one &lt;link id="canonical-url"&gt; so we never stack duplicate canonical tags (Ahrefs / Google issue).
 */
export function setCanonicalHref(absoluteUrl: string): void {
  let el = document.getElementById("canonical-url") as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.id = "canonical-url";
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.setAttribute("href", absoluteUrl);
}
