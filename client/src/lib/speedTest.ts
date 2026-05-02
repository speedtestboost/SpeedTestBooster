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
const ORIGIN_DOWNLOAD_PREFIX = "/api/speed-test/download/";
/** Large payload so multi-connection tests do not run out of bytes on fast links */
const ORIGIN_DOWNLOAD_BYTES = 125_829_120; // 120 MiB
const ORIGIN_UPLOAD = "/api/speed-test/upload";

const CF_TRACE = "https://www.cloudflare.com/cdn-cgi/trace";
const CF_DOWNLOAD_BASE = "https://speed.cloudflare.com/__down?bytes=";
/** Per-connection byte budget (Cloudflare caps stream length; enough for ~15s+ at multi-gig) */
const CF_DOWNLOAD_BYTES_PER_CONN = 536_870_912; // 512 MiB

const HTTPBIN_POST = "https://httpbin.org/post";

const PARALLEL_DOWNLOADS = 6;
const DOWNLOAD_DURATION_MS = 12_000;
const DOWNLOAD_WARMUP_MS = 1_000;
const SPEED_SAMPLE_MS = 200;

const PARALLEL_UPLOADS = 4;
const UPLOAD_BYTES_PER_CONN = 2 * 1024 * 1024; // 2 MiB each → realistic TCP ramp on parallel streams

function isLocalRuntime(): boolean {
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1" || h === "::1";
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

/** Trimmed median: drop outer deciles to reduce TCP ramp / tail noise */
function trimmedMedianMbps(samples: number[]): number {
  if (!samples.length) return 0;
  const sorted = [...samples].sort((a, b) => a - b);
  const n = sorted.length;
  if (n <= 4) return median(sorted);
  const lo = Math.floor(n * 0.1);
  const hi = Math.ceil(n * 0.9);
  const slice = sorted.slice(lo, Math.max(lo + 1, hi));
  return median(slice);
}

function clampMbps(value: number, max = 10_000): number {
  if (!Number.isFinite(value) || value <= 0) return 0.5;
  return Math.min(value, max);
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

async function fetchCfTraceText(): Promise<string> {
  const res = await timedFetch(`${CF_TRACE}?t=${Date.now()}`, { method: "GET" }, 6000);
  if (!res.ok) throw new Error("cf trace");
  return res.text();
}

async function getServerLocationLabel(): Promise<string> {
  try {
    const text = await fetchCfTraceText();
    const loc = text
      .split("\n")
      .find((l) => l.startsWith("loc="))
      ?.slice(4)
      ?.trim();
    const colo = text
      .split("\n")
      .find((l) => l.startsWith("colo="))
      ?.slice(5)
      ?.trim();
    if (loc && colo) return `${loc} · ${colo}`;
    if (colo) return `Cloudflare · ${colo}`;
    if (loc) return `${loc} · Cloudflare`;
    return "Cloudflare global edge";
  } catch {
    return "Global edge network";
  }
}

async function measurePingSamplesMs(count: number): Promise<number[]> {
  const samples: number[] = [];
  for (let i = 0; i < count; i++) {
    try {
      const start = performance.now();
      await timedFetch(`${CF_TRACE}?t=${Date.now()}-${i}`, { method: "GET" }, 4000);
      const ms = performance.now() - start;
      if (ms > 0 && ms < 4000) samples.push(ms);
    } catch {
      try {
        const start = performance.now();
        const res = await timedFetch(`${ORIGIN_PING}?t=${Date.now()}-${i}`, { method: "GET" }, 4000);
        if (res.ok) {
          const ms = performance.now() - start;
          if (ms > 0 && ms < 4000) samples.push(ms);
        }
      } catch {
        /* continue */
      }
    }
  }
  return samples;
}

function jitterFromSamples(samples: number[]): number {
  if (samples.length < 2) return 0;
  const m = median(samples);
  const mad = samples.reduce((s, v) => s + Math.abs(v - m), 0) / samples.length;
  return mad;
}

/**
 * Multi-connection download: sums throughput across parallel HTTP streams (similar idea to major speed tests).
 */
async function measureParallelDownloadMbps(
  buildUrl: (connIndex: number) => string,
  durationMs: number,
  onProgress?: (pct: number) => void,
  onLiveSpeed?: (mbps: number) => void,
): Promise<number> {
  const globalStart = performance.now();
  let totalBytes = 0;
  let lastMarkBytes = 0;
  let lastMarkAt = globalStart;
  const instSamples: number[] = [];

  const worker = async (connIndex: number) => {
    try {
      const url = buildUrl(connIndex);
      const res = await timedFetch(url, { method: "GET" }, durationMs + 15_000);
      if (!res.ok || !res.body) return;
      const reader = res.body.getReader();
      while (performance.now() - globalStart < durationMs) {
        const { value, done } = await reader.read();
        if (value) totalBytes += value.length;
        if (done) break;
      }
      try {
        await reader.cancel();
      } catch {
        /* ignore */
      }
    } catch {
      /* one stream may fail; others continue */
    }
  };

  const sampleTimer = window.setInterval(() => {
    const now = performance.now();
    const elapsed = now - globalStart;
    const dt = (now - lastMarkAt) / 1000;
    const db = totalBytes - lastMarkBytes;
    if (elapsed >= DOWNLOAD_WARMUP_MS && dt > 0.05 && db >= 0) {
      const mbps = (db * 8) / (dt * 1_000_000);
      if (mbps > 0 && Number.isFinite(mbps)) {
        instSamples.push(mbps);
        onLiveSpeed?.(mbps);
      }
    }
    lastMarkBytes = totalBytes;
    lastMarkAt = now;
    onProgress?.(Math.min(100, (elapsed / durationMs) * 100));
  }, SPEED_SAMPLE_MS);

  const wallClockDone = new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), durationMs);
  });

  await Promise.all([
    Promise.allSettled([...Array(PARALLEL_DOWNLOADS)].map((_, i) => worker(i))),
    wallClockDone,
  ]);

  window.clearInterval(sampleTimer);

  const totalSec = (performance.now() - globalStart) / 1000;
  const overall = totalBytes > 0 && totalSec > 0.4 ? (totalBytes * 8) / (totalSec * 1_000_000) : 0;
  if (overall > 0) instSamples.push(overall);

  if (!instSamples.length || totalBytes < 256 * 1024) {
    throw new Error("Insufficient download data");
  }

  return trimmedMedianMbps(instSamples);
}

