import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gamepad2, Zap, Clock, Activity, BarChart2, ChevronDown,
  CheckCircle, XCircle, AlertTriangle, Wifi, Globe, Monitor,
} from "lucide-react";

const PAGE_TITLE = "Internet Speed Test for Gaming 2026 — Ping, Jitter & Latency That Actually Matter";
const PAGE_DESC =
  "Free gaming internet speed test. Check ping, jitter, packet loss and bufferbloat — the metrics that actually cause lag in Valorant, Fortnite, CoD, FIFA and other online games. Not just Mbps.";
const PAGE_URL = "https://speedtestboost.com/gaming-speed-test";

function useSEO() {
  useEffect(() => {
    document.title = PAGE_TITLE;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", PAGE_DESC);

    const setMeta = (prop: string, val: string, attr = "property") => {
      let el = document.querySelector(`meta[${attr}="${prop}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, prop); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    setMeta("og:title", PAGE_TITLE);
    setMeta("og:description", PAGE_DESC);
    setMeta("og:url", PAGE_URL);
    setMeta("og:type", "article");
    setMeta("og:image", "https://speedtestboost.com/apple-touch-icon.png");
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", PAGE_TITLE, "name");
    setMeta("twitter:description", PAGE_DESC, "name");
    setMeta("twitter:image", "https://speedtestboost.com/apple-touch-icon.png", "name");
    setCanonicalHref(PAGE_URL);

    let ld = document.querySelector('script[data-page="gaming-speed-test"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "gaming-speed-test");
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": `${PAGE_URL}#article`,
          headline: PAGE_TITLE,
          description: PAGE_DESC,
          author: { "@type": "Organization", name: "Speed Test & Boost" },
          publisher: { "@type": "Organization", name: "Speed Test & Boost", logo: { "@type": "ImageObject", url: "https://speedtestboost.com/apple-touch-icon.png" } },
          datePublished: "2026-06-05",
          dateModified: "2026-06-05",
          mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
          articleSection: "Gaming & Networking",
          keywords: ["gaming speed test", "ping test gaming", "internet speed for gaming", "good ping for gaming", "low latency gaming"],
        },
        {
          "@type": "FAQPage",
          "@id": `${PAGE_URL}#faq`,
          mainEntity: [
            { "@type": "Question", name: "What internet speed do I need for gaming?", acceptedAnswer: { "@type": "Answer", text: "You need far less bandwidth than most people think. 5–15 Mbps download is enough for any online game. What matters is ping (under 50ms for casual, under 20ms for competitive), jitter (under 5ms), and packet loss (0% ideally, never above 1%). A 50 Mbps connection with 80ms ping will always lose to a 10 Mbps connection with 10ms ping." } },
            { "@type": "Question", name: "What is a good ping for gaming?", acceptedAnswer: { "@type": "Answer", text: "Under 20ms is excellent for competitive FPS games (Valorant, CS2, CoD). Under 50ms is good for most online games. Under 100ms is acceptable for casual play. Over 100ms will cause noticeable lag in fast-paced games. Jitter and stability matter just as much as average ping." } },
            { "@type": "Question", name: "Why does my internet lag when gaming even with fast speeds?", acceptedAnswer: { "@type": "Answer", text: "Fast download speed does not prevent lag. The most common causes of gaming lag are: high ping (latency to the game server), jitter (inconsistent ping that causes rubber-banding), packet loss (causing teleporting/disconnects), and bufferbloat (ping spikes when other devices are downloading). All four are tested separately on this page." } },
            { "@type": "Question", name: "What causes bufferbloat and how does it affect gaming?", acceptedAnswer: { "@type": "Answer", text: "Bufferbloat occurs when your router fills its buffer (queue) during heavy traffic, adding 50–500ms of extra latency. If your ping jumps from 15ms to 200ms whenever someone starts a Netflix stream or download, you have bufferbloat. Fix it by enabling SQM (Smart Queue Management) on your router, or check our bufferbloat test for an A–F grade and fix guide." } },
            { "@type": "Question", name: "Is WiFi or Ethernet better for gaming?", acceptedAnswer: { "@type": "Answer", text: "Ethernet is always better for gaming. WiFi adds 10–50ms of base latency, introduces jitter, and is susceptible to interference. A wired 50 Mbps Ethernet connection will outperform a wireless 500 Mbps WiFi connection in every online game. If Ethernet isn't possible, use 5GHz WiFi and sit close to the router." } },
            { "@type": "Question", name: "How much upload speed do I need for gaming?", acceptedAnswer: { "@type": "Answer", text: "Standard online gaming requires only 1–3 Mbps of upload bandwidth. The upload sends your controller inputs (a very small data stream) to the game server. If you're also streaming on Twitch or YouTube while gaming, you'll need 5–20 Mbps of upload depending on your stream quality." } },
            { "@type": "Question", name: "Which games need the lowest ping?", acceptedAnswer: { "@type": "Answer", text: "Competitive FPS games like Valorant, CS2 and Call of Duty are the most latency-sensitive — aim for under 20ms. Battle royales (Fortnite, Warzone) and MOBAs (League of Legends, Dota 2) need under 50ms. Sports games (FIFA, NBA 2K) under 60ms. MMORPGs and strategy games are more forgiving at under 100ms." } },
          ],
        },
      ],
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const METRICS = [
  {
    icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10",
    label: "Ping (Latency)",
    what: "Time for a signal to travel from your device to the game server and back (ms).",
    tiers: [
      { label: "Under 20ms", verdict: "Excellent", color: "text-green-400", desc: "Competitive FPS / Tournament play" },
      { label: "20–50ms",    verdict: "Good",      color: "text-blue-400",  desc: "All online games, including FPS" },
      { label: "50–100ms",   verdict: "Acceptable",color: "text-yellow-400",desc: "Casual gaming, RPGs, sports games" },
      { label: "Over 100ms", verdict: "Poor",      color: "text-red-400",   desc: "Noticeable lag in fast games" },
    ],
    toolHref: "/ping-test",
    toolLabel: "Run Ping Test",
  },
  {
    icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10",
    label: "Jitter",
    what: "Variation in ping between measurements. Causes rubber-banding and unpredictable movement.",
    tiers: [
      { label: "Under 2ms",  verdict: "Excellent", color: "text-green-400", desc: "Rock-solid for all games" },
      { label: "2–5ms",      verdict: "Good",      color: "text-blue-400",  desc: "Fine for competitive play" },
      { label: "5–15ms",     verdict: "Fair",      color: "text-yellow-400",desc: "Occasional stutter may occur" },
      { label: "Over 15ms",  verdict: "Poor",      color: "text-red-400",   desc: "Rubber-banding and lag spikes" },
    ],
    toolHref: "/jitter-test",
    toolLabel: "Run Jitter Test",
  },
  {
    icon: Wifi, color: "text-red-400", bg: "bg-red-400/10",
    label: "Packet Loss",
    what: "Percentage of data packets that never arrive. Even 1% causes teleporting and disconnects.",
    tiers: [
      { label: "0%",         verdict: "Excellent", color: "text-green-400", desc: "Perfect — no data lost" },
      { label: "0.1–0.5%",   verdict: "Acceptable",color: "text-yellow-400",desc: "Minor occasional hiccup" },
      { label: "0.5–1%",     verdict: "Poor",      color: "text-orange-400",desc: "Noticeable game issues" },
      { label: "Over 1%",    verdict: "Severe",    color: "text-red-400",   desc: "Teleporting, disconnects" },
    ],
    toolHref: "/packet-loss-test",
    toolLabel: "Run Packet Loss Test",
  },
  {
    icon: BarChart2, color: "text-orange-400", bg: "bg-orange-400/10",
    label: "Bufferbloat",
    what: "How much your ping spikes when the connection is saturated (e.g. a family member starts streaming).",
    tiers: [
      { label: "A / A+ grade",color: "text-green-400", verdict: "Excellent", desc: "Under 30ms added latency under load" },
      { label: "B grade",     color: "text-blue-400",  verdict: "Good",      desc: "Under 60ms — fine for gaming" },
      { label: "C grade",     color: "text-yellow-400",verdict: "Fair",      desc: "Noticeable lag during downloads" },
      { label: "D / F grade", color: "text-red-400",   verdict: "Severe",    desc: "Ping spikes 200ms+ — fix your router" },
    ],
    toolHref: "/bufferbloat-test",
    toolLabel: "Run Bufferbloat Test",
  },
];

const GAMES = [
  { game: "Valorant / CS2",      bandwidth: "5 Mbps",   ping: "< 20ms",  jitter: "< 2ms",  loss: "0%", priority: "Ping + Jitter" },
  { game: "Fortnite / Warzone",  bandwidth: "10 Mbps",  ping: "< 30ms",  jitter: "< 5ms",  loss: "0%", priority: "Ping + Packet Loss" },
  { game: "Call of Duty",        bandwidth: "5 Mbps",   ping: "< 20ms",  jitter: "< 3ms",  loss: "0%", priority: "Ping + Jitter" },
  { game: "FIFA / EA FC",        bandwidth: "5 Mbps",   ping: "< 50ms",  jitter: "< 5ms",  loss: "< 0.5%", priority: "Ping stability" },
  { game: "League of Legends",   bandwidth: "3 Mbps",   ping: "< 50ms",  jitter: "< 10ms", loss: "0%", priority: "Ping" },
  { game: "Minecraft Multiplayer",bandwidth: "3 Mbps",  ping: "< 80ms",  jitter: "< 15ms", loss: "< 1%", priority: "Stability" },
  { game: "PUBG / Battlegrounds",bandwidth: "10 Mbps",  ping: "< 50ms",  jitter: "< 5ms",  loss: "0%", priority: "Ping + Loss" },
  { game: "Streaming + Gaming",  bandwidth: "25+ Mbps", ping: "< 50ms",  jitter: "< 5ms",  loss: "0%", priority: "Upload bandwidth" },
];

const FAQ_ITEMS = [
  { q: "What internet speed do I need for gaming?", a: "You need far less bandwidth than most people think. 5–15 Mbps download is enough for any online game. What matters is ping (under 50ms for casual, under 20ms for competitive), jitter (under 5ms), and packet loss (0% ideally, never above 1%). A 50 Mbps connection with 80ms ping will always lose to a 10 Mbps connection with 10ms ping." },
  { q: "What is a good ping for gaming?", a: "Under 20ms is excellent for competitive FPS games (Valorant, CS2, CoD). Under 50ms is good for most online games. Under 100ms is acceptable for casual play. Over 100ms will cause noticeable lag in fast-paced games. Jitter and stability matter just as much as average ping." },
  { q: "Why does my internet lag when gaming even with fast speeds?", a: "Fast download speed does not prevent lag. The most common causes of gaming lag are: high ping (latency to the game server), jitter (inconsistent ping that causes rubber-banding), packet loss (causing teleporting/disconnects), and bufferbloat (ping spikes when other devices are downloading). All four are tested separately on this page." },
  { q: "What causes bufferbloat and how does it affect gaming?", a: "Bufferbloat occurs when your router fills its buffer (queue) during heavy traffic, adding 50–500ms of extra latency. If your ping jumps from 15ms to 200ms whenever someone starts a Netflix stream or download, you have bufferbloat. Fix it by enabling SQM (Smart Queue Management) on your router, or check our bufferbloat test for an A–F grade and fix guide." },
  { q: "Is WiFi or Ethernet better for gaming?", a: "Ethernet is always better for gaming. WiFi adds 10–50ms of base latency, introduces jitter, and is susceptible to interference. A wired 50 Mbps Ethernet connection will outperform a wireless 500 Mbps WiFi connection in every online game. If Ethernet isn't possible, use 5GHz WiFi and sit close to the router." },
  { q: "How much upload speed do I need for gaming?", a: "Standard online gaming requires only 1–3 Mbps of upload bandwidth. The upload sends your controller inputs (a very small data stream) to the game server. If you're also streaming on Twitch or YouTube while gaming, you'll need 5–20 Mbps of upload depending on your stream quality." },
  { q: "Which games need the lowest ping?", a: "Competitive FPS games like Valorant, CS2 and Call of Duty are the most latency-sensitive — aim for under 20ms. Battle royales (Fortnite, Warzone) and MOBAs (League of Legends, Dota 2) need under 50ms. Sports games (FIFA, NBA 2K) under 60ms. MMORPGs and strategy games are more forgiving at under 100ms." },
];

export default function GamingSpeedTest() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const toggleFaq = (i: number) =>
    setOpenFaqs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/gaming-speed-test" />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Gaming Speed Test", href: "/gaming-speed-test" },
          ]} />

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-purple-500/10">
                <Gamepad2 className="h-12 w-12 text-purple-400" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-purple-500/40 text-purple-400">Free · No Download · No Sign-up</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Internet Speed Test for Gaming
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              High Mbps doesn't stop lag. Ping, jitter, packet loss and bufferbloat do — and you need all four tested separately. Run our free gaming diagnostics suite below.
            </p>
            <p className="text-sm text-muted-foreground mb-8">Covers: Valorant, Fortnite, CoD, FIFA, League of Legends, PUBG and more</p>
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
              onClick={() => setShowSpeedTest(true)}
            >
              <Zap className="mr-2 h-5 w-5" />
              Run Speed Test Now
            </Button>
          </div>

          {/* Key insight callout */}
          <Card className="mb-10 border-blue-500/30 bg-blue-500/5">
            <CardContent className="p-5 flex gap-4 items-start">
              <CheckCircle className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">The truth about gaming lag: it's rarely about Mbps</p>
                <p className="text-sm text-muted-foreground">
                  Online gaming uses 3–15 Mbps at most. A <span className="text-foreground font-medium">10 Mbps connection with 10ms ping</span> will always outperform a <span className="text-foreground font-medium">500 Mbps connection with 80ms ping</span>. The four metrics that actually matter for gaming are ping, jitter, packet loss and bufferbloat — not download speed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4 Metrics */}
          <section className="mb-12" aria-labelledby="metrics-heading">
            <h2 id="metrics-heading" className="text-2xl font-bold mb-2">The 4 metrics that determine gaming performance</h2>
            <p className="text-muted-foreground mb-8">Test each one separately using the links below. Each tool runs in under 60 seconds in your browser — no installs.</p>
            <div className="space-y-6">
              {METRICS.map(m => (
                <Card key={m.label} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${m.bg}`}>
                        <m.icon className={`h-6 w-6 ${m.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{m.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{m.what}</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                      {m.tiers.map(t => (
                        <div key={t.label} className="p-3 rounded-lg bg-muted/30 border border-border/30">
                          <p className={`text-xs font-bold mb-1 ${t.color}`}>{t.label}</p>
                          <p className="text-xs font-semibold text-foreground">{t.verdict}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={m.toolHref}>{m.toolLabel} →</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Per-game table */}
          <section className="mb-12" aria-labelledby="games-heading">
            <h2 id="games-heading" className="text-2xl font-bold mb-2">Minimum requirements by game</h2>
            <p className="text-muted-foreground mb-6">These are the thresholds where you'll have a playable experience. For competitive play, target the "excellent" tier in each metric above.</p>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left p-3 font-semibold">Game</th>
                      <th className="text-left p-3 font-semibold">Download</th>
                      <th className="text-left p-3 font-semibold">Ping</th>
                      <th className="text-left p-3 font-semibold">Jitter</th>
                      <th className="text-left p-3 font-semibold hidden sm:table-cell">Packet Loss</th>
                      <th className="text-left p-3 font-semibold hidden md:table-cell">Key Metric</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GAMES.map((g, i) => (
                      <tr key={g.game} className={`border-b ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                        <td className="p-3 font-medium">{g.game}</td>
                        <td className="p-3 text-muted-foreground">{g.bandwidth}</td>
                        <td className="p-3">
                          <span className={`font-medium ${g.ping.includes("20") ? "text-green-400" : g.ping.includes("30") || g.ping.includes("50") ? "text-blue-400" : "text-yellow-400"}`}>{g.ping}</span>
                        </td>
                        <td className="p-3 text-muted-foreground">{g.jitter}</td>
                        <td className="p-3 text-muted-foreground hidden sm:table-cell">{g.loss}</td>
                        <td className="p-3 text-muted-foreground hidden md:table-cell">{g.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

          {/* Fix guide */}
          <section className="mb-12" aria-labelledby="fix-heading">
            <h2 id="fix-heading" className="text-2xl font-bold mb-6">How to fix gaming lag — ranked by impact</h2>
            <div className="space-y-3">
              {[
                { n: "1", title: "Switch to Ethernet", impact: "Highest", color: "text-green-400", body: "WiFi adds 10–50ms base latency plus unpredictable jitter. Plug directly into your router with an Ethernet cable. This single change is the most impactful upgrade most gamers can make." },
                { n: "2", title: "Fix bufferbloat with SQM", impact: "High", color: "text-blue-400", body: "Run our bufferbloat test. If you score C, D or F, enable SQM (Smart Queue Management) on your router. On ASUS/Merlin routers, enable CAKE under Adaptive QoS. On OpenWrt, install the sqm-scripts package. This prevents ping spikes when others are downloading." },
                { n: "3", title: "Connect to the nearest game server", impact: "High", color: "text-blue-400", body: "In your game settings, select the server region closest to your physical location. Adding 5,000 km of routing distance adds ~25ms of unavoidable ping. Region selection matters as much as your connection quality." },
                { n: "4", title: "Switch to 5GHz WiFi (if no Ethernet)", impact: "Medium", color: "text-yellow-400", body: "If you must use WiFi, 5GHz provides lower latency than 2.4GHz and is less congested. Sit closer to your router. Wi-Fi 6/6E provides the most stable wireless performance for gaming." },
                { n: "5", title: "Use Google or Cloudflare DNS", impact: "Medium", color: "text-yellow-400", body: "Slow DNS resolution adds delay to initial game server connections and lobby loading. Set your DNS to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google). Use our DNS speed test to find the fastest resolver from your location." },
                { n: "6", title: "Close background applications and downloads", impact: "Medium", color: "text-yellow-400", body: "Background downloads saturate your upload and download bandwidth, trigger bufferbloat, and compete for CPU resources. Close all background apps, pause cloud backups, and ask housemates to pause large downloads during gaming sessions." },
                { n: "7", title: "Check for packet loss", impact: "High if present", color: "text-orange-400", body: "Even 0.5% packet loss causes rubber-banding and disconnects. Run our packet loss test. If you see loss, restart your router, check for a damaged Ethernet cable, or contact your ISP to investigate line quality." },
              ].map(item => (
                <Card key={item.n} className="border-border/50">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">{item.n}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <Badge variant="outline" className={`text-xs ${item.color} border-current`}>Impact: {item.impact}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.body}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Ethernet vs WiFi comparison */}
          <Card className="mb-12 border-border/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Monitor className="h-6 w-6 text-primary" />
                Ethernet vs WiFi — gaming performance comparison
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-semibold text-green-400">Ethernet (Wired)</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Ping: 5–15ms typical</li>
                    <li>• Jitter: Under 1–2ms</li>
                    <li>• Packet loss: 0%</li>
                    <li>• Zero WiFi interference</li>
                    <li>• Consistent even when router is far</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold text-yellow-400">WiFi (Wireless)</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Ping: 20–80ms typical</li>
                    <li>• Jitter: 5–20ms variable</li>
                    <li>• Packet loss: 0.1–2% possible</li>
                    <li>• Prone to interference</li>
                    <li>• Degrades with distance / walls</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tools CTA */}
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Run all 4 gaming diagnostics</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "/ping-test",         label: "Ping Test",          desc: "Your latency to servers",       icon: Clock },
                  { href: "/jitter-test",        label: "Jitter Test",        desc: "Ping variation & stability",    icon: Activity },
                  { href: "/packet-loss-test",   label: "Packet Loss Test",   desc: "Dropped packets / teleporting", icon: XCircle },
                  { href: "/bufferbloat-test",   label: "Bufferbloat Test",   desc: "Ping under load — A–F grade",   icon: BarChart2 },
                  { href: "/dns-speed-test",     label: "DNS Speed Test",     desc: "Faster DNS = faster match load",icon: Globe },
                  { href: "/wifi-analyzer",      label: "WiFi Analyzer",      desc: "Diagnose wireless issues",      icon: Wifi },
                ].map(t => (
                  <Link key={t.href} href={t.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/40 transition-colors cursor-pointer">
                      <t.icon className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.label}</p>
                        <p className="text-xs text-muted-foreground">{t.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <section className="mb-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => (
                <Card key={idx} className="border-border/60">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center gap-3 hover:bg-muted/40 transition-colors rounded-lg"
                  >
                    <span className="font-semibold text-foreground text-sm">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaqs.includes(idx) ? "rotate-180" : ""}`} />
                  </button>
                  {openFaqs.includes(idx) && (
                    <CardContent className="pt-0 pb-4 px-5 text-muted-foreground text-sm leading-relaxed">{item.a}</CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <div className="flex flex-wrap gap-4 text-sm justify-center">
            {[
              { href: "/isp-throttling-test", label: "ISP throttling test" },
              { href: "/bufferbloat-test", label: "Bufferbloat test" },
              { href: "/internet-speed-requirements", label: "Speed requirements" },
              { href: "/why-is-my-internet-slow", label: "Why is my internet slow?" },
              { href: "/speed-test-faq", label: "Speed test FAQ" },
            ].map((l, i) => (
              <span key={l.href}>
                <Link href={l.href} className="text-primary hover:underline">{l.label}</Link>
                {i < 4 && <span className="text-muted-foreground ml-4">·</span>}
              </span>
            ))}
          </div>
        </div>
      </main>

      <GenericFooter />
      {showSpeedTest && <SpeedTestModal onClose={() => setShowSpeedTest(false)} />}
    </div>
  );
}
