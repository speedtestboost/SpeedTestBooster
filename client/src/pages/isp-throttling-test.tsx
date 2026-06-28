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
  ShieldAlert, Zap, CheckCircle, XCircle, AlertTriangle,
  ChevronDown, Search, Wifi, Activity, Clock, BarChart2,
  TrendingDown, Eye, Lock, Globe,
} from "lucide-react";

// ─── SEO ─────────────────────────────────────────────────────────────────────
const PAGE_TITLE = "ISP Throttling Test 2026 — Detect If Your Internet Is Being Throttled";
const PAGE_DESC =
  "Free ISP throttling test. Find out if your internet provider is slowing down Netflix, gaming, YouTube or peak-hour traffic. Step-by-step throttle detection guide with free tools — no download required.";
const PAGE_URL = "https://speedtestboost.com/isp-throttling-test";

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

    let ld = document.querySelector('script[data-page="isp-throttling-test"]') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-page", "isp-throttling-test");
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
          articleSection: "Networking",
          keywords: ["isp throttling", "bandwidth throttling", "is my internet throttled", "how to detect throttling", "throttle test"],
        },
        {
          "@type": "FAQPage",
          "@id": `${PAGE_URL}#faq`,
          mainEntity: [
            { "@type": "Question", name: "How do I know if my ISP is throttling my internet?", acceptedAnswer: { "@type": "Answer", text: "Run a speed test on our site, then compare with Fast.com. If Fast.com shows significantly lower speeds than other tests, your ISP may be throttling Netflix traffic. For broader throttling, run a speed test in the morning and evening — if speeds drop 30%+ during peak hours (6–11 PM), throttling is likely. Enable a VPN and re-test: if speeds recover, your ISP is throttling based on traffic type." } },
            { "@type": "Question", name: "What is ISP throttling?", acceptedAnswer: { "@type": "Answer", text: "ISP throttling is when your internet provider deliberately slows your connection speed for specific types of traffic (Netflix, YouTube, torrents, gaming) or during peak hours. ISPs do this to manage network congestion and reduce bandwidth costs." } },
            { "@type": "Question", name: "Can I stop ISP throttling without a VPN?", acceptedAnswer: { "@type": "Answer", text: "Partially. Switching to a different DNS server (like Cloudflare 1.1.1.1 or Google 8.8.8.8) can help with DNS-based slowdowns. Using HTTPS-only browsing makes traffic type-based throttling harder. However, a VPN is the most reliable way to mask traffic type from your ISP." } },
            { "@type": "Question", name: "Is ISP throttling legal?", acceptedAnswer: { "@type": "Answer", text: "Legality varies by country. In the US, net neutrality rules were repealed in 2017, making throttling legal for ISPs. In the EU, net neutrality regulations generally prohibit throttling specific services. Check your local regulations, but throttling is widely practiced regardless." } },
            { "@type": "Question", name: "How do I test for Netflix throttling specifically?", acceptedAnswer: { "@type": "Answer", text: "Use our speed test then compare with Fast.com (Netflix's own speed test tool). If Fast.com shows dramatically slower speeds (e.g. 50 Mbps vs 300 Mbps on ours), your ISP is throttling the Netflix CDN path. This is a documented ISP practice." } },
            { "@type": "Question", name: "Which ISPs are known for throttling?", acceptedAnswer: { "@type": "Answer", text: "Studies by Netflix, M-Lab, and consumer groups have documented throttling by major ISPs including Comcast, AT&T, Verizon and others. However, throttling practices change over time. The best approach is to test your own connection regularly rather than rely on reputation." } },
            { "@type": "Question", name: "What is the fastest way to test if my ISP is throttling me?", acceptedAnswer: { "@type": "Answer", text: "Run our speed test to get baseline Mbps. Then run Fast.com for a Netflix-path comparison. Check our bufferbloat test to see loaded latency. Finally, run the speed test with a VPN enabled. If speeds improve substantially with a VPN, your ISP is throttling based on traffic type." } },
          ],
        },
      ],
    });
    return () => { ld?.remove(); };
  }, []);
}

