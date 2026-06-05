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
  HelpCircle, Zap, Wifi, Router, Clock, BarChart2,
  Activity, Globe, Monitor, Smartphone, ChevronDown,
  CheckCircle, AlertTriangle, TrendingDown, Shield,
} from "lucide-react";

const PAGE_TITLE = "Why Is My Internet So Slow? 14 Causes & How to Fix Them (2026)";
const PAGE_DESC =
  "Is your internet slow? Diagnose the real cause — from router issues to ISP throttling, WiFi interference, congestion, and DNS problems — with our free tool checklist. Step-by-step fixes for every scenario.";
const PAGE_URL = "https://speedtestboost.com/why-is-my-internet-slow";

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

    let ld = document.querySelector('script[data-page="why-is-my-internet-slow"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "why-is-my-internet-slow");
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
          articleSection: "Networking & Troubleshooting",
          keywords: ["why is my internet slow", "internet slow fix", "slow internet causes", "internet speed troubleshooting", "how to fix slow internet"],
        },
        {
          "@type": "FAQPage",
          "@id": `${PAGE_URL}#faq`,
          mainEntity: [
            { "@type": "Question", name: "Why is my internet slow all of a sudden?", acceptedAnswer: { "@type": "Answer", text: "Sudden slow internet is usually caused by: (1) ISP network outage or congestion, (2) your router/modem needing a restart, (3) a bandwidth-hungry app running in the background (e.g. Windows Update, cloud backup), (4) your WiFi channel becoming congested due to neighbours. First step: restart your router, then run a speed test. If speed is still low, check your ISP's status page." } },
            { "@type": "Question", name: "Why is my WiFi slow but Ethernet is fast?", acceptedAnswer: { "@type": "Answer", text: "If Ethernet is fast but WiFi is slow, the problem is in your wireless signal, not your ISP. Common causes: too far from router, walls/obstructions blocking signal, WiFi channel congestion (many nearby networks on same channel), outdated WiFi adapter driver, or an overloaded 2.4GHz band. Try switching to 5GHz, moving closer to your router, or changing your WiFi channel in the router settings." } },
            { "@type": "Question", name: "Why is my internet slow only in the evening?", acceptedAnswer: { "@type": "Answer", text: "Consistently slow internet in the evening (6–11 PM) is almost always network congestion — either at your ISP's local node or deliberate peak-hour throttling. Your ISP shares bandwidth between subscribers. When everyone streams after work, the shared infrastructure gets overloaded. This is especially common with cable internet. Contact your ISP or consider upgrading to a fibre connection." } },
            { "@type": "Question", name: "Can too many devices slow my internet?", acceptedAnswer: { "@type": "Answer", text: "Yes. Each device using your connection at the same time shares your total bandwidth. If you have a 100 Mbps connection and 10 devices each streaming at 15 Mbps, you'll be over capacity. Check your router admin panel to see all connected devices. Also check if any device is running a background update, backup, or download." } },
            { "@type": "Question", name: "How do I know if my router is causing slow internet?", acceptedAnswer: { "@type": "Answer", text: "Test on Ethernet directly into your modem (bypassing the router) and run a speed test. If speeds are normal bypassing the router but slow through it, your router is the bottleneck. This can be caused by an overloaded router CPU (common on cheap routers), outdated firmware, too many connected devices, or bufferbloat. Try a router restart and check for firmware updates." } },
            { "@type": "Question", name: "Does a VPN slow down my internet?", acceptedAnswer: { "@type": "Answer", text: "A VPN adds 5–30% overhead due to encryption and routing through an additional server. If your internet feels slow while on VPN, try changing to a VPN server geographically closer to you, or switch VPN protocols (WireGuard is the fastest modern protocol). If internet feels slow without a VPN, the VPN is not the problem." } },
          ],
        },
      ],
    });
    return () => { ld?.remove(); };
  }, []);
}

