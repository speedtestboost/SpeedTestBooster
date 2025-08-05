import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Clock, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ATTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "AT&T Internet Speed Test - Test AT&T Fiber & DSL Internet 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your AT&T internet speed for free. Check AT&T Fiber speeds up to 5 Gig, DSL performance, and wireless connectivity. Nationwide coverage across the United States.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AT&T Internet Speed Test",
      "description": "Test your AT&T internet speed for free. Check fiber speeds up to 5 Gig and DSL performance.",
      "url": `${window.location.origin}/providers/us/att`,
      "provider": {
        "@type": "Organization",
        "name": "AT&T",
        "description": "Major telecommunications provider offering fiber internet, DSL, and wireless services nationwide",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "serviceType": ["Fiber Internet", "DSL", "Wireless", "TV"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/att" />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text">AT&T</h1>
              <p className="text-xl text-muted-foreground mt-2">Internet Speed Test</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Test your AT&T internet speed and performance. Check fiber and DSL speeds, latency, and connection quality across AT&T's nationwide network.
            </p>
          </div>

          <Button 
            onClick={() => setShowSpeedTest(true)}
            className="gradient-bg text-white px-8 py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Test AT&T Speed Now
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Max Speed</h3>
              <p className="text-3xl font-bold text-primary">5 Gig</p>
              <p className="text-sm text-muted-foreground mt-1">AT&T Fiber</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Coverage</h3>
              <p className="text-2xl font-bold text-primary">Nationwide</p>
              <p className="text-sm text-muted-foreground mt-1">All 50 States</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Wifi className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Technology</h3>
              <p className="text-xl font-bold text-primary">Fiber/DSL</p>
              <p className="text-sm text-muted-foreground mt-1">Multi-Platform</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Customers</h3>
              <p className="text-2xl font-bold text-primary">15M+</p>
              <p className="text-sm text-muted-foreground mt-1">Internet Subscribers</p>
            </CardContent>
          </Card>
        </div>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="h-6 w-6 mr-3 text-primary" />
              AT&T Internet Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Internet Basic</h4>
                  <Badge variant="secondary">DSL</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">25 Mbps</p>
                <p className="text-sm text-muted-foreground">Essential connectivity</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Fiber 1000</h4>
                  <Badge variant="default">Popular</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">1 Gig</p>
                <p className="text-sm text-muted-foreground">Symmetrical fiber speeds</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Fiber 5000</h4>
                  <Badge variant="destructive">Premium</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">5 Gig</p>
                <p className="text-sm text-muted-foreground">Ultra-high speed fiber</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="AT&T"
      />
    </div>
  );
}