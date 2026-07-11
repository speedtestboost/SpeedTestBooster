import { useEffect, useState } from "react";
import { setCanonicalHref, removeHomepageJsonLd } from "@/lib/seo";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Video, Zap, CheckCircle, AlertTriangle, XCircle,
  ChevronDown, Wifi, BarChart2, Activity, Clock, Globe,
  Users, Upload, TrendingDown, Laptop,
} from "lucide-react";

const PAGE_TITLE = "Internet Speed for Video Calls 2026 — Zoom, Teams, Google Meet & Work From Home";
const PAGE_DESC =
  "How much internet speed do you need for video calls? Complete Mbps guide for Zoom, Microsoft Teams, Google Meet, WebEx and Slack — upload speed requirements, ping & jitter thresholds, WFH household calculator, and fixes when calls freeze despite a fast speed test.";
const PAGE_URL = "https://speedtestboost.com/internet-speed-for-video-calls";

const PLATFORMS = [
  {
    name: "Zoom",
    color: "text-blue-400",
    audio: "0.06 Mbps",
    sd: "0.6 Mbps",
    hd720: "1.2 Mbps",
    hd1080: "3.8 Mbps up / 3.0 down",
    groupHd: "2.6 up / 1.8 down",
    group1080: "3.8 up / 3.0 down",
    screenShare: "+0.05–1 Mbps",
    note: "Gallery view (49 tiles): +4 Mbps download",
  },
  {
    name: "Microsoft Teams",
    color: "text-violet-400",
    audio: "0.05 Mbps",
    sd: "0.5 Mbps",
    hd720: "1.5 Mbps",
    hd1080: "4.0 Mbps",
    groupHd: "2.5 up / 4.0 down",
    group1080: "4.0 Mbps symmetric",
    screenShare: "+1.5 Mbps",
    note: "Gallery view (49 tiles): 4 Mbps both ways",
  },
  {
    name: "Google Meet",
    color: "text-green-400",
    audio: "0.1 Mbps",
    sd: "1.0 Mbps",
    hd720: "2.6 Mbps",
    hd1080: "3.2 Mbps",
    groupHd: "3.2 Mbps symmetric",
    group1080: "3.2+ Mbps",
    screenShare: "+3–5 Mbps down",
    note: "Adapts quality aggressively when bandwidth is limited",
  },
  {
    name: "Cisco Webex",
    color: "text-cyan-400",
    audio: "0.05 Mbps",
    sd: "0.5 Mbps",
    hd720: "1.5 Mbps",
    hd1080: "3.0 Mbps",
    groupHd: "2.5 Mbps",
    group1080: "3.0 Mbps",
    screenShare: "+1 Mbps",
    note: "HD video: 2.5 Mbps minimum both ways",
  },
  {
    name: "Slack Huddles",
    color: "text-yellow-400",
    audio: "0.06 Mbps",
    sd: "0.6 Mbps",
    hd720: "0.6 Mbps",
    hd1080: "1.5 Mbps",
    groupHd: "1.0 Mbps",
    group1080: "1.5 Mbps",
    screenShare: "+0.5 Mbps",
    note: "Lightweight — lowest bandwidth of major platforms",
  },
  {
    name: "FaceTime",
    color: "text-zinc-300",
    audio: "N/A",
    sd: "1 Mbps",
    hd720: "2 Mbps",
    hd1080: "5 Mbps",
    groupHd: "3 Mbps",
    group1080: "5 Mbps",
    screenShare: "N/A",
    note: "Group FaceTime: 3–5 Mbps per participant stream",
  },
];

const WFH_SCENARIOS = [
  { label: "Solo — audio only",           users: "1 × audio",           download: "1 Mbps",  upload: "1 Mbps",   verdict: "Any broadband",     color: "text-green-400" },
  { label: "Solo — HD video call",        users: "1 × 720p",            download: "5 Mbps",  upload: "5 Mbps",   verdict: "25 Mbps plan",      color: "text-green-400" },
  { label: "Solo — 1080p + screen share", users: "1 × 1080p + share",   download: "10 Mbps", upload: "10 Mbps",  verdict: "50 Mbps plan",      color: "text-blue-400" },
  { label: "Couple — both on HD calls",   users: "2 × HD",              download: "15 Mbps", upload: "15 Mbps",  verdict: "50–100 Mbps plan",  color: "text-blue-400" },
  { label: "Family — 2 calls + streaming",users: "2 × HD + 1 × Netflix",download: "30 Mbps", upload: "20 Mbps",  verdict: "100 Mbps plan",     color: "text-yellow-400" },
  { label: "WFH household — 3 on calls",  users: "3 × 1080p",           download: "25 Mbps", upload: "25 Mbps",  verdict: "100+ Mbps plan",    color: "text-yellow-400" },
  { label: "Presenter — 1080p + 4K share",users: "1 × 1080p + 4K demo", download: "50 Mbps", upload: "15 Mbps",  verdict: "Fiber preferred",   color: "text-orange-400" },
  { label: "All-day WFH + cloud backup",  users: "HD call + iCloud sync",download: "50 Mbps", upload: "25 Mbps", verdict: "Fiber 300+ Mbps",   color: "text-red-400" },
];

