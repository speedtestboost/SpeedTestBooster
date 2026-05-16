import { useState, useEffect, useRef, useCallback } from "react";
import { setCanonicalHref } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";
import {
  Wifi, CheckCircle, XCircle, AlertTriangle, Activity,
  BarChart2, Clock, Globe, Gamepad2, Video, Zap,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    document.title =
      "Free Packet Loss Test — Check Network Packet Loss Online | Speed Test & Boost";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute("content",
        "Free online packet loss test — detect dropped packets affecting your gaming, streaming and calls. Real multi-probe methodology, instant results, 0 % target. No install, no ads.");

    const metas: [string, string][] = [
      ["og:title", "Free Packet Loss Test — Detect Dropped Packets | SpeedTestBoost"],
      ["og:description", "Find out if your ISP is dropping packets. Browser-based, no download needed. Grade A–F with fix tips."],
      ["og:url", "https://speedtestboost.com/packet-loss-test"],
      ["og:type", "website"],
    ];
    metas.forEach(([p, v]) => {
      let el = document.querySelector(`meta[property="${p}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", p); document.head.appendChild(el); }
      el.setAttribute("content", v);
    });

    setCanonicalHref("https://speedtestboost.com/packet-loss-test");

    let ld = document.querySelector('script[data-page="packet-loss-test"]') as HTMLScriptElement | null;
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.setAttribute("data-page", "packet-loss-test"); document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free Packet Loss Test",
      "url": "https://speedtestboost.com/packet-loss-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Detect packet loss instantly in your browser using multi-probe HTTP methodology. Shows loss %, affected packets, and A–F quality grade.",
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── Test logic ───────────────────────────────────────────────────────────────
// We fire TOTAL probes to our own /api/speed-test/ping endpoint in bursts of
// CONCURRENCY. A probe is considered "lost" if it times out after TIMEOUT_MS.
// This mirrors how traceroute / ping flood measures loss.
const PING_URL = "/api/speed-test/ping";
const TOTAL_PROBES = 100;
const CONCURRENCY  = 5;
const TIMEOUT_MS   = 3000;
const INTERVAL_MS  = 50;   // gap between starting each probe batch

async function singleProbe(seq: number): Promise<{ seq: number; ok: boolean; rtt: number }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  const t0 = performance.now();
  try {
    await fetch(`${PING_URL}?t=${Date.now()}&seq=${seq}`, { signal: ctrl.signal, cache: "no-store" });
    return { seq, ok: true, rtt: performance.now() - t0 };
  } catch {
    return { seq, ok: false, rtt: TIMEOUT_MS };
  } finally {
    clearTimeout(timer);
  }
}

function gradeLoss(pct: number): { label: string; color: string; bg: string; icon: typeof CheckCircle; desc: string } {
  if (pct === 0)    return { label: "A+", color: "text-green-500",  bg: "bg-green-500/10",  icon: CheckCircle,   desc: "Perfect — zero packet loss detected" };
  if (pct < 0.5)   return { label: "A",  color: "text-green-400",  bg: "bg-green-400/10",  icon: CheckCircle,   desc: "Excellent — negligible loss" };
  if (pct < 1)     return { label: "B",  color: "text-blue-400",   bg: "bg-blue-400/10",   icon: CheckCircle,   desc: "Good — barely noticeable" };
  if (pct < 2.5)   return { label: "C",  color: "text-yellow-400", bg: "bg-yellow-400/10", icon: AlertTriangle, desc: "Fair — games & calls may stutter" };
  if (pct < 5)     return { label: "D",  color: "text-orange-500", bg: "bg-orange-500/10", icon: AlertTriangle, desc: "Poor — significant quality impact" };
  return             { label: "F",  color: "text-red-500",    bg: "bg-red-500/10",    icon: XCircle,       desc: "Bad — unusable for real-time apps" };
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ProbeResult { seq: number; ok: boolean; rtt: number }

export default function PacketLossTest() {
  useSEO();

  const [running, setRunning]       = useState(false);
  const [progress, setProgress]     = useState(0);
  const [results, setResults]       = useState<ProbeResult[]>([]);
  const [status, setStatus]         = useState("Ready — click Start to detect packet loss");
  const abortRef = useRef(false);

  const sent    = results.length;
  const lost    = results.filter(r => !r.ok).length;
  const lossPct = sent > 0 ? (lost / sent) * 100 : 0;
  const avgRtt  = sent > 0 ? results.filter(r => r.ok).reduce((a, b) => a + b.rtt, 0) / (sent - lost || 1) : 0;
  const grade   = sent >= TOTAL_PROBES ? gradeLoss(lossPct) : null;

  const runTest = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setResults([]);
    setProgress(0);
    abortRef.current = false;
    setStatus("Sending probes…");

    const all: ProbeResult[] = [];
    const batches = Math.ceil(TOTAL_PROBES / CONCURRENCY);

    for (let b = 0; b < batches; b++) {
      if (abortRef.current) break;
      const start = b * CONCURRENCY;
      const end   = Math.min(start + CONCURRENCY, TOTAL_PROBES);
      const batch = Array.from({ length: end - start }, (_, i) => singleProbe(start + i));
      const batchResults = await Promise.all(batch);
      all.push(...batchResults);
      setResults([...all]);
      setProgress(Math.round((all.length / TOTAL_PROBES) * 100));
      setStatus(`Testing… ${all.length}/${TOTAL_PROBES} probes`);
      if (b < batches - 1) await new Promise(r => setTimeout(r, INTERVAL_MS));
    }

    const finalLost = all.filter(r => !r.ok).length;
    const finalPct  = (finalLost / TOTAL_PROBES) * 100;
    setStatus(finalPct === 0 ? "Perfect! Zero packet loss detected." : `Done — ${finalPct.toFixed(1)}% packet loss`);
    setRunning(false);
  }, [running]);

  // Dot grid visualiser
  const dots = results.map((r, i) => (
    <div
      key={i}
      title={r.ok ? `Probe ${r.seq}: ${r.rtt.toFixed(1)} ms` : `Probe ${r.seq}: LOST`}
      className={`w-3 h-3 rounded-full ${r.ok ? "bg-green-500" : "bg-red-500"}`}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/packet-loss-test" />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Packet Loss Test", href: "/packet-loss-test" }]} />

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <Wifi className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Free Packet Loss Test
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detect dropped packets that silently ruin gaming, streaming, and video calls. 
              We send <strong>100 probes</strong> and count every one that doesn't come back. 
              <strong> No download. No ads.</strong>
            </p>
          </div>

          {/* Main card */}
          <Card className="mb-8 border-2 border-primary/20 shadow-lg shadow-primary/5">
            <CardContent className="p-8">
              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Loss %",    value: sent > 0 ? `${lossPct.toFixed(2)} %` : "—", highlight: true },
                  { label: "Lost",      value: sent > 0 ? `${lost} / ${sent}` : "—" },
                  { label: "Avg RTT",   value: sent > 0 && sent > lost ? `${avgRtt.toFixed(1)} ms` : "—" },
                  { label: "Sent",      value: sent > 0 ? String(sent) : "—" },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`rounded-xl p-4 text-center ${highlight ? "bg-primary/10 border border-primary/30" : "bg-muted/30 border border-border/40"}`}>
                    <div className={`text-2xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Dot grid */}
              <div className="flex flex-wrap gap-1 p-3 rounded-xl bg-muted/30 border border-border/40 mb-6 min-h-[60px]">
                {dots.length > 0 ? dots : (
                  <span className="text-xs text-muted-foreground m-auto">Probe dots will appear here — 🟢 received, 🔴 lost</span>
                )}
              </div>

              {/* Grade */}
              {grade && (
                <div className={`flex items-center gap-4 rounded-xl p-4 mb-6 ${grade.bg}`}>
                  <div className={`text-5xl font-black ${grade.color}`}>{grade.label}</div>
                  <div>
                    <div className={`text-lg font-semibold ${grade.color}`}>{grade.desc}</div>
                    <div className="text-sm text-muted-foreground">Loss = {lossPct.toFixed(2)} % ({lost}/{sent})</div>
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
                  : <><Zap className="mr-2 h-5 w-5" />{grade ? "Re-test Packet Loss" : "Start Packet Loss Test"}</>
                }
              </Button>
            </CardContent>
          </Card>

          {/* What is packet loss */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5 text-primary" />What is Packet Loss?</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Every action on the internet — a keypress in a game, a video frame, a word in a voice call — travels as one or more <strong>data packets</strong>. When a packet fails to reach its destination, that's <strong>packet loss</strong>.</p>
              <p>Unlike slow speeds (which can be buffered), lost packets must be <em>retransmitted</em> by TCP, or are simply <em>dropped</em> in UDP-based real-time apps. The result: rubber-banding in games, garbled audio, frozen video frames.</p>
              <p><strong>Our method:</strong> We fire 100 timed HTTP probes to our edge server. Any probe that fails to respond within 3 seconds counts as lost. Loss % = (lost ÷ sent) × 100.</p>
            </CardContent>
          </Card>

          {/* Grade table */}
          <Card className="mb-6">
            <CardHeader><CardTitle>Packet Loss Thresholds</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-2 px-3 text-left">Grade</th>
                      <th className="py-2 px-3 text-left">Loss %</th>
                      <th className="py-2 px-3 text-left">Gaming</th>
                      <th className="py-2 px-3 text-left">Streaming</th>
                      <th className="py-2 px-3 text-left">VoIP / Calls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { g: "A+", l: "0 %",       gm: "✅ Perfect",    st: "✅ Perfect",    vo: "✅ Perfect" },
                      { g: "A",  l: "< 0.5 %",   gm: "✅ Excellent",  st: "✅ Seamless",   vo: "✅ Excellent" },
                      { g: "B",  l: "0.5–1 %",   gm: "✅ Good",       st: "✅ Good",       vo: "✅ Good" },
                      { g: "C",  l: "1–2.5 %",   gm: "⚠️ Noticeable", st: "⚠️ Slight",    vo: "⚠️ Choppy" },
                      { g: "D",  l: "2.5–5 %",   gm: "❌ Poor",       st: "❌ Buffering",  vo: "❌ Garbled" },
                      { g: "F",  l: "> 5 %",     gm: "❌ Unplayable", st: "❌ Broken",     vo: "❌ Unusable" },
                    ].map(r => (
                      <tr key={r.g} className="hover:bg-muted/20">
                        <td className="py-2 px-3 font-bold text-primary">{r.g}</td>
                        <td className="py-2 px-3">{r.l}</td>
                        <td className="py-2 px-3">{r.gm}</td>
                        <td className="py-2 px-3">{r.st}</td>
                        <td className="py-2 px-3">{r.vo}</td>
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
              { icon: Gamepad2, label: "Gaming",     limit: "< 1%",  detail: "FPS, MOBA, battle-royale" },
              { icon: Video,    label: "Video Calls",limit: "< 2%",  detail: "Zoom, Teams, Meets" },
              { icon: Clock,    label: "Streaming",  limit: "< 2.5%",detail: "Netflix, YouTube, Twitch" },
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

          {/* Deep-dive causes and fixes */}
          <Card className="mb-6">
            <CardHeader><CardTitle>Packet Loss — Causes, Effects & Fixes</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Packet loss is often invisible until it starts ruining your experience. Unlike slow speeds, which 
                cause general sluggishness, packet loss creates sudden interruptions — a gunshot that doesn't register, 
                a word in a call that disappears, a download that hangs and then jumps.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
                  <h3 className="font-semibold text-foreground mb-2">What Causes Packet Loss?</h3>
                  <ul className="space-y-1 text-xs">
                    <li>📶 <strong>WiFi interference</strong> — cordless phones, microwaves, baby monitors on 2.4 GHz</li>
                    <li>🔌 <strong>Bad cables/connectors</strong> — damaged RJ-45 jacks or coax splitters</li>
                    <li>🌐 <strong>Network congestion</strong> — router queue overflow during peak hours</li>
                    <li>🏠 <strong>Overloaded home router</strong> — too many connections, old firmware</li>
                    <li>📡 <strong>ISP infrastructure</strong> — degraded DSLAM, congested exchange</li>
                    <li>🖥️ <strong>Buggy network drivers</strong> — especially on laptops with WiFi adapters</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-4">
                  <h3 className="font-semibold text-foreground mb-2">How to Fix Packet Loss</h3>
                  <ul className="space-y-1 text-xs">
                    <li>🔌 <strong>Use Ethernet</strong> — eliminates all wireless-related loss</li>
                    <li>🔄 <strong>Reboot modem &amp; router</strong> — clears congestion states and ARP tables</li>
                    <li>🔧 <strong>Replace suspect cables</strong> — test each cable with a cable tester</li>
                    <li>📡 <strong>Update router firmware</strong> — manufacturers patch packet-handling bugs</li>
                    <li>📞 <strong>Call your ISP</strong> — run a line quality test (BQM) for 24 hours</li>
                    <li>💻 <strong>Update network drivers</strong> — especially Realtek/Intel WiFi adapters</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How packet loss affects each use case */}
          <Card className="mb-6">
            <CardHeader><CardTitle>Packet Loss Impact by Use Case</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Online Gaming (FPS & Battle Royale)",
                    threshold: "< 0.5%",
                    impact: "UDP-based games like Valorant, CS2, and Fortnite cannot retransmit lost game-state packets. The client shows the last known position until a new packet arrives — appearing as rubber-banding or teleporting. 1% loss in CS2 is enough to fail professional qualification.",
                    tip: "Use Ethernet. Enable gaming/QoS mode on your router. Pick servers with the lowest ping — geographic proximity reduces the probability of in-path congestion.",
                  },
                  {
                    title: "Video Calls (Zoom, Teams, Google Meet)",
                    threshold: "< 2%",
                    impact: "WebRTC has forward-error-correction (FEC) which can reconstruct 1–2 lost packets in a row. Beyond that, Zoom's codec drops entire frames, causing frozen video and choppy audio. A 5% loss rate makes calls practically unusable.",
                    tip: "Use wired connection. Disable bandwidth-heavy background apps during calls. Enable 'Always use original sound' in Zoom to reduce codec compression that amplifies loss artifacts.",
                  },
                  {
                    title: "File Downloads & Streaming",
                    threshold: "< 2.5%",
                    impact: "TCP downloads automatically retransmit lost packets but the retransmission halves the congestion window, slashing throughput. 2% packet loss can reduce effective throughput by 20–50%. Netflix and YouTube buffer around minor loss but sustained loss causes rebuffering.",
                    tip: "Run a 30-minute broadband quality monitoring (BQM) test during the time of day you experience problems. This helps distinguish random loss from peak-hour ISP congestion.",
                  },
                  {
                    title: "Cloud Gaming (GeForce NOW, Xbox Cloud, PlayStation Now)",
                    threshold: "< 1%",
                    impact: "Cloud gaming streams compressed video frames over UDP. A lost frame cannot be recovered — the client receives a corrupted or frozen frame instead. Even 0.5% loss causes visible blocky artifacts and controls feeling unresponsive.",
                    tip: "Cloud gaming requires the most demanding network conditions. Use Ethernet, a 5 GHz WiFi band at minimum, and a wired connection to your router if playing wirelessly is unavoidable.",
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

          {/* FAQ */}
          <Card className="mb-8">
            <CardHeader><CardTitle>Frequently Asked Questions About Packet Loss</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {[
                { q: "What causes packet loss?", a: "The most common causes are: WiFi interference (especially on crowded 2.4 GHz), degraded cables or connectors, overloaded router/modem buffers, ISP-side congestion at peak hours, and outdated network drivers. A line test through your ISP can rule out the last-mile infrastructure." },
                { q: "Is 1% packet loss bad for gaming?", a: "Yes, for competitive games. FPS titles like Valorant and CS2 use UDP — lost packets are never retransmitted. Even 0.5% loss shows as rubber-banding or hit-registration failure in competitive play. Casual and strategy games are more tolerant, but 0% is always the goal." },
                { q: "How do I do a packet loss test on Windows?", a: "Open Command Prompt and run: ping -n 100 8.8.8.8. Count the 'Request timed out' lines — each is one lost packet. Divide by 100 for your loss percentage. Our web-based test above is easier and tests against multiple endpoints automatically." },
                { q: "Can my ISP cause packet loss?", a: "Yes — and it's more common than people think. ISP-side packet loss often appears only during peak hours (evenings, weekends) when the shared access network is congested. Run tests at different times of day. If loss only appears in the evenings, contact your ISP with evidence." },
                { q: "Can a VPN fix packet loss?", a: "Sometimes. If loss occurs on a specific routing path between your location and a server, a VPN reroutes packets through a different path, potentially bypassing the congested segment. However, a VPN itself adds a server hop and encryption overhead — if the loss is on your home network, a VPN will not help." },
                { q: "What's the difference between packet loss and slow internet?", a: "Slow internet means all packets arrive but bandwidth is limited — downloads are slow but consistent. Packet loss means some packets never arrive — TCP downloads stall and retry, UDP streams glitch. You can have fast-but-lossy internet or slow-but-lossless internet. Both require different fixes." },
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
              <p className="text-sm text-muted-foreground mb-4">Packet loss is one symptom. Run the full suite to diagnose your connection completely:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { href: "/ping-test",           label: "Ping Test",            icon: Clock,      desc: "Baseline latency check" },
                  { href: "/jitter-test",          label: "Jitter Test",          icon: Activity,   desc: "Connection stability" },
                  { href: "/bufferbloat-test",     label: "Bufferbloat Test",     icon: BarChart2,  desc: "Router queue health" },
                  { href: "/dns-speed-test",       label: "DNS Speed Test",       icon: Globe,      desc: "Fastest DNS for you" },
                  { href: "/bandwidth-calculator", label: "Bandwidth Calculator", icon: Zap,        desc: "Download time estimator" },
                  { href: "/",                     label: "Full Speed Test",      icon: Wifi,       desc: "Download, upload & jitter" },
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
