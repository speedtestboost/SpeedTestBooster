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

export default function StarhubSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "StarHub Speed Test Singapore - Check Fibre & 5G Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test StarHub fibre and 5G broadband speed free. Accurate download, upload, and ping for Singapore homes and businesses.');
    }

    // Update canonical tag
    setCanonicalHref('https://speedtestboost.com/providers/sg/starhub');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "StarHub Internet Speed Test",
      "description": "Test your StarHub broadband speed for free. Speed test for StarHub fibre and 5G broadband customers in Singapore.",
      "url": "https://speedtestboost.com/providers/sg/starhub",
      "provider": {
        "@type": "Organization",
        "name": "StarHub Singapore",
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
      <Header currentPath="/providers/sg/starhub" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "StarHub", href: "/providers/sg/starhub" }
            ]} 
          />
          
          {/* Hero Section with Speed Test */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              StarHub Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">StarHub broadband speed</span> for free. Check StarHub fibre or 5G home performance across Singapore.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test StarHub Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About StarHub Singapore</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  StarHub is Singapore&apos;s largest full-service communications provider, offering fibre broadband, 5G mobile,
                  enterprise networking, and regional data-centre services. Millions of households and businesses rely on
                  StarHub fibre (up to multi-gig speeds on selected plans) for remote work, streaming, and gaming.
                </p>
                <h3 className="text-xl font-semibold mb-3">Fibre and 5G broadband</h3>
                <p className="text-muted-foreground">
                  StarHub markets fibre-to-the-home plans across HDB estates, condos, and landed properties, often bundled
                  with mobile lines and entertainment apps. 5G home broadband complements fibre where quick install
                  matters. Use this speed test on a wired connection first, then WiFi, to compare results fairly.
                </p>
                <h3 className="text-xl font-semibold mb-3">Why run a StarHub speed test?</h3>
                <p className="text-muted-foreground">
                  Regular tests help verify you receive the speeds your plan advertises, spot WiFi congestion, and document
                  performance before contacting support. We measure download, upload, ping, and jitter in your browser
                  with no app install required.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="sg" currentProviderSlug="starhub" />
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
