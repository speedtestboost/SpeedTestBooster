import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function PersonalSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Personal Speed Test - Test Personal Flow Internet Speed Argentina 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Personal speed test for Flow customers. Test Personal internet speeds in Argentina. Check fiber and cable broadband performance nationwide.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/ar/personal');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Personal Speed Test Argentina",
      "description": "Test your Personal Flow internet speed for free. Speed test for Personal fiber and cable customers in Argentina.",
      "url": "https://speedtestboost.com/providers/ar/personal",
      "provider": {
        "@type": "Organization",
        "name": "Personal / Telecom Argentina",
        "description": "Major telecommunications provider offering Personal Flow fiber and cable internet services",
        "areaServed": { "@type": "Country", "name": "Argentina" },
        "serviceType": ["Fiber Internet", "Cable Broadband", "Mobile Services", "TV Services"]
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
      <Header currentPath="/providers/ar/personal" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Personal Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">Personal Flow internet speed</span> for free. Check your fiber or cable internet performance across Argentina.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Personal Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Personal / Telecom Argentina</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Personal, operating as Telecom Argentina's consumer brand, represents one of Argentina's most formidable telecommunications competitors with extensive market presence and innovative service offerings. Through its Personal Flow branded internet services, the company delivers high-speed connectivity combining fiber optic and cable technologies to millions of Argentine households, establishing itself as a major player challenging traditional market leaders with competitive pricing and comprehensive coverage.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Flow Branded Services</h3>
                <p className="text-muted-foreground">
                  Personal Flow integrates cutting-edge broadband technology with entertainment services, offering customers seamless access to high-speed internet, streaming content, and television packages under a unified brand experience. The Flow platform delivers fiber speeds up to 300 Mbps in select markets while maintaining robust cable infrastructure for broader coverage, ensuring reliable connectivity across Argentina's major urban centers including Buenos Aires, Córdoba, and greater metropolitan regions where demand for digital services continues accelerating.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile & Fixed Integration</h3>
                <p className="text-muted-foreground">
                  As a convergent operator, Personal leverages its strong mobile network presence to offer integrated packages combining fixed broadband with mobile services, creating value propositions that appeal to cost-conscious consumers seeking comprehensive telecommunications solutions. This mobile-fixed convergence strategy enables Personal to compete aggressively against pure-play internet providers, offering bundled discounts and seamless service management that simplifies the customer experience while maximizing household connectivity value.
                </p>

                <h3 className="text-xl font-semibold mb-3">Competitive Market Position</h3>
                <p className="text-muted-foreground">
                  Personal maintains competitive momentum through aggressive fiber expansion, innovative service bundles, and customer-centric digital platforms that streamline installation, billing, and technical support. Regular speed testing empowers Personal Flow customers to verify their connection performance, troubleshoot potential issues, and ensure their broadband service delivers the speeds needed for streaming, gaming, remote work, and smart home applications across Argentina's evolving digital landscape.
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