const CAUSES = [
  {
    category: "ISP & Network",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: Globe,
    items: [
      { icon: TrendingDown, title: "ISP network congestion (peak hours)", desc: "Shared cable/DSL connections slow down 6–11 PM when everyone streams. Run speed tests at 8 AM vs 8 PM. A 30%+ drop points to peak-hour congestion.", fix: "Contact ISP or consider fibre upgrade", toolHref: "/", toolLabel: "Compare speeds morning vs evening" },
      { icon: Shield, title: "ISP throttling specific traffic", desc: "ISPs deliberately slow Netflix, YouTube, gaming or torrents. Speed test looks fine but streaming buffers. VPN recovers full speed.", fix: "Document with speed tests and use a VPN to confirm", toolHref: "/isp-throttling-test", toolLabel: "ISP Throttling Test" },
      { icon: AlertTriangle, title: "You're on a shared plan at data cap", desc: "Many ISPs slow connections after you hit your monthly data cap (10–20 Mbps vs your usual 300 Mbps). Check your ISP account portal.", fix: "Check ISP portal for data usage", toolHref: null, toolLabel: null },
    ],
  },
  {
    category: "Router & Modem",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: Router,
    items: [
      { icon: Router, title: "Router needs a restart", desc: "Routers can become unresponsive or fill their ARP tables after days of uptime. A restart clears state and often restores full speed.", fix: "Unplug for 30 seconds and restart", toolHref: null, toolLabel: null },
      { icon: BarChart2, title: "Router bufferbloat (latency under load)", desc: "Your router's buffer fills up causing 200–500ms ping spikes whenever anyone downloads. Netflix stutters when someone else browses. Check your A–F grade.", fix: "Enable SQM/CAKE on router, or upgrade router", toolHref: "/bufferbloat-test", toolLabel: "Run Bufferbloat Test" },
      { icon: AlertTriangle, title: "Outdated router hardware", desc: "Old routers (802.11n / pre-2018) can't route gigabit traffic fast enough. If your ISP gives you 500 Mbps but you get 150 Mbps, the router CPU is the bottleneck.", fix: "Check router specs; upgrade if over 5 years old", toolHref: null, toolLabel: null },
    ],
  },
  {
    category: "WiFi & Signal",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: Wifi,
    items: [
      { icon: Wifi, title: "Too far from router / obstacles", desc: "WiFi signal weakens dramatically through walls, floors, and metallic objects. 5GHz WiFi is worse at penetrating walls than 2.4GHz but faster when close.", fix: "Move closer, use 2.4GHz for coverage or Ethernet", toolHref: "/wifi-analyzer", toolLabel: "WiFi Analyzer" },
      { icon: Activity, title: "WiFi channel congestion", desc: "If 10 of your neighbours are all on channel 6 (2.4GHz), speeds drop significantly. Use our WiFi analyzer to find the least congested channel and switch in router settings.", fix: "Change WiFi channel in router admin panel", toolHref: "/wifi-analyzer", toolLabel: "WiFi Analyzer" },
      { icon: Zap, title: "Microwave / cordless phone interference (2.4GHz)", desc: "Microwave ovens and older cordless phones emit interference on the 2.4GHz band. If WiFi drops when the microwave runs, switch to 5GHz.", fix: "Switch to 5GHz band or relocate router", toolHref: null, toolLabel: null },
    ],
  },
  {
    category: "Device & Software",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: Monitor,
    items: [
      { icon: Smartphone, title: "Background apps using bandwidth", desc: "Windows Update, iCloud, Google Drive, OneDrive, and antivirus scans can consume all your bandwidth silently. Check Task Manager > Performance > Ethernet.", fix: "Check Task Manager for network usage", toolHref: null, toolLabel: null },
      { icon: Monitor, title: "Malware / unwanted software", desc: "Malware can use your connection for spam, crypto mining, or DDoS attacks. Run a malware scan if you see unexplained high network usage.", fix: "Run a full malware scan", toolHref: null, toolLabel: null },
      { icon: Globe, title: "Slow DNS resolver", desc: "Every website visit starts with a DNS lookup. If your ISP's DNS is slow (50–300ms per lookup vs Cloudflare's 10ms), pages feel sluggish even with fast broadband.", fix: "Switch to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google)", toolHref: "/dns-speed-test", toolLabel: "DNS Speed Test" },
      { icon: Clock, title: "High ping / packet loss to game servers", desc: "For gamers, slow internet often means high latency or packet loss — not low Mbps. Test these separately to pinpoint the cause.", fix: "Run ping and packet loss tests", toolHref: "/gaming-speed-test", toolLabel: "Gaming Speed Test" },
    ],
  },
];

