import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ComcastSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Comcast Xfinity Speed Test - Test Xfinity Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Xfinity speed test by Comcast - America\'s largest cable provider. Check Xfinity cable, fiber and WiFi speeds instantly.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/us/comcast');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Comcast Xfinity Speed Test",
      "description": "Test your Comcast Xfinity internet speed for free. Speed test for Xfinity cable and fiber customers.",
      "url": "https://speedtestboost.com/providers/us/comcast",
      "provider": {
        "@type": "Organization",
        "name": "Comcast Xfinity",
        "description": "Major US telecommunications company providing cable and fiber internet services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "Fiber", "TV", "Mobile", "Business Services"]
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
      <Header currentPath="/providers/us/comcast" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Comcast Xfinity Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Comcast Xfinity internet speed</span> for free. Check your cable or fiber internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Xfinity Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Comcast Xfinity</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Comcast Corporation operates as America's largest cable television and internet service provider, 
                  serving millions of customers across the United States under the Xfinity brand. Known for extensive 
                  cable network infrastructure and comprehensive entertainment services, Comcast combines traditional 
                  cable television with advanced internet technologies to provide integrated connectivity and content 
                  solutions for American households and businesses.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Extensive Cable Network Infrastructure</h3>
                <p className="text-muted-foreground">
                  Comcast operates one of the world's largest cable network infrastructures, utilizing hybrid fiber-coaxial 
                  technology to deliver high-speed internet services across diverse American communities. The company's 
                  cable network spans urban centers, suburban neighborhoods, and smaller towns, providing comprehensive 
                  coverage that serves varied demographic and geographic markets. This extensive infrastructure foundation 
                  enables Comcast to offer consistent internet connectivity across its service territories.
                </p>

                <h3 className="text-xl font-semibold mb-3">Integrated Entertainment Platform</h3>
                <p className="text-muted-foreground">
                  Xfinity represents more than internet connectivity, offering integrated entertainment experiences 
                  that combine broadband internet with television programming, streaming services, and digital content 
                  platforms. The company's approach emphasizes convergence between traditional cable television and 
                  modern internet-based entertainment, providing customers with comprehensive media solutions that 
                  leverage high-speed internet infrastructure for enhanced viewing experiences.
                </p>

                <h3 className="text-xl font-semibold mb-3">Advanced Technology Development</h3>
                <p className="text-muted-foreground">
                  Comcast invests significantly in network technology advancement, implementing DOCSIS standards upgrades, 
                  fiber network expansion, and emerging wireless technologies that enhance internet service capabilities. 
                  The company's technical innovation focus includes exploring next-generation cable technologies, 
                  improving network capacity, and developing customer experience technologies that modernize traditional 
                  cable television and internet service delivery.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business and Commercial Services</h3>
                <p className="text-muted-foreground">
                  Comcast Business provides comprehensive telecommunications solutions for American enterprises, including 
                  dedicated internet access, voice services, networking solutions, and cloud-based applications. The 
                  company's business division leverages its extensive network infrastructure to serve commercial customers 
                  with scalable connectivity solutions that support business operations across various industries and 
                  organizational sizes.
                </p>

                <h3 className="text-xl font-semibold mb-3">Service Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Comcast Xfinity customers monitor their internet performance and ensure 
                  optimal service delivery from their cable or fiber connection. Our Xfinity speed test measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  comprehensive internet service that defines Comcast's approach to American telecommunications.
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