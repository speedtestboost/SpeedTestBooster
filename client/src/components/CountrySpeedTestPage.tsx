import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Zap } from "lucide-react";
import { Link } from "wouter";

interface CountrySpeedTestPageProps {
  countryName: string;
  countryCode: string;
  slug: string;
  providersText: string;
}

export default function CountrySpeedTestPage({
  countryName,
  countryCode,
  slug,
  providersText,
}: CountrySpeedTestPageProps) {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const canonicalUrl = `https://speedtestboost.com/${slug}`;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.title = `${countryName} Speed Test - Check Internet Speed Free 2026`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Run a free ${countryName} speed test for accurate download, upload, ping and jitter. Compare broadband performance across ${countryName} ISPs in seconds.`,
      );
    }

    setCanonicalHref(canonicalUrl);

    return () => {
      /* Next page's useEffect sets canonical; do not reset here (would race on client nav). */
    };
  }, [countryName, canonicalUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath={`/${slug}`} />
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: `${countryName} Speed Test`, href: `/${slug}` }]} />

          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-primary/10">
                <Globe className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {countryName} Speed Test
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Check your real-time internet speed in {countryName}. Measure download, upload, ping,
              and jitter, then compare performance across major providers like {providersText}.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              onClick={() => setShowSpeedTest(true)}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start {countryName} Speed Test
            </Button>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-3">How to use this page</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>Run multiple tests at different times for a realistic average.</li>
                <li>Use Ethernet for baseline speed; then test on Wi-Fi for daily performance.</li>
                <li>Compare your result with your ISP plan speed and nearby provider pages.</li>
              </ul>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode={countryCode} currentProviderSlug="" />

          <Card className="mt-8 border-dashed">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Explore more on Speed Test &amp; Boost</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Country hubs, ISP pages, and tools are linked from our main directory so every page is easy to find.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href="/" className="text-primary hover:underline font-medium">
                  Home speed test
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link href="/internet-providers" className="text-primary hover:underline font-medium">
                  All countries &amp; ISPs
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link href="/site-index" className="text-primary hover:underline font-medium">
                  Full HTML site index
                </Link>
                <span className="text-muted-foreground">·</span>
                <Link href="/speed-test-faq" className="text-primary hover:underline font-medium">
                  Speed test FAQ
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <GenericFooter />

      {showSpeedTest && <SpeedTestModal onClose={() => setShowSpeedTest(false)} />}
    </div>
  );
}
