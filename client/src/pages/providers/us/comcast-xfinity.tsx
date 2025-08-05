import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Clock, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ComcastXfinitySpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Comcast Xfinity Internet Speed Test - Test Xfinity Cable & Fiber Internet 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Comcast Xfinity internet speed for free. Check Xfinity cable and fiber speeds up to 2 Gig, gigabit plans, and wireless gateway performance. Compare download/upload speeds across 39 states.');
    }

    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Comcast Xfinity Internet Speed Test",
      "description": "Test your Comcast Xfinity internet speed for free. Check cable and fiber speeds up to 2 Gig.",
      "url": `${window.location.origin}/providers/us/comcast-xfinity`,
      "provider": {
        "@type": "Organization",
        "name": "Comcast Xfinity",
        "description": "Leading cable and fiber internet provider serving 39 states across the United States",
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

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/comcast-xfinity" />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text">Comcast Xfinity</h1>
              <p className="text-xl text-muted-foreground mt-2">Internet Speed Test</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Test your Comcast Xfinity internet speed and performance. Check cable and fiber speeds, latency, and connection quality across Xfinity's network serving 39 states.
            </p>
          </div>

          <Button 
            onClick={() => setShowSpeedTest(true)}
            className="gradient-bg text-white px-8 py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Test Xfinity Speed Now
          </Button>
        </div>

        {/* Provider Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Max Speed</h3>
              <p className="text-3xl font-bold text-primary">2 Gig</p>
              <p className="text-sm text-muted-foreground mt-1">Download Speed</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Coverage</h3>
              <p className="text-2xl font-bold text-primary">39 States</p>
              <p className="text-sm text-muted-foreground mt-1">Nationwide Network</p>
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
              <p className="text-2xl font-bold text-primary">32M+</p>
              <p className="text-sm text-muted-foreground mt-1">Subscribers</p>
            </CardContent>
          </Card>
        </div>

        {/* Speed Plans */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="h-6 w-6 mr-3 text-primary" />
              Xfinity Internet Plans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Connect</h4>
                  <Badge variant="secondary">Entry</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">75 Mbps</p>
                <p className="text-sm text-muted-foreground">Perfect for streaming and browsing</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Fast</h4>
                  <Badge variant="default">Popular</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">400 Mbps</p>
                <p className="text-sm text-muted-foreground">Great for gaming and multiple devices</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Gigabit Pro</h4>
                  <Badge variant="destructive">Premium</Badge>
                </div>
                <p className="text-2xl font-bold text-primary">2 Gig</p>
                <p className="text-sm text-muted-foreground">Ultimate speed for power users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coverage Map */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MapPin className="h-6 w-6 mr-3 text-primary" />
              Service Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Xfinity provides internet service across 39 states, with strongest coverage in:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Northeast</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Massachusetts</Badge>
                  <Badge variant="outline">New Jersey</Badge>
                  <Badge variant="outline">Pennsylvania</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Southeast</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Florida</Badge>
                  <Badge variant="outline">Georgia</Badge>
                  <Badge variant="outline">Virginia</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">West Coast</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">California</Badge>
                  <Badge variant="outline">Washington</Badge>
                  <Badge variant="outline">Oregon</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="Comcast Xfinity"
      />
    </div>
  );
}