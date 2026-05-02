import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function VirginMediaSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Virgin Media Speed Test UK - Check Cable Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Virgin Media cable internet speed instantly - Free speed test for UK. Accurate ultrafast download/upload performance results now.');
    }

    // Update canonical tag
    setCanonicalHref('https://speedtestboost.com/providers/uk/virgin-media');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Virgin Media Speed Test",
      "description": "Test your Virgin Media broadband speed for free. Speed test for Virgin cable internet and TV customers.",
      "url": "https://speedtestboost.com/providers/uk/virgin-media",
      "provider": {
        "@type": "Organization",
        "name": "Virgin Media",
        "description": "Leading UK cable internet provider offering ultrafast broadband and entertainment services",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "serviceType": ["Cable Broadband", "Fibre Internet", "TV", "Mobile"]
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
      <Header currentPath="/providers/uk/virgin-media" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Virgin Media", href: "/providers/uk/virgin-media" }
            ]} 
          />
          
          {/* Hero Section with Speed Test */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Virgin Media Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Virgin Media broadband speed</span> for free. Check your cable internet performance and connection quality.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Virgin Media Speed Now
              </Button>
            </div>
          </div>

          {/* SEO Content About Virgin Media */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Virgin Media</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Virgin Media is the UK's largest cable internet provider, delivering ultrafast broadband to millions 
                  of homes across Britain through its extensive cable network infrastructure. Known for consistently 
                  high speeds and innovative services, Virgin Media has revolutionized how British households access 
                  internet, television, and mobile services.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Technology Leadership</h3>
                <p className="text-muted-foreground">
                  Unlike traditional broadband providers that rely on Openreach infrastructure, Virgin Media operates 
                  its own comprehensive cable network, enabling greater control over service quality and innovation. 
                  The company's hybrid fibre-coaxial (HFC) network combines fibre optic and coaxial cable technologies 
                  to deliver consistently high-speed internet across the UK, making it particularly attractive to 
                  heavy internet users and gamers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Market Innovation and Competition</h3>
                <p className="text-muted-foreground">
                  Virgin Media has consistently pushed UK broadband boundaries, often being first to market with 
                  breakthrough speed tiers and innovative services. The company's competitive approach has driven 
                  industry-wide improvements in internet speeds and customer service standards. As part of Virgin 
                  Media O2, the merged entity combines leading cable broadband with extensive mobile network coverage.
                </p>

                <h3 className="text-xl font-semibold mb-3">Network Infrastructure Excellence</h3>
                <p className="text-muted-foreground">
                  Virgin Media's network covers approximately 15.5 million UK premises, focusing on urban and suburban 
                  areas where cable infrastructure delivers maximum value. The company's ongoing network investments 
                  include upgrading to DOCSIS 3.1 technology and expanding full fibre capabilities. This infrastructure 
                  independence allows Virgin Media to offer unique services and maintain competitive advantages.
                </p>

                <h3 className="text-xl font-semibold mb-3">Entertainment and Connectivity</h3>
                <p className="text-muted-foreground">
                  Virgin Media excels at bundling high-speed internet with premium television and entertainment services. 
                  The company's Virgin TV packages include exclusive content, 4K programming, and integration with 
                  popular streaming platforms. This entertainment focus, combined with reliable broadband connectivity, 
                  makes Virgin Media particularly popular among families and entertainment enthusiasts.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Testing your Virgin Media connection regularly helps ensure you're receiving optimal service performance. 
                  Our Virgin Media speed test accurately measures your download speeds, upload speeds, and network latency, 
                  providing valuable insights into your broadband performance. This information helps optimize your home 
                  network setup and identify any connectivity issues that might affect your internet experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="uk" currentProviderSlug="virgin-media" />
        </div>
      </main>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
