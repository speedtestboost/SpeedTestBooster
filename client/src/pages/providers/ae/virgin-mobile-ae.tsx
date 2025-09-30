import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function VirginMobileAESpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Virgin Mobile Speed Test - Test Virgin Mobile Internet Speed UAE 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Virgin Mobile speed test for mobile broadband. Test Virgin Mobile speeds in UAE. Check 4G, 5G mobile internet performance and home broadband.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/ae/virgin-mobile-ae');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Virgin Mobile Speed Test UAE",
      "description": "Test your Virgin Mobile internet speed for free. Speed test for Virgin Mobile 4G, 5G, and home broadband customers in UAE.",
      "url": "https://speedtestboost.com/providers/ae/virgin-mobile-ae",
      "provider": {
        "@type": "Organization",
        "name": "Virgin Mobile UAE",
        "description": "Mobile-first telecommunications provider offering competitive mobile broadband and flexible plans in UAE",
        "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
        "serviceType": ["Mobile Broadband", "4G Mobile", "5G Mobile", "Home Broadband"]
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
      <Header currentPath="/providers/ae/virgin-mobile-ae" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Virgin Mobile Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">Virgin Mobile internet speed</span> for free. Check your mobile broadband and 5G performance across UAE.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Virgin Mobile Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Virgin Mobile UAE</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Virgin Mobile UAE disrupts the telecommunications market as a mobile-first provider, targeting youth demographics with competitively priced data plans and flexible contract-free options. The provider's focus on mobile broadband excellence and innovative digital-first customer experience has established Virgin Mobile as an attractive alternative for UAE consumers seeking value-driven connectivity without traditional service constraints.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Mobile-First Innovation</h3>
                <p className="text-muted-foreground">
                  Virgin Mobile's mobile-first strategy delivers comprehensive 4G and 5G coverage across UAE's major Emirates, emphasizing mobile broadband as the primary connectivity solution for modern digital lifestyles. The provider's network infrastructure, leveraging partner infrastructure, ensures reliable high-speed mobile internet access throughout Dubai, Abu Dhabi, and beyond, with particular strength in urban areas where youth demographics demand consistent, fast mobile connectivity for streaming, gaming, and social media.
                </p>

                <h3 className="text-xl font-semibold mb-3">Competitive Pricing & Flexibility</h3>
                <p className="text-muted-foreground">
                  Virgin Mobile's transparent pricing structure and flexible plan options challenge traditional UAE telecommunications models, offering contract-free services with generous data allowances at competitive rates. The provider's digital-first approach eliminates physical store dependency, enabling customers to manage services entirely through mobile apps while accessing promotional offers and customizable plans that adapt to changing usage patterns, making Virgin Mobile particularly attractive to price-conscious young professionals and students.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Verification</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Virgin Mobile customers verify their mobile broadband performance across UAE's competitive telecommunications landscape. Our Virgin Mobile speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into 4G and 5G connection quality, helping optimize your mobile internet experience and ensuring you receive the value-driven performance Virgin Mobile promises.
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
