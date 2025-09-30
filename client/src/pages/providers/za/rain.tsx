import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function RainSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Rain Speed Test South Africa - Check 5G Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Rain 5G & 4G internet speed instantly - Free speed test for South Africa. Accurate wireless broadband performance results in seconds.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/za/rain');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rain Speed Test South Africa",
      "description": "Test your Rain 4G/5G internet speed for free. Speed test for Rain wireless broadband customers in South Africa.",
      "url": "https://speedtestboost.com/providers/za/rain",
      "provider": {
        "@type": "Organization",
        "name": "Rain",
        "description": "South Africa's mobile-first internet provider offering unlimited 4G and 5G home internet services",
        "areaServed": { "@type": "Country", "name": "South Africa" },
        "serviceType": ["4G Internet", "5G Internet", "Wireless Broadband", "Mobile Internet"]
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
      <Header currentPath="/providers/za/rain" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Rain Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">Rain 4G/5G internet speed</span> for free. Check your wireless broadband performance across South Africa.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Rain Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Rain South Africa</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Rain has revolutionized South Africa's internet landscape as the country's leading mobile-first internet service provider. Leveraging cutting-edge 4G and 5G wireless technology, Rain delivers unlimited home internet without the need for traditional fixed-line infrastructure. This disruptive approach has made high-speed internet accessible to millions of South Africans, particularly in areas where fiber deployment remains challenging or cost-prohibitive.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Mobile-First Innovation</h3>
                <p className="text-muted-foreground">
                  Rain pioneered the wireless home internet model in South Africa, offering truly unlimited data packages at competitive prices that challenged traditional fiber providers. Using advanced 4G LTE and 5G networks, Rain eliminates installation complexities and long-term contracts, allowing customers to set up high-speed internet within minutes using plug-and-play routers. This mobile-first strategy positions Rain as the most flexible internet solution for South African households and businesses seeking rapid deployment without infrastructure dependencies.
                </p>

                <h3 className="text-xl font-semibold mb-3">4G/5G Network Coverage</h3>
                <p className="text-muted-foreground">
                  Rain's 5G network rollout across Johannesburg, Cape Town, Pretoria, and other major metros delivers download speeds exceeding 100 Mbps, with 4G coverage extending to suburban and semi-rural areas nationwide. The company's continued investment in network infrastructure ensures expanding coverage and improved performance, making wireless broadband a viable alternative to fiber for streaming, gaming, and remote work. Rain's network optimization focuses on consistent speeds during peak hours, addressing the primary concern of mobile internet users.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing Benefits</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Rain customers monitor their wireless connection quality and verify performance across different times of day. Our Rain speed test measures download speeds, upload speeds, ping latency, and network stability, providing insights crucial for optimizing router placement and antenna positioning. These metrics help identify network congestion periods and determine whether you're achieving the performance expected from Rain's unlimited 4G/5G service throughout South Africa's dynamic wireless environment.
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
