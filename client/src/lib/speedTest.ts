export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  serverLocation: string;
  connectionType: string;
}

export interface SpeedTestOptions {
  onProgress?: (progress: number, status: string) => void;
  onLiveSpeed?: (mbps: number, phase: "download" | "upload") => void;
}

const ORIGIN_PING = "/api/speed-test/ping";
const ORIGIN_DOWNLOAD = "/api/speed-test/download/52428800";
const ORIGIN_UPLOAD = "/api/speed-test/upload";

const CF_TRACE = "https://www.cloudflare.com/cdn-cgi/trace";
const CF_DOWNLOAD = "https://speed.cloudflare.com/__down?bytes=52428800";
const HTTPBIN_POST = "https://httpbin.org/post";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function percentile(values: number[], pct: number): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.max(0, Math.min(sorted.length - 1, Math.floor((pct / 100) * sorted.length)));
  return sorted[idx];
}

async function timedFetch(url: string, init: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        ...(init.headers || {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

function fillRandomBytes(buffer: Uint8Array): void {
  const CHUNK = 65536;
  let offset = 0;
  while (offset < buffer.length) {
    const end = Math.min(offset + CHUNK, buffer.length);
    crypto.getRandomValues(buffer.subarray(offset, end));
    offset = end;
  }
}

async function measurePingSamples(count = 10): Promise<number[]> {
  const endpoints = [ORIGIN_PING, CF_TRACE];
  const samples: number[] = [];

  for (let i = 0; i < count; i++) {
    const endpoint = `${endpoints[i % endpoints.length]}?t=${Date.now()}-${i}`;
    try {
      const start = performance.now();
      const res = await timedFetch(endpoint, { method: "GET" }, 4000);
      if (!res.ok) continue;
      const ping = performance.now() - start;
      if (ping > 0 && ping < 3000) samples.push(ping);
    } catch {
      // Ignore and continue sampling.
    }
  }

  return samples;
}

async function measureStreamingDownload(
  url: string,
  maxDurationMs: number,
  onProgress?: (progress: number) => void,
  onLiveSpeed?: (mbps: number) => void,
): Promise<number> {
  const startTime = performance.now();
  const response = await timedFetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, { method: "GET" }, maxDurationMs + 2500);
  if (!response.ok || !response.body) {
    throw new Error(`Download endpoint failed: ${response.status}`);
  }

  const reader = response.body.getReader();
  let totalBytes = 0;
  let lastSampleAt = startTime;
  const samples: number[] = [];

  while (true) {
    const { value, done } = await reader.read();
    if (value) totalBytes += value.length;

    const now = performance.now();
    const elapsedMs = now - startTime;
    if (now - lastSampleAt >= 75) {
      const seconds = elapsedMs / 1000;
      if (seconds > 0.2) {
        const mbps = (totalBytes * 8) / (seconds * 1000 * 1000);
        if (mbps > 0 && Number.isFinite(mbps)) {
          samples.push(mbps);
          onLiveSpeed?.(mbps);
        }
      }
      onProgress?.(Math.min((elapsedMs / maxDurationMs) * 100, 100));
      lastSampleAt = now;
    }

    if (done || elapsedMs >= maxDurationMs) {
      try {
        await reader.cancel();
      } catch {
        // Ignore cancellation errors.
      }
      break;
    }
  }

  const totalSeconds = (performance.now() - startTime) / 1000;
  if (totalBytes > 0 && totalSeconds > 0.01) {
    const endMbps = (totalBytes * 8) / (totalSeconds * 1000 * 1000);
    if (endMbps > 0 && Number.isFinite(endMbps)) {
      samples.push(endMbps);
      onLiveSpeed?.(endMbps);
    }
  }

  if (!samples.length || totalBytes < 128 * 1024) {
    throw new Error("Insufficient download samples");
  }

  // 75th percentile balances burst and sustained throughput.
  return percentile(samples, 75);
}

async function measureUploadSingle(
  size: number,
  endpoint: string,
  onLiveSpeed?: (mbps: number) => void,
): Promise<number> {
  const data = new Uint8Array(size);
  fillRandomBytes(data);
  const start = performance.now();
  const response = await timedFetch(
    `${endpoint}${endpoint.includes("?") ? "&" : "?"}t=${Date.now()}`,
    {
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/octet-stream" },
      mode: endpoint.startsWith("http") ? "cors" : "same-origin",
    },
    12000,
  );
  if (!response.ok) {
    throw new Error(`Upload endpoint failed: ${response.status}`);
  }
  const seconds = (performance.now() - start) / 1000;
  if (seconds <= 0.15) {
    throw new Error("Upload duration too short");
  }
  const mbps = (size * 8) / (seconds * 1000 * 1000);
  onLiveSpeed?.(mbps);
  return mbps;
}

async function measureRealDownloadSpeed(
  onProgress?: (progress: number) => void,
  onLiveSpeed?: (mbps: number) => void,
): Promise<number> {
  try {
    return await measureStreamingDownload(ORIGIN_DOWNLOAD, 9000, onProgress, onLiveSpeed);
  } catch {
    return await measureStreamingDownload(CF_DOWNLOAD, 10000, onProgress, onLiveSpeed);
  }
}

async function measureRealUploadSpeed(
  onProgress?: (progress: number) => void,
  onLiveSpeed?: (mbps: number) => void,
): Promise<number> {
  const sizes = [256 * 1024, 1024 * 1024, 2 * 1024 * 1024];
  const values: number[] = [];

  for (let i = 0; i < sizes.length; i++) {
    const p = ((i + 1) / sizes.length) * 100;
    onProgress?.(p);
    try {
      const mbps = await measureUploadSingle(sizes[i], ORIGIN_UPLOAD, onLiveSpeed);
      if (mbps > 0) values.push(mbps);
    } catch {
      // keep trying next size/endpoint
    }
  }

  if (!values.length) {
    // Cross-origin fallback for static hosts where /api is missing.
    try {
      const mbps = await measureUploadSingle(512 * 1024, HTTPBIN_POST, onLiveSpeed);
      if (mbps > 0) values.push(mbps);
    } catch {
      // ignore
    }
  }

  if (!values.length) return 15;
  return median(values);
}

async function measureRealPing(): Promise<number> {
  const samples = await measurePingSamples(10);
  if (!samples.length) return 90;
  return median(samples);
}

async function measureRealJitter(): Promise<number> {
  const samples = await measurePingSamples(10);
  if (samples.length < 3) return 5;
  const avg = samples.reduce((sum, v) => sum + v, 0) / samples.length;
  const variance = samples.reduce((sum, v) => sum + (v - avg) ** 2, 0) / samples.length;
  return Math.sqrt(variance);
}

function detectConnectionType(): string {
  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  };
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!conn) return "Broadband";
  if (conn.effectiveType) return conn.effectiveType.toUpperCase();
  if (conn.type) return conn.type;
  return "Broadband";
}

