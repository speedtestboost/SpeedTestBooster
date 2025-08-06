import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function TelusSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Telus Speed Test - Test Telus Internet Speed Canada 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Telus internet speed for free. Telus Canada speed test for fiber internet, LTE, and telecommunications services.');
    }

    // Add canonical tag
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `${window.location.origin}/providers/ca/telus`);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Telus Speed Test",
      "description": "Test your Telus internet speed for free. Speed test for Telus fiber and LTE customers.",
      "url": `${window.location.origin}/providers/ca/telus`,
      "provider": {
        "@type": "Organization",
        "name": "Telus",
        "description": "Canadian telecommunications company providing fiber internet and wireless services",
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": ["Fiber Internet", "LTE", "Mobile", "TV", "Business Services"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) document.head.removeChild(existingCanonical);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/ca/telus" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              Telus Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">Telus internet speed</span> for free. Check your Telus fiber or LTE internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Telus Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Telus</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Telus stands as one of Canada's leading telecommunications companies, with a strong focus on western 
                  Canada and innovative digital health and agriculture solutions. Founded in 1990 through the privatization 
                  of government telephone services, Telus has evolved into a technology-forward company that combines 
                  traditional telecommunications with cutting-edge digital services, serving millions of Canadians with 
                  fiber internet, wireless, and specialized business solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Western Canadian Leadership</h3>
                <p className="text-muted-foreground">
                  Telus operates extensive telecommunications infrastructure across western Canada, with particular 
                  strength in British Columbia, Alberta, and other western provinces. The company's regional focus 
                  allows for deep community connections and specialized services tailored to western Canadian markets, 
                  including rural and remote communities that require reliable connectivity for resource industries 
                  and agricultural operations.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Innovation</h3>
                <p className="text-muted-foreground">
                  Telus has invested heavily in pure fiber-optic network infrastructure, delivering PureFibre services 
                  that provide symmetrical upload and download speeds directly to homes and businesses. The company's 
                  fiber expansion program emphasizes both urban centers and smaller communities, supporting Canada's 
                  digital infrastructure goals while enabling bandwidth-intensive applications like 4K streaming, 
                  cloud computing, and smart home technologies.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital Innovation Focus</h3>
                <p className="text-muted-foreground">
                  Beyond traditional telecommunications, Telus has positioned itself as a leader in digital health, 
                  agriculture technology, and smart city solutions. Telus Health provides digital health platforms 
                  and services, while Telus Agriculture offers precision farming and supply chain solutions. This 
                  diversification demonstrates how modern telecommunications companies can leverage connectivity 
                  infrastructure to enable specialized digital services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Sustainability and Community Commitment</h3>
                <p className="text-muted-foreground">
                  Telus emphasizes environmental sustainability and community investment as core business principles, 
                  with significant commitments to carbon neutrality and community development programs. The company's 
                  approach to telecommunications infrastructure considers long-term environmental impact while supporting 
                  local communities through technology access and digital literacy programs. This sustainable approach 
                  appeals to environmentally conscious consumers and businesses.
                </p>

                <h3 className="text-xl font-semibold mb-3">Network Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Telus customers monitor their internet performance and ensure optimal 
                  service delivery from their fiber or wireless connection. Our Telus speed test measures download 
                  speeds, upload speeds, and network latency, providing insights into your broadband performance. 
                  This testing is particularly valuable for Telus customers who rely on consistent connectivity 
                  for work, entertainment, and specialized digital applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}