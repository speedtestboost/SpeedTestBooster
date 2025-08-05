import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Clock, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function CoxSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Cox Internet Speed Test - Test Cox Cable & Fiber Internet 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Cox internet speed for free. Check Cox cable and fiber speeds up to 2 Gig, panoramic wifi, and connection quality across 18 states.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cox Internet Speed Test",
      "description": "Test your Cox internet speed for free. Check cable and fiber speeds up to 2 Gig.",
      "url": `${window.location.origin}/providers/us/cox`,
      "provider": {
        "@type": "Organization",
        "name": "Cox Communications",
        "description": "Cable and fiber internet provider serving 18 states across the United States",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "serviceType": ["Cable Internet", "Fiber Internet", "TV", "Phone"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/cox" />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text">Cox</h1>
              <p className="text-xl text-muted-foreground mt-2">Internet Speed Test</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Test your Cox internet speed and performance. Check cable and fiber speeds, panoramic wifi, and connection quality across Cox's 18-state network.
            </p>
          </div>

          <Button 
            onClick={() => setShowSpeedTest(true)}
            className="gradient-bg text-white px-8 py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Test Cox Speed Now
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Max Speed</h3>
              <p className="text-3xl font-bold text-primary">2 Gig</p>
              <p className="text-sm text-muted-foreground mt-1">Fiber Internet</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Coverage</h3>
              <p className="text-2xl font-bold text-primary">18 States</p>
              <p className="text-sm text-muted-foreground mt-1">Regional Focus</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Wifi className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Technology</h3>
              <p className="text-xl font-bold text-primary">Cable/Fiber</p>
              <p className="text-sm text-muted-foreground mt-1">Hybrid Network</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Customers</h3>
              <p className="text-2xl font-bold text-primary">6M+</p>
              <p className="text-sm text-muted-foreground mt-1">Subscribers</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="h-6 w-6 mr-3 text-primary" />
              Cox Internet Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Internet Essential</h4>
                  <Badge variant="secondary">Basic</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">50 Mbps</p>
                <p className="text-sm text-muted-foreground">Entry-level connectivity</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Internet Preferred</h4>
                  <Badge variant="default">Popular</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">500 Mbps</p>
                <p className="text-sm text-muted-foreforeground">Great for families</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Gigablast</h4>
                  <Badge variant="destructive">Premium</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">1-2 Gig</p>
                <p className="text-sm text-muted-foreground">Maximum performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="Cox"
      />
    </div>
  );
}