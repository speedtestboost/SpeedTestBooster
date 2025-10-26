import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function BTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "BT Speed Test UK - Check Fiber & ADSL Broadband Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test BT fiber & ADSL broadband speed instantly - Free speed test for UK. Accurate download/upload performance results in seconds.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/uk/bt';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "BT Speed Test",
      "description": "Test your BT internet speed for free. Speed test for BT fiber and ADSL customers.",
      "url": "https://speedtestboost.com/providers/uk/bt",
      "provider": {
        "@type": "Organization",
        "name": "BT",
        "description": "Major UK telecommunications company providing fiber and ADSL internet services",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "serviceType": ["Fiber Broadband", "ADSL", "Full Fiber", "TV", "Business Services"]
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
      <Header currentPath="/providers/uk/bt" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "United Kingdom", href: "/internet-providers" },
              { label: "BT", href: "/providers/uk/bt" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              BT Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">BT internet speed</span> for free. Check your fiber broadband or ADSL internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test BT Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About BT</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  BT Group plc represents the United Kingdom's oldest and most established telecommunications company, 
                  with origins tracing back to the founding of the public telephone system. As the incumbent operator, 
                  BT maintains extensive network infrastructure across the UK while serving millions of customers with 
                  comprehensive internet, mobile, and digital services. The company operates critical national 
                  telecommunications infrastructure while competing in modern broadband and business communications markets.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Infrastructure Heritage</h3>
                <p className="text-muted-foreground">
                  BT operates the United Kingdom's most extensive telecommunications network infrastructure, built 
                  upon decades of investment in copper, fiber, and wireless technologies. The company's network 
                  reaches virtually every community across England, Scotland, Wales, and Northern Ireland, providing 
                  comprehensive coverage that reflects BT's historical role as the UK's primary telecommunications 
                  provider. This extensive infrastructure foundation enables diverse connectivity solutions across 
                  varied geographic and demographic markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Advancement</h3>
                <p className="text-muted-foreground">
                  BT's fiber broadband network represents significant modernization of UK telecommunications 
                  infrastructure, delivering superfast and ultrafast broadband services through fiber-to-the-cabinet 
                  and fiber-to-the-premises technologies. The company's fiber deployment strategy encompasses both 
                  urban centers and rural communities, supporting the UK government's digital connectivity goals 
                  while providing customers with advanced broadband capabilities for streaming, remote work, and 
                  digital applications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business and Enterprise Leadership</h3>
                <p className="text-muted-foreground">
                  BT Global Services operates as a major provider of telecommunications solutions for UK and 
                  international businesses, delivering managed networks, cloud services, cybersecurity, and 
                  communication platforms. The company's business division leverages its extensive network 
                  infrastructure and technical expertise to serve large corporations, government agencies, and 
                  public sector organizations with sophisticated connectivity and communication requirements.
                </p>

                <h3 className="text-xl font-semibold mb-3">Technology Innovation Focus</h3>
                <p className="text-muted-foreground">
                  BT invests in emerging telecommunications technologies including 5G networks, Internet of Things 
                  applications, and artificial intelligence solutions that enhance network performance and customer 
                  experiences. The company's innovation strategy emphasizes research and development while maintaining 
                  the reliability and coverage standards expected from the UK's national telecommunications provider. 
                  This technology focus supports both consumer services and specialized business applications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Service Quality Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps BT customers monitor their internet performance and ensure optimal 
                  service delivery from their fiber broadband or ADSL connection. Our BT speed test measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  reliable internet service that reflects BT's telecommunications heritage and infrastructure excellence.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="uk" currentProviderSlug="bt" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}