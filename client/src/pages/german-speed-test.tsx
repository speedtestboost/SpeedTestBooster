import { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Wifi, Zap, Monitor, CheckCircle2 } from "lucide-react";

function GermanSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Kostenloses Internet-Geschwindigkeitstest - Präziser WiFi & Breitband Checker 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Testen Sie Ihre Internetgeschwindigkeit sofort mit unserem präzisen HTML5-Tool. Prüfen Sie Download, Upload, Ping & Jitter. Funktioniert mit allen Anbietern. 100% kostenlos, keine Downloads.');
    }

    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', 'de');

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://speedtestboost.com/de';
    document.head.appendChild(canonical);

    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    const hreflangEn = document.createElement('link');
    hreflangEn.setAttribute('rel', 'alternate');
    hreflangEn.setAttribute('hreflang', 'en');
    hreflangEn.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangEn);

    const hreflangEs = document.createElement('link');
    hreflangEs.setAttribute('rel', 'alternate');
    hreflangEs.setAttribute('hreflang', 'es');
    hreflangEs.setAttribute('href', 'https://speedtestboost.com/es');
    document.head.appendChild(hreflangEs);

    const hreflangId = document.createElement('link');
    hreflangId.setAttribute('rel', 'alternate');
    hreflangId.setAttribute('hreflang', 'id');
    hreflangId.setAttribute('href', 'https://speedtestboost.com/id');
    document.head.appendChild(hreflangId);

    const hreflangPtBr = document.createElement('link');
    hreflangPtBr.setAttribute('rel', 'alternate');
    hreflangPtBr.setAttribute('hreflang', 'pt-BR');
    hreflangPtBr.setAttribute('href', 'https://speedtestboost.com/pt-br');
    document.head.appendChild(hreflangPtBr);

    const hreflangFr = document.createElement('link');
    hreflangFr.setAttribute('rel', 'alternate');
    hreflangFr.setAttribute('hreflang', 'fr');
    hreflangFr.setAttribute('href', 'https://speedtestboost.com/fr');
    document.head.appendChild(hreflangFr);

    const hreflangDe = document.createElement('link');
    hreflangDe.setAttribute('rel', 'alternate');
    hreflangDe.setAttribute('hreflang', 'de');
    hreflangDe.setAttribute('href', 'https://speedtestboost.com/de');
    document.head.appendChild(hreflangDe);

    const hreflangDefault = document.createElement('link');
    hreflangDefault.setAttribute('rel', 'alternate');
    hreflangDefault.setAttribute('hreflang', 'x-default');
    hreflangDefault.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangDefault);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Internet-Geschwindigkeitstest - Deutsch",
      "description": "Kostenloses Internet-Geschwindigkeitstest auf Deutsch zur Messung Ihrer WiFi- und Breitbandverbindung in Deutschland",
      "url": "https://speedtestboost.com/de",
      "inLanguage": "de",
      "about": {
        "@type": "Thing",
        "name": "Internet Speed Test",
        "description": "Kostenloses Tool zur Messung der Internetgeschwindigkeit auf Deutsch"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
      
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/de" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Internet-Geschwindigkeitstest
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Testen Sie Ihre Internetgeschwindigkeit kostenlos auf Deutsch. Messen Sie Download-, Upload-Geschwindigkeit und Ping für Deutsche Telekom, Vodafone, O2 und andere deutsche Internetanbieter.
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Monitor className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Funktioniert auf Jedem Gerät</span>
              </div>
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Wifi className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Keine Installation</span>
              </div>
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Sofortige Ergebnisse</span>
              </div>
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">100% Kostenlos</span>
              </div>
            </div>

            <Button
              onClick={() => setShowSpeedTest(true)}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Geschwindigkeitstest Starten
            </Button>
          </div>

          {/* German ISP Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Deutsche Telekom</h3>
                <p className="text-muted-foreground text-sm">
                  Testen Sie Ihre Telekom-Glasfaser-, DSL- und 5G-Verbindung. Überprüfen Sie MagentaZuhause und Speedport-Router-Leistung.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Vodafone Deutschland</h3>
                <p className="text-muted-foreground text-sm">
                  Messen Sie Vodafone Kabel-, Glasfaser- und LTE-Geschwindigkeiten. Red Internet & Phone Tarife und GigaCube testen.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">O2 Germany</h3>
                <p className="text-muted-foreground text-sm">
                  Testen Sie O2 DSL-, LTE- und 5G-Internetgeschwindigkeiten. O2 my Home Tarife und HomeSpot Router überprüfen.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* German Speed Test Guide */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Internet-Geschwindigkeitstest Deutschland - Vollständiger Leitfaden
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Verstehen Sie Ihre Ergebnisse</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div><strong className="text-foreground">Download-Geschwindigkeit:</strong> Wie schnell Sie Daten empfangen (Streaming, Surfen)</div>
                    <div><strong className="text-foreground">Upload-Geschwindigkeit:</strong> Wie schnell Sie Daten senden (E-Mails, Cloud-Upload)</div>
                    <div><strong className="text-foreground">Ping:</strong> Antwortzeit in Millisekunden (wichtig für Gaming)</div>
                    <div><strong className="text-foreground">Jitter:</strong> Variation der Ping-Zeiten (Stabilität der Verbindung)</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Deutsche Geschwindigkeitsanforderungen</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div><strong className="text-foreground">HD-Streaming:</strong> 5-10 Mbps (Netflix, Amazon Prime)</div>
                    <div><strong className="text-foreground">4K-Streaming:</strong> 25+ Mbps (Ultra HD Inhalte)</div>
                    <div><strong className="text-foreground">Gaming:</strong> 3-6 Mbps + niedriger Ping (&lt;50ms)</div>
                    <div><strong className="text-foreground">Videokonferenzen:</strong> 1-4 Mbps (Teams, Zoom)</div>
                    <div><strong className="text-foreground">Home Office:</strong> 10-25 Mbps (mehrere Geräte)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* German Cities */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Geschwindigkeitstests für Deutsche Städte</h2>
              <p className="text-center text-muted-foreground mb-8">
                Testen Sie Ihre Internetgeschwindigkeit in den größten deutschen Städten mit lokalen Servern
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">🏙️ Berlin</div>
                  <div className="text-xs text-muted-foreground mt-1">Hauptstadt</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">🏭 München</div>
                  <div className="text-xs text-muted-foreground mt-1">Bayern</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">🏢 Hamburg</div>
                  <div className="text-xs text-muted-foreground mt-1">Norddeutschland</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">🏛️ Köln</div>
                  <div className="text-xs text-muted-foreground mt-1">NRW</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">🚗 Frankfurt</div>
                  <div className="text-xs text-muted-foreground mt-1">Hessen</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">🏭 Stuttgart</div>
                  <div className="text-xs text-muted-foreground mt-1">Baden-Württemberg</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">⚽ Dortmund</div>
                  <div className="text-xs text-muted-foreground mt-1">Ruhrgebiet</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg text-center">
                  <div className="font-medium">🎭 Dresden</div>
                  <div className="text-xs text-muted-foreground mt-1">Sachsen</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Language Links */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Geschwindigkeitstest in anderen Sprachen</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Link 
                  href="/" 
                  className="text-sm px-4 py-2 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors"
                >
                  🇺🇸 English
                </Link>
                <Link 
                  href="/es" 
                  className="text-sm px-4 py-2 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors"
                >
                  🇪🇸 Español
                </Link>
                <Link 
                  href="/pt-br" 
                  className="text-sm px-4 py-2 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors"
                >
                  🇧🇷 Português
                </Link>
                <Link 
                  href="/fr" 
                  className="text-sm px-4 py-2 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors"
                >
                  🇫🇷 Français
                </Link>
                <Link 
                  href="/id" 
                  className="text-sm px-4 py-2 bg-muted/50 rounded-full hover:bg-primary/10 transition-colors"
                >
                  🇮🇩 Indonesia
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <GenericFooter />
      
      <SpeedTestModal
        isOpen={showSpeedTest}
        onClose={() => setShowSpeedTest(false)}
      />
    </div>
  );
}

export default GermanSpeedTest;
