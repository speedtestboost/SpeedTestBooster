import { useEffect } from "react";
import { applyPageSEO, buildWebPageJsonLd, SITE_ORIGIN } from "@/lib/seo";

/** Country codes → display names (mirrors scripts/prerender.mjs). */
const COUNTRIES: Record<string, string> = {
  us: "United States",
  uk: "United Kingdom",
  ca: "Canada",
  de: "Germany",
  au: "Australia",
  nl: "Netherlands",
  in: "India",
  fr: "France",
  it: "Italy",
  br: "Brazil",
  mx: "Mexico",
  ph: "Philippines",
  id: "Indonesia",
  es: "Spain",
  za: "South Africa",
  my: "Malaysia",
  ar: "Argentina",
  ae: "UAE",
  sa: "Saudi Arabia",
  pl: "Poland",
  sg: "Singapore",
  th: "Thailand",
};

/** Provider slugs → display names (mirrors scripts/prerender.mjs). */
export const PROVIDER_DISPLAY_NAMES: Record<string, string> = {
  verizon: "Verizon Fios",
  comcast: "Comcast Xfinity",
  att: "AT&T",
  spectrum: "Charter Spectrum",
  centurylink: "CenturyLink",
  optimum: "Optimum",
  cox: "Cox Communications",
  frontier: "Frontier",
  windstream: "Windstream",
  sky: "Sky Broadband",
  bt: "BT Broadband",
  "virgin-media": "Virgin Media",
  bell: "Bell Canada",
  rogers: "Rogers",
  telus: "Telus",
  "deutsche-telekom": "Deutsche Telekom",
  "vodafone-de": "Vodafone Germany",
  "o2-de": "O2 Germany",
  telstra: "Telstra",
  optus: "Optus",
  tpg: "TPG",
  kpn: "KPN",
  vodafoneziggo: "VodafoneZiggo",
  odido: "Odido",
  "jio-fiber": "Jio Fiber",
  "airtel-broadband": "Airtel Xstream Fiber",
  "act-fibernet": "ACT Fibernet",
  "bsnl-broadband": "BSNL Bharat Fiber",
  "hathway-broadband": "Hathway Broadband",
  orange: "Orange France",
  tim: "TIM Italia",
  vivo: "Vivo Fibra",
  telmex: "Telmex Infinitum",
  izzi: "Izzi Telecom",
  megacable: "Megacable",
  totalplay: "Totalplay",
  pldt: "PLDT Home Fibr",
  globe: "Globe at Home",
  converge: "Converge ICT",
  dito: "DITO Telecommunity",
  indihome: "IndiHome",
  biznet: "Biznet Home",
  "first-media": "First Media",
  myrepublic: "MyRepublic",
  movistar: "Movistar",
  "orange-es": "Orange Spain",
  "vodafone-es": "Vodafone Spain",
  masorange: "MasOrange",
  rain: "Rain",
  "vodacom-fibre": "Vodacom Fibre",
  "cool-ideas": "Cool Ideas",
  afrihost: "Afrihost",
  unifi: "Unifi (TM)",
  maxis: "Maxis Fibre",
  time: "TIME Fibre",
  celcom: "Celcom",
  "movistar-ar": "Movistar Argentina",
  personal: "Personal Flow",
  claro: "Claro Argentina",
  telecentro: "Telecentro",
  etisalat: "Etisalat",
  du: "du",
  "virgin-mobile-ae": "Virgin Mobile UAE",
  yalla: "Yalla",
  stc: "STC",
  mobily: "Mobily",
  zain: "Zain",
  go: "GO",
  singtel: "Singtel",
  starhub: "StarHub",
  m1: "M1",
  ais: "AIS",
  "true-th": "True Online",
  "3bb": "3BB",
  "orange-pl": "Orange Poland",
  "play-pl": "Play Poland",
  "t-mobile-pl": "T-Mobile Poland",
};

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part.length === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join(" ");
}

function providerDisplayName(slug: string): string {
  return PROVIDER_DISPLAY_NAMES[slug] || titleCase(slug);
}

/** SEO metadata aligned with scripts/prerender.mjs providerMeta(). */
export function getProviderSeoMeta(countryCode: string, providerSlug: string) {
  const country = COUNTRIES[countryCode] || countryCode.toUpperCase();
  const provider = providerDisplayName(providerSlug);
  const canonical = `${SITE_ORIGIN}/providers/${countryCode}/${providerSlug}`;
  const title = `${provider} Speed Test - Test ${provider} Internet Speed (2026)`;
  const description = `Free ${provider} speed test for ${country}. Check ${provider} download, upload and ping speeds, and compare your result with typical ${provider} broadband plans.`;
  return { title, description, canonical, h1: `${provider} Speed Test`, provider, country };
}

/** Sets page title, meta, canonical and JSON-LD to match prerender output. */
export function useProviderPageSEO(countryCode: string, providerSlug: string): void {
  useEffect(() => {
    const meta = getProviderSeoMeta(countryCode, providerSlug);
    return applyPageSEO({
      title: meta.title,
      description: meta.description,
      canonical: meta.canonical,
      jsonLd: buildWebPageJsonLd({
        url: meta.canonical,
        title: meta.title,
        description: meta.description,
      }),
    });
  }, [countryCode, providerSlug]);
}