// ─── Throttle step data ───────────────────────────────────────────────────────
const STEPS = [
  {
    num: 1,
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    title: "Run a baseline speed test",
    desc: "First, get your ISP's raw throughput number on an Ethernet connection with no VPN. This is your comparison baseline.",
    action: "Run Speed Test",
    actionHref: null as string | null,
    toolHref: "/",
    toolLabel: "Speed Test",
  },
  {
    num: 2,
    icon: TrendingDown,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    title: "Compare with Fast.com (Netflix path)",
    desc: "Fast.com tests toward Netflix's CDN. If it shows significantly less speed than step 1, your ISP is likely throttling streaming CDN paths.",
    action: null,
    actionHref: "https://fast.com/",
    toolHref: null,
    toolLabel: null,
  },
  {
    num: 3,
    icon: Clock,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    title: "Test at peak and off-peak hours",
    desc: "Run tests at 8 AM and again at 8 PM. A 30%+ speed drop during evening hours (6–11 PM) is a strong indicator of time-based throttling.",
    action: null,
    actionHref: null,
    toolHref: "/",
    toolLabel: "Schedule Speed Test",
  },
  {
    num: 4,
    icon: BarChart2,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    title: "Check your bufferbloat score",
    desc: "Throttled connections often show high bufferbloat — latency explodes under load. Run our bufferbloat test and check your A–F grade.",
    action: null,
    actionHref: null,
    toolHref: "/bufferbloat-test",
    toolLabel: "Run Bufferbloat Test",
  },
  {
    num: 5,
    icon: Activity,
    color: "text-red-400",
    bg: "bg-red-400/10",
    title: "Check packet loss and jitter",
    desc: "Throttled connections frequently show increased packet loss and jitter, especially under load. Test both for a fuller picture.",
    action: null,
    actionHref: null,
    toolHref: "/packet-loss-test",
    toolLabel: "Run Packet Loss Test",
  },
  {
    num: 6,
    icon: Lock,
    color: "text-green-400",
    bg: "bg-green-400/10",
    title: "Re-test with a VPN enabled",
    desc: "A VPN encrypts traffic so your ISP cannot identify what type of traffic it is. If your speeds improve significantly with a VPN, throttling is confirmed.",
    action: null,
    actionHref: null,
    toolHref: null,
    toolLabel: null,
    highlight: true,
  },
];

const SIGNALS = [
  { icon: TrendingDown, color: "text-red-400", title: "Speeds drop in the evening", desc: "Consistently slower 6–11 PM? Peak-hour congestion management is throttling." },
  { icon: Eye, color: "text-orange-400", title: "Netflix/YouTube buffers but tests look fine", desc: "CDN-specific throttling affects streaming paths while general tests still pass." },
  { icon: Activity, color: "text-yellow-400", title: "Gaming lags during downloads", desc: "High bufferbloat causes lag spikes when other devices are active." },
  { icon: Globe, color: "text-purple-400", title: "P2P / torrents are slow but other traffic isn't", desc: "ISPs commonly throttle peer-to-peer protocols via deep packet inspection." },
  { icon: Wifi, color: "text-blue-400", title: "Upload speeds feel asymmetrically throttled", desc: "Video calls and cloud backups suffer when upload bandwidth is capped." },
  { icon: Search, color: "text-green-400", title: "Speed recovers with VPN", desc: "The clearest signal. VPN hides traffic type — if speed returns, ISP is throttling by type." },
];

