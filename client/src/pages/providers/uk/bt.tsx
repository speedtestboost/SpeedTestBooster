import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, MapPin, Star, TrendingUp, Users, Shield } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function BTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "BT Broadband Speed Test - Test BT Fibre & ADSL Internet UK 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your BT broadband speed for free. Check BT Fibre speeds up to 900 Mbps and ADSL performance across the UK.');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "BT Broadband Speed Test",
      "description": "Test your BT broadband speed for free. Check fibre speeds up to 900 Mbps and ADSL performance.",
      "url": `${window.location.origin}/providers/uk/bt`,
      "provider": {
        "@type": "Organization",
        "name": "BT",
        "description": "UK's largest broadband provider offering fibre and ADSL internet services nationwide",
        "areaServed": { "@type": "Country", "name": "United Kingdom" },
        "serviceType": ["Fibre Broadband", "ADSL", "Phone", "TV"]
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
      <Header currentPath="/providers/uk/bt" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              BT Broadband Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">BT broadband speed</span> for free. Check BT Fibre speeds up to 900 Mbps and ADSL performance across the UK.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test BT Speed Now
              </Button>
            </div>
          </div>

          {/* Provider Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span>Customers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">9.5M+</p>
                <p className="text-sm text-muted-foreground">UK broadband</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span>Max Speed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">900 Mbps</p>
                <p className="text-sm text-muted-foreground">Fibre 2</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-purple-500" />
                  <span>Coverage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-muted-foreground">UK premises</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span>Technology</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Fibre</p>
                <p className="text-sm text-muted-foreground">+ ADSL legacy</p>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About BT Broadband</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground mb-4">
                    BT is the UK's largest broadband provider, serving over 9.5 million customers with high-speed internet 
                    services. Operating the UK's largest fibre network, BT offers superfast and ultrafast broadband with 
                    speeds up to 900 Mbps, covering 95% of UK premises.
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-3">BT Broadband Plans</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>BT Broadband Essential:</strong> Standard ADSL up to 10 Mbps for basic usage</li>
                    <li><strong>BT Fibre Essential:</strong> Superfast fibre up to 36 Mbps for streaming</li>
                    <li><strong>BT Fibre 1:</strong> Up to 50 Mbps for multiple device households</li>
                    <li><strong>BT Fibre 2:</strong> Up to 67 Mbps for heavy usage and gaming</li>
                    <li><strong>BT Full Fibre 100:</strong> 150 Mbps ultrafast fibre for power users</li>
                    <li><strong>BT Full Fibre 500:</strong> 500 Mbps for ultimate performance</li>
                    <li><strong>BT Full Fibre 900:</strong> 900 Mbps fastest residential speeds</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 mt-6">Coverage Areas</h3>
                  <p className="text-muted-foreground mb-4">
                    BT broadband is available nationwide across England, Scotland, Wales, and Northern Ireland. The company's 
                    Openreach network covers 95% of UK premises with superfast broadband, while full fibre (FTTP) coverage 
                    continues expanding to major cities and towns across the country.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">Why Test Your BT Speed?</h3>
                  <p className="text-muted-foreground">
                    Testing your BT broadband speed helps ensure optimal performance and value for money. Our BT speed test 
                    measures download speeds, upload speeds, and ping latency to help identify connection issues, optimize 
                    your setup, and verify you're receiving the speeds promised in your BT broadband package.
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