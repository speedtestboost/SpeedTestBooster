import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DITOSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "DITO Speed Test Philippines - Check 5G & Home Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test DITO 5G & home broadband internet speed instantly - Free speed test for Philippines. Accurate mobile WiFi performance results in seconds.');
    }

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/providers/ph/dito';


    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "DITO Speed Test Philippines",
      "description": "Test your DITO Telecommunity internet speed for free. Speed test for DITO mobile and home broadband customers in the Philippines.",
      "url": "https://speedtestboost.com/providers/ph/dito",
      "provider": {
        "@type": "Organization",
        "name": "DITO Telecommunity",
        "description": "Philippines' third major telecommunications player disrupting the market with 5G-first infrastructure and competitive pricing",
        "areaServed": { "@type": "Country", "name": "Philippines" },
        "serviceType": ["5G Mobile", "4G Mobile", "Home Broadband", "Wireless Internet"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);

      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/ph/dito" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Dito", href: "/providers/ph/dito" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              DITO Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">DITO Telecommunity internet speed</span> for free. Check your 4G, 5G mobile, and home broadband performance across the Philippines.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test DITO Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About DITO Telecommunity Philippines</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  DITO Telecommunity has emerged as the Philippines' third major telecommunications player with over 15 million subscribers, breaking the decades-long PLDT-Globe duopoly. Backed by Chinese technology investment and strategic Filipino partnerships, DITO launched in 2021 with aggressive 5G-first infrastructure deployment, competitive pricing strategies, and commitment to service quality standards. The company's rapid market penetration challenges established providers, offering Filipino consumers genuine choice in mobile connectivity and wireless home broadband solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Market Disruption & Duopoly Breaking</h3>
                <p className="text-muted-foreground">
                  DITO's entry into the Philippine telecommunications market represents the most significant industry disruption in decades, introducing genuine competition to the PLDT-Globe duopoly that dominated mobile and fixed services. The company's Chinese technology partnership brings advanced 5G infrastructure expertise, enabling rapid network deployment across Luzon, Visayas, and Mindanao. DITO's aggressive pricing and service quality commitments force established providers to improve offerings, benefiting all Filipino consumers through increased competition, lower prices, and accelerated technology deployment.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Infrastructure & Technology Focus</h3>
                <p className="text-muted-foreground">
                  DITO's greenfield 5G network infrastructure delivers next-generation mobile connectivity from launch, bypassing legacy technology constraints that burden traditional providers. The company's 5G-first strategy prioritizes high-speed mobile broadband, wireless home internet solutions, and enterprise connectivity with minimal investment in outdated technologies. DITO's modern network architecture supports ultra-low latency applications, massive device connectivity, and future-ready bandwidth capacity, positioning the company as the Philippines' technology-forward telecommunications choice.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Verification & Performance Needs</h3>
                <p className="text-muted-foreground">
                  Regular speed testing is essential for DITO customers to verify 5G and 4G network performance, validate service quality commitments, and optimize mobile connectivity experiences. Our DITO speed test measures download speeds, upload speeds, ping latency, and network stability across mobile and home broadband connections, providing accurate assessment of your service quality. These diagnostics help confirm DITO delivers its promised performance standards, identify coverage optimization opportunities, and ensure your mobile or home wireless internet meets modern connectivity requirements.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ph" currentProviderSlug="dito" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
