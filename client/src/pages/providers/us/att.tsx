import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ATTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "AT&T Internet Speed Test - Test AT&T Fiber & DSL Speeds 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your AT&T internet speed for free. Check AT&T Fiber speeds up to 5 Gig and DSL performance across the US.');
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
        "description": "Major telecommunications provider offering fiber internet, DSL, and wireless services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Fiber Internet", "DSL", "Wireless", "TV"]
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
      <Header currentPath="/providers/us/att" />
      
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
              AT&T Internet Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">AT&T internet speed</span> for free. Check AT&T Fiber speeds up to 5 Gig and DSL performance nationwide.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test AT&T Speed Now
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
                <p className="text-2xl font-bold">15.9M+</p>
                <p className="text-sm text-muted-foreground">Internet subscribers</p>
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
                <p className="text-2xl font-bold">5 Gbps</p>
                <p className="text-sm text-muted-foreground">AT&T Fiber</p>
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
                <p className="text-2xl font-bold">21 States</p>
                <p className="text-sm text-muted-foreground">Fiber available</p>
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
                <p className="text-2xl font-bold">Fiber</p>
                <p className="text-sm text-muted-foreground">+ DSL legacy</p>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About AT&T Internet Services</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground mb-4">
                    AT&T is a major telecommunications provider serving over 15.9 million internet customers across the United States. 
                    The company offers high-speed fiber internet through AT&T Fiber with speeds up to 5 Gbps, plus legacy DSL 
                    services in rural and underserved areas.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">AT&T Internet Plans</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>AT&T Internet 300:</strong> 300 Mbps fiber for streaming and remote work</li>
                    <li><strong>AT&T Internet 500:</strong> 500 Mbps for multiple users and 4K streaming</li>
                    <li><strong>AT&T Internet 1000:</strong> Gigabit speeds for gaming and smart homes</li>
                    <li><strong>AT&T Internet 2000:</strong> 2 Gig speeds for power users</li>
                    <li><strong>AT&T Internet 5000:</strong> 5 Gig speeds for ultimate performance</li>
                    <li><strong>AT&T DSL:</strong> Up to 100 Mbps in areas without fiber</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Coverage Areas</h3>
                  <p className="text-muted-foreground mb-4">
                    AT&T Fiber is available in 21 states, primarily in the Southeast, Southwest, and Midwest. Major markets 
                    include Texas, California, Florida, Georgia, North Carolina, Tennessee, Louisiana, Alabama, South Carolina, 
                    Kentucky, Indiana, Arkansas, Kansas, Missouri, Nevada, Oklahoma, Mississippi, Illinois, Wisconsin, and Michigan.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Why Test Your AT&T Speed?</h3>
                  <p className="text-muted-foreground">
                    Regular speed testing ensures your AT&T internet connection performs as expected. Our AT&T speed test 
                    measures download speeds, upload speeds, and latency to help you troubleshoot issues, optimize your 
                    network setup, and verify you're receiving the speeds included in your plan.
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