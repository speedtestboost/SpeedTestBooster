import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function TelmexSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Telmex Speed Test Mexico - Check Infinitum Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Telmex Infinitum internet speed instantly - Free speed test for fiber & DSL across Mexico. Check real download/upload speeds & latency now.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/mx/telmex');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Telmex Speed Test Mexico",
      "description": "Test your Telmex Infinitum internet speed for free. Speed test for Telmex fiber and DSL customers in Mexico.",
      "url": "https://speedtestboost.com/providers/mx/telmex",
      "provider": {
        "@type": "Organization",
        "name": "Telmex",
        "description": "Mexico's largest telecommunications provider offering Infinitum fiber and DSL internet services",
        "areaServed": { "@type": "Country", "name": "Mexico" },
        "serviceType": ["Fiber Internet", "DSL Broadband", "Fixed Line", "TV Services"]
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
      <Header currentPath="/providers/mx/telmex" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Telmex Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Telmex Infinitum internet speed</span> for free. Check your fiber or DSL internet performance across Mexico.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Telmex Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Telmex Mexico</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Telmex, operated by América Móvil, dominates Mexico's telecommunications landscape with 40% market share in fixed broadband services. As the country's largest and most established internet service provider, Telmex Infinitum delivers reliable connectivity to millions of Mexican households and businesses through its extensive fiber optic and DSL infrastructure spanning urban centers and rural communities nationwide.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Market Leadership & Coverage</h3>
                <p className="text-muted-foreground">
                  Telmex maintains the most comprehensive telecommunications network in Mexico, reaching communities across all 32 states from Tijuana to Cancún. The company's Infinitum brand represents decades of infrastructure investment, providing high-speed internet access to major metropolitan areas including Mexico City, Guadalajara, and Monterrey, while continuously expanding fiber optic deployment to underserved regions. This extensive coverage ensures Telmex remains Mexico's preferred choice for both residential and enterprise connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Infinitum Fiber Technology</h3>
                <p className="text-muted-foreground">
                  Telmex Infinitum's fiber optic network delivers symmetrical upload and download speeds up to 500 Mbps in select markets, supporting bandwidth-intensive applications like 4K streaming, cloud computing, and smart home devices. The company's ongoing fiber deployment strategy prioritizes major urban centers while gradually extending next-generation connectivity to smaller cities. Telmex's hybrid fiber-copper infrastructure ensures reliable service delivery even in areas where full fiber deployment faces geographical challenges.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Test Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Telmex customers verify their internet performance matches contracted service levels. Our Telmex speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality. These metrics are essential for troubleshooting connectivity issues, optimizing home network configurations, and ensuring your Telmex Infinitum service delivers the performance you're paying for across Mexico's diverse network conditions.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="mx" currentProviderSlug="telmex" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
