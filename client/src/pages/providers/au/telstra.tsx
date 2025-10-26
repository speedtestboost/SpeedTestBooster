import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function TelstraSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Telstra Speed Test Australia - Check NBN & 5G Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Telstra NBN & 5G internet speed instantly - Free speed checker for Australia. Accurate broadband performance results in seconds.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/au/telstra';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Telstra Speed Test",
      "description": "Test your Telstra internet speed for free. Speed test for Telstra NBN and mobile internet customers in Australia.",
      "url": "https://speedtestboost.com/providers/au/telstra",
      "provider": {
        "@type": "Organization",
        "name": "Telstra",
        "description": "Australia's largest telecommunications company providing NBN, mobile, and digital services",
        "areaServed": { "@type": "Country", "name": "Australia" },
        "serviceType": ["NBN Internet", "5G Mobile", "Business Services", "Digital TV"]
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
      <Header currentPath="/providers/au/telstra" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Telstra", href: "/providers/au/telstra" }
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
              Telstra Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Telstra internet speed</span> for free. Check your NBN or mobile internet performance across Australia.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Telstra Speed Now
              </Button>
            </div>
          </div>

          {/* SEO Content About Telstra */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Telstra</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Telstra stands as Australia's largest and most established telecommunications company, with over 150 years 
                  of experience connecting Australians across the vast continent. From its origins as the Postmaster-General's 
                  Department to becoming a privatized telecommunications giant, Telstra has remained the backbone of Australian 
                  communications infrastructure, serving millions of customers with reliable internet, mobile, and digital services.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Network Leadership</h3>
                <p className="text-muted-foreground">
                  Telstra operates Australia's most extensive telecommunications network, covering more geographic area 
                  than any other provider. The company's infrastructure spans from major metropolitan centers to remote 
                  outback communities, ensuring connectivity across Australia's challenging terrain. Telstra's network 
                  investments focus on expanding 5G coverage, enhancing NBN services, and maintaining critical 
                  communications infrastructure for emergency services and government operations.
                </p>

                <h3 className="text-xl font-semibold mb-3">NBN Partnership Excellence</h3>
                <p className="text-muted-foreground">
                  As Australia's leading NBN retail service provider, Telstra leverages its extensive experience and 
                  infrastructure expertise to deliver superior NBN broadband services. The company's wholesale arrangements 
                  and technical capabilities enable optimized NBN performance, comprehensive customer support, and seamless 
                  service provisioning. Telstra's NBN services benefit from the company's deep understanding of Australian 
                  network conditions and customer requirements.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Network Innovation</h3>
                <p className="text-muted-foreground">
                  Telstra's mobile network reaches 99.5% of the Australian population, making it the country's most 
                  comprehensive wireless network. The company leads Australia's 5G rollout, deploying next-generation 
                  technology across major cities and regional centers. Telstra's mobile infrastructure supports not 
                  only consumer communications but also critical business applications, Internet of Things (IoT) 
                  deployments, and emerging technologies requiring low-latency connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise and Government Services</h3>
                <p className="text-muted-foreground">
                  Beyond consumer services, Telstra provides mission-critical telecommunications solutions for Australian 
                  businesses, government agencies, and essential services organizations. The company's enterprise division 
                  offers cloud computing, cybersecurity, managed network services, and digital transformation consulting. 
                  Telstra's role in national security and emergency communications underscores its importance to Australia's 
                  critical infrastructure and economic resilience.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance and Coverage Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Telstra customers monitor their internet and mobile performance across 
                  Australia's diverse geographic conditions. Our Telstra speed test measures download speeds, upload 
                  speeds, and network latency for both NBN and mobile connections. This testing is particularly valuable 
                  given Australia's unique geography and helps ensure optimal performance whether you're in Sydney, 
                  Perth, or remote regional areas.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="au" currentProviderSlug="telstra" />
        </div>
      </main>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}