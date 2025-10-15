import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function VodacomFibreSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Vodacom Speed Test South Africa - Check Fibre Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Vodacom Fibre internet speed instantly - Free speed test for South Africa. Accurate download/upload performance results in seconds.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/za/vodacom-fibre');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Vodacom Fibre Speed Test South Africa",
      "description": "Test your Vodacom Fibre internet speed for free. Speed test for Vodacom fiber customers in South Africa.",
      "url": "https://speedtestboost.com/providers/za/vodacom-fibre",
      "provider": {
        "@type": "Organization",
        "name": "Vodacom",
        "description": "South Africa's leading telecommunications provider offering fiber internet, mobile services, and integrated connectivity solutions",
        "areaServed": { "@type": "Country", "name": "South Africa" },
        "serviceType": ["Fiber Internet", "Mobile Services", "Business Connectivity", "Cloud Services"]
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
      <Header currentPath="/providers/za/vodacom-fibre" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Vodacom Fibre Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Vodacom Fibre internet speed</span> for free. Check your fiber performance across South Africa.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Vodacom Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Vodacom South Africa</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Vodacom stands as South Africa's premier telecommunications provider, serving over 45 million customers with integrated mobile and fiber services. As part of the global Vodafone Group, Vodacom leverages world-class infrastructure and expertise to deliver reliable high-speed internet across urban centers, townships, and rural communities. The company's aggressive fiber expansion strategy has positioned Vodacom Fibre as a major competitor in South Africa's fixed broadband market, combining mobile dominance with cutting-edge fiber technology.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Nationwide Fiber Expansion</h3>
                <p className="text-muted-foreground">
                  Vodacom has invested billions of rand in fiber infrastructure deployment, partnering with open-access networks like Vumatel and Openserve to extend fiber availability throughout South Africa. This strategic approach enables Vodacom to offer fiber packages ranging from 25 Mbps to 1000 Mbps across major metros including Johannesburg, Cape Town, Durban, and Pretoria, with ongoing expansion into secondary cities and developing areas. Vodacom's fiber footprint continues growing rapidly, making gigabit internet accessible to millions of previously underserved South Africans.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile-Fiber Integration</h3>
                <p className="text-muted-foreground">
                  Vodacom's unique advantage lies in seamlessly integrating fiber internet with South Africa's largest mobile network, offering bundled packages that combine home fiber with unlimited mobile data, voice services, and streaming platforms. This convergent approach delivers exceptional value for households seeking comprehensive connectivity solutions. Vodacom customers benefit from synchronized billing, unified customer support, and exclusive rewards programs that leverage the company's extensive ecosystem of services and partnerships across telecommunications, entertainment, and financial technology sectors.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing ensures Vodacom Fibre customers receive the performance promised in their service packages. Our Vodacom speed test measures real-time download speeds, upload speeds, latency, and connection stability, helping identify potential issues with fiber lines, routers, or network congestion. These insights enable customers to optimize their home networks, troubleshoot connectivity problems, and verify they're achieving the full potential of Vodacom's fiber infrastructure across South Africa's diverse urban and suburban landscapes.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="za" currentProviderSlug="vodacom-fibre" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
