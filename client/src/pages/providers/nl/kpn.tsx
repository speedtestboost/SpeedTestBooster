import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { trackEvent } from "@/lib/analytics";
import { 
  Wifi, 
  Zap, 
  Globe, 
  Shield,
  MapPin,
  Award,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  Network
} from "lucide-react";
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

  const kpnFeatures = [
    {
      icon: Network,
      title: "Glasvezel Netwerk",
      description: "KPN's fiber optic network delivers ultra-fast speeds up to 1 Gbps"
    },
    {
      icon: MapPin,
      title: "Nationale Dekking",
      description: "Extensive coverage across Netherlands with ongoing fiber expansion"
    },
    {
      icon: Shield,
      title: "Betrouwbare Verbinding",
      description: "99.9% network uptime with premium service quality"
    },
    {
      icon: Award,
      title: "Marktleider",
      description: "Netherlands' leading telecom provider with 40% market share"
    }
  ];

  const speedPlans = [
    {
      name: "Basis Internet",
      speed: "40/10 Mbps",
      technology: "ADSL/VDSL",
      ideal: "Basic browsing, email"
    },
    {
      name: "Snel Internet",
      speed: "100/40 Mbps",
      technology: "Glasvezel",
      ideal: "HD streaming, gaming"
    },
    {
      name: "Supersnel",
      speed: "500/500 Mbps",
      technology: "Glasvezel",
      ideal: "4K streaming, multiple users"
    },
    {
      name: "Ultra Internet",
      speed: "1000/1000 Mbps",
      technology: "Glasvezel",
      ideal: "Professional use, large families"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/kpn" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">KPN</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              KPN Speed Test Nederland
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Test uw KPN internet snelheid gratis. Controleer uw <span className="font-semibold text-green-600">glasvezel</span>, 
              <span className="font-semibold text-blue-600"> fiber</span> en 
              <span className="font-semibold text-orange-600"> ADSL</span> verbinding. 
              Officiële KPN speedtest voor Nederland 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={handleSpeedTestClick}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 text-lg px-8 py-4"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start KPN Speedtest
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">40%</div>
                <div className="text-sm text-muted-foreground">Market Share</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">8M+</div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1 Gbps</div>
                <div className="text-sm text-muted-foreground">Max Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* KPN Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {kpnFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Icon className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Speed Plans */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                KPN Internet Abonnementen 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {speedPlans.map((plan, index) => (
                  <div key={index} className="text-center p-6 rounded-lg border-2 border-green-100 dark:border-green-900 hover:border-green-300 transition-colors">
                    <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">{plan.speed}</div>
                    <Badge variant="outline" className="mb-3">{plan.technology}</Badge>
                    <p className="text-sm text-muted-foreground">{plan.ideal}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* About KPN */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Over KPN Nederland
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  KPN is de grootste telecommunicatie provider van Nederland, opgericht in 1989 als opvolger van PTT Telecom. 
                  Met meer dan 8 miljoen klanten en 40% marktaandeel is KPN de leidende leverancier van internet, telefonie en televisie diensten.
                </p>
                <p className="text-muted-foreground">
                  KPN investeert zwaar in glasvezel infrastructuur met het doel om tegen 2026 80% van Nederland te bedekken met 
                  fiber-to-the-home (FTTH) verbindingen. Het bedrijf biedt snelheden tot 1 Gbps en is bekend om zijn betrouwbare netwerk.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">24/7 Klantenservice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Glasvezel Netwerk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Mobiel + Internet Bundels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Business Oplossingen</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-600" />
                  KPN Netwerk Prestaties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Download Snelheid</span>
                      <span className="text-green-600 font-semibold">Tot 1000 Mbps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Upload Snelheid</span>
                      <span className="text-blue-600 font-semibold">Tot 1000 Mbps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Latency (Ping)</span>
                      <span className="text-purple-600 font-semibold">&lt; 10ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Netwerk Uptime</span>
                      <span className="text-orange-600 font-semibold">99.9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '99%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section targeting Netherlands-specific searches */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">KPN Speed Test FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Hoe test ik mijn KPN internet snelheid?</h3>
                <p className="text-muted-foreground">
                  Klik op de "Start KPN Speedtest" knop om uw internet snelheid te testen. De test meet download, upload snelheden en ping latency van uw KPN verbinding.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Wat is de snelste KPN internet snelheid?</h3>
                <p className="text-muted-foreground">
                  KPN biedt glasvezel verbindingen tot 1000 Mbps (1 Gbps) download en upload. Dit is beschikbaar via KPN's fiber-to-the-home (FTTH) netwerk.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Verschil tussen KPN glasvezel en ADSL?</h3>
                <p className="text-muted-foreground">
                  KPN glasvezel biedt veel hogere snelheden (tot 1000 Mbps) en stabielere verbindingen dan ADSL (tot 40 Mbps). Glasvezel heeft ook lagere latency.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Waarom is mijn KPN internet langzaam?</h3>
                <p className="text-muted-foreground">
                  Trage KPN snelheden kunnen veroorzaakt worden door wifi-interferentie, verouderde apparatuur, netwerk congestie of technische problemen. Test eerst uw snelheid.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-green-600/10 to-blue-600/10 p-8 rounded-lg border border-green-200 dark:border-green-800">
            <h2 className="text-2xl font-bold mb-4">Test Uw KPN Internet Snelheid Nu</h2>
            <p className="text-muted-foreground mb-6">
              Controleer of u de snelheid krijgt waarvoor u betaalt. Gratis KPN speedtest voor alle abonnementen.
            </p>
            <Button 
              onClick={handleSpeedTestClick}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90"
            >
              <Zap className="mr-2 h-4 w-4" />
              Start KPN Snelheidstest
            </Button>
          </div>
        </div>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="KPN"
        providerColor="green"
      />
    </div>
  );
}