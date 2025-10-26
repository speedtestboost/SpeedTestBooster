import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function UnifiSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Unifi Speed Test Malaysia - Check FTTH Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Unifi FTTH fiber internet speed instantly - Free speed test for Malaysia. Accurate Telekom download/upload performance results in seconds.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/my/unifi';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Unifi Speed Test Malaysia",
      "description": "Test your Unifi fiber internet speed for free. Speed test for Telekom Malaysia Unifi customers across Malaysia.",
      "url": "https://speedtestboost.com/providers/my/unifi",
      "provider": {
        "@type": "Organization",
        "name": "Unifi",
        "description": "Malaysia's dominant fiber broadband brand by Telekom Malaysia offering nationwide FTTH services",
        "areaServed": { "@type": "Country", "name": "Malaysia" },
        "serviceType": ["Fiber Internet", "IPTV", "Home Phone", "Entertainment Bundle"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/my/unifi" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "Malaysia", href: "/internet-providers" },
              { label: "Unifi", href: "/providers/my/unifi" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Unifi Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Unifi fiber internet speed</span> for free. Check your Telekom Malaysia broadband performance across Malaysia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Unifi Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Unifi Malaysia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Unifi, Malaysia's dominant fiber broadband brand operated by Telekom Malaysia (TM), commands over 55% market share in the fixed broadband sector. As the nation's largest and most established internet service provider, Unifi delivers cutting-edge fiber-to-the-home (FTTH) connectivity to millions of Malaysian households and businesses through its comprehensive nationwide infrastructure spanning Peninsular Malaysia, Sabah, and Sarawak.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Nationwide FTTH Leadership</h3>
                <p className="text-muted-foreground">
                  Unifi's extensive fiber optic network reaches virtually every major city and town across Malaysia, from Kuala Lumpur and Penang to Kuching and Kota Kinabalu. With continuous infrastructure investment in TM's High-Speed Broadband (HSBB) initiative, Unifi provides reliable gigabit-capable connections to urban centers while steadily expanding coverage to suburban and rural areas. This comprehensive deployment ensures Unifi remains Malaysia's preferred choice for high-speed home and enterprise internet connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Gigabit Speeds & Entertainment Integration</h3>
                <p className="text-muted-foreground">
                  Unifi's fiber network delivers symmetrical speeds up to 800 Mbps, with select areas receiving 1 Gbps connectivity, supporting bandwidth-intensive applications like 4K streaming, cloud gaming, and smart home ecosystems. The service integrates seamlessly with Unifi TV (IPTV platform), Unifi Mobile convergence, and premium content partnerships including Astro and international streaming services. This comprehensive entertainment ecosystem positions Unifi as Malaysia's leading digital lifestyle enabler for modern households.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Test Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Unifi customers verify their internet performance matches subscribed service tiers. Our Unifi speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality. These metrics are essential for troubleshooting connectivity issues, optimizing home network configurations, and ensuring your Unifi fiber service delivers the consistent gigabit performance expected across Malaysia's diverse network conditions.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="my" currentProviderSlug="unifi" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
