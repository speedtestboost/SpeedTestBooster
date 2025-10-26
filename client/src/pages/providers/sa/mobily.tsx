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

export default function MobilySpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Mobily Speed Test Saudi Arabia - Check Fiber & 5G Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Mobily fiber & 5G internet speed instantly - Free speed test for Saudi Arabia. Accurate download/upload broadband performance results now.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/sa/mobily';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Mobily Speed Test Saudi Arabia",
      "description": "Test your Mobily fiber internet speed for free. Speed test for Mobily fiber and mobile customers in Saudi Arabia.",
      "url": "https://speedtestboost.com/providers/sa/mobily",
      "provider": {
        "@type": "Organization",
        "name": "Mobily",
        "description": "Saudi Arabia's major telecommunications competitor offering high-speed fiber broadband and mobile services",
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
        "serviceType": ["Fiber Internet", "5G Mobile", "Business Solutions", "Enterprise Services"]
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
      <Header currentPath="/providers/sa/mobily" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "Saudi Arabia", href: "/internet-providers" },
              { label: "Mobily", href: "/providers/sa/mobily" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              Mobily Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">Mobily fiber internet speed</span> for free. Check your high-speed fiber and mobile performance across Saudi Arabia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Mobily Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Mobily Saudi Arabia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Mobily, officially known as Etihad Etisalat, stands as Saudi Arabia's strong second-place telecommunications provider, delivering competitive fiber broadband and mobile services to millions of customers nationwide. As a major market challenger, Mobily combines innovative technology deployment with customer-focused service offerings, positioning itself as the preferred alternative for both residential and business customers seeking high-performance connectivity at competitive prices.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Competitive Market Position</h3>
                <p className="text-muted-foreground">
                  Operating under the Etihad Etisalat brand, Mobily maintains a robust nationwide infrastructure that rivals the market leader in coverage and quality. The company's strategic investments in network modernization ensure customers across major Saudi cities enjoy reliable, high-speed internet access. Mobily's competitive positioning emphasizes value-driven service packages that combine fiber broadband, mobile connectivity, and digital services, appealing to cost-conscious consumers and businesses seeking comprehensive telecommunications solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Offerings & 5G Deployment</h3>
                <p className="text-muted-foreground">
                  Mobily's fiber network delivers gigabit-capable broadband services across Saudi Arabia's urban centers, with ongoing expansion into suburban markets. The company's fiber-to-the-home (FTTH) deployment strategy prioritizes high-density residential areas and business districts, offering symmetrical speeds that support bandwidth-intensive applications. Complementing its fixed-line infrastructure, Mobily's 5G mobile network provides ultra-fast wireless connectivity, enabling seamless transitions between home and mobile internet access for customers who demand always-on connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Focus & Enterprise Solutions</h3>
                <p className="text-muted-foreground">
                  Beyond consumer services, Mobily targets the enterprise market with specialized business broadband packages, dedicated fiber connections, and managed network services. The company's business-focused approach includes tailored SLAs, priority technical support, and scalable bandwidth options that accommodate growing organizational needs. Regular speed testing allows Mobily customers to verify their connection performance meets contracted service levels, ensuring reliable support for mission-critical business applications, cloud services, and collaborative work platforms essential for modern Saudi enterprises.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="sa" currentProviderSlug="mobily" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
