import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";

export default function VivoSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Vivo Speed Test Brazil - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Vivo fiber internet speed instantly - Free speed test for Brazil. Accurate download/upload speeds and broadband results in seconds.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/br/vivo');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Vivo Speed Test Brazil",
      "description": "Test your Vivo internet speed for free. Speed test for Vivo fiber and broadband customers in Brazil.",
      "url": "https://speedtestboost.com/providers/br/vivo",
      "provider": {
        "@type": "Organization",
        "name": "Vivo Brazil",
        "description": "Leading telecommunications provider in Brazil offering fiber and broadband internet services",
        "areaServed": { "@type": "Country", "name": "Brazil" },
        "serviceType": ["Fiber Internet", "Broadband Internet", "Mobile Services", "TV Services", "Business Solutions"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'vivo-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#vivo-structured-data');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/br/vivo" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Vivo Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">Vivo internet speed</span> for free. Check your fiber or broadband performance in Brazil.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Vivo Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Vivo Brazil</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Vivo represents Brazil's largest telecommunications operator, serving over 100 million customers 
                  across the country with comprehensive internet, mobile, and digital services. Operating under 
                  Telefônica Brasil, Vivo has established itself as the leading provider of fiber-optic internet 
                  and mobile connectivity throughout Brazil's diverse geographic regions, supporting the country's 
                  digital transformation and economic development through innovative telecommunications solutions.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Nationwide Fiber Leadership</h3>
                <p className="text-muted-foreground">
                  Vivo has pioneered Brazil's fiber-optic revolution, investing billions in FTTH (Fiber to the Home) 
                  infrastructure that connects major cities and expanding into interior regions across the country. 
                  The company's fiber network delivers ultra-high-speed internet access that supports 4K streaming, 
                  cloud computing, remote work, and digital entertainment throughout Brazil. This fiber leadership 
                  positions Vivo as the primary enabler of Brazil's digital economy and technological advancement 
                  in Latin America.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Network Dominance</h3>
                <p className="text-muted-foreground">
                  Vivo operates Brazil's largest and most advanced mobile network, providing 4G and 5G wireless 
                  services that reach over 4,000 municipalities across the country. The company's mobile infrastructure 
                  supports both urban and rural communities with reliable wireless internet access, voice services, 
                  and mobile data applications that connect Brazil's diverse population. This mobile network dominance 
                  enables Vivo to provide comprehensive connectivity solutions that meet Brazil's unique geographic 
                  and demographic challenges.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital Services Innovation</h3>
                <p className="text-muted-foreground">
                  Vivo has evolved beyond traditional telecommunications to become Brazil's leading digital services 
                  provider, offering integrated solutions including streaming platforms, digital payments, cloud 
                  services, and IoT applications. The company's digital ecosystem approach enables customers to 
                  access comprehensive technology solutions through unified platforms while supporting Brazil's 
                  digital society development. This innovation strategy establishes Vivo as a complete digital 
                  transformation partner for Brazilian consumers and businesses.
                </p>

                <h3 className="text-XI font-semibold mb-3">Enterprise Solutions Excellence</h3>
                <p className="text-muted-foreground">
                  Vivo Empresas provides sophisticated telecommunications and digital transformation services including 
                  dedicated internet access, cloud computing, cybersecurity, and collaboration tools for Brazilian 
                  enterprises and multinational corporations. The company's business division leverages its extensive 
                  network infrastructure and technical expertise to deliver enterprise-grade connectivity solutions 
                  with comprehensive service level agreements. These business services support Brazil's economic 
                  competitiveness in global markets.
                </p>

                <h3 className="text-xl font-semibold mb-3">Regional Market Coverage</h3>
                <p className="text-muted-foreground">
                  Vivo serves all Brazilian regions from São Paulo and Rio de Janeiro metropolitan areas to Amazon 
                  interior communities, providing essential telecommunications infrastructure that connects Brazil's 
                  diverse geographic and economic centers. The company's nationwide coverage strategy ensures internet 
                  access availability across urban centers, suburban communities, and rural areas while supporting 
                  regional economic development and digital inclusion initiatives throughout the country.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Vivo customers monitor their internet performance and ensure optimal 
                  service delivery from their fiber or broadband connection. Our Vivo speed test measures download 
                  speeds, upload speeds, and network latency, providing insights into your broadband performance 
                  across the company's extensive Brazilian network infrastructure. This testing helps identify 
                  connectivity issues and ensures you're receiving the high-speed internet service that defines 
                  Vivo's telecommunications excellence and innovation leadership in Brazil and Latin America.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="br" currentProviderSlug="vivo" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}