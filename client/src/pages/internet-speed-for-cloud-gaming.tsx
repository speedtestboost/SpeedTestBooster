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
  Gamepad2, Zap, CheckCircle, AlertTriangle, ChevronDown,
  Wifi, BarChart2, Activity, Clock, Globe, Monitor,
} from "lucide-react";

const PAGE_TITLE = "Internet Speed for Cloud Gaming 2026 — GeForce NOW, Xbox Cloud, PS Portal & More";
const PAGE_DESC =
  "How much internet speed do you need for cloud gaming? Exact Mbps and latency requirements for NVIDIA GeForce NOW, Xbox Cloud Gaming, PlayStation Portal, Amazon Luna and Boosteroid — plus bufferbloat fixes when games lag despite fast speed tests.";
const PAGE_URL = "https://speedtestboost.com/internet-speed-for-cloud-gaming";

const PLATFORMS = [
  {
    name: "NVIDIA GeForce NOW",
    color: "text-green-400",
    r720: "15 Mbps",
    r1080: "25 Mbps",
    r1440: "35 Mbps",
    r4k: "45 Mbps",
    latency: "< 40 ms to server",
    upload: "Minimal",
    note: "RTX 4080 tier needs 35+ Mbps for 1440p 120fps. WiFi 5GHz or Ethernet required.",
  },
  {
    name: "Xbox Cloud Gaming",
    color: "text-green-500",
    r720: "10 Mbps",
    r1080: "20 Mbps",
    r1440: "N/A",
    r4k: "N/A",
    latency: "< 60 ms",
    upload: "Minimal",
    note: "Game Pass Ultimate required. Works on phone, tablet, browser, Xbox console.",
  },
  {
    name: "PlayStation Portal / Remote Play",
    color: "text-blue-400",
    r720: "5 Mbps",
    r1080: "15 Mbps",
    r1440: "N/A",
    r4k: "N/A",
    latency: "< 50 ms to PS5",
    upload: "5 Mbps",
    note: "Portal streams from local PS5 — home upload and low LAN latency matter most.",
  },
  {
    name: "Amazon Luna",
    color: "text-orange-400",
    r720: "10 Mbps",
    r1080: "35 Mbps",
    r1440: "N/A",
    r4k: "N/A",
    latency: "< 60 ms",
    upload: "Minimal",
    note: "1080p at 60fps needs consistent 35 Mbps — more demanding than Xbox Cloud at same resolution.",
  },
  {
    name: "Boosteroid",
    color: "text-violet-400",
    r720: "15 Mbps",
    r1080: "25 Mbps",
    r1440: "35 Mbps",
    r4k: "N/A",
    latency: "< 50 ms",
    upload: "Minimal",
    note: "European-focused service; server proximity strongly affects input lag.",
  },
];

const SCENARIOS = [
  { label: "Casual cloud gaming (720p)", download: "15 Mbps", latency: "< 60 ms", jitter: "< 30 ms", verdict: "Most broadband plans", color: "text-green-400" },
  { label: "1080p 60fps cloud gaming", download: "25–35 Mbps", latency: "< 40 ms", jitter: "< 15 ms", verdict: "100 Mbps plan + wired", color: "text-blue-400" },
  { label: "GeForce NOW RTX 1440p", download: "35–50 Mbps", latency: "< 30 ms", jitter: "< 10 ms", verdict: "Fiber or cable 300+ Mbps", color: "text-yellow-400" },
  { label: "Cloud gaming + household streaming", download: "75–100 Mbps", latency: "< 40 ms", jitter: "< 15 ms", verdict: "200 Mbps plan minimum", color: "text-orange-400" },
  { label: "Competitive cloud FPS", download: "35 Mbps", latency: "< 25 ms", jitter: "< 5 ms", verdict: "Fiber + Ethernet only", color: "text-red-400" },
];