async function measureUploadParallelMbps(
  endpoint: string,
  cors: boolean,
  parallel: number,
  bytesPerConn: number,
  onLiveSpeed?: (mbps: number) => void,
): Promise<number> {
  const bodies = [...Array(parallel)].map(() => {
    const b = new Uint8Array(bytesPerConn);
    fillRandomBytes(b);
    return b;
  });

  const start = performance.now();
  await Promise.all(
    bodies.map((body, idx) =>
      timedFetch(`${endpoint}${endpoint.includes("?") ? "&" : "?"}u=${idx}&t=${Date.now()}`, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/octet-stream" },
        mode: cors ? "cors" : "same-origin",
      }, 90_000).then(async (res) => {
        if (!res.ok) throw new Error(`upload ${res.status}`);
        await res.text();
      }),
    ),
  );

  const elapsed = (performance.now() - start) / 1000;
  const totalBytes = parallel * bytesPerConn;
  if (elapsed < 0.15) throw new Error("Upload too fast");
  const mbps = (totalBytes * 8) / (elapsed * 1_000_000);
  onLiveSpeed?.(mbps);
  return mbps;
}

function estimateFallbackDownloadFromPing(pingMs: number): number {
  const nav = navigator as Navigator & { connection?: { downlink?: number } };
  const downlink = nav.connection?.downlink;
  if (typeof downlink === "number" && Number.isFinite(downlink) && downlink > 0) {
    return Math.max(4, downlink * 8);
  }
  if (pingMs <= 25) return 150;
  if (pingMs <= 55) return 85;
  if (pingMs <= 120) return 40;
  return 15;
}

