import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function MasOrangeSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "MásOrange Speed Test Spain - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test MásOrange fiber internet speed instantly - Free speed test for Spain. Accurate download/upload performance results in seconds.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/es/masorange';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "MásOrange Speed Test Spain",
      "description": "Test your MásOrange fiber internet speed for free. Speed test for MásOrange customers in Spain.",
      "url": "https://speedtestboost.com/providers/es/masorange",
      "provider": {
        "@type": "Organization",
        "name": "MásOrange",
        "description": "Spain's merged telecommunications powerhouse combining Orange and MásMóvil networks",
        "areaServed": { "@type": "Country", "name": "Spain" },
        "serviceType": ["Fiber Internet", "Mobile Services", "Convergent Services", "Value Plans"]
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
      <Header currentPath="/providers/es/masorange" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "Spain", href: "/internet-providers" },
              { label: "Masorange", href: "/providers/es/masorange" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              MásOrange Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">MásOrange fiber internet speed</span> for free. Check your merged network performance across Spain.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test MásOrange Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About MásOrange Spain</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  MásOrange represents Spain's most significant telecommunications merger, combining Orange Spain and MásMóvil to create a formidable competitor with 12% market share and ambitious growth targets. This strategic union brings together Orange's premium network performance and MásMóvil's value-focused customer base, creating a telecommunications powerhouse capable of challenging market leader Movistar through enhanced infrastructure, competitive pricing, and innovative service packages that leverage the combined strengths of both legacy brands.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Combined Network Strength</h3>
                <p className="text-muted-foreground">
                  The MásOrange merger delivers unprecedented network capabilities by integrating Orange's high-performance fiber infrastructure with MásMóvil's extensive coverage footprint across Spain. This combined network provides customers with access to more fiber routes, redundant connectivity options, and enhanced service reliability compared to either company individually. The merged entity accelerates fiber deployment to underserved areas while maintaining Orange's reputation for superior speed consistency and network quality, ensuring customers benefit from both extensive coverage and premium performance standards.
                </p>

                <h3 className="text-xl font-semibold mb-3">Market Consolidation & Competitive Pricing</h3>
                <p className="text-muted-foreground">
                  MásOrange's market position enables aggressive competitive pricing strategies that challenge traditional telecommunications pricing models in Spain. The company leverages merger economies of scale to offer value-oriented packages combining fiber internet, mobile services, and entertainment content at price points that attract price-conscious consumers and families seeking comprehensive connectivity solutions. This competitive positioning drives market innovation, forcing competitors to enhance service quality and pricing transparency while MásOrange builds market share through customer-centric policies and transparent contract terms.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing for Merged Networks</h3>
                <p className="text-muted-foreground">
                  Regular speed testing is essential for MásOrange customers to verify their service delivers the performance promised during the merger transition and beyond. Our MásOrange speed test accurately measures download speeds, upload speeds, ping latency, and connection stability across the combined network infrastructure, helping customers confirm they're receiving optimal performance from the merged telecommunications entity. These insights are valuable for troubleshooting any transition-related connectivity issues and ensuring MásOrange's fiber service meets expectations for reliability and speed consistency across Spain's evolving telecommunications landscape.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="es" currentProviderSlug="masorange" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
