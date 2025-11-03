import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MaxisSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Maxis Speed Test Malaysia - Check Fiber & 5G Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Maxis Fiber & 5G internet speed instantly - Free speed test for Malaysia. Accurate download/upload mobile broadband results in seconds.');
    }

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/providers/my/maxis';


    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Maxis Speed Test Malaysia",
      "description": "Test your Maxis Fiber Home internet speed for free. Speed test for Maxis fiber and mobile broadband customers in Malaysia.",
      "url": "https://speedtestboost.com/providers/my/maxis",
      "provider": {
        "@type": "Organization",
        "name": "Maxis",
        "description": "Malaysia's leading mobile operator expanding Maxis Fibre Home services with 5G integration",
        "areaServed": { "@type": "Country", "name": "Malaysia" },
        "serviceType": ["Fiber Internet", "5G Mobile", "Mobile Broadband", "Convergence Plans"]
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
      <Header currentPath="/providers/my/maxis" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Maxis", href: "/providers/my/maxis" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              Maxis Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">Maxis Fiber Home internet speed</span> for free. Check your fiber and mobile broadband performance across Malaysia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Maxis Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Maxis Malaysia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Maxis, Malaysia's leading mobile network operator with over 10 million subscribers, has aggressively expanded its fixed broadband footprint through Maxis Fibre Home services. As a convergence pioneer combining mobile excellence with fiber infrastructure, Maxis leverages its nationwide mobile network strength to deliver integrated connectivity solutions across major Malaysian cities and growing suburban markets.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Maxis Fibre Home Expansion</h3>
                <p className="text-muted-foreground">
                  Maxis Fibre Home rapidly extends high-speed fiber connectivity throughout Klang Valley, Penang, Johor Bahru, and expanding into secondary cities nationwide. By leveraging strategic infrastructure partnerships and its own fiber deployment initiatives, Maxis provides gigabit-capable connections with speeds up to 800 Mbps in select coverage areas. The company's aggressive rollout strategy focuses on high-density residential areas and business districts, complementing its dominant mobile presence with comprehensive fixed broadband offerings.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Integration & Comprehensive Coverage</h3>
                <p className="text-muted-foreground">
                  Maxis uniquely integrates 5G mobile technology with fiber broadband through innovative convergence plans, offering seamless connectivity across home and mobile environments. As Malaysia's first 5G network operator, Maxis provides customers with unified billing, shared data quotas, and consistent high-speed experiences whether on fiber or 5G mobile. This integrated approach, combined with MaxisONE convergence bundles and entertainment partnerships, positions Maxis as Malaysia's premier choice for modern multi-device households requiring reliable connectivity everywhere.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing Needs</h3>
                <p className="text-muted-foreground">
                  Regular speed testing ensures Maxis customers receive optimal performance from both fiber and mobile services. Our Maxis speed test measures real-time download speeds, upload speeds, ping latency, and connection stability, providing comprehensive insights into your broadband quality. These metrics help troubleshoot network issues, validate service tier performance, and optimize your home setup to fully leverage Maxis's fiber and 5G infrastructure across Malaysia's expanding coverage footprint.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="my" currentProviderSlug="maxis" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
