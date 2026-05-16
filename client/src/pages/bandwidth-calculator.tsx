import { useState, useEffect, useCallback } from "react";
import { setCanonicalHref } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";
import {
  Calculator, Clock, Globe, Activity, Wifi, BarChart2,
  HardDrive, Film, Music, Archive, Smartphone, Laptop,
  ArrowRight,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    document.title =
      "Bandwidth Calculator — Download Time & Data Usage Calculator | Speed Test & Boost";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute("content",
        "Free bandwidth calculator: find download/upload time for any file at any speed, convert MB↔Mbps, and estimate data usage. Instant, accurate, no sign-up.");

    const metas: [string, string][] = [
      ["og:title", "Bandwidth & Download Time Calculator | SpeedTestBoost"],
      ["og:description", "Calculate how long to download/upload a file at any internet speed. MB to Mbps converter included. Free, instant, no ads."],
      ["og:url", "https://speedtestboost.com/bandwidth-calculator"],
      ["og:type", "website"],
    ];
    metas.forEach(([p, v]) => {
      let el = document.querySelector(`meta[property="${p}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", p); document.head.appendChild(el); }
      el.setAttribute("content", v);
    });

    setCanonicalHref("https://speedtestboost.com/bandwidth-calculator");

    let ld = document.querySelector('script[data-page="bandwidth-calculator"]') as HTMLScriptElement | null;
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.setAttribute("data-page", "bandwidth-calculator"); document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Bandwidth & Download Time Calculator",
      "url": "https://speedtestboost.com/bandwidth-calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Calculate download/upload time for any file size and speed. MB ↔ Mbps converter, data usage estimator.",
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── Conversion helpers ───────────────────────────────────────────────────────
// Conventions: 1 byte = 8 bits; 1 MB = 1,000,000 bytes (SI); 1 MiB = 1,048,576 bytes
// ISPs advertise in Mbps (megabits/s). We use SI throughout.
const BITS_PER_MB   = 8_000_000;   // 8 million bits per megabyte (SI)
const BYTES_PER_MB  = 1_000_000;
const BYTES_PER_GB  = 1_000_000_000;

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return "—";
  if (seconds < 1)      return `${(seconds * 1000).toFixed(0)} ms`;
  if (seconds < 60)     return `${seconds.toFixed(1)} seconds`;
  if (seconds < 3600)   return `${Math.floor(seconds / 60)} min ${Math.round(seconds % 60)} sec`;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h} hr ${m} min`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1000)           return `${bytes} B`;
  if (bytes < 1_000_000)      return `${(bytes / 1000).toFixed(1)} KB`;
  if (bytes < 1_000_000_000)  return `${(bytes / 1_000_000).toFixed(2)} MB`;
  return `${(bytes / 1_000_000_000).toFixed(2)} GB`;
}

function downloadSeconds(fileSizeMB: number, speedMbps: number): number {
  if (speedMbps <= 0 || fileSizeMB <= 0) return 0;
  const bits = fileSizeMB * BITS_PER_MB;
  return bits / (speedMbps * 1_000_000);
}

// ─── Preset file sizes ────────────────────────────────────────────────────────
const FILE_PRESETS = [
  { icon: Music,    label: "MP3 Song",      mb: 5,      desc: "3 min, 192 kbps" },
  { icon: Film,     label: "SD Movie",      mb: 700,    desc: "720p, ~1.5 hrs" },
  { icon: Film,     label: "HD Movie",      mb: 4000,   desc: "1080p, ~1.5 hrs" },
  { icon: Film,     label: "4K Movie",      mb: 15000,  desc: "UHD, ~2 hrs" },
  { icon: Archive,  label: "1 GB ZIP",      mb: 1000,   desc: "Compressed archive" },
  { icon: HardDrive,label: "10 GB Backup",  mb: 10000,  desc: "Folder / OS backup" },
  { icon: Smartphone,label:"Mobile Game",   mb: 500,    desc: "~500 MB install" },
  { icon: Laptop,   label: "PC Game",       mb: 50000,  desc: "50 GB install" },
];

const SPEED_PRESETS = [
  { label: "ADSL 5 Mbps",   mbps: 5 },
  { label: "ADSL 10 Mbps",  mbps: 10 },
  { label: "Cable 50 Mbps", mbps: 50 },
  { label: "Cable 100 Mbps",mbps: 100 },
  { label: "Fiber 300 Mbps",mbps: 300 },
  { label: "Fiber 1 Gbps",  mbps: 1000 },
  { label: "5G 500 Mbps",   mbps: 500 },
];

// ─── Component ────────────────────────────────────────────────────────────────
type SizeUnit = "MB" | "GB" | "TB";

export default function BandwidthCalculator() {
  useSEO();

  // Download-time calculator
  const [sizeVal, setSizeVal]     = useState("1");
  const [sizeUnit, setSizeUnit]   = useState<SizeUnit>("GB");
  const [speedMbps, setSpeedMbps] = useState("100");

  // Mbps ↔ MB/s converter
  const [convertInput, setConvertInput]   = useState("100");
  const [convertDir, setConvertDir]       = useState<"mbps-to-mbs" | "mbs-to-mbps">("mbps-to-mbs");

  const toMB = useCallback((v: number, u: SizeUnit): number => {
    if (u === "MB") return v;
    if (u === "GB") return v * 1000;
    return v * 1_000_000; // TB
  }, []);

  const fileMB    = toMB(parseFloat(sizeVal) || 0, sizeUnit);
  const speed     = parseFloat(speedMbps) || 0;
  const dlSecs    = downloadSeconds(fileMB, speed);
  const dlText    = formatTime(dlSecs);
  const ulSecs    = downloadSeconds(fileMB, speed * 0.15); // rough upload ≈ 15% of download
  const ulText    = formatTime(ulSecs);

  // converter
  const convertedVal = useCallback((): string => {
    const v = parseFloat(convertInput) || 0;
    if (convertDir === "mbps-to-mbs") return `${(v / 8).toFixed(3)} MB/s`;
    return `${(v * 8).toFixed(2)} Mbps`;
  }, [convertInput, convertDir]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/bandwidth-calculator" />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Bandwidth Calculator", href: "/bandwidth-calculator" }]} />

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <Calculator className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Bandwidth Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How long will that 4K movie take to download? Is your 100 Mbps plan fast enough for 
              your PS5 game? Get instant, accurate answers — plus an Mbps ↔ MB/s converter.
            </p>
          </div>

          {/* ── Download-time calculator ────────────────────────────────── */}
          <Card className="mb-8 border-2 border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Download / Upload Time Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Inputs row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {/* File size */}
                <div>
                  <Label className="mb-1 block">File Size</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      value={sizeVal}
                      onChange={e => setSizeVal(e.target.value)}
                      className="flex-1"
                      placeholder="e.g. 4.7"
                    />
                    <select
                      value={sizeUnit}
                      onChange={e => setSizeUnit(e.target.value as SizeUnit)}
                      className="px-3 py-2 rounded-md border border-border bg-background text-sm"
                    >
                      <option value="MB">MB</option>
                      <option value="GB">GB</option>
                      <option value="TB">TB</option>
                    </select>
                  </div>
                </div>
                {/* Speed */}
                <div>
                  <Label className="mb-1 block">Internet Speed (Mbps)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={speedMbps}
                    onChange={e => setSpeedMbps(e.target.value)}
                    placeholder="e.g. 100"
                  />
                </div>
              </div>

              {/* Speed presets */}
              <div className="flex flex-wrap gap-2 mb-6">
                {SPEED_PRESETS.map(p => (
                  <button
                    key={p.label}
                    onClick={() => setSpeedMbps(String(p.mbps))}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${parseFloat(speedMbps) === p.mbps ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/60"}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Result box */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl p-5 bg-primary/10 border border-primary/30 text-center">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                    <ArrowRight className="h-3 w-3" /> Download time
                  </div>
                  <div className="text-3xl font-bold text-primary">{dlText || "—"}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    at {speedMbps} Mbps &nbsp;·&nbsp; {formatBytes(fileMB * BYTES_PER_MB)}
                  </div>
                </div>
                <div className="rounded-xl p-5 bg-muted/30 border border-border/40 text-center">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
                    <ArrowRight className="h-3 w-3 rotate-180" /> Upload time
                    <span className="text-[10px]">(estimated)</span>
                  </div>
                  <div className="text-3xl font-bold">{ulText || "—"}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    assuming ~{(speed * 0.15).toFixed(0)} Mbps upload
                  </div>
                </div>
              </div>

              {/* File presets */}
              <p className="text-xs text-muted-foreground mb-2">Common file sizes:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FILE_PRESETS.map(fp => {
                  const fpUnit: SizeUnit = fp.mb >= 1000 ? "GB" : "MB";
                  const fpVal = fpUnit === "GB" ? (fp.mb / 1000).toFixed(0) : String(fp.mb);
                  return (
                    <button
                      key={fp.label}
                      onClick={() => { setSizeVal(fpVal); setSizeUnit(fpUnit); }}
                      className="flex items-center gap-2 p-2 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-left"
                    >
                      <fp.icon className="h-4 w-4 text-primary flex-shrink-0" />
                      <div>
                        <div className="text-xs font-medium leading-tight">{fp.label}</div>
                        <div className="text-[10px] text-muted-foreground">{fp.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* ── Mbps ↔ MB/s converter ─────────────────────────────────── */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Mbps ↔ MB/s Converter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                ISPs advertise in <strong>Megabits per second (Mbps)</strong>. 
                Download managers show <strong>Megabytes per second (MB/s)</strong>. 
                Divide Mbps by 8 to get MB/s.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Input
                  type="number"
                  value={convertInput}
                  onChange={e => setConvertInput(e.target.value)}
                  className="sm:w-40"
                  placeholder="Value"
                />
                <select
                  value={convertDir}
                  onChange={e => setConvertDir(e.target.value as typeof convertDir)}
                  className="px-3 py-2 rounded-md border border-border bg-background text-sm"
                >
                  <option value="mbps-to-mbs">Mbps → MB/s</option>
                  <option value="mbs-to-mbps">MB/s → Mbps</option>
                </select>
                <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
                <div className="text-2xl font-bold text-primary">{convertedVal()}</div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-2 px-3 text-left">Plan speed</th>
                      <th className="py-2 px-3 text-left">MB/s (max)</th>
                      <th className="py-2 px-3 text-left">Practical MB/s*</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 text-muted-foreground">
                    {[
                      { plan: "25 Mbps",   max: "3.1",  prac: "2.4" },
                      { plan: "50 Mbps",   max: "6.25", prac: "5.0" },
                      { plan: "100 Mbps",  max: "12.5", prac: "10.0" },
                      { plan: "300 Mbps",  max: "37.5", prac: "30.0" },
                      { plan: "500 Mbps",  max: "62.5", prac: "50.0" },
                      { plan: "1 Gbps",    max: "125",  prac: "100" },
                    ].map(r => (
                      <tr key={r.plan} className="hover:bg-muted/20">
                        <td className="py-2 px-3 font-medium">{r.plan}</td>
                        <td className="py-2 px-3">{r.max} MB/s</td>
                        <td className="py-2 px-3">{r.prac} MB/s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-2">* Practical ≈ 80% of theoretical (TCP overhead, protocol headers).</p>
              </div>
            </CardContent>
          </Card>

          {/* Reference table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Common Downloads at Popular Speeds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-2 px-3 text-left">File</th>
                      <th className="py-2 px-3 text-left">10 Mbps</th>
                      <th className="py-2 px-3 text-left">100 Mbps</th>
                      <th className="py-2 px-3 text-left">300 Mbps</th>
                      <th className="py-2 px-3 text-left">1 Gbps</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 text-muted-foreground">
                    {FILE_PRESETS.map(fp => (
                      <tr key={fp.label} className="hover:bg-muted/20">
                        <td className="py-2 px-3 font-medium text-foreground">
                          <div className="flex items-center gap-1"><fp.icon className="h-3 w-3" /> {fp.label}</div>
                          <div className="text-[10px] text-muted-foreground">{fp.desc}</div>
                        </td>
                        {[10, 100, 300, 1000].map(s => (
                          <td key={s} className="py-2 px-3">{formatTime(downloadSeconds(fp.mb, s))}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Speed plan guide */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5 text-primary" />Choosing the Right Internet Speed for Your Household</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                ISPs offer plans from 25 Mbps to multi-gigabit. The right speed for you depends on how many people 
                are in your household and what they do simultaneously. Use our calculator to estimate your needs, 
                then compare with the guide below.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-2 px-3 text-left font-semibold">Household Size</th>
                      <th className="py-2 px-3 text-left font-semibold">Primary Usage</th>
                      <th className="py-2 px-3 text-left font-semibold">Recommended Speed</th>
                      <th className="py-2 px-3 text-left font-semibold">Plan Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { size: "1–2 people", usage: "Streaming HD, browsing, email", speed: "25–50 Mbps", plan: "Basic broadband" },
                      { size: "2–3 people", usage: "4K streaming + gaming + WFH", speed: "100–200 Mbps", plan: "Standard cable/fibre" },
                      { size: "3–5 people", usage: "Multiple 4K TVs + gaming + video calls", speed: "200–500 Mbps", plan: "High-speed fibre" },
                      { size: "5+ people / home office", usage: "Everything above + cloud backups + NAS", speed: "500 Mbps–1 Gbps", plan: "Gigabit fibre" },
                      { size: "Power users", usage: "8K / VR / live streaming + multi-gigabit NAS", speed: "1–2.5 Gbps", plan: "Multi-gig fibre" },
                    ].map(row => (
                      <tr key={row.size} className="hover:bg-muted/20 transition-colors">
                        <td className="py-2 px-3 font-medium text-foreground">{row.size}</td>
                        <td className="py-2 px-3">{row.usage}</td>
                        <td className="py-2 px-3 font-bold text-primary">{row.speed}</td>
                        <td className="py-2 px-3">{row.plan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs">
                Note: These are <em>practical</em> recommendations assuming concurrent usage. ISP plans are shared 
                infrastructure — real speeds vary by time of day and local congestion.
              </p>
            </CardContent>
          </Card>

          {/* Bandwidth by activity */}
          <Card className="mb-6">
            <CardHeader><CardTitle>How Much Bandwidth Does Each Activity Need?</CardTitle></CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    category: "Streaming Video",
                    items: [
                      { label: "YouTube 480p", mbps: "1.5 Mbps" },
                      { label: "YouTube / Netflix HD (1080p)", mbps: "5–8 Mbps" },
                      { label: "Netflix 4K (HDR)", mbps: "15–25 Mbps" },
                      { label: "Disney+ 4K", mbps: "25 Mbps" },
                      { label: "Apple TV+ 4K Dolby Vision", mbps: "up to 40 Mbps" },
                    ],
                  },
                  {
                    category: "Online Gaming",
                    items: [
                      { label: "Game data (any game)", mbps: "1–3 Mbps" },
                      { label: "Voice chat (Discord)", mbps: "< 1 Mbps" },
                      { label: "Game download (Steam)", mbps: "Full bandwidth" },
                      { label: "Cloud gaming (GeForce NOW 4K)", mbps: "45 Mbps" },
                      { label: "Xbox Cloud Gaming", mbps: "20 Mbps" },
                    ],
                  },
                  {
                    category: "Video Calls",
                    items: [
                      { label: "Zoom HD 1:1 call", mbps: "1.5 Mbps up+down" },
                      { label: "Zoom HD group call", mbps: "2.5 Mbps up+down" },
                      { label: "Teams 1080p call", mbps: "4 Mbps up+down" },
                      { label: "Google Meet HD", mbps: "2.6 Mbps down, 3.2 Mbps up" },
                    ],
                  },
                  {
                    category: "File Transfers & Backups",
                    items: [
                      { label: "1 GB file at 100 Mbps", mbps: "~80 seconds" },
                      { label: "1 TB cloud backup at 50 Mbps", mbps: "~45 hours" },
                      { label: "4K movie (50 GB) at 100 Mbps", mbps: "~67 minutes" },
                      { label: "Steam game (80 GB) at 200 Mbps", mbps: "~54 minutes" },
                    ],
                  },
                ].map(({ category, items }) => (
                  <div key={category} className="rounded-lg bg-muted/20 border border-border/40 p-4">
                    <h3 className="font-semibold text-foreground mb-3">{category}</h3>
                    <div className="space-y-2">
                      {items.map(({ label, mbps }) => (
                        <div key={label} className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-mono font-bold text-primary">{mbps}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why speed test result ≠ download speed */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><ArrowRight className="h-5 w-5 text-primary" />Why Your Speed Test Shows 500 Mbps but Downloads Feel Slow</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                There are several layers between your ISP's headline speed and the MB/s you see in your browser's 
                download bar. Understanding each layer explains the gap:
              </p>
              <div className="space-y-3">
                {[
                  { gap: "Bits vs Bytes confusion", detail: "ISPs sell plans in Mbps (megabits). Download managers show MB/s (megabytes). Divide Mbps by 8. A 500 Mbps plan delivers maximum 62.5 MB/s — not 500 MB/s." },
                  { gap: "TCP/IP overhead (~8%)", detail: "Every packet carries header data that doesn't contribute to your file. Effective throughput is ~92% of raw line speed at best." },
                  { gap: "Server-side rate limiting", detail: "Many download servers intentionally limit speed to ensure fair access. A 500 Mbps connection downloading from a server capped at 10 Mbps will download at 10 Mbps." },
                  { gap: "WiFi contention and interference", detail: "WiFi is a shared medium. Your maximum speed on 802.11ac is theoretical — actual speeds are often 40–70% lower due to channel congestion, signal attenuation, and interference." },
                  { gap: "Storage write speed bottleneck", detail: "Writing to a spinning hard drive is limited to ~100–200 MB/s. If your internet is faster, the drive becomes the bottleneck. SSDs (500 MB/s+) fix this for high-speed connections." },
                ].map(({ gap, detail }) => (
                  <div key={gap} className="flex gap-3 border-b border-border/30 pb-3 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground text-xs mb-0.5">{gap}</div>
                      <div className="text-xs">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mb-8">
            <CardHeader><CardTitle>Frequently Asked Questions About Bandwidth & Download Speed</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {[
                { q: "Why is my actual download speed slower than my internet plan?", a: "ISPs advertise the theoretical maximum under ideal conditions. Real-world speeds are reduced by: TCP/IP protocol overhead (~8%), WiFi interference and signal attenuation, server-side rate limits, network congestion (especially during evenings), and your device's hardware capabilities. On a good wired connection you should see 85–95% of advertised speed." },
                { q: "What's the difference between Mbps and MB/s?", a: "Mbps (megabits per second) is how ISPs and speed tests measure speeds — 8 bits make 1 byte. MB/s (megabytes per second) is how file sizes and download managers display progress. To convert: divide Mbps by 8 to get MB/s. A 100 Mbps connection gives maximum 12.5 MB/s. A 1 Gbps plan gives maximum 125 MB/s." },
                { q: "How do I calculate download time manually?", a: "Formula: Download time (seconds) = File size in megabytes × 8 ÷ Speed in Mbps. Example: 50 GB game (51,200 MB) at 200 Mbps = 51,200 × 8 ÷ 200 = 2,048 seconds ≈ 34 minutes. Our calculator does this instantly, including overhead adjustments." },
                { q: "How much bandwidth does 4K streaming use?", a: "Netflix 4K streams at 15–25 Mbps. Disney+ 4K uses up to 25 Mbps. Apple TV+ 4K Dolby Vision can use up to 40 Mbps. For a household with 3 people watching 4K simultaneously, you need at least 75–100 Mbps dedicated to streaming, plus additional capacity for other activities." },
                { q: "Do I need gigabit internet?", a: "For most households, no. 200–500 Mbps handles 4K streaming for 4 people, gaming, video calls, and regular downloads simultaneously. Gigabit (1 Gbps) is valuable if you frequently transfer large files between devices, run a home server or NAS, work from home with large video files, or want future-proofing for several years." },
                { q: "Does download speed affect online gaming?", a: "Surprisingly little, for active gameplay. Online games use 1–3 Mbps of actual data during play — any connection over 10 Mbps is sufficient. What matters for gaming is latency (ping), jitter, and packet loss. Where download speed matters for gaming is during updates: a 80 GB Steam game downloads 4× faster on 200 Mbps vs 50 Mbps." },
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
              <p className="text-sm text-muted-foreground mb-4">Speed is one dimension. Check quality metrics too for a complete network picture:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { href: "/",                  label: "Speed Test",           icon: Wifi,       desc: "Measure download & upload Mbps" },
                  { href: "/ping-test",          label: "Ping Test",            icon: Clock,      desc: "Latency to game servers" },
                  { href: "/jitter-test",        label: "Jitter Test",          icon: Activity,   desc: "VoIP & gaming stability" },
                  { href: "/packet-loss-test",   label: "Packet Loss Test",     icon: BarChart2,  desc: "Dropped packet detection" },
                  { href: "/bufferbloat-test",   label: "Bufferbloat Test",     icon: HardDrive,  desc: "Router queue management" },
                  { href: "/dns-speed-test",     label: "DNS Speed Test",       icon: Globe,      desc: "Fastest DNS for your location" },
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
