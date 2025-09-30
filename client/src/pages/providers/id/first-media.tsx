import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function FirstMediaSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "First Media Speed Test Indonesia - Check Cable Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test First Media cable internet speed instantly - Free speed test for Indonesia. Accurate download/upload performance results in seconds.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/id/first-media');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "First Media Speed Test Indonesia",
      "description": "Test your First Media cable internet speed for free. Speed test for First Media customers across Indonesia.",
      "url": "https://speedtestboost.com/providers/id/first-media",
      "provider": {
        "@type": "Organization",
        "name": "First Media",
        "description": "Indonesia's leading cable internet provider offering hybrid fiber-cable services with comprehensive entertainment bundles",
        "areaServed": { "@type": "Country", "name": "Indonesia" },
        "serviceType": ["Cable Internet", "Hybrid Fiber-Cable", "Cable TV", "Digital Entertainment"]
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
      <Header currentPath="/providers/id/first-media" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              First Media Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">First Media cable internet speed</span> for free. Check your cable performance across Indonesia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test First Media Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About First Media Indonesia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  First Media stands as Indonesia's established cable internet leader, pioneering bundled entertainment and connectivity services through its comprehensive hybrid fiber-cable infrastructure. As one of Indonesia's earliest broadband providers, First Media has built extensive cable networks across major urban centers, delivering high-speed internet alongside premium television programming. The company's integrated entertainment approach has made it a household name among Indonesian families seeking combined internet and entertainment solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Network Leadership</h3>
                <p className="text-muted-foreground">
                  First Media's widespread cable infrastructure spans Indonesia's major cities including Greater Jakarta, Surabaya, Bandung, and other urban markets, providing reliable internet connectivity to millions of subscribers. The company's hybrid fiber-cable network combines the capacity of fiber-optic backhaul with the reach of cable distribution, delivering competitive speeds for residential and small business users. First Media's long-standing market presence and established infrastructure give it significant advantages in urban areas where cable deployment is well-established and maintained.
                </p>

                <h3 className="text-xl font-semibold mb-3">Entertainment Bundle Integration</h3>
                <p className="text-muted-foreground">
                  First Media distinguishes itself through comprehensive entertainment packages that bundle high-speed internet with extensive cable television offerings, including international channels, premium sports, movies, and local Indonesian content. This integrated approach appeals to families and entertainment enthusiasts seeking all-in-one home connectivity solutions. The company's internet plans range from basic packages to high-speed tiers up to 150 Mbps, supporting modern streaming demands while complementing traditional cable TV services with on-demand and digital entertainment platforms.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps First Media customers monitor their cable internet performance and ensure consistent service delivery across Indonesia's cable infrastructure. Our First Media speed test accurately measures download speeds, upload speeds, ping latency, and network stability, providing valuable insights into your connection quality. These performance metrics are essential for troubleshooting service issues, optimizing home network setup, and verifying that your First Media cable service delivers the speeds needed for modern internet activities and entertainment streaming throughout Indonesia's urban markets.
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
