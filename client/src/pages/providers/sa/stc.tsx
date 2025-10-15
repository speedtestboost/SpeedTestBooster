import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function STCSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "STC Speed Test Saudi Arabia - Check STC Fiber & 5G Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test STC fiber & 5G internet speed instantly - Free speed checker for Saudi Arabia. Accurate performance results for download, upload & latency.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/sa/stc');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "STC Speed Test Saudi Arabia",
      "description": "Test your STC fiber internet speed for free. Speed test for STC fiber and 5G customers in Saudi Arabia.",
      "url": "https://speedtestboost.com/providers/sa/stc",
      "provider": {
        "@type": "Organization",
        "name": "STC",
        "description": "Saudi Arabia's largest telecommunications provider offering fiber internet and advanced 5G services",
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
        "serviceType": ["Fiber Internet", "5G Mobile", "Smart City Solutions", "Enterprise Services"]
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
      <Header currentPath="/providers/sa/stc" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              STC Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">STC fiber internet speed</span> for free. Check your fiber and 5G performance across Saudi Arabia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test STC Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About STC Saudi Arabia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Saudi Telecom Company (STC) stands as Saudi Arabia's largest and most influential telecommunications provider, commanding 30.33% of the Middle East market share. As the Kingdom's dominant telecom operator, STC delivers cutting-edge connectivity solutions to millions of customers nationwide, driving digital transformation in alignment with Saudi Arabia's ambitious Vision 2030 initiative while maintaining unparalleled network coverage and service quality.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Market Leadership & Vision 2030</h3>
                <p className="text-muted-foreground">
                  STC's market dominance extends across all telecommunications sectors, from fiber broadband to advanced 5G mobile services. As a key strategic partner in Saudi Arabia's Vision 2030 transformation, STC invests billions in infrastructure modernization, deploying next-generation technologies that position the Kingdom as a regional digital leader. The company's nationwide presence ensures reliable connectivity from Riyadh to Jeddah, supporting both consumer needs and enterprise digital transformation initiatives.
                </p>

                <h3 className="text-xl font-semibold mb-3">Nationwide Fiber & 5G Deployment</h3>
                <p className="text-muted-foreground">
                  STC's fiber optic network represents the most extensive deployment in Saudi Arabia, delivering symmetrical gigabit speeds to residential and business customers across major cities and expanding into suburban areas. The company's 5G infrastructure leads the region, providing ultra-low latency and multi-gigabit wireless connectivity that enables smart city applications, autonomous vehicles, and industrial IoT solutions. This dual-infrastructure approach ensures STC customers access world-class internet performance regardless of location or technology preference.
                </p>

                <h3 className="text-xl font-semibold mb-3">Smart City & Innovation Leadership</h3>
                <p className="text-muted-foreground">
                  Beyond traditional connectivity, STC pioneers smart city initiatives that leverage advanced telecommunications infrastructure for urban transformation. The company's innovation labs develop AI-powered network optimization, IoT platforms for smart homes, and cloud-based services that enhance quality of life for Saudi citizens. Regular speed testing helps STC customers verify their connection delivers the performance required for these next-generation applications, from 4K video streaming to real-time cloud gaming and remote healthcare services.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="sa" currentProviderSlug="stc" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
