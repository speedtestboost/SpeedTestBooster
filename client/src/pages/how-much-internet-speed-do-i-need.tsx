import { useState, useEffect } from "react";
import { setCanonicalHref, removeHomepageJsonLd } from "@/lib/seo";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { trackEvent } from "@/lib/analytics";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpeedTestModal from "@/components/SpeedTestModal";
import {
  Wifi, Gamepad2, Video, Phone, Monitor, Users, Zap, CheckCircle,
  Info, Calculator, TrendingUp, Globe, Home, ArrowRight,
} from "lucide-react";

const PAGE_TITLE = "How Much Internet Speed Do I Need? (2026) — Calculator & Household Guide";
const PAGE_DESC =
  "How much internet speed do you need in 2026? Free household calculator plus Mbps recommendations for streaming, gaming, video calls, cloud gaming and remote work — by household size, with plan tiers from 50 Mbps to gigabit.";
const PAGE_URL = "https://speedtestboost.com/how-much-internet-speed-do-i-need";

interface ActivityRequirement {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  download: { min: number; recommended: number };
  upload: { min: number; recommended: number };
  latency: number;
  description: string;
}

const speedRequirements: ActivityRequirement[] = [
  { name: "4K Streaming", icon: Video, download: { min: 25, recommended: 50 }, upload: { min: 3, recommended: 5 }, latency: 100, description: "Netflix, YouTube, Disney+ 4K" },
  { name: "Competitive Gaming", icon: Gamepad2, download: { min: 5, recommended: 25 }, upload: { min: 3, recommended: 10 }, latency: 30, description: "FPS, MOBA — ping matters most" },
  { name: "Cloud Gaming", icon: Globe, download: { min: 35, recommended: 50 }, upload: { min: 5, recommended: 10 }, latency: 40, description: "GeForce NOW, Xbox Cloud, PS Portal" },
  { name: "Video Calls (WFH)", icon: Phone, download: { min: 5, recommended: 15 }, upload: { min: 5, recommended: 10 }, latency: 150, description: "Zoom, Teams, Google Meet HD" },
  { name: "Live Streaming", icon: Monitor, download: { min: 5, recommended: 25 }, upload: { min: 10, recommended: 35 }, latency: 50, description: "Twitch, YouTube Live broadcast" },
  { name: "Smart Home / IoT", icon: Wifi, download: { min: 5, recommended: 15 }, upload: { min: 2, recommended: 5 }, latency: 200, description: "Cameras, hubs, assistants" },
];

const HOUSEHOLD_GUIDE = [
  { size: "1–2 people", usage: "Browsing, HD streaming, occasional calls", download: "50–100 Mbps", upload: "5–10 Mbps", tier: "Basic", color: "bg-green-500" },
  { size: "2–3 people", usage: "2 HD streams + video calls", download: "100–200 Mbps", upload: "10–20 Mbps", tier: "Standard", color: "bg-blue-500" },
  { size: "3–4 people", usage: "2× 4K streams + gaming + WFH", download: "200–300 Mbps", upload: "20–35 Mbps", tier: "Premium", color: "bg-violet-500" },
  { size: "4–5 people", usage: "Multiple 4K + cloud gaming + dual WFH", download: "300–500 Mbps", upload: "25–50 Mbps", tier: "Premium Plus", color: "bg-orange-500" },
  { size: "5+ people", usage: "Heavy simultaneous use, large home", download: "500 Mbps–1 Gbps", upload: "50+ Mbps", tier: "Gigabit", color: "bg-red-500" },
  { size: "Creators / streamers", usage: "Live stream + 4K editing + backup", download: "500 Mbps–1 Gbps", upload: "50–100 Mbps", tier: "Fiber symmetric", color: "bg-purple-500" },
];

