import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function VodafoneDESpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Vodafone Speed Test Germany - Check Cable & 5G Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Vodafone cable & 5G internet speed instantly - Free speed test for Germany. Accurate download/upload performance results now.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/de/vodafone-de';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Vodafone Germany Speed Test",
      "description": "Test your Vodafone Germany internet speed for free. Speed test for Vodafone cable and mobile customers.",
      "url": "https://speedtestboost.com/providers/de/vodafone-de",
      "provider": {
        "@type": "Organization",
        "name": "Vodafone Germany",
        "description": "Major German telecommunications company providing cable internet and 5G services",
        "areaServed": { "@type": "Country", "name": "Germany" },
        "serviceType": ["Cable Internet", "5G Mobile", "TV", "Business Services"]
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
      <Header currentPath="/providers/de/vodafone-de" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Vodafone De", href: "/providers/de/vodafone-de" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Vodafone Germany Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Vodafone Germany internet speed</span> for free. Check your cable or 5G internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Vodafone Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Vodafone Germany</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Vodafone Germany stands as one of the country's largest telecommunications companies and a key subsidiary 
                  of the global Vodafone Group. Operating Germany's most extensive cable network and advanced 5G infrastructure, 
                  Vodafone serves millions of German customers with comprehensive internet, mobile, and digital services. 
                  The company combines international telecommunications expertise with deep local market knowledge to deliver 
                  innovative connectivity solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Network Excellence</h3>
                <p className="text-muted-foreground">
                  Vodafone operates Germany's largest cable internet network, utilizing advanced hybrid fiber-coaxial 
                  technology to deliver high-speed internet services across the country. The network infrastructure, 
                  enhanced through strategic acquisitions including Unitymedia, provides extensive coverage in urban 
                  and suburban areas. This cable foundation enables Vodafone to offer competitive internet speeds 
                  while leveraging existing infrastructure for cost-effective service delivery.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Innovation Leadership</h3>
                <p className="text-muted-foreground">
                  As part of the global Vodafone network, Vodafone Germany benefits from international 5G expertise 
                  and investment, operating one of Germany's most comprehensive 5G networks. The company's 5G 
                  infrastructure supports not only mobile communications but also innovative services like 5G home 
                  internet and IoT applications for German businesses. This wireless innovation complements Vodafone's 
                  cable services to provide comprehensive connectivity solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business and Enterprise Focus</h3>
                <p className="text-muted-foreground">
                  Vodafone Germany serves as a critical telecommunications partner for German businesses, from small 
                  enterprises to major corporations. The company's business division offers cloud services, IoT solutions, 
                  managed networks, and digital transformation consulting that support Germany's industrial economy. 
                  This enterprise expertise enables Vodafone to provide sophisticated technical solutions while 
                  maintaining competitive consumer services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital Services Integration</h3>
                <p className="text-muted-foreground">
                  Beyond traditional telecommunications, Vodafone Germany offers integrated digital services including 
                  television programming, smart home solutions, and cloud-based applications. The company's approach 
                  emphasizes convergence between fixed and mobile services, providing customers with unified connectivity 
                  experiences across all devices. This integration strategy positions Vodafone as a comprehensive 
                  digital services provider rather than just an internet company.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance and Quality Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Vodafone Germany customers monitor their internet performance and ensure 
                  optimal service delivery from their cable or 5G connection. Our Vodafone speed test measures download 
                  speeds, upload speeds, and network latency, providing valuable insights into your broadband performance. 
                  This testing helps identify connectivity issues and ensures you're receiving the quality service 
                  expected from Germany's leading alternative telecommunications provider.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="de" currentProviderSlug="vodafone-de" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}