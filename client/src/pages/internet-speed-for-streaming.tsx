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
  Play, Zap, CheckCircle, AlertTriangle, XCircle,
  ChevronDown, Wifi, BarChart2, Activity, Clock, Globe,
  Users, MonitorPlay, TrendingDown,
} from "lucide-react";

const PAGE_TITLE = "Internet Speed for Streaming 2026 — Netflix, YouTube, Disney+, Prime & More";
const PAGE_DESC =
  "How much internet speed do you need for streaming? Complete guide with exact Mbps requirements for Netflix 4K, YouTube 4K, Disney Plus, Amazon Prime Video, Hulu, Twitch, Apple TV+ and more — including a household calculator and buffering fix checklist.";
const PAGE_URL = "https://speedtestboost.com/internet-speed-for-streaming";

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

    let ld = document.querySelector('script[data-page="internet-speed-for-streaming"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "internet-speed-for-streaming");
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
          datePublished: "2026-06-21",
          dateModified: "2026-06-21",
          mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
          articleSection: "Streaming & Internet Speed",
          keywords: [
            "internet speed for streaming", "internet speed for Netflix", "good internet speed for streaming",
            "internet speed for 4K streaming", "Netflix speed requirements", "Disney Plus speed requirements",
            "YouTube 4K internet speed", "how much internet speed for streaming",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${PAGE_URL}#faq`,
          mainEntity: [
            {
              "@type": "Question",
              name: "How much internet speed do I need for streaming?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "For a single stream: 3 Mbps for SD, 5 Mbps for HD (1080p), and 25 Mbps for 4K Ultra HD. For a household with multiple simultaneous streams, multiply per stream: two 4K streams need 50 Mbps, four 4K streams need 100 Mbps. Add 20–30% headroom for other devices and background traffic.",
              },
            },
            {
              "@type": "Question",
              name: "What internet speed do I need for Netflix 4K?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Netflix recommends 15 Mbps as the minimum for 4K Ultra HD, but 25 Mbps delivers noticeably better quality at its higher 4K encoding tier. For HDR10+ and Dolby Vision content, 35 Mbps ensures maximum quality. Each additional simultaneous 4K Netflix stream requires another 25 Mbps.",
              },
            },
            {
              "@type": "Question",
              name: "Why does my streaming buffer even though my speed test shows fast speeds?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Buffering despite fast speed test results is caused by: (1) WiFi interference — your actual device-level throughput may be far lower than your plan speed; (2) Bufferbloat — ping spikes when other devices are active; (3) ISP throttling — your provider may throttle streaming CDN traffic specifically; (4) Peak-hour congestion (6–11 PM) where your ISP's shared infrastructure gets overloaded. Run our bufferbloat test and ISP throttling test to diagnose these.",
              },
            },
            {
              "@type": "Question",
              name: "What is a good internet speed for streaming and gaming at the same time?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Gaming requires very little bandwidth (3–15 Mbps) but is highly sensitive to latency and jitter. For streaming + gaming simultaneously, a 100 Mbps connection is comfortable for 4K streaming + gaming. The key is low bufferbloat — if your router has high bufferbloat, a downloading stream will spike your gaming ping. Enable SQM/CAKE on your router and run our bufferbloat test to check your grade.",
              },
            },
            {
              "@type": "Question",
              name: "Does Disney Plus need more internet speed than Netflix?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Disney Plus recommends 25 Mbps for 4K streaming, the same as Netflix. However, Disney+ streams Dolby Vision and IMAX Enhanced content at higher bitrates for some titles, so 35+ Mbps is recommended for the best HDR quality. Disney+ also requires a HEVC-capable device for 4K playback.",
              },
            },
            {
              "@type": "Question",
              name: "Is 100 Mbps enough for streaming?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — 100 Mbps supports four simultaneous 4K streams (4 × 25 Mbps) with headroom left over for gaming, video calls, and other devices. For a typical household of 3–4 people, 100 Mbps is excellent for streaming. If you experience buffering at 100 Mbps, the issue is WiFi, bufferbloat, or ISP throttling — not bandwidth.",
              },
            },
            {
              "@type": "Question",
              name: "How much internet speed does Twitch streaming require?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Watching Twitch requires 3–6 Mbps depending on stream quality. Broadcasting to Twitch requires upload speed: 3–6 Mbps for 720p60, 6–8 Mbps for 1080p60, and up to 8 Mbps for 1080p60 with high bitrate. Upload speed and low ping to the Twitch ingest server matter more than download speed when you're streaming.",
              },
            },
            {
              "@type": "Question",
              name: "Does streaming use upload or download speed?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Watching streaming content (Netflix, YouTube, Disney+) uses download speed only. Broadcasting (live streaming on Twitch or YouTube Live) uses upload speed. Your download speed determines how good the picture quality is when you watch; your upload speed determines the quality others see when you stream.",
              },
            },
          ],
        },
      ],
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STREAMING_SERVICES = [
  {
    name: "Netflix",
    color: "text-red-500",
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    sd: "3 Mbps",
    hd: "5 Mbps",
    fhd: "15 Mbps",
    uhd4k: "25 Mbps",
    note: "HDR10+/Dolby Vision: 35+ Mbps for max quality",
  },
  {
    name: "YouTube",
    color: "text-red-400",
    border: "border-red-400/30",
    bg: "bg-red-400/5",
    sd: "1.1 Mbps",
    hd: "2.5 Mbps",
    fhd: "5 Mbps",
    uhd4k: "20 Mbps",
    note: "Auto-adjust quality based on available bandwidth",
  },
  {
    name: "Disney+",
    color: "text-blue-400",
    border: "border-blue-400/30",
    bg: "bg-blue-400/5",
    sd: "2 Mbps",
    hd: "5 Mbps",
    fhd: "15 Mbps",
    uhd4k: "25 Mbps",
    note: "IMAX Enhanced / Dolby Vision titles: 35+ Mbps recommended",
  },
  {
    name: "Amazon Prime Video",
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    bg: "bg-cyan-400/5",
    sd: "1 Mbps",
    hd: "3.5 Mbps",
    fhd: "5 Mbps",
    uhd4k: "25 Mbps",
    note: "HDR10+ titles at 4K: 25 Mbps minimum, 35 recommended",
  },
  {
    name: "Hulu",
    color: "text-green-400",
    border: "border-green-400/30",
    bg: "bg-green-400/5",
    sd: "1.5 Mbps",
    hd: "3 Mbps",
    fhd: "6 Mbps",
    uhd4k: "16 Mbps",
    note: "Live TV (including sports): add 8 Mbps headroom",
  },
  {
    name: "Apple TV+",
    color: "text-zinc-300",
    border: "border-zinc-300/30",
    bg: "bg-zinc-300/5",
    sd: "2 Mbps",
    hd: "5 Mbps",
    fhd: "10 Mbps",
    uhd4k: "25 Mbps",
    note: "Dolby Vision & Atmos titles use higher bitrates; 35+ Mbps ideal",
  },
  {
    name: "HBO Max (Max)",
    color: "text-purple-400",
    border: "border-purple-400/30",
    bg: "bg-purple-400/5",
    sd: "1.5 Mbps",
    hd: "5 Mbps",
    fhd: "10 Mbps",
    uhd4k: "25 Mbps",
    note: "Available on Ultimate tier only; Dolby Vision on select titles",
  },
  {
    name: "Peacock",
    color: "text-yellow-400",
    border: "border-yellow-400/30",
    bg: "bg-yellow-400/5",
    sd: "1 Mbps",
    hd: "2 Mbps",
    fhd: "5 Mbps",
    uhd4k: "8 Mbps",
    note: "Limited 4K library; most content tops out at 1080p",
  },
  {
    name: "Twitch (watching)",
    color: "text-violet-400",
    border: "border-violet-400/30",
    bg: "bg-violet-400/5",
    sd: "1 Mbps",
    hd: "3 Mbps",
    fhd: "4.5 Mbps",
    uhd4k: "N/A",
    note: "Broadcasting (upload): 6–8 Mbps up for 1080p60 stream",
  },
];

