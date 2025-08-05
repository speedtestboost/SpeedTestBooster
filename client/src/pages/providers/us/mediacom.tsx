import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, TrendingUp, Users } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function MediacomSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Mediacom Internet Speed Test - Test Mediacom Cable Internet 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Mediacom internet speed for free. Check Mediacom cable speeds up to 1 Gig, wifi performance, and connection quality across 22 states.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Mediacom Internet Speed Test",
      "description": "Test your Mediacom internet speed for free. Check cable speeds up to 1 Gig.",
      "url": `${window.location.origin}/providers/us/mediacom`,
      "provider": {
        "@type": "Organization",
        "name": "Mediacom",
        "description": "Cable internet provider serving rural and suburban areas across 22 states",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "TV", "Phone"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/mediacom" />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text">Mediacom</h1>
              <p className="text-xl text-muted-foreground mt-2">Internet Speed Test</p>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowSpeedTest(true)}
            className="gradient-bg text-white px-8 py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Test Mediacom Speed Now
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Max Speed</h3>
              <p className="text-3xl font-bold text-primary">1 Gig</p>
              <p className="text-sm text-muted-foreground mt-1">Cable Internet</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Coverage</h3>
              <p className="text-2xl font-bold text-primary">22 States</p>
              <p className="text-sm text-muted-foreground mt-1">Rural & Suburban</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Wifi className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Technology</h3>
              <p className="text-xl font-bold text-primary">Cable</p>
              <p className="text-sm text-muted-foreground mt-1">HFC Network</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Customers</h3>
              <p className="text-2xl font-bold text-primary">1.3M+</p>
              <p className="text-sm text-muted-foreground mt-1">Subscribers</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="Mediacom"
      />
    </div>
  );
}