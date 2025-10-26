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

export default function AfrihostSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Afrihost Speed Test South Africa - Check Fiber Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Afrihost fiber internet speed instantly - Free speed test for South Africa. Accurate download/upload performance results in seconds.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/za/afrihost';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Afrihost Speed Test South Africa",
      "description": "Test your Afrihost fiber internet speed for free. Speed test for Afrihost customers in South Africa.",
      "url": "https://speedtestboost.com/providers/za/afrihost",
      "provider": {
        "@type": "Organization",
        "name": "Afrihost",
        "description": "South Africa's established fiber internet provider known for transparent service, value pricing, and tech-savvy community engagement",
        "areaServed": { "@type": "Country", "name": "South Africa" },
        "serviceType": ["Fiber Internet", "Web Hosting", "Domain Services", "Cloud Services"]
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
      <Header currentPath="/providers/za/afrihost" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "South Africa", href: "/internet-providers" },
              { label: "Afrihost", href: "/providers/za/afrihost" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              Afrihost Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">Afrihost fiber internet speed</span> for free. Check your reliable fiber performance across South Africa.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Afrihost Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Afrihost South Africa</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Afrihost has established itself as one of South Africa's most trusted fiber internet providers, built on a foundation of transparent service delivery, competitive pricing, and genuine customer engagement. Since entering the fiber market, Afrihost has leveraged its reputation from web hosting and domain services to create a fiber offering that prioritizes value and reliability. The company's tech-savvy community of subscribers appreciates Afrihost's straightforward approach to internet service provision across South Africa's rapidly expanding fiber infrastructure.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Value-Driven Service Model</h3>
                <p className="text-muted-foreground">
                  Afrihost's value proposition centers on delivering high-quality fiber internet at competitive prices through efficient operations and honest communication. Operating on open-access networks including Vumatel, Openserve, and MetroFibre, Afrihost offers fiber packages from 25 Mbps to 1000 Mbps without hidden fees or unexpected charges. The company's transparent pricing philosophy extends to clear contract terms, straightforward upgrades, and fair billing practices that build customer loyalty in South Africa's increasingly crowded ISP marketplace where trust and value differentiate premium providers from commodity services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Tech-Savvy Community Focus</h3>
                <p className="text-muted-foreground">
                  Afrihost cultivates an engaged community of technically knowledgeable customers through active forums, social media interaction, and transparent communication about network performance and maintenance. This community-driven approach enables collaborative troubleshooting, peer support, and direct dialogue between Afrihost and subscribers that improves service quality continuously. Afrihost's willingness to explain technical details, acknowledge challenges, and involve customers in service improvements creates a unique ISP-customer relationship that resonates with South Africa's growing digital population seeking authentic partnerships rather than transactional service experiences.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing enables Afrihost customers to monitor their fiber connection quality and verify they're achieving the performance their package promises. Our Afrihost speed test measures download speeds, upload speeds, ping latency, and network stability, providing insights critical for optimizing home networks and identifying potential issues. These metrics help customers maximize their Afrihost service value, troubleshoot connectivity problems proactively, and appreciate the consistent performance that makes Afrihost a preferred choice for South African households and businesses demanding reliable, transparent fiber internet service.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="za" currentProviderSlug="afrihost" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
