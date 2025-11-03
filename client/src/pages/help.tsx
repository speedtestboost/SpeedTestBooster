import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Wifi, 
  Monitor, 
  Smartphone, 
  Router, 
  Settings,
  TrendingUp,
  Clock,
  Signal,
  AlertCircle
} from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Help() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Help & FAQ - Speed Test & Boost | Internet Speed Test Guide";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get help with internet speed testing. FAQ, troubleshooting guide, and tips to improve your connection speed. Learn about download speed, upload speed, ping, and jitter.');
    }
    
    // Add canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://speedtestboost.com/help';
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
      <Header currentPath="/help" />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Help & FAQ", href: "/help" }]} />
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <HelpCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Speed Test Help Center
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about internet speed testing, troubleshooting connection issues, 
              and optimizing your network performance.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Quick Start Guide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with speed testing in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Close Other Apps</h3>
                <p className="text-muted-foreground text-sm">
                  Close streaming services, downloads, and other bandwidth-heavy applications for accurate results.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Connect to WiFi</h3>
                <p className="text-muted-foreground text-sm">
                  Use a stable WiFi connection or ethernet cable for the most accurate speed measurements.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Run the Test</h3>
                <p className="text-muted-foreground text-sm">
                  Click "Start Speed Test" and wait for the test to complete. It takes about 10-15 seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Analyze Results</h3>
                <p className="text-muted-foreground text-sm">
                  Review your download, upload speeds, and ping to understand your connection performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Common questions about internet speed testing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Signal className="h-5 w-5 text-primary mr-2" />
                  What is a good internet speed?
                </h3>
                <p className="text-muted-foreground mb-4">
                  For most households, 25 Mbps download and 3 Mbps upload is sufficient for basic internet usage. 
                  For streaming 4K content, gaming, or working from home, you'll want 100+ Mbps download speeds.
                </p>
                <Badge variant="secondary">Internet Speed</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  Why is my internet slow?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Slow internet can be caused by network congestion, outdated equipment, too many connected devices, 
                  or interference. Try restarting your router or connecting via ethernet cable.
                </p>
                <Badge variant="secondary">Troubleshooting</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 text-primary mr-2" />
                  What affects my speed test results?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Your device, browser, network congestion, server distance, and background applications all affect 
                  speed test results. Test multiple times for more accurate readings.
                </p>
                <Badge variant="secondary">Accuracy</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Wifi className="h-5 w-5 text-primary mr-2" />
                  WiFi vs Ethernet speeds?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ethernet connections typically provide faster, more stable speeds than WiFi. 
                  WiFi speeds can vary based on distance from router, interference, and device capabilities.
                </p>
                <Badge variant="secondary">Connection Types</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Troubleshooting Guide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Common solutions for internet speed issues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Router className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Restart Your Router</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Unplug your router for 30 seconds, then plug it back in. This can resolve many connectivity issues 
                  and improve speeds.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/wifi-analyzer">Check WiFi Health</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Monitor className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Close Background Apps</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Streaming services, cloud backups, and downloads consume bandwidth. Close unnecessary applications 
                  before testing.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Reduce Connected Devices</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Too many devices sharing your connection can slow speeds. Disconnect unused devices or upgrade 
                  your internet plan.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/internet-speed-requirements">Speed Calculator</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Settings className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Update Router Firmware</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Outdated router firmware can cause slow speeds and security issues. Check for updates regularly.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Contact Your ISP</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  If speeds are consistently below your plan's advertised speeds, contact your internet service provider 
                  for assistance.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/internet-providers">Find Providers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Wifi className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-semibold">Optimize WiFi Placement</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Place your router in a central, elevated location away from walls and interference sources for 
                  better coverage.
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Test your speed now or explore our comprehensive guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">
                <Wifi className="mr-2 h-5 w-5" />
                Test Your Speed
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/wifi-analyzer">
                <Settings className="mr-2 h-5 w-5" />
                WiFi Analyzer
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <GenericFooter />
    </div>
  );
}