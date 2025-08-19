import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ATTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "AT&T Speed Test - Test AT&T Fiber Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your AT&T internet speed for free. AT&T fiber speed test for gigabit internet and DSL services nationwide.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/us/att');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AT&T Speed Test",
      "description": "Test your AT&T internet speed for free. Speed test for AT&T fiber and DSL customers.",
      "url": "https://speedtestboost.com/providers/us/att",
      "provider": {
        "@type": "Organization",
        "name": "AT&T",
        "description": "Major US telecommunications company providing fiber and DSL internet services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Fiber Internet", "DSL", "5G", "TV", "Business Services"]
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
      <Header currentPath="/providers/us/att" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              AT&T Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">AT&T internet speed</span> for free. Check your fiber or DSL internet performance nationwide.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test AT&T Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About AT&T</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  AT&T Inc. operates as one of America's oldest and largest telecommunications companies, with a rich 
                  history spanning more than a century of communications innovation. Today, AT&T serves millions of 
                  customers across the United States with comprehensive internet, mobile, and digital services while 
                  maintaining extensive network infrastructure that supports both consumer and enterprise telecommunications 
                  needs throughout the American market.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Network Legacy</h3>
                <p className="text-muted-foreground">
                  AT&T operates one of America's most extensive telecommunications network infrastructures, built upon 
                  decades of investment in copper, fiber, and wireless technologies. The company's network spans rural 
                  communities, suburban areas, and major metropolitan centers, providing comprehensive coverage that 
                  reflects AT&T's historical role as America's primary telecommunications provider. This extensive 
                  infrastructure foundation enables diverse connectivity solutions across varied geographic markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Expansion</h3>
                <p className="text-muted-foreground">
                  AT&T Fiber represents the company's investment in next-generation network technology, delivering 
                  symmetrical gigabit internet speeds directly to homes and businesses across expanding service areas. 
                  The company's fiber deployment strategy focuses on both urban centers and suburban communities, 
                  providing customers with advanced broadband capabilities that support streaming, remote work, and 
                  smart home applications while competing with other fiber providers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Integrated Communications Platform</h3>
                <p className="text-muted-foreground">
                  AT&T provides integrated telecommunications solutions that combine internet connectivity with mobile 
                  services, television programming, and business communications platforms. The company's approach 
                  emphasizes bundled services that leverage multiple network technologies to provide customers with 
                  comprehensive connectivity solutions. This integration strategy appeals to customers seeking unified 
                  telecommunications services from a single provider.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise and Business Solutions</h3>
                <p className="text-muted-foreground">
                  AT&T Business delivers sophisticated telecommunications solutions for American enterprises, including 
                  dedicated internet access, private networking, cloud services, and cybersecurity applications. The 
                  company's business division leverages its extensive network infrastructure and technical expertise 
                  to serve large corporations, government agencies, and small businesses with scalable connectivity 
                  solutions that support diverse operational requirements.
                </p>

                <h3 className="text-xl font-semibold mb-3">Connection Quality Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps AT&T customers monitor their internet performance and ensure optimal 
                  service delivery from their fiber, DSL, or wireless connection. Our AT&T speed test measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  reliable internet service that reflects AT&T's telecommunications heritage and technological capabilities.
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