const HOUSEHOLD_SCENARIOS = [
  { label: "Solo viewer — SD",           streams: "1 × SD",      speed: "5 Mbps",   verdict: "Any broadband plan", color: "text-green-400" },
  { label: "Solo viewer — HD",           streams: "1 × 1080p",   speed: "10 Mbps",  verdict: "Basic broadband",    color: "text-green-400" },
  { label: "Solo viewer — 4K",           streams: "1 × 4K",      speed: "30 Mbps",  verdict: "50 Mbps plan+",      color: "text-blue-400" },
  { label: "Couple — HD + gaming",       streams: "1 × HD + gaming", speed: "25 Mbps", verdict: "50 Mbps plan",   color: "text-blue-400" },
  { label: "Couple — 4K + 4K",          streams: "2 × 4K",      speed: "60 Mbps",  verdict: "100 Mbps plan",      color: "text-yellow-400" },
  { label: "Family — 3 devices, mix",    streams: "1 × 4K + 2 × HD", speed: "45 Mbps", verdict: "100 Mbps plan", color: "text-yellow-400" },
  { label: "Family — all 4K",           streams: "4 × 4K",      speed: "110 Mbps", verdict: "200+ Mbps plan",     color: "text-orange-400" },
  { label: "Heavy household — 4K + WFH", streams: "2 × 4K + 2 video calls", speed: "130 Mbps", verdict: "300+ Mbps plan", color: "text-red-400" },
];

