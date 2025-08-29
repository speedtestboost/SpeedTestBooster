import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Zap } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function OdidoSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO meta tags
    document.title = "Odido Speed Test Netherlands 2025 - T-Mobile Internet Snelheid Test | Speed Test & Boost";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Odido (T-Mobile) internet speed in Netherlands. Free Odido speedtest for fiber, mobile internet. Check Odido internetsnelheid, 4G, 5G speeds. Official Odido snelheidstest 2025.');
    }
    
    // Keywords targeting low-competition Dutch terms
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'Odido speed test, Odido speedtest Nederland, T-Mobile Nederland snelheid, Odido internet test, Odido glasvezel speedtest, Odido 4G 5G test, Odido wifi snelheid, T-Mobile speedtest gratis, Odido mobiel internet test, Odido netwerk 2025';
    
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
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/nl/odido');
    }
    
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
  }, []);

  const handleSpeedTestClick = () => {
    trackEvent('provider_speed_test_started', 'odido', 'netherlands');
    setShowSpeedTest(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/odido" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Odido Speed Test Nederland
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test je Odido internetsnelheid gratis. Controleer 5G, 4G, glasvezel en wifi verbinding prestaties.
            </p>
            
            <Button 
              onClick={handleSpeedTestClick}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-4 mb-12"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Odido Speedtest
            </Button>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Over Odido Nederland</h2>
            <p>
              Odido (voorheen T-Mobile Nederland) is een van de leidende mobiele netwerk operators in Nederland, 
              met meer dan 6 miljoen klanten. Het bedrijf werd gelanceerd als een nieuwe merknaam in 2024, 
              na de verkoop door Deutsche Telekom aan een consortium van investeerders.
            </p>
            
            <h3>5G en Mobiel Netwerk</h3>
            <p>
              Odido focust op innovatieve mobiele technologieën met een sterke nadruk op 5G netwerk uitbreiding. 
              Het bedrijf biedt ultra-snelle 5G verbindingen in grote Nederlandse steden en heeft uitgebreide 
              4G dekking door heel Nederland voor betrouwbare mobiele internet ervaring.
            </p>
            
            <h3>Odido Internet Services</h3>
            <p>
              Odido biedt verschillende internet oplossingen voor thuis en onderweg:
            </p>
            <ul>
              <li>Basis Internet: Tot 50 Mbps via 4G/glasvezel</li>
              <li>Snel Internet: Tot 200 Mbps via 5G/glasvezel</li>
              <li>Super Internet: Tot 500 Mbps via glasvezel</li>
              <li>Unlimited 5G: 1000+ Mbps mobiele snelheden</li>
            </ul>
            
            <h3>Glasvezel en Thuis Internet</h3>
            <p>
              Naast mobiele diensten biedt Odido ook glasvezel internet voor thuisgebruik. 
              Deze diensten worden vaak gecombineerd met mobiele abonnementen in aantrekkelijke 
              bundelpakketten die zowel thuis als mobiel internet behoeften dekken.
            </p>
            
            <h3>Zakelijke Oplossingen</h3>
            <p>
              Odido levert ook comprehensive zakelijke telecommunicatie oplossingen, van mobiele 
              abonnementen voor bedrijven tot complete ICT infrastructuur diensten. Het bedrijf 
              ondersteunt Nederlandse bedrijven met betrouwbare communicatie technologieën.
            </p>
            
            <h3>Waarom Odido Speedtest Gebruiken?</h3>
            <p>
              Test regelmatig je Odido verbinding om te controleren of je optimale 5G, 4G of 
              glasvezel prestaties krijgt. Een speedtest helpt identificeren netwerk problemen 
              en garandeert beste ervaring voor streaming, gaming en zakelijk gebruik.
            </p>
          </div>
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}