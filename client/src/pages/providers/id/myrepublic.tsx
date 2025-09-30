import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function MyRepublicSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "MyRepublic Speed Test - Test MyRepublic Fiber Internet Indonesia 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free MyRepublic speed test for fiber customers. Test MyRepublic speeds in Indonesia. Check competitive fiber download, upload performance.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/id/myrepublic');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "MyRepublic Speed Test Indonesia",
      "description": "Test your MyRepublic fiber internet speed for free. Speed test for MyRepublic customers in Indonesia.",
      "url": "https://speedtestboost.com/providers/id/myrepublic",
      "provider": {
        "@type": "Organization",
        "name": "MyRepublic",
        "description": "Singapore-based fiber internet provider offering affordable high-speed connectivity for tech-savvy users and gaming communities in Indonesia",
        "areaServed": { "@type": "Country", "name": "Indonesia" },
        "serviceType": ["Fiber Internet", "Gaming Broadband", "Affordable Fiber", "High-Speed Internet"]
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
      <Header currentPath="/providers/id/myrepublic" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              MyRepublic Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">MyRepublic fiber internet speed</span> for free. Check your competitive fiber performance in Indonesia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test MyRepublic Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About MyRepublic Indonesia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  MyRepublic brings international expertise and competitive pricing to Indonesia's broadband market as a Singapore-based fiber internet provider with strong regional presence. Entering Indonesia with an aggressive value proposition, MyRepublic targets tech-savvy consumers seeking affordable high-speed fiber connectivity without sacrificing performance. The company's customer-centric approach and transparent pricing have disrupted traditional telecom models, appealing particularly to younger demographics and digital-native users across Indonesian urban markets.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Affordable Fiber Innovation</h3>
                <p className="text-muted-foreground">
                  MyRepublic's competitive strategy focuses on delivering exceptional value through affordable fiber internet plans with straightforward pricing and no hidden fees. The provider's fiber network in Indonesia serves major cities with plans offering speeds up to 300 Mbps at price points that challenge established operators. MyRepublic's transparent service model and digital-first customer experience resonate with cost-conscious consumers who demand high-performance internet without premium pricing, establishing the brand as a viable alternative to Indonesia's traditional telecommunications giants.
                </p>

                <h3 className="text-xl font-semibold mb-3">Gaming Community Focus</h3>
                <p className="text-muted-foreground">
                  MyRepublic has cultivated a strong reputation within Indonesia's gaming community through specialized GAMER plans optimized for low-latency online gaming and competitive esports. The company actively sponsors gaming events, partners with esports organizations, and maintains dedicated gaming support, demonstrating genuine commitment to this growing market segment. MyRepublic's fiber infrastructure delivers the consistent speeds and minimal ping times essential for competitive gaming, making it a preferred choice among Indonesian gamers and streamers seeking reliable, affordable high-speed connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing enables MyRepublic customers to verify they receive the competitive fiber performance the provider promises. Our MyRepublic speed test measures download speeds, upload speeds, ping latency, and connection stability, providing essential data about your network quality. These metrics help ensure your MyRepublic fiber service delivers the speeds needed for gaming, streaming, and everyday internet use, while also helping identify optimization opportunities to maximize your affordable high-speed connection across Indonesia's expanding fiber infrastructure.
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
