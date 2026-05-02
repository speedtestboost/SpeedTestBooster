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

export default function FrontierSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Frontier Speed Test USA - Check Fiber & DSL Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Frontier fiber & DSL internet speed instantly - Free speed test for USA. Accurate rural broadband performance results in seconds.');
    }

    // Update canonical tag
    setCanonicalHref('https://speedtestboost.com/providers/us/frontier');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Frontier Speed Test",
      "description": "Test your Frontier internet speed for free. Speed test for Frontier fiber and DSL customers.",
      "url": "https://speedtestboost.com/providers/us/frontier",
      "provider": {
        "@type": "Organization",
        "name": "Frontier Communications",
        "description": "Rural and suburban internet provider offering fiber and DSL services nationwide",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Fiber Internet", "DSL Broadband", "Phone Services", "Business Services"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'frontier-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#frontier-structured-data');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/frontier" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Frontier", href: "/providers/us/frontier" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-600/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-green-700 to-green-600 bg-clip-text text-transparent">
              Frontier Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-600">Frontier internet speed</span> for free. Check your fiber or DSL broadband performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-green-700 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Frontier Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Frontier Communications</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Frontier Communications serves as a vital telecommunications provider for rural and suburban 
                  communities across 25 states, delivering essential broadband connectivity to areas often 
                  underserved by larger providers. Specializing in fiber-optic network expansion and DSL services, 
                  Frontier bridges the digital divide by providing reliable internet access to millions of 
                  customers while focusing on community-centered service and rural market expertise throughout America.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Rural Market Specialization</h3>
                <p className="text-muted-foreground">
                  Frontier has established itself as America's leading rural internet provider, serving small 
                  towns, farming communities, and suburban areas across 25 states where internet access 
                  remains challenging. The company's rural focus enables specialized service delivery tailored 
                  to the unique needs of these communities, providing essential broadband connectivity that 
                  supports local economies, education, and healthcare. This rural specialization distinguishes 
                  Frontier as an essential telecommunications provider in underserved markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Investment</h3>
                <p className="text-muted-foreground">
                  Frontier has committed significant resources to fiber-optic network expansion, investing 
                  billions in infrastructure development to bring high-speed internet to previously underserved 
                  areas. The company's fiber initiative delivers symmetrical gigabit speeds directly to homes 
                  and businesses, providing future-proof connectivity that supports modern bandwidth requirements. 
                  This fiber investment represents Frontier's commitment to transforming rural connectivity 
                  and bridging the digital divide through advanced telecommunications technology.
                </p>

                <h3 className="text-xl font-semibold mb-3">DSL Heritage and Reliability</h3>
                <p className="text-muted-foreground">
                  Frontier maintains extensive DSL network infrastructure that provides reliable internet 
                  access through existing telephone lines in areas where fiber installation remains economically 
                  challenging. The company's DSL service delivers consistent broadband connectivity that supports 
                  essential online activities including remote work, education, and healthcare services. This 
                  DSL heritage ensures internet availability across diverse geographic regions while Frontier 
                  continues expanding its fiber network coverage.
                </p>

                <h3 className="text-xl font-semibold mb-3">Government Partnership Programs</h3>
                <p className="text-muted-foreground">
                  Frontier actively participates in federal and state broadband expansion programs, including 
                  RDOF (Rural Digital Opportunity Fund) initiatives designed to accelerate rural internet 
                  deployment. The company's government partnerships enable efficient utilization of public 
                  funding to extend fiber networks into areas where private investment alone would be insufficient. 
                  These partnerships demonstrate Frontier's commitment to public-private collaboration in 
                  addressing America's digital divide challenges.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Connectivity Solutions</h3>
                <p className="text-muted-foreground">
                  Frontier provides comprehensive business internet solutions designed to support rural enterprises, 
                  agricultural operations, healthcare facilities, and educational institutions across its service 
                  territories. The company's business division offers dedicated internet access, voice services, 
                  and managed solutions that enable economic development in rural markets. These business services 
                  leverage Frontier's expanding fiber network to deliver enterprise-grade connectivity where 
                  it's needed most.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Frontier customers monitor their internet performance and ensure 
                  optimal service delivery from their fiber or DSL connection. Our Frontier speed test measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance across the company's diverse network infrastructure. This testing helps identify 
                  connectivity issues and ensures you're receiving the reliable internet service that defines 
                  Frontier's rural telecommunications excellence and community commitment.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="us" currentProviderSlug="frontier" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
