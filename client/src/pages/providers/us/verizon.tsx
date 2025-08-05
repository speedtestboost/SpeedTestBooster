import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Clock, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function VerizonSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Verizon Internet Speed Test - Test Verizon Fios & 5G Home Internet 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Verizon internet speed for free. Check Verizon Fios fiber speeds up to 2 Gig, 5G Home Internet, and LTE plans. Compare download/upload speeds, ping, and jitter. Nationwide coverage across the US.');
    }

    // Add meta keywords
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'verizon speed test, verizon fios speed test, verizon 5g home internet speed test, verizon internet speed, fios fiber speed test, verizon broadband speed, verizon wifi test, verizon connection test, verizon download speed, verizon upload speed';
    document.head.appendChild(metaKeywords);

    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Verizon Internet Speed Test",
      "description": "Test your Verizon internet speed for free. Check Verizon Fios fiber speeds up to 2 Gig, 5G Home Internet, and LTE plans.",
      "url": `${window.location.origin}/providers/us/verizon`,
      "provider": {
        "@type": "Organization",
        "name": "Verizon",
        "description": "Leading telecommunications company providing fiber internet, 5G, and wireless services across the United States",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "serviceType": ["Fiber Internet", "5G Home Internet", "LTE", "Wireless"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.2",
          "reviewCount": "125000",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Internet Providers",
            "item": `${window.location.origin}/internet-providers`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "United States",
            "item": `${window.location.origin}/providers/us`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Verizon Speed Test",
            "item": `${window.location.origin}/providers/us/verizon`
          }
        ]
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
      name: "Fios Gigabit Connection",
      speed: "940/880 Mbps",
      price: "$49.99/month",
      type: "Fiber",
      features: ["No annual contract", "Free router included", "Unlimited data"]
    },
    {
      name: "Fios 2 Gig Connection",
      speed: "2300/2300 Mbps",
      price: "$79.99/month", 
      type: "Fiber",
      features: ["Symmetrical speeds", "Wi-Fi 6E router", "Priority tech support"]
    },
    {
      name: "5G Home Internet",
      speed: "300-1000 Mbps",
      price: "$25-70/month",
      type: "5G",
      features: ["No data caps", "Easy self-install", "Mobile + Home discounts"]
    },
    {
      name: "LTE Home Internet",
      speed: "25-50 Mbps",
      price: "$39.99/month",
      type: "LTE",
      features: ["Rural areas", "No data limits", "Quick setup"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/verizon" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Verizon Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Verizon internet speed</span> for free. Check Fios fiber speeds up to 2 Gig, 5G Home Internet performance, and LTE connection quality across the United States.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Verizon Speed Now
              </Button>
            </div>
          </div>

          {/* Provider Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-red-500" />
                  <span>Coverage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">118M+</p>
                <p className="text-sm text-muted-foreground">Americans covered</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  <span>Max Speed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2.3 Gbps</p>
                <p className="text-sm text-muted-foreground">Fios fiber plans</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Star className="h-4 w-4 text-red-500" />
                  <span>Rating</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">4.2/5</p>
                <p className="text-sm text-muted-foreground">Customer satisfaction</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-red-500" />
                  <span>Technology</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Fiber</p>
                <p className="text-sm text-muted-foreground">+ 5G nationwide</p>
              </CardContent>
            </Card>
          </div>

          {/* Plans Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Verizon Internet Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{plan.name}</span>
                      <Badge variant={plan.type === 'Fiber' ? 'default' : 'secondary'}>
                        {plan.type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-bold text-red-500">{plan.speed}</p>
                        <p className="text-sm text-muted-foreground">Download/Upload</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold">{plan.price}</p>
                        <p className="text-sm text-muted-foreground">Starting price</p>
                      </div>
                      <div className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
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

          {/* Coverage Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Verizon Coverage Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span>Fios Fiber</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Available in major metropolitan areas across 9 states
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>• New York, New Jersey, Pennsylvania</p>
                    <p>• Virginia, Maryland, Delaware</p>
                    <p>• Massachusetts, Rhode Island, Connecticut</p>
                    <p>• Washington DC metro area</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span>5G Home Internet</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Expanding 5G coverage in 70+ cities nationwide
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>• Los Angeles, Chicago, Houston</p>
                    <p>• Phoenix, Philadelphia, San Antonio</p>
                    <p>• San Diego, Dallas, San Jose</p>
                    <p>• Austin, Jacksonville, Fort Worth</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span>LTE Home Internet</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Rural and underserved areas across the United States
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>• Rural communities nationwide</p>
                    <p>• Areas without cable/fiber access</p>
                    <p>• Small towns and countryside</p>
                    <p>• Backup internet solution</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            <h2>About Verizon Internet Services</h2>
            <p>
              Verizon is one of the largest telecommunications companies in the United States, offering high-speed internet through multiple technologies including fiber-optic Fios, 5G Home Internet, and LTE services. Known for reliable connectivity and fast speeds, Verizon serves over 118 million Americans across urban, suburban, and rural areas.
            </p>
            
            <h3>Verizon Fios Fiber Internet</h3>
            <p>
              Verizon Fios delivers symmetrical fiber-optic internet with speeds up to 2.3 Gbps. Available in select metropolitan areas, Fios provides consistent performance for streaming, gaming, remote work, and smart home applications. Plans include unlimited data, free router rental, and no annual contracts.
            </p>
            
            <h3>5G Home Internet Technology</h3>
            <p>
              Verizon's 5G Home Internet uses ultra-wideband 5G technology to deliver wireless broadband with speeds ranging from 300 Mbps to 1 Gig. This service provides an alternative to traditional cable and DSL in areas with 5G coverage, offering easy installation and competitive pricing.
            </p>
            
            <h3>Why Test Your Verizon Speed?</h3>
            <p>
              Regular speed testing helps ensure you're receiving the internet speeds you're paying for. Our Verizon speed test measures download speed, upload speed, ping latency, and connection stability. Use these results to optimize your network setup, troubleshoot connectivity issues, or compare actual performance against your plan specifications.
            </p>
            
            <h3>Optimizing Verizon Internet Performance</h3>
            <p>
              To maximize your Verizon internet speed: use a Verizon-compatible router, position your router centrally, reduce interference from other devices, update firmware regularly, and connect high-bandwidth devices via ethernet when possible. For Fios customers, the included router is optimized for the network and provides the best performance.
            </p>
          </div>
        </div>
      </main>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}