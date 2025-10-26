import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CelcomSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Celcom Speed Test Malaysia - Check Home Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Celcom Home Fiber internet speed instantly - Free speed test for Malaysia. Accurate fiber & mobile broadband performance results now.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/my/celcom';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Celcom Speed Test Malaysia",
      "description": "Test your Celcom Home Fiber internet speed for free. Speed test for Celcom mobile and fiber broadband customers in Malaysia.",
      "url": "https://speedtestboost.com/providers/my/celcom",
      "provider": {
        "@type": "Organization",
        "name": "Celcom",
        "description": "Malaysia's established telecommunications operator expanding Home Fibre services with mobile integration",
        "areaServed": { "@type": "Country", "name": "Malaysia" },
        "serviceType": ["Fiber Internet", "Mobile Broadband", "4G LTE", "Convergence Services"]
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
      <Header currentPath="/providers/my/celcom" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Celcom", href: "/providers/my/celcom" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Celcom Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">Celcom Home Fiber internet speed</span> for free. Check your mobile and fiber broadband performance across Malaysia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Celcom Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Celcom Malaysia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Celcom, Malaysia's oldest and most established telecommunications operator with over 40 years of service heritage, has strategically expanded into fixed broadband through Celcom Home Fibre offerings. As part of the CelcomDigi merger creating Malaysia's largest mobile network, Celcom leverages extensive infrastructure assets and nationwide presence to deliver integrated mobile and fiber connectivity solutions across Peninsular Malaysia and East Malaysia's major markets.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Home Fibre Expansion & Mobile Integration</h3>
                <p className="text-muted-foreground">
                  Celcom Home Fibre expands fiber broadband coverage throughout major Malaysian cities including Kuala Lumpur, Penang, Johor Bahru, Kuching, and Kota Kinabalu, with speeds reaching up to 800 Mbps in select fiber-ready areas. By integrating fixed broadband with Celcom's extensive mobile network strength, customers benefit from unified convergence plans combining fiber internet with mobile postpaid lines, shared data quotas, and seamless billing. This integrated approach positions Celcom uniquely for households seeking comprehensive connectivity solutions from a trusted national carrier.
                </p>

                <h3 className="text-xl font-semibold mb-3">Nationwide Reach & Performance Verification</h3>
                <p className="text-muted-foreground">
                  Celcom's established nationwide infrastructure spanning decades of telecommunications operation ensures reliable service delivery across diverse Malaysian markets from major metropolitan areas to smaller towns. The company's fiber expansion strategy prioritizes coverage breadth alongside speed improvements, making Celcom Home Fibre accessible in locations where newer providers have limited presence. Combined with Celcom's reputation for network stability and customer service heritage, the expanding fiber footprint provides dependable connectivity backed by Malaysia's most experienced telecommunications operator.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing ensures Celcom customers receive optimal performance from both fiber and mobile services across Malaysia's diverse coverage areas. Our Celcom speed test measures real-time download speeds, upload speeds, ping latency, and connection consistency, providing comprehensive insights into your broadband quality. These metrics help verify service tier performance, troubleshoot network issues, and optimize your home setup to fully leverage Celcom's expanding fiber infrastructure and integrated mobile connectivity nationwide.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="my" currentProviderSlug="celcom" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
