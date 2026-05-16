import { useState, useEffect, useRef, useCallback } from "react";
import { setCanonicalHref } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";
import {
  BarChart2, CheckCircle, XCircle, AlertTriangle, Activity,
  Wifi, Clock, Globe, Zap, Monitor, Gamepad2, Video,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    document.title =
      "Free Bufferbloat Test — Check Your Router's Bufferbloat A–F Grade | Speed Test & Boost";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute("content",
        "Free bufferbloat test — measure the latency added by your router when the link is saturated. A–F grade with CAKE/FQ-CoDel fix tips. No download, no ads.");

    const metas: [string, string][] = [
      ["og:title", "Free Bufferbloat Test — Router Latency Under Load | SpeedTestBoost"],
      ["og:description", "Find out if your router bloats latency during heavy downloads. A–F grade, fix guide, no install needed."],
      ["og:url", "https://speedtestboost.com/bufferbloat-test"],
      ["og:type", "website"],
    ];
    metas.forEach(([p, v]) => {
      let el = document.querySelector(`meta[property="${p}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", p); document.head.appendChild(el); }
      el.setAttribute("content", v);
    });

    setCanonicalHref("https://speedtestboost.com/bufferbloat-test");

    let ld = document.querySelector('script[data-page="bufferbloat-test"]') as HTMLScriptElement | null;
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.setAttribute("data-page", "bufferbloat-test"); document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free Bufferbloat Test",
      "url": "https://speedtestboost.com/bufferbloat-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Measure bufferbloat by comparing idle vs loaded latency. A–F grade, CAKE/FQ-CoDel tips. No install required.",
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── Algorithm ────────────────────────────────────────────────────────────────
// Bufferbloat = latency ADDED when the line is saturated.
// Phase 1 (IDLE): measure baseline RTT with 10 pings (no load).
// Phase 2 (LOADED): start parallel download streams to saturate the link,
//   then measure RTT every 300 ms for 10 s.
// Δ = median(loaded RTT) − median(idle RTT)
// Grade: Δ < 5 ms → A+, < 30 → A, < 60 → B, < 200 → C, < 400 → D, else F
// (identical thresholds used by DSLReports / Waveform bufferbloat tests)

const PING_URL     = "/api/speed-test/ping";
const DOWNLOAD_URL = "/api/speed-test/download/33554432"; // 32 MiB each stream
const IDLE_PINGS   = 12;
const LOADED_MS    = 10_000;
const PING_GAP_MS  = 300;
const STREAMS      = 4;   // saturate the link

function median(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

async function pingOnce(seq: number): Promise<number> {
  const t0 = performance.now();
  await fetch(`${PING_URL}?t=${Date.now()}&s=${seq}`, { cache: "no-store" });
  return performance.now() - t0;
}

function gradeBufferbloat(deltaMs: number): { label: string; color: string; bg: string; icon: typeof CheckCircle; desc: string } {
  if (deltaMs < 5)   return { label: "A+", color: "text-green-500",  bg: "bg-green-500/10",  icon: CheckCircle,   desc: "Outstanding — no bufferbloat" };
  if (deltaMs < 30)  return { label: "A",  color: "text-green-400",  bg: "bg-green-400/10",  icon: CheckCircle,   desc: "Excellent — negligible bufferbloat" };
  if (deltaMs < 60)  return { label: "B",  color: "text-blue-400",   bg: "bg-blue-400/10",   icon: CheckCircle,   desc: "Good — slight latency under load" };
  if (deltaMs < 200) return { label: "C",  color: "text-yellow-400", bg: "bg-yellow-400/10", icon: AlertTriangle, desc: "Fair — noticeable lag during downloads" };
  if (deltaMs < 400) return { label: "D",  color: "text-orange-500", bg: "bg-orange-500/10", icon: AlertTriangle, desc: "Poor — gaming/calls hurt when downloading" };
  return               { label: "F",  color: "text-red-500",    bg: "bg-red-500/10",    icon: XCircle,       desc: "Severe bufferbloat — enable CAKE/FQ-CoDel" };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BufferbloatTest() {
  useSEO();

  const [running, setRunning]           = useState(false);
  const [phase, setPhase]               = useState<"idle" | "loading" | "done" | "">("");
  const [progress, setProgress]         = useState(0);
  const [idleRtts, setIdleRtts]         = useState<number[]>([]);
  const [loadedRtts, setLoadedRtts]     = useState<number[]>([]);
  const [idleMedian, setIdleMedian]     = useState<number | null>(null);
  const [loadedMedian, setLoadedMedian] = useState<number | null>(null);
  const [delta, setDelta]               = useState<number | null>(null);
  const [status, setStatus]             = useState("Ready to diagnose your router's bufferbloat");
  const abortRef = useRef(false);

  const grade = delta !== null ? gradeBufferbloat(delta) : null;

  // sparkline data for chart
  const allPoints = [
    ...idleRtts.map((r, i)   => ({ i, rtt: r, loaded: false })),
    ...loadedRtts.map((r, i) => ({ i: idleRtts.length + i, rtt: r, loaded: true })),
  ];
  const chartMax = allPoints.length ? Math.max(...allPoints.map(p => p.rtt), 1) : 1;
  const chartW = 400; const chartH = 80;

  const runTest = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setPhase("idle");
    setIdleRtts([]);
    setLoadedRtts([]);
    setIdleMedian(null);
    setLoadedMedian(null);
    setDelta(null);
    setProgress(0);
    abortRef.current = false;

    // ── Phase 1: idle pings ──────────────────────────────────────────────────
    setStatus("Measuring idle latency (baseline)…");
    const idle: number[] = [];
    for (let i = 0; i < IDLE_PINGS; i++) {
      if (abortRef.current) { setRunning(false); return; }
      try { idle.push(await pingOnce(i)); } catch { /* skip */ }
      setIdleRtts([...idle]);
      setProgress(Math.round((i + 1) / IDLE_PINGS * 30));
      await new Promise(r => setTimeout(r, 100));
    }
    const iMed = median(idle);
    setIdleMedian(iMed);
    setStatus("Saturating link & measuring loaded latency…");

    // ── Phase 2: saturate + ping ─────────────────────────────────────────────
    setPhase("loading");
    const streamControllers = Array.from({ length: STREAMS }, () => new AbortController());

    // Start background download streams (fire-and-forget)
    streamControllers.forEach(ctrl => {
      fetch(`${DOWNLOAD_URL}?t=${Date.now()}`, { signal: ctrl.signal, cache: "no-store" })
        .catch(() => {/* expected abort */});
    });

    const loaded: number[] = [];
    const endAt = Date.now() + LOADED_MS;
    let seq = 0;
    while (Date.now() < endAt && !abortRef.current) {
      try { loaded.push(await pingOnce(seq++)); } catch { /* skip */ }
      setLoadedRtts([...loaded]);
      const elapsed = LOADED_MS - (endAt - Date.now());
      setProgress(30 + Math.round((elapsed / LOADED_MS) * 70));
      await new Promise(r => setTimeout(r, PING_GAP_MS));
    }

    // Kill download streams
    streamControllers.forEach(ctrl => ctrl.abort());

    const lMed = median(loaded);
    setLoadedMedian(lMed);
    const d = Math.max(0, lMed - iMed);
    setDelta(d);
    setPhase("done");
    setStatus(d < 30 ? "Great! Your router handles load well." : `Bufferbloat detected: +${d.toFixed(0)} ms added latency under load`);
    setRunning(false);
  }, [running]);

  // SVG polyline
  const polyline = allPoints.map((p, i) =>
    `${(i / Math.max(allPoints.length - 1, 1)) * chartW},${chartH - (p.rtt / chartMax) * chartH}`
  ).join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/bufferbloat-test" />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Bufferbloat Test", href: "/bufferbloat-test" }]} />

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <BarChart2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Free Bufferbloat Test
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find out if your router or modem is adding hidden lag when the connection is busy — 
              the most under-diagnosed cause of stuttering games and choppy video calls. 
              <strong> No download. No ads.</strong>
            </p>
          </div>

          {/* Main card */}
          <Card className="mb-8 border-2 border-primary/20 shadow-lg shadow-primary/5">
            <CardContent className="p-8">
              {/* Chart */}
              <div className="mb-6 rounded-xl overflow-hidden bg-muted/30 border border-border/40 p-3">
                <div className="flex gap-4 text-xs text-muted-foreground mb-1">
                  <span className="flex items-center gap-1"><span className="inline-block w-3 h-1 bg-blue-400 rounded" /> Idle RTT</span>
                  <span className="flex items-center gap-1"><span className="inline-block w-3 h-1 bg-orange-400 rounded" /> Loaded RTT</span>
                </div>
                <svg width="100%" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none" className="h-20">
                  {allPoints.length > 1 && (
                    <polyline points={polyline} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
                  )}
                  {/* colour-coded dots */}
                  {allPoints.map((p, i) => (
                    <circle
                      key={i}
                      cx={(i / Math.max(allPoints.length - 1, 1)) * chartW}
                      cy={chartH - (p.rtt / chartMax) * chartH}
                      r="3"
                      fill={p.loaded ? "#f97316" : "#60a5fa"}
                    />
                  ))}
                  {allPoints.length === 0 && (
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                      Latency chart will appear here
                    </text>
                  )}
                </svg>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Bufferbloat", value: delta !== null ? `+${delta.toFixed(0)} ms` : "—", highlight: true },
                  { label: "Idle Latency", value: idleMedian !== null ? `${idleMedian.toFixed(1)} ms` : "—" },
                  { label: "Loaded Latency", value: loadedMedian !== null ? `${loadedMedian.toFixed(1)} ms` : "—" },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`rounded-xl p-4 text-center ${highlight ? "bg-primary/10 border border-primary/30" : "bg-muted/30 border border-border/40"}`}>
                    <div className={`text-2xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Phase indicator */}
              {phase && phase !== "done" && (
                <div className="flex gap-3 mb-4">
                  {(["idle", "loading"] as const).map(p => (
                    <Badge key={p} variant={phase === p ? "default" : "secondary"}>
                      {p === "idle" ? "① Measuring baseline" : "② Loading the link"}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Grade */}
              {grade && (
                <div className={`flex items-center gap-4 rounded-xl p-4 mb-6 ${grade.bg}`}>
                  <div className={`text-5xl font-black ${grade.color}`}>{grade.label}</div>
                  <div>
                    <div className={`text-lg font-semibold ${grade.color}`}>{grade.desc}</div>
                    <div className="text-sm text-muted-foreground">
                      Δ latency = {delta?.toFixed(0)} ms &nbsp;|&nbsp;
                      Idle {idleMedian?.toFixed(1)} ms → Loaded {loadedMedian?.toFixed(1)} ms
                    </div>
                  </div>
                </div>
              )}

              {running && <Progress value={progress} className="mb-4 h-2" />}
              <p className="text-sm text-muted-foreground mb-4 text-center">{status}</p>

              <Button
                size="lg"
                className="w-full text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={runTest}
                disabled={running}
              >
                {running
                  ? <><Activity className="mr-2 h-5 w-5 animate-pulse" />Testing… {progress}%</>
                  : <><Zap className="mr-2 h-5 w-5" />{grade ? "Re-test Bufferbloat" : "Start Bufferbloat Test"}</>
                }
              </Button>
            </CardContent>
          </Card>

          {/* Explainer */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Monitor className="h-5 w-5 text-primary" />What is Bufferbloat?</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Bufferbloat</strong> is excess latency caused by oversized buffers in your router or modem. 
                When you start a big download, the router fills these buffers. While they drain, every other packet — 
                your gaming data, your Zoom call, your keystrokes — waits in line. Your speed looks fine but everything 
                <em> feels</em> laggy.
              </p>
              <p>
                <strong>How we measure it:</strong> We first measure your baseline (idle) RTT with no load, 
                then simultaneously saturate your link with {STREAMS} parallel download streams and keep pinging every {PING_GAP_MS} ms. 
                The gap between median loaded RTT and median idle RTT is your bufferbloat score.
              </p>
              <p>
                <strong>The fix:</strong> Enable <strong>CAKE</strong> (Common Applications Kept Enhanced) or 
                <strong> FQ-CoDel</strong> (Fair Queue CoDel) in your router's QoS / traffic shaping settings. 
                OpenWrt, pfSense, and many modern routers support these AQM algorithms out of the box.
              </p>
            </CardContent>
          </Card>

          {/* Grade table */}
          <Card className="mb-6">
            <CardHeader><CardTitle>Bufferbloat Grade Scale</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-2 px-3 text-left">Grade</th>
                      <th className="py-2 px-3 text-left">Added Latency</th>
                      <th className="py-2 px-3 text-left">Impact</th>
                      <th className="py-2 px-3 text-left">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { g: "A+", d: "< 5 ms",   i: "None",     r: "Perfect, no action needed" },
                      { g: "A",  d: "5–30 ms",  i: "Minimal",  r: "Excellent, marginal improvement possible" },
                      { g: "B",  d: "30–60 ms", i: "Slight",   r: "Consider enabling CAKE/FQ-CoDel" },
                      { g: "C",  d: "60–200 ms",i: "Noticeable",r: "Enable QoS / AQM on your router" },
                      { g: "D",  d: "200–400 ms",i: "Severe",  r: "Upgrade router firmware or replace hardware" },
                      { g: "F",  d: "> 400 ms", i: "Crippling",r: "Serious problem — CAKE/FQ-CoDel essential" },
                    ].map(r => (
                      <tr key={r.g} className="hover:bg-muted/20">
                        <td className="py-2 px-3 font-bold text-primary">{r.g}</td>
                        <td className="py-2 px-3">{r.d}</td>
                        <td className="py-2 px-3">{r.i}</td>
                        <td className="py-2 px-3 text-muted-foreground">{r.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Use-case cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Gamepad2, label: "Gaming",     limit: "< 30 ms", detail: "Low latency critical for FPS" },
              { icon: Video,    label: "Video Calls",limit: "< 60 ms", detail: "Zoom, Teams, Google Meet" },
              { icon: Wifi,     label: "Downloads",  limit: "< 200 ms",detail: "Affects QoS for all other traffic" },
            ].map(({ icon: Icon, label, limit, detail }) => (
              <Card key={label} className="text-center hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <Icon className="h-7 w-7 text-primary mx-auto mb-2" />
                  <div className="font-semibold">{label}</div>
                  <div className="text-2xl font-bold text-primary my-1">{limit}</div>
                  <div className="text-xs text-muted-foreground">{detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* What is bufferbloat */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5 text-primary" />What Is Bufferbloat and Why Does It Matter?</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Bufferbloat happens when your router or modem has an oversized transmit queue. When your download maxes 
                out, every packet — including your game's control packets or your VoIP audio — gets stuck behind 
                gigabytes of queued download data. The result: your download speed looks great on a speed test, 
                but everything interactive feels sluggish.
              </p>
              <p>
                The term was coined by Jim Gettys and Kathleen Nichols in 2011. Since then, operating systems and 
                router firmware have introduced AQM (Active Queue Management) algorithms — CAKE and FQ-CoDel — to 
                automatically keep buffers short.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mt-2">
                {[
                  { grade: "A/A+", range: "< 5 ms increase", desc: "No bufferbloat. Gaming and calls will feel instantaneous even while downloads are running." },
                  { grade: "B/C", range: "5–50 ms increase", desc: "Moderate bufferbloat. Noticeably laggy gaming during household streaming. Enable QoS or CAKE." },
                  { grade: "D/F", range: "> 50 ms increase", desc: "Severe bufferbloat. Calls drop, games rubber-band, even loading webpages feels delayed during downloads." },
                ].map(({ grade, range, desc }) => (
                  <div key={grade} className="rounded-lg bg-muted/30 border border-border/40 p-3">
                    <div className="text-lg font-bold text-primary">{grade}</div>
                    <div className="text-xs font-medium text-foreground">{range}</div>
                    <div className="text-xs text-muted-foreground mt-1">{desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fix guide */}
          <Card className="mb-6">
            <CardHeader><CardTitle>How to Fix Bufferbloat — Step by Step</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Enable Smart Queue Management (SQM) on Your Router",
                    detail: "The most effective fix. If your router runs OpenWrt, DD-WRT, or pfSense, enable CAKE or FQ-CoDel under QoS/SQM. Set the rate to 85–90% of your measured download/upload speeds to leave headroom for AQM to work. This single change typically moves routers from grade D to A+.",
                    code: "# OpenWrt CAKE setup\ntc qdisc replace dev eth0 root cake bandwidth 90Mbit",
                  },
                  {
                    step: "2",
                    title: "Enable QoS / Traffic Priority on Consumer Routers",
                    detail: "Most Asus, Netgear Nighthawk, and TP-Link Archer routers have a QoS menu. Enable it and set gaming/VoIP as highest priority. This won't eliminate bufferbloat completely but significantly reduces its impact on interactive traffic.",
                    code: null,
                  },
                  {
                    step: "3",
                    title: "Upgrade to a Bufferbloat-Resistant Router",
                    detail: "Routers running CAKE by default include: IQrouter, Turris Omnia, and any router with OpenWrt 21.02+. ISP-provided modems and budget routers are the worst offenders — they often have grade D bufferbloat out of the box.",
                    code: null,
                  },
                  {
                    step: "4",
                    title: "Limit Download Speed During Gaming/Calls",
                    detail: "A temporary workaround: manually throttle downloads on your router or PC while gaming. This prevents the download queue from filling up. On Windows: Task Manager → App → right-click → Resource Values. On Steam: set a bandwidth limit in Settings → Downloads.",
                    code: null,
                  },
                  {
                    step: "5",
                    title: "Contact Your ISP",
                    detail: "If bufferbloat appears in Phase 1 (idle) with no load, the problem is in your ISP's DSLAM or CMTS equipment — beyond your router. Document your test results and escalate to ISP tier-2 support.",
                    code: null,
                  },
                ].map(({ step, title, detail, code }) => (
                  <div key={step} className="flex gap-4 border-b border-border/30 pb-4 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                      <p className="text-xs text-muted-foreground">{detail}</p>
                      {code && <pre className="mt-2 text-xs bg-muted/40 border border-border/40 rounded p-2 font-mono overflow-x-auto">{code}</pre>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mb-8">
            <CardHeader><CardTitle>Frequently Asked Questions About Bufferbloat</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {[
                { q: "What is CAKE and how does it fix bufferbloat?", a: "CAKE (Common Applications Kept Enhanced) is an AQM + fair-queuing algorithm built into the Linux kernel (4.19+) and OpenWrt. It shapes traffic at precisely your line rate, applies per-flow fairness queuing so no single download can monopolise the buffer, and adds active queue management to drop or ECN-mark packets before the buffer overflows. Enable it in OpenWrt via: Network → Interfaces → WAN → Advanced → Queue → CAKE, or via the terminal: tc qdisc replace dev eth0 root cake bandwidth 100Mbit." },
                { q: "My internet is fast (200 Mbps) but gaming feels laggy — is bufferbloat the cause?", a: "Almost certainly. Fast speed + high bufferbloat is the textbook symptom. When your household streams 4K (20–50 Mbps), download packets fill the router queue. Your game's tiny 1 KB UDP packets queue behind those and arrive 100–500 ms late. CAKE and FQ-CoDel solve this by giving your game packets their own fair queue, regardless of how much bandwidth downloads are using." },
                { q: "How is this test different from a regular speed test?", a: "A speed test measures maximum throughput in Mbps — it's a useful benchmark but tells you nothing about latency behaviour under load. This bufferbloat test measures the *increase* in ping while your connection is saturated. A connection with 500 Mbps that shows +200 ms under load will feel slower than a 50 Mbps connection with +5 ms under load, because every interactive action competes with the saturated queue." },
                { q: "Does my ISP cause bufferbloat?", a: "Sometimes. Bufferbloat occurs at the bottleneck link — usually your router-to-ISP connection. Our test primarily measures your local equipment (modem/router). If you see severe bufferbloat (grade D/F) even on a brand-new router, your ISP's DSLAM, cable CMTS, or ONT may have oversized buffers that you cannot control. Document your test results and escalate to your ISP's technical support." },
                { q: "Can I fix bufferbloat without a new router?", a: "Yes, to a degree. Consumer routers (Asus, Netgear, TP-Link) all have QoS menus — enabling QoS and setting gaming/VoIP as high-priority reduces bufferbloat impact even without CAKE. You can also manually rate-limit downloads on your PC when gaming. For a permanent fix, the best option is flashing OpenWrt on a compatible router." },
                { q: "What bufferbloat grade do I need for gaming?", a: "Grade A or A+ (under 5 ms increase). This ensures that even when someone is streaming 4K Netflix on your network, your game packets still arrive within their original latency budget. Grade B is acceptable for casual gaming. Grade C and below will cause noticeable lag during any parallel download or streaming." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-border/30 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-foreground mb-2">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Related tools */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-primary" />Complete Network Diagnostic Suite</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Bufferbloat affects latency under load. Pair it with these tests for a complete picture:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { href: "/ping-test",           label: "Ping Test",            icon: Clock,      desc: "Idle latency baseline" },
                  { href: "/jitter-test",          label: "Jitter Test",          icon: Activity,   desc: "Packet arrival consistency" },
                  { href: "/packet-loss-test",     label: "Packet Loss Test",     icon: Wifi,       desc: "Dropped packet detection" },
                  { href: "/dns-speed-test",       label: "DNS Speed Test",       icon: Globe,      desc: "DNS resolver benchmark" },
                  { href: "/bandwidth-calculator", label: "Bandwidth Calculator", icon: Zap,        desc: "Download time estimator" },
                  { href: "/",                     label: "Full Speed Test",      icon: Monitor,    desc: "Download, upload & jitter" },
                ].map(({ href, label, icon: Icon, desc }) => (
                  <Link key={href} href={href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                      <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{label}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <GenericFooter />
    </div>
  );
}