const FAQ_ITEMS = [
  { q: "How much internet speed do I need for a family of 4?", a: "A family of four with mixed use (2× 4K streaming, gaming, and work-from-home video calls) needs 200–300 Mbps download and 20–35 Mbps upload. Add 25 Mbps per additional simultaneous 4K stream. Fiber is strongly recommended when two or more people are on HD video calls at once — cable upload caps often bottleneck WFH households." },
  { q: "Is 100 Mbps enough internet speed in 2026?", a: "100 Mbps is enough for 1–3 people doing HD streaming, browsing, and occasional video calls. It is not enough for three simultaneous 4K streams plus gaming. The FCC defines broadband as 100 Mbps download — it is the minimum for modern households, not the ideal for active families." },
  { q: "Is 200 Mbps a good internet speed?", a: "Yes — 200 Mbps is the sweet spot for most 3–4 person households. It handles two 4K streams, online gaming, and a video call simultaneously with headroom. Most users on 200 Mbps plans never need to upgrade unless they add cloud gaming, multiple WFH users, or security cameras uploading continuously." },
  { q: "Do I need gigabit internet?", a: "Roughly 90% of households do not need gigabit (1,000 Mbps). Gigabit makes sense for households with 5+ heavy users, multiple cloud gaming sessions, content creators live-streaming in 1080p+, or homes with 10+ 4K security cameras. If your speed test consistently shows you use under 300 Mbps at peak, gigabit is marketing upsell." },
  { q: "How much speed do I need for Netflix 4K?", a: "Netflix recommends 15 Mbps minimum per 4K stream; plan for 25 Mbps per stream for HDR and headroom. Two simultaneous 4K Netflix streams need 50 Mbps minimum; four streams need 100 Mbps. See our full streaming speed guide for every platform." },
  { q: "Is upload or download speed more important?", a: "Download speed matters for streaming and browsing. Upload speed matters for video calls, cloud backup, live streaming, and security cameras. Cable plans often offer 500 Mbps down but only 10–35 Mbps up — a common cause of frozen Zoom calls despite fast download tests. Check upload separately." },
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

    let ld = document.querySelector('script[data-page="how-much-internet-speed"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "how-much-internet-speed");
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
        {
          "@type": "WebApplication",
          name: "Internet Speed Needs Calculator",
          url: PAGE_URL,
          applicationCategory: "UtilitiesApplication",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      ],
    });
  }, []);
}

