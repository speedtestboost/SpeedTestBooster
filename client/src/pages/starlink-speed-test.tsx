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
  Satellite, Zap, AlertTriangle, ChevronDown, Wifi,
  BarChart2, Activity, Clock, Gamepad2, Video, CheckCircle,
} from "lucide-react";

const PAGE_TITLE = "Starlink Speed Test 2026 — Test Starlink Internet Speed & What to Expect";
const PAGE_DESC =
  "Free Starlink speed test with 2026 benchmarks. See expected Starlink download, upload and ping by plan (Residential, Roam, Priority), how to test correctly over Ethernet vs WiFi, and whether Starlink is fast enough for streaming, gaming and video calls.";
const PAGE_URL = "https://speedtestboost.com/starlink-speed-test";

const PLAN_SPEEDS = [
  { plan: "Residential", download: "100–250 Mbps", upload: "10–40 Mbps", ping: "25–60 ms", note: "Median ~130–180 Mbps in the US; varies by cell congestion" },
  { plan: "Residential Lite", download: "25–100 Mbps", upload: "3–10 Mbps", ping: "25–50 ms", note: "Deprioritized behind standard Residential during peak hours" },
  { plan: "Roam (Portable)", download: "60–150 Mbps", upload: "5–20 Mbps", ping: "40–90 ms", note: "Lower priority; crowded tourist areas can drop below 50 Mbps" },
  { plan: "Priority (Business)", download: "250–400+ Mbps", upload: "30–45 Mbps", ping: "20–30 ms", note: "Highest network priority; best consistency at peak" },
  { plan: "Starlink Mini", download: "50–100 Mbps", upload: "3–10 Mbps", ping: "25–50 ms", note: "Compact portable dish; adequate for browsing and HD streaming" },
];

const USE_CASES = [
  { icon: Video, label: "4K Streaming", verdict: "Yes", detail: "25 Mbps per stream needed — Starlink Residential comfortably handles 2–4 simultaneous 4K streams.", color: "text-green-400" },
  { icon: Video, label: "Zoom / Teams calls", verdict: "Yes, usually", detail: "Needs 4 Mbps up and stable ping. Works well in healthy cells; brief satellite-handoff blips can freeze frames occasionally.", color: "text-green-400" },
  { icon: Gamepad2, label: "Online gaming", verdict: "Casual yes, competitive no", detail: "25–60 ms ping is fine for most games. Competitive FPS players will notice jitter from satellite handoffs every ~15 seconds.", color: "text-yellow-400" },
  { icon: Gamepad2, label: "Cloud gaming", verdict: "Marginal", detail: "GeForce NOW needs <40 ms stable latency. Starlink jitter causes intermittent input lag — playable but not ideal.", color: "text-orange-400" },
];

