import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function RogersSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Rogers Speed Test Canada - Check Cable & Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Rogers cable & fiber internet speed instantly - Free speed test for Canada. Accurate download/upload performance & 5G results now.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/ca/rogers';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rogers Speed Test",
      "description": "Test your Rogers internet speed for free. Speed test for Rogers cable and fiber customers.",
      "url": "https://speedtestboost.com/providers/ca/rogers",
      "provider": {
        "@type": "Organization",
        "name": "Rogers",
        "description": "Major Canadian telecommunications company providing cable and fiber internet services",
        "areaServed": { "@type": "Country", "name": "Canada" },
        "serviceType": ["Cable Internet", "Fiber", "5G", "TV", "Business Services"]
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
      <Header currentPath="/providers/ca/rogers" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Rogers", href: "/providers/ca/rogers" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Rogers Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Rogers internet speed</span> for free. Check your cable, fiber, or 5G internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Rogers Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Rogers</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Rogers Communications stands as one of Canada's largest telecommunications companies, with particular 
                  strength in eastern Canada and extensive network infrastructure serving millions of Canadian customers. 
                  Founded as a radio broadcasting company, Rogers has evolved into a comprehensive telecommunications 
                  provider offering internet, mobile, television, and digital services while maintaining leadership 
                  in Canadian cable and wireless markets.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Eastern Canadian Leadership</h3>
                <p className="text-muted-foreground">
                  Rogers operates extensive telecommunications infrastructure across eastern Canada, with particular 
                  concentration in Ontario and Atlantic provinces. The company's regional strength allows for deep 
                  market penetration and specialized services tailored to eastern Canadian demographics and business 
                  needs. This geographic focus enables Rogers to provide comprehensive connectivity solutions while 
                  maintaining strong community connections and localized customer service.
                </p>

                <h3 className="text-xl font-semibold mb-3">Cable Network Excellence</h3>
                <p className="text-muted-foreground">
                  Rogers operates one of Canada's most extensive cable network infrastructures, utilizing advanced 
                  hybrid fiber-coaxial technology to deliver high-speed internet services across diverse Canadian 
                  communities. The company's cable network spans urban centers, suburban neighborhoods, and smaller 
                  communities, providing comprehensive coverage that supports varied bandwidth requirements. This 
                  cable foundation enables Rogers to offer competitive internet speeds while leveraging proven 
                  infrastructure technology.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G and Wireless Innovation</h3>
                <p className="text-muted-foreground">
                  Rogers has invested significantly in 5G network development and wireless technology advancement, 
                  operating one of Canada's most comprehensive wireless networks. The company's wireless infrastructure 
                  supports advanced mobile communications, 5G home internet services, and emerging IoT applications 
                  that serve both consumer and business customers. This wireless innovation complements Rogers' cable 
                  services to provide comprehensive connectivity solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Sports and Entertainment Integration</h3>
                <p className="text-muted-foreground">
                  Rogers distinguishes itself through significant investments in sports and entertainment content, 
                  including ownership of major league sports teams and broadcasting rights that enhance customer 
                  value propositions. The company's entertainment strategy leverages its network infrastructure 
                  to provide exclusive content experiences that complement internet and mobile services. This 
                  integrated approach appeals to Canadian customers seeking combined connectivity and entertainment solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Network Performance Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Rogers customers monitor their internet performance and ensure optimal 
                  service delivery from their cable, fiber, or wireless connection. Our Rogers speed test measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  comprehensive internet service that reflects Rogers' position as a leading Canadian telecommunications provider.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="ca" currentProviderSlug="rogers" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}