const CHECKLIST = [
  { step: "1", text: "Run a speed test on Ethernet (not WiFi)", toolHref: "/", toolLabel: "Speed Test" },
  { step: "2", text: "Restart your router and modem (30-second power cycle)", toolHref: null, toolLabel: null },
  { step: "3", text: "Check your ISP's status page for outages", toolHref: null, toolLabel: null },
  { step: "4", text: "Run bufferbloat test to grade your router's latency under load", toolHref: "/bufferbloat-test", toolLabel: "Bufferbloat Test" },
  { step: "5", text: "Check packet loss (even 0.5% causes major issues)", toolHref: "/packet-loss-test", toolLabel: "Packet Loss Test" },
  { step: "6", text: "Test WiFi vs Ethernet — rule out wireless as the problem", toolHref: "/wifi-analyzer", toolLabel: "WiFi Analyzer" },
  { step: "7", text: "Check your DNS resolver speed", toolHref: "/dns-speed-test", toolLabel: "DNS Speed Test" },
  { step: "8", text: "Test at 8 AM and 8 PM — check for peak-hour throttling", toolHref: "/isp-throttling-test", toolLabel: "Throttling Guide" },
];

const FAQ_ITEMS = [
  { q: "Why is my internet slow all of a sudden?", a: "Sudden slow internet is usually caused by: (1) ISP network outage or congestion, (2) your router/modem needing a restart, (3) a bandwidth-hungry app running in the background (e.g. Windows Update, cloud backup), (4) your WiFi channel becoming congested due to neighbours. First step: restart your router, then run a speed test. If speed is still low, check your ISP's status page." },
  { q: "Why is my WiFi slow but Ethernet is fast?", a: "If Ethernet is fast but WiFi is slow, the problem is in your wireless signal, not your ISP. Common causes: too far from router, walls/obstructions blocking signal, WiFi channel congestion (many nearby networks on same channel), outdated WiFi adapter driver, or an overloaded 2.4GHz band. Try switching to 5GHz, moving closer to your router, or changing your WiFi channel in the router settings." },
  { q: "Why is my internet slow only in the evening?", a: "Consistently slow internet in the evening (6–11 PM) is almost always network congestion — either at your ISP's local node or deliberate peak-hour throttling. Your ISP shares bandwidth between subscribers. When everyone streams after work, the shared infrastructure gets overloaded. This is especially common with cable internet. Contact your ISP or consider upgrading to a fibre connection." },
  { q: "Can too many devices slow my internet?", a: "Yes. Each device using your connection at the same time shares your total bandwidth. If you have a 100 Mbps connection and 10 devices each streaming at 15 Mbps, you'll be over capacity. Check your router admin panel to see all connected devices. Also check if any device is running a background update, backup, or download." },
  { q: "How do I know if my router is causing slow internet?", a: "Test on Ethernet directly into your modem (bypassing the router) and run a speed test. If speeds are normal bypassing the router but slow through it, your router is the bottleneck. This can be caused by an overloaded router CPU (common on cheap routers), outdated firmware, too many connected devices, or bufferbloat. Try a router restart and check for firmware updates." },
  { q: "Does a VPN slow down my internet?", a: "A VPN adds 5–30% overhead due to encryption and routing through an additional server. If your internet feels slow while on VPN, try changing to a VPN server geographically closer to you, or switch VPN protocols (WireGuard is the fastest modern protocol). If internet feels slow without a VPN, the VPN is not the problem." },
];

