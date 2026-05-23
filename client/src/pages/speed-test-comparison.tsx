import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpeedTestModal from "@/components/SpeedTestModal";
import { ChevronDown, Scale, Zap, Gauge, Layers } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Which internet speed test is the most accurate?",
    a: "None of them prints a universal “truth” number. Accuracy depends on what you measure: throughput to your ISP’s closet, to a CDN, or cross-internet latency under load. The best workflow is running the same test three times over Ethernet during off-peak hours, plus at least two different methodologies (nearby throughput + a real-world path check), then averaging.",
  },
  {
    q: "Why does Speedtest.net say 300 Mbps but Fast.com shows 80 Mbps?",
    a: "That usually means different networks and congestion points—not that one lied. Ookla’s Speedtest traditionally favours geographically close measurement servers inside or near your ISP, which captures peak throughput. Netflix’s Fast.com measures toward Netflix CDN paths; if congestion or peering is worse on that path, the number drops. Streaming issues while “speedtests look fine” often show up specifically on CDN paths.",
  },
  {
    q: "Is Fast.com faster or more trustworthy than Speedtest.net?",
    a: "Fast.com prioritises simplicity and Netflix-relevant throughput; Speedtest exposes more controls and wider server geography. Neither is objectively “better”—they optimise for different questions. Netflix documents that Fast emphasises download first because consuming video is downstream-heavy.",
  },
  {
    q: "What does Google’s speed test measure?",
    a: "The Google-hosted speed widget uses Measurement Lab (M-Lab) infrastructure. Traffic may leave your ISP differently than ISP-hosted testers, helping surface routing issues that flattering local servers hide. Treat it like another vantage point—not a courtroom verdict.",
  },
  {
    q: "How do cloud-based speed tests (Cloudflare etc.) compare?",
    a: "Some CDNs expose tests that saturate edge connections across many regions. Useful for diagnosing throughput to hyperscale clouds, similar to diagnosing streaming CDN paths—but still not identical to Zoom, gaming, or your employer’s VPN path.",
  },
  {
    q: "Which speed test should I use before calling my ISP?",
    a: "Document three runs on wired Ethernet showing date/time + screenshot. Pair a nearby throughput test with at least one “real path” sanity check plus our ping, jitter, packet loss and bufferbloat tools. Slow upload or lag during downloads is rarely visible in throughput-only screenshots.",
  },
  {
    q: "Does Speed Test & Boost replace Speedtest.net or Fast.com?",
    a: "No—we complement them. Use major brands when you specifically need peered servers or vendor-specific CDN paths; use Speed Test & Boost when you want an ad-light browser toolkit for latency, jitter, packet loss, bufferbloat, DNS resolution and calculators in one cohesive workflow.",
  },
  {
    q: "What extra metrics beyond Mbps matter for Zoom and gaming?",
    a: "Upload stability, jitter, packet loss and bufferbloat dominate video calls and competitive games more than headline download Mbps. Mbps answers “how fat the pipe feels”; jitter and unloaded vs loaded latency answer “whether the pipe feels sticky when saturated.”",
  },
];

