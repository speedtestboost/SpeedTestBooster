import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function OptimumSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Optimum Speed Test - Test Optimum Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Optimum internet speed for free. Optimum cable internet speed test and fiber broadband check in NY, NJ, CT.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/us/optimum');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Optimum Speed Test",
      "description": "Test your Optimum internet speed for free. Speed test for Optimum cable and fiber customers.",
      "url": "https://speedtestboost.com/providers/us/optimum",
      "provider": {
        "@type": "Organization",
        "name": "Optimum",
        "description": "Leading cable internet provider serving New York, New Jersey, and Connecticut",
        "areaServed": ["New York", "New Jersey", "Connecticut"],
        "serviceType": ["Cable Internet", "Fiber Internet", "TV Services", "Phone Services"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'optimum-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#optimum-structured-data');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/optimum" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Optimum Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">Optimum internet speed</span> for free. Check your cable or fiber broadband performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Optimum Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Optimum</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Optimum, operated by Altice USA, stands as the premier cable internet provider across the 
                  tri-state area, delivering high-speed broadband services to millions of customers throughout 
                  New York, New Jersey, and Connecticut. Known for its robust cable network infrastructure 
                  and competitive internet speeds, Optimum provides comprehensive telecommunications solutions 
                  while maintaining a strong regional presence in one of America's most densely populated markets.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Tri-State Market Leadership</h3>
                <p className="text-muted-foreground">
                  Optimum dominates the telecommunications landscape across New York, New Jersey, and Connecticut, 
                  serving dense suburban and urban communities with extensive cable network coverage. The company's 
                  regional focus allows for targeted service delivery and local market expertise that benefits 
                  customers seeking reliable internet connectivity in the competitive Northeast corridor. This 
                  concentrated geographic strategy enables Optimum to provide superior network quality and 
                  customer service within its primary service territories.
                </p>

                <h3 className="text-xl font-semibold mb-3">Advanced Cable Infrastructure</h3>
                <p className="text-muted-foreground">
                  Optimum operates a sophisticated cable network utilizing DOCSIS 3.1 technology to deliver 
                  high-speed internet services capable of supporting modern bandwidth requirements. The company's 
                  cable infrastructure provides reliable broadband connectivity that supports multiple devices, 
                  streaming services, remote work applications, and smart home technologies. This advanced cable 
                  network ensures consistent internet performance across diverse residential and business 
                  environments throughout the tri-state region.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Expansion</h3>
                <p className="text-muted-foreground">
                  Optimum has strategically invested in fiber-optic network expansion, delivering gigabit internet 
                  speeds through fiber-to-the-home connections in select markets across its service area. The 
                  company's fiber initiative provides symmetrical upload and download speeds that exceed traditional 
                  cable capabilities, supporting bandwidth-intensive applications and future-proofing customer 
                  connectivity needs. This fiber expansion positions Optimum competitively against other high-speed 
                  internet providers in key metropolitan markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Bundle Service Solutions</h3>
                <p className="text-muted-foreground">
                  Optimum provides comprehensive bundle solutions combining high-speed internet, television, 
                  and phone services through integrated packages designed to simplify customer telecommunications 
                  needs. The company's bundle approach leverages its cable infrastructure to deliver multiple 
                  services efficiently while offering cost savings and convenience for customers seeking 
                  comprehensive home connectivity solutions. These integrated services appeal to families 
                  and individuals requiring complete telecommunications packages.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Internet Services</h3>
                <p className="text-muted-foreground">
                  Optimum offers dedicated business internet solutions designed to support enterprises, small 
                  businesses, and commercial customers across the tri-state area. The company's business division 
                  provides scalable internet connectivity with service level agreements and technical support 
                  tailored to commercial requirements. These business services leverage Optimum's robust network 
                  infrastructure to deliver reliable connectivity that supports business operations and growth.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Optimum customers monitor their internet performance and ensure 
                  optimal service delivery from their cable or fiber connection. Our Optimum speed test measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance across the company's tri-state network infrastructure. This testing helps identify 
                  connectivity issues and ensures you're receiving the high-speed internet service that defines 
                  Optimum's regional telecommunications excellence.
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