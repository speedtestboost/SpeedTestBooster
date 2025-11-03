import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function SkySpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Sky Speed Test UK - Check Fibre Broadband Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Sky Fibre broadband speed instantly - Free speed test for UK. Accurate download/upload superfast performance results in seconds.');
    }

    // Update canonical tag
    const canonical = document.createElement('link');

    canonical.rel = 'canonical';

    canonical.href = 'https://speedtestboost.com/providers/uk/sky';

    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Sky Broadband Speed Test",
      "description": "Test your Sky broadband speed for free. Speed test for Sky fibre internet and TV customers.",
      "url": "https://speedtestboost.com/providers/uk/sky",
      "provider": {
        "@type": "Organization",
        "name": "Sky",
        "description": "Leading UK broadband and TV provider offering superfast fibre internet and entertainment services",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "serviceType": ["Fibre Broadband", "TV", "Mobile", "Entertainment"]
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
      <Header currentPath="/providers/uk/sky" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Sky", href: "/providers/uk/sky" }
            ]} 
          />
          
          {/* Hero Section with Speed Test */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Sky Broadband Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Sky broadband speed</span> for free. Check your Sky fibre internet performance and connection quality.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Sky Speed Now
              </Button>
            </div>
          </div>

          {/* SEO Content About Sky */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Sky Broadband</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Sky is one of the UK's most popular broadband and entertainment providers, serving millions of customers 
                  across Britain with superfast fibre broadband, comprehensive TV packages, and mobile services. Known 
                  for exceptional customer service and reliable connectivity, Sky has established itself as a household 
                  name in British telecommunications.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Sky's UK Market Position</h3>
                <p className="text-muted-foreground">
                  As part of Comcast Corporation, Sky operates as a major telecommunications provider in the United Kingdom, 
                  competing directly with BT, Virgin Media, and other leading internet service providers. The company has 
                  built a strong reputation for bundling high-quality broadband with premium entertainment content, making 
                  it particularly attractive to households seeking comprehensive digital services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Technology and Infrastructure</h3>
                <p className="text-muted-foreground">
                  Sky broadband utilizes Openreach's extensive fibre network infrastructure, ensuring wide availability 
                  across the UK. The service operates on both FTTC (Fibre to the Cabinet) and FTTP (Fibre to the Premises) 
                  technologies, delivering consistent broadband performance to urban and rural communities. Sky's network 
                  investments focus on reliability and customer satisfaction rather than headline speeds alone.
                </p>

                <h3 className="text-xl font-semibold mb-3">Customer Experience Focus</h3>
                <p className="text-muted-foreground">
                  Sky differentiates itself through superior customer service, winning multiple awards for technical support 
                  and customer satisfaction. The company provides comprehensive self-service options through the Sky app, 
                  professional installation services, and 24/7 technical support. Sky's approach emphasizes long-term 
                  customer relationships over short-term promotional pricing.
                </p>

                <h3 className="text-xl font-semibold mb-3">Entertainment Integration</h3>
                <p className="text-muted-foreground">
                  What sets Sky apart from traditional internet providers is its seamless integration of broadband with 
                  world-class entertainment services. Sky TV, Sky Sports, Sky Cinema, and streaming services are optimized 
                  for Sky broadband connections, ensuring buffer-free viewing and enhanced streaming quality. This integrated 
                  approach makes Sky particularly popular among sports fans and entertainment enthusiasts.
                </p>

                <h3 className="text-xl font-semibold mb-3">Testing Your Sky Connection</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Sky customers monitor their broadband performance and ensure optimal service 
                  delivery. Our Sky speed test measures your actual download speeds, upload speeds, and connection latency, 
                  helping identify any performance issues. This information is valuable for troubleshooting connectivity 
                  problems and optimizing your home network setup for Sky's services.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="uk" currentProviderSlug="sky" />
        </div>
      </main>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
