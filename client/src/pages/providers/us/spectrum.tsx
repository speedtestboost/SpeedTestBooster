import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function SpectrumSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Spectrum Speed Test - Test Charter Spectrum Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Spectrum internet speed for free. Charter Spectrum speed test for cable internet, WiFi, and gig speeds nationwide across America.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/us/spectrum');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Spectrum Speed Test",
      "description": "Test your Spectrum internet speed for free. Speed test for Charter Spectrum cable internet customers.",
      "url": "https://speedtestboost.com/providers/us/spectrum",
      "provider": {
        "@type": "Organization",
        "name": "Charter Spectrum",
        "description": "America's second-largest cable internet provider offering high-speed internet and TV services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "Gig Internet", "WiFi", "TV", "Mobile Services"]
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
      <Header currentPath="/providers/us/spectrum" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Spectrum Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Spectrum internet speed</span> for free. Check your Charter Spectrum cable internet performance and WiFi speeds.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Spectrum Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Charter Spectrum</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Charter Spectrum operates as the second-largest cable internet provider in the United States, 
                  serving over 32 million customers across 41 states with comprehensive broadband, television, 
                  and mobile services. Following Charter Communications' acquisition of Time Warner Cable and 
                  Bright House Networks, Spectrum has established itself as a dominant force in American 
                  telecommunications, offering reliable high-speed internet through advanced cable infrastructure.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Internet Excellence</h3>
                <p className="text-muted-foreground">
                  Spectrum's cable internet network utilizes DOCSIS 3.1 technology to deliver high-speed 
                  broadband connections across urban, suburban, and rural communities throughout America. 
                  The company's hybrid fiber-coaxial infrastructure provides customers with download speeds 
                  ranging from basic residential service to gigabit connections, supporting everything from 
                  basic web browsing to demanding applications like 4K streaming, online gaming, and 
                  remote work requirements.
                </p>

                <h3 className="text-xl font-semibold mb-3">Nationwide Coverage Network</h3>
                <p className="text-muted-foreground">
                  Spectrum maintains one of America's most extensive cable networks, providing internet 
                  service across major metropolitan areas and smaller communities in states from coast to 
                  coast. The company's broad geographic footprint includes significant presence in key 
                  markets such as New York, Los Angeles, Texas, Florida, and the Carolinas, making 
                  Spectrum accessible to millions of American households seeking reliable broadband connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">No Data Caps Policy</h3>
                <p className="text-muted-foreground">
                  Spectrum distinguishes itself in the cable internet market by offering unlimited data 
                  usage across all residential internet plans, eliminating concerns about monthly data 
                  caps or overage fees that affect many competitors. This policy particularly benefits 
                  households with heavy internet usage, including families with multiple streaming devices, 
                  remote workers, students engaged in online learning, and gaming enthusiasts who require 
                  consistent, unrestricted access to high-speed internet.
                </p>

                <h3 className="text-xl font-semibold mb-3">Security and WiFi Technology</h3>
                <p className="text-muted-foreground">
                  Spectrum provides customers with advanced WiFi routers and security features designed 
                  to protect home networks and optimize wireless performance. The company's internet 
                  service includes built-in security software, parental controls, and WiFi 6 capable 
                  equipment that ensures reliable wireless connectivity throughout the home. Spectrum's 
                  technical support infrastructure assists customers with network optimization and 
                  troubleshooting to maintain consistent internet performance.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Internet Solutions</h3>
                <p className="text-muted-foreground">
                  Charter Spectrum Enterprise serves business customers across industries with scalable 
                  internet solutions ranging from small business broadband to enterprise-grade connectivity. 
                  The company's business services include dedicated internet access, managed networking, 
                  voice communications, and cloud connectivity options that support organizations of all 
                  sizes. Spectrum's business division leverages the same reliable cable infrastructure 
                  that serves residential customers while providing enhanced service level agreements 
                  and dedicated technical support for commercial applications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Integration Services</h3>
                <p className="text-muted-foreground">
                  Spectrum Mobile complements the company's internet services by offering wireless phone 
                  plans that integrate seamlessly with home internet subscriptions. Operating as a mobile 
                  virtual network operator using Verizon's cellular infrastructure, Spectrum Mobile provides 
                  customers with unlimited talk, text, and data options that work in conjunction with 
                  Spectrum's extensive WiFi hotspot network, creating a comprehensive connectivity solution 
                  for both home and mobile internet needs.
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