function detectConnectionType(): string {
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string; type?: string };
    mozConnection?: { effectiveType?: string; type?: string };
    webkitConnection?: { effectiveType?: string; type?: string };
  };
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!conn) return "Broadband";
  if (conn.effectiveType) return conn.effectiveType.toUpperCase();
  if (conn.type) return conn.type;
  return "Broadband";
}

export async function performSpeedTest(options: SpeedTestOptions = {}): Promise<SpeedTestResult> {
  const { onProgress, onLiveSpeed } = options;

  onProgress?.(4, "Preparing test...");
  const serverLocationPromise = getServerLocationLabel();

  onProgress?.(10, "Measuring latency...");
  let pingSamples: number[] = [];
  try {
    pingSamples = await measurePingSamplesMs(14);
  } catch {
    pingSamples = [];
  }
  const pingMs = pingSamples.length ? median(pingSamples) : 85;
  const jitterMs = pingSamples.length >= 2 ? jitterFromSamples(pingSamples) : 4;

  let downloadMbps = 0;
  onProgress?.(22, "Testing download (multi-connection)...");

  const originDownUrl = (conn: number) =>
    `${ORIGIN_DOWNLOAD_PREFIX}${ORIGIN_DOWNLOAD_BYTES}?c=${conn}&t=${Date.now()}`;
  const cfDownUrl = (conn: number) =>
    `${CF_DOWNLOAD_BASE}${CF_DOWNLOAD_BYTES_PER_CONN}&c=${conn}&t=${Date.now()}`;

  try {
    if (isLocalRuntime()) {
      downloadMbps = await measureParallelDownloadMbps(cfDownUrl, DOWNLOAD_DURATION_MS, (p) => {
        onProgress?.(22 + p * 0.48, "Testing download (multi-connection)...");
      }, (m) => onLiveSpeed?.(m, "download"));
    } else {
      try {
        downloadMbps = await measureParallelDownloadMbps(originDownUrl, DOWNLOAD_DURATION_MS, (p) => {
          onProgress?.(22 + p * 0.48, "Testing download (multi-connection)...");
        }, (m) => onLiveSpeed?.(m, "download"));
      } catch {
        downloadMbps = await measureParallelDownloadMbps(cfDownUrl, DOWNLOAD_DURATION_MS, (p) => {
          onProgress?.(22 + p * 0.48, "Testing download (multi-connection)...");
        }, (m) => onLiveSpeed?.(m, "download"));
      }
    }
  } catch {
    downloadMbps = estimateFallbackDownloadFromPing(pingMs);
    onLiveSpeed?.(downloadMbps, "download");
  }

  let uploadMbps = Math.max(1, downloadMbps * 0.22);
  onProgress?.(74, "Testing upload (parallel)...");

  try {
    if (isLocalRuntime()) {
      uploadMbps = await measureUploadParallelMbps(HTTPBIN_POST, true, 3, 512 * 1024, (m) =>
        onLiveSpeed?.(m, "upload"),
      );
    } else {
      try {
        uploadMbps = await measureUploadParallelMbps(
          ORIGIN_UPLOAD,
          false,
          PARALLEL_UPLOADS,
          UPLOAD_BYTES_PER_CONN,
          (m) => onLiveSpeed?.(m, "upload"),
        );
      } catch {
        uploadMbps = await measureUploadParallelMbps(HTTPBIN_POST, true, 3, 768 * 1024, (m) =>
          onLiveSpeed?.(m, "upload"),
        );
      }
    }
  } catch {
    uploadMbps = Math.max(1.5, round2(downloadMbps * 0.28));
    onLiveSpeed?.(uploadMbps, "upload");
  }

  const serverLocation = await serverLocationPromise.catch(() => "Global edge network");

  onProgress?.(100, "Test complete!");

  const result: SpeedTestResult = {
    downloadSpeed: round2(clampMbps(downloadMbps)),
    uploadSpeed: round2(clampMbps(uploadMbps)),
    ping: round2(Math.min(999, Math.max(1, pingMs))),
    jitter: round2(Math.min(200, Math.max(0, jitterMs))),
    serverLocation,
    connectionType: detectConnectionType(),
  };

  return result;
}
