import { useState, useEffect, useCallback } from "react";
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
  Globe, Zap, CheckCircle, Activity, Clock, BarChart2, Wifi,
  Shield, Lock, Eye,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    document.title =
      "Free DNS Speed Test — Find the Fastest DNS Server for You | Speed Test & Boost";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute("content",
        "Compare 8 major DNS resolvers (Google, Cloudflare 1.1.1.1, OpenDNS, Quad9, NextDNS, AdGuard) and find which is fastest from your location. Free, browser-based, no install.");

    const metas: [string, string][] = [
      ["og:title", "Free DNS Speed Test — Compare Google, Cloudflare, Quad9 | SpeedTestBoost"],
      ["og:description", "Instantly benchmark 8 DNS resolvers and switch to the fastest one. Ranked table, A–F grade, privacy comparison. No ads."],
      ["og:url", "https://speedtestboost.com/dns-speed-test"],
      ["og:type", "website"],
    ];
    metas.forEach(([p, v]) => {
      let el = document.querySelector(`meta[property="${p}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", p); document.head.appendChild(el); }
      el.setAttribute("content", v);
    });

    setCanonicalHref("https://speedtestboost.com/dns-speed-test");

    let ld = document.querySelector('script[data-page="dns-speed-test"]') as HTMLScriptElement | null;
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.setAttribute("data-page", "dns-speed-test"); document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free DNS Speed Test",
      "url": "https://speedtestboost.com/dns-speed-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Compare 8 major DNS resolvers from your browser — no install. Ranked by response time with privacy notes.",
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── Resolver definitions ─────────────────────────────────────────────────────
// Browser sandbox prevents raw DNS UDP/TCP, so we test each resolver's
// HTTPS-based DoH (DNS-over-HTTPS) endpoint — this is the most representative
// measure of real-world DNS performance and the increasingly common protocol.
interface Resolver {
  name: string;
  short: string;
  doh: string;
  privacy: "high" | "medium" | "low";
  malwareBlocking: boolean;
  adBlocking: boolean;
  note: string;
}

const RESOLVERS: Resolver[] = [
  {
    name: "Cloudflare 1.1.1.1",      short: "Cloudflare",
    doh: "https://cloudflare-dns.com/dns-query?name=speedtestboost.com&type=A",
    privacy: "high", malwareBlocking: false, adBlocking: false,
    note: "Fastest globally, privacy-first",
  },
  {
    name: "Google Public DNS 8.8.8.8", short: "Google",
    doh: "https://dns.google/resolve?name=speedtestboost.com&type=A",
    privacy: "medium", malwareBlocking: false, adBlocking: false,
    note: "Highly reliable, large anycast network",
  },
  {
    name: "OpenDNS",                   short: "OpenDNS",
    doh: "https://doh.opendns.com/dns-query?name=speedtestboost.com&type=A",
    privacy: "medium", malwareBlocking: true, adBlocking: false,
    note: "Cisco-backed, optional phishing filter",
  },
  {
    name: "Quad9 9.9.9.9",             short: "Quad9",
    doh: "https://dns.quad9.net/dns-query?name=speedtestboost.com&type=A",
    privacy: "high", malwareBlocking: true, adBlocking: false,
    note: "Non-profit, blocks malware domains",
  },
  {
    name: "CleanBrowsing Family",      short: "CleanBrowsing",
    doh: "https://doh.cleanbrowsing.org/doh/family-filter/?name=speedtestboost.com&type=A",
    privacy: "medium", malwareBlocking: true, adBlocking: true,
    note: "Family-safe filtering",
  },
  {
    name: "AdGuard DNS",               short: "AdGuard",
    doh: "https://dns.adguard-dns.com/resolve?name=speedtestboost.com&type=A",
    privacy: "high", malwareBlocking: true, adBlocking: true,
    note: "Blocks ads and trackers at DNS level",
  },
  {
    name: "Cloudflare 1.1.1.2 (Malware)", short: "CF Secure",
    doh: "https://security.cloudflare-dns.com/dns-query?name=speedtestboost.com&type=A",
    privacy: "high", malwareBlocking: true, adBlocking: false,
    note: "Cloudflare + malware blocking",
  },
  {
    name: "NextDNS",                   short: "NextDNS",
    doh: "https://dns.nextdns.io/resolve?name=speedtestboost.com&type=A",
    privacy: "high", malwareBlocking: true, adBlocking: true,
    note: "Fully customisable, privacy-focused",
  },
];

const RUNS_PER_RESOLVER = 5;  // average over 5 DoH requests for accuracy

async function benchmarkResolver(r: Resolver): Promise<number> {
  const times: number[] = [];
  for (let i = 0; i < RUNS_PER_RESOLVER; i++) {
    const t0 = performance.now();
    try {
      await fetch(`${r.doh}&_=${Date.now()}`, {
        headers: { Accept: "application/dns-json" },
        cache: "no-store",
      });
      times.push(performance.now() - t0);
    } catch {
      times.push(9999); // treat failures as very slow
    }
    await new Promise(res => setTimeout(res, 50));
  }
  // drop best+worst, average the rest
  times.sort((a, b) => a - b);
  const trimmed = times.slice(1, -1);
  return trimmed.reduce((a, b) => a + b, 0) / trimmed.length;
}

function gradeMs(ms: number) {
  if (ms < 20)  return { label: "A+", color: "text-green-500" };
  if (ms < 40)  return { label: "A",  color: "text-green-400" };
  if (ms < 70)  return { label: "B",  color: "text-blue-400"  };
  if (ms < 120) return { label: "C",  color: "text-yellow-400"};
  if (ms < 200) return { label: "D",  color: "text-orange-500"};
  return          { label: "F",  color: "text-red-500"   };
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ResolverResult { resolver: Resolver; ms: number; status: "pending" | "testing" | "done" | "error" }

export default function DNSSpeedTest() {
  useSEO();

  const [running, setRunning]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults]   = useState<ResolverResult[]>(
    RESOLVERS.map(r => ({ resolver: r, ms: 0, status: "pending" }))
  );
  const [done, setDone]         = useState(false);
  const [status, setStatus]     = useState("Click Start to benchmark all DNS resolvers from your location");

  const runTest = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setProgress(0);
    setResults(RESOLVERS.map(r => ({ resolver: r, ms: 0, status: "pending" })));
    setStatus("Running DNS benchmark…");

    const updated: ResolverResult[] = RESOLVERS.map(r => ({ resolver: r, ms: 0, status: "pending" as const }));

    for (let i = 0; i < RESOLVERS.length; i++) {
      updated[i] = { ...updated[i], status: "testing" };
      setResults([...updated]);
      setStatus(`Testing ${RESOLVERS[i].name}…`);
      try {
        const ms = await benchmarkResolver(RESOLVERS[i]);
        updated[i] = { ...updated[i], ms, status: "done" };
      } catch {
        updated[i] = { ...updated[i], ms: 9999, status: "error" };
      }
      setResults([...updated]);
      setProgress(Math.round(((i + 1) / RESOLVERS.length) * 100));
    }

    setStatus("Benchmark complete — ranked fastest to slowest");
    setDone(true);
    setRunning(false);
  }, [running]);

  const ranked = done
    ? [...results].sort((a, b) => a.ms - b.ms)
    : results;

  const winner = done ? ranked[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/dns-speed-test" />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "DNS Speed Test", href: "/dns-speed-test" }]} />

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <Globe className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Free DNS Speed Test
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every website visit starts with a DNS lookup. Switching to a faster resolver cuts page-load times by 50–200 ms — 
              invisibly improving <em>every</em> site you visit. We benchmark 8 resolvers right from your browser.
              <strong> No download. No ads.</strong>
            </p>
          </div>

          {/* Winner banner */}
          {winner && winner.ms < 9999 && (
            <Card className="mb-6 border-2 border-green-500/40 bg-green-500/5">
              <CardContent className="p-5 flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
                <div>
                  <div className="text-lg font-bold text-foreground">
                    Fastest from your location: <span className="text-green-500">{winner.resolver.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {winner.ms.toFixed(1)} ms avg &nbsp;·&nbsp; {winner.resolver.note}
                  </div>
                </div>
                <Badge className="ml-auto bg-green-500 text-white">{gradeMs(winner.ms).label}</Badge>
              </CardContent>
            </Card>
          )}

          {/* Ranked table */}
          <Card className="mb-8 border-2 border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                DNS Resolver Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ranked.map((r, i) => {
                  const g = r.status === "done" && r.ms < 9999 ? gradeMs(r.ms) : null;
                  const pct = r.status === "done" && done && ranked[0].ms > 0
                    ? Math.min(100, (ranked[0].ms / r.ms) * 100)
                    : 0;
                  return (
                    <div key={r.resolver.name} className={`flex items-center gap-3 p-3 rounded-lg border ${r.status === "testing" ? "border-primary/40 bg-primary/5" : "border-border/30"}`}>
                      <span className="text-sm font-bold text-muted-foreground w-5 text-center">{done ? i + 1 : "—"}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm truncate">{r.resolver.name}</span>
                          {r.resolver.malwareBlocking && <Badge variant="secondary" className="text-xs">🛡 Malware</Badge>}
                          {r.resolver.adBlocking && <Badge variant="secondary" className="text-xs">🚫 Ads</Badge>}
                          {r.resolver.privacy === "high" && <Badge variant="secondary" className="text-xs">🔒 Private</Badge>}
                          {r.status === "testing" && <Activity className="h-3 w-3 text-primary animate-pulse" />}
                        </div>
                        {done && r.status === "done" && r.ms < 9999 && (
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                          </div>
                        )}
                      </div>
                      <div className="text-right min-w-[80px]">
                        {r.status === "done" && r.ms < 9999 && (
                          <>
                            <div className={`text-lg font-bold ${g?.color}`}>{r.ms.toFixed(1)} ms</div>
                            <div className={`text-xs font-bold ${g?.color}`}>{g?.label}</div>
                          </>
                        )}
                        {r.status === "testing" && <span className="text-xs text-primary animate-pulse">Testing…</span>}
                        {r.status === "error" || (r.status === "done" && r.ms >= 9999) ? <span className="text-xs text-red-400">Failed</span> : null}
                        {r.status === "pending" && <span className="text-xs text-muted-foreground">Waiting</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {running && <Progress value={progress} className="mt-4 h-2" />}
              <p className="text-sm text-muted-foreground mt-3 text-center">{status}</p>

              <Button
                size="lg"
                className="w-full mt-4 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={runTest}
                disabled={running}
              >
                {running
                  ? <><Activity className="mr-2 h-5 w-5 animate-pulse" />Benchmarking… {progress}%</>
                  : <><Zap className="mr-2 h-5 w-5" />{done ? "Re-run Benchmark" : "Start DNS Benchmark"}</>
                }
              </Button>
            </CardContent>
          </Card>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Zap,    label: "Page Load Speed", detail: "Every web request starts with DNS. Faster DNS = faster first byte." },
              { icon: Shield, label: "Malware Blocking", detail: "Quad9, AdGuard, CleanBrowsing block known malicious domains at DNS level." },
              { icon: Lock,   label: "Privacy / DoH",   detail: "DNS-over-HTTPS encrypts your queries — no ISP snooping." },
            ].map(({ icon: Icon, label, detail }) => (
              <Card key={label} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <Icon className="h-7 w-7 text-primary mb-2" />
                  <div className="font-semibold mb-1">{label}</div>
                  <div className="text-xs text-muted-foreground">{detail}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resolver reference table */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5 text-primary" />Resolver Quick-Reference</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-2 px-3 text-left">Resolver</th>
                      <th className="py-2 px-3 text-left">Primary IP</th>
                      <th className="py-2 px-3 text-left">Privacy</th>
                      <th className="py-2 px-3 text-left">Blocks Malware</th>
                      <th className="py-2 px-3 text-left">Blocks Ads</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { n: "Cloudflare 1.1.1.1",    ip: "1.1.1.1",     priv: "🔒 High",   mal: "❌",  ad: "❌" },
                      { n: "Google 8.8.8.8",         ip: "8.8.8.8",     priv: "🟡 Medium", mal: "❌",  ad: "❌" },
                      { n: "OpenDNS",                ip: "208.67.222.222",priv:"🟡 Medium", mal: "✅",  ad: "❌" },
                      { n: "Quad9",                  ip: "9.9.9.9",     priv: "🔒 High",   mal: "✅",  ad: "❌" },
                      { n: "AdGuard DNS",            ip: "94.140.14.14", priv: "🔒 High",  mal: "✅",  ad: "✅" },
                      { n: "CleanBrowsing Family",   ip: "185.228.168.168",priv:"🟡 Medium",mal: "✅",  ad: "✅" },
                      { n: "Cloudflare 1.1.1.2",     ip: "1.1.1.2",     priv: "🔒 High",  mal: "✅",  ad: "❌" },
                      { n: "NextDNS",                ip: "Customisable",priv: "🔒 High",   mal: "✅",  ad: "✅" },
                    ].map(r => (
                      <tr key={r.n} className="hover:bg-muted/20">
                        <td className="py-2 px-3 font-medium">{r.n}</td>
                        <td className="py-2 px-3 font-mono text-xs text-muted-foreground">{r.ip}</td>
                        <td className="py-2 px-3">{r.priv}</td>
                        <td className="py-2 px-3">{r.mal}</td>
                        <td className="py-2 px-3">{r.ad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* DNS deep dive */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-primary" />Why DNS Speed Matters for Everyday Browsing</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Every time you type a URL or tap a link, your device first asks a DNS resolver to convert the 
                domain name into an IP address. This lookup happens <em>before</em> any content is downloaded — it's 
                the starting pistol for every web request. On a typical page with 50–100 distinct domains 
                (analytics, fonts, ads, CDNs), a slow DNS resolver can add hundreds of milliseconds of invisible delay.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <h3 className="font-semibold text-foreground mb-2">Impact of DNS Speed on Browsing</h3>
                  <ul className="space-y-1 text-xs">
                    <li>⚡ <strong>Fast DNS (under 10 ms)</strong> — pages feel instant; first-byte in under 50 ms</li>
                    <li>⚠️ <strong>Average DNS (30–80 ms)</strong> — perceptible delay on first visit to each site</li>
                    <li>🐢 <strong>Slow DNS (over 100 ms)</strong> — pages take 300–500 ms before a single byte downloads</li>
                    <li>📱 <strong>Mobile impact is larger</strong> — DNS RTT is often doubled on cellular due to NAT traversal</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <h3 className="font-semibold text-foreground mb-2">DNS Speed vs Privacy Trade-offs</h3>
                  <ul className="space-y-1 text-xs">
                    <li>🔒 <strong>Cloudflare 1.1.1.1</strong> — fastest globally; strong privacy policy, no query logs</li>
                    <li>🛡️ <strong>Quad9 9.9.9.9</strong> — blocks malware domains; slightly slower but safer</li>
                    <li>👁️ <strong>Google 8.8.8.8</strong> — very fast; queries used for analytics</li>
                    <li>🏠 <strong>ISP DNS</strong> — often slowest; may log, inject ads, or block sites</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to change DNS — platform guide */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" />How to Change Your DNS Server (All Platforms)</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    platform: "Windows 11 / 10",
                    steps: [
                      "Open Settings → Network & Internet → Advanced network settings",
                      "Click your active adapter → Edit",
                      "Set IP assignment to Manual → enable IPv4",
                      "Enter your chosen DNS in Preferred DNS (e.g. 1.1.1.1) and Alternate DNS (e.g. 1.0.0.1)",
                      "Click Save — no restart needed",
                    ],
                    tip: "For DNS-over-HTTPS on Windows 11, also set 'DNS-over-HTTPS' to 'On (automatic template)' in the same screen.",
                  },
                  {
                    platform: "macOS (Ventura / Sonoma)",
                    steps: [
                      "Apple Menu → System Settings → Network",
                      "Click your active connection → Details → DNS",
                      "Click + and add your DNS server (e.g. 1.1.1.1)",
                      "Add a secondary DNS (e.g. 1.0.0.1) for fallback",
                      "Click OK → Apply",
                    ],
                    tip: "Changes apply per-interface. Set DNS on both Wi-Fi and Ethernet if you use both.",
                  },
                  {
                    platform: "Android",
                    steps: [
                      "Settings → Network & Internet → Private DNS",
                      "Select 'Private DNS provider hostname'",
                      "Enter: cloudflare-dns.com (for Cloudflare) or dns.google (for Google)",
                      "Save — this enables DNS-over-TLS for all apps",
                    ],
                    tip: "Android's Private DNS setting uses DoT (DNS-over-TLS) and covers all apps on your device, not just Wi-Fi.",
                  },
                  {
                    platform: "iPhone / iPad (iOS 14+)",
                    steps: [
                      "Settings → Wi-Fi → tap your connected network → Configure DNS → Manual",
                      "Delete existing servers and add your DNS (e.g. 1.1.1.1 and 1.0.0.1)",
                      "Tap Save",
                    ],
                    tip: "For encrypted DNS on iOS, install the Cloudflare 1.1.1.1 app or download a DNS configuration profile from your preferred provider — these enable DoH system-wide.",
                  },
                  {
                    platform: "Router (Recommended — Covers All Devices)",
                    steps: [
                      "Log into your router admin panel (typically 192.168.1.1 or 192.168.0.1)",
                      "Find WAN settings or DNS settings",
                      "Replace the ISP's DNS with your chosen server (e.g. 1.1.1.1 primary, 1.0.0.1 secondary)",
                      "Save and reboot your router",
                    ],
                    tip: "Setting DNS at the router level applies to every device on your network automatically — phones, TVs, game consoles, and laptops all benefit without individual configuration.",
                  },
                ].map(({ platform, steps, tip }) => (
                  <div key={platform} className="border border-border/40 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">{platform}</h3>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-muted-foreground mb-2">
                      {steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                    <p className="text-xs text-primary/80 bg-primary/5 rounded px-2 py-1">💡 {tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security guide */}
          <Card className="mb-6">
            <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />DNS Privacy & Security — What You Need to Know</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Your default ISP DNS resolver sends every query in plain text over UDP port 53. This means:</p>
              <ul className="space-y-2 text-xs">
                <li><strong>Your ISP can see every domain you visit</strong> — and in many countries can sell this data to advertisers.</li>
                <li><strong>Man-in-the-middle attacks are possible</strong> — DNS hijacking redirects you to fake sites without you knowing.</li>
                <li><strong>DNS poisoning</strong> — attackers inject false DNS records to redirect traffic to malicious servers.</li>
              </ul>
              <div className="grid sm:grid-cols-3 gap-3 mt-3">
                {[
                  { icon: Lock, title: "DNS-over-HTTPS (DoH)", desc: "Encrypts queries inside HTTPS. Supported by Cloudflare, Google, Quad9. Works in Firefox, Chrome, and Windows 11 natively." },
                  { icon: Shield, title: "DNS-over-TLS (DoT)", desc: "Encrypts queries using TLS on port 853. Used by Android's Private DNS feature. Slightly easier to block but more transparent." },
                  { icon: Eye, title: "DNSSEC Validation", desc: "Cryptographically signs DNS records to prevent spoofing. Quad9 and Cloudflare validate DNSSEC automatically." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-lg bg-muted/30 border border-border/40 p-3">
                    <Icon className="h-5 w-5 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground text-xs mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className="mb-8">
            <CardHeader><CardTitle>Frequently Asked Questions About DNS Speed</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {[
                { q: "How do I change my DNS server?", a: "On Windows 11: Settings → Network & Internet → your adapter → Edit → Manual → enter your DNS (e.g. 1.1.1.1). On macOS: System Settings → Network → Details → DNS tab. On Android: Settings → Private DNS → enter cloudflare-dns.com. On iPhone: Wi-Fi settings → Configure DNS → Manual. Best option: set DNS on your router — it applies to every device automatically." },
                { q: "Will a faster DNS actually make my internet faster?", a: "Yes — for the lookup phase. DNS queries happen before any content is downloaded. A resolver that's 100 ms faster than your ISP's makes every first visit to a website 100 ms faster. For pages with many third-party domains (ad networks, analytics), savings compound. Note: DNS does not affect download speed of files once a connection is established." },
                { q: "Is Cloudflare 1.1.1.1 really the fastest DNS?", a: "Globally and on average, yes — Cloudflare's Anycast network places resolvers near all major internet exchange points. But DNS speed is location-dependent. Our test measures from your actual connection, so if you're in an area where Google or Quad9 has a closer PoP, they may win for you. Always test, don't guess." },
                { q: "What is DNS-over-HTTPS (DoH)?", a: "Standard DNS uses plain-text UDP on port 53 — your ISP and any network observer can see every domain you resolve. DNS-over-HTTPS (DoH) encrypts queries inside a standard HTTPS connection on port 443. It's indistinguishable from normal web traffic, making it impossible for ISPs to intercept or censor by blocking DNS ports. Cloudflare, Google, and Quad9 all support DoH." },
                { q: "Should I use 1.1.1.1 or 8.8.8.8?", a: "Both are excellent choices. Cloudflare 1.1.1.1 has the strongest privacy policy (audited by KPMG, no query logging) and is generally faster. Google 8.8.8.8 has an equally large network and slightly more lenient privacy terms. For maximum privacy, use Cloudflare. For malware blocking, use Quad9 9.9.9.9. Run this test to see which is fastest from your specific location." },
                { q: "Can changing DNS fix my internet speed?", a: "Only if your ISP's DNS is unusually slow (over 100 ms). In that case, switching to Cloudflare or Google can noticeably speed up browsing. If your ISP's DNS is already fast (under 30 ms), the perceived improvement will be minimal. DNS also won't fix packet loss, bufferbloat, or insufficient bandwidth — use our other tools to diagnose those separately." },
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
              <p className="text-sm text-muted-foreground mb-4">DNS is the first step of every connection. Check the rest of the chain too:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { href: "/ping-test",           label: "Ping Test",            icon: Clock,      desc: "Post-DNS latency baseline" },
                  { href: "/jitter-test",          label: "Jitter Test",          icon: Activity,   desc: "Connection consistency" },
                  { href: "/packet-loss-test",     label: "Packet Loss Test",     icon: Wifi,       desc: "Dropped packet detection" },
                  { href: "/bufferbloat-test",     label: "Bufferbloat Test",     icon: BarChart2,  desc: "Router lag under load" },
                  { href: "/bandwidth-calculator", label: "Bandwidth Calculator", icon: Zap,        desc: "MB/s ↔ Mbps conversion" },
                  { href: "/",                     label: "Full Speed Test",      icon: Globe,      desc: "Download, upload & jitter" },
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