const FAQ_ITEMS = [
  { q: "How much internet speed do I need for streaming?", a: "For a single stream: 3 Mbps for SD, 5 Mbps for HD (1080p), and 25 Mbps for 4K Ultra HD. For a household with multiple simultaneous streams, multiply per stream: two 4K streams need 50 Mbps, four 4K streams need 100 Mbps. Add 20–30% headroom for other devices and background traffic." },
  { q: "What internet speed do I need for Netflix 4K?", a: "Netflix recommends 15 Mbps as the minimum for 4K Ultra HD, but 25 Mbps delivers noticeably better quality at its higher 4K encoding tier. For HDR10+ and Dolby Vision content, 35 Mbps ensures maximum quality. Each additional simultaneous 4K Netflix stream requires another 25 Mbps." },
  { q: "Why does my streaming buffer even though my speed test shows fast speeds?", a: "Buffering despite fast speed test results is caused by: (1) WiFi interference — your actual device-level throughput may be far lower than your plan speed; (2) Bufferbloat — ping spikes when other devices are active; (3) ISP throttling — your provider may throttle streaming CDN traffic specifically; (4) Peak-hour congestion (6–11 PM) where your ISP's shared infrastructure gets overloaded. Run our bufferbloat test and ISP throttling test to diagnose these." },
  { q: "What is a good internet speed for streaming and gaming at the same time?", a: "Gaming requires very little bandwidth (3–15 Mbps) but is highly sensitive to latency and jitter. For streaming + gaming simultaneously, a 100 Mbps connection is comfortable for 4K streaming + gaming. The key is low bufferbloat — if your router has high bufferbloat, a downloading stream will spike your gaming ping. Enable SQM/CAKE on your router and run our bufferbloat test to check your grade." },
  { q: "Does Disney Plus need more internet speed than Netflix?", a: "Disney Plus recommends 25 Mbps for 4K streaming, the same as Netflix. However, Disney+ streams Dolby Vision and IMAX Enhanced content at higher bitrates for some titles, so 35+ Mbps is recommended for the best HDR quality. Disney+ also requires a HEVC-capable device for 4K playback." },
  { q: "Is 100 Mbps enough for streaming?", a: "Yes — 100 Mbps supports four simultaneous 4K streams (4 × 25 Mbps) with headroom left over for gaming, video calls, and other devices. For a typical household of 3–4 people, 100 Mbps is excellent for streaming. If you experience buffering at 100 Mbps, the issue is WiFi, bufferbloat, or ISP throttling — not bandwidth." },
  { q: "How much internet speed does Twitch streaming require?", a: "Watching Twitch requires 3–6 Mbps depending on stream quality. Broadcasting to Twitch requires upload speed: 3–6 Mbps for 720p60, 6–8 Mbps for 1080p60, and up to 8 Mbps for 1080p60 with high bitrate. Upload speed and low ping to the Twitch ingest server matter more than download speed when you're streaming." },
  { q: "Does streaming use upload or download speed?", a: "Watching streaming content (Netflix, YouTube, Disney+) uses download speed only. Broadcasting (live streaming on Twitch or YouTube Live) uses upload speed. Your download speed determines how good the picture quality is when you watch; your upload speed determines the quality others see when you stream." },
];

