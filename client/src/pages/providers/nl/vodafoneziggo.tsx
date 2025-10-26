import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function VodafoneZiggoSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO meta tags
    document.title = "VodafoneZiggo Speed Test Netherlands - Check Cable Internet Free 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test VodafoneZiggo cable internet speed instantly - Free speed test for Netherlands. Accurate Ziggo download/upload performance results now.');
    }
    
    // Keywords targeting low-competition Dutch terms
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'VodafoneZiggo speed test, Ziggo internet snelheid, kabel internet';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'VodafoneZiggo Speed Test Netherlands 2025 - Test Ziggo Internet Speed' },
      { property: 'og:description', content: 'Free VodafoneZiggo speed test for Netherlands. Test Ziggo cable, fiber internet speeds. Check download, upload speeds and ping latency.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/nl/vodafoneziggo' },
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
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/nl/vodafoneziggo';
    
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
      "name": "VodafoneZiggo Speed Test Netherlands",
      "description": "Free VodafoneZiggo internet speed test for Netherlands. Test Ziggo cable and fiber connection speeds.",
      "url": "https://speedtestboost.com/providers/nl/vodafoneziggo",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "provider": {
        "@type": "Organization",
        "name": "VodafoneZiggo",
        "description": "Netherlands leading cable and telecom provider",
        "url": "https://www.vodafoneziggo.nl/"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Netherlands VodafoneZiggo Internet Users"
      },
      "geo": {
        "@type": "Place",
        "addressCountry": "NL",
        "addressRegion": "Netherlands"
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/vodafoneziggo" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Vodafoneziggo", href: "/providers/nl/vodafoneziggo" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              VodafoneZiggo Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">VodafoneZiggo internet speed</span> for free. Check your cable and fiber connection performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test VodafoneZiggo Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About VodafoneZiggo</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  VodafoneZiggo represents a powerful telecommunications alliance formed in 2017 between global mobile leader 
                  Vodafone and Dutch cable pioneer Liberty Global (Ziggo). As one of the Netherlands' largest telecom providers, 
                  VodafoneZiggo serves over 7 million customers with comprehensive internet, television, and mobile services, 
                  combining decades of cable expertise with advanced mobile technology innovation.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable and Fiber Network Infrastructure</h3>
                <p className="text-muted-foreground">
                  VodafoneZiggo operates the Netherlands' most extensive cable network infrastructure, combining Ziggo's 
                  established coaxial cable foundation with cutting-edge fiber-optic technology. The company delivers 
                  internet speeds up to 2 Gbps through premium fiber connections while maintaining reliable cable 
                  services that reach virtually every corner of the Netherlands with consistent high-speed connectivity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Comprehensive Entertainment Solutions</h3>
                <p className="text-muted-foreground">
                  VodafoneZiggo distinguishes itself through integrated entertainment and connectivity solutions, offering 
                  extensive television programming, premium streaming services, and on-demand content alongside high-speed 
                  internet. The company's bundled packages combine internet connectivity with comprehensive entertainment 
                  options, making it a preferred choice for Dutch households seeking complete digital solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile and Fixed Convergence</h3>
                <p className="text-muted-foreground">
                  The VodafoneZiggo partnership leverages Vodafone's global mobile expertise with Ziggo's Dutch market 
                  knowledge, creating unique convergent services that seamlessly integrate mobile and fixed connectivity. 
                  This combination enables innovative service offerings that bridge home and mobile connectivity, 
                  providing customers with unified digital experiences across all their devices and locations.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps VodafoneZiggo customers monitor their internet performance and ensure optimal 
                  service delivery from their cable or fiber connection. Our VodafoneZiggo speed test measures download 
                  speeds, upload speeds, and network latency, providing insights into your broadband performance to 
                  identify connectivity issues and ensure you're receiving the premium internet service quality that 
                  defines VodafoneZiggo's telecommunications excellence in the Netherlands.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="nl" currentProviderSlug="vodafoneziggo" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}