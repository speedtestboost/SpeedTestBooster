import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function O2DESpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "O2 Speed Test Germany - Check DSL & LTE Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test O2 DSL & LTE internet speed instantly - Free speed checker for Germany. Accurate download/upload performance results in seconds.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/de/o2-de';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "O2 Germany Speed Test",
      "description": "Test your O2 Germany internet speed for free. Speed test for O2 DSL and mobile customers.",
      "url": "https://speedtestboost.com/providers/de/o2-de",
      "provider": {
        "@type": "Organization",
        "name": "O2 Germany",
        "description": "German telecommunications company providing DSL internet and mobile services",
        "areaServed": { "@type": "Country", "name": "Germany" },
        "serviceType": ["DSL Internet", "LTE", "Mobile", "Business Services"]
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
      <Header currentPath="/providers/de/o2-de" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "O2 De", href: "/providers/de/o2-de" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              O2 Germany Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">O2 Germany internet speed</span> for free. Check your DSL or LTE internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test O2 Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About O2 Germany</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  O2 Germany, operating as part of the Spanish Telefónica Group, represents one of Germany's major 
                  telecommunications companies with a focus on mobile communications and internet services. Known 
                  for competitive pricing and customer-friendly approaches, O2 serves millions of German customers 
                  with comprehensive mobile, internet, and digital services while maintaining strong market presence 
                  in Germany's competitive telecommunications landscape.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Mobile Network Excellence</h3>
                <p className="text-muted-foreground">
                  O2 operates one of Germany's three national mobile networks, providing extensive coverage across 
                  urban and rural areas throughout the country. The company's mobile infrastructure supports both 
                  traditional cellular communications and mobile internet services, including LTE and emerging 5G 
                  technologies. This mobile expertise positions O2 as a significant player in Germany's wireless 
                  communications market and mobile internet sector.
                </p>

                <h3 className="text-xl font-semibold mb-3">Competitive Market Position</h3>
                <p className="text-muted-foreground">
                  O2 Germany distinguishes itself through competitive pricing strategies and customer-centric service 
                  approaches that challenge traditional telecommunications models. The company focuses on providing 
                  value-oriented services that appeal to price-conscious consumers while maintaining service quality 
                  standards. This market positioning makes O2 an attractive alternative for customers seeking 
                  affordable internet and mobile services without compromising essential features.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital Innovation Focus</h3>
                <p className="text-muted-foreground">
                  As part of the international Telefónica Group, O2 Germany benefits from global telecommunications 
                  expertise and technological innovation, implementing advanced digital services and customer 
                  experience improvements. The company emphasizes digital-first customer interactions, self-service 
                  capabilities, and modern telecommunications solutions that reflect contemporary consumer preferences 
                  for streamlined, technology-enabled services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Internet Service Portfolio</h3>
                <p className="text-muted-foreground">
                  O2 Germany provides internet services through multiple technologies including DSL connections and 
                  mobile LTE networks, offering customers flexibility in choosing connectivity solutions that match 
                  their specific needs and locations. The company's internet services emphasize reliability and 
                  affordability, making broadband access available to diverse customer segments across Germany's 
                  varied geographic and economic landscape.
                </p>

                <h3 className="text-xl font-semibold mb-3">Service Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps O2 Germany customers monitor their internet performance and ensure 
                  optimal service delivery from their DSL or mobile connection. Our O2 speed test measures download 
                  speeds, upload speeds, and network latency, providing insights into your broadband performance. 
                  This testing helps identify connectivity variations and ensures you're receiving the internet 
                  speeds and reliability expected from O2's telecommunications services.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="de" currentProviderSlug="o2-de" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
