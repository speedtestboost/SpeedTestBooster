import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function CoxSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Cox Speed Test USA - Check Gigabit Cable Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Cox gigabit cable internet speed instantly - Free speed test for USA. Accurate download/upload performance results in seconds.');
    }

    // Update canonical tag
    const canonical = document.createElement('link');

    canonical.rel = 'canonical';

    canonical.href = 'https://speedtestboost.com/providers/us/cox';

    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cox Speed Test",
      "description": "Test your Cox internet speed for free. Speed test for Cox cable internet and gigabit customers.",
      "url": "https://speedtestboost.com/providers/us/cox",
      "provider": {
        "@type": "Organization",
        "name": "Cox Communications",
        "description": "Major cable internet provider serving multiple states with gigabit internet services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "Gigabit Internet", "TV Services", "Phone Services", "Business Services"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'cox-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#cox-structured-data');
      if (existingScript) document.head.removeChild(existingScript);
    };

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/cox" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Cox", href: "/providers/us/cox" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-600/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 bg-clip-text text-transparent">
              Cox Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-600">Cox internet speed</span> for free. Check your cable or gigabit internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Cox Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Cox Communications</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Cox Communications stands as one of America's largest privately-held telecommunications companies, 
                  providing comprehensive cable internet and digital services across 18 states and Washington D.C. 
                  Known for its extensive cable network infrastructure and commitment to community-focused service, 
                  Cox delivers high-speed internet, television, and communications solutions while maintaining 
                  strong regional presence and customer-centric approach in diverse markets nationwide.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Multi-State Network Coverage</h3>
                <p className="text-muted-foreground">
                  Cox operates an extensive cable network spanning Arizona, California, Connecticut, Florida, 
                  Georgia, Iowa, Kansas, Louisiana, Nevada, Oklahoma, and other key markets, delivering reliable 
                  internet services to millions of residential and business customers. The company's strategic 
                  geographic coverage focuses on growth markets where Cox can provide superior service quality 
                  and network reliability. This multi-state presence enables Cox to serve diverse communities 
                  while maintaining operational efficiency and customer service excellence.
                </p>

                <h3 className="text-xl font-semibold mb-3">Advanced Cable Technology</h3>
                <p className="text-muted-foreground">
                  Cox utilizes cutting-edge DOCSIS 3.1 cable technology to deliver gigabit internet speeds 
                  capable of supporting multiple connected devices, 4K streaming, cloud computing, and smart 
                  home applications. The company's cable infrastructure provides reliable broadband connectivity 
                  that meets modern bandwidth requirements while ensuring consistent performance across diverse 
                  residential and commercial environments. This advanced technology positions Cox competitively 
                  in markets demanding high-speed internet access.
                </p>

                <h3 className="text-xl font-semibold mb-3">Gigabit Internet Leadership</h3>
                <p className="text-muted-foreground">
                  Cox has emerged as a leader in gigabit internet delivery, offering ultra-high-speed broadband 
                  services that support bandwidth-intensive applications and future connectivity needs. The 
                  company's gigabit service provides download speeds up to 1,000 Mbps, enabling seamless 
                  video conferencing, large file transfers, and simultaneous device usage without performance 
                  degradation. This gigabit leadership demonstrates Cox's commitment to delivering premium 
                  internet experiences that exceed customer expectations.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Solutions Excellence</h3>
                <p className="text-muted-foreground">
                  Cox Business provides comprehensive telecommunications solutions including dedicated internet 
                  access, voice services, cloud connectivity, and managed services designed to support enterprises 
                  across all industries. The company's business division leverages its robust cable network to 
                  deliver scalable internet solutions with service level agreements and 24/7 technical support. 
                  These business services appeal to organizations requiring reliable connectivity and professional 
                  telecommunications support.
                </p>

                <h3 className="text-xl font-semibold mb-3">Community-Focused Service</h3>
                <p className="text-muted-foreground">
                  Cox distinguishes itself through strong community involvement and customer service initiatives 
                  that reflect the company's commitment to the markets it serves. The company invests in local 
                  community programs, educational initiatives, and digital equity projects while maintaining 
                  responsive customer service that addresses local market needs. This community focus helps 
                  Cox build lasting relationships with customers and stakeholders across its service territories.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Reliability</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Cox customers monitor their internet performance and ensure optimal 
                  service delivery from their cable or gigabit connection. Our Cox speed test measures download 
                  speeds, upload speeds, and network latency, providing insights into your broadband performance 
                  across the company's multi-state network infrastructure. This testing helps identify connectivity 
                  issues and ensures you're receiving the high-speed internet service that defines Cox's 
                  telecommunications excellence and community commitment.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="us" currentProviderSlug="cox" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
