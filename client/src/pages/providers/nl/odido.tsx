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

export default function OdidoSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO meta tags
    document.title = "Odido Speed Test Netherlands - Check Fiber & 5G Internet Free 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Odido fiber & 5G internet speed instantly - Free speed test for Netherlands. Accurate download/upload mobile performance results now.');
    }
    
    // Keywords targeting low-competition Dutch terms
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'Odido speed test, T-Mobile Nederland, 4G 5G test';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Odido Speed Test Netherlands 2025 - Test T-Mobile Internet Speed' },
      { property: 'og:description', content: 'Free Odido speed test for Netherlands. Test T-Mobile fiber, 4G, 5G internet speeds. Check download, upload speeds and ping latency.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/nl/odido' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test & Boost' }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });
    
    // Update canonical tag
    setCanonicalHref('https://speedtestboost.com/providers/nl/odido');
    
    // Structured Data
    let structuredData = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Odido Speed Test Netherlands",
      "description": "Free Odido internet speed test for Netherlands. Test T-Mobile fiber, 4G and 5G connection speeds.",
      "url": "https://speedtestboost.com/providers/nl/odido",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "provider": {
        "@type": "Organization",
        "name": "Odido",
        "description": "Netherlands mobile and internet provider (formerly T-Mobile)",
        "url": "https://www.odido.nl/"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Netherlands Odido T-Mobile Internet Users"
      },
      "geo": {
        "@type": "Place",
        "addressCountry": "NL",
        "addressRegion": "Netherlands"
      }
    });

    return () => {
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/odido" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Odido", href: "/providers/nl/odido" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-pink-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-pink-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 bg-clip-text text-transparent">
              Odido Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-pink-500">Odido internet speed</span> for free. Check your 5G, 4G, and fiber connection performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Odido Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Odido</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Odido emerges as a dynamic telecommunications brand launched in 2024, representing the evolution of 
                  T-Mobile Nederland following its acquisition by a consortium of investors from Deutsche Telekom. 
                  Serving over 6 million customers, Odido positions itself as a leading mobile network operator in 
                  the Netherlands, combining established mobile expertise with fresh innovation in 5G technology and 
                  digital services.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">5G Network Innovation</h3>
                <p className="text-muted-foreground">
                  Odido leads the Netherlands' 5G revolution with ultra-fast mobile internet connections reaching 
                  1000+ Mbps in major Dutch cities. The company's 5G infrastructure represents cutting-edge wireless 
                  technology that transforms mobile connectivity, enabling applications from augmented reality to 
                  IoT solutions while providing extensive 4G coverage across the entire Netherlands for reliable 
                  nationwide mobile internet access.
                </p>

                <h3 className="text-xl font-semibold mb-3">Convergent Service Strategy</h3>
                <p className="text-muted-foreground">
                  Odido delivers comprehensive internet solutions spanning mobile and fixed connectivity, offering 
                  fiber-based home internet services alongside industry-leading mobile networks. The company's 
                  convergent approach combines mobile subscriptions with home internet packages, creating integrated 
                  digital experiences that serve both residential and business customers with unified connectivity 
                  solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business and Enterprise Focus</h3>
                <p className="text-muted-foreground">
                  Odido provides sophisticated business telecommunications solutions ranging from enterprise mobile 
                  plans to comprehensive ICT infrastructure services. The company supports Dutch businesses with 
                  reliable communication technologies, leveraging its advanced network capabilities to deliver 
                  professional-grade connectivity solutions that enable digital transformation across industries.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Odido customers monitor their internet performance and ensure optimal 
                  service delivery from their 5G, 4G, or fiber connection. Our Odido speed test measures download 
                  speeds, upload speeds, and network latency, providing insights into your broadband performance 
                  to identify connectivity issues and ensure you're receiving the premium internet service quality 
                  that defines Odido's telecommunications excellence in the Netherlands.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="nl" currentProviderSlug="odido" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
