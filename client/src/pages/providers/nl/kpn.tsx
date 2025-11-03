import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function KPNSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO meta tags
    document.title = "KPN Speed Test Netherlands - Check Glasvezel Fiber Internet Free 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test KPN Glasvezel fiber internet speed instantly - Free speed test for Netherlands. Accurate download/upload performance results in seconds.');
    }
    
    // Keywords targeting low-competition Dutch terms
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'KPN speed test, KPN glasvezel, internet snelheid';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'KPN Speed Test Netherlands 2025 - Test KPN Internet Speed' },
      { property: 'og:description', content: 'Free KPN speed test for Netherlands. Test KPN glasvezel, fiber, ADSL internet speeds. Check download, upload speeds and ping latency.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/nl/kpn' },
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
    const canonical = document.createElement('link');

    canonical.rel = 'canonical';

    canonical.href = 'https://speedtestboost.com/providers/nl/kpn';

    document.head.appendChild(canonical);
    
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
      "name": "KPN Speed Test Netherlands",
      "description": "Free KPN internet speed test for Netherlands. Test KPN glasvezel, fiber and ADSL connection speeds.",
      "url": "https://speedtestboost.com/providers/nl/kpn",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "provider": {
        "@type": "Organization",
        "name": "KPN",
        "description": "Netherlands leading telecommunications provider",
        "url": "https://www.kpn.com/"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Netherlands KPN Internet Users"
      },
      "geo": {
        "@type": "Place",
        "addressCountry": "NL",
        "addressRegion": "Netherlands"
      }
    });

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/kpn" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Kpn", href: "/providers/nl/kpn" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              KPN Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">KPN internet speed</span> for free. Check your glasvezel fiber or ADSL connection performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test KPN Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About KPN</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  KPN stands as the Netherlands' largest telecommunications company, established in 1989 as the successor to PTT Telecom. 
                  Serving over 8 million customers with a commanding 40% market share, KPN delivers comprehensive internet, telephony, 
                  and television services throughout the Netherlands while maintaining its position as the nation's telecommunications 
                  infrastructure leader and digital innovation pioneer.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Glasvezel Network Excellence</h3>
                <p className="text-muted-foreground">
                  KPN operates the Netherlands' most extensive fiber-optic network, investing heavily in glasvezel infrastructure 
                  with ambitious plans to provide 80% of Dutch households with fiber-to-the-home (FTTH) connections by 2026. 
                  The company's glasvezel network delivers symmetrical speeds up to 1000 Mbps with ultra-low latency, providing 
                  Dutch customers with world-class internet connectivity for modern digital applications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Comprehensive Service Portfolio</h3>
                <p className="text-muted-foreground">
                  KPN offers diverse internet speed tiers ranging from basic ADSL connections to ultra-fast glasvezel services, 
                  catering to various customer needs from residential browsing to professional applications. The company's 
                  service portfolio includes internet speeds from 40 Mbps ADSL/VDSL connections to premium 1000 Mbps 
                  glasvezel packages, complemented by integrated mobile and television bundles.
                </p>

                <h3 className="text-xl font-semibold mb-3">Market Leadership and Innovation</h3>
                <p className="text-muted-foreground">
                  As the Netherlands' dominant telecommunications provider, KPN combines traditional network reliability 
                  with cutting-edge technology innovation. The company's strategic focus on fiber deployment, 5G mobile 
                  networks, and digital services positions KPN as the foundation of Dutch digital infrastructure, 
                  supporting both consumer and enterprise customers across the country.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps KPN customers monitor their internet performance and ensure optimal service 
                  delivery from their glasvezel fiber or ADSL connection. Our KPN speed test measures download speeds, 
                  upload speeds, and network latency, providing insights into your broadband performance to identify 
                  connectivity issues and ensure you're receiving the premium internet service quality that defines 
                  KPN's telecommunications excellence in the Netherlands.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="nl" currentProviderSlug="kpn" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
