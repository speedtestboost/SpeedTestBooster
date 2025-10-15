import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function TelecentroSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Telecentro Speed Test Argentina - Check Cable Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Telecentro cable internet speed instantly - Free speed checker for Argentina. Accurate broadband & fiber performance results in seconds.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/ar/telecentro');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Telecentro Speed Test Argentina",
      "description": "Test your Telecentro cable internet speed for free. Speed test for Telecentro cable and fiber customers in Argentina.",
      "url": "https://speedtestboost.com/providers/ar/telecentro",
      "provider": {
        "@type": "Organization",
        "name": "Telecentro",
        "description": "Major cable provider offering high-speed cable and fiber internet services in Argentina",
        "areaServed": { "@type": "Country", "name": "Argentina" },
        "serviceType": ["Cable Internet", "Fiber Broadband", "TV Services", "Telephone"]
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
      <Header currentPath="/providers/ar/telecentro" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Telecentro Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">Telecentro cable internet speed</span> for free. Check your cable or fiber internet performance across Argentina.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Telecentro Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Telecentro Argentina</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Telecentro dominates Argentina's cable broadband market as the country's leading cable internet provider, delivering high-speed connectivity to millions of households primarily concentrated in the Buenos Aires metropolitan area and surrounding regions. With decades of cable infrastructure expertise and a reputation for competitive speeds at value pricing, Telecentro has established itself as a formidable alternative to traditional telecommunications giants, offering reliable internet services backed by extensive network infrastructure.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Buenos Aires Metropolitan Leadership</h3>
                <p className="text-muted-foreground">
                  Telecentro's strategic focus on the Buenos Aires metropolitan region has enabled the company to build dense, high-capacity cable networks serving the capital and surrounding municipalities where population density supports efficient infrastructure deployment. The company's deep market penetration in Greater Buenos Aires provides competitive advantages including rapid service installation, responsive technical support, and intimate knowledge of local infrastructure challenges, positioning Telecentro as the preferred cable provider for millions of Argentine households.
                </p>

                <h3 className="text-xl font-semibold mb-3">Competitive Speeds & Performance</h3>
                <p className="text-muted-foreground">
                  Telecentro delivers impressive cable internet speeds reaching up to 600 Mbps through advanced DOCSIS 3.1 technology, supporting bandwidth-intensive applications including 4K streaming, online gaming, and multi-device household connectivity. The company's ongoing network upgrades combine fiber backhaul with high-capacity cable distribution, ensuring consistent performance even during peak usage hours. Selective fiber-to-the-home deployments in new developments further enhance Telecentro's speed capabilities in strategic markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Value Pricing Strategy</h3>
                <p className="text-muted-foreground">
                  Telecentro's competitive pricing model appeals to cost-conscious consumers seeking high-speed internet without premium pricing, often undercutting larger competitors while maintaining service quality and reliability. Regular speed testing empowers Telecentro customers to verify their connection performance, ensure they receive contracted speeds, and optimize their home network configuration for maximum throughput across Argentina's cable broadband landscape where value and performance increasingly define customer choice.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ar" currentProviderSlug="telecentro" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
