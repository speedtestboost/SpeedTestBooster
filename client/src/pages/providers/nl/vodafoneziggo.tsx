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
  Tv,
  Phone
} from "lucide-react";
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

  const ziggoFeatures = [
    {
      icon: Network,
      title: "Kabel & Glasvezel",
      description: "High-speed cable network with fiber upgrades across Netherlands"
    },
    {
      icon: Tv,
      title: "TV + Internet Bundels",
      description: "Complete entertainment packages with premium channels"
    },
    {
      icon: Shield,
      title: "Stabiel Netwerk",
      description: "Reliable connection with 99.8% network uptime guarantee"
    },
    {
      icon: Award,
      title: "Leidende Provider",
      description: "Joint venture combining Vodafone and Ziggo expertise"
    }
  ];

  const speedPlans = [
    {
      name: "Start Internet",
      speed: "100/10 Mbps",
      technology: "Kabel",
      ideal: "Basic gebruik, streaming"
    },
    {
      name: "Supersnel",
      speed: "500/50 Mbps",
      technology: "Kabel",
      ideal: "HD streaming, gaming"
    },
    {
      name: "Gigasnelheid",
      speed: "1000/100 Mbps",
      technology: "Kabel/Glasvezel",
      ideal: "4K streaming, grote gezinnen"
    },
    {
      name: "Max Fiber",
      speed: "2000/2000 Mbps",
      technology: "Glasvezel",
      ideal: "Zakelijk gebruik, streaming"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/nl/vodafoneziggo" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">VZ</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
              VodafoneZiggo Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Test uw VodafoneZiggo internet snelheid gratis. Controleer uw <span className="font-semibold text-red-600">kabel</span>, 
              <span className="font-semibold text-purple-600"> glasvezel</span> en 
              <span className="font-semibold text-blue-600"> wifi</span> verbinding. 
              Officiële Ziggo speedtest voor Nederland 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={handleSpeedTestClick}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-purple-600 hover:opacity-90 text-lg px-8 py-4"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Ziggo Speedtest
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">40%</div>
                <div className="text-sm text-muted-foreground">Market Share</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">7M+</div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2 Gbps</div>
                <div className="text-sm text-muted-foreground">Max Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* VodafoneZiggo Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {ziggoFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Icon className="h-12 w-12 text-red-600 mx-auto mb-2" />
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
                <TrendingUp className="h-6 w-6 text-red-600" />
                VodafoneZiggo Internet Abonnementen 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {speedPlans.map((plan, index) => (
                  <div key={index} className="text-center p-6 rounded-lg border-2 border-red-100 dark:border-red-900 hover:border-red-300 transition-colors">
                    <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                    <div className="text-2xl font-bold text-red-600 mb-2">{plan.speed}</div>
                    <Badge variant="outline" className="mb-3">{plan.technology}</Badge>
                    <p className="text-sm text-muted-foreground">{plan.ideal}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* About VodafoneZiggo */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-red-600" />
                  Over VodafoneZiggo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  VodafoneZiggo is een joint venture tussen Vodafone en Liberty Global (Ziggo), ontstaan in 2017. 
                  Als één van de grootste telecom providers van Nederland bedient het bedrijf meer dan 7 miljoen klanten 
                  met internet, televisie en mobiele diensten.
                </p>
                <p className="text-muted-foreground">
                  Het bedrijf combineert Ziggo's uitgebreide kabelnetwerk met Vodafone's mobiele expertise. 
                  VodafoneZiggo investeert in glasvezel uitbreiding en biedt snelheden tot 2 Gbps via hun premium fiber netwerk.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Kabel + Glasvezel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">TV & Streaming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Mobiel Bundels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm">24/7 Ondersteuning</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-600" />
                  VodafoneZiggo Netwerk Prestaties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Download Snelheid</span>
                      <span className="text-red-600 font-semibold">Tot 2000 Mbps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Upload Snelheid</span>
                      <span className="text-purple-600 font-semibold">Tot 2000 Mbps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Latency (Ping)</span>
                      <span className="text-blue-600 font-semibold">&lt; 15ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Netwerk Uptime</span>
                      <span className="text-orange-600 font-semibold">99.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '98%'}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">VodafoneZiggo Speed Test FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Hoe test ik mijn VodafoneZiggo internet snelheid?</h3>
                <p className="text-muted-foreground">
                  Gebruik onze gratis speedtest door op "Start Ziggo Speedtest" te klikken. De test controleert uw download, upload snelheid en ping latency.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Wat is het verschil tussen Ziggo kabel en glasvezel?</h3>
                <p className="text-muted-foreground">
                  Ziggo kabel gebruikt coaxial kabels en biedt tot 1000 Mbps. Ziggo glasvezel gebruikt fiber optiek en biedt symmetrische snelheden tot 2000 Mbps.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Welke snelheid heb ik nodig voor streaming?</h3>
                <p className="text-muted-foreground">
                  Voor 4K streaming heeft u minimaal 25 Mbps nodig. VodafoneZiggo's 100 Mbps abonnement is ideaal voor meerdere streams en gaming.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Waarom is mijn VodafoneZiggo internet traag?</h3>
                <p className="text-muted-foreground">
                  Trage snelheden kunnen komen door wifi-interferentie, oude modem, netwerk congestie of technische storingen. Test eerst uw snelheid om het probleem te identificeren.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-red-600/10 to-purple-600/10 p-8 rounded-lg border border-red-200 dark:border-red-800">
            <h2 className="text-2xl font-bold mb-4">Test Uw VodafoneZiggo Snelheid Nu</h2>
            <p className="text-muted-foreground mb-6">
              Controleer of uw kabel of glasvezel verbinding optimaal presteert. Gratis speedtest voor alle VodafoneZiggo abonnementen.
            </p>
            <Button 
              onClick={handleSpeedTestClick}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:opacity-90"
            >
              <Zap className="mr-2 h-4 w-4" />
              Start VodafoneZiggo Test
            </Button>
          </div>
        </div>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="VodafoneZiggo"
        providerColor="red"
      />
    </div>
  );
}