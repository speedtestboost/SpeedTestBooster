import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Wifi, Globe, Shield, Zap, Users } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function About() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "About Speed Test & Boost - Professional Internet Speed Testing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Speed Test & Boost, the professional internet speed testing tool. Accurate bandwidth measurement, network diagnostics, and WiFi optimization for all devices.');
    }
    
    // Add canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://speedtestboost.com/about';
    document.head.appendChild(canonical);

    return () => {
      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/about" />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                About Speed Test & Boost
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your comprehensive internet speed testing solution, providing accurate measurements 
              and optimization tools for the best network performance.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe everyone deserves reliable, fast internet. Our mission is to provide the most accurate 
                and comprehensive internet speed testing tools, helping users understand their connection performance 
                and optimize their network experience.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're streaming, gaming, working from home, or just browsing, we help you get the most 
                out of your internet connection with professional-grade testing and optimization tools.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Accurate Testing
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Real-time Results
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Network Optimization
                </Badge>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl"></div>
              <Card className="relative bg-background/90 backdrop-blur-sm border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                      <div className="text-sm text-muted-foreground">Tests Performed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">150+</div>
                      <div className="text-sm text-muted-foreground">Countries Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">Available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced features designed for both casual users and network professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast Tests</h3>
                <p className="text-muted-foreground">
                  Get accurate speed measurements in under 15 seconds with our optimized testing infrastructure 
                  and global server network.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy Focused</h3>
                <p className="text-muted-foreground">
                  We don't store your personal data or IP address. All speed tests are anonymous and your 
                  privacy is our priority.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">WiFi Optimization</h3>
                <p className="text-muted-foreground">
                  Advanced WiFi analyzer and network diagnostics tools to help you optimize your wireless 
                  network performance.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
                <p className="text-muted-foreground">
                  Test servers in major cities worldwide ensure accurate measurements regardless of your 
                  location or internet provider.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Device Support</h3>
                <p className="text-muted-foreground">
                  Works perfectly on desktop, mobile, and tablet devices with responsive design and 
                  device-specific optimizations.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Detailed Analysis</h3>
                <p className="text-muted-foreground">
                  Comprehensive reports including download/upload speeds, ping, jitter, and network 
                  quality recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern web technologies for reliability and performance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Advanced Testing Infrastructure</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Real Network Measurements</h4>
                    <p className="text-muted-foreground text-sm">
                      Direct bandwidth testing using actual data transfer, not simulated results
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Multiple Test Servers</h4>
                    <p className="text-muted-foreground text-sm">
                      Global network of testing servers for accurate regional measurements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Concurrent Connections</h4>
                    <p className="text-muted-foreground text-sm">
                      Multi-threaded testing methodology for maximum bandwidth utilization
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Session Isolation</h4>
                    <p className="text-muted-foreground text-sm">
                      Unique session tracking for personalized test history and analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:text-center">
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="p-8">
                  <h4 className="text-lg font-semibold mb-6">Test Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span>Download Speed</span>
                      <Badge variant="outline">Mbps</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span>Upload Speed</span>
                      <Badge variant="outline">Mbps</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span>Ping Latency</span>
                      <Badge variant="outline">ms</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span>Jitter</span>
                      <Badge variant="outline">ms</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <span>Server Location</span>
                      <Badge variant="outline">Auto</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Test Your Speed?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions of users worldwide who trust Speed Test & Boost for accurate internet speed measurements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">
                <Zap className="mr-2 h-5 w-5" />
                Start Speed Test
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/help">
                <CheckCircle className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <GenericFooter />
    </div>
  );
}