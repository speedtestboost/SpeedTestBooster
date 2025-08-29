import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Zap } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function VodafoneZiggoSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO meta tags
    document.title = "VodafoneZiggo Speed Test Netherlands 2025 - Ziggo Internet Snelheid Test | Speed Test & Boost";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test VodafoneZiggo internet speed in Netherlands. Free Ziggo speedtest for cable, fiber connections. Check Ziggo internetsnelheid, upload, download speeds. Official Ziggo snelheidstest 2025.');
    }
    
    // Keywords targeting low-competition Dutch terms
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'VodafoneZiggo speed test, Ziggo speedtest Nederland, Ziggo internet snelheid, VodafoneZiggo snelheidstest, Ziggo kabel internet test, Ziggo wifi snelheid, Ziggo speedtest gratis, VodafoneZiggo glasvezel test, Ziggo netwerk prestaties 2025';
    
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
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/nl/vodafoneziggo');
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

  const handleSpeedTestClick = () => {
    trackEvent('provider_speed_test_started', 'vodafoneziggo', 'netherlands');
    setShowSpeedTest(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/vodafoneziggo" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VodafoneZiggo Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test je VodafoneZiggo internetsnelheid gratis. Controleer kabel en glasvezel verbinding prestaties.
            </p>
            
            <Button 
              onClick={handleSpeedTestClick}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-4 mb-12"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Ziggo Speedtest
            </Button>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Over VodafoneZiggo</h2>
            <p>
              VodafoneZiggo is een joint venture tussen Vodafone en Liberty Global (Ziggo), ontstaan in 2017. 
              Als één van de grootste telecom providers van Nederland bedient het bedrijf meer dan 7 miljoen klanten 
              met internet, televisie en mobiele diensten door heel Nederland.
            </p>
            
            <h3>Kabel en Glasvezel Netwerk</h3>
            <p>
              VodafoneZiggo combineert Ziggo's uitgebreide kabelnetwerk met moderne glasvezel technologie. 
              Het bedrijf biedt snelheden tot 2 Gbps via hun premium fiber netwerk en heeft een betrouwbaar 
              coaxial kabelnetwerk dat grote delen van Nederland bedekt.
            </p>
            
            <h3>VodafoneZiggo Internet Snelheden</h3>
            <p>
              VodafoneZiggo biedt verschillende internetsnelheden via kabel en glasvezel:
            </p>
            <ul>
              <li>Start Internet: Tot 100 Mbps via kabel</li>
              <li>Supersnel: Tot 500 Mbps via kabel</li>
              <li>Gigasnelheid: Tot 1000 Mbps via kabel/glasvezel</li>
              <li>Max Fiber: Tot 2000 Mbps via glasvezel</li>
            </ul>
            
            <h3>TV en Entertainment Bundels</h3>
            <p>
              VodafoneZiggo staat bekend om uitgebreide televisie en entertainment pakketten gecombineerd 
              met internet diensten. Het bedrijf biedt toegang tot premium zenders, on-demand content 
              en streaming diensten als onderdeel van hun bundel oplossingen.
            </p>
            
            <h3>Waarom VodafoneZiggo Speedtest Gebruiken?</h3>
            <p>
              Test regelmatig je VodafoneZiggo verbinding om optimale prestaties te garanderen voor 
              4K streaming, online gaming en werken vanuit huis. Een speedtest helpt identificeren 
              of je de snelheid krijgt waarvoor je betaalt.
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