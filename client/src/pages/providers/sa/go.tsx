import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function GOSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "GO Speed Test - Test GO Internet Speed Saudi Arabia 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free GO speed test for fiber and mobile customers. Test GO internet speeds in Saudi Arabia. Check alternative provider performance and value.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/sa/go');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "GO Speed Test Saudi Arabia",
      "description": "Test your GO internet speed for free. Speed test for GO fiber and mobile customers in Saudi Arabia.",
      "url": "https://speedtestboost.com/providers/sa/go",
      "provider": {
        "@type": "Organization",
        "name": "GO",
        "description": "Saudi Arabia's emerging telecommunications provider offering competitive fiber and mobile services",
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
        "serviceType": ["Fiber Internet", "Mobile Services", "Value Plans", "Alternative Provider"]
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
      <Header currentPath="/providers/sa/go" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              GO Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">GO internet speed</span> for free. Check your fiber and mobile performance with Saudi Arabia's alternative provider.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test GO Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About GO Saudi Arabia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  GO (formerly Golan) emerges as Saudi Arabia's fourth major telecommunications player, bringing fresh competition to the Kingdom's broadband and mobile markets. As an alternative provider challenging established market leaders, GO focuses on value-oriented service packages, competitive pricing strategies, and niche market segments underserved by traditional carriers. This disruptive approach positions GO as an attractive option for cost-conscious consumers and businesses seeking quality connectivity without premium pricing.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Competitive Market Entry</h3>
                <p className="text-muted-foreground">
                  GO's market entry strategy emphasizes differentiation through aggressive pricing and customer-first service models that challenge incumbent providers. By targeting price-sensitive segments and underserved geographic areas, GO carves out a sustainable market position without directly competing head-to-head with established giants. The company's lean operational model enables competitive service pricing while maintaining acceptable network quality, appealing to budget-conscious households and small businesses seeking to reduce telecommunications expenses without sacrificing essential connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Affordable Pricing & Value Focus</h3>
                <p className="text-muted-foreground">
                  GO's service portfolio emphasizes transparent pricing, contract-free options, and no-surprise billing that resonate with consumers frustrated by complex telecommunications contracts. The company's fiber and mobile plans provide straightforward speed tiers and data allowances without hidden fees or mandatory bundling, simplifying the purchase decision for customers seeking honest value. This pricing transparency, combined with competitive speeds suitable for everyday internet usage, positions GO as the rational choice for families and businesses prioritizing cost-effectiveness over premium features.
                </p>

                <h3 className="text-xl font-semibold mb-3">Growing Coverage in Key Cities</h3>
                <p className="text-muted-foreground">
                  While GO's network footprint remains smaller than established competitors, the company strategically expands fiber infrastructure in high-demand urban centers including Riyadh, Jeddah, and Dammam. GO's targeted deployment approach focuses resources on densely populated residential areas and commercial districts where customer acquisition costs remain manageable and service demand justifies infrastructure investment. Regular speed testing helps GO customers verify their connection delivers advertised performance levels, building trust in this emerging provider's ability to compete effectively with Saudi Arabia's telecommunications establishment in quality and reliability.
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
