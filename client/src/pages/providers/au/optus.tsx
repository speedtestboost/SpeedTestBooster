import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function OptusSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Optus Speed Test Australia - Check NBN & 5G Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Optus NBN & 5G internet speed instantly - Free speed test for Australia. Accurate download/upload performance results in seconds.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/au/optus';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Optus Speed Test",
      "description": "Test your Optus internet speed for free. Speed test for Optus NBN and mobile customers.",
      "url": "https://speedtestboost.com/providers/au/optus",
      "provider": {
        "@type": "Organization",
        "name": "Optus",
        "description": "Major Australian telecommunications company providing NBN and 5G services",
        "areaServed": { "@type": "Country", "name": "Australia" },
        "serviceType": ["NBN Internet", "5G Mobile", "TV", "Business Services"]
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
      <Header currentPath="/providers/au/optus" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Optus", href: "/providers/au/optus" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-yellow-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-yellow-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent">
              Optus Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-yellow-500">Optus internet speed</span> for free. Check your NBN or 5G internet performance across Australia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Optus Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Optus</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Optus stands as Australia's second-largest telecommunications company, providing comprehensive 
                  mobile, internet, and digital services to millions of customers across the continent. As a subsidiary 
                  of Singapore Telecommunications, Optus combines international telecommunications expertise with deep 
                  Australian market knowledge, offering competitive alternatives to Telstra while maintaining extensive 
                  network coverage and innovative service offerings.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Network Infrastructure</h3>
                <p className="text-muted-foreground">
                  Optus operates Australia's second-largest mobile network, providing extensive coverage across major 
                  cities, regional centers, and rural areas throughout the country. The company's infrastructure 
                  investments focus on 5G network expansion, NBN service optimization, and maintaining competitive 
                  coverage that serves diverse Australian communities. This network foundation supports both consumer 
                  and business telecommunications needs across Australia's challenging geographic landscape.
                </p>

                <h3 className="text-xl font-semibold mb-3">NBN Service Excellence</h3>
                <p className="text-muted-foreground">
                  As a major NBN retail service provider, Optus leverages its telecommunications expertise to deliver 
                  competitive NBN broadband services across Australia. The company's NBN offerings combine network 
                  technical knowledge with customer service capabilities, providing Australians with reliable internet 
                  access that supports streaming, remote work, and digital applications. Optus' approach to NBN services 
                  emphasizes both performance and value for Australian households and businesses.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Innovation and Development</h3>
                <p className="text-muted-foreground">
                  Optus has invested significantly in 5G network development, bringing next-generation wireless technology 
                  to Australian cities and regional areas. The company's 5G infrastructure supports advanced mobile 
                  communications, 5G home internet services, and emerging applications like IoT and smart city solutions. 
                  This 5G investment positions Optus as a technology leader while providing Australians with wireless 
                  internet alternatives to traditional fixed-line connections.
                </p>

                <h3 className="text-xl font-semibold mb-3">Entertainment and Sports Content</h3>
                <p className="text-muted-foreground">
                  Optus differentiates itself through exclusive sports content and entertainment partnerships, including 
                  English Premier League coverage and streaming service integrations. The company's content strategy 
                  leverages its network infrastructure to provide customers with premium entertainment experiences that 
                  complement internet and mobile services. This approach makes Optus particularly attractive to sports 
                  fans and entertainment-focused customers seeking integrated connectivity and content solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Network Performance Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Optus customers monitor their internet performance and ensure optimal 
                  service delivery across Australia's diverse network conditions. Our Optus speed test measures 
                  download speeds, upload speeds, and network latency for both NBN and mobile connections, providing 
                  insights into your broadband performance. This testing helps identify connectivity variations and 
                  ensures you're receiving the quality service expected from Australia's competitive telecommunications market.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="au" currentProviderSlug="optus" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}