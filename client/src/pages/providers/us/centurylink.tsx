import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function CenturyLinkSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "CenturyLink Speed Test - Test CenturyLink Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your CenturyLink internet speed for free. CenturyLink fiber speed test and DSL broadband speed check nationwide.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/us/centurylink');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "CenturyLink Speed Test",
      "description": "Test your CenturyLink internet speed for free. Speed test for CenturyLink fiber and DSL customers.",
      "url": "https://speedtestboost.com/providers/us/centurylink",
      "provider": {
        "@type": "Organization",
        "name": "CenturyLink",
        "description": "Major US telecommunications provider offering fiber and DSL internet services nationwide",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Fiber Internet", "DSL Broadband", "Business Services", "Phone Services"]
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
      <Header currentPath="/providers/us/centurylink" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              CenturyLink Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">CenturyLink internet speed</span> for free. Check your fiber or DSL broadband performance nationwide.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test CenturyLink Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About CenturyLink</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  CenturyLink, now part of Lumen Technologies, represents one of America's most extensive 
                  telecommunications networks, providing internet and communications services across rural 
                  and urban communities nationwide. Operating one of the largest fiber networks in the United States, 
                  CenturyLink serves millions of customers with comprehensive broadband solutions while bridging 
                  the digital divide through extensive rural internet coverage and enterprise-grade business services.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Nationwide Network Coverage</h3>
                <p className="text-muted-foreground">
                  CenturyLink operates an extensive telecommunications infrastructure spanning all 50 states, 
                  delivering internet services to communities that other providers often overlook. The company's 
                  network reaches from major metropolitan areas to rural farming communities, providing essential 
                  broadband connectivity through a combination of fiber-optic lines, DSL technology, and wireless 
                  solutions. This comprehensive coverage makes CenturyLink particularly valuable for customers 
                  in underserved markets seeking reliable internet access.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Expansion</h3>
                <p className="text-muted-foreground">
                  CenturyLink has invested heavily in fiber-optic infrastructure, expanding its fiber network 
                  to deliver high-speed internet directly to homes and businesses across America. The company's 
                  fiber internet service provides symmetrical upload and download speeds that support modern 
                  bandwidth requirements including remote work, video streaming, and cloud applications. This 
                  fiber expansion strategy positions CenturyLink as a competitive alternative to cable providers 
                  in markets seeking advanced broadband technology.
                </p>

                <h3 className="text-xl font-semibold mb-3">DSL Internet Heritage</h3>
                <p className="text-muted-foreground">
                  CenturyLink maintains one of America's largest DSL networks, providing broadband internet 
                  access through existing telephone infrastructure in areas where fiber installation remains 
                  economically challenging. The company's DSL service delivers reliable internet connectivity 
                  to customers in rural and suburban markets, offering affordable broadband options that support 
                  essential online activities. This DSL heritage ensures internet access availability across 
                  diverse geographic regions throughout the United States.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise Business Solutions</h3>
                <p className="text-muted-foreground">
                  CenturyLink provides comprehensive business telecommunications solutions including dedicated 
                  internet access, MPLS networking, cloud connectivity, and managed services that support 
                  American enterprises across all industries. The company's business division leverages its 
                  extensive fiber network to deliver enterprise-grade internet services while maintaining 
                  the reliability and security standards required by corporate customers and government 
                  organizations nationwide.
                </p>

                <h3 className="text-xl font-semibold mb-3">Rural Internet Leadership</h3>
                <p className="text-muted-foreground">
                  CenturyLink plays a crucial role in providing internet access to rural American communities, 
                  participating in federal programs designed to expand broadband availability in underserved 
                  areas. The company's commitment to rural internet service helps bridge the digital divide 
                  by delivering reliable broadband connectivity to farming communities, small towns, and remote 
                  areas where internet access supports economic development and educational opportunities.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps CenturyLink customers monitor their internet performance and 
                  ensure optimal service delivery from their fiber or DSL connection. Our CenturyLink speed test 
                  measures download speeds, upload speeds, and network latency, providing insights into your 
                  broadband performance across the company's diverse network infrastructure. This testing helps 
                  identify connectivity issues and ensures you're receiving the reliable internet service that 
                  defines CenturyLink's nationwide telecommunications excellence.
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