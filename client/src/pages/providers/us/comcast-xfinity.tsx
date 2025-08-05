import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ComcastXfinitySpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Comcast Xfinity Speed Test - Test Xfinity Internet Speeds 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Comcast Xfinity internet speed for free. Check Xfinity cable internet speeds up to 1.2 Gig. Nationwide coverage across the US.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Comcast Xfinity Speed Test",
      "description": "Test your Comcast Xfinity internet speed for free. Check cable internet speeds up to 1.2 Gig.",
      "url": `${window.location.origin}/providers/us/comcast-xfinity`,
      "provider": {
        "@type": "Organization",
        "name": "Comcast Xfinity",
        "description": "Leading cable internet and TV provider serving millions across the United States",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "TV", "Phone", "Mobile"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/comcast-xfinity" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Comcast Xfinity Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Comcast Xfinity internet speed</span> for free. Check your cable internet performance with speeds up to 1.2 Gig nationwide.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Xfinity Speed Now
              </Button>
            </div>
          </div>

          {/* Provider Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>Customers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">32M+</p>
                <p className="text-sm text-muted-foreground">Nationwide</p>
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
                <p className="text-2xl font-bold">1.2 Gbps</p>
                <p className="text-sm text-muted-foreground">Gigabit Pro</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>Coverage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">39 States</p>
                <p className="text-sm text-muted-foreground">Nationwide</p>
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
                <p className="text-2xl font-bold">Cable</p>
                <p className="text-sm text-muted-foreground">DOCSIS 3.1</p>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About Comcast Xfinity Internet</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground mb-4">
                    Comcast Xfinity is the largest cable internet provider in the United States, serving over 32 million customers 
                    across 39 states. Known for reliable cable internet service with speeds up to 1.2 Gbps and comprehensive 
                    coverage in urban and suburban areas nationwide.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Xfinity Internet Plans</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Connect (75 Mbps):</strong> Basic plan for light internet usage and streaming</li>
                    <li><strong>Connect More (200 Mbps):</strong> Good for multiple devices and HD streaming</li>
                    <li><strong>Fast (400 Mbps):</strong> Ideal for gaming, 4K streaming, and smart homes</li>
                    <li><strong>Superfast (800 Mbps):</strong> Great for large households with heavy usage</li>
                    <li><strong>Gigabit (1000 Mbps):</strong> Ultra-fast speeds for power users</li>
                    <li><strong>Gigabit Pro (1200 Mbps):</strong> Fastest residential plan available</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Coverage Areas</h3>
                  <p className="text-muted-foreground mb-4">
                    Xfinity serves customers in major metropolitan areas and suburbs across 39 states, including California, 
                    Florida, Illinois, Pennsylvania, New Jersey, Georgia, Michigan, Washington, Massachusetts, and Maryland. 
                    The network covers over 111 million homes and businesses.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Why Test Your Xfinity Speed?</h3>
                  <p className="text-muted-foreground">
                    Testing your Xfinity internet speed helps verify you're getting the speeds you pay for and can identify 
                    potential network issues. Use our speed test to check download speeds, upload speeds, and ping latency. 
                    This helps optimize your connection for streaming, gaming, video calls, and general browsing.
                  </p>
                </div>
              </CardContent>
            </Card>
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