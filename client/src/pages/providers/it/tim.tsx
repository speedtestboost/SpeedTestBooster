import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function TIMSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "TIM Speed Test Italy - Check Fiber & ADSL Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test TIM fiber & ADSL internet speed instantly - Free speed test for Italy. Accurate download/upload broadband performance results now.');
    }

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/it/tim';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TIM Speed Test Italy",
      "description": "Test your TIM internet speed for free. Speed test for TIM fiber and ADSL customers in Italy.",
      "url": "https://speedtestboost.com/providers/it/tim",
      "provider": {
        "@type": "Organization",
        "name": "TIM Italy",
        "description": "Leading telecommunications provider in Italy offering fiber and ADSL internet services",
        "areaServed": { "@type": "Country", "name": "Italy" },
        "serviceType": ["Fiber Internet", "ADSL Broadband", "Mobile Services", "TV Services", "Business Solutions"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'tim-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#tim-structured-data');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/it/tim" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "Italy", href: "/internet-providers" },
              { label: "Tim", href: "/providers/it/tim" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-600/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">
              TIM Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-600">TIM internet speed</span> for free. Check your fiber or ADSL broadband performance in Italy.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test TIM Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About TIM Italy</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  TIM (Telecom Italia Mobile) serves as Italy's leading telecommunications operator, providing 
                  comprehensive internet, mobile, and digital services to millions of customers across the country. 
                  As Italy's historic national telecommunications provider, TIM operates the country's most extensive 
                  fiber-optic and ADSL networks while pioneering innovative digital solutions that support Italy's 
                  economic development and digital transformation initiatives.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Fiber Infrastructure</h3>
                <p className="text-muted-foreground">
                  TIM has invested extensively in fiber-optic network development, deploying FTTH (Fiber to the Home) 
                  infrastructure that reaches major Italian cities and suburban areas with ultra-high-speed internet 
                  access. The company's fiber network delivers symmetrical gigabit speeds that support bandwidth-intensive 
                  applications including video streaming, cloud computing, and smart city technologies. This fiber 
                  infrastructure positions TIM as the primary enabler of Italy's digital economy and technological 
                  advancement.
                </p>

                <h3 className="text-xl font-semibold mb-3">ADSL Network Coverage</h3>
                <p className="text-muted-foreground">
                  TIM maintains Italy's most comprehensive ADSL network, providing reliable broadband connectivity 
                  through copper telephone infrastructure across urban and rural communities nationwide. The company's 
                  ADSL service ensures widespread internet access while fiber deployment continues, supporting essential 
                  online services including e-commerce, education, and government digitalization initiatives. This 
                  ADSL coverage guarantees connectivity continuity throughout Italy's ongoing digital infrastructure 
                  modernization.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Network Innovation</h3>
                <p className="text-muted-foreground">
                  TIM operates Italy's leading mobile network, providing 4G and 5G wireless services that complement 
                  fixed-line broadband connectivity throughout the country. The company's mobile infrastructure supports 
                  both consumer and enterprise customers with advanced wireless internet access, voice services, and 
                  Internet of Things applications. This mobile network innovation enables TIM to deliver comprehensive 
                  telecommunications solutions that meet Italy's diverse connectivity requirements.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise Digital Solutions</h3>
                <p className="text-muted-foreground">
                  TIM Business provides sophisticated telecommunications and digital transformation services including 
                  dedicated internet access, cloud computing, cybersecurity, and IoT solutions for Italian enterprises 
                  and international corporations. The company's business division leverages its extensive network 
                  infrastructure and technical expertise to deliver enterprise-grade connectivity solutions with 
                  comprehensive service level agreements. These business services support Italy's competitiveness 
                  in European and global markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital Services Integration</h3>
                <p className="text-muted-foreground">
                  TIM has evolved into a comprehensive digital services provider, offering integrated solutions 
                  including television content, streaming platforms, smart home technologies, and financial services 
                  that enhance customer value and digital engagement. The company's digital ecosystem approach enables 
                  customers to access complete technology solutions through unified platforms while supporting Italy's 
                  digital society development. This integration strategy establishes TIM as a complete digital 
                  transformation partner.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps TIM customers monitor their internet performance and ensure optimal 
                  service delivery from their fiber or ADSL connection. Our TIM speed test measures download speeds, 
                  upload speeds, and network latency, providing insights into your broadband performance across 
                  the company's extensive Italian network infrastructure. This testing helps identify connectivity 
                  issues and ensures you're receiving the high-speed internet service that defines TIM's 
                  telecommunications excellence and innovation leadership in Italy.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="it" currentProviderSlug="tim" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}