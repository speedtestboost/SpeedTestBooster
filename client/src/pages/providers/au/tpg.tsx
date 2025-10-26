import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function TPGSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "TPG Speed Test Australia - Check NBN Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test TPG NBN internet speed instantly - Free speed test for Australia. Accurate download/upload speeds and performance results now.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/au/tpg';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TPG Speed Test",
      "description": "Test your TPG internet speed for free. Speed test for TPG NBN and ADSL customers.",
      "url": "https://speedtestboost.com/providers/au/tpg",
      "provider": {
        "@type": "Organization",
        "name": "TPG",
        "description": "Australian telecommunications company providing NBN and internet services",
        "areaServed": { "@type": "Country", "name": "Australia" },
        "serviceType": ["NBN Internet", "ADSL", "Mobile", "Business Services"]
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
      <Header currentPath="/providers/au/tpg" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Tpg", href: "/providers/au/tpg" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              TPG Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">TPG internet speed</span> for free. Check your NBN or ADSL internet performance across Australia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test TPG Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About TPG</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  TPG Telecom operates as one of Australia's major telecommunications companies, formed through the 
                  merger of TPG Corporation and Vodafone Hutchison Australia. Known for competitive pricing and 
                  value-focused services, TPG serves millions of Australian customers with NBN broadband, mobile, 
                  and business telecommunications solutions. The company emphasizes affordable connectivity options 
                  while maintaining service quality standards across Australia's diverse market conditions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Value-Oriented Market Position</h3>
                <p className="text-muted-foreground">
                  TPG has built its reputation on providing competitively priced internet and telecommunications 
                  services that challenge traditional market pricing structures. The company's approach focuses 
                  on delivering essential connectivity features at affordable rates, making broadband access more 
                  accessible to cost-conscious Australian households and businesses. This value positioning has 
                  established TPG as a significant alternative to premium telecommunications providers.
                </p>

                <h3 className="text-xl font-semibold mb-3">NBN Service Specialization</h3>
                <p className="text-muted-foreground">
                  TPG operates as a major NBN retail service provider, leveraging its telecommunications expertise 
                  to deliver reliable NBN broadband services across Australia. The company's NBN offerings emphasize 
                  straightforward service delivery, competitive pricing, and technical support that helps Australian 
                  customers transition to and optimize their NBN connections. TPG's approach to NBN services reflects 
                  its commitment to accessible, reliable internet connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Network Integration</h3>
                <p className="text-muted-foreground">
                  Through its merger with Vodafone Hutchison Australia, TPG operates mobile network infrastructure 
                  that complements its fixed broadband services. This mobile capability enables TPG to provide 
                  comprehensive telecommunications solutions including mobile internet, voice services, and emerging 
                  5G technologies. The integrated mobile and fixed network approach allows TPG to offer bundled 
                  services and comprehensive connectivity solutions for Australian customers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Technical Innovation Focus</h3>
                <p className="text-muted-foreground">
                  TPG emphasizes technical efficiency and network optimization to deliver reliable services at 
                  competitive prices. The company's approach includes investing in network infrastructure, optimizing 
                  service delivery processes, and implementing customer service technologies that support efficient 
                  operations. This technical focus enables TPG to maintain service quality while offering competitive 
                  pricing in Australia's dynamic telecommunications market.
                </p>

                <h3 className="text-xl font-semibold mb-3">Connection Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps TPG customers monitor their internet performance and ensure optimal 
                  service delivery from their NBN or ADSL connection. Our TPG speed test measures download speeds, 
                  upload speeds, and network latency, providing insights into your broadband performance. This 
                  testing helps identify connectivity issues and ensures you're receiving the value-oriented 
                  internet service that defines TPG's approach to Australian telecommunications.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="au" currentProviderSlug="tpg" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}