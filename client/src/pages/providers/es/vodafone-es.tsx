import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function VodafoneSpainSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Vodafone Speed Test Spain - Check Fibra Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Vodafone Fibra internet speed instantly - Free speed test for Spain. Accurate fiber & mobile broadband performance results in seconds.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/es/vodafone-es');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Vodafone Speed Test Spain",
      "description": "Test your Vodafone Fibra internet speed for free. Speed test for Vodafone fiber and mobile customers in Spain.",
      "url": "https://speedtestboost.com/providers/es/vodafone-es",
      "provider": {
        "@type": "Organization",
        "name": "Vodafone Spain",
        "description": "Major telecommunications competitor offering integrated fiber and mobile services across Spain",
        "areaServed": { "@type": "Country", "name": "Spain" },
        "serviceType": ["Fiber Internet", "Mobile Services", "Business Solutions", "Convergent Services"]
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
      <Header currentPath="/providers/es/vodafone-es" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Vodafone Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Vodafone Fibra internet speed</span> for free. Check your fiber and mobile broadband performance across Spain.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Vodafone Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Vodafone Spain</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Vodafone Spain holds approximately 15% market share as a major telecommunications competitor, leveraging global telecommunications expertise to deliver integrated fiber and mobile services across the country. As part of the worldwide Vodafone Group, the Spanish operation combines international technology leadership with local market understanding to provide comprehensive connectivity solutions for residential customers, small businesses, and large enterprises seeking reliable, high-performance internet services.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Fiber and Mobile Integration</h3>
                <p className="text-muted-foreground">
                  Vodafone's strength lies in seamless integration between its fiber broadband and mobile networks, offering convergent packages that unify home and mobile connectivity under single plans with shared data and bundled entertainment services. The company's Fibra network delivers symmetrical gigabit speeds in major markets, while its advanced 5G mobile network provides backup connectivity and mobile broadband solutions. This dual-network approach ensures Vodafone customers maintain consistent connectivity whether at home, office, or on the move across Spain's diverse geography.
                </p>

                <h3 className="text-xl font-semibold mb-3">Nationwide Coverage & Business Services</h3>
                <p className="text-muted-foreground">
                  Vodafone maintains extensive nationwide coverage across Spain, serving major metropolitan areas and expanding into suburban and semi-rural markets with fiber deployments and enhanced mobile broadband. The company particularly excels in business telecommunications, offering dedicated fiber lines, static IP addresses, service level agreements, and priority support for companies requiring mission-critical connectivity. Vodafone's enterprise solutions include cloud services, unified communications, and IoT connectivity, making it a preferred partner for Spanish businesses seeking comprehensive telecommunications infrastructure.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring Needs</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Vodafone customers verify their Fibra connection meets service commitments and performance expectations. Our Vodafone speed test accurately measures download speeds, upload speeds, ping latency, and network stability, providing essential data for troubleshooting connectivity issues and optimizing network configurations. These metrics are particularly important for business customers requiring guaranteed performance levels and residential users running bandwidth-intensive applications like remote work, online gaming, and multi-device 4K streaming across Vodafone's fiber and mobile networks.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="es" currentProviderSlug="vodafone-es" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
