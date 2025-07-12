import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Wifi, Globe, Shield, Zap, Users } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "About Speed Test & Boost - Professional Internet Speed Testing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Speed Test & Boost, the professional internet speed testing tool. Accurate bandwidth measurement, network diagnostics, and WiFi optimization for all devices.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <nav className="border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Speed Test & Boost
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Speed Test
              </Link>
              <Link href="/about" className="text-primary font-medium">
                About
              </Link>
              <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Professional Network Diagnostics
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                About Speed Test & Boost
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The most accurate and comprehensive internet speed testing platform. 
              Measure your connection speed, diagnose network issues, and optimize your internet performance.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Speed Test & Boost?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade speed testing with advanced features for accurate network diagnostics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast Testing</h3>
                <p className="text-muted-foreground">
                  Get accurate speed test results in seconds with our optimized testing algorithm. 
                  No waiting around for slow, outdated tests.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Highly Accurate</h3>
                <p className="text-muted-foreground">
                  Real-world speed measurements using multiple test servers and advanced algorithms. 
                  Get results that match your actual internet performance.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
                <p className="text-muted-foreground">
                  Test your connection speed from anywhere in the world with our global network 
                  of test servers and edge locations.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your privacy is our priority. We don't store personal data or track your browsing. 
                  All tests are anonymous and secure.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Wifi className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">WiFi Optimization</h3>
                <p className="text-muted-foreground">
                  Advanced network optimization tools to improve your WiFi performance and 
                  reduce connection issues.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">All Devices</h3>
                <p className="text-muted-foreground">
                  Works perfectly on desktop, mobile, and tablet. Test your internet speed 
                  from any device with our responsive design.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How Speed Test & Boost Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced testing methodology ensures accurate and reliable results every time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Initialize Connection</h3>
              <p className="text-muted-foreground">
                We establish secure connections to our global test servers and detect your network configuration 
                including IP address, ISP, and connection type.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Multi-Phase Testing</h3>
              <p className="text-muted-foreground">
                Our algorithm measures ping latency, download speed, upload speed, and jitter using 
                multiple concurrent connections for maximum accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Results & Analysis</h3>
              <p className="text-muted-foreground">
                Get detailed results with recommendations for improving your connection speed and 
                network performance optimization tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Advanced Testing Technology
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Speed Test & Boost uses cutting-edge technology to provide the most accurate 
                internet speed measurements available.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">Multiple Test Servers</h4>
                    <p className="text-muted-foreground">
                      Global network of test servers ensures accurate measurements regardless of your location
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">Real-Time Analysis</h4>
                    <p className="text-muted-foreground">
                      Advanced algorithms analyze your connection in real-time for immediate results
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">Comprehensive Metrics</h4>
                    <p className="text-muted-foreground">
                      Measure download/upload speeds, ping, jitter, and connection stability
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pl-8">
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Speed Test Accuracy</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">99.9%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">&lt;10s</div>
                      <div className="text-sm text-muted-foreground">Test Time</div>
                    </div>
                  </div>
                  
                  <Link href="/" className="w-full">
                    <Button className="w-full gradient-bg text-white">
                      Test Your Speed Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Test Your Internet Speed?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get accurate speed test results in seconds. No signup required, completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gradient-bg text-white px-8 py-6">
                Start Speed Test
              </Button>
            </Link>
            <Link href="/help">
              <Button size="lg" variant="outline" className="px-8 py-6">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}