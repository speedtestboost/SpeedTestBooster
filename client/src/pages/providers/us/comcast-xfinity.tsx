import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ComcastXfinitySpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Xfinity Speed Test - Test Comcast Xfinity Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Xfinity internet speed for free. Comcast Xfinity speed test for cable internet and fiber customers across the United States.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Xfinity Speed Test",
      "description": "Test your Xfinity internet speed for free. Speed test for Comcast Xfinity customers.",
      "url": `${window.location.origin}/providers/us/comcast-xfinity`,
      "provider": {
        "@type": "Organization",
        "name": "Comcast Xfinity",
        "description": "America's largest cable internet provider offering high-speed broadband and entertainment",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "Fiber Internet", "TV", "Mobile", "Home Security"]
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
      <Header currentPath="/providers/us/comcast-xfinity" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Xfinity Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">Comcast Xfinity internet speed</span> for free. Check your cable or fiber internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
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
                  Comcast Xfinity operates as America's largest cable internet provider, serving over 32 million customers 
                  across 39 states with high-speed broadband, entertainment, and digital services. As the consumer-facing 
                  brand of Comcast Corporation, Xfinity has transformed from a traditional cable TV company into a comprehensive 
                  digital services provider, offering cutting-edge internet technology and integrated home solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Internet Dominance</h3>
                <p className="text-muted-foreground">
                  Xfinity's extensive cable network infrastructure represents one of the largest broadband deployments in 
                  North America, utilizing advanced DOCSIS technology to deliver high-speed internet over coaxial cable 
                  connections. The company's network investments include upgrading to DOCSIS 3.1 and implementing fiber-deep 
                  architectures, ensuring competitive internet speeds while leveraging existing cable infrastructure for 
                  cost-effective service delivery.
                </p>

                <h3 className="text-xl font-semibold mb-3">Integrated Entertainment Ecosystem</h3>
                <p className="text-muted-foreground">
                  Xfinity's strength lies in its integrated approach to home entertainment and connectivity, combining 
                  high-speed internet with comprehensive television programming, streaming services, and smart home 
                  solutions. The X1 and Flex platforms provide unified access to traditional cable channels, streaming 
                  applications, and internet content, creating a seamless entertainment experience that leverages the 
                  underlying broadband connection.
                </p>

                <h3 className="text-xl font-semibold mb-3">Technology Innovation Focus</h3>
                <p className="text-muted-foreground">
                  Comcast invests heavily in network technology and customer experience innovations, including AI-powered 
                  customer service, advanced WiFi solutions, and next-generation entertainment platforms. The company's 
                  xFi platform provides comprehensive home network management, allowing customers to monitor and optimize 
                  their internet connection performance. These technological investments position Xfinity as more than 
                  just an internet provider – it's a comprehensive digital lifestyle enabler.
                </p>

                <h3 className="text-xl font-semibold mb-3">Market Coverage and Accessibility</h3>
                <p className="text-muted-foreground">
                  Xfinity's extensive service footprint covers major metropolitan areas and suburban communities across 
                  39 states, making it accessible to millions of American households. The company's infrastructure reaches 
                  diverse communities, from urban centers to suburban neighborhoods, providing consistent service availability 
                  and competitive options for American consumers seeking reliable broadband connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Connection Performance Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Xfinity customers monitor their internet performance and ensure optimal 
                  service delivery from their cable or fiber connection. Our Xfinity speed test measures download speeds, 
                  upload speeds, and network latency, providing insights into your broadband performance. This testing 
                  helps identify any connectivity issues and ensures you're receiving the internet performance included 
                  in your Xfinity service plan.
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