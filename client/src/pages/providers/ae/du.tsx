import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function DuSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "du Speed Test UAE - Check du Fiber & 5G Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test du fiber & 5G internet speed instantly - Free speed test for UAE. Accurate download/upload speeds and latency results in seconds.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/ae/du');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "du Speed Test UAE",
      "description": "Test your du Home Fiber internet speed for free. Speed test for du fiber and mobile customers in UAE.",
      "url": "https://speedtestboost.com/providers/ae/du",
      "provider": {
        "@type": "Organization",
        "name": "du",
        "description": "UAE's second major telecommunications provider offering Home Fiber internet and 5G services",
        "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
        "serviceType": ["Fiber Internet", "5G Mobile", "Home Broadband", "Smart City Services"]
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
      <Header currentPath="/providers/ae/du" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              du Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">du Home Fiber internet speed</span> for free. Check your fiber and 5G performance across UAE's competitive market.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test du Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About du UAE</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  du serves as the UAE's second major telecommunications provider, delivering competitive Home Fiber internet services and comprehensive 5G mobile coverage. Through strategic network investments and smart city service initiatives, du maintains a strong market position, offering high-speed connectivity across Dubai, Abu Dhabi, and the Northern Emirates with innovative digital solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Home Fiber Excellence</h3>
                <p className="text-muted-foreground">
                  du's Home Fiber network delivers reliable high-speed internet across major UAE metropolitan areas, providing competitive fiber optic connectivity for residential and business customers. The company's commitment to network quality and customer service has established du as a formidable alternative in the UAE telecommunications market, with extensive coverage in key Emirates and continuous infrastructure expansion to serve growing demand.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Deployment & Innovation</h3>
                <p className="text-muted-foreground">
                  du's advanced 5G deployment spans major UAE cities, delivering next-generation mobile connectivity that supports emerging technologies and bandwidth-intensive applications. The provider's investment in 5G infrastructure demonstrates its commitment to technological advancement, ensuring customers experience cutting-edge mobile speeds and low-latency connectivity essential for IoT devices, cloud services, and smart city applications throughout the Emirates.
                </p>

                <h3 className="text-xl font-semibold mb-3">Competitive Market Position</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps du customers verify their Home Fiber and mobile performance meets contracted service levels in UAE's competitive telecommunications landscape. Our du speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality and helping optimize your internet experience across du's expanding fiber and 5G networks.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ae" currentProviderSlug="du" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