export default function SpeedTestComparison() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  useEffect(() => {
    const title =
      "Speed Test Comparison 2026: Speedtest vs Fast vs Google & Diagnostics";
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Expert comparison of Speedtest (Ookla), Fast.com, Google/M-Lab, and CDN tests. Understand why results differ—and how ad-free jitter, packet loss, bufferbloat and DNS diagnostics complete the picture.",
      );
    }

    setCanonicalHref("https://speedtestboost.com/speed-test-comparison");

    const og = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    const tw = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    og("og:title", title);
    og(
      "og:description",
      "Compare mainstream speed tests and learn why Mbps numbers disagree. Finish with jitter, packet loss, bufferbloat and DNS tooling that throughput-only testers skip.",
    );
    og("og:type", "article");
    og("og:url", "https://speedtestboost.com/speed-test-comparison");
    og("og:image", "https://speedtestboost.com/apple-touch-icon.png");

    tw("twitter:card", "summary_large_image");
    tw("twitter:title", title);
    tw(
      "twitter:description",
      "Understand Speedtest vs Fast vs Google measurements—and benchmark jitters, losses, DNS and bufferbloat with Speed Test & Boost.",
    );
    tw("twitter:image", "https://speedtestboost.com/apple-touch-icon.png");

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://speedtestboost.com/speed-test-comparison#article",
          headline: title,
          description:
            "Neutral educational comparison of mainstream internet throughput testers with guidance on diagnosing latency-heavy issues.",
          author: {
            "@type": "Organization",
            name: "Speed Test & Boost",
          },
          publisher: {
            "@type": "Organization",
            name: "Speed Test & Boost",
            logo: {
              "@type": "ImageObject",
              url: "https://speedtestboost.com/apple-touch-icon.png",
            },
          },
          datePublished: "2026-05-23",
          dateModified: "2026-05-23",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://speedtestboost.com/speed-test-comparison",
          },
          articleSection: "Networking",
          keywords: [
            "speedtest vs fast",
            "ookla accuracy",
            "internet speed test comparison",
            "why speed tests differ",
            "bufferbloat",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": "https://speedtestboost.com/speed-test-comparison#faq",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "speed-test-comparison-structured-data";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector("#speed-test-comparison-structured-data");
      if (existing) existing.remove();
      [
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:type"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]',
      ].forEach((sel) => {
        const t = document.querySelector(sel);
        if (t) t.remove();
      });
    };
  }, []);

  const toggleFaq = (i: number) => {
    setOpenFaqs((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/speed-test-comparison" />

      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Speed test comparison", href: "/speed-test-comparison" },
            ]}
          />

          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <Scale className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Speed test comparison hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Big brands optimise for throughput to different networks. Understand what each flagship tester is really measuring,
              why Mbps numbers collide, and which diagnostic layers—latency, jitter, loss, DNS, bufferbloat—close the gaps they leave open.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              onClick={() => setShowSpeedTest(true)}
            >
              <Zap className="mr-2 h-5 w-5" />
              Run our free throughput test
            </Button>
          </div>

          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Gauge className="h-6 w-6 text-primary" />
                Competitor playbook in one sentence
              </h2>
              <p className="text-muted-foreground">
                Leaders such as Speedtest&nbsp;powered&nbsp;by&nbsp;Ookla own brand trust plus massive selectable server footprints; Fast&nbsp;owns streaming simplicity plus Netflix-aligned routes; Measurement&nbsp;Lab–backed tooling stresses academic transparency in routing.
                The traffic engine behind each is authoritative education—tables, FAQs, “why scores differ”—so searchers researching “Speedtest&nbsp;vs&nbsp;Fast” land on explanatory hubs, not naked widgets. This page fills that informational intent for Speed Test&nbsp;&amp;&nbsp;Boost while plugging you into tooling smaller comparison blogs only link externally.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-10">
            <CardContent className="p-0">
              <p className="text-xs text-muted-foreground px-4 pt-4">
                Comparison is informational only; throughput depends on geography, ISP peering and time of day.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th scope="col" className="text-left p-3 font-semibold">
                        Product
                      </th>
                      <th scope="col" className="text-left p-3 font-semibold">
                        Primary strength
                      </th>
                      <th scope="col" className="text-left p-3 font-semibold hidden sm:table-cell">
                        Typical routing
                      </th>
                      <th scope="col" className="text-left p-3 font-semibold">
                        Highlights
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium align-top">
                        <a href="https://www.speedtest.net/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          Speedtest (Ookla)
                        </a>
                      </td>
                      <td className="p-3 align-top text-muted-foreground">
                        Selecting nearby servers / ISP-adjacent paths for headline Mbps.
                      </td>
                      <td className="p-3 align-top text-muted-foreground hidden sm:table-cell">
                        Multi-thread saturate to geographically close measurement nodes.
                      </td>
                      <td className="p-3 align-top text-muted-foreground">
                        Broad global coverage, familiar UI, jitter on many runs—but still throughput-first UX.
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium align-top">
                        <a href="https://fast.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          Fast.com (Netflix)
                        </a>
                      </td>
                      <td className="p-3 align-top text-muted-foreground">
                        Ultra-minimal throughput test aligned with Netflix CDN reality.
                      </td>
                      <td className="p-3 align-top text-muted-foreground hidden sm:table-cell">
                        Netflix Open Connect CDN; exposes loaded vs unloaded latency when expanded.
                      </td>
                      <td className="p-3 align-top text-muted-foreground">
                        Ad-light; excels at proving whether streaming workloads differ from ISP vanity numbers.
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium align-top">
                        Google speed test&nbsp;<span className="font-normal text-muted-foreground">(M-Lab)</span>
                      </td>
                      <td className="p-3 align-top text-muted-foreground">
                        Research-backed measurement that may exit your ISP unconventionally.
                      </td>
                      <td className="p-3 align-top text-muted-foreground hidden sm:table-cell">
                        Measurement&nbsp;Lab path selection—useful anomaly detection versus ISP-hosted testers.
                      </td>
                      <td className="p-3 align-top text-muted-foreground">
                        Great second opinion when lobbying ISPs—pair with ethernet + timestamps.
                      </td>
                    </tr>
                    <tr className="border-b bg-muted/20">
                      <td className="p-3 font-medium align-top">Speed&nbsp;Test&nbsp;&amp;&nbsp;Boost</td>
                      <td className="p-3 align-top text-muted-foreground">
                        Full-stack browser diagnostics beyond a single Mbps readout—without heavy ads.
                      </td>
                      <td className="p-3 align-top text-muted-foreground hidden sm:table-cell">
                        HTML5 toolchain emphasising jitter, DNS, loss, router bufferbloat, Wi-Fi sweeps.
                      </td>
                      <td className="p-3 align-top text-muted-foreground">
                        Pairs with incumbent testers: run theirs for vendor-specific vantage points—then ours for stability metrics they rarely foreground.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground px-4 pb-4 pt-2">
                Trademark notice: Speedtest and Ookla are trademarks of Ookla; Fast.com and Netflix trademarks belong to Netflix. Names used here only for factual comparison.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card>
              <CardContent className="p-6">
                <Layers className="h-8 w-8 text-primary mb-3" />
                <h2 className="text-xl font-semibold mb-2">Why Mbps disagrees</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li>Different CDN or measurement PoP geography changes congestion.</li>
                  <li>TCP parallelism (multi-connection) squeezes buffers differently per implementation.</li>
                  <li>Wi-Fi vs ethernet vs VPN completely changes attainable PHY rate.</li>
                  <li>Bufferbloat inflates pings only when saturated—Throughput-only tests hide it.</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-primary mb-3" />
                <h2 className="text-xl font-semibold mb-2">What we add that throughput widgets skip</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li>
                    <Link href="/jitter-test" className="text-primary hover:underline">
                      Jitter
                    </Link>{" "}
                    for voice/game stability.
                  </li>
                  <li>
                    <Link href="/packet-loss-test" className="text-primary hover:underline">
                      Packet loss
                    </Link>{" "}
                    hunts rubber-banding.
                  </li>
                  <li>
                    <Link href="/bufferbloat-test" className="text-primary hover:underline">
                      Bufferbloat grading
                    </Link>{" "}
                    exposes router queue blowouts.
                  </li>
                  <li>
                    <Link href="/dns-speed-test" className="text-primary hover:underline">
                      DNS benchmarking
                    </Link>{" "}
                    for snappier web feels.
                  </li>
                  <li>
                    <Link href="/wifi-analyzer" className="text-primary hover:underline">
                      Wi-Fi analyser workflow
                    </Link>{" "}
                    for RF issues.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardContent className="p-6 space-y-3 text-muted-foreground text-sm leading-relaxed">
              <p>
                Challenger sites attracting organic downloads build “hub & spoke” topical authority: cornerstone explainers (&ldquo;speed&nbsp;tests&nbsp;compared,&rdquo; &ldquo;best internet&nbsp;speed&nbsp;test for gaming&rdquo;)
                funnel into interactive tools. Household-name brands monetise placements; independent publishers win on depth, neutrality, diagnostics variety, and UX speed. Speed Test&nbsp;&amp;&nbsp;Boost leans second—education plus an integrated lab you can bookmark.
              </p>
              <p>
                Already happy with headline Mbps? Tie it back to subjective quality: chase{" "}
                <Link href="/internet-speed-requirements" className="text-primary hover:underline">
                  activity-based requirements
                </Link>,{" "}
                <Link href="/upload-speed-guide" className="text-primary hover:underline">
                  upload parity
                </Link>,{" "}
                then{" "}
                <Link href="/speed-test-faq" className="text-primary hover:underline">
                  FAQ nuances
                </Link>{" "}
                readers expect from specialised blogs—without leaving our ecosystem.
              </p>
            </CardContent>
          </Card>

          <section className="mb-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold mb-6 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => (
                <Card key={item.q} className="border-border/60">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center gap-3 hover:bg-muted/40 transition-colors"
                  >
                    <span className="font-semibold text-foreground">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform ${openFaqs.includes(idx) ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaqs.includes(idx) && (
                    <CardContent className="pt-0 pb-4 px-5 text-muted-foreground text-sm leading-relaxed">{item.a}</CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/internet-providers" className="text-primary hover:underline">
              Browse ISP hubs
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/download-speed-guide" className="text-primary hover:underline">
              Mbps explained
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/site-index" className="text-primary hover:underline">
              Full HTML index
            </Link>
          </div>
        </div>
      </main>

      <GenericFooter />
      {showSpeedTest && <SpeedTestModal onClose={() => setShowSpeedTest(false)} />}
    </div>
  );
}
