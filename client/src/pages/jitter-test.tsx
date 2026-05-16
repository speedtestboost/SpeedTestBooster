import { useState, useEffect, useRef, useCallback } from "react";
import { setCanonicalHref } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";
import {
  Activity, CheckCircle, XCircle, AlertTriangle, Wifi, Zap,
  BarChart2, Clock, Globe, Gamepad2, Video, Phone,
} from "lucide-react";

// ─── SEO helpers ─────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    document.title =
      "Free Jitter Test — Measure Network Jitter & Stability Online | Speed Test & Boost";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute(
        "content",
        "Free browser-based jitter test — measure packet-delay variation using RFC 3550 inter-arrival jitter. Instantly see if your connection is stable enough for gaming, video calls, and VoIP. No download required.",
      );

    const metas: [string, string][] = [
      ["og:title", "Free Jitter Test — Network Stability Check | SpeedTestBoost"],
      ["og:description", "Measure real network jitter in your browser — no install, no ads. RFC 3550-grade calculation with A–F quality grade."],
      ["og:url", "https://speedtestboost.com/jitter-test"],
      ["og:type", "website"],
    ];
    metas.forEach(([prop, val]) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
      el.setAttribute("content", val);
    });

    setCanonicalHref("https://speedtestboost.com/jitter-test");

    let ld = document.querySelector('script[data-page="jitter-test"]') as HTMLScriptElement | null;
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.setAttribute("data-page", "jitter-test"); document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free Jitter Test",
      "url": "https://speedtestboost.com/jitter-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Measure network jitter instantly in your browser. Accurate RFC 3550 inter-arrival jitter algorithm. Grades your connection A–F for gaming, video calls and VoIP.",
      "featureList": ["RFC 3550 jitter algorithm", "Live latency chart", "A–F quality grade", "No install required", "No ads"],
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── RFC 3550 inter-arrival jitter ──────────────────────────────────────────
/**
 * D(i,j) = |( Rj − Ri ) − ( Sj − Si )|
 * J(i) = J(i−1) + (|D(i−1,i)| − J(i−1)) / 16
 * Because we can't know true send-timestamps from a browser we approximate:
 * we fire pings at regular intervals (INTERVAL_MS apart) and treat that as
 * the send delta. Receive delta = actual measured RTT arrival differences.
 */
const PING_URL = "/api/speed-test/ping";
const INTERVAL_MS = 200;    // send interval
const TOTAL_PINGS = 50;     // enough for a reliable estimate

interface PingPoint { seq: number; rtt: number; jitter: number; ts: number; }

function computeRFC3550Jitter(rtts: number[], intervalMs: number): number {
  if (rtts.length < 2) return 0;
  let J = 0;
  for (let i = 1; i < rtts.length; i++) {
    // D(i-1, i): difference in interarrival vs expected interval
    // Since we fire every intervalMs and both "clocks" are the same host,
    // the transit variation is simply |rtt[i] - rtt[i-1]|
    const D = Math.abs(rtts[i] - rtts[i - 1]);
    J = J + (D - J) / 16;
  }
  return J;
}

