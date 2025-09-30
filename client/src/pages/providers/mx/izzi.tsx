import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function IzziSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Izzi Speed Test Mexico - Check Cable & Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Izzi cable & fiber internet speed instantly - Free speed test for Mexico. Accurate download/upload streaming & gaming results in seconds.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/mx/izzi');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Izzi Speed Test Mexico",
      "description": "Test your Izzi Telecom internet speed for free. Speed test for Izzi cable and fiber customers in Mexico.",
      "url": "https://speedtestboost.com/providers/mx/izzi",
      "provider": {
        "@type": "Organization",
        "name": "Izzi Telecom",
        "description": "Major Mexican cable internet provider with 25% market share offering high-speed broadband services",
        "areaServed": { "@type": "Country", "name": "Mexico" },
        "serviceType": ["Cable Internet", "Fiber Internet", "TV Services", "Mobile Services"]
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
      <Header currentPath="/providers/mx/izzi" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Izzi Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">Izzi Telecom internet speed</span> for free. Check your cable or fiber internet performance in Mexico.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Izzi Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Izzi Telecom</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Izzi Telecom, owned by Grupo Televisa, commands 25% of Mexico's fixed broadband market as the country's second-largest internet service provider. Known for competitive pricing and bundled entertainment packages, Izzi delivers high-speed cable internet to millions of Mexican homes through its hybrid fiber-coaxial network infrastructure, emphasizing urban and suburban coverage across central and northern Mexico.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Network Excellence</h3>
                <p className="text-muted-foreground">
                  Izzi's cable internet infrastructure leverages DOCSIS 3.1 technology to deliver reliable broadband speeds up to 500 Mbps in key metropolitan areas. The company's network reaches major cities including Mexico City, Monterrey, Guadalajara, and Puebla, providing consistent connectivity for streaming, gaming, and remote work applications. Izzi's cable technology advantage enables rapid service provisioning and competitive pricing compared to traditional DSL alternatives.
                </p>

                <h3 className="text-xl font-semibold mb-3">Entertainment Integration</h3>
                <p className="text-muted-foreground">
                  As part of Grupo Televisa, Izzi uniquely combines high-speed internet with extensive television content offerings, creating compelling triple-play bundles for Mexican families. The company's strategic focus on entertainment-oriented services appeals to households seeking integrated solutions for broadband connectivity, premium TV channels, and streaming platforms. This content advantage differentiates Izzi from competitors in Mexico's competitive telecommunications market.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Testing your Izzi connection regularly ensures optimal performance for your household's internet needs. Our Izzi speed test measures download speeds, upload speeds, and network latency with precision, helping you verify service quality and troubleshoot connectivity issues. Regular testing is particularly important for Izzi customers who bundle internet with streaming services, as it confirms your connection can handle 4K video, online gaming, and multiple simultaneous devices without buffering or lag.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