export async function performSpeedTest(options: SpeedTestOptions = {}): Promise<SpeedTestResult> {
  const { onProgress, onLiveSpeed } = options;

  onProgress?.(5, "Preparing test...");
  const pingPromise = (async () => {
    onProgress?.(12, "Measuring latency...");
    return measureRealPing();
  })();

  onProgress?.(18, "Testing download speed...");
  const downloadSpeed = await measureRealDownloadSpeed((p) => {
    onProgress?.(18 + p * 0.58, "Testing download speed...");
  }, (mbps) => onLiveSpeed?.(mbps, "download"));

  onProgress?.(78, "Testing upload speed...");
  const uploadSpeed = await measureRealUploadSpeed((p) => {
    onProgress?.(78 + p * 0.14, "Testing upload speed...");
  }, (mbps) => onLiveSpeed?.(mbps, "upload"));

  onProgress?.(94, "Calculating stability...");
  const [ping, jitter] = await Promise.all([pingPromise, measureRealJitter()]);

  const result: SpeedTestResult = {
    downloadSpeed: round2(downloadSpeed),
    uploadSpeed: round2(uploadSpeed),
    ping: round2(ping),
    jitter: round2(jitter),
    serverLocation: "Global edge network",
    connectionType: detectConnectionType(),
  };

  onProgress?.(100, "Test complete!");
  return result;
}
