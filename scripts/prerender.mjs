/**
 * Per-route static-HTML prerender for SpeedTestBooster.
 *
 * The site is a Vite + React SPA, so a single index.html is served for every
 * URL. Crawlers that don't execute JavaScript (Ahrefs default site audit, Bing,
 * social previewers, etc.) see the same shell for every URL, which surfaces as
 * "Duplicate pages without canonical", "H1 tag missing", "Low word count",
 * "Meta description too long" and "Orphan page" warnings.
 *
 * This script reads dist/public/sitemap.xml after `vite build`, derives
 * per-route SEO metadata (title, meta description, canonical, H1, body copy,
 * internal links) from URL patterns plus a small lookup of country, city,
 * language and provider names, and writes one prerendered <route>.html file
 * per sitemap entry into dist/public.
 *
 * Each generated file:
 *   - Has its own <title>, <meta name="description"> and <link rel="canonical">
 *   - Has matching og:* and twitter:* tags
 *   - Embeds a real <h1>, body paragraph and internal-link nav inside #root,
 *     which React's createRoot replaces on mount (no hydration mismatch)
 *
 * The .htaccess on the deploy targets is updated to internally rewrite a
 * request like /about to /about.html when that file exists, falling back to
 * index.html (SPA) when it does not. The browser URL never changes, so
 * existing inbound links keep working without a 301 redirect.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "dist", "public");
const SITEMAP = path.join(PUBLIC_DIR, "sitemap.xml");
const TEMPLATE = path.join(PUBLIC_DIR, "index.html");
const SITE_ORIGIN = "https://speedtestboost.com";

/** Country-code → human display name. */
const COUNTRIES = {
  us: "United States",
  uk: "United Kingdom",
  au: "Australia",
  ca: "Canada",
  de: "Germany",
  sg: "Singapore",
  th: "Thailand",
  nl: "Netherlands",
  in: "India",
  mx: "Mexico",
  my: "Malaysia",
  id: "Indonesia",
  es: "Spain",
  za: "South Africa",
  ar: "Argentina",
  ae: "UAE",
  sa: "Saudi Arabia",
  pl: "Poland",
  fr: "France",
  it: "Italy",
  br: "Brazil",
  ph: "Philippines",
};

const CITIES = {
  mumbai: "Mumbai",
  delhi: "Delhi",
  bangalore: "Bangalore",
  hyderabad: "Hyderabad",
  chennai: "Chennai",
  kolkata: "Kolkata",
};

/**
 * Display names for the provider slugs used in /providers/<cc>/<slug>.
 * Anything not listed here is title-cased automatically (e.g. "vodacom-fibre"
 * → "Vodacom Fibre").
 */
