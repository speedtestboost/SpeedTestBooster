import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MovistarSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Movistar Speed Test Spain - Check Fibra Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Movistar Fibra internet speed instantly - Free speed checker for Spain. Accurate fiber download/upload & FTTH performance results now.');
    }

    setCanonicalHref('https://speedtestboost.com/providers/es/movistar');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Movistar Speed Test Spain",
      "description": "Test your Movistar Fibra internet speed for free. Speed test for Movistar fiber customers in Spain.",
      "url": "https://speedtestboost.com/providers/es/movistar",
      "provider": {
        "@type": "Organization",
        "name": "Movistar",
        "description": "Spain's leading telecommunications provider offering Fibra internet services with nationwide FTTH coverage",
        "areaServed": { "@type": "Country", "name": "Spain" },
        "serviceType": ["Fiber Internet", "FTTH", "Mobile Services", "Entertainment Bundles"]
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
      <Header currentPath="/providers/es/movistar" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Movistar", href: "/providers/es/movistar" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Movistar Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Movistar Fibra internet speed</span> for free. Check your fiber optic internet performance across Spain.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Movistar Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Movistar Spain</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Movistar, operated by Telefónica, dominates Spain's telecommunications market with 37-43% market share, establishing itself as the undisputed leader in fiber optic internet services. As Spain's premier telecommunications provider, Movistar delivers cutting-edge connectivity to millions of Spanish households and businesses through its industry-leading fiber infrastructure, comprehensive mobile network, and innovative entertainment bundles that integrate television, streaming, and sports content.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Fiber Leadership & FTTH Coverage</h3>
                <p className="text-muted-foreground">
                  Movistar leads Spain's fiber revolution with an exceptional 95.2% FTTH (Fiber-to-the-Home) coverage rate, making it the champion of fiber deployment nationwide. The company's extensive fiber optic network reaches virtually every corner of Spain, from major metropolitan areas like Madrid, Barcelona, and Valencia to smaller towns and rural communities. This unparalleled infrastructure investment ensures Movistar customers enjoy symmetrical gigabit speeds, ultra-low latency, and the most reliable fiber connections available in the Spanish market.
                </p>

                <h3 className="text-xl font-semibold mb-3">Nationwide Infrastructure Excellence</h3>
                <p className="text-muted-foreground">
                  With decades of telecommunications experience, Movistar has built Spain's most comprehensive and resilient network infrastructure. The company's nationwide fiber backbone supports multi-gigabit speeds up to 10 Gbps in select areas, while its integrated mobile and fixed services provide seamless connectivity across all platforms. Movistar's continuous network modernization and expansion ensure customers receive world-class internet performance whether they're streaming 4K content, gaming online, working remotely, or managing smart home devices.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Test Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Movistar customers verify their Fibra connection delivers contracted performance levels. Our Movistar speed test accurately measures download speeds, upload speeds, ping latency, and jitter, providing essential insights into your FTTH connection quality. These metrics are crucial for optimizing your home network, troubleshooting connectivity issues, and ensuring your Movistar Fibra service provides the premium performance expected from Spain's leading telecommunications provider.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="es" currentProviderSlug="movistar" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
