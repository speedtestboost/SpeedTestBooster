import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, TrendingUp, Users } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function TalkTalkSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "TalkTalk Broadband Speed Test - Test TalkTalk Fibre Internet UK 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your TalkTalk broadband speed for free. Check TalkTalk fibre and ADSL speeds up to 900 Mbps across the UK.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "TalkTalk Broadband Speed Test",
      "description": "Test your TalkTalk broadband speed for free. Check fibre speeds up to 900 Mbps.",
      "url": `${window.location.origin}/providers/uk/talktalk`,
      "provider": {
        "@type": "Organization",
        "name": "TalkTalk",
        "description": "UK broadband and phone provider offering fibre and ADSL services",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "serviceType": ["Fibre Broadband", "ADSL", "Phone", "TV"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/uk/talktalk" />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text">TalkTalk</h1>
              <p className="text-xl text-muted-foreground mt-2">Broadband Speed Test</p>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowSpeedTest(true)}
            className="gradient-bg text-white px-8 py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            <Zap className="h-5 w-5 mr-2" />
            Test TalkTalk Speed Now
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Max Speed</h3>
              <p className="text-3xl font-bold text-primary">900 Mbps</p>
              <p className="text-sm text-muted-foreground mt-1">Fibre 900</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Coverage</h3>
              <p className="text-2xl font-bold text-primary">Nationwide</p>
              <p className="text-sm text-muted-foreground mt-1">UK Wide</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Wifi className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Technology</h3>
              <p className="text-xl font-bold text-primary">Fibre/ADSL</p>
              <p className="text-sm text-muted-foreground mt-1">Openreach Network</p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Customers</h3>
              <p className="text-2xl font-bold text-primary">4M+</p>
              <p className="text-sm text-muted-foreground mt-1">Subscribers</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <SpeedTestModal 
        isOpen={showSpeedTest} 
        onClose={() => setShowSpeedTest(false)}
        providerName="TalkTalk"
      />
    </div>
  );
}