const PROVIDER_NAMES = {
  // US
  verizon: "Verizon Fios",
  comcast: "Comcast Xfinity",
  att: "AT&T",
  spectrum: "Charter Spectrum",
  centurylink: "CenturyLink",
  optimum: "Optimum",
  cox: "Cox Communications",
  frontier: "Frontier",
  windstream: "Windstream",
  // UK
  sky: "Sky Broadband",
  bt: "BT Broadband",
  "virgin-media": "Virgin Media",
  // Canada
  bell: "Bell Canada",
  rogers: "Rogers",
  telus: "Telus",
  // Germany
  "deutsche-telekom": "Deutsche Telekom",
  "vodafone-de": "Vodafone Germany",
  "o2-de": "O2 Germany",
  // Australia
  telstra: "Telstra",
  optus: "Optus",
  tpg: "TPG",
  // Netherlands
  kpn: "KPN",
  vodafoneziggo: "VodafoneZiggo",
  odido: "Odido",
  // India
  "jio-fiber": "Jio Fiber",
  "airtel-broadband": "Airtel Xstream Fiber",
  "act-fibernet": "ACT Fibernet",
  "bsnl-broadband": "BSNL Bharat Fiber",
  "hathway-broadband": "Hathway Broadband",
  // France / Italy / Brazil
  orange: "Orange France",
  tim: "TIM Italia",
  vivo: "Vivo Fibra",
  // Mexico
  telmex: "Telmex Infinitum",
  izzi: "Izzi Telecom",
  megacable: "Megacable",
  totalplay: "Totalplay",
  // Philippines
  pldt: "PLDT Home Fibr",
  globe: "Globe at Home",
  converge: "Converge ICT",
  dito: "DITO Telecommunity",
  // Indonesia
  indihome: "IndiHome",
  biznet: "Biznet Home",
  "first-media": "First Media",
  myrepublic: "MyRepublic",
  // Spain
  movistar: "Movistar",
  "orange-es": "Orange Spain",
  "vodafone-es": "Vodafone Spain",
  masorange: "MasOrange",
  // South Africa
  rain: "Rain",
  "vodacom-fibre": "Vodacom Fibre",
  "cool-ideas": "Cool Ideas",
  afrihost: "Afrihost",
  // Malaysia
  unifi: "Unifi (TM)",
  maxis: "Maxis Fibre",
  time: "TIME Fibre",
  celcom: "Celcom",
  // Argentina
  "movistar-ar": "Movistar Argentina",
  personal: "Personal Flow",
  claro: "Claro Argentina",
  telecentro: "Telecentro",
  // UAE
  etisalat: "Etisalat",
  du: "du",
  "virgin-mobile-ae": "Virgin Mobile UAE",
  yalla: "Yalla",
  // Saudi Arabia
  stc: "STC",
  mobily: "Mobily",
  zain: "Zain",
  go: "GO Telecom",
  // Singapore
  singtel: "Singtel",
  starhub: "StarHub",
  m1: "M1",
  // Thailand
  ais: "AIS Fibre",
  "true-th": "True Online",
  "3bb": "3BB Fibre",
  // Poland
  "orange-pl": "Orange Poland",
  "play-pl": "Play",
  "t-mobile-pl": "T-Mobile Poland",
};

const LANGUAGE_PAGES = {
  "/es": {
    title: "Test de Velocidad de Internet - Mide tu Velocidad WiFi y Banda Ancha",
    description:
      "Test de velocidad de internet gratuito y sin anuncios. Mide tu velocidad de descarga, subida, ping y jitter en segundos en cualquier dispositivo.",
    h1: "Test de Velocidad de Internet",
    body:
      "Comprueba al instante la velocidad real de tu conexión de internet con nuestra herramienta gratuita y precisa. Mide la velocidad de descarga, subida, ping y jitter en redes WiFi y por cable, sin descargas ni anuncios.",
    lang: "es",
    ogLocale: "es_ES",
  },
  "/id": {
    title: "Tes Kecepatan Internet - Cek Kecepatan WiFi dan Broadband",
    description:
      "Tes kecepatan internet gratis tanpa iklan. Ukur kecepatan unduh, unggah, ping, dan jitter di semua perangkat dalam hitungan detik.",
    h1: "Tes Kecepatan Internet",
    body:
      "Cek kecepatan koneksi internet Anda secara akurat dengan alat tes gratis kami. Mengukur kecepatan unduh, unggah, ping, dan jitter pada jaringan WiFi maupun kabel, tanpa iklan atau aplikasi tambahan.",
    lang: "id",
    ogLocale: "id_ID",
  },
  "/pt-br": {
    title: "Teste de Velocidade da Internet - Meça WiFi e Banda Larga",
    description:
      "Teste de velocidade da internet grátis e sem anúncios. Meça download, upload, ping e jitter em poucos segundos em qualquer dispositivo.",
    h1: "Teste de Velocidade da Internet",
    body:
      "Verifique a velocidade real da sua conexão de internet com nossa ferramenta gratuita e precisa. Mede velocidade de download, upload, ping e jitter em WiFi e cabo, sem downloads nem anúncios.",
    lang: "pt-BR",
    ogLocale: "pt_BR",
  },
  "/fr": {
    title: "Test de Vitesse Internet - Mesurez Votre Wi-Fi et Haut Débit",
    description:
      "Test de vitesse internet gratuit et sans publicité. Mesurez vos débits de téléchargement, d'envoi, le ping et la gigue en quelques secondes.",
    h1: "Test de Vitesse Internet",
    body:
      "Mesurez instantanément la vitesse réelle de votre connexion internet avec notre outil gratuit et précis. Évalue les débits descendants et montants, le ping et la gigue, sur Wi-Fi comme en filaire, sans téléchargement ni publicité.",
    lang: "fr",
    ogLocale: "fr_FR",
  },
};