const FAQ_ITEMS = [
  {
    q: "How much internet speed do I need for cloud gaming?",
    a: "For 720p cloud gaming, 15 Mbps download is enough. For 1080p at 60fps on GeForce NOW or Xbox Cloud Gaming, plan for 25–35 Mbps with under 40 ms latency to the nearest server. 1440p or RTX-quality streams need 35–50 Mbps. Upload speed matters little for most cloud gaming — latency, jitter, and bufferbloat matter far more than raw Mbps.",
  },
  {
    q: "What internet speed does GeForce NOW need?",
    a: "NVIDIA recommends 15 Mbps for 720p 60fps, 25 Mbps for 1080p 60fps, and 35 Mbps for 1440p 120fps on RTX servers. In practice, add 10 Mbps headroom if others are streaming or on video calls. GeForce NOW is the most bandwidth-hungry major cloud gaming platform at high quality settings.",
  },
  {
    q: "Why does cloud gaming lag when my speed test shows 100 Mbps?",
    a: "Cloud gaming fails when latency exceeds 60 ms, jitter exceeds 30 ms, or bufferbloat spikes ping during downloads — not when download speed is low. A 100 Mbps connection with +200 ms bufferbloat under load feels worse than 25 Mbps with stable 20 ms ping. Run our bufferbloat test and ping test to diagnose; use Ethernet instead of WiFi.",
  },
  {
    q: "Is WiFi good enough for cloud gaming?",
    a: "WiFi 5 GHz can work for 1080p cloud gaming if you are near the router and interference is low. WiFi 2.4 GHz and mesh hops often add 10–30 ms latency — enough to cause input lag. Ethernet is strongly recommended for GeForce NOW RTX tier and any competitive cloud gaming. Powerline adapters are a middle ground.",
  },
  {
    q: "What ping is good for Xbox Cloud Gaming?",
    a: "Under 60 ms to Microsoft's cloud servers is playable; under 40 ms feels responsive; under 25 ms is ideal for fast-paced games. Microsoft routes through Azure datacenters — server distance matters more than your ISP's advertised speed. Test ping during evening peak hours when your household network is busiest.",
  },
  {
    q: "Does cloud gaming use a lot of data?",
    a: "Yes — roughly 3–10 GB per hour at 1080p depending on the platform and bitrate. GeForce NOW at maximum quality can use 10+ GB/hour. A 1 TB data cap allows about 100 hours of 1080p cloud gaming per month. Check your ISP data cap before relying on cloud gaming as your primary platform.",
  },
  {
    q: "Is fiber better than cable for cloud gaming?",
    a: "Fiber is significantly better for cloud gaming because it offers lower baseline latency (often 5–15 ms vs 15–30 ms on cable), lower jitter, and symmetric upload for PlayStation Remote Play. Cable also suffers from neighborhood congestion during peak hours. If cloud gaming is your primary use case, fiber is worth the upgrade.",
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
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", PAGE_TITLE, "name");
    setMeta("twitter:description", PAGE_DESC, "name");
    setCanonicalHref(PAGE_URL);

    let ld = document.querySelector('script[data-page="internet-speed-for-cloud-gaming"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "internet-speed-for-cloud-gaming");
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
          publisher: { "@type": "Organization", name: "Speed Test & Boost" },
          datePublished: "2026-07-18",
          dateModified: "2026-07-18",
          mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
          articleSection: "Cloud Gaming & Internet Speed",
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
  }, []);
}

export default function InternetSpeedForCloudGaming() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/internet-speed-for-cloud-gaming" />
      <main className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Tools", href: "/" },
            { label: "Cloud Gaming Speed Guide", href: "/internet-speed-for-cloud-gaming" },
          ]} />

          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-green-500/10">
                <Gamepad2 className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 bg-clip-text text-transparent">
              Internet Speed for Cloud Gaming
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Cloud gaming needs <strong>25–50 Mbps</strong> at 1080p — but latency under 40 ms matters more than raw speed.
              Mbps tables for every major platform, plus why your GeForce NOW session lags despite a fast speed test.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={() => setShowSpeedTest(true)} className="bg-gradient-to-r from-green-600 to-emerald-600">
                <Zap className="mr-2 h-4 w-4" /> Test My Speed
              </Button>
              <Link href="/bufferbloat-test">
                <Button size="lg" variant="outline"><BarChart2 className="mr-2 h-4 w-4" /> Bufferbloat Test</Button>
              </Link>
            </div>
          </div>

          <Card className="mb-8 border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-5 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong className="text-foreground">Cloud gaming vs local gaming:</strong>{" "}
                Local online gaming needs only 3–15 Mbps but requires ping under 30 ms.
                Cloud gaming streams entire game video to your screen — it needs higher bandwidth <em>and</em> low latency.
                A connection perfect for Fortnite on PC may still fail GeForce NOW at 1080p.
              </div>
            </CardContent>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Mbps requirements by cloud gaming platform</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-left">
                    <th className="p-3 font-semibold">Platform</th>
                    <th className="p-3 font-semibold">720p</th>
                    <th className="p-3 font-semibold">1080p</th>
                    <th className="p-3 font-semibold">1440p</th>
                    <th className="p-3 font-semibold">Latency</th>
                    <th className="p-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {PLATFORMS.map(p => (
                    <tr key={p.name} className="border-b border-border/50 hover:bg-muted/20">
                      <td className={`p-3 font-medium ${p.color}`}>{p.name}</td>
                      <td className="p-3">{p.r720}</td>
                      <td className="p-3">{p.r1080}</td>
                      <td className="p-3">{p.r1440}</td>
                      <td className="p-3">{p.latency}</td>
                      <td className="p-3 text-muted-foreground text-xs max-w-xs">{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Cloud gaming scenarios &amp; plan recommendations</h2>
            <div className="grid gap-3">
              {SCENARIOS.map(s => (
                <Card key={s.label} className="border-border/60">
                  <CardContent className="p-4 flex flex-wrap items-center gap-4 justify-between">
                    <div>
                      <div className="font-semibold">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Download: {s.download} · Latency: {s.latency} · Jitter: {s.jitter}
                      </div>
                    </div>
                    <Badge variant="outline" className={s.color}>{s.verdict}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Latency, jitter &amp; bufferbloat — the real cloud gaming killers</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Clock, title: "Latency (ping)", body: "Under 40 ms to the cloud server is required. Every 20 ms above that adds noticeable input lag. Test during peak hours when your network is busiest." },
                { icon: Activity, title: "Jitter", body: "Variation in ping causes stuttering frames. Keep jitter under 15 ms for smooth cloud gaming. WiFi and bufferbloat are the main jitter sources." },
                { icon: BarChart2, title: "Bufferbloat", body: "When someone downloads or streams, bufferbloat can spike your ping from 20 ms to 200 ms — instant cloud gaming failure. Grade your router with our free bufferbloat test." },
              ].map(item => (
                <Card key={item.title}>
                  <CardContent className="p-5">
                    <item.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Card className="mb-10 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Diagnose your cloud gaming connection</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { href: "/gaming-speed-test", label: "Gaming Speed Test", desc: "Ping, jitter & packet loss", icon: Gamepad2 },
                  { href: "/bufferbloat-test", label: "Bufferbloat Test", desc: "A–F grade under load", icon: BarChart2 },
                  { href: "/ping-test", label: "Ping Test", desc: "Latency to global servers", icon: Clock },
                  { href: "/jitter-test", label: "Jitter Test", desc: "Ping stability", icon: Activity },
                  { href: "/how-much-internet-speed-do-i-need", label: "Speed Calculator", desc: "Household Mbps needs", icon: Monitor },
                  { href: "/why-is-my-internet-slow", label: "Why Is Internet Slow?", desc: "14 causes & fixes", icon: Wifi },
                ].map(t => (
                  <Link key={t.href} href={t.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/40 transition-colors">
                      <t.icon className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{t.label}</p>
                        <p className="text-xs text-muted-foreground">{t.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <section className="mb-10" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => (
                <Card key={idx} className="border-border/60">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center gap-3 hover:bg-muted/40 transition-colors rounded-lg"
                  >
                    <span className="font-semibold text-sm">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openFaqs.includes(idx) ? "rotate-180" : ""}`} />
                  </button>
                  {openFaqs.includes(idx) && (
                    <CardContent className="pt-0 pb-4 px-5 text-muted-foreground text-sm leading-relaxed">{item.a}</CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-4 text-sm justify-center">
            {[
              { href: "/how-much-internet-speed-do-i-need", label: "How much speed do I need?" },
              { href: "/internet-speed-for-streaming", label: "Streaming speed guide" },
              { href: "/gaming-speed-test", label: "Gaming speed test" },
              { href: "/bufferbloat-test", label: "Bufferbloat test" },
            ].map((l, i) => (
              <span key={l.href}>
                <Link href={l.href} className="text-primary hover:underline">{l.label}</Link>
                {i < 3 && <span className="text-muted-foreground ml-4">·</span>}
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
