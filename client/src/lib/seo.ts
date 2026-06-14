/** Production site origin for canonical URLs (must match sitemap & Search Console). */
export const SITE_ORIGIN = "https://speedtestboost.com";

/**
 * Sets the single document canonical URL. Uses one <link id="canonical-url"> so we never stack duplicate canonical tags (Ahrefs / Google issue).
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

/**
 * Updates the <html lang=""> attribute for the current page.
 * Also sets the Bing/IE content-language meta tag.
 * Call once per page mount; restored to "en" on unmount.
 *
 * @param lang BCP-47 tag, e.g. "en", "es", "id", "pt-BR", "fr"
 */
export function setHtmlLang(lang: string): () => void {
  const html = document.documentElement;
  const prev = html.getAttribute("lang") ?? "en";
  html.setAttribute("lang", lang);

  // Bing / legacy crawlers read http-equiv content-language
  let meta = document.querySelector('meta[http-equiv="content-language"]') as HTMLMetaElement | null;
  const metaCreated = !meta;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "content-language");
    document.head.appendChild(meta);
  }
  const prevContent = meta.getAttribute("content") ?? "en";
  meta.setAttribute("content", lang);

  return () => {
    html.setAttribute("lang", prev);
    if (metaCreated) meta?.remove();
    else meta?.setAttribute("content", prevContent);
  };
}

/**
 * Full hreflang cluster for the five language variants of SpeedTestBooster.
 * Clears any existing hreflang links first so navigating between pages never
 * leaves stale alternate links. Returns a cleanup function.
 *
 * Standard cluster (identical on all 5 pages — Google requires symmetry):
 *   en          → https://speedtestboost.com/
 *   es          → https://speedtestboost.com/es
 *   id          → https://speedtestboost.com/id
 *   pt-BR       → https://speedtestboost.com/pt-br
 *   fr          → https://speedtestboost.com/fr
 *   x-default   → https://speedtestboost.com/
 */
export function setHreflangCluster(): () => void {
  // Remove any previously injected hreflang links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

  const cluster: Array<[string, string]> = [
    ["en",        `${SITE_ORIGIN}/`],
    ["es",        `${SITE_ORIGIN}/es`],
    ["id",        `${SITE_ORIGIN}/id`],
    ["pt-BR",     `${SITE_ORIGIN}/pt-br`],
    ["fr",        `${SITE_ORIGIN}/fr`],
    ["x-default", `${SITE_ORIGIN}/`],
  ];

  const links: HTMLLinkElement[] = cluster.map(([hreflang, href]) => {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    link.setAttribute("href", href);
    document.head.appendChild(link);
    return link;
  });

  return () => links.forEach(l => l.remove());
}

/**
 * Sets og:locale (and optionally og:locale:alternate for the other variants).
 * @param locale  e.g. "en_US", "es_ES", "id_ID", "pt_BR", "fr_FR"
 */
export function setOgLocale(locale: string): void {
  // og:locale
  let el = document.querySelector('meta[property="og:locale"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", "og:locale");
    document.head.appendChild(el);
  }
  el.setAttribute("content", locale);

  // Remove any previous og:locale:alternate tags, then re-add the remaining ones
  document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(m => m.remove());

  const ALL_LOCALES: Record<string, string> = {
    en_US: `${SITE_ORIGIN}/`,
    es_ES: `${SITE_ORIGIN}/es`,
    id_ID: `${SITE_ORIGIN}/id`,
    pt_BR: `${SITE_ORIGIN}/pt-br`,
    fr_FR: `${SITE_ORIGIN}/fr`,
  };

  Object.keys(ALL_LOCALES)
    .filter(l => l !== locale)
    .forEach(alt => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:locale:alternate");
      m.setAttribute("content", alt);
      document.head.appendChild(m);
    });
}
