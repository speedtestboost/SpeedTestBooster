import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function IndiHomeSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "IndiHome Speed Test Indonesia - Check Telkomsel Fiber Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test IndiHome fiber speed instantly - Free internet speed checker for Indonesia. Get accurate Telkomsel IndiHome download/upload results now.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/id/indihome';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "IndiHome Speed Test Indonesia",
      "description": "Test your IndiHome fiber internet speed for free. Speed test for Telkomsel IndiHome customers in Indonesia.",
      "url": "https://speedtestboost.com/providers/id/indihome",
      "provider": {
        "@type": "Organization",
        "name": "IndiHome",
        "description": "Indonesia's dominant telecommunications provider offering fiber internet services with 75% market share and 38 million homes passed",
        "areaServed": { "@type": "Country", "name": "Indonesia" },
        "serviceType": ["Fiber Internet", "IPTV", "Fixed Line", "Home Broadband"]
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
      <Header currentPath="/providers/id/indihome" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Indihome", href: "/providers/id/indihome" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              IndiHome Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Telkomsel IndiHome fiber internet speed</span> for free. Check your fiber performance across Indonesia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test IndiHome Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About IndiHome Indonesia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  IndiHome, operated by Telkom Indonesia, commands Indonesia's telecommunications market with an overwhelming 75% market share in fixed broadband services. As the nation's dominant internet service provider backed by government infrastructure, IndiHome has achieved remarkable penetration with 38 million homes passed nationwide, delivering fiber-optic connectivity to households and businesses from Jakarta to Papua through Indonesia's most extensive telecommunications network.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Market Dominance</h3>
                <p className="text-muted-foreground">
                  IndiHome's unparalleled market leadership stems from decades of state-backed infrastructure investment and nationwide deployment across Indonesia's diverse archipelago. The provider maintains comprehensive coverage in all major cities including Jakarta, Surabaya, Bandung, Medan, and Semarang, while continuously expanding fiber access to tier-2 and tier-3 cities. This government-supported infrastructure ensures IndiHome remains Indonesia's most accessible and widely trusted internet provider, serving millions of subscribers with reliable connectivity essential for Indonesia's digital transformation.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Infrastructure</h3>
                <p className="text-muted-foreground">
                  IndiHome's extensive fiber-to-the-home (FTTH) network delivers high-speed internet with plans ranging from 20 Mbps to 300 Mbps, supporting bandwidth-intensive applications like streaming, online gaming, and remote work. The company's massive infrastructure rollout has connected 38 million homes, making it Indonesia's largest fiber provider by a significant margin. IndiHome's bundled packages combine internet access with IPTV services and landline telephony, providing comprehensive home connectivity solutions backed by Telkom Indonesia's technical expertise and nationwide service network.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Test Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps IndiHome customers verify their fiber internet performance matches subscribed service tiers across Indonesia's varied network conditions. Our IndiHome speed test accurately measures download speeds, upload speeds, ping latency, and connection stability, providing essential insights into your network quality. These metrics are crucial for troubleshooting performance issues, optimizing home network configurations, and ensuring your IndiHome fiber service delivers the reliable speeds needed for modern digital activities throughout Indonesia's expanding telecommunications landscape.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="id" currentProviderSlug="indihome" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
