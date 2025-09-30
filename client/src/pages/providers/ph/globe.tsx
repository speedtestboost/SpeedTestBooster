import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";

export default function GlobeSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Globe Speed Test - Test Globe At Home Fiber Internet Philippines 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Globe speed test for At Home Fiber customers. Test Globe internet speeds in Philippines. Check fiber download, upload speeds and WiFi performance.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/ph/globe');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Globe Speed Test Philippines",
      "description": "Test your Globe At Home Fiber internet speed for free. Speed test for Globe fiber customers in the Philippines.",
      "url": "https://speedtestboost.com/providers/ph/globe",
      "provider": {
        "@type": "Organization",
        "name": "Globe Telecom",
        "description": "Philippines' co-leading telecommunications provider offering At Home Fiber internet and 5G mobile services",
        "areaServed": { "@type": "Country", "name": "Philippines" },
        "serviceType": ["Fiber Internet", "5G Mobile", "Entertainment Bundles", "TV Services"]
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
      <Header currentPath="/providers/ph/globe" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Globe Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Globe At Home Fiber internet speed</span> for free. Check your fiber internet performance and WiFi connectivity across the Philippines.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Globe Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Globe Telecom Philippines</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Globe Telecom stands as a joint market leader in the Philippines telecommunications industry with 42% market share in fixed broadband services, competing head-to-head with PLDT. As one of the nation's premier digital solutions platforms, Globe At Home Fiber delivers cutting-edge connectivity to millions of Filipino households through its advanced fiber optic network, while pioneering 5G integration and comprehensive entertainment bundles that combine high-speed internet with premium streaming content.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Co-Leadership & Market Position</h3>
                <p className="text-muted-foreground">
                  Globe Telecom maintains a commanding presence across the Philippine archipelago, serving major metropolitan areas and provincial communities with equal commitment to service excellence. The company's At Home Fiber brand represents innovation-driven infrastructure development, providing gigabit-speed internet access to residential and business customers throughout Metro Manila, Cebu, Davao, and beyond. Globe's dual mobile and fixed-line leadership, combined with strategic 5G deployment, positions the company as a comprehensive telecommunications powerhouse serving diverse Filipino connectivity needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">At Home Fiber & 5G Integration</h3>
                <p className="text-muted-foreground">
                  Globe At Home Fiber's state-of-the-art network delivers symmetrical speeds up to 1 Gbps with integrated entertainment packages including Netflix, Disney+, and Amazon Prime subscriptions. The company's innovative approach combines fiber-to-the-home technology with 5G mobile hotspot capabilities, creating seamless connectivity ecosystems for modern Filipino households. Globe's entertainment bundles differentiate its offerings, providing customers with comprehensive digital lifestyle solutions that extend beyond traditional internet service delivery.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing Requirements</h3>
                <p className="text-muted-foreground">
                  Regular speed testing is crucial for Globe customers to verify fiber internet performance, WiFi coverage quality, and entertainment streaming capabilities. Our Globe speed test measures download speeds, upload speeds, latency, and connection stability, ensuring your At Home Fiber service delivers the high-performance connectivity required for 4K streaming, online gaming, and remote work. These comprehensive diagnostics help optimize your home network configuration and identify potential service issues affecting your Globe internet experience.
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
