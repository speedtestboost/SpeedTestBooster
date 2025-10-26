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

export default function TIMESpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "TIME Speed Test Malaysia - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test TIME gigabit fiber internet speed instantly - Free speed test for Malaysia. Accurate download/upload performance & low latency results now.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/my/time';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TIME Speed Test Malaysia",
      "description": "Test your TIME fiber internet speed for free. Speed test for TIME high-speed fiber broadband customers in Malaysia.",
      "url": "https://speedtestboost.com/providers/my/time",
      "provider": {
        "@type": "Organization",
        "name": "TIME dotCom",
        "description": "Malaysia's pure fiber broadband specialist offering competitive gigabit speeds with no data caps",
        "areaServed": { "@type": "Country", "name": "Malaysia" },
        "serviceType": ["Fiber Internet", "Business Broadband", "Unlimited Data", "Low Latency Gaming"]
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
      <Header currentPath="/providers/my/time" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "Malaysia", href: "/internet-providers" },
              { label: "Time", href: "/providers/my/time" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              TIME Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">TIME fiber internet speed</span> for free. Check your high-speed fiber broadband performance and low latency in Malaysia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test TIME Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About TIME Malaysia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  TIME dotCom, Malaysia's pure fiber broadband specialist, distinguishes itself through dedicated focus on high-performance fiber infrastructure without legacy copper networks. As an independent challenger to traditional telcos, TIME delivers competitive gigabit speeds, ultra-low latency, and unlimited data packages to urban markets including Klang Valley, Penang, and Johor Bahru, earning strong reputation among power users, gamers, and bandwidth-intensive households.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Competitive Gigabit Speeds & Urban Focus</h3>
                <p className="text-muted-foreground">
                  TIME's 100% fiber optic network delivers symmetrical speeds up to 1 Gbps in major coverage areas, with aggressive pricing strategies that challenge market incumbents. Focusing exclusively on high-density urban centers and established residential developments, TIME provides consistent gigabit performance without the infrastructure compromises of hybrid fiber-copper networks. The company's strategic urban deployment ensures optimal service quality in Kuala Lumpur, Petaling Jaya, Penang Island, and expanding Johor markets where fiber density supports premium connectivity experiences.
                </p>

                <h3 className="text-xl font-semibold mb-3">Gaming Community & No Data Caps</h3>
                <p className="text-muted-foreground">
                  TIME earned strong following within Malaysia's gaming community through ultra-low latency fiber connections (typically sub-5ms local ping), no traffic shaping, and truly unlimited data without FUP restrictions. The provider's pure fiber architecture eliminates bufferbloat issues common in legacy networks, delivering consistent performance for competitive gaming, 4K streaming, and large file transfers. TIME's transparent network policies and gamer-focused marketing position it as Malaysia's preferred choice for esports enthusiasts and households with multiple heavy users requiring unrestricted gigabit bandwidth.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps TIME customers verify the low-latency, high-bandwidth performance that defines the service. Our TIME speed test measures real-time download speeds, upload speeds, ping latency, and jitter metrics, providing detailed insights into your fiber connection quality. These measurements are crucial for gamers monitoring competitive gaming performance, streamers validating upload capabilities, and power users ensuring they receive the full gigabit speeds without throttling across TIME's expanding Malaysian fiber footprint.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="my" currentProviderSlug="time" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
