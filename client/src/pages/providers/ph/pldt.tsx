import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PLDTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "PLDT Speed Test Philippines - Check PLDT Fibr Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test PLDT Fibr internet speed instantly - Free speed checker for Philippines. Accurate download/upload speeds, ping & jitter results in seconds.');
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/ph/pldt';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "PLDT Speed Test Philippines",
      "description": "Test your PLDT Fibr internet speed for free. Speed test for PLDT fiber and DSL customers in the Philippines.",
      "url": "https://speedtestboost.com/providers/ph/pldt",
      "provider": {
        "@type": "Organization",
        "name": "PLDT",
        "description": "Philippines' largest telecommunications provider offering Fibr fiber internet and DSL broadband services",
        "areaServed": { "@type": "Country", "name": "Philippines" },
        "serviceType": ["Fiber Internet", "DSL Broadband", "Mobile Services", "TV Services"]
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
      <Header currentPath="/providers/ph/pldt" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Pldt", href: "/providers/ph/pldt" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              PLDT Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">PLDT Fibr internet speed</span> for free. Check your fiber or DSL internet performance across the Philippines.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test PLDT Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About PLDT Philippines</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  PLDT dominates the Philippines telecommunications landscape with 48% market share in fixed broadband services, establishing itself as the nation's undisputed market leader. As the country's largest and most established internet service provider, PLDT Fibr delivers reliable high-speed connectivity to millions of Filipino households and businesses through its extensive fiber optic infrastructure spanning Metro Manila, Luzon, Visayas, and Mindanao, maintaining dual leadership in both mobile and fixed-line telecommunications.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Nationwide Coverage & Market Leadership</h3>
                <p className="text-muted-foreground">
                  PLDT maintains the Philippines' most comprehensive telecommunications network, reaching major urban centers including Manila, Quezon City, Cebu, and Davao, while continuously expanding to provincial communities across the archipelago. The company's Fibr brand represents decades of infrastructure investment and technological innovation, providing gigabit-capable internet access to residential and enterprise customers. This extensive nationwide coverage ensures PLDT remains the Filipino people's preferred choice for reliable, high-performance internet connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">PLDT Fibr Network Technology</h3>
                <p className="text-muted-foreground">
                  PLDT Fibr's advanced fiber-to-the-home (FTTH) network delivers symmetrical upload and download speeds up to 1 Gbps in select metro areas, supporting bandwidth-intensive applications like 4K streaming, online gaming, remote work, and smart home ecosystems. The company's ongoing fiber deployment strategy prioritizes major business districts and residential communities while gradually extending next-generation connectivity to underserved regions. PLDT's hybrid fiber-DSL infrastructure ensures reliable service delivery across diverse geographical challenges in the Philippine islands.
                </p>

                <h3 className="text-xl font-semibold mb-3">Speed Testing Importance</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps PLDT customers verify their internet performance matches contracted service levels and troubleshoot connectivity issues. Our PLDT speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your connection quality across the Philippines' varying network conditions. These metrics are essential for optimizing home network configurations, identifying service degradation, and ensuring your PLDT Fibr subscription delivers the high-performance connectivity you're paying for.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="ph" currentProviderSlug="pldt" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
