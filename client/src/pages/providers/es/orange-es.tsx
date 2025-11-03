import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function OrangeSpainSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Orange Speed Test Spain - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Orange fiber internet speed instantly - Free speed test for Spain. Accurate download/upload speeds and performance results in seconds.');
    }

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/providers/es/orange-es';


    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Orange Speed Test Spain",
      "description": "Test your Orange fiber internet speed for free. Speed test for Orange fiber customers in Spain.",
      "url": "https://speedtestboost.com/providers/es/orange-es",
      "provider": {
        "@type": "Organization",
        "name": "Orange Spain",
        "description": "Spain's second-largest telecommunications provider delivering best-in-class fiber internet performance",
        "areaServed": { "@type": "Country", "name": "Spain" },
        "serviceType": ["Fiber Internet", "Mobile Services", "Convergent Services", "Entertainment"]
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

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/es/orange-es" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Orange Es", href: "/providers/es/orange-es" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Orange Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">Orange fiber internet speed</span> for free. Check your high-performance fiber connection across Spain.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Orange Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Orange Spain</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Orange Spain commands 16.4% market share as the country's second-largest telecommunications provider, distinguished by delivering the best network performance metrics in Spain. As a formidable challenger to market leaders, Orange combines French telecommunications expertise with Spanish market knowledge to provide exceptional fiber internet services, competitive pricing, and innovative convergent packages that bundle mobile, fiber, and entertainment services for maximum value.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Best Performance Metrics</h3>
                <p className="text-muted-foreground">
                  Orange consistently achieves the highest performance ratings among Spanish telecommunications providers, with industry benchmarks showing superior speed consistency, minimal downtime, and exceptional customer satisfaction scores. The company's fiber network delivers symmetrical gigabit speeds with remarkable stability, supporting demanding applications like cloud gaming, 4K streaming, video conferencing, and large file transfers. Orange's commitment to network quality over market share maximization ensures customers experience premium connectivity that matches or exceeds advertised speeds during peak and off-peak hours.
                </p>

                <h3 className="text-xl font-semibold mb-3">MásOrange Merger & Market Position</h3>
                <p className="text-muted-foreground">
                  The strategic merger creating MásOrange positions Orange Spain at the forefront of telecommunications innovation and market consolidation. This partnership combines Orange's superior network performance with expanded infrastructure reach, creating a powerful competitor capable of challenging Movistar's market dominance. Orange maintains its reputation for competitive pricing, transparent service plans, and customer-centric policies while leveraging merger synergies to enhance network coverage and service quality across urban and suburban markets throughout Spain.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing & Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing is essential for Orange customers to verify they're receiving the premium performance that defines the Orange brand. Our Orange speed test provides accurate measurements of download speeds, upload speeds, ping latency, and connection stability, helping you confirm your fiber service delivers the exceptional quality Orange promises. These insights are invaluable for optimizing home networks, identifying potential issues, and ensuring your Orange connection maintains the high-performance standards that distinguish it from competitors in the Spanish market.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="es" currentProviderSlug="orange-es" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
