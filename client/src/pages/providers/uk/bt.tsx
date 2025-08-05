import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Clock, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function BTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "BT Internet Speed Test - Test BT Fibre Broadband & Superfast 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your BT internet speed for free. Check BT Fibre broadband speeds up to 900 Mbps, Superfast fibre, and ADSL connection performance. Test BT WiFi speed across the UK with accurate results.');
    }

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'bt speed test, bt fibre speed test, bt broadband speed test, bt superfast speed test, bt wifi speed test, bt internet speed, openreach fibre speed test, bt connection test, bt download speed, bt upload speed uk';
    document.head.appendChild(metaKeywords);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "BT Internet Speed Test",
      "description": "Test your BT internet speed for free. Check BT Fibre broadband speeds up to 900 Mbps and Superfast fibre performance.",
      "url": `${window.location.origin}/providers/uk/bt`,
      "provider": {
        "@type": "Organization",
        "name": "BT Group",
        "description": "Leading telecommunications company providing fibre broadband, mobile, and business services across the United Kingdom",
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "serviceType": ["Fibre Broadband", "Superfast Fibre", "ADSL", "Mobile"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "3.8",
          "reviewCount": "89000",
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
      name: "BT Fibre 2",
      speed: "67/20 Mbps",
      price: "£28.99/month",
      type: "Superfast",
      features: ["No setup costs", "BT Smart Hub 2", "Unlimited usage"]
    },
    {
      name: "BT Fibre Essential",
      speed: "36/10 Mbps",
      price: "£26.99/month", 
      type: "Fibre",
      features: ["Entry level fibre", "Basic router", "Fair usage policy"]
    },
    {
      name: "BT Full Fibre 100",
      speed: "150/30 Mbps",
      price: "£32.99/month",
      type: "Full Fibre",
      features: ["Faster uploads", "Future-proof", "Consistent speeds"]
    },
    {
      name: "BT Full Fibre 900",
      speed: "900/110 Mbps",
      price: "£39.99/month",
      type: "Ultrafast",
      features: ["Maximum speeds", "Premium support", "Wi-Fi guarantee"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/uk/bt" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-600/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 bg-clip-text text-transparent">
              BT Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-600">BT internet speed</span> for free. Check BT Fibre broadband speeds up to 900 Mbps, Superfast fibre performance, and ADSL connection quality across the UK.
            </p>
            
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test BT Speed Now
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Coverage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">29M+</p>
                <p className="text-sm text-muted-foreground">UK premises covered</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>Max Speed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">900 Mbps</p>
                <p className="text-sm text-muted-foreground">Full fibre plans</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Star className="h-4 w-4 text-blue-600" />
                  <span>Rating</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3.8/5</p>
                <p className="text-sm text-muted-foreground">Customer reviews</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Openreach</p>
                <p className="text-sm text-muted-foreground">UK's largest network</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">BT Broadband Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{plan.name}</span>
                      <Badge variant={plan.type === 'Ultrafast' ? 'default' : 'secondary'}>
                        {plan.type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{plan.speed}</p>
                        <p className="text-sm text-muted-foreground">Download/Upload</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold">{plan.price}</p>
                        <p className="text-sm text-muted-foreground">18-month contract</p>
                      </div>
                      <div className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
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
            <h2>About BT Internet Services</h2>
            <p>
              BT Group is the UK's largest telecommunications company, providing broadband internet services to over 29 million premises across the United Kingdom. Using the Openreach network infrastructure, BT offers a comprehensive range of internet packages from basic ADSL to ultrafast full fibre connections with speeds up to 900 Mbps.
            </p>
            
            <h3>BT Fibre and Superfast Broadband</h3>
            <p>
              BT's Superfast fibre broadband uses fibre-to-the-cabinet (FTTC) technology, delivering download speeds up to 67 Mbps. Available to over 95% of UK premises, Superfast broadband provides reliable performance for streaming, gaming, and working from home. The service includes unlimited usage and BT's Smart Hub 2 router with advanced Wi-Fi technology.
            </p>
            
            <h3>BT Full Fibre Technology</h3>
            <p>
              BT Full Fibre uses fibre-to-the-premises (FTTP) technology, delivering symmetrical speeds with consistent performance regardless of distance from the exchange. Available in expanding areas across the UK, Full Fibre plans offer speeds from 150 Mbps to 900 Mbps, ideal for bandwidth-intensive applications and multiple device households.
            </p>
            
            <h3>Why Test Your BT Speed?</h3>
            <p>
              Regular speed testing ensures your BT connection performs as expected. Our BT speed test measures download speed, upload speed, ping latency, and connection stability. Use results to optimize your home network, identify potential issues, or verify you're receiving the speeds included in your BT broadband package.
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