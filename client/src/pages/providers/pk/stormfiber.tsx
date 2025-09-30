import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function StormFiberSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "StormFiber Speed Test - Test StormFiber Internet Speed Pakistan 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free StormFiber speed test for premium fiber customers. Test StormFiber speeds in Pakistani cities. Check high-speed fiber performance and low ping.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/pk/stormfiber');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "StormFiber Speed Test Pakistan",
      "description": "Test your StormFiber internet speed for free. Speed test for StormFiber premium fiber customers in Pakistan.",
      "url": "https://speedtestboost.com/providers/pk/stormfiber",
      "provider": {
        "@type": "Organization",
        "name": "StormFiber",
        "description": "Pakistan's premium fiber internet provider with gaming focus and urban coverage",
        "areaServed": { "@type": "Country", "name": "Pakistan" },
        "serviceType": ["Fiber Internet", "Gaming Internet", "Premium Broadband"]
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
      <Header currentPath="/providers/pk/stormfiber" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              StormFiber Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">StormFiber premium internet speed</span> for free. Check your high-speed fiber performance and low ping across Pakistan.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test StormFiber Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About StormFiber Pakistan</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  StormFiber has established itself as Pakistan's premier fiber internet provider, delivering premium urban connectivity with a specialized focus on gaming and high-performance applications. Serving major Pakistani cities with cutting-edge fiber optic infrastructure, StormFiber differentiates itself through consistently low latency, superior upload speeds, and dedicated customer support that caters to power users, gamers, and bandwidth-intensive households demanding reliable, high-speed internet without compromise.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Premium Urban Fiber Coverage</h3>
                <p className="text-muted-foreground">
                  StormFiber strategically concentrates its fiber optic network across Pakistan's major metropolitan areas including Karachi, Lahore, and Islamabad, delivering speeds up to 100 Mbps with symmetrical upload and download capabilities. The company's urban-focused deployment strategy ensures dense coverage in high-demand residential and commercial zones, providing consistent performance where bandwidth requirements are highest. This targeted approach enables StormFiber to maintain superior service quality and rapid troubleshooting response times compared to broader but less optimized network competitors.
                </p>

                <h3 className="text-xl font-semibold mb-3">Gaming-Optimized Performance</h3>
                <p className="text-muted-foreground">
                  StormFiber's gaming-centric infrastructure prioritizes low ping rates and minimal jitter, essential for competitive online gaming, real-time streaming, and latency-sensitive applications. The company's network architecture features optimized routing to international gaming servers, dedicated bandwidth allocation during peak hours, and Quality of Service (QoS) features that ensure gaming traffic receives priority. This gaming focus attracts Pakistan's growing esports community and content creators who require reliable, low-latency connectivity for professional-grade performance and seamless streaming capabilities.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Test Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps StormFiber customers verify their premium service delivers the exceptional performance they expect. Our StormFiber speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality. These metrics are particularly important for gamers and power users who need to monitor network performance, troubleshoot connectivity issues, and ensure their StormFiber connection maintains the low-latency, high-speed characteristics essential for demanding applications.
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
