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

export default function M1SpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "M1 Speed Test Singapore - Check Fibre & 5G Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test M1 fibre and 5G broadband speed free. Accurate download, upload, and ping for Singapore homes and businesses.');
    }

    // Update canonical tag
    setCanonicalHref('https://speedtestboost.com/providers/sg/m1');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "M1 Internet Speed Test",
      "description": "Test your M1 broadband speed for free. Speed test for M1 fibre and 5G broadband customers in Singapore.",
      "url": "https://speedtestboost.com/providers/sg/m1",
      "provider": {
        "@type": "Organization",
        "name": "M1 Singapore",
        "description": "Singapore's largest telecommunications company providing fibre internet, mobile, and TV services",
        "areaServed": { "@type": "Country", "name": "Singapore" },
        "serviceType": ["Fibre Internet", "DSL", "Mobile", "TV", "Telecommunications"]
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
      <Header currentPath="/providers/sg/m1" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "M1", href: "/providers/sg/m1" }
            ]} 
          />
          
          {/* Hero Section with Speed Test */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              M1 Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">M1 broadband speed</span> for free. Check M1 fibre or 5G home performance across Singapore.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test M1 Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About M1 Singapore</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  M1 is Singapore&apos;s largest full-service communications provider, offering fibre broadband, 5G mobile,
                  enterprise networking, and regional data-centre services. Millions of households and businesses rely on
                  M1 fibre (up to multi-gig speeds on selected plans) for remote work, streaming, and gaming.
                </p>
                <h3 className="text-xl font-semibold mb-3">Fibre and 5G broadband</h3>
                <p className="text-muted-foreground">
                  M1 markets fibre-to-the-home plans across HDB estates, condos, and landed properties, often bundled
                  with mobile lines and entertainment apps. 5G home broadband complements fibre where quick install
                  matters. Use this speed test on a wired connection first, then WiFi, to compare results fairly.
                </p>
                <h3 className="text-xl font-semibold mb-3">Why run a M1 speed test?</h3>
                <p className="text-muted-foreground">
                  Regular tests help verify you receive the speeds your plan advertises, spot WiFi congestion, and document
                  performance before contacting support. We measure download, upload, ping, and jitter in your browser
                  with no app install required.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="sg" currentProviderSlug="m1" />
        </div>
      </main>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}

      <GenericFooter />
    </div>
  );
}
