import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ConvergeSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Converge Speed Test Philippines - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Converge pure fiber internet speed instantly - Free speed test for Philippines. Accurate download/upload FTTH performance results now.');
    }

    setCanonicalHref('https://speedtestboost.com/providers/ph/converge');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Converge Speed Test Philippines",
      "description": "Test your Converge ICT pure fiber internet speed for free. Speed test for Converge fiber-only network customers in the Philippines.",
      "url": "https://speedtestboost.com/providers/ph/converge",
      "provider": {
        "@type": "Organization",
        "name": "Converge ICT",
        "description": "Philippines' fastest-growing pure fiber telecommunications provider disrupting the market with competitive pricing",
        "areaServed": { "@type": "Country", "name": "Philippines" },
        "serviceType": ["Pure Fiber Internet", "Fiber-to-the-Home", "Business Solutions"]
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
      <Header currentPath="/providers/ph/converge" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Converge", href: "/providers/ph/converge" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              Converge Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">Converge ICT pure fiber internet speed</span> for free. Check your fiber-only network performance across the Philippines.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Converge Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Converge ICT Philippines</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Converge ICT Solutions has emerged as the Philippines' fastest-growing telecommunications provider, disrupting the traditional PLDT-Globe duopoly with its pure fiber-optic network infrastructure. As the nation's only 100% fiber internet service provider, Converge delivers consistently high-speed connectivity at competitive price points, rapidly expanding its subscriber base through superior network performance and customer-centric service approach. The company's pure-fiber strategy eliminates legacy copper infrastructure limitations, ensuring all customers experience true fiber-to-the-home speeds.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Market Disruption & Rapid Expansion</h3>
                <p className="text-muted-foreground">
                  Converge has challenged industry giants through aggressive infrastructure investment and competitive pricing strategies, offering premium fiber speeds at rates significantly below traditional providers. The company's rapid expansion across Metro Manila, Cavite, Laguna, and key provincial cities demonstrates strong market demand for reliable, affordable fiber connectivity. Converge's pure-fiber approach resonates with Filipino consumers seeking consistent high-speed internet without the service degradation common in hybrid fiber-copper networks, driving unprecedented subscriber growth.
                </p>

                <h3 className="text-xl font-semibold mb-3">Pure Fiber Technology & Pricing</h3>
                <p className="text-muted-foreground">
                  Converge's 100% fiber-optic network delivers symmetrical speeds from 35 Mbps entry-level plans to 3500 Mbps enterprise solutions, all utilizing genuine fiber-to-the-home technology without copper bottlenecks. The company's competitive pricing disrupts market norms, offering gigabit speeds at costs previously associated with slower DSL or cable connections. This pure-fiber infrastructure ensures consistent performance during peak hours, reliable low-latency gaming experiences, and future-proof bandwidth capacity for evolving household connectivity demands.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring & Service Focus</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Converge customers verify their pure fiber connection delivers advertised performance levels and maintains service quality consistency. Our Converge speed test measures download speeds, upload speeds, ping latency, and network stability, providing accurate assessment of your fiber-only network performance. These diagnostics are essential for confirming Converge's service quality commitments, optimizing home network setups, and ensuring your pure fiber investment delivers the superior connectivity experience that distinguishes Converge from traditional providers.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ph" currentProviderSlug="converge" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
