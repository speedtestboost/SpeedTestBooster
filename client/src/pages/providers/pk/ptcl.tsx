import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function PTCLSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "PTCL Speed Test - Test PTCL Flash Fiber Internet Speed Pakistan 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free PTCL speed test for Flash Fiber and DSL customers. Test PTCL internet speeds across Pakistan. Check fiber download, upload speeds and latency.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/pk/ptcl');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PTCL Speed Test Pakistan",
      "description": "Test your PTCL Flash Fiber internet speed for free. Speed test for PTCL fiber and DSL customers in Pakistan.",
      "url": "https://speedtestboost.com/providers/pk/ptcl",
      "provider": {
        "@type": "Organization",
        "name": "PTCL",
        "description": "Pakistan's state-owned telecommunications leader offering Flash Fiber and DSL internet services",
        "areaServed": { "@type": "Country", "name": "Pakistan" },
        "serviceType": ["Fiber Internet", "DSL Broadband", "Fixed Line", "TV Services"]
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
      <Header currentPath="/providers/pk/ptcl" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              PTCL Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">PTCL Flash Fiber internet speed</span> for free. Check your fiber or DSL internet performance across Pakistan.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test PTCL Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About PTCL Pakistan</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Pakistan Telecommunication Company Limited (PTCL) stands as Pakistan's dominant fixed broadband leader with a 56.95 performance score, serving millions of customers nationwide as the state-owned telecommunications backbone. As the country's largest and most established internet service provider, PTCL delivers comprehensive connectivity through its Flash Fiber brand and legacy DSL infrastructure, maintaining unparalleled coverage across Pakistan's major cities and rural communities with decades of operational excellence.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">State-Owned Market Leadership</h3>
                <p className="text-muted-foreground">
                  PTCL's state-owned status ensures extensive nationwide reach, operating the most comprehensive telecommunications network spanning from Karachi to Peshawar, Lahore to Quetta. The company's infrastructure investment strategy prioritizes both urban centers and underserved rural regions, providing essential connectivity where private operators find limited commercial viability. This government backing enables PTCL to maintain Pakistan's critical telecommunications infrastructure while continuously modernizing services to meet growing bandwidth demands across residential and enterprise segments.
                </p>

                <h3 className="text-xl font-semibold mb-3">Flash Fiber Rollout</h3>
                <p className="text-muted-foreground">
                  PTCL's Flash Fiber initiative represents Pakistan's most ambitious fiber optic deployment, delivering high-speed internet up to 100 Mbps in select metropolitan areas with plans for continuous expansion. The Flash Fiber network provides symmetrical upload and download capabilities, supporting modern applications like video conferencing, cloud storage, and 4K streaming. While fiber deployment focuses initially on major urban centers including Islamabad, Karachi, and Lahore, PTCL's ongoing infrastructure modernization gradually extends next-generation connectivity to tier-2 and tier-3 cities nationwide.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Test Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps PTCL customers verify their internet performance matches contracted service levels across both Flash Fiber and DSL connections. Our PTCL speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality. These metrics are essential for troubleshooting connectivity issues, optimizing home network configurations, and ensuring your PTCL service delivers the performance you're paying for across Pakistan's diverse network conditions and infrastructure challenges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <ProviderFooter />
    </div>
  );
}