const FAQ_ITEMS = [
  { q: "How do I know if my ISP is throttling my internet?", a: "Run a speed test on our site, then compare with Fast.com. If Fast.com shows significantly lower speeds than other tests, your ISP may be throttling Netflix traffic. For broader throttling, run a speed test in the morning and evening — if speeds drop 30%+ during peak hours (6–11 PM), throttling is likely. Enable a VPN and re-test: if speeds recover, your ISP is throttling based on traffic type." },
  { q: "What is ISP throttling?", a: "ISP throttling is when your internet provider deliberately slows your connection speed for specific types of traffic (Netflix, YouTube, torrents, gaming) or during peak hours. ISPs do this to manage network congestion and reduce bandwidth costs." },
  { q: "Can I stop ISP throttling without a VPN?", a: "Partially. Switching to a different DNS server (like Cloudflare 1.1.1.1 or Google 8.8.8.8) can help with DNS-based slowdowns. Using HTTPS-only browsing makes traffic type-based throttling harder. However, a VPN is the most reliable way to mask traffic type from your ISP." },
  { q: "Is ISP throttling legal?", a: "Legality varies by country. In the US, net neutrality rules were repealed in 2017, making throttling legal for ISPs. In the EU, net neutrality regulations generally prohibit throttling specific services. Check your local regulations, but throttling is widely practiced regardless." },
  { q: "How do I test for Netflix throttling specifically?", a: "Use our speed test then compare with Fast.com (Netflix's own speed test tool). If Fast.com shows dramatically slower speeds (e.g. 50 Mbps vs 300 Mbps on ours), your ISP is throttling the Netflix CDN path. This is a documented ISP practice." },
  { q: "Which ISPs are known for throttling?", a: "Studies by Netflix, M-Lab, and consumer groups have documented throttling by major ISPs including Comcast, AT&T, Verizon and others. However, throttling practices change over time. The best approach is to test your own connection regularly rather than rely on reputation." },
  { q: "What is the fastest way to test if my ISP is throttling me?", a: "Run our speed test to get baseline Mbps. Then run Fast.com for a Netflix-path comparison. Check our bufferbloat test to see loaded latency. Finally, run the speed test with a VPN enabled. If speeds improve substantially with a VPN, your ISP is throttling based on traffic type." },
];

