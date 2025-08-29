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
  Network,
  Smartphone,
  Router
} from "lucide-react";
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

  const odidoFeatures = [
    {
      icon: Smartphone,
      title: "5G Netwerk",
      description: "Ultra-fast 5G mobile internet across major Dutch cities"
    },
    {
      icon: Network,
      title: "Glasvezel Internet",
      description: "Fiber optic home connections with gigabit speeds"
    },
    {
      icon: Shield,
      title: "Betrouwbare Dekking",
      description: "Extensive network coverage with 99% mobile uptime"
    },
    {
      icon: Award,
      title: "Mobile Leader",
      description: "Leading mobile network operator in Netherlands"
    }
  ];

  const speedPlans = [
    {
      name: "Basis Internet",
      speed: "50/20 Mbps",
      technology: "4G/Glasvezel",
      ideal: "Basis gebruik, email"
    },
    {
      name: "Snel Internet",
      speed: "200/100 Mbps",
      technology: "5G/Glasvezel",
      ideal: "Streaming, gaming"
    },
    {
      name: "Super Internet",
      speed: "500/500 Mbps",
      technology: "Glasvezel",
      ideal: "4K streaming, meerdere gebruikers"
    },
    {
      name: "Unlimited 5G",
      speed: "1000+ Mbps",
      technology: "5G",
      ideal: "Mobiel werken, downloads"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/odido" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">O</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Odido Speed Test Nederland
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Test uw Odido internet snelheid gratis. Controleer uw <span className="font-semibold text-pink-500">5G</span>, 
              <span className="font-semibold text-orange-500"> 4G</span>, 
              <span className="font-semibold text-blue-500"> glasvezel</span> en 
              <span className="font-semibold text-green-500"> wifi</span> verbinding. 
              Officiële Odido speedtest voor Nederland 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={handleSpeedTestClick}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90 text-lg px-8 py-4"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Odido Speedtest
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-500">35%</div>
                <div className="text-sm text-muted-foreground">Mobile Share</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">6M+</div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">1+ Gbps</div>
                <div className="text-sm text-muted-foreground">5G Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">99%</div>
                <div className="text-sm text-muted-foreground">Coverage</div>
              </div>
            </div>
          </div>

          {/* Odido Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {odidoFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Icon className="h-12 w-12 text-pink-500 mx-auto mb-2" />
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
                <TrendingUp className="h-6 w-6 text-pink-500" />
                Odido Internet Abonnementen 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {speedPlans.map((plan, index) => (
                  <div key={index} className="text-center p-6 rounded-lg border-2 border-pink-100 dark:border-pink-900 hover:border-pink-300 transition-colors">
                    <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                    <div className="text-2xl font-bold text-pink-500 mb-2">{plan.speed}</div>
                    <Badge variant="outline" className="mb-3">{plan.technology}</Badge>
                    <p className="text-sm text-muted-foreground">{plan.ideal}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* About Odido */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-pink-500" />
                  Over Odido Nederland
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Odido (voorheen T-Mobile Nederland) is een van de leidende mobiele netwerk operators in Nederland, 
                  met meer dan 6 miljoen klanten. Het bedrijf werd gelanceerd als een nieuwe merknaam in 2024, 
                  na de verkoop door Deutsche Telekom aan een consortium van investeerders.
                </p>
                <p className="text-muted-foreground">
                  Odido focust op innovatieve mobiele en internet diensten, met een sterke nadruk op 5G technologie 
                  en glasvezel internet. Het bedrijf biedt zowel zakelijke als particuliere oplossingen, 
                  van mobiele abonnementen tot complete internet en TV bundels.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">5G Netwerk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Glasvezel Internet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Mobiel + Thuis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-orange-500" />
                  Odido Netwerk Prestaties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">5G Download</span>
                      <span className="text-pink-500 font-semibold">1000+ Mbps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Glasvezel Upload</span>
                      <span className="text-orange-500 font-semibold">Tot 500 Mbps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">5G Latency</span>
                      <span className="text-blue-500 font-semibold">&lt; 5ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Netwerk Dekking</span>
                      <span className="text-green-500 font-semibold">99%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '99%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Odido Speed Test FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Hoe test ik mijn Odido internet snelheid?</h3>
                <p className="text-muted-foreground">
                  Gebruik onze gratis Odido speedtest om uw 5G, 4G, glasvezel of wifi snelheid te controleren. Klik op "Start Odido Speedtest" voor directe resultaten.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Wat is het verschil tussen Odido 4G en 5G?</h3>
                <p className="text-muted-foreground">
                  Odido 5G biedt veel hogere snelheden (1000+ Mbps vs 50-150 Mbps voor 4G) en lagere latency (&lt;5ms vs 20-50ms). 5G is beschikbaar in grote steden.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Biedt Odido glasvezel internet thuis?</h3>
                <p className="text-muted-foreground">
                  Ja, Odido biedt glasvezel internet voor thuisgebruik met snelheden tot 500 Mbps. Dit wordt vaak gecombineerd met mobiele abonnementen in bundelpakketten.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Waarom is mijn Odido internet langzaam?</h3>
                <p className="text-muted-foreground">
                  Langzame Odido snelheden kunnen veroorzaakt worden door zwakke signaalsterkte, netwerkcongestie, apparaat beperkingen of lokale interferentie. Test eerst uw snelheid.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-8 rounded-lg border border-pink-200 dark:border-pink-800">
            <h2 className="text-2xl font-bold mb-4">Test Uw Odido Snelheid Nu</h2>
            <p className="text-muted-foreground mb-6">
              Controleer of uw 5G, 4G of glasvezel verbinding optimaal presteert. Gratis speedtest voor alle Odido abonnementen.
            </p>
            <Button 
              onClick={handleSpeedTestClick}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90"
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Odido Snelheidstest
            </Button>
          </div>
        </div>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="Odido"
        providerColor="pink"
      />
    </div>
  );
}