export default function WhyIsMyInternetSlow() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const toggleFaq = (i: number) =>
    setOpenFaqs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/why-is-my-internet-slow" />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Why Is My Internet Slow?", href: "/why-is-my-internet-slow" },
          ]} />

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-blue-500/10">
                <HelpCircle className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-blue-500/40 text-blue-400">Free Diagnostic Guide · No Download</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Why Is My Internet Slow?
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              14 common causes of slow internet — from ISP throttling to router bufferbloat — and exactly how to diagnose and fix each one using free tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90"
                onClick={() => setShowSpeedTest(true)}
              >
                <Zap className="mr-2 h-5 w-5" />
                Run Diagnostic Speed Test
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#checklist">Quick 8-step checklist ↓</a>
              </Button>
            </div>
          </div>

          {/* Quick 8-step checklist */}
          <section id="checklist" className="mb-12" aria-labelledby="checklist-heading">
            <h2 id="checklist-heading" className="text-2xl font-bold mb-2">Quick 8-step diagnostic checklist</h2>
            <p className="text-muted-foreground mb-6">Work through these in order. Most slow-internet problems are solved in the first 4 steps.</p>
            <div className="space-y-3">
              {CHECKLIST.map(item => (
                <Card key={item.step} className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">{item.step}</div>
                    <p className="flex-1 text-sm text-foreground">{item.text}</p>
                    {item.toolHref && (
                      <Button size="sm" variant="outline" asChild className="shrink-0">
                        <Link href={item.toolHref}>{item.toolLabel}</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Causes by category */}
          <section className="mb-12" aria-labelledby="causes-heading">
            <h2 id="causes-heading" className="text-2xl font-bold mb-2">14 causes of slow internet — diagnosed</h2>
            <p className="text-muted-foreground mb-8">Click any tool link to diagnose that specific cause. Each test runs in your browser in under 2 minutes.</p>
            <div className="space-y-8">
              {CAUSES.map(cat => (
                <div key={cat.category}>
                  <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${cat.border}`}>
                    <div className={`p-1.5 rounded-lg ${cat.bg}`}>
                      <cat.icon className={`h-5 w-5 ${cat.color}`} />
                    </div>
                    <h3 className={`text-lg font-semibold ${cat.color}`}>{cat.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {cat.items.map(item => (
                      <Card key={item.title} className="border-border/50">
                        <CardContent className="p-5">
                          <div className="flex gap-3 items-start">
                            <div className={`p-2 rounded-lg ${cat.bg} shrink-0`}>
                              <item.icon className={`h-5 w-5 ${cat.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
                              <div className="flex flex-wrap gap-2 items-center">
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                                  <span className="text-xs text-muted-foreground">Fix: {item.fix}</span>
                                </div>
                                {item.toolHref && (
                                  <Button size="sm" variant="outline" className="h-7 text-xs px-3" asChild>
                                    <Link href={item.toolHref}>{item.toolLabel} →</Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick wins */}
          <Card className="mb-12 border-green-500/20 bg-green-500/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-400" />
                Quick wins — try these first
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Restart your router", d: "Clears state, flushes ARP tables. Takes 90 seconds. Fixes 30% of slow-internet cases." },
                  { t: "Use Ethernet instead of WiFi", d: "Cuts out 10–50ms WiFi latency and eliminates interference. Single biggest improvement for most users." },
                  { t: "Switch to 5GHz WiFi", d: "Less congested than 2.4GHz. Use for devices close to the router." },
                  { t: "Change DNS to 1.1.1.1", d: "Cloudflare DNS is consistently the fastest globally. Makes pages load faster even on slow connections." },
                  { t: "Close background applications", d: "Windows Update / iCloud can saturate your upload or download silently. Check Task Manager." },
                  { t: "Reboot your modem (separate from router)", d: "Modems can lose their DSL/cable line sync. A reboot re-establishes a fresh sync." },
                ].map(w => (
                  <div key={w.t} className="flex gap-3 p-3 rounded-lg border border-green-500/20 bg-background/50">
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{w.t}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{w.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All tools grid */}
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Free diagnostic tools on this site</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { href: "/", label: "Speed Test", desc: "Baseline Mbps", icon: Zap },
                  { href: "/bufferbloat-test", label: "Bufferbloat Test", desc: "Router latency under load", icon: BarChart2 },
                  { href: "/packet-loss-test", label: "Packet Loss Test", desc: "Dropped packets", icon: Activity },
                  { href: "/ping-test", label: "Ping Test", desc: "Latency to servers", icon: Clock },
                  { href: "/jitter-test", label: "Jitter Test", desc: "Ping stability", icon: Activity },
                  { href: "/dns-speed-test", label: "DNS Speed Test", desc: "Fastest resolver", icon: Globe },
                  { href: "/wifi-analyzer", label: "WiFi Analyzer", desc: "Channel congestion", icon: Wifi },
                  { href: "/isp-throttling-test", label: "ISP Throttling Test", desc: "Is your ISP slowing you?", icon: Shield },
                  { href: "/gaming-speed-test", label: "Gaming Speed Test", desc: "Lag diagnostics for games", icon: BarChart2 },
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
              { href: "/gaming-speed-test", label: "Gaming speed test" },
              { href: "/bufferbloat-test", label: "Bufferbloat test" },
              { href: "/internet-speed-requirements", label: "Speed requirements guide" },
              { href: "/speed-test-comparison", label: "Speed test comparison" },
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
