import { getSessionId } from "./sessionManager";

export type PublicNetworkInfo = {
  ipAddress: string;
  connectionType: string;
  serverLocation: string;
  isp: string;
};

function getNavigatorConnectionLabel(): string {
  const nav = typeof navigator !== "undefined" ? navigator : undefined;
  const c =
    nav &&
    ((nav as Navigator & { connection?: NetworkInformation }).connection ||
      (nav as Navigator & { mozConnection?: NetworkInformation }).mozConnection ||
      (nav as Navigator & { webkitConnection?: NetworkInformation }).webkitConnection);
  if (!c) return "WiFi";
  const eff = c.effectiveType;
  const typ = c.type;
  if (eff && typ && typ !== "unknown") return `${String(typ)} · ${String(eff).toUpperCase()}`;
  if (eff) return String(eff).toUpperCase();
  if (typ && typ !== "unknown") return String(typ);
  return "WiFi";
}

function locationFromIpWho(data: Record<string, unknown>): Pick<PublicNetworkInfo, "serverLocation" | "isp" | "ipAddress"> {
  const ip = typeof data.ip === "string" ? data.ip : "";
  const city = typeof data.city === "string" ? data.city : "";
  const region = typeof data.region === "string" ? data.region : "";
  const country = typeof data.country === "string" ? data.country : "";
  const conn = data.connection as Record<string, unknown> | undefined;
  const ispFromConn = conn && typeof conn.isp === "string" ? conn.isp : "";
  const ispFlat = typeof data.isp === "string" ? data.isp : "";
  const isp = ispFromConn || ispFlat || "Unknown ISP";
  const parts = [city, region, country].filter(Boolean);
  return {
    ipAddress: ip || "Unknown",
    serverLocation: parts.length ? parts.join(", ") : "Unknown",
    isp,
  };
}

/** Browser-side geo when /api/network-info is missing (static hosting) or fails. */
export async function fetchPublicNetworkInfo(): Promise<PublicNetworkInfo> {
  const connectionType = getNavigatorConnectionLabel();
  const ac = new AbortController();
  const t = window.setTimeout(() => ac.abort(), 10000);
  try {
    const res = await fetch("https://ipwho.is/", {
      signal: ac.signal,
      credentials: "omit",
    });
    const data = (await res.json()) as Record<string, unknown>;
    if (data.success === false) {
      return {
        ipAddress: "Unavailable",
        connectionType,
        serverLocation: "Unknown",
        isp: "Unknown ISP",
      };
    }
    const { ipAddress, serverLocation, isp } = locationFromIpWho(data);
    return { ipAddress, connectionType, serverLocation, isp };
  } catch {
    return {
      ipAddress: "Unavailable",
      connectionType,
      serverLocation: "Unknown",
      isp: "Unknown ISP",
    };
  } finally {
    window.clearTimeout(t);
  }
}

export async function loadNetworkInfoWithFallback(): Promise<PublicNetworkInfo> {
  try {
    const sessionId = getSessionId();
    const res = await fetch("/api/network-info", {
      credentials: "include",
      headers: { "X-Session-ID": sessionId },
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
    /* fall through */
  }
  return fetchPublicNetworkInfo();
}
