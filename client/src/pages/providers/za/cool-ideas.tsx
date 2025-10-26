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

export default function CoolIdeasSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Cool Ideas Speed Test South Africa - Check Fiber Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Cool Ideas fiber internet speed instantly - Free speed test for South Africa. Accurate download/upload performance results in seconds.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/za/cool-ideas';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cool Ideas Speed Test South Africa",
      "description": "Test your Cool Ideas fiber internet speed for free. Speed test for Cool Ideas customers in South Africa.",
      "url": "https://speedtestboost.com/providers/za/cool-ideas",
      "provider": {
        "@type": "Organization",
        "name": "Cool Ideas",
        "description": "South Africa's award-winning fiber internet service provider with exceptional customer service and competitive pricing",
        "areaServed": { "@type": "Country", "name": "South Africa" },
        "serviceType": ["Fiber Internet", "Business Fiber", "Open-Access Network", "ISP Services"]
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
      <Header currentPath="/providers/za/cool-ideas" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Cool Ideas", href: "/providers/za/cool-ideas" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Cool Ideas Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Cool Ideas fiber internet speed</span> for free. Check your award-winning fiber performance across South Africa.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Cool Ideas Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Cool Ideas South Africa</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Cool Ideas has earned recognition as South Africa's best fiber ISP for 2024, distinguished by exceptional customer service, transparent pricing, and consistently high performance ratings. Operating on open-access fiber networks including Vumatel, Openserve, and Frogfoot, Cool Ideas delivers reliable high-speed internet without the burden of infrastructure ownership, allowing the company to focus exclusively on customer experience and service quality that sets industry benchmarks across South Africa's competitive ISP landscape.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Customer Satisfaction Leadership</h3>
                <p className="text-muted-foreground">
                  Cool Ideas consistently achieves the highest customer satisfaction scores among South African ISPs through responsive support, minimal downtime, and fair billing practices. The company's customer-first philosophy manifests in transparent communication, proactive network monitoring, and rapid issue resolution that builds lasting trust with subscribers. Cool Ideas' community-driven approach includes active social media engagement, regular service updates, and genuine accountability that transforms typical ISP-customer relationships into partnerships built on mutual respect and reliability.
                </p>

                <h3 className="text-xl font-semibold mb-3">Open-Access Network Advantage</h3>
                <p className="text-muted-foreground">
                  By leveraging multiple open-access fiber networks, Cool Ideas provides flexible coverage across South African metros and suburbs while maintaining competitive pricing through reduced infrastructure costs. This strategic model enables Cool Ideas to offer fiber packages from 25 Mbps to 1000 Mbps at prices that challenge larger competitors, with the freedom to switch between network providers to ensure optimal performance. Customers benefit from Cool Ideas' expertise in navigating South Africa's complex fiber ecosystem while enjoying stable, high-performance connectivity backed by service-level guarantees.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing Necessity</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Cool Ideas customers verify they're receiving the exceptional performance the company promises. Our Cool Ideas speed test measures download speeds, upload speeds, latency, and connection quality, providing data essential for monitoring fiber line health and router performance. These metrics enable customers to maximize their Cool Ideas service value, identify potential issues before they impact productivity, and appreciate the consistent speeds that earned Cool Ideas its reputation as South Africa's most reliable and customer-focused fiber internet provider.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="za" currentProviderSlug="cool-ideas" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
