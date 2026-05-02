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

export default function OrangeSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Orange Speed Test France - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Orange fiber internet speed instantly - Free speed test for France. Accurate download/upload speeds & ADSL performance results now.');
    }

    // Update canonical tag
    setCanonicalHref('https://speedtestboost.com/providers/fr/orange');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Orange Speed Test France",
      "description": "Test your Orange internet speed for free. Speed test for Orange fiber and ADSL customers in France.",
      "url": "https://speedtestboost.com/providers/fr/orange",
      "provider": {
        "@type": "Organization",
        "name": "Orange France",
        "description": "Leading telecommunications provider in France offering fiber and ADSL internet services",
        "areaServed": { "@type": "Country", "name": "France" },
        "serviceType": ["Fiber Internet", "ADSL Broadband", "Mobile Services", "TV Services", "Business Solutions"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'orange-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#orange-structured-data');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/fr/orange" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Orange", href: "/providers/fr/orange" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Orange Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">Orange internet speed</span> for free. Check your fiber or ADSL broadband performance in France.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Orange Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Orange France</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Orange stands as France's leading telecommunications operator, serving millions of customers 
                  across the country with comprehensive internet, mobile, and digital services. As the historic 
                  national telecommunications provider, Orange operates France's most extensive fiber-optic 
                  network while maintaining legacy ADSL infrastructure, delivering reliable connectivity solutions 
                  that support both residential customers and businesses throughout metropolitan and rural France.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Fiber Leadership</h3>
                <p className="text-muted-foreground">
                  Orange has spearheaded France's fiber-optic revolution, investing billions in FTTH (Fiber to the Home) 
                  infrastructure that covers over 80% of French households with high-speed internet access. The company's 
                  fiber network delivers symmetrical gigabit speeds that support 4K streaming, cloud computing, remote 
                  work, and smart home technologies across urban and rural communities. This fiber leadership positions 
                  Orange as the primary driver of France's digital transformation and economic modernization.
                </p>

                <h3 className="text-xl font-semibold mb-3">ADSL Heritage and Coverage</h3>
                <p className="text-muted-foreground">
                  Orange maintains France's most comprehensive ADSL network, providing reliable broadband connectivity 
                  through existing copper telephone infrastructure in areas where fiber installation remains ongoing. 
                  The company's ADSL service ensures universal internet access across France while fiber deployment 
                  continues, supporting essential online activities including education, healthcare, and business 
                  operations. This ADSL heritage guarantees connectivity continuity during France's fiber transition.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Network Excellence</h3>
                <p className="text-muted-foreground">
                  Orange operates France's leading mobile network, providing 4G and 5G wireless services that 
                  complement fixed-line broadband connectivity throughout the country. The company's mobile infrastructure 
                  supports both consumer and business customers with reliable wireless internet access, mobile voice 
                  services, and advanced data applications. This mobile network excellence enables Orange to provide 
                  comprehensive telecommunications solutions that meet diverse customer connectivity needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Solutions Innovation</h3>
                <p className="text-muted-foreground">
                  Orange Business provides sophisticated telecommunications solutions including dedicated internet 
                  access, cloud services, cybersecurity, and digital transformation services for French enterprises 
                  and multinational corporations. The company's business division leverages its extensive fiber 
                  network and technical expertise to deliver enterprise-grade connectivity solutions with service 
                  level agreements and 24/7 support. These business services support France's economic competitiveness 
                  in global markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital Services Integration</h3>
                <p className="text-muted-foreground">
                  Orange has evolved beyond traditional telecommunications to provide integrated digital services 
                  including television content, streaming platforms, smart home solutions, and financial services 
                  that enhance customer value and engagement. The company's digital ecosystem approach enables 
                  customers to access comprehensive technology solutions through unified platforms while supporting 
                  France's digital economy development. This integration strategy distinguishes Orange as a 
                  complete digital services provider.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Orange customers monitor their internet performance and ensure optimal 
                  service delivery from their fiber or ADSL connection. Our Orange speed test measures download speeds, 
                  upload speeds, and network latency, providing insights into your broadband performance across 
                  the company's extensive French network infrastructure. This testing helps identify connectivity 
                  issues and ensures you're receiving the high-speed internet service that defines Orange's 
                  telecommunications leadership and innovation in France.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="fr" currentProviderSlug="orange" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
