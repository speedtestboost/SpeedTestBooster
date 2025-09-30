import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function TransworldSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Transworld Speed Test - Test Transworld Fiber Internet Speed Pakistan 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Transworld speed test for fiber customers. Test Transworld internet speeds in Pakistan. Check competitive fiber download, upload performance.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/pk/transworld');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Transworld Speed Test Pakistan",
      "description": "Test your Transworld fiber internet speed for free. Speed test for Transworld customers across Pakistan.",
      "url": "https://speedtestboost.com/providers/pk/transworld",
      "provider": {
        "@type": "Organization",
        "name": "Transworld",
        "description": "Pakistan's competitive fiber provider with business focus and multi-city coverage",
        "areaServed": { "@type": "Country", "name": "Pakistan" },
        "serviceType": ["Fiber Internet", "Business Broadband", "Enterprise Connectivity"]
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
      <Header currentPath="/providers/pk/transworld" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Transworld Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">Transworld fiber internet speed</span> for free. Check your competitive fiber download and upload performance across Pakistan.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Transworld Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Transworld Pakistan</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Transworld stands as Pakistan's competitive fiber internet provider with an impressive 56.71 performance score, ranking as the close second among the country's top ISPs. Serving multiple cities across Pakistan with robust fiber optic infrastructure, Transworld has established a strong reputation for reliable business-grade connectivity, consistent performance, and competitive pricing that challenges market leaders while maintaining superior service quality for both enterprise clients and residential customers demanding professional-grade internet access.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Multi-City Fiber Coverage</h3>
                <p className="text-muted-foreground">
                  Transworld operates comprehensive fiber optic networks across Pakistan's major business hubs including Karachi, Lahore, Islamabad, and Faisalabad, delivering symmetrical high-speed internet up to 100 Mbps with enterprise-grade reliability. The company's strategic infrastructure deployment focuses on commercial districts, industrial zones, and residential areas with high bandwidth demands, ensuring consistent performance where businesses and power users require dependable connectivity. This multi-city presence enables Transworld to serve national enterprises with unified service quality across locations.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business-Focused Reliability</h3>
                <p className="text-muted-foreground">
                  Transworld differentiates itself through business-centric service features including guaranteed uptime SLAs, dedicated technical account management, and priority troubleshooting that minimizes costly downtime for commercial clients. The company's network architecture emphasizes redundancy, backup routing, and quality of service guarantees that ensure mission-critical applications maintain connectivity even during peak usage or infrastructure challenges. This enterprise focus attracts businesses requiring reliable internet for operations, cloud services, VoIP communications, and customer-facing applications where connectivity failures have immediate financial impact.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Verification</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Transworld customers verify their fiber connection delivers the competitive performance and reliability the company guarantees. Our Transworld speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality. These metrics are essential for businesses monitoring service level compliance, troubleshooting network issues, and ensuring your Transworld fiber broadband maintains the consistent, high-speed performance required for professional operations and bandwidth-intensive residential applications across Pakistan's evolving digital landscape.
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
