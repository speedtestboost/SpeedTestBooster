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

export default function YallaSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Yalla Speed Test UAE - Check Yalla Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Yalla fiber internet speed instantly - Free speed test for UAE. Accurate download/upload speeds and performance results in seconds.');
    }

    setCanonicalHref('https://speedtestboost.com/providers/ae/yalla');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Yalla Speed Test UAE",
      "description": "Test your Yalla internet speed for free. Speed test for Yalla fiber and broadband customers in UAE.",
      "url": "https://speedtestboost.com/providers/ae/yalla",
      "provider": {
        "@type": "Organization",
        "name": "Yalla",
        "description": "Emerging alternative telecommunications provider offering affordable fiber and broadband in UAE",
        "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
        "serviceType": ["Fiber Internet", "Broadband", "Home Internet", "Alternative Provider"]
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
      <Header currentPath="/providers/ae/yalla" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Yalla", href: "/providers/ae/yalla" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Yalla Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Yalla internet speed</span> for free. Check your fiber and broadband performance with UAE's emerging alternative provider.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Yalla Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Yalla UAE</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Yalla enters the UAE telecommunications market as an emerging alternative provider, challenging the established duopoly with competitive fiber and broadband offerings. Through affordable pricing strategies and expanding coverage across key Emirates, Yalla represents a fresh choice for UAE consumers seeking value-driven internet services without sacrificing reliability or performance in an increasingly competitive landscape.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Market Entry & Positioning</h3>
                <p className="text-muted-foreground">
                  As a new alternative in UAE's telecommunications sector, Yalla focuses on delivering cost-effective fiber and broadband solutions that appeal to budget-conscious consumers and businesses. The provider's competitive market entry strategy emphasizes transparent pricing, straightforward service packages, and customer-centric policies designed to differentiate from established competitors, gradually building market share in select Emirates through targeted coverage expansion and word-of-mouth reputation.
                </p>

                <h3 className="text-xl font-semibold mb-3">Affordable Options & Value</h3>
                <p className="text-muted-foreground">
                  Yalla's value proposition centers on affordable internet access without hidden fees or complex contract terms, making high-speed connectivity more accessible to diverse UAE demographics. The provider's fiber and broadband services deliver reliable performance at competitive price points, particularly attractive to residential customers, small businesses, and expatriate communities seeking quality internet solutions that don't strain budgets while meeting modern connectivity demands.
                </p>

                <h3 className="text-xl font-semibold mb-3">Expanding Coverage</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Yalla customers verify internet performance as the provider expands its network infrastructure across UAE. Our Yalla speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into connection quality across the provider's growing fiber and broadband network, ensuring transparent performance monitoring as Yalla challenges the telecommunications duopoly.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ae" currentProviderSlug="yalla" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
