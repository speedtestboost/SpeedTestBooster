import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Zap } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function KPNSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO meta tags
    document.title = "KPN Speed Test Netherlands 2025 - Glasvezel & Internet Snelheid Test | Speed Test & Boost";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test KPN internet speed in Netherlands. Free KPN speedtest for glasvezel, fiber & ADSL connections. Check KPN internetsnelheid, upload, download speeds. Official KPN snelheidstest tool 2025.');
    }
    
    // Keywords targeting low-competition Dutch terms
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'KPN speed test, KPN speedtest Nederland, KPN glasvezel snelheid, KPN internetsnelheid test, KPN fiber speed test, KPN ADSL speedtest, KPN wifi snelheid meten, snelheidstest KPN gratis, KPN internet test 2025, KPN netwerk prestaties';
    
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
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/nl/kpn');
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
  }, []);

  const handleSpeedTestClick = () => {
    trackEvent('provider_speed_test_started', 'kpn', 'netherlands');
    setShowSpeedTest(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/kpn" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KPN Speed Test Nederland
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test je KPN internetsnelheid gratis. Controleer glasvezel, fiber en ADSL verbinding snelheden.
            </p>
            
            <Button 
              onClick={handleSpeedTestClick}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-4 mb-12"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start KPN Speedtest
            </Button>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Over KPN Nederland</h2>
            <p>
              KPN is Nederlands grootste telecommunicatieprovider, opgericht in 1989 als opvolger van PTT Telecom. 
              Met meer dan 8 miljoen klanten en 40% marktaandeel levert KPN internet, telefonie en televisie diensten 
              door heel Nederland.
            </p>
            
            <h3>KPN Glasvezel Netwerk</h3>
            <p>
              KPN investeert zwaar in glasvezel infrastructuur. Het doel is om tegen 2026 80% van Nederland te voorzien 
              van fiber-to-the-home (FTTH) verbindingen. KPN glasvezel biedt symmetrische snelheden tot 1000 Mbps 
              met lage latency voor optimale prestaties.
            </p>
            
            <h3>KPN Internet Snelheden</h3>
            <p>
              KPN biedt verschillende internetsnelheden van basis ADSL tot supersnel glasvezel:
            </p>
            <ul>
              <li>Basis Internet: Tot 40 Mbps via ADSL/VDSL</li>
              <li>Snel Internet: Tot 100 Mbps via glasvezel</li>
              <li>Supersnel: Tot 500 Mbps via glasvezel</li>
              <li>Ultra Internet: Tot 1000 Mbps via glasvezel</li>
            </ul>
            
            <h3>Waarom KPN Speedtest Gebruiken?</h3>
            <p>
              Een KPN speedtest helpt je controleren of je de internetsnelheid krijgt waarvoor je betaalt. 
              Test regelmatig je verbinding om netwerk problemen te identificeren en optimale prestaties 
              te garanderen voor streaming, gaming en werken vanuit huis.
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