export default function InternetSpeedForStreaming() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const toggleFaq = (i: number) =>
    setOpenFaqs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/internet-speed-for-streaming" />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Internet Speed for Streaming", href: "/internet-speed-for-streaming" },
          ]} />

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-red-500/10">
                <MonitorPlay className="h-12 w-12 text-red-400" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-red-500/40 text-red-400">Updated June 2026 · All Major Streaming Services</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Internet Speed for Streaming
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
              How much speed you actually need for Netflix, YouTube, Disney+, Prime Video, Hulu and more — plus a household calculator and a proven buffering fix checklist.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Covers Netflix · YouTube · Disney+ · Amazon Prime · Hulu · Apple TV+ · Max · Peacock · Twitch
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90"
                onClick={() => setShowSpeedTest(true)}
              >
                <Zap className="mr-2 h-5 w-5" />
                Test My Streaming Speed
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#requirements-table">See Speed Requirements ↓</a>
              </Button>
            </div>
          </div>

          {/* Quick answer card */}
          <Card className="mb-10 border-blue-500/30 bg-blue-500/5">
            <CardContent className="p-5">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" /> Quick answer: how much speed do you need?
              </h2>
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { label: "SD (480p)", speed: "3 Mbps", note: "Any plan", color: "text-green-400" },
                  { label: "HD (1080p)", speed: "5–15 Mbps", note: "Most plans", color: "text-blue-400" },
                  { label: "4K Ultra HD", speed: "25 Mbps", note: "Per stream", color: "text-yellow-400" },
                  { label: "4K HDR/Dolby Vision", speed: "35+ Mbps", note: "For max quality", color: "text-orange-400" },
                ].map(q => (
                  <div key={q.label} className="p-3 rounded-lg bg-muted/30 border border-border/30 text-center">
                    <p className={`text-xl font-bold ${q.color}`}>{q.speed}</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{q.label}</p>
                    <p className="text-xs text-muted-foreground">{q.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Per stream. Multiply by number of simultaneous viewers. Add 20% headroom for other devices.</p>
            </CardContent>
          </Card>

          {/* Per-service table */}
          <section id="requirements-table" className="mb-12" aria-labelledby="table-heading">
            <h2 id="table-heading" className="text-2xl font-bold mb-2">Speed requirements by streaming service</h2>
            <p className="text-muted-foreground mb-6">All figures are per-stream, per-device minimum for stable playback. For buffer-free quality headroom, use the "Practical" column — 20–30% above the official minimum.</p>
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left p-3 font-semibold">Service</th>
                      <th className="text-left p-3 font-semibold">SD</th>
                      <th className="text-left p-3 font-semibold">HD 1080p</th>
                      <th className="text-left p-3 font-semibold">4K UHD</th>
                      <th className="text-left p-3 font-semibold hidden md:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STREAMING_SERVICES.map((svc, i) => (
                      <tr key={svc.name} className={`border-b ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                        <td className="p-3">
                          <span className={`font-semibold ${svc.color}`}>{svc.name}</span>
                        </td>
                        <td className="p-3 text-muted-foreground">{svc.sd}</td>
                        <td className="p-3 text-muted-foreground">{svc.fhd}</td>
                        <td className="p-3">
                          <span className="font-medium text-foreground">{svc.uhd4k}</span>
                        </td>
                        <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{svc.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-xs text-muted-foreground mt-2">Sources: Netflix Help Center, YouTube Support, Disney+ Help, Amazon Device & Streaming Help, Apple TV+ system requirements, official platform documentation.</p>
          </section>

          {/* Household calculator */}
          <section className="mb-12" aria-labelledby="household-heading">
            <h2 id="household-heading" className="text-2xl font-bold mb-2">How much speed does your household need?</h2>
            <p className="text-muted-foreground mb-6">The speed you need equals the sum of all simultaneous streams. Use these scenarios as a guide, then run a speed test to see what you actually have.</p>
            <div className="space-y-3">
              {HOUSEHOLD_SCENARIOS.map(s => (
                <Card key={s.label} className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-1 min-w-48">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium text-foreground">{s.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground min-w-40">{s.streams}</span>
                    <span className={`text-lg font-bold ${s.color} min-w-24`}>{s.speed}</span>
                    <Badge variant="outline" className={`text-xs ${s.color} border-current`}>{s.verdict}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <Button onClick={() => setShowSpeedTest(true)} className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90">
                <Zap className="mr-2 h-4 w-4" /> Check My Actual Speed
              </Button>
            </div>
          </section>

          {/* Why buffering happens */}
          <section className="mb-12" aria-labelledby="buffering-heading">
            <h2 id="buffering-heading" className="text-2xl font-bold mb-2">Why does streaming buffer even when my speed test looks fine?</h2>
            <p className="text-muted-foreground mb-6">This is the most common streaming complaint. Your headline speed is almost never the problem. Here are the real causes — and how to test each one.</p>
            <div className="space-y-4">
              {[
                {
                  icon: Wifi, color: "text-yellow-400", bg: "bg-yellow-400/10",
                  title: "WiFi interference (most common cause)",
                  desc: "Your router reports 300 Mbps, but your smart TV 10 metres away through two walls is getting 20 Mbps. WiFi signal degrades dramatically with distance and obstacles. Your speed test ran on a phone near the router — not on your TV.",
                  fix: "Use Ethernet on your TV or streaming stick. Run a speed test on the actual device that buffers.",
                  toolHref: "/wifi-analyzer", toolLabel: "WiFi Analyzer",
                },
                {
                  icon: BarChart2, color: "text-orange-400", bg: "bg-orange-400/10",
                  title: "Bufferbloat — latency spikes under load",
                  desc: "When your router's buffer fills up, latency spikes by 200–500ms. Streaming services use TCP and ramp up quality based on perceived throughput — bufferbloat makes them think you're on a slow connection.",
                  fix: "Run a bufferbloat test and check your A–F grade. Enable SQM/CAKE on your router to fix it.",
                  toolHref: "/bufferbloat-test", toolLabel: "Bufferbloat Test",
                },
                {
                  icon: TrendingDown, color: "text-red-400", bg: "bg-red-400/10",
                  title: "ISP throttling of streaming CDN traffic",
                  desc: "ISPs sometimes throttle traffic to specific CDNs (Netflix's CDN, YouTube's CDN) while general speed tests pass fine. If Fast.com shows 20 Mbps and our speed test shows 200 Mbps, your ISP is throttling Netflix specifically.",
                  fix: "Compare speed test results with Fast.com. Enable a VPN and re-test — if streaming improves, throttling is confirmed.",
                  toolHref: "/isp-throttling-test", toolLabel: "ISP Throttling Guide",
                },
                {
                  icon: Clock, color: "text-purple-400", bg: "bg-purple-400/10",
                  title: "Peak-hour congestion (6–11 PM)",
                  desc: "Cable internet is a shared medium. When your neighbourhood all stream in the evening, the shared cable node gets congested. Run speed tests at 8 AM and 8 PM — a 30%+ drop in the evening indicates congestion, not a problem you can fix locally.",
                  fix: "Run speed tests at different times of day and compare. Contact your ISP with documented evidence.",
                  toolHref: "/", toolLabel: "Run Speed Test Now",
                },
                {
                  icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10",
                  title: "Slow DNS resolution (delays starting playback)",
                  desc: "Streaming services use CDNs that require DNS lookups. If your ISP's DNS is slow (50–300ms per lookup), there's a noticeable delay before each stream starts loading.",
                  fix: "Switch your DNS to Cloudflare (1.1.1.1) or Google (8.8.8.8). Test resolver speeds to find the fastest for your location.",
                  toolHref: "/dns-speed-test", toolLabel: "DNS Speed Test",
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

          {/* Speed sufficiency guide */}
          <section className="mb-12" aria-labelledby="is-my-speed-enough">
            <h2 id="is-my-speed-enough" className="text-2xl font-bold mb-6">Is my internet speed fast enough for streaming?</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-5">
                  <CheckCircle className="h-7 w-7 text-green-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">More than enough</h3>
                  <p className="text-sm text-muted-foreground mb-2">Your speed test result:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 100 Mbps+ for a single viewer</li>
                    <li>• 200 Mbps+ for a full household</li>
                    <li>• Upload ≥ 10 Mbps (live streaming)</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">If you still buffer, the cause is WiFi, bufferbloat, or throttling — not speed.</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="p-5">
                  <AlertTriangle className="h-7 w-7 text-yellow-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Marginal</h3>
                  <p className="text-sm text-muted-foreground mb-2">Your speed test result:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 25–100 Mbps for a household</li>
                    <li>• Tight headroom for simultaneous 4K</li>
                    <li>• May struggle during peak hours</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">Consider reducing 4K streams or upgrading your plan.</p>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-5">
                  <XCircle className="h-7 w-7 text-red-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Too slow</h3>
                  <p className="text-sm text-muted-foreground mb-2">Your speed test result:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Under 25 Mbps for 4K</li>
                    <li>• Under 5 Mbps for HD</li>
                    <li>• Consistent evening slowdowns</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-3">Upgrade your plan or diagnose with the tools below.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Streaming tips */}
          <section className="mb-12" aria-labelledby="tips-heading">
            <h2 id="tips-heading" className="text-2xl font-bold mb-6">9 ways to stop streaming buffering right now</h2>
            <div className="space-y-3">
              {[
                { n: "1", t: "Connect your TV to Ethernet", d: "A wired connection eliminates WiFi interference entirely. Most smart TVs and streaming sticks have an Ethernet port or support a USB-to-Ethernet adapter. This alone fixes 60% of buffering complaints." },
                { n: "2", t: "Move to 5GHz or 6GHz WiFi", d: "If Ethernet isn't possible, switch your streaming device to the 5GHz or 6GHz band. These bands are faster and far less congested than 2.4GHz — especially in apartment buildings with many competing networks." },
                { n: "3", t: "Restart your router (and keep it updated)", d: "A router restart clears the ARP table and can significantly improve throughput. Also check your router firmware — outdated firmware causes bufferbloat on many mid-range routers." },
                { n: "4", t: "Run a speed test on the streaming device itself", d: "Your bottleneck may be the device, not your plan. Use a speed test app on the actual TV or streaming stick. If this shows low speeds but your phone shows high speeds, the device or its WiFi adapter is the problem." },
                { n: "5", t: "Check for bufferbloat — it mimics slow internet", d: "Bufferbloat causes streaming quality to drop dramatically when other devices are active. Run a bufferbloat test to get an A–F grade. A D or F means your router needs SQM/QoS enabled." },
                { n: "6", t: "Set your streaming service to a fixed quality", d: "Automatic quality adjustment can cause jarring resolution drops. In Netflix settings, lock the video quality to 'High'. This prevents constant quality fluctuation when bandwidth varies slightly." },
                { n: "7", t: "Change your DNS to Cloudflare (1.1.1.1)", d: "Slow DNS resolution causes noticeable delays before playback starts and can affect CDN routing. Cloudflare 1.1.1.1 is typically 40–150ms faster than ISP-provided DNS." },
                { n: "8", t: "Check for ISP throttling of specific CDNs", d: "Compare your speed on our test vs Fast.com. If Fast.com is dramatically slower, your ISP is throttling Netflix's CDN. A VPN bypasses traffic-type throttling." },
                { n: "9", t: "Limit concurrent devices during streaming", d: "Other devices performing background updates, cloud backups (iCloud, OneDrive), or large downloads all compete for bandwidth. Pause these during streaming sessions." },
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

          {/* Tools CTA */}
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Diagnose your streaming connection</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { href: "/",                    label: "Speed Test",            desc: "Baseline Mbps",                        icon: Zap },
                  { href: "/bufferbloat-test",    label: "Bufferbloat Test",      desc: "A–F grade under load",                 icon: BarChart2 },
                  { href: "/isp-throttling-test", label: "ISP Throttling Test",   desc: "Is your ISP slowing streaming?",       icon: TrendingDown },
                  { href: "/dns-speed-test",      label: "DNS Speed Test",        desc: "Fastest resolver for your network",    icon: Globe },
                  { href: "/wifi-analyzer",       label: "WiFi Analyzer",         desc: "Signal & channel diagnostics",         icon: Wifi },
                  { href: "/packet-loss-test",    label: "Packet Loss Test",      desc: "Dropped packets causing buffering",    icon: Activity },
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

          {/* Related guides */}
          <div className="flex flex-wrap gap-4 text-sm justify-center">
            {[
              { href: "/internet-speed-requirements",  label: "Internet speed requirements guide" },
              { href: "/isp-throttling-test",           label: "ISP throttling test" },
              { href: "/gaming-speed-test",             label: "Gaming speed test" },
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
