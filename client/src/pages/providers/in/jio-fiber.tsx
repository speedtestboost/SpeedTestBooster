import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function JioFiberSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Jio Fiber Speed Test - Test JioFiber Broadband Speeds India 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Jio Fiber speed for free. Check JioFiber broadband speeds up to 1 Gbps across India. Fast, reliable fiber internet.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Jio Fiber Speed Test",
      "description": "Test your Jio Fiber speed for free. Check JioFiber broadband speeds up to 1 Gbps.",
      "url": `${window.location.origin}/providers/in/jio-fiber`,
      "provider": {
        "@type": "Organization",
        "name": "Jio Fiber",
        "description": "Leading fiber broadband provider in India offering high-speed internet services",
        "areaServed": { "@type": "Country", "name": "India" },
        "serviceType": ["Fiber Internet", "Digital TV", "Voice Services"]
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
      <Header currentPath="/providers/in/jio-fiber" />
      
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
              Jio Fiber Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Jio Fiber speed</span> for free. Check JioFiber broadband speeds up to 1 Gbps across India.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Jio Fiber Speed Now
              </Button>
            </div>
          </div>

          {/* Provider Info Cards */}
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
                <p className="text-sm text-muted-foreground">Cities covered</p>
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
                <p className="text-sm text-muted-foreground">Fiber plans</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span>Plans</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹399+</p>
                <p className="text-sm text-muted-foreground">Starting price</p>
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
                <p className="text-sm text-muted-foreground">Fiber to Home</p>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About Jio Fiber Broadband</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground mb-4">
                    Jio Fiber is India's leading fiber broadband service, offering high-speed internet with symmetrical 
                    upload and download speeds up to 1 Gbps. Available in over 1600 cities across India, JioFiber provides 
                    reliable fiber-to-the-home (FTTH) connectivity with comprehensive digital entertainment packages.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">Jio Fiber Plans</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Bronze (30 Mbps):</strong> ₹399/month for basic internet and OTT apps</li>
                    <li><strong>Silver (100 Mbps):</strong> ₹699/month with premium OTT subscriptions</li>
                    <li><strong>Gold (150 Mbps):</strong> ₹999/month with unlimited calling</li>
                    <li><strong>Diamond (300 Mbps):</strong> ₹1499/month for heavy usage</li>
                    <li><strong>Platinum (500 Mbps):</strong> ₹2499/month for power users</li>
                    <li><strong>Titanium (1 Gbps):</strong> ₹8499/month ultra-high speed</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Coverage Areas</h3>
                  <p className="text-muted-foreground mb-4">
                    Jio Fiber is available in over 1600 cities across India, including major metros like Mumbai, Delhi, 
                    Bangalore, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, and expanding rapidly to Tier-2 and Tier-3 
                    cities. The service covers residential areas, apartments, and commercial establishments.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Why Test Your Jio Fiber Speed?</h3>
                  <p className="text-muted-foreground">
                    Testing your Jio Fiber connection helps ensure you're getting optimal performance from your broadband plan. 
                    Our speed test measures download speeds, upload speeds, and latency to help troubleshoot any connectivity 
                    issues and verify you're receiving the speeds promised in your JioFiber package.
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