const FAQ_ITEMS = [
  {
    q: "How much internet speed do I need for Zoom?",
    a: "Zoom needs 1.2 Mbps both ways for a 720p HD one-on-one call and 3.8 Mbps upload / 3.0 Mbps download for 1080p. For reliable daily use with background traffic, aim for 10 Mbps upload and 25 Mbps download. Group HD calls need 2.6 Mbps upload and 1.8 Mbps download minimum; add 3–4 Mbps per additional simultaneous caller in your household.",
  },
  {
    q: "What internet speed do I need for Microsoft Teams?",
    a: "Teams recommends 1.5 Mbps both ways for a one-on-one HD call and 2.5 Mbps upload / 4.0 Mbps download for group meetings. For 1080p with screen sharing, plan for 10 Mbps upload. Teams is slightly more upload-hungry than Zoom for group calls — cable plans with 5–10 Mbps upload often struggle with multi-person Teams meetings.",
  },
  {
    q: "Is upload or download more important for video calls?",
    a: "Upload speed is more important for video calls. Your camera feed is continuously uploaded to the meeting server — if upload is saturated, others see you freeze or pixelate even when download speed is fast. A 100 Mbps download / 5 Mbps upload cable plan handles Netflix fine but fails for 1080p Zoom with screen sharing. Check your upload speed specifically, not just download.",
  },
  {
    q: "Why does Zoom freeze when my speed test shows fast speeds?",
    a: "Four common causes: (1) Low upload speed — speed tests highlight download but video calls need upload; (2) Bufferbloat — ping spikes when another device downloads or backs up to cloud; (3) WiFi interference — your laptop near the router tests fast but your desk across the house does not; (4) Background apps — iCloud, OneDrive, or Windows Update consuming upload during your call. Run our upload speed test, bufferbloat test, and ping test to isolate the cause.",
  },
  {
    q: "What ping and jitter are good for video calls?",
    a: "Ping (latency) under 50 ms is ideal for video calls; above 150 ms causes noticeable delay in conversation. Jitter under 15 ms is excellent; above 30 ms causes choppy audio and robotic voices. Packet loss must stay under 1%. Raw Mbps matters less than these three metrics — a 25 Mbps connection with 80 ms jitter feels worse than a 10 Mbps connection with 5 ms jitter.",
  },
  {
    q: "How much speed do I need for work from home with two people on calls?",
    a: "Two simultaneous 1080p video calls need roughly 8 Mbps upload and 6 Mbps download minimum, but plan for 20 Mbps upload and 25 Mbps download for headroom. If both people screen-share in HD simultaneously, target 30 Mbps upload. Fiber with symmetric speeds is strongly recommended for dual-WFH households; cable upload caps at 10–35 Mbps regardless of download tier.",
  },
  {
    q: "Is 25 Mbps download enough for video calls?",
    a: "Yes for download — 25 Mbps handles any single video call comfortably. The critical question is upload speed. Many 25 Mbps cable plans include only 3–5 Mbps upload, which is the bare minimum for one 720p call with no headroom. For reliable 1080p calls with other household activity, you need 10+ Mbps upload. Test your upload speed separately.",
  },
  {
    q: "Does Google Meet need more speed than Zoom?",
    a: "Google Meet requires slightly more bandwidth at HD quality (2.6 Mbps vs Zoom's 1.2 Mbps for 720p) but adapts down more aggressively when bandwidth is limited. At 1080p group calls both platforms need roughly 3–4 Mbps. Meet is less efficient at maximum quality but more forgiving on marginal connections. For constrained upload, Zoom at 720p uses less bandwidth than Meet at HD.",
  },
];

function useSEO() {
  useEffect(() => {
    removeHomepageJsonLd();
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

    let ld = document.querySelector('script[data-page="internet-speed-for-video-calls"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "internet-speed-for-video-calls");
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
          publisher: {
            "@type": "Organization",
            name: "Speed Test & Boost",
            logo: { "@type": "ImageObject", url: "https://speedtestboost.com/apple-touch-icon.png" },
          },
          datePublished: "2026-07-11",
          dateModified: "2026-07-11",
          mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
          articleSection: "Work From Home & Video Calls",
          keywords: [
            "internet speed for video calls", "internet speed for zoom", "zoom internet speed requirements",
            "microsoft teams internet speed", "google meet bandwidth requirements", "work from home internet speed",
            "upload speed for video calls", "how much speed for zoom",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${PAGE_URL}#faq`,
          mainEntity: FAQ_ITEMS.map(item => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    });
    return () => { ld?.remove(); };
  }, []);
}

export default function InternetSpeedForVideoCalls() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const toggleFaq = (i: number) =>
    setOpenFaqs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/internet-speed-for-video-calls" />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Internet Speed for Video Calls", href: "/internet-speed-for-video-calls" },
          ]} />

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-blue-500/10">
                <Video className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-blue-500/40 text-blue-400">Updated July 2026 · Work From Home Guide</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Internet Speed for Video Calls
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              How much speed you need for Zoom, Teams, Google Meet and remote work — with upload speed requirements, ping thresholds, and fixes when calls freeze despite a fast speed test.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Covers Zoom · Microsoft Teams · Google Meet · Webex · Slack · FaceTime
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90"
                onClick={() => setShowSpeedTest(true)}
              >
                <Zap className="mr-2 h-5 w-5" />
                Test My Upload &amp; Download Speed
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#requirements-table">See Platform Requirements ↓</a>
              </Button>
            </div>
          </div>

          {/* Quick answer */}
          <Card className="mb-10 border-blue-500/30 bg-blue-500/5">
            <CardContent className="p-5">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" /> Quick answer: speed for video calls
              </h2>
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { label: "Audio only", speed: "0.1 Mbps", note: "Any plan", color: "text-green-400" },
                  { label: "HD 720p call", speed: "5 Mbps up+down", note: "Per person", color: "text-blue-400" },
                  { label: "1080p + screen share", speed: "10 Mbps upload", note: "Recommended", color: "text-yellow-400" },
                  { label: "Dual WFH household", speed: "20 Mbps upload", note: "2 simultaneous calls", color: "text-orange-400" },
                ].map(q => (
                  <div key={q.label} className="p-3 rounded-lg bg-muted/30 border border-border/30 text-center">
                    <p className={`text-lg font-bold ${q.color}`}>{q.speed}</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{q.label}</p>
                    <p className="text-xs text-muted-foreground">{q.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                <Upload className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                Upload speed is the bottleneck for most video call problems — not download. Always test both.
              </p>
            </CardContent>
          </Card>

          {/* Why upload matters */}
          <section className="mb-12" aria-labelledby="upload-heading">
            <h2 id="upload-heading" className="text-2xl font-bold mb-2">Why upload speed matters more than download for video calls</h2>
            <p className="text-muted-foreground mb-6">
              Speed tests emphasize download Mbps. Video calls are different — your webcam continuously <strong>uploads</strong> your video feed. When upload is saturated, others see you freeze even if your download is 300 Mbps.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardContent className="p-5">
                  <Upload className="h-7 w-7 text-orange-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Cable internet trap</h3>
                  <p className="text-sm text-muted-foreground">A 500 Mbps cable plan often has only 20–35 Mbps upload. Two 1080p Zoom calls need ~8 Mbps upload — tight with any background activity.</p>
                </CardContent>
              </Card>
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-5">
                  <CheckCircle className="h-7 w-7 text-green-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Fiber advantage</h3>
                  <p className="text-sm text-muted-foreground">Fiber delivers symmetrical speeds — 300 Mbps down means 300 Mbps up. Ideal for WFH households with multiple simultaneous video calls and cloud backups.</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-5">
                  <AlertTriangle className="h-7 w-7 text-red-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Background upload killers</h3>
                  <p className="text-sm text-muted-foreground">iCloud Photos, OneDrive, Google Drive, and macOS Time Machine backups can consume your entire upload during a call. Pause cloud sync before important meetings.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Platform table */}
          <section id="requirements-table" className="mb-12" aria-labelledby="table-heading">
            <h2 id="table-heading" className="text-2xl font-bold mb-2">Video call speed requirements by platform</h2>
            <p className="text-muted-foreground mb-6">
              Official minimum Mbps per platform. For reliable daily use, multiply by 2–3× to account for protocol overhead, WiFi loss, and other household devices.
            </p>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left p-3 font-semibold">Platform</th>
                      <th className="text-left p-3 font-semibold">Audio</th>
                      <th className="text-left p-3 font-semibold">HD 720p</th>
                      <th className="text-left p-3 font-semibold">1080p</th>
                      <th className="text-left p-3 font-semibold hidden md:table-cell">Group HD</th>
                      <th className="text-left p-3 font-semibold hidden lg:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLATFORMS.map((p, i) => (
                      <tr key={p.name} className={`border-b ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                        <td className="p-3"><span className={`font-semibold ${p.color}`}>{p.name}</span></td>
                        <td className="p-3 text-muted-foreground">{p.audio}</td>
                        <td className="p-3 text-muted-foreground">{p.hd720}</td>
                        <td className="p-3 font-medium text-foreground">{p.hd1080}</td>
                        <td className="p-3 text-muted-foreground hidden md:table-cell">{p.groupHd}</td>
                        <td className="p-3 text-xs text-muted-foreground hidden lg:table-cell">{p.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-xs text-muted-foreground mt-2">
              Sources: Zoom Help Center bandwidth tables, Microsoft Learn network preparation guide, Google Meet hardware requirements, Cisco Webex bandwidth documentation, Slack network configuration.
            </p>
          </section>

          {/* Ping / jitter / packet loss */}
          <section className="mb-12" aria-labelledby="latency-heading">
            <h2 id="latency-heading" className="text-2xl font-bold mb-2">Ping, jitter &amp; packet loss for video calls</h2>
            <p className="text-muted-foreground mb-6">
              Mbps is only half the story. These three metrics determine whether your call feels smooth or frustrating — and speed tests rarely show them clearly.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10",
                  metric: "Ping (latency)",
                  good: "< 50 ms", ok: "50–100 ms", bad: "> 150 ms",
                  desc: "Round-trip time for your voice and video. High ping causes awkward pauses where you talk over each other.",
                },
                {
                  icon: Activity, color: "text-violet-400", bg: "bg-violet-400/10",
                  metric: "Jitter",
                  good: "< 15 ms", ok: "15–30 ms", bad: "> 30 ms",
                  desc: "Variation in ping over time. High jitter makes audio sound robotic and video stutter even when average ping looks fine.",
                },
                {
                  icon: BarChart2, color: "text-red-400", bg: "bg-red-400/10",
                  metric: "Packet loss",
                  good: "< 0.5%", ok: "0.5–1%", bad: "> 1%",
                  desc: "Dropped data packets. Even 1% loss causes visible video artifacts and missing words in audio.",
                },
              ].map(m => (
                <Card key={m.metric} className="border-border/50">
                  <CardContent className="p-5">
                    <div className={`p-2.5 rounded-lg ${m.bg} w-fit mb-3`}>
                      <m.icon className={`h-5 w-5 ${m.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{m.metric}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{m.desc}</p>
                    <div className="space-y-1 text-xs">
                      <p><span className="text-green-400 font-medium">Excellent:</span> {m.good}</p>
                      <p><span className="text-yellow-400 font-medium">Acceptable:</span> {m.ok}</p>
                      <p><span className="text-red-400 font-medium">Poor:</span> {m.bad}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <Button variant="outline" size="sm" asChild><Link href="/ping-test">Ping Test →</Link></Button>
              <Button variant="outline" size="sm" asChild><Link href="/jitter-test">Jitter Test →</Link></Button>
              <Button variant="outline" size="sm" asChild><Link href="/packet-loss-test">Packet Loss Test →</Link></Button>
            </div>
          </section>

          {/* WFH household calculator */}
          <section className="mb-12" aria-labelledby="wfh-heading">
            <h2 id="wfh-heading" className="text-2xl font-bold mb-2">How much speed does your WFH household need?</h2>
            <p className="text-muted-foreground mb-6">
              Add up all simultaneous video calls, then add 30% headroom. Upload is the number that matters most.
            </p>
            <div className="space-y-3">
              {WFH_SCENARIOS.map(s => (
                <Card key={s.label} className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-1 min-w-48">
                      <Laptop className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium text-foreground">{s.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground min-w-40">{s.users}</span>
                    <span className="text-sm text-muted-foreground min-w-28">↓ {s.download}</span>
                    <span className={`text-sm font-bold ${s.color} min-w-28`}>↑ {s.upload}</span>
                    <Badge variant="outline" className={`text-xs ${s.color} border-current`}>{s.verdict}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Why calls freeze */}
          <section className="mb-12" aria-labelledby="freeze-heading">
            <h2 id="freeze-heading" className="text-2xl font-bold mb-2">Why do video calls freeze when my speed test looks fine?</h2>
            <p className="text-muted-foreground mb-6">The #1 WFH complaint. Your headline speed is almost never the problem.</p>
            <div className="space-y-4">
              {[
                {
                  icon: Upload, color: "text-orange-400", bg: "bg-orange-400/10",
                  title: "Upload speed is too low (most common)",
                  desc: "Your speed test shows 200 Mbps download but only 5 Mbps upload. A 1080p Zoom call needs 3.8 Mbps upload — one iCloud backup during the call saturates it completely.",
                  fix: "Check upload speed specifically. Upgrade to fiber or a higher upload tier if under 10 Mbps.",
                  toolHref: "/upload-speed-guide", toolLabel: "Upload Speed Guide",
                },
                {
                  icon: BarChart2, color: "text-red-400", bg: "bg-red-400/10",
                  title: "Bufferbloat spikes your ping mid-call",
                  desc: "When another device downloads or uploads, your router's buffer fills and latency jumps 200–500 ms. You sound fine for 30 seconds then suddenly freeze.",
                  fix: "Run a bufferbloat test. Enable SQM/CAKE QoS on your router to prioritize video call traffic.",
                  toolHref: "/bufferbloat-test", toolLabel: "Bufferbloat Test",
                },
                {
                  icon: Wifi, color: "text-yellow-400", bg: "bg-yellow-400/10",
                  title: "WiFi signal weak at your desk",
                  desc: "Speed test on your phone next to the router shows 300 Mbps. Your laptop 15 metres away through walls gets 15 Mbps and high jitter.",
                  fix: "Use Ethernet for work laptop. Move to 5 GHz band. Run WiFi analyzer to find interference.",
                  toolHref: "/wifi-analyzer", toolLabel: "WiFi Analyzer",
                },
                {
                  icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10",
                  title: "High jitter from WiFi or ISP routing",
                  desc: "Average ping looks acceptable but jitter is 40–80 ms. Audio cuts in and out unpredictably. Common on WiFi in apartment buildings with 30+ competing networks.",
                  fix: "Switch to wired Ethernet. Test jitter specifically — not just ping.",
                  toolHref: "/jitter-test", toolLabel: "Jitter Test",
                },
                {
                  icon: Globe, color: "text-blue-400", bg: "bg-blue-400/10",
                  title: "VPN adds latency and reduces throughput",
                  desc: "Corporate VPN routes all traffic through a remote server, adding 30–100 ms latency and reducing effective bandwidth by 20–40%.",
                  fix: "Use split-tunnel VPN if your IT policy allows. Test speed with VPN on vs off.",
                  toolHref: "/", toolLabel: "Run Speed Test",
                },
              ].map(item => (
                <Card key={item.title} className="border-border/50">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className={`p-2.5 rounded-lg ${item.bg} shrink-0`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                          <span className="text-xs text-muted-foreground">Fix: {item.fix}</span>
                        </div>
                        <Button size="sm" variant="outline" className="h-7 text-xs px-3 shrink-0" asChild>
                          <Link href={item.toolHref}>{item.toolLabel} →</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Fix checklist */}
          <section className="mb-12" aria-labelledby="fixes-heading">
            <h2 id="fixes-heading" className="text-2xl font-bold mb-6">8 fixes for choppy video calls — ranked by impact</h2>
            <div className="space-y-3">
              {[
                { n: "1", t: "Plug in Ethernet on your work device", d: "Eliminates WiFi jitter and interference entirely. A £10 Ethernet cable is the single highest-impact WFH upgrade. WiFi adds 5–30 ms jitter that video calls cannot compensate for." },
                { n: "2", t: "Pause cloud backups before important calls", d: "iCloud, OneDrive, Google Drive, and Time Machine can consume 5–20 Mbps upload silently. Check system tray for active sync icons before joining a client call." },
                { n: "3", t: "Drop video quality to 720p in platform settings", d: "In Zoom: Settings → Video → uncheck HD. This cuts upload from 3.8 Mbps to 1.2 Mbps — often the difference between a stable and freezing call on cable upload." },
                { n: "4", t: "Enable QoS / SQM on your router", d: "Prioritizes video call traffic over bulk downloads. OpenWrt, pfSense, and many modern routers support CAKE or fq_codel. Run our bufferbloat test to see if you need this." },
                { n: "5", t: "Close bandwidth-heavy tabs and apps", d: "YouTube, Twitch, Steam downloads, and torrent clients running in the background consume upload and cause bufferbloat. Close them or use a separate network for entertainment devices." },
                { n: "6", t: "Test upload speed — not just download", d: "Run a speed test and look specifically at upload. If under 5 Mbps, you cannot reliably do 1080p video calls. Under 10 Mbps is marginal for dual-WFH households." },
                { n: "7", t: "Switch DNS to Cloudflare 1.1.1.1", d: "Slow DNS adds 100–300 ms delay before the call connection establishes. Cloudflare and Google DNS are typically faster than ISP-provided resolvers." },
                { n: "8", t: "Check Zoom/Teams in-call stats during a call", d: "In Zoom: click the network icon (top-left) during a call to see real-time latency, jitter, and packet loss. This confirms whether the issue is your network or the platform's servers." },
              ].map(tip => (
                <Card key={tip.n} className="border-border/50">
                  <CardContent className="p-4 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">{tip.n}</div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{tip.t}</h3>
                      <p className="text-sm text-muted-foreground">{tip.d}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sufficiency guide */}
          <section className="mb-12" aria-labelledby="enough-heading">
            <h2 id="enough-heading" className="text-2xl font-bold mb-6">Is my internet fast enough for video calls?</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-5">
                  <CheckCircle className="h-7 w-7 text-green-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Ready for WFH</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Upload ≥ 10 Mbps</li>
                    <li>• Ping &lt; 50 ms</li>
                    <li>• Jitter &lt; 15 ms</li>
                    <li>• Packet loss &lt; 0.5%</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="p-5">
                  <AlertTriangle className="h-7 w-7 text-yellow-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Marginal</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Upload 5–10 Mbps</li>
                    <li>• Ping 50–100 ms</li>
                    <li>• Works for 720p only</li>
                    <li>• Struggles with 2+ callers</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-5">
                  <XCircle className="h-7 w-7 text-red-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Not sufficient</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Upload &lt; 5 Mbps</li>
                    <li>• Ping &gt; 150 ms</li>
                    <li>• Jitter &gt; 30 ms</li>
                    <li>• Frequent freezes on 720p</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="mt-5 flex justify-center">
              <Button onClick={() => setShowSpeedTest(true)} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90">
                <Zap className="mr-2 h-4 w-4" /> Check My Speed Now
              </Button>
            </div>
          </section>

          {/* Tools CTA */}
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Diagnose your video call connection</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { href: "/",                    label: "Speed Test",         desc: "Download + upload Mbps",         icon: Zap },
                  { href: "/upload-speed-guide",  label: "Upload Speed Guide", desc: "Why upload matters for calls",  icon: Upload },
                  { href: "/ping-test",           label: "Ping Test",          desc: "Latency in milliseconds",        icon: Clock },
                  { href: "/jitter-test",         label: "Jitter Test",        desc: "Connection stability",           icon: Activity },
                  { href: "/bufferbloat-test",    label: "Bufferbloat Test",   desc: "A–F grade under load",           icon: BarChart2 },
                  { href: "/packet-loss-test",    label: "Packet Loss Test",   desc: "Dropped packets mid-call",       icon: TrendingDown },
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

          {/* Related */}
          <div className="flex flex-wrap gap-4 text-sm justify-center">
            {[
              { href: "/internet-speed-for-streaming",  label: "Internet speed for streaming" },
              { href: "/upload-speed-guide",            label: "Upload speed guide" },
              { href: "/internet-speed-requirements",   label: "Speed requirements guide" },
              { href: "/bufferbloat-test",              label: "Bufferbloat test" },
              { href: "/why-is-my-internet-slow",       label: "Why is my internet slow?" },
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