export default function HowMuchInternetSpeedDoINeed() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [householdSize, setHouseholdSize] = useState(2);
  const [simultaneousUsers, setSimultaneousUsers] = useState(1);
  const [results, setResults] = useState<{
    minDownload: number;
    recommendedDownload: number;
    minUpload: number;
    recommendedUpload: number;
    maxLatency: number;
  } | null>(null);

  const calculateRequirements = () => {
    if (selectedActivities.length === 0) return;
    trackEvent("speed_calculator_used", "how-much-speed", "calculate");
    const selectedReqs = speedRequirements.filter(req => selectedActivities.includes(req.name));
    const baseMinDownload = Math.max(...selectedReqs.map(r => r.download.min));
    const baseRecDownload = Math.max(...selectedReqs.map(r => r.download.recommended));
    const baseMinUpload = Math.max(...selectedReqs.map(r => r.upload.min));
    const baseRecUpload = Math.max(...selectedReqs.map(r => r.upload.recommended));
    const minLatency = Math.min(...selectedReqs.map(r => r.latency));
    const multiplier = Math.max(1, householdSize * 0.3) + (simultaneousUsers - 1) * 0.7;
    const buffered = 1.25;
    setResults({
      minDownload: Math.round(baseMinDownload * multiplier * buffered),
      recommendedDownload: Math.round(baseRecDownload * multiplier * buffered),
      minUpload: Math.round(baseMinUpload * multiplier * buffered),
      recommendedUpload: Math.round(baseRecUpload * multiplier * buffered),
      maxLatency: minLatency,
    });
  };

  const toggleActivity = (name: string) => {
    setSelectedActivities(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name],
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/how-much-internet-speed-do-i-need" />
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Tools", href: "/" },
            { label: "How Much Internet Speed Do I Need?", href: "/how-much-internet-speed-do-i-need" },
          ]} />

          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <Home className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              How Much Internet Speed Do I Need?
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Most households need <strong>100–300 Mbps</strong> download in 2026. Use our calculator below,
              or jump to the household guide table. Then test your actual speed to see if your plan matches your needs.
            </p>
            <Button size="lg" onClick={() => setShowSpeedTest(true)} className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Zap className="mr-2 h-4 w-4" /> Test My Current Speed
            </Button>
          </div>

          {/* Household guide table — targets "how much speed" informational queries */}
          <Card className="mb-10 border-2 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Recommended Internet Speed by Household Size (2026)
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-3 font-semibold">Household</th>
                    <th className="p-3 font-semibold">Typical peak use</th>
                    <th className="p-3 font-semibold">Download</th>
                    <th className="p-3 font-semibold">Upload</th>
                    <th className="p-3 font-semibold">Plan tier</th>
                  </tr>
                </thead>
                <tbody>
                  {HOUSEHOLD_GUIDE.map(row => (
                    <tr key={row.size} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-3 font-medium">{row.size}</td>
                      <td className="p-3 text-muted-foreground">{row.usage}</td>
                      <td className="p-3">{row.download}</td>
                      <td className="p-3">{row.upload}</td>
                      <td className="p-3"><Badge className={row.color}>{row.tier}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground mt-4">
                Add 20–30% headroom above peak simultaneous demand. Fiber preferred when upload exceeds 20 Mbps or latency under 30 ms is required for gaming.
              </p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" /> Speed Needs Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-semibold">What do you use the internet for?</Label>
                  <div className="grid gap-2">
                    {speedRequirements.map(activity => {
                      const Icon = activity.icon;
                      const selected = selectedActivities.includes(activity.name);
                      return (
                        <button
                          key={activity.name}
                          type="button"
                          onClick={() => toggleActivity(activity.name)}
                          className={`p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                            selected ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-border hover:border-muted-foreground/30"
                          }`}
                        >
                          <Icon className={`h-5 w-5 shrink-0 ${selected ? "text-blue-500" : "text-muted-foreground"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{activity.name}</div>
                            <div className="text-xs text-muted-foreground">{activity.description}</div>
                          </div>
                          {selected && <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Household size</Label>
                    <Select value={String(householdSize)} onValueChange={v => setHouseholdSize(Number(v))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "person" : "people"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Peak simultaneous users</Label>
                    <Select value={String(simultaneousUsers)} onValueChange={v => setSimultaneousUsers(Number(v))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map(n => (
                          <SelectItem key={n} value={String(n)}>{n} at once</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={calculateRequirements} disabled={!selectedActivities.length} className="w-full" size="lg">
                  <Calculator className="mr-2 h-4 w-4" /> Calculate My Speed Needs
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" /> Your Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-5">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="text-sm text-muted-foreground">Recommended download</div>
                      <div className="text-3xl font-bold text-blue-600">{results.recommendedDownload} Mbps</div>
                      <div className="text-xs text-muted-foreground">Minimum: {results.minDownload} Mbps</div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="text-sm text-muted-foreground">Recommended upload</div>
                      <div className="text-3xl font-bold text-green-600">{results.recommendedUpload} Mbps</div>
                      <div className="text-xs text-muted-foreground">Minimum: {results.minUpload} Mbps</div>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <div className="text-sm text-muted-foreground">Target latency (ping)</div>
                      <div className="text-2xl font-bold text-orange-600">Under {results.maxLatency} ms</div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Info className="h-4 w-4 mt-0.5 shrink-0" />
                      Includes 25% headroom for background devices and peak-hour congestion.
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-12">Select activities to see your personalized Mbps recommendation.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Topic cluster links */}
          <Card className="mb-10">
            <CardHeader><CardTitle>Speed requirements by use case</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { href: "/internet-speed-for-streaming", label: "Streaming (Netflix, Disney+, YouTube)" },
                { href: "/internet-speed-for-video-calls", label: "Video calls & work from home" },
                { href: "/internet-speed-for-cloud-gaming", label: "Cloud gaming (GeForce NOW, Xbox)" },
                { href: "/gaming-speed-test", label: "Gaming ping & jitter test" },
                { href: "/upload-speed-guide", label: "Upload speed guide" },
                { href: "/bufferbloat-test", label: "Bufferbloat test (hidden lag)" },
              ].map(link => (
                <Link key={link.href} href={link.href} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/30 text-sm transition-colors">
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" /> {link.label}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-10">
            <CardHeader><CardTitle>Frequently asked questions</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {FAQ_ITEMS.map(item => (
                <div key={item.q}>
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <GenericFooter />
      {showSpeedTest && <SpeedTestModal onClose={() => setShowSpeedTest(false)} />}
    </div>
  );
}
