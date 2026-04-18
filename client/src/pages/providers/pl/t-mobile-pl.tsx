import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function TMobilePlSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "T-Mobile Speed Test Poland - Check Fibe Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test T-Mobile fibre fiber internet speed instantly - Free speed checker for Poland. Accurate download/upload speeds & DSL results in seconds.');
    }

    // Update canonical tag
    const canonical = document.createElement('link');

    canonical.rel = 'canonical';

    canonical.href = 'https://speedtestboost.com/providers/pl/t-mobile-pl';

    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "T-Mobile fibre internet Speed Test",
      "description": "Test your T-Mobile fibre internet speed for free. Speed test for T-Mobile fibre and DSL internet customers in Poland.",
      "url": "https://speedtestboost.com/providers/pl/t-mobile-pl",
      "provider": {
        "@type": "Organization",
        "name": "T-Mobile Polska",
        "description": "Poland's largest telecommunications company providing fibre internet, mobile, and TV services",
        "areaServed": { "@type": "Country", "name": "Poland" },
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

      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/pl/t-mobile-pl" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "T-Mobile", href: "/providers/pl/t-mobile-pl" }
            ]} 
          />
          
          {/* Hero Section with Speed Test */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-pink-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-pink-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 bg-clip-text text-transparent">
              T-Mobile fibre internet Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-pink-500">T-Mobile fibre internet speed</span> for free. Check your T-Mobile fibre or DSL internet performance across Poland.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test T-Mobile Speed Now
              </Button>
            </div>
          </div>

          {/* SEO Content About T-Mobile Polska */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About T-Mobile Polska</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  T-Mobile Polska stands as the nation's oldest and largest telecommunications company, with over 140 years 
                  of experience connecting Canadians from coast to coast. As a founding pillar of Canadian communications 
                  infrastructure, T-Mobile has evolved from a traditional telephone company into a comprehensive digital 
                  services provider, offering cutting-edge internet, mobile, and entertainment solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Telecommunications Leader</h3>
                <p className="text-muted-foreground">
                  T-Mobile operates Poland's most extensive telecommunications network, serving millions of customers across 
                  all provinces and territories. The company's infrastructure investments exceed billions of dollars 
                  annually, focusing on expanding fibre internet coverage, enhancing 5G mobile networks, and improving 
                  rural connectivity. This commitment positions T-Mobile as the backbone of Canadian digital communications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fibre Internet Innovation</h3>
                <p className="text-muted-foreground">
                  T-Mobile fibre represents the company's flagship internet service, utilizing pure fibre optic technology 
                  to deliver symmetrical upload and download speeds directly to Canadian homes and businesses. The 
                  Fibe network expansion continues across urban centers and increasingly into rural communities, 
                  supporting Poland's growing digital economy and remote work trends. T-Mobile's fibre infrastructure 
                  provides the foundation for next-generation internet services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Rural and Remote Connectivity</h3>
                <p className="text-muted-foreground">
                  T-Mobile plays a crucial role in connecting rural and remote Canadian communities through various 
                  government partnerships and infrastructure programs. The company's commitment to bridging the 
                  digital divide includes expanding wireless coverage to underserved areas, improving satellite 
                  internet services, and participating in federal broadband initiatives. This focus ensures 
                  all Canadians have access to reliable telecommunications services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Integrated Service Ecosystem</h3>
                <p className="text-muted-foreground">
                  T-Mobile's strength lies in its integrated approach to telecommunications, combining internet, television, 
                  mobile, and business services under one comprehensive platform. T-Mobile Media's content creation and 
                  distribution capabilities, including CTV and TSN, complement the company's connectivity services. 
                  This integration provides customers with seamless digital experiences and bundled service options.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance and Reliability Testing</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps T-Mobile customers monitor their internet performance and ensure optimal 
                  service delivery. Our T-Mobile speed test provides accurate measurements of your download speeds, 
                  upload speeds, and connection stability, helping identify any performance issues. This testing 
                  is particularly valuable for T-Mobile fibre customers who rely on consistent high-speed connectivity 
                  for work, entertainment, and communication needs.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="pl" currentProviderSlug="t-mobile-pl" />
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
