import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Clock, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function JioFiberSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Jio Fiber Speed Test - Test Reliance Jio Fiber Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Jio Fiber internet speed for free. Check Reliance Jio Fiber broadband speeds up to 1 Gbps across India. Test download, upload speeds, ping, and jitter for your JioFiber connection.');
    }

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'jio fiber speed test, jiofiber speed test, reliance jio fiber speed test, jio broadband speed test, jio fiber internet speed, jio fiber wifi speed test, jio connection test, jio download speed, jio upload speed india';
    document.head.appendChild(metaKeywords);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Jio Fiber Speed Test",
      "description": "Test your Jio Fiber internet speed for free. Check Reliance Jio Fiber broadband speeds up to 1 Gbps across India.",
      "url": `${window.location.origin}/providers/in/jio-fiber`,
      "provider": {
        "@type": "Organization",
        "name": "Reliance Jio Fiber",
        "description": "India's largest fiber broadband service provider offering high-speed internet across major cities and towns",
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "serviceType": ["Fiber Broadband", "FTTH", "Enterprise Internet"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.1",
          "reviewCount": "450000",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      const existingKeywords = document.querySelector('meta[name="keywords"]');
      if (existingScript) document.head.removeChild(existingScript);
      if (existingKeywords) document.head.removeChild(existingKeywords);
    };
  }, []);

  const plans = [
    {
      name: "Bronze 30 Mbps",
      speed: "30/30 Mbps",
      price: "₹399/month",
      type: "Basic",
      features: ["Symmetrical speeds", "3.3TB data/month", "Netflix/Prime included"]
    },
    {
      name: "Silver 100 Mbps",
      speed: "100/100 Mbps",
      price: "₹699/month", 
      type: "Popular",
      features: ["Unlimited data", "Disney+ Hotstar", "JioSaavn Pro"]
    },
    {
      name: "Gold 200 Mbps",
      speed: "200/200 Mbps",
      price: "₹999/month",
      type: "Premium",
      features: ["Gaming optimized", "Netflix Premium", "Amazon Prime"]
    },
    {
      name: "Diamond 1 Gbps",
      speed: "1000/1000 Mbps",
      price: "₹3999/month",
      type: "Gigabit",
      features: ["Maximum speeds", "All OTT apps", "Priority support"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/in/jio-fiber" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Jio Fiber Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Jio Fiber internet speed</span> for free. Check Reliance JioFiber broadband speeds up to 1 Gbps, ping performance, and connection quality across India.
            </p>
            
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Jio Fiber Speed
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>Coverage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1600+</p>
                <p className="text-sm text-muted-foreground">Cities & towns</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span>Max Speed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1 Gbps</p>
                <p className="text-sm text-muted-foreground">Symmetrical</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span>Rating</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">4.1/5</p>
                <p className="text-sm text-muted-foreground">Customer satisfaction</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Technology</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">FTTH</p>
                <p className="text-sm text-muted-foreground">Fiber to home</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Jio Fiber Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{plan.name}</span>
                      <Badge variant={plan.type === 'Gigabit' ? 'default' : 'secondary'}>
                        {plan.type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-500">{plan.speed}</p>
                        <p className="text-sm text-muted-foreground">Download/Upload</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold">{plan.price}</p>
                        <p className="text-sm text-muted-foreground">Monthly plan</p>
                      </div>
                      <div className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            <h2>About Jio Fiber Internet Services</h2>
            <p>
              Reliance Jio Fiber is India's largest and fastest-growing fiber broadband service provider, offering high-speed internet connectivity across 1600+ cities and towns. With symmetric speeds up to 1 Gbps and bundled OTT entertainment services, Jio Fiber has revolutionized India's broadband market since its launch in 2019.
            </p>
            
            <h3>Jio Fiber FTTH Technology</h3>
            <p>
              Jio Fiber uses Fiber-to-the-Home (FTTH) technology, delivering dedicated fiber optic connections directly to subscribers' premises. This ensures consistent high-speed internet with low latency, making it ideal for streaming, gaming, remote work, and smart home applications. All plans offer symmetrical upload and download speeds.
            </p>
            
            <h3>Entertainment and Value-Added Services</h3>
            <p>
              Jio Fiber plans include complimentary subscriptions to popular OTT platforms like Netflix, Amazon Prime Video, Disney+ Hotstar, and JioSaavn Pro. Higher-tier plans also provide access to Jio's suite of digital services, including JioCloud storage and premium customer support.
            </p>
            
            <h3>Why Test Your Jio Fiber Speed?</h3>
            <p>
              Regular speed testing ensures your Jio Fiber connection delivers promised performance. Our speed test measures download/upload speeds, ping latency, and jitter to help you verify service quality, optimize your home network setup, and troubleshoot any connectivity issues with your JioFiber connection.
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