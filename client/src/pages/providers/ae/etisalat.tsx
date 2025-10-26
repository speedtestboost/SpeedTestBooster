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

export default function EtisalatSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Etisalat Speed Test UAE - Check eLife Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Etisalat eLife internet speed instantly - Free fiber speed checker for UAE. Accurate download/upload speeds & ping results in seconds.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/ae/etisalat';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Etisalat Speed Test UAE",
      "description": "Test your Etisalat eLife internet speed for free. Speed test for Etisalat fiber customers in UAE.",
      "url": "https://speedtestboost.com/providers/ae/etisalat",
      "provider": {
        "@type": "Organization",
        "name": "Etisalat",
        "description": "UAE's dominant telecommunications provider offering eLife fiber internet with world-leading mobile speeds",
        "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
        "serviceType": ["Fiber Internet", "5G Mobile", "Smart City Infrastructure", "TV Services"]
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
      <Header currentPath="/providers/ae/etisalat" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "UAE", href: "/internet-providers" },
              { label: "Etisalat", href: "/providers/ae/etisalat" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              Etisalat Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">Etisalat eLife internet speed</span> for free. Check your fiber internet performance across UAE with the market leader.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Etisalat Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Etisalat UAE</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Etisalat stands as the UAE's dominant telecommunications provider, delivering cutting-edge connectivity through its eLife fiber brand. With the world's fastest mobile network achieving 539.84 Mbps average speeds, Etisalat leads global telecommunications innovation while powering Smart Dubai's digital infrastructure with advanced 5G deployment across the Emirates.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Market Leadership & eLife Brand</h3>
                <p className="text-muted-foreground">
                  As the UAE's largest internet service provider, Etisalat's eLife fiber services deliver ultra-high-speed connectivity to homes and businesses throughout Dubai, Abu Dhabi, Sharjah, and beyond. The company's extensive fiber optic network ensures reliable gigabit-speed internet access, supporting the nation's digital transformation initiatives and smart city ambitions with world-class infrastructure that sets global benchmarks.
                </p>

                <h3 className="text-xl font-semibold mb-3">World's Fastest Mobile Speeds</h3>
                <p className="text-muted-foreground">
                  Etisalat's mobile network achieved the world's fastest average mobile speeds at 539.84 Mbps, demonstrating the provider's commitment to technological excellence and network optimization. This remarkable performance, combined with comprehensive 5G coverage across major Emirates, positions Etisalat at the forefront of global telecommunications, enabling bandwidth-intensive applications and future-ready connectivity for UAE residents and businesses.
                </p>

                <h3 className="text-xl font-semibold mb-3">Smart Dubai Infrastructure</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Etisalat customers verify their eLife fiber and mobile performance matches the provider's world-leading standards. Our Etisalat speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality across UAE's advanced telecommunications infrastructure, ensuring you experience the full potential of the nation's digital backbone.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ae" currentProviderSlug="etisalat" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