/**
 * The full hreflang cluster — must appear on all 5 language-variant pages
 * (including the English homepage) and be identical across all of them.
 * Google validates that each URL in the cluster reciprocally lists all others.
 */
const HREFLANG_CLUSTER = [
  { hreflang: "en",        href: `${SITE_ORIGIN}/` },
  { hreflang: "es",        href: `${SITE_ORIGIN}/es` },
  { hreflang: "id",        href: `${SITE_ORIGIN}/id` },
  { hreflang: "pt-BR",     href: `${SITE_ORIGIN}/pt-br` },
  { hreflang: "fr",        href: `${SITE_ORIGIN}/fr` },
  { hreflang: "x-default", href: `${SITE_ORIGIN}/` },
];

/** Build the <link rel="alternate" hreflang="..."> tags as an HTML string. */
function buildHreflangTags() {
  return HREFLANG_CLUSTER.map(
    ({ hreflang, href }) =>
      `    <link rel="alternate" hreflang="${hreflang}" href="${href}" />`
  ).join("\n");
}

const STATIC_PAGES = {
  "/": {
    title: "Free Internet Speed Test Online - No Ads, No Downloads Required",
    description:
      "Free internet speed test online with no ads or downloads. Accurate WiFi speed test, bandwidth checker and speed booster test that works on mobile and desktop.",
    h1: "Free Internet Speed Test",
    body:
      "Run an accurate, ad-free internet speed test in your browser. Measure download speed, upload speed, ping, jitter and packet loss across WiFi and wired connections in under 30 seconds, with no app installs or sign-up required.",
    lang: "en",
    ogLocale: "en_US",
  },
  "/about": {
    title: "About Speed Test & Boost - Free Internet Speed Tests for Every Country",
    description:
      "Learn about Speed Test & Boost, the free, ad-free speed test platform that measures download, upload, ping and jitter across global ISPs and major cities.",
    h1: "About Speed Test & Boost",
    body:
      "Speed Test & Boost is a free, browser-based internet speed test built for honest, ad-free benchmarking. We help users in every region understand their real download speed, upload speed, ping and jitter, and compare results across ISPs and cities.",
  },
  "/help": {
    title: "Help & FAQ - How to Use the Internet Speed Test",
    description:
      "Help center and FAQ for the Speed Test & Boost internet speed test. Learn how to measure WiFi speed, fix slow connections and read your speed test results.",
    h1: "Help & FAQ",
    body:
      "Find answers to common questions about how the speed test works, how to read download, upload, ping and jitter results, and what to do when your WiFi or broadband connection is slower than expected.",
  },
  "/internet-speed-requirements": {
    title: "Internet Speed Requirements 2026 - How Much Speed Do You Need?",
    description:
      "Find the right internet speed for streaming, gaming, video calls and remote work in 2026. Compare Mbps requirements per device and household size.",
    h1: "Internet Speed Requirements 2026",
    body:
      "Use our internet speed requirements guide to choose the right broadband plan for streaming, gaming, video conferencing and remote work. Compare recommended Mbps per device, household size and use case so you never overpay or underprovision.",
  },
  "/speed-test-comparison": {
    title:
      "Speed Test Comparison 2026: Speedtest vs Fast vs Google Speed Test Explained",
    description:
      "Compare Speedtest (Ookla), Fast.com, Google/M-Lab and CDN testers. Understand why Mbps numbers disagree and combine them with jitter, packet loss, bufferbloat and DNS diagnostics.",
    h1: "Speed test comparison hub",
    body:
      "Learn how flagship internet throughput tests route traffic differently, when to trust each vantage point for ISP disputes or streaming woes, and how Speed Test Boost layers jitter, packet loss, DNS and bufferbloat tests on top of classic Mbps benchmarks.",
  },
  "/gaming-speed-test": {
    title: "Internet Speed Test for Gaming 2026 — Ping, Jitter & Latency That Actually Matter",
    description:
      "Free gaming internet speed test. Check ping, jitter, packet loss and bufferbloat — the metrics that actually cause lag in Valorant, Fortnite, CoD, FIFA and other online games. Not just Mbps.",
    h1: "Internet Speed Test for Gaming",
    body:
      "High Mbps doesn't stop lag. Discover the four metrics that determine online gaming performance — ping, jitter, packet loss and bufferbloat — and use our free tools to diagnose and fix every source of lag in Valorant, Fortnite, Call of Duty, FIFA and more.",
  },
  "/isp-throttling-test": {
    title: "ISP Throttling Test 2026 — Detect If Your Internet Is Being Throttled",
    description:
      "Free ISP throttling test. Find out if your internet provider is slowing down Netflix, gaming, YouTube or peak-hour traffic. Step-by-step throttle detection guide with free tools — no download required.",
    h1: "ISP Throttling Test",
    body:
      "Is your internet provider deliberately slowing your connection? Follow our free six-step throttle detection workflow using tools already on this site to confirm ISP throttling in under 10 minutes — covering Netflix CDN paths, peak-hour speed drops, VPN bypass tests and more.",
  },
  "/why-is-my-internet-slow": {
    title: "Why Is My Internet So Slow? 14 Causes & How to Fix Them (2026)",
    description:
      "Is your internet slow? Diagnose the real cause — from router issues to ISP throttling, WiFi interference, congestion, and DNS problems — with our free tool checklist. Step-by-step fixes for every scenario.",
    h1: "Why Is My Internet Slow?",
    body:
      "Slow internet has 14 distinct causes — from ISP peak-hour congestion and router bufferbloat to WiFi interference, DNS slowdowns and background software. Use our free 8-step diagnostic checklist and browser-based tools to find the exact bottleneck and fix it without calling your ISP.",
  },
  "/internet-providers": {
    title: "Internet Providers Worldwide - ISP Speed Tests by Country",
    description:
      "Browse internet providers worldwide and run dedicated ISP speed tests for top broadband and fiber operators in every country we cover.",
    h1: "Internet Providers Worldwide",
    body:
      "Explore internet service providers across 22+ countries and launch dedicated ISP speed tests for each operator. Compare fiber, cable and DSL performance, see typical plan speeds, and benchmark your connection against other subscribers.",
  },
  "/wifi-analyzer": {
    title: "WiFi Analyzer & Network Diagnostics Tool - Free Online",
    description:
      "Free WiFi analyzer and network diagnostics tool. Inspect your network, signal quality and WiFi performance directly in the browser without installing anything.",
    h1: "WiFi Analyzer & Network Diagnostics",
    body:
      "Diagnose WiFi quality and home network performance in your browser. Check effective throughput, jitter, latency and connection stability, and get actionable tips on router placement, channel selection and Wi-Fi 6 upgrades.",
  },
  "/ai-speed-test": {
    title: "AI Speed Test & Internet Requirements Calculator",
    description:
      "AI-powered internet speed test and requirements calculator. Get personalised broadband recommendations based on your usage, devices and household.",
    h1: "AI Speed Test & Requirements Calculator",
    body:
      "Run a smart, AI-assisted speed test that benchmarks your connection and turns the result into a personalised broadband plan recommendation. Tell us how you stream, game and work, and we'll suggest the right Mbps tier and ISP fit.",
  },
  "/jitter-test": {
    title: "Jitter Test - Measure Network Jitter and Latency Variation",
    description:
      "Free online jitter test. Measure latency variation and stability for gaming, video calls and VoIP across WiFi and wired connections.",
    h1: "Jitter Test",
    body:
      "Measure your network jitter, the variation between successive ping samples that drives lag spikes in gaming, choppy video calls and VoIP audio dropouts. Run a free jitter test to spot unstable WiFi and ISP routing issues.",
  },
  "/packet-loss-test": {
    title: "Packet Loss Test - Detect Dropped Packets on Your Network",
    description:
      "Free packet loss test. Detect dropped packets on your WiFi or broadband connection and diagnose unstable internet, gaming lag and VoIP issues.",
    h1: "Packet Loss Test",
    body:
      "Detect dropped packets on your home network with a quick browser-based packet loss test. High packet loss is the most common cause of rubber-banding in online games, frozen video calls and stuttering streams.",
  },
  "/bufferbloat-test": {
    title: "Bufferbloat Test - Check Latency Under Load",
    description:
      "Free bufferbloat test. Check how your latency spikes under upload and download load, and learn how to fix bufferbloat for smoother gaming and calls.",
    h1: "Bufferbloat Test",
    body:
      "Run a bufferbloat test to see how much your ping spikes when your connection is fully loaded. Bufferbloat is what makes Zoom calls drop and games lag during big downloads. Our test gives you a grade and actionable router fixes.",
  },
  "/dns-speed-test": {
    title: "DNS Speed Test - Compare Public DNS Resolver Performance",
    description:
      "Free DNS speed test. Benchmark resolver performance for Google, Cloudflare, Quad9 and your ISP, and pick the fastest DNS for your network.",
    h1: "DNS Speed Test",
    body:
      "Benchmark popular public DNS resolvers including Google, Cloudflare, Quad9 and OpenDNS against your ISP's default. A faster DNS resolver shaves milliseconds off every page load, often more noticeably than a faster broadband plan.",
  },
  "/bandwidth-calculator": {
    title: "Bandwidth Calculator - How Much Internet Speed Do You Need?",
    description:
      "Free bandwidth calculator. Estimate the internet speed you need based on streaming, gaming, video calls, downloads and the number of devices.",
    h1: "Bandwidth Calculator",
    body:
      "Tell our bandwidth calculator how many people stream, game, work or learn from home, and we'll add up the recommended Mbps for every concurrent activity so you can pick a broadband plan that won't choke at peak times.",
  },
  "/speed-test-faq": {
    title: "Speed Test FAQ - Answers to Common Internet Speed Questions",
    description:
      "Speed test FAQ covering download speed, upload speed, ping, jitter, WiFi vs Ethernet, ISP throttling and how to read accurate speed test results.",
    h1: "Speed Test FAQ",
    body:
      "Browse plain-English answers to the most common speed test questions: what counts as a good Mbps, how to read ping and jitter, why WiFi is slower than Ethernet, and how to confirm whether your ISP is throttling your connection.",
  },
  "/download-speed-guide": {
    title: "Download Speed Guide - Mbps Explained for Every Activity",
    description:
      "A practical download speed guide. Learn how many Mbps you need for 4K streaming, gaming, video calls, downloads and a multi-device household.",
    h1: "Download Speed Guide",
    body:
      "Use our download speed guide to translate Mbps into real-world performance. We map common activities, 4K streaming, online gaming, large software downloads, multi-device households, to recommended download speed tiers and ISP plans.",
  },
  "/upload-speed-guide": {
    title: "Upload Speed Guide - How Much Upload Mbps You Actually Need",
    description:
      "Upload speed guide for 2026. Find out how many Mbps you need for HD video calls, cloud backups, live streaming and remote work without buffering.",
    h1: "Upload Speed Guide",
    body:
      "Upload speed is the silent bottleneck of modern broadband. Our upload speed guide explains why HD video calls, cloud backups, live streaming and remote work need more upstream Mbps than most ISPs advertise, and how to test for it.",
  },
  "/wifi-speed-optimization": {
    title: "WiFi Speed Optimization Guide - Faster WiFi at Home",
    description:
      "Boost your WiFi speed with our optimization guide: better router placement, channel selection, Wi-Fi 6 upgrades and tips to fix slow WiFi at home.",
    h1: "WiFi Speed Optimization Guide",
    body:
      "Slow WiFi is rarely an ISP problem. Our optimization guide walks through router placement, 2.4 vs 5 GHz channels, mesh systems, Wi-Fi 6 upgrades and interference fixes that consistently restore the broadband speed you're paying for.",
  },
  "/ping-test": {
    title: "Ping Test - Measure Internet Latency Online",
    description:
      "Free online ping test. Measure your internet latency, packet round-trip time and connection responsiveness for gaming, calls and remote work.",
    h1: "Ping Test",
    body:
      "Measure your internet latency in milliseconds with a quick browser-based ping test. Lower ping means snappier web browsing, smoother online gaming and clearer video calls. Test from any device without installing software.",
  },
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/internet-providers", label: "All Internet Providers" },
  { href: "/wifi-analyzer", label: "WiFi Analyzer" },
  { href: "/ai-speed-test", label: "AI Speed Test" },
  { href: "/speed-test-faq", label: "Speed Test FAQ" },
  { href: "/site-index", label: "Full Site Index" },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleCase(slug) {
  return slug
    .split("-")
    .map((part) => (part.length === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join(" ");
}

function providerDisplayName(slug) {
  return PROVIDER_NAMES[slug] || titleCase(slug);
}

function countrySpeedTestMeta(cc, routePath) {
  const country = COUNTRIES[cc] || cc.toUpperCase();
  return {
    title: `${country} Speed Test - Check Internet Speed in ${country} (2026)`,
    description: `Run a free ${country} speed test for accurate download, upload, ping and jitter. Compare broadband performance across ${country} ISPs in seconds.`,
    canonical: SITE_ORIGIN + routePath,
    h1: `${country} Speed Test`,
    body: `Test your internet connection in ${country} with a free, ad-free speed test. Measure download speed, upload speed, ping and jitter, then compare results against the typical performance of major ${country} ISPs and broadband plans.`,
  };
}

function citySpeedTestMeta(slug, routePath) {
  const city = CITIES[slug] || titleCase(slug);
  return {
    title: `${city} Speed Test - Check Internet Speed in ${city}, India`,
    description: `Free ${city} speed test for Jio Fiber, Airtel Xstream, ACT Fibernet, BSNL and more. Check WiFi and broadband speed in ${city}, India.`,
    canonical: SITE_ORIGIN + routePath,
    h1: `${city} Speed Test`,
    body: `Measure your real internet speed in ${city} with a free browser-based test. We benchmark download, upload, ping and jitter, and show how your connection compares with typical Jio Fiber, Airtel Xstream, ACT Fibernet, BSNL and Hathway plans available in ${city}.`,
  };
}

function providerMeta(cc, providerSlug, routePath) {
  const country = COUNTRIES[cc] || cc.toUpperCase();
  const provider = providerDisplayName(providerSlug);
  return {
    title: `${provider} Speed Test - Test ${provider} Internet Speed (2026)`,
    description: `Free ${provider} speed test for ${country}. Check ${provider} download, upload and ping speeds, and compare your result with typical ${provider} broadband plans.`,
    canonical: SITE_ORIGIN + routePath,
    h1: `${provider} Speed Test`,
    body: `Run a free ${provider} speed test built for ${provider} subscribers in ${country}. Measure your download speed, upload speed, ping and jitter, and benchmark the result against typical ${provider} broadband and fiber plans.`,
  };
}

function genericMeta(routePath) {
  const slug = routePath.replace(/^\//, "").replace(/\//g, " · ");
  const label = titleCase(slug.split(" · ").pop() || "page");
  return {
    title: `${label} - Speed Test & Boost`,
    description: `${label} on Speed Test & Boost. Run free internet speed tests, compare ISPs and learn how to optimise WiFi and broadband performance.`,
    canonical: SITE_ORIGIN + routePath,
    h1: label,
    body: `Welcome to ${label} on Speed Test & Boost. Use our free, ad-free speed test tools to measure download, upload, ping and jitter, and find tips to improve your WiFi and broadband performance.`,
  };
}

/**
 * Map a sitemap path → metadata object: { title, description, canonical, h1, body }.
 */
function getRouteMetadata(routePath) {
  const baseDescriptor =
    STATIC_PAGES[routePath] || LANGUAGE_PAGES[routePath] || null;
  if (baseDescriptor) {
    return {
      ...baseDescriptor,
      canonical: SITE_ORIGIN + (routePath === "/" ? "/" : routePath),
    };
  }

  let m;
  if ((m = routePath.match(/^\/([a-z]{2})-speed-test$/))) {
    return countrySpeedTestMeta(m[1], routePath);
  }
  if ((m = routePath.match(/^\/([a-z]+)-speed-test$/))) {
    return citySpeedTestMeta(m[1], routePath);
  }
  if ((m = routePath.match(/^\/providers\/([a-z]{2})\/([a-z0-9-]+)$/))) {
    return providerMeta(m[1], m[2], routePath);
  }
  return genericMeta(routePath);
}

/**
 * Build the prerendered #root content. React's createRoot replaces this the
 * moment it mounts, so users still get the regular SPA UI; non-JS crawlers
 * (Ahrefs, Bingbot, social previewers) see the SEO payload (h1, body copy,
 * internal links) directly in the static HTML.
 *
 * The block is rendered as ordinary, visible content - never display:none or
 * off-screen positioning, since search engines may flag those as cloaking.
 * It's only on screen for the ~100ms it takes the React bundle to hydrate the
 * route and replace #root.
 */
function buildPrerenderedBody(meta) {
  const navItems = NAV_LINKS.map(
    (link) =>
      `<a href="${link.href}" rel="noopener">${escapeHtml(link.label)}</a>`,
  ).join(" &middot; ");
  return [
    `<div data-prerender="seo" class="prerender-seo">`,
    `<h1>${escapeHtml(meta.h1)}</h1>`,
    `<p>${escapeHtml(meta.body)}</p>`,
    `<nav aria-label="Site navigation">${navItems}</nav>`,
    `</div>`,
  ].join("");
}

/**
 * Apply per-route metadata to the SPA template HTML.
 *
 * The template is the post-vite-build dist/public/index.html, which already
 * has all the asset <script>/<link> tags vite injected. We only swap the SEO
 * sensitive bits and the empty #root div.
 */
function renderTemplate(template, meta) {
  let html = template;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
  );

  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
  );

  // Inject a single, per-route canonical and clear out any explanatory
  // comments (or older canonical tags) that earlier templates may have
  // emitted, so we never end up with stale comments next to the new tag and
  // never accumulate duplicate <link rel="canonical"> on re-runs.
  const canonicalTag = `<link rel="canonical" href="${meta.canonical}" />`;
  // Drop every existing canonical link tag.
  html = html.replace(/<link[^>]+rel="canonical"[^>]*>\s*\r?\n?/gi, "");
  // Drop any HTML comment that talks about the canonical. We author several
  // wordings over time, all containing the word "canonical". The tempered
  // token (?:(?!-->)[\s\S])*? prevents the match from jumping across comment
  // boundaries and accidentally swallowing unrelated head content.
  const singleCanonicalCommentRe =
    /<!--(?:(?!-->)[\s\S])*?canonical(?:(?!-->)[\s\S])*?-->\s*\r?\n?/gi;
  html = html.replace(singleCanonicalCommentRe, "");
  // Insert the new tag right after the robots meta so it lives in a
  // predictable spot in <head>.
  if (/<meta\s+name="robots"[^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name="robots"[^>]*>/i,
      (match) => `${match}\n    ${canonicalTag}`,
    );
  } else {
    html = html.replace(/<\/head>/i, `    ${canonicalTag}\n  </head>`);
  }

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta property="og:url" content="${meta.canonical}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?\s*>/i,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  );

  const prerenderedBody = buildPrerenderedBody(meta);
  // Replace the empty #root div, but leave it as a real container React can mount into.
  html = html.replace(
    /<div\s+id="root"\s*>\s*<\/div>/i,
    `<div id="root">${prerenderedBody}</div>`,
  );

  // ── Geo / i18n: language routes need correct lang attr + hreflang cluster ──
  // The hreflang cluster is required on ALL 5 language-variant pages so Google
  // can verify the reciprocal relationship even from non-JS crawls.
  const isLanguageVariant = Boolean(meta.lang && meta.lang !== "en");
  const isHomepage = meta.canonical === `${SITE_ORIGIN}/` || meta.canonical === `${SITE_ORIGIN}`;

  if (isLanguageVariant || isHomepage) {
    // 1. Set the correct lang="…" on the <html> element.
    const pageLang = meta.lang ?? "en";
    html = html.replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${pageLang}"`);

    // 2. Remove any existing hreflang link tags (none in the template, but be safe).
    html = html.replace(/<link[^>]+hreflang="[^"]*"[^>]*>\s*\r?\n?/gi, "");

    // 3. Inject the full hreflang cluster just before </head>.
    html = html.replace(/<\/head>/i, `${buildHreflangTags()}\n  </head>`);

    // 4. Inject / update og:locale if the page has one defined.
    if (meta.ogLocale) {
      if (/<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?\s*>/i.test(html)) {
        html = html.replace(
          /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?\s*>/i,
          `<meta property="og:locale" content="${meta.ogLocale}" />`,
        );
      } else {
        // Insert after og:url
        html = html.replace(
          /(<meta\s+property="og:url"[^>]*>)/i,
          `$1\n    <meta property="og:locale" content="${meta.ogLocale}" />`,
        );
      }
    }
  }

  return html;
}

function readSitemapPaths() {
  const xml = readFileSync(SITEMAP, "utf8");
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return Array.from(
    new Set(
      matches
        .map((match) => match[1].trim())
        .filter((url) => url.startsWith(SITE_ORIGIN))
        .map((url) => {
          const tail = url.slice(SITE_ORIGIN.length);
          return tail === "" ? "/" : tail;
        }),
    ),
  );
}

function outputPathFor(routePath) {
  if (routePath === "/" || routePath === "") {
    return path.join(PUBLIC_DIR, "index.html");
  }
  return path.join(PUBLIC_DIR, `${routePath.replace(/^\//, "")}.html`);
}

async function main() {
  if (!existsSync(PUBLIC_DIR)) {
    console.error("[prerender] dist/public not found. Run `vite build` first.");
    process.exit(1);
  }
  if (!existsSync(SITEMAP)) {
    console.error(
      "[prerender] dist/public/sitemap.xml not found. Make sure client/public/sitemap.xml exists.",
    );
    process.exit(1);
  }
  if (!existsSync(TEMPLATE)) {
    console.error("[prerender] dist/public/index.html not found.");
    process.exit(1);
  }

  const template = await fs.readFile(TEMPLATE, "utf8");
  const routes = readSitemapPaths();

  let written = 0;
  let skipped = 0;
  for (const route of routes) {
    // /site-index ships as a hand-written static file in client/public, so we
    // never overwrite it with a templated SPA shell.
    if (route === "/site-index") {
      skipped += 1;
      continue;
    }
    const meta = getRouteMetadata(route);
    const html = renderTemplate(template, meta);
    const outFile = outputPathFor(route);
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, html, "utf8");
    written += 1;
  }

  console.log(
    `[prerender] Wrote ${written} per-route HTML file(s) to ${path.relative(ROOT, PUBLIC_DIR)} (skipped ${skipped}).`,
  );
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
