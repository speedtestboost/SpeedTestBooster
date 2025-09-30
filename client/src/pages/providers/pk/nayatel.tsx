import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function NayatelSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Nayatel Speed Test - Test Nayatel Fiber Internet Speed Pakistan 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Nayatel speed test for fiber customers. Test Nayatel internet speeds in Islamabad, Rawalpindi, Peshawar. Check fiber broadband performance.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/pk/nayatel');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Nayatel Speed Test Pakistan",
      "description": "Test your Nayatel fiber internet speed for free. Speed test for Nayatel customers in Islamabad, Rawalpindi, and Peshawar.",
      "url": "https://speedtestboost.com/providers/pk/nayatel",
      "provider": {
        "@type": "Organization",
        "name": "Nayatel",
        "description": "Pakistan's regional fiber leader serving twin cities with top customer satisfaction",
        "areaServed": { "@type": "Country", "name": "Pakistan" },
        "serviceType": ["Fiber Internet", "Broadband", "IPTV Services"]
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
      <Header currentPath="/providers/pk/nayatel" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Nayatel Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Nayatel fiber internet speed</span> for free. Check your broadband performance in Islamabad, Rawalpindi, and Peshawar.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Nayatel Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Nayatel Pakistan</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Nayatel ranks as Pakistan's top-performing internet service provider with an impressive 56.31 performance score, delivering exceptional fiber optic connectivity to the twin cities of Islamabad and Rawalpindi, plus expanding coverage in Peshawar. As a regional fiber leader, Nayatel has built an outstanding reputation for consistent service quality, superior customer satisfaction, and reliable high-speed internet that meets the demanding requirements of both residential users and businesses throughout Pakistan's capital region.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Regional Fiber Leadership</h3>
                <p className="text-muted-foreground">
                  Nayatel's strategic focus on Pakistan's twin cities enables concentrated infrastructure investment, delivering comprehensive fiber optic coverage across Islamabad and Rawalpindi with speeds up to 100 Mbps. This regional specialization allows Nayatel to maintain superior network quality, rapid service deployment, and responsive customer support compared to nationwide providers with dispersed resources. The company's expanding presence in Peshawar demonstrates successful growth beyond its core markets while maintaining the service excellence that defines its twin cities operations.
                </p>

                <h3 className="text-xl font-semibold mb-3">Customer Satisfaction Excellence</h3>
                <p className="text-muted-foreground">
                  Nayatel consistently achieves Pakistan's highest customer satisfaction ratings through reliable connectivity, transparent billing, and responsive technical support that addresses issues promptly. The company's customer-first approach includes flexible package options, consistent performance during peak hours, and minimal service disruptions that frustrate users of competing providers. This dedication to customer experience has earned Nayatel exceptional loyalty among subscribers who value dependable internet service and professional support over price-focused competitors with inconsistent reliability.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Nayatel customers verify their fiber connection delivers the exceptional performance the company promises. Our Nayatel speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality. These metrics are essential for monitoring service consistency, troubleshooting rare connectivity issues, and ensuring your Nayatel fiber broadband maintains the reliable, high-speed performance that distinguishes this top-rated provider from Pakistan's competitive internet service landscape.
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
