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

export default function ZainSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Zain Speed Test Saudi Arabia - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Zain fiber internet speed instantly - Free speed test for Saudi Arabia. Accurate download/upload mobile performance results in seconds.');
    }

    setCanonicalHref('https://speedtestboost.com/providers/sa/zain');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Zain Speed Test Saudi Arabia",
      "description": "Test your Zain fiber internet speed for free. Speed test for Zain fiber and mobile customers in Saudi Arabia.",
      "url": "https://speedtestboost.com/providers/sa/zain",
      "provider": {
        "@type": "Organization",
        "name": "Zain KSA",
        "description": "Saudi Arabia's competitive third telecommunications provider offering fiber internet and mobile services",
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
        "serviceType": ["Fiber Internet", "Mobile Services", "Youth-Focused Plans", "Digital Innovation"]
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
      <Header currentPath="/providers/sa/zain" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Zain", href: "/providers/sa/zain" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Zain Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Zain fiber internet speed</span> for free. Check your competitive fiber performance across Saudi Arabia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Zain Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Zain KSA</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Zain KSA operates as Saudi Arabia's competitive third major telecommunications player, leveraging strong regional brand recognition from its Gulf Cooperation Council presence to challenge established market leaders. As part of the larger Zain Group network spanning eight Middle Eastern countries, Zain KSA brings innovative service approaches and youth-focused marketing to Saudi Arabia's dynamic telecommunications landscape, positioning itself as the provider of choice for digitally-native consumers seeking modern connectivity solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Regional Brand Strength</h3>
                <p className="text-muted-foreground">
                  Zain's established presence across Kuwait, Bahrain, Jordan, and Iraq provides significant brand equity in Saudi Arabia, where consumers recognize the company's commitment to innovation and customer service excellence. This regional connectivity enables Zain KSA to offer seamless roaming and integrated services for customers traveling within the GCC, creating unique value propositions that differentiate the provider from purely domestic competitors. Zain's brand positioning emphasizes technological innovation and youth culture alignment, resonating with Saudi Arabia's young, tech-savvy demographic.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Expansion & Network Growth</h3>
                <p className="text-muted-foreground">
                  Zain KSA's fiber broadband network continues rapid expansion across Saudi Arabia's major metropolitan areas, with strategic deployments in Riyadh, Jeddah, Dammam, and other key cities. The company's infrastructure investment strategy prioritizes high-value residential neighborhoods and emerging technology hubs, delivering competitive gigabit-speed fiber connections that support modern digital lifestyles. Zain's network architecture emphasizes reliability and low latency, essential for bandwidth-intensive applications like online gaming, 4K streaming, and remote work scenarios increasingly common among Saudi consumers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Youth Market & Innovation Focus</h3>
                <p className="text-muted-foreground">
                  Targeting Saudi Arabia's predominantly young population, Zain KSA develops innovative service packages that bundle fiber internet with gaming optimizations, streaming service partnerships, and social media data plans. The company's innovation labs experiment with emerging technologies including cloud gaming platforms, virtual reality applications, and AI-powered customer service tools that appeal to digital natives. Regular speed testing enables Zain customers to verify their fiber connection delivers the consistent performance required for competitive online gaming, content creation, and social media engagement that define modern youth culture in the Kingdom.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="sa" currentProviderSlug="zain" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
