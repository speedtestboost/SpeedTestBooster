import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function TotalplaySpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Totalplay Speed Test Mexico - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Totalplay gigabit fiber internet speed instantly - Free speed test for Mexico. Accurate download/upload speeds & low latency results now.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/mx/totalplay');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Totalplay Speed Test Mexico",
      "description": "Test your Totalplay fiber internet speed for free. Speed test for Totalplay customers in Mexico.",
      "url": "https://speedtestboost.com/providers/mx/totalplay",
      "provider": {
        "@type": "Organization",
        "name": "Totalplay",
        "description": "Mexico's premium fiber internet provider offering gigabit speeds and advanced broadband services",
        "areaServed": { "@type": "Country", "name": "Mexico" },
        "serviceType": ["Fiber Internet", "Gigabit Broadband", "TV Services", "Telephony"]
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
      <Header currentPath="/providers/mx/totalplay" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Totalplay Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">Totalplay fiber internet speed</span> for free. Check your gigabit fiber performance across Mexico.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Totalplay Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Totalplay</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Totalplay positions itself as Mexico's premium fiber internet provider, delivering pure fiber-to-the-home connectivity with symmetrical gigabit speeds in major metropolitan areas. Owned by Grupo Salinas with 14% market share, Totalplay targets tech-savvy consumers and businesses requiring high-performance broadband for bandwidth-intensive applications. The company's all-fiber infrastructure eliminates legacy copper limitations, providing future-proof connectivity for Mexico's digital transformation.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Pure Fiber Technology</h3>
                <p className="text-muted-foreground">
                  Unlike competitors offering hybrid copper-fiber solutions, Totalplay exclusively deploys fiber-optic cables directly to customer premises, enabling symmetrical speeds up to 1 Gbps for both downloads and uploads. This infrastructure advantage supports cloud computing, video conferencing, content creation, and smart home ecosystems requiring consistent high-bandwidth connectivity. Totalplay's fiber-only approach future-proofs customer investments as internet demands continue escalating across residential and commercial sectors.
                </p>

                <h3 className="text-xl font-semibold mb-3">Premium Market Position</h3>
                <p className="text-muted-foreground">
                  Totalplay differentiates through premium service quality, advanced features, and bundled entertainment options targeting middle to upper-income households in Mexico City, Monterrey, and other major urban centers. The company emphasizes customer experience with professional installation, responsive technical support, and value-added services like cloud storage and premium streaming partnerships. This premium positioning attracts customers prioritizing reliability and performance over budget pricing.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Verification</h3>
                <p className="text-muted-foreground">
                  Speed testing is critical for Totalplay's gigabit fiber customers to verify they receive contracted speeds and optimal network performance. Our Totalplay speed test measures download speeds, upload speeds, latency, and jitter with precision required for evaluating gigabit-class connections. Regular testing helps identify network congestion, equipment limitations, or configuration issues preventing customers from fully utilizing Totalplay's fiber infrastructure capabilities for professional workflows, competitive gaming, and 8K streaming.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="mx" currentProviderSlug="totalplay" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