const FAQ_ITEMS = [
  {
    q: "How fast is Starlink in 2026?",
    a: "Starlink Residential in 2026 typically delivers 100–250 Mbps download, 10–40 Mbps upload, and 25–60 ms ping in the US, with a median around 130–180 Mbps. Every US state except Alaska now sees median downloads above 100 Mbps. Speeds vary significantly by cell congestion: a congested cell may sit near 110 Mbps while a lightly loaded one reaches 240+ Mbps.",
  },
  {
    q: "How do I run an accurate Starlink speed test?",
    a: "Connect via Ethernet directly to the Starlink router (use the Ethernet adapter for Gen 2/3) to remove WiFi as a variable. Run tests at least three times at different hours — including 7–11 PM peak — and compare medians, not single results. The stock router's WiFi can cut real throughput in half, so a slow WiFi test doesn't mean Starlink itself is slow.",
  },
  {
    q: "Why is my Starlink slower than advertised?",
    a: "Starlink's advertised speeds are ceilings, not guarantees. Common causes of slow results: cell congestion during peak evening hours (25–35% drop is normal), obstructions blocking the dish's sky view, testing over 2.4 GHz WiFi, snow or heat affecting the dish, or being on a deprioritized plan (Lite, Roam). Check the obstruction map in the Starlink app first, then re-test over Ethernet off-peak.",
  },
  {
    q: "Is Starlink fast enough for streaming Netflix in 4K?",
    a: "Yes. A single 4K stream needs 25 Mbps and Starlink Residential typically delivers 100+ Mbps even at peak. Households running three simultaneous 4K streams plus browsing stay well within typical Starlink throughput. Buffering on Starlink is usually caused by WiFi placement or momentary satellite handoffs, not raw bandwidth.",
  },
  {
    q: "Is Starlink good for gaming?",
    a: "For casual and most multiplayer gaming, yes — 25–60 ms ping is comparable to mid-range cable. For competitive FPS or fighting games, the ~15-second satellite handoffs introduce jitter spikes that fiber and cable don't have. Run our jitter test and bufferbloat test during a game session to see your real stability.",
  },
  {
    q: "What ping does Starlink have compared to fiber and cable?",
    a: "Starlink averages 25–60 ms ping versus 5–15 ms for fiber and 15–30 ms for cable. That is dramatically better than legacy satellite internet (600+ ms) because Starlink satellites orbit at ~550 km instead of 35,000 km. For browsing, streaming and video calls the difference from cable is barely noticeable; for competitive gaming fiber remains clearly better.",
  },
  {
    q: "Does weather affect Starlink speed test results?",
    a: "Heavy rain and snow can reduce speeds 30–50% or cause brief dropouts, as Ku-band signals attenuate in moisture. Light rain and cloud cover have minimal impact. The dish melts snow automatically but heavy accumulation around it can still obstruct the signal. If speeds drop during storms, re-test in clear weather before troubleshooting hardware.",
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

    let ld = document.querySelector('script[data-page="starlink-speed-test"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "starlink-speed-test");
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
          datePublished: "2026-08-01",
          dateModified: "2026-08-01",
          mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
          articleSection: "Satellite Internet",
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

export default function StarlinkSpeedTest() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/starlink-speed-test" />
      <main className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Tools", href: "/" },
            { label: "Starlink Speed Test", href: "/starlink-speed-test" },
          ]} />

          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-sky-500/10">
                <Satellite className="h-12 w-12 text-sky-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-clip-text text-transparent">
              Starlink Speed Test
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Test your Starlink internet speed in your browser and compare against 2026 benchmarks.
              Residential plans typically deliver <strong>100–250 Mbps down</strong> and <strong>25–60 ms ping</strong> —
              here's how to test correctly and what your numbers should look like.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={() => setShowSpeedTest(true)} className="bg-gradient-to-r from-sky-600 to-blue-600">
                <Zap className="mr-2 h-4 w-4" /> Start Starlink Speed Test
              </Button>
              <Link href="/jitter-test">
                <Button size="lg" variant="outline"><Activity className="mr-2 h-4 w-4" /> Test Jitter</Button>
              </Link>
            </div>
          </div>

          <Card className="mb-8 border-sky-500/30 bg-sky-500/5">
            <CardContent className="p-5 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong className="text-foreground">Test over Ethernet first.</strong>{" "}
                The stock Starlink router's WiFi often cuts real throughput in half. Plug in via the Ethernet
                adapter to measure what Starlink itself delivers — if wired speed is fast but WiFi is slow,
                the problem is WiFi placement, not Starlink. See our{" "}
                <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi analyzer</Link>.
              </div>
            </CardContent>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Expected Starlink speeds by plan (2026)</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-left">
                    <th className="p-3 font-semibold">Plan</th>
                    <th className="p-3 font-semibold">Download</th>
                    <th className="p-3 font-semibold">Upload</th>
                    <th className="p-3 font-semibold">Ping</th>
                    <th className="p-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {PLAN_SPEEDS.map(p => (
                    <tr key={p.plan} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="p-3 font-medium text-sky-400">{p.plan}</td>
                      <td className="p-3">{p.download}</td>
                      <td className="p-3">{p.upload}</td>
                      <td className="p-3">{p.ping}</td>
                      <td className="p-3 text-muted-foreground text-xs max-w-xs">{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Ranges reflect 2026 US field data. Peak evening hours (7–11 PM) typically run 25–35% below off-peak.
              Consistently under 50 Mbps on Residential off-peak with clear sky view indicates a problem worth troubleshooting.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How to test your Starlink speed correctly</h2>
            <div className="grid gap-3">
              {[
                { step: "1", title: "Wire in via Ethernet", body: "Use the Starlink Ethernet adapter and connect your laptop directly. This isolates Starlink's performance from your WiFi environment." },
                { step: "2", title: "Check for obstructions first", body: "Open the Starlink app's obstruction map. Even 1–2% sky blockage causes periodic dropouts that ruin averages and cause mid-test dips." },
                { step: "3", title: "Test at multiple times of day", body: "Run at least three tests: morning, afternoon, and 7–11 PM peak. Cell congestion means single tests are meaningless — compare medians." },
                { step: "4", title: "Test latency under load", body: "Raw Mbps isn't the whole story. Run our bufferbloat test to see if ping spikes when the link is saturated — critical for calls and gaming on Starlink." },
              ].map(s => (
                <Card key={s.step} className="border-border/60">
                  <CardContent className="p-4 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-500 font-bold flex items-center justify-center shrink-0">{s.step}</div>
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{s.body}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Is Starlink fast enough for…</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {USE_CASES.map(u => (
                <Card key={u.label} className="border-border/60">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <u.icon className="h-5 w-5 text-sky-500" />
                      <span className="font-semibold">{u.label}</span>
                      <Badge variant="outline" className={`ml-auto ${u.color}`}>{u.verdict}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{u.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Card className="mb-10 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Diagnose your Starlink connection</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { href: "/", label: "Speed Test", desc: "Download, upload & ping", icon: Zap },
                  { href: "/jitter-test", label: "Jitter Test", desc: "Satellite handoff stability", icon: Activity },
                  { href: "/packet-loss-test", label: "Packet Loss Test", desc: "Dropped packets from obstructions", icon: Wifi },
                  { href: "/bufferbloat-test", label: "Bufferbloat Test", desc: "Latency under load", icon: BarChart2 },
                  { href: "/ping-test", label: "Ping Test", desc: "Baseline latency", icon: Clock },
                  { href: "/how-much-internet-speed-do-i-need", label: "Speed Calculator", desc: "Is Starlink enough for you?", icon: CheckCircle },
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
              { href: "/internet-speed-for-cloud-gaming", label: "Cloud gaming speed guide" },
              { href: "/why-is-my-internet-slow", label: "Why is my internet slow?" },
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