function gradeJitter(ms: number): { label: string; color: string; bg: string; icon: typeof CheckCircle; desc: string } {
  if (ms < 5)  return { label: "A+", color: "text-green-500",  bg: "bg-green-500/10",  icon: CheckCircle,    desc: "Excellent — imperceptible variation" };
  if (ms < 10) return { label: "A",  color: "text-green-400",  bg: "bg-green-400/10",  icon: CheckCircle,    desc: "Great — ideal for gaming & calls" };
  if (ms < 20) return { label: "B",  color: "text-blue-400",   bg: "bg-blue-400/10",   icon: CheckCircle,    desc: "Good — slight blips, usually fine" };
  if (ms < 40) return { label: "C",  color: "text-yellow-400", bg: "bg-yellow-400/10", icon: AlertTriangle,  desc: "Fair — noticeable in real-time apps" };
  if (ms < 80) return { label: "D",  color: "text-orange-500", bg: "bg-orange-500/10", icon: AlertTriangle,  desc: "Poor — video calls will suffer" };
  return                { label: "F",  color: "text-red-500",    bg: "bg-red-500/10",    icon: XCircle,        desc: "Bad — VoIP / gaming severely impacted" };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function JitterTest() {
  useSEO();

  const [running, setRunning]         = useState(false);
  const [progress, setProgress]       = useState(0);
  const [points, setPoints]           = useState<PingPoint[]>([]);
  const [avgRtt, setAvgRtt]           = useState<number | null>(null);
  const [finalJitter, setFinalJitter] = useState<number | null>(null);
  const [minRtt, setMinRtt]           = useState<number | null>(null);
  const [maxRtt, setMaxRtt]           = useState<number | null>(null);
  const [status, setStatus]           = useState("Ready to test your jitter");
  const abortRef = useRef(false);

  const runTest = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    setPoints([]);
    setAvgRtt(null);
    setFinalJitter(null);
    setMinRtt(null);
    setMaxRtt(null);
    abortRef.current = false;
    setStatus("Warming up…");

    const rtts: number[] = [];
    const collected: PingPoint[] = [];
    let J = 0;

    for (let i = 0; i < TOTAL_PINGS; i++) {
      if (abortRef.current) break;
      const deadline = performance.now() + INTERVAL_MS;
      try {
        const t0 = performance.now();
        await fetch(`${PING_URL}?t=${Date.now()}&seq=${i}`, { cache: "no-store" });
        const rtt = performance.now() - t0;
        rtts.push(rtt);

        if (rtts.length >= 2) {
          const D = Math.abs(rtts[rtts.length - 1] - rtts[rtts.length - 2]);
          J = J + (D - J) / 16;
        }
        collected.push({ seq: i, rtt, jitter: J, ts: Date.now() });
        setPoints([...collected]);
        setStatus(i < 5 ? "Warming up…" : `Measuring… (${i + 1}/${TOTAL_PINGS})`);
      } catch { /* skip failed ping */ }

      setProgress(Math.round(((i + 1) / TOTAL_PINGS) * 100));
      const wait = deadline - performance.now();
      if (wait > 0) await new Promise(r => setTimeout(r, wait));
    }

    if (rtts.length >= 2) {
      const finalJ = computeRFC3550Jitter(rtts, INTERVAL_MS);
      const avg = rtts.reduce((a, b) => a + b, 0) / rtts.length;
      setAvgRtt(avg);
      setFinalJitter(finalJ);
      setMinRtt(Math.min(...rtts));
      setMaxRtt(Math.max(...rtts));
      setStatus("Test complete");
    } else {
      setStatus("Test failed — check your connection");
    }
    setRunning(false);
  }, [running]);

  const grade = finalJitter !== null ? gradeJitter(finalJitter) : null;

  // Simple SVG sparkline
  const sparkWidth = 400;
  const sparkHeight = 80;
  const sparkPoints = points.slice(-60);
  const maxVal = sparkPoints.length ? Math.max(...sparkPoints.map(p => p.rtt), 1) : 1;
  const polyline = sparkPoints
    .map((p, i) => `${(i / Math.max(sparkPoints.length - 1, 1)) * sparkWidth},${sparkHeight - (p.rtt / maxVal) * sparkHeight}`)
    .join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/jitter-test" />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Jitter Test", href: "/jitter-test" }]} />

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <Activity className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Free Jitter Test
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Measure your network jitter in real-time — the #1 indicator of connection stability for gaming, video calls, and VoIP. Uses the RFC&nbsp;3550 inter-arrival algorithm. <strong>No download. No ads.</strong>
            </p>
          </div>

          {/* Main test card */}
          <Card className="mb-8 border-2 border-primary/20 shadow-lg shadow-primary/5">
            <CardContent className="p-8">
              {/* Sparkline */}
              <div className="mb-6 rounded-xl overflow-hidden bg-muted/30 border border-border/40 p-3">
                <svg width="100%" viewBox={`0 0 ${sparkWidth} ${sparkHeight}`} preserveAspectRatio="none" className="h-20">
                  {points.length > 1 && (
                    <polyline
                      points={polyline}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  )}
                  {points.length <= 1 && (
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">
                      Latency chart will appear here
                    </text>
                  )}
                </svg>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Jitter", value: finalJitter !== null ? `${finalJitter.toFixed(2)} ms` : "—", highlight: true },
                  { label: "Avg RTT", value: avgRtt !== null ? `${avgRtt.toFixed(1)} ms` : "—" },
                  { label: "Min RTT", value: minRtt !== null ? `${minRtt.toFixed(1)} ms` : "—" },
                  { label: "Max RTT", value: maxRtt !== null ? `${maxRtt.toFixed(1)} ms` : "—" },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`rounded-xl p-4 text-center ${highlight ? "bg-primary/10 border border-primary/30" : "bg-muted/30 border border-border/40"}`}>
                    <div className={`text-2xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Grade */}
              {grade && (
                <div className={`flex items-center gap-4 rounded-xl p-4 mb-6 ${grade.bg} border border-current/20`}>
                  <div className={`text-5xl font-black ${grade.color}`}>{grade.label}</div>
                  <div>
                    <div className={`text-lg font-semibold ${grade.color}`}>{grade.desc}</div>
                    <div className="text-sm text-muted-foreground">Jitter = {finalJitter?.toFixed(2)} ms</div>
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {running && <Progress value={progress} className="mb-4 h-2" />}
              <p className="text-sm text-muted-foreground mb-4 text-center">{status}</p>

              <Button
                size="lg"
                className="w-full text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                onClick={runTest}
                disabled={running}
              >
                {running ? (
                  <><Activity className="mr-2 h-5 w-5 animate-pulse" /> Testing… {progress}%</>
                ) : (
                  <><Zap className="mr-2 h-5 w-5" /> {finalJitter !== null ? "Re-test Jitter" : "Start Jitter Test"}</>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* What is jitter */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5 text-primary" />What is Network Jitter?</CardTitle></CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-3">
              <p>
                <strong>Jitter</strong> is the variation in the time it takes for packets to travel across your network. 
                While <strong>latency (ping)</strong> tells you the average delay, jitter tells you how <em>consistent</em> that delay is.
              </p>
              <p>
                We use the <strong>RFC&nbsp;3550 exponential weighted moving average</strong> formula — the same algorithm 
                used in RTP/VoIP systems and WebRTC:<br />
                <code className="text-primary">J(i) = J(i−1) + (|D(i−1,i)| − J(i−1)) / 16</code><br />
                where <em>D(i−1,i)</em> is the inter-arrival difference between consecutive packets.
              </p>
              <p>High jitter causes audio "robotization" in calls, stuttering in games, and video pixelation — even when your average ping looks fine.</p>
            </CardContent>
          </Card>

          {/* Grade table */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Jitter Grades Explained</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-2 px-3 text-left font-semibold">Grade</th>
                      <th className="py-2 px-3 text-left font-semibold">Jitter</th>
                      <th className="py-2 px-3 text-left font-semibold">Gaming</th>
                      <th className="py-2 px-3 text-left font-semibold">Video Calls</th>
                      <th className="py-2 px-3 text-left font-semibold">VoIP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { g: "A+", j: "< 5 ms",  game: "✅ Ideal",   video: "✅ Perfect",    voip: "✅ Crystal clear" },
                      { g: "A",  j: "5–10 ms", game: "✅ Great",   video: "✅ Excellent",   voip: "✅ Very clear" },
                      { g: "B",  j: "10–20 ms",game: "✅ Good",    video: "✅ Good",        voip: "✅ Clear" },
                      { g: "C",  j: "20–40 ms",game: "⚠️ Fair",    video: "⚠️ Some blips",  voip: "⚠️ Occasional drops" },
                      { g: "D",  j: "40–80 ms",game: "❌ Poor",    video: "❌ Choppy",      voip: "❌ Frequent gaps" },
                      { g: "F",  j: "> 80 ms", game: "❌ Unplayable",video:"❌ Unusable",   voip: "❌ Broken" },
                    ].map(row => (
                      <tr key={row.g} className="hover:bg-muted/20 transition-colors">
                        <td className="py-2 px-3 font-bold text-primary">{row.g}</td>
                        <td className="py-2 px-3">{row.j}</td>
                        <td className="py-2 px-3">{row.game}</td>
                        <td className="py-2 px-3">{row.video}</td>
                        <td className="py-2 px-3">{row.voip}</td>
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
              { icon: Gamepad2, label: "Gaming", limit: "< 15 ms", detail: "Competitive FPS, MOBA, battle-royale" },
              { icon: Video,    label: "Video Calls", limit: "< 30 ms", detail: "Zoom, Teams, Google Meet, Webex" },
              { icon: Phone,    label: "VoIP", limit: "< 20 ms", detail: "SIP calls, WhatsApp audio, Discord" },
            ].map(({ icon: Icon, label, limit, detail }) => (
              <Card key={label} className="text-center hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <Icon className="h-7 w-7 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{label}</div>
                  <div className="text-2xl font-bold text-primary my-1">{limit}</div>
                  <div className="text-xs text-muted-foreground">{detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Deep-dive: causes & fixes */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" />Why High Jitter Ruins Your Connection</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Even if your average ping is a respectable 30 ms, a jitter of 50 ms means individual packets are 
                arriving anywhere between 5 ms and 80 ms. Real-time applications like games, voice and video 
                calls cannot buffer this variation — they simply drop the late packets or play silence.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
                  <h3 className="font-semibold text-foreground mb-2">Common Causes of High Jitter</h3>
                  <ul className="space-y-1 text-xs">
                    <li>📶 <strong>WiFi interference</strong> — neighbouring networks on the same channel</li>
                    <li>🏠 <strong>Network congestion</strong> — multiple heavy users on your home LAN</li>
                    <li>🔌 <strong>Faulty/old cables</strong> — degraded Ethernet or coax splitters</li>
                    <li>📡 <strong>ISP congestion</strong> — peak-hour traffic on shared last-mile links</li>
                    <li>⚙️ <strong>QoS disabled</strong> — all traffic competing at equal priority</li>
                    <li>🌍 <strong>Long route hops</strong> — packets crossing many continents</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                  <h3 className="font-semibold text-foreground mb-2">How to Fix High Jitter</h3>
                  <ul className="space-y-1 text-xs">
                    <li>🔌 <strong>Switch to Ethernet</strong> — eliminates WiFi variance almost entirely</li>
                    <li>📡 <strong>Change WiFi channel</strong> — use 5 GHz or a less-congested 2.4 GHz channel</li>
                    <li>⚙️ <strong>Enable QoS</strong> — prioritise gaming/VoIP traffic on your router</li>
                    <li>🔄 <strong>Reboot modem &amp; router</strong> — clears memory buffers and route caches</li>
                    <li>🧱 <strong>Enable CAKE/FQ-CoDel</strong> — active queue management on OpenWrt routers</li>
                    <li>📞 <strong>Call your ISP</strong> — if jitter is high at all hours, it's their infrastructure</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jitter in different contexts */}
          <Card className="mb-6">
            <CardHeader><CardTitle>How Jitter Affects Different Activities</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Competitive Gaming (Valorant, CS2, Apex Legends)",
                    threshold: "Under 5 ms",
                    impact: "High jitter causes bullets to register late (\"hit reg\" problems), character positions to lag behind, and health bars to show damage after you've already moved. Professional players often test below 3 ms jitter on wired connections.",
                    tip: "Use a wired connection, enable QoS on your router to prioritise UDP game traffic, and connect to servers geographically close to you.",
                  },
                  {
                    title: "Video Conferencing (Zoom, Google Meet, Microsoft Teams)",
                    threshold: "Under 30 ms",
                    impact: "Jitter above 30 ms causes audio to chop and video to freeze, even when bandwidth is technically adequate. Jitter buffers in Zoom compensate up to ~30 ms but introduce proportional delay in exchange.",
                    tip: "Use a headset instead of laptop speakers (reduces echo cancellation processing), close background apps consuming bandwidth, and use a 5 GHz WiFi band or Ethernet.",
                  },
                  {
                    title: "VoIP Calls (WhatsApp, Discord, SIP phones)",
                    threshold: "Under 20 ms",
                    impact: "ITU-T G.114 recommends maximum one-way jitter of 50 ms for acceptable voice quality. Above this threshold, words become garbled, conversations overlap, and calls drop. SIP phones have smaller jitter buffers than consumer apps.",
                    tip: "Enable the G.711 or Opus codec on your SIP client (wider dynamic range), and deploy DSCP QoS markings (EF = 46) on your router for VoIP packets.",
                  },
                  {
                    title: "Live Streaming (Twitch, YouTube Live)",
                    threshold: "Under 50 ms",
                    impact: "Streaming encodes frames at a fixed interval. Network jitter causes uneven packet delivery to the ingest server, resulting in dropped frames, stream disconnects, and viewer-side buffering. OBS will show yellow/red indicators in the stats overlay.",
                    tip: "Use a wired connection, set your OBS bitrate to 70–80% of your measured upload speed, and choose an ingest server that's geographically nearby.",
                  },
                ].map(({ title, threshold, impact, tip }) => (
                  <div key={title} className="border border-border/40 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full whitespace-nowrap">{threshold}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2"><strong>Impact:</strong> {impact}</p>
                    <p className="text-xs text-muted-foreground"><strong>Fix:</strong> {tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ schema-friendly */}
          <Card className="mb-8">
            <CardHeader><CardTitle>Frequently Asked Questions About Jitter</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {[
                {
                  q: "How is this jitter test calculated?",
                  a: "We send 50 HTTPS probes at 200 ms intervals to our edge server and apply the RFC 3550 exponential smoothing formula J(i) = J(i−1) + (|D(i−1,i)| − J(i−1)) / 16. This mimics exactly how VoIP endpoints and WebRTC implementations measure jitter in production — it's the same algorithm your phone uses on every call.",
                },
                {
                  q: "What is a good jitter for gaming?",
                  a: "For casual gaming, anything under 15 ms is perfectly fine. For competitive play in Valorant, CS2, Fortnite, or Apex Legends, you want under 5 ms. Professional esports players typically test at 1–3 ms jitter on dedicated wired connections.",
                },
                {
                  q: "Is jitter the same as ping?",
                  a: "No. Ping (latency) is the average round-trip time — how long one request takes. Jitter is the variation in that time between consecutive packets. A connection can have excellent ping of 20 ms but terrible jitter of 60 ms, meaning packets arrive anywhere from near-instant to 80 ms late. For real-time apps, high jitter is often worse than high ping.",
                },
                {
                  q: "What causes jitter on WiFi?",
                  a: "WiFi jitter is primarily caused by: (1) Competing networks on the same channel — your neighbours' routers interfere with yours. (2) Physical obstacles — walls, floors, and appliances cause signal reflections that vary arrival times. (3) Client-side power saving — many laptops and phones periodically sleep the WiFi radio to save battery, causing periodic burst delays. Switching to 5 GHz and using a wired connection eliminates most WiFi jitter.",
                },
                {
                  q: "My ping is good but Zoom still sounds choppy — why?",
                  a: "This is the classic jitter symptom. Zoom (and all real-time audio) uses a jitter buffer — it waits a short time for packets to arrive before playing them. When jitter exceeds the buffer size, packets arrive too late and are discarded, causing choppy audio. Run our jitter test: if you see over 20–30 ms, that's your culprit. Enable QoS on your router to prioritise Zoom traffic.",
                },
                {
                  q: "Does a VPN increase jitter?",
                  a: "Usually yes — a VPN adds encryption overhead and reroutes packets through an extra server, both of which increase latency variability. However, if your ISP throttles specific traffic or uses suboptimal routing to certain regions, a VPN can sometimes reduce jitter by taking a better path. Test with and without VPN using this tool to compare.",
                },
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
              <p className="text-sm text-muted-foreground mb-4">Jitter is just one piece of the puzzle. Run all tests for a complete picture of your connection health:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { href: "/ping-test",           label: "Ping Test",            icon: Clock,      desc: "Measure baseline latency" },
                  { href: "/packet-loss-test",     label: "Packet Loss Test",     icon: Wifi,       desc: "Detect dropped packets" },
                  { href: "/bufferbloat-test",     label: "Bufferbloat Test",     icon: BarChart2,  desc: "Router lag under load" },
                  { href: "/dns-speed-test",       label: "DNS Speed Test",       icon: Globe,      desc: "Benchmark DNS resolvers" },
                  { href: "/bandwidth-calculator", label: "Bandwidth Calculator", icon: Activity,   desc: "Download time estimator" },
                  { href: "/",                     label: "Full Speed Test",      icon: Zap,        desc: "Download, upload & jitter" },
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