export default function ISPThrottlingTest() {
  useSEO();
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const toggleFaq = (i: number) =>
    setOpenFaqs(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/isp-throttling-test" />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "ISP Throttling Test", href: "/isp-throttling-test" },
          ]} />

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-red-500/10">
                <ShieldAlert className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <Badge variant="outline" className="mb-4 border-red-500/40 text-red-400">Free · No Download · No Sign-up</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              ISP Throttling Test
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Is your internet provider deliberately slowing you down? Follow our free, step-by-step throttle detection workflow — using tools already on this site — to find out in under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90"
                onClick={() => setShowSpeedTest(true)}
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Baseline Speed Test
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-to-test">See Detection Steps ↓</a>
              </Button>
            </div>
          </div>

          {/* Warning card */}
          <Card className="mb-10 border-orange-500/30 bg-orange-500/5">
            <CardContent className="p-5 flex gap-4 items-start">
              <AlertTriangle className="h-6 w-6 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">Important: test on Ethernet first</p>
                <p className="text-sm text-muted-foreground">
                  WiFi interference can look identical to throttling. Connect your device directly to the router via Ethernet cable before running any throttle tests. Close background apps and disconnect idle devices.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Signs of throttling */}
          <section className="mb-12" aria-labelledby="signs-heading">
            <h2 id="signs-heading" className="text-2xl font-bold mb-2">Signs your ISP is throttling you</h2>
            <p className="text-muted-foreground mb-6">Any of these patterns, especially in combination, are reliable indicators of throttling rather than genuine congestion.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {SIGNALS.map(sig => (
                <Card key={sig.title} className="border-border/50">
                  <CardContent className="p-4 flex gap-3 items-start">
                    <div className={`p-2 rounded-lg bg-muted/50 shrink-0`}>
                      <sig.icon className={`h-5 w-5 ${sig.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{sig.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{sig.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Step-by-step detection */}
          <section id="how-to-test" className="mb-12" aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="text-2xl font-bold mb-2">How to test for ISP throttling — step by step</h2>
            <p className="text-muted-foreground mb-8">Complete all 6 steps for a definitive result. Each step takes under 2 minutes.</p>

            <div className="space-y-5">
              {STEPS.map(step => (
                <Card key={step.num} className={`border-border/50 ${step.highlight ? "border-green-500/40 bg-green-500/5" : ""}`}>
                  <CardContent className="p-5">
                    <div className="flex gap-4 items-start">
                      <div className={`p-3 rounded-xl ${step.bg} shrink-0`}>
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-muted-foreground">STEP {step.num}</span>
                          {step.highlight && <Badge variant="outline" className="text-xs border-green-500/40 text-green-400">Definitive test</Badge>}
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{step.desc}</p>
                        {step.toolHref && (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={step.toolHref}>{step.toolLabel}</Link>
                          </Button>
                        )}
                        {step.actionHref && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={step.actionHref} target="_blank" rel="noopener noreferrer">{step.action ?? "Open Tool"}</a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How to interpret results */}
          <section className="mb-12" aria-labelledby="results-heading">
            <h2 id="results-heading" className="text-2xl font-bold mb-6">How to interpret your results</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-5">
                  <CheckCircle className="h-8 w-8 text-green-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">No throttling detected</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>Speeds consistent morning and evening</li>
                    <li>Fast.com matches speed test result</li>
                    <li>VPN doesn't improve speeds</li>
                    <li>Low bufferbloat (A or B grade)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="p-5">
                  <AlertTriangle className="h-8 w-8 text-yellow-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Possible throttling</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>20–30% speed drop in evenings</li>
                    <li>Fast.com slightly lower than baseline</li>
                    <li>Moderate bufferbloat (C grade)</li>
                    <li>Occasional lag during heavy use</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-5">
                  <XCircle className="h-8 w-8 text-red-400 mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Throttling confirmed</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>30%+ speed drop in evenings</li>
                    <li>Fast.com dramatically lower</li>
                    <li>VPN restores full speeds</li>
                    <li>Poor bufferbloat grade (D or F)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What to do if throttled */}
          <section className="mb-12" aria-labelledby="fix-heading">
            <h2 id="fix-heading" className="text-2xl font-bold mb-6">What to do if your ISP is throttling you</h2>
            <div className="space-y-3">
              {[
                { n: "1", title: "Document everything", body: "Screenshot your speed tests with date and time stamps across multiple days. Use our speed test, Fast.com, and Google's M-Lab test (Measurement Lab). You'll need this evidence when contacting your ISP or regulator." },
                { n: "2", title: "Contact your ISP in writing", body: "Call or email your ISP with your documented evidence. Ask specifically whether traffic shaping or bandwidth management policies are applied to your account. Request the policy in writing. This creates a paper trail." },
                { n: "3", title: "Switch DNS to Cloudflare or Google", body: "Change your DNS to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google). Some ISP slowdowns affect only DNS resolution, and switching resolvers can recover speed. Test our DNS speed test to find the fastest resolver for your location." },
                { n: "4", title: "Consider a VPN as a workaround", body: "A VPN encrypts traffic so your ISP cannot classify it. This prevents activity-based throttling. Note: VPNs add slight overhead (~5–10ms latency) and may not help with total bandwidth caps — only with type-specific throttling." },
                { n: "5", title: "File a complaint with your regulator", body: "In the US, file with the FCC. In the UK, contact Ofcom. In India, TRAI accepts consumer complaints. Documented, timestamped speed test evidence significantly strengthens your case." },
                { n: "6", title: "Consider switching ISP", body: "Compare ISPs in your area. Use our internet providers hub to find providers with better transparency and speed track records. Rural areas may have limited options, but cities often have 3–4 competing ISPs." },
              ].map(item => (
                <Card key={item.n} className="border-border/50">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-sm">{item.n}</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.body}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tool CTA row */}
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">All tools you need to diagnose throttling</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { href: "/", label: "Speed Test", desc: "Baseline throughput", icon: Zap },
                  { href: "/bufferbloat-test", label: "Bufferbloat Test", desc: "Latency under load (A–F grade)", icon: BarChart2 },
                  { href: "/packet-loss-test", label: "Packet Loss Test", desc: "Detect dropped packets", icon: Activity },
                  { href: "/ping-test", label: "Ping Test", desc: "Latency & consistency", icon: Clock },
                  { href: "/jitter-test", label: "Jitter Test", desc: "Ping variation over time", icon: Activity },
                  { href: "/dns-speed-test", label: "DNS Speed Test", desc: "Find fastest DNS resolver", icon: Globe },
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
              { href: "/speed-test-comparison", label: "Speed test comparison" },
              { href: "/bufferbloat-test", label: "Bufferbloat test" },
              { href: "/gaming-speed-test", label: "Gaming speed test" },
              { href: "/why-is-my-internet-slow", label: "Why is my internet slow?" },
              { href: "/internet-providers", label: "Compare ISPs" },
            ].map(l => (
              <span key={l.href}>
                <Link href={l.href} className="text-primary hover:underline">{l.label}</Link>
                {l.href !== "/internet-providers" && <span className="text-muted-foreground ml-4">·</span>}
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
