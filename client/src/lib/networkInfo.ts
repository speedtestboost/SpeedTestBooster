import { getSessionId } from "./sessionManager";

export type PublicNetworkInfo = {
  ipAddress: string;
  connectionType: string;
  serverLocation: string;
  isp: string;
};

function getNavigatorConnectionLabel(): string {
  if (typeof navigator === "undefined") return "WiFi";
  const c =
    (navigator as Navigator & { connection?: NetworkInformation }).connection ||
    (navigator as Navigator & { mozConnection?: NetworkInformation }).mozConnection ||
    (navigator as Navigator & { webkitConnection?: NetworkInformation }).webkitConnection;
  if (!c) return "WiFi";
  const eff = c.effectiveType;
  const typ = c.type;
  if (eff && typ && typ !== "unknown") return `${String(typ)} · ${String(eff).toUpperCase()}`;
  if (eff) return String(eff).toUpperCase();
  if (typ && typ !== "unknown") return String(typ);
  return "WiFi";
}

function withTimeout(ms: number): { signal: AbortSignal; cancel: () => void } {
  const ac = new AbortController();
  const t =
    typeof window !== "undefined"
      ? window.setTimeout(() => ac.abort(), ms)
      : (undefined as unknown as number);
  return {
    signal: ac.signal,
    cancel: () => {
      if (typeof window !== "undefined" && t !== undefined) window.clearTimeout(t);
    },
  };
}

async function fetchGeoJs(): Promise<PublicNetworkInfo | null> {
  const { signal, cancel } = withTimeout(12000);
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json", {
      signal,
      credentials: "omit",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const d = (await res.json()) as Record<string, unknown>;
    const ip = typeof d.ip === "string" ? d.ip : "";
    if (!ip) return null;
    const city = typeof d.city === "string" ? d.city : "";
    const region = typeof d.region === "string" ? d.region : "";
    const country = typeof d.country === "string" ? d.country : "";
    const org =
      (typeof d.organization_name === "string" && d.organization_name) ||
      (typeof d.organization === "string" && d.organization) ||
      "Unknown ISP";
    const parts = [city, region, country].filter(Boolean);
    return {
      ipAddress: ip,
      connectionType: getNavigatorConnectionLabel(),
      serverLocation: parts.length ? parts.join(", ") : "Unknown",
      isp: org,
    };
  } catch {
    return null;
  } finally {
    cancel();
  }
}

async function fetchIpApiCo(): Promise<PublicNetworkInfo | null> {
  const { signal, cancel } = withTimeout(12000);
  try {
    const res = await fetch("https://ipapi.co/json/", {
      signal,
      credentials: "omit",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const d = (await res.json()) as Record<string, unknown>;
    if (d.error) return null;
    const ip = typeof d.ip === "string" ? d.ip : "";
    if (!ip) return null;
    const city = typeof d.city === "string" ? d.city : "";
    const region = typeof d.region === "string" ? d.region : "";
    const country = typeof d.country_name === "string" ? d.country_name : "";
    const isp = (typeof d.org === "string" && d.org) || (typeof d.asn === "string" && d.asn) || "Unknown ISP";
    const parts = [city, region, country].filter(Boolean);
    return {
      ipAddress: ip,
      connectionType: getNavigatorConnectionLabel(),
      serverLocation: parts.length ? parts.join(", ") : "Unknown",
      isp,
    };
  } catch {
    return null;
  } finally {
    cancel();
  }
}

async function fetchIpInfo(): Promise<PublicNetworkInfo | null> {
  const { signal, cancel } = withTimeout(12000);
  try {
    const res = await fetch("https://ipinfo.io/json", {
      signal,
      credentials: "omit",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const d = (await res.json()) as Record<string, unknown>;
    const ip = typeof d.ip === "string" ? d.ip : "";
    if (!ip) return null;
    const city = typeof d.city === "string" ? d.city : "";
    const region = typeof d.region === "string" ? d.region : "";
    const country = typeof d.country === "string" ? d.country : "";
    const isp = (typeof d.org === "string" && d.org) || "Unknown ISP";
    const parts = [city, region, country].filter(Boolean);
    return {
      ipAddress: ip,
      connectionType: getNavigatorConnectionLabel(),
      serverLocation: parts.length ? parts.join(", ") : "Unknown",
      isp,
    };
  } catch {
    return null;
  } finally {
    cancel();
  }
}

async function fetchIpWho(): Promise<PublicNetworkInfo | null> {
  const { signal, cancel } = withTimeout(12000);
  try {
    const res = await fetch("https://ipwho.is/", {
      signal,
      credentials: "omit",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    if (data.success === false) return null;
    const ip = typeof data.ip === "string" ? data.ip : "";
    if (!ip) return null;
    const city = typeof data.city === "string" ? data.city : "";
    const region = typeof data.region === "string" ? data.region : "";
    const country = typeof data.country === "string" ? data.country : "";
    const conn = data.connection as Record<string, unknown> | undefined;
    const isp =
      (conn && typeof conn.isp === "string" && conn.isp) ||
      (typeof data.isp === "string" && data.isp) ||
      "Unknown ISP";
    const parts = [city, region, country].filter(Boolean);
    return {
      ipAddress: ip,
      connectionType: getNavigatorConnectionLabel(),
      serverLocation: parts.length ? parts.join(", ") : "Unknown",
      isp,
    };
  } catch {
    return null;
  } finally {
    cancel();
  }
}

/** Cloudflare trace: CORS-friendly text with ip= and loc= (no API key). */
async function fetchCloudflareTrace(): Promise<PublicNetworkInfo | null> {
  const urls = ["https://1.1.1.1/cdn-cgi/trace", "https://www.cloudflare.com/cdn-cgi/trace"];
  for (const url of urls) {
    const { signal, cancel } = withTimeout(10000);
    try {
      const res = await fetch(url, { signal, credentials: "omit", cache: "no-store" });
      if (!res.ok) {
        cancel();
        continue;
      }
      const text = await res.text();
      const map: Record<string, string> = {};
      for (const line of text.split("\n")) {
        const idx = line.indexOf("=");
        if (idx > 0) map[line.slice(0, idx)] = line.slice(idx + 1).trim();
      }
      const ip = map.ip || "";
      if (!ip || ip === "127.0.0.1") {
        cancel();
        continue;
      }
      const loc = map.loc || "";
      const colo = map.colo || "";
      const serverLocation =
        loc && colo ? `Region ${loc} (edge ${colo})` : loc ? `Region ${loc}` : colo ? `Edge ${colo}` : "Internet";
      cancel();
      return {
        ipAddress: ip,
        connectionType: getNavigatorConnectionLabel(),
        serverLocation,
        isp: "Unknown ISP",
      };
    } catch {
      cancel();
      continue;
    }
  }
  return null;
}

/** Browser-side geo when /api/network-info is missing or blocked. */
export async function fetchPublicNetworkInfo(): Promise<PublicNetworkInfo> {
  const connectionType = getNavigatorConnectionLabel();
  const chain = [fetchGeoJs, fetchIpApiCo, fetchIpInfo, fetchIpWho, fetchCloudflareTrace];
  for (const fn of chain) {
    try {
      const row = await fn();
      if (row?.ipAddress && row.ipAddress !== "Unavailable" && row.ipAddress !== "Unknown") {
        return {
          ...row,
          connectionType: row.connectionType || connectionType,
        };
      }
    } catch {
      /* try next */
    }
  }
  return {
    ipAddress: "Unavailable",
    connectionType,
    serverLocation: "Unknown",
    isp: "Unknown ISP",
  };
}

export async function loadNetworkInfoWithFallback(): Promise<PublicNetworkInfo> {
  try {
    const sessionId = getSessionId();
    const res = await fetch("/api/network-info", {
      credentials: "include",
      headers: { "X-Session-ID": sessionId },
      cache: "no-store",
    });
    if (res.ok) {
      let json: PublicNetworkInfo;
      try {
        json = (await res.json()) as PublicNetworkInfo;
      } catch {
        return fetchPublicNetworkInfo();
      }
      const navConn = getNavigatorConnectionLabel();
      const ip = json?.ipAddress?.trim();
      if (ip && ip !== "127.0.0.1" && ip !== "::1") {
        const useConn =
          json.connectionType && json.connectionType !== "WiFi"
            ? json.connectionType
            : navConn || json.connectionType || "WiFi";
        return {
          ipAddress: ip,
          connectionType: useConn,
          serverLocation: json.serverLocation || "Unknown",
          isp: json.isp || "Unknown ISP",
        };
      }
      if (ip === "127.0.0.1" || ip === "::1") {
        const pub = await fetchPublicNetworkInfo();
        return {
          ...pub,
          connectionType: pub.connectionType || json.connectionType || "WiFi",
        };
      }
    }
  } catch {
    /* use public chain */
  }
  return fetchPublicNetworkInfo();
}
