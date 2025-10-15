import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import ProviderFooter from "@/components/ProviderFooter";

export default function MovistarArgentinaSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Movistar Speed Test Argentina - Check Fibra Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Movistar Fibra internet speed instantly - Free speed checker for Argentina. Accurate fiber download/upload speeds & ADSL results now.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/ar/movistar-ar');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Movistar Speed Test Argentina",
      "description": "Test your Movistar Fibra internet speed for free. Speed test for Movistar fiber and ADSL customers in Argentina.",
      "url": "https://speedtestboost.com/providers/ar/movistar-ar",
      "provider": {
        "@type": "Organization",
        "name": "Movistar Argentina",
        "description": "Telefónica's Argentine operation offering Movistar Fibra and ADSL internet services",
        "areaServed": { "@type": "Country", "name": "Argentina" },
        "serviceType": ["Fiber Internet", "ADSL Broadband", "Fixed Line", "TV Services"]
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
      <Header currentPath="/providers/ar/movistar-ar" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Movistar Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Movistar Fibra internet speed</span> for free. Check your fiber or ADSL internet performance across Argentina.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Movistar Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Movistar Argentina</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Movistar Argentina, operating as Telefónica's flagship brand in the country, stands as a major telecommunications force with extensive nationwide fiber deployment and comprehensive service coverage. As one of Argentina's leading internet service providers, Movistar delivers high-speed connectivity through its Movistar Fibra network, serving millions of customers across urban centers and expanding to suburban communities with reliable broadband infrastructure.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Buenos Aires Focus & National Reach</h3>
                <p className="text-muted-foreground">
                  Movistar maintains a strong presence throughout Argentina, with particular emphasis on Buenos Aires and the Greater Buenos Aires metropolitan area where fiber optic infrastructure provides ultra-fast internet speeds. The company's network extends across major cities including Córdoba, Rosario, and Mendoza, delivering consistent high-speed connectivity backed by Telefónica's decades of telecommunications expertise. This extensive coverage ensures Movistar remains competitive in Argentina's dynamic broadband market.
                </p>

                <h3 className="text-xl font-semibold mb-3">Movistar Fibra Technology</h3>
                <p className="text-muted-foreground">
                  The Movistar Fibra network leverages cutting-edge fiber optic technology to deliver symmetrical upload and download speeds reaching up to 500 Mbps in select areas, supporting bandwidth-intensive applications, streaming entertainment services, and smart home connectivity. Movistar's ongoing infrastructure investment prioritizes fiber expansion while maintaining legacy ADSL services for areas awaiting fiber deployment, ensuring comprehensive service availability across Argentina's diverse geography.
                </p>

                <h3 className="text-xl font-semibold mb-3">Entertainment & Convergent Services</h3>
                <p className="text-muted-foreground">
                  Beyond internet connectivity, Movistar Argentina offers integrated entertainment services including Movistar TV with extensive channel lineups, video-on-demand platforms, and convergent packages combining fixed broadband, mobile services, and television. Regular speed testing helps Movistar customers verify their connection performance, optimize streaming quality, and ensure their Fibra service delivers the speed and reliability needed for Argentina's increasingly digital lifestyle.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ar" currentProviderSlug="movistar-ar" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
