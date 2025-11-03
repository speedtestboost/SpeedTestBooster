import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ClaroArgentinaSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Claro Speed Test Argentina - Check Fiber & Cable Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Claro fiber & cable internet speed instantly - Free speed test for Argentina. Accurate download/upload performance results in seconds.');
    }

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/providers/ar/claro';


    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Claro Speed Test Argentina",
      "description": "Test your Claro internet speed for free. Speed test for Claro fiber and cable customers in Argentina.",
      "url": "https://speedtestboost.com/providers/ar/claro",
      "provider": {
        "@type": "Organization",
        "name": "Claro Argentina",
        "description": "América Móvil's Argentine operation offering Claro fiber and cable internet services",
        "areaServed": { "@type": "Country", "name": "Argentina" },
        "serviceType": ["Fiber Internet", "Cable Broadband", "Mobile Services", "TV Services"]
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
      <Header currentPath="/providers/ar/claro" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Claro", href: "/providers/ar/claro" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Claro Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Claro internet speed</span> for free. Check your fiber or cable internet performance across Argentina.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Claro Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Claro Argentina</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Claro Argentina, operating as América Móvil's strategic arm in the country, has emerged as a formidable telecommunications competitor with rapidly growing market share and aggressive infrastructure expansion. Backed by Latin America's largest telecommunications conglomerate, Claro delivers high-speed internet services through advanced fiber optic and cable networks, challenging established market leaders with competitive pricing, innovative service bundles, and the operational expertise of a global telecommunications powerhouse.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Growing Market Share</h3>
                <p className="text-muted-foreground">
                  Claro has steadily increased its presence across Argentina's competitive broadband landscape through strategic infrastructure investments and customer acquisition campaigns targeting both residential and business segments. The company's growth trajectory reflects América Móvil's commitment to the Argentine market, with particular success in major urban areas including Buenos Aires, Rosario, and regional capitals where Claro's combination of reliable service and competitive pricing resonates with consumers seeking alternatives to traditional incumbent providers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Expansion Strategy</h3>
                <p className="text-muted-foreground">
                  Claro's aggressive fiber optic deployment positions the company for long-term market leadership, with fiber-to-the-home infrastructure delivering symmetrical speeds up to 500 Mbps in covered areas. This next-generation network supports bandwidth-intensive applications including 4K streaming, cloud gaming, and remote work scenarios while providing the foundation for future service innovations. Claro's hybrid network approach combines fiber expansion in urban centers with cable broadband coverage in established markets, ensuring comprehensive service availability.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile & Fixed Convergence</h3>
                <p className="text-muted-foreground">
                  Leveraging América Móvil's convergent service expertise, Claro Argentina integrates fixed broadband with mobile connectivity, offering bundled packages that deliver value and convenience to households seeking unified telecommunications solutions. Regular speed testing enables Claro customers to monitor their connection performance, optimize their network setup, and ensure their internet service delivers the reliability and speed necessary for Argentina's increasingly digital economy and entertainment consumption patterns.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ar" currentProviderSlug="claro" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
