import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MegacableSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Megacable Speed Test Mexico - Check Cable & Fiber Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Megacable cable & fiber internet speed instantly - Free speed test for Mexico. Accurate download/upload broadband results in seconds.');
    }

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/providers/mx/megacable';


    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Megacable Speed Test Mexico",
      "description": "Test your Megacable internet speed for free. Speed test for Megacable MCM cable and fiber customers in Mexico.",
      "url": "https://speedtestboost.com/providers/mx/megacable",
      "provider": {
        "@type": "Organization",
        "name": "Megacable",
        "description": "Western Mexico's leading cable internet provider with 14% market share and growing fiber network",
        "areaServed": { "@type": "Country", "name": "Mexico" },
        "serviceType": ["Cable Internet", "Fiber Internet", "TV Services", "Telephony"]
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

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/mx/megacable" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Megacable", href: "/providers/mx/megacable" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Megacable Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Megacable MCM internet speed</span> for free. Check your cable or fiber performance in western Mexico.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Megacable Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Megacable</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Megacable commands 14% of Mexico's broadband market with dominant presence in western states including Jalisco, Guanajuato, and Michoacán. Operating as MCM (Mass Communications Mexico), the company serves growing metropolitan areas through advanced cable infrastructure while aggressively expanding fiber optic deployment to compete with national providers. Megacable's regional focus enables responsive customer service and competitive pricing tailored to western Mexican communities.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Regional Market Leadership</h3>
                <p className="text-muted-foreground">
                  Megacable's strategic concentration in western Mexico positions it as the preferred provider in Guadalajara, Querétaro, and León, where its network infrastructure delivers superior coverage compared to national competitors. The company's regional expertise translates to faster installation times, localized technical support, and understanding of community-specific connectivity needs. This geographic focus allows Megacable to maintain competitive advantages despite facing larger national telecommunications conglomerates.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Expansion Strategy</h3>
                <p className="text-muted-foreground">
                  Megacable actively invests in fiber-to-the-home (FTTH) deployment across its coverage areas, upgrading traditional cable infrastructure to deliver gigabit-capable connectivity. The company's fiber network targets residential neighborhoods and business districts in mid-sized cities often overlooked by larger providers, creating opportunities in underserved markets. Megacable's hybrid approach maintains reliable cable service while strategically rolling out fiber where demand justifies investment.
                </p>

                <h3 className="text-xl font-semibold mb-3">Connection Quality Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Megacable customers verify their internet performance matches subscribed service tiers. Our Megacable speed test accurately measures download speeds, upload speeds, ping latency, and jitter specific to western Mexico's network conditions. Testing is essential for customers transitioning from cable to fiber service, troubleshooting slowdowns during peak hours, and optimizing home networks for remote work, online education, and entertainment streaming across multiple devices.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="mx" currentProviderSlug="megacable" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
