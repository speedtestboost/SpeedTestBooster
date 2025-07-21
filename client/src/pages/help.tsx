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
  AlertCircle,
  Menu,
  X
} from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

export default function Help() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Help & FAQ - Speed Test & Boost | Internet Speed Test Guide";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get help with internet speed testing. FAQ, troubleshooting guide, and tips to improve your connection speed. Learn about download speed, upload speed, ping, and jitter.');
    }
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/help';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 min-h-[400px] flex items-center">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" stroke="url(#speedGradient)" strokeWidth="6" fill="none" className="animate-spin" style={{animationDuration: '8s'}} />
                    <path d="M50 20 L55 30 L45 30 Z" fill="url(#speedGradient)" className="animate-pulse" />
                    <circle cx="50" cy="50" r="4" fill="url(#speedGradient)" className="animate-pulse" />
                    <path d="M20 50 Q30 40 40 50" stroke="url(#speedGradient)" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                    <path d="M60 50 Q70 40 80 50" stroke="url(#speedGradient)" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '1s'}} />
                    <path d="M50 60 Q60 70 50 80" stroke="url(#speedGradient)" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '1.5s'}} />
                  </svg>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Speed Test & Boost
                </div>
              </Link>
              <div className="flex items-center space-x-4">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6">
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Speed Test
                  </Link>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link href="/help" className="text-primary font-medium">
                    Help
                  </Link>
                </div>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            {showMobileMenu && (
              <div className="lg:hidden mt-4 pt-4 border-t border-border/30">
                <div className="flex flex-col space-y-3">
                  <Link 
                    href="/" 
                    className="text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Speed Test
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/help" 
                    className="text-primary font-medium py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Help
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
              Help & Support
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Speed Test Help Center
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about internet speed testing, troubleshooting connection issues, 
            and optimizing your network performance.
          </p>
        </div>
      </header>

      {/* Quick Start Guide */}
      <section className="py-20">
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
                <h3 className="text-lg font-semibold mb-3">View Results</h3>
                <p className="text-muted-foreground text-sm">
                  Review your download speed, upload speed, ping, and jitter results with detailed analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Understanding Results */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Understanding Your Results</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn what each metric means and how it affects your internet experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Download Speed</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Measures how fast you can receive data from the internet. This affects streaming, 
                  downloading files, and loading web pages.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium mb-2">Speed Requirements:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Web browsing: 1-5 Mbps</li>
                    <li>• HD video: 5-10 Mbps</li>
                    <li>• 4K video: 25+ Mbps</li>
                    <li>• Gaming: 3-6 Mbps</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary mr-3 rotate-180" />
                  <h3 className="text-xl font-semibold">Upload Speed</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Measures how fast you can send data to the internet. Important for video calls, 
                  uploading files, and live streaming.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium mb-2">Speed Requirements:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Video calls: 1-3 Mbps</li>
                    <li>• File uploads: 5-10 Mbps</li>
                    <li>• Live streaming: 3-10 Mbps</li>
                    <li>• Cloud backup: 10+ Mbps</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Ping (Latency)</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Measures the time it takes for data to travel from your device to a server and back. 
                  Lower ping is better for gaming and video calls.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium mb-2">Ping Categories:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Excellent: &lt;20ms</li>
                    <li>• Good: 20-50ms</li>
                    <li>• Average: 50-100ms</li>
                    <li>• Poor: &gt;100ms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Signal className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Jitter</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Measures the variation in ping times. Lower jitter means more stable connection, 
                  important for real-time applications.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium mb-2">Jitter Categories:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Excellent: &lt;10ms</li>
                    <li>• Good: 10-20ms</li>
                    <li>• Average: 20-50ms</li>
                    <li>• Poor: &gt;50ms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Common questions about internet speed testing and network performance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">How accurate is this speed test?</h4>
                      <p className="text-muted-foreground text-sm">
                        Our speed test uses multiple servers and advanced algorithms to provide highly accurate results. 
                        We test with real-world conditions and multiple data sizes for maximum accuracy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Why is my speed slower than advertised?</h4>
                      <p className="text-muted-foreground text-sm">
                        Internet speeds can vary due to network congestion, WiFi interference, device limitations, 
                        and distance from your router. Test at different times and locations for a complete picture.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Should I test on WiFi or ethernet?</h4>
                      <p className="text-muted-foreground text-sm">
                        For maximum accuracy, test with an ethernet cable connection. WiFi speeds can be affected 
                        by interference, distance, and device capabilities. Both tests provide valuable insights.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">How often should I test my speed?</h4>
                      <p className="text-muted-foreground text-sm">
                        Test periodically to monitor your connection quality. Test when experiencing issues, 
                        after network changes, or to verify your ISP is delivering promised speeds.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">What affects my internet speed?</h4>
                      <p className="text-muted-foreground text-sm">
                        Network congestion, WiFi interference, outdated equipment, background downloads, 
                        device limitations, and distance from your router can all impact speed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">How can I improve my speed?</h4>
                      <p className="text-muted-foreground text-sm">
                        Upgrade your internet plan, use wired connections, update your router, reduce interference, 
                        close unnecessary apps, and position your router centrally for optimal coverage.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Does this test use data?</h4>
                      <p className="text-muted-foreground text-sm">
                        Yes, speed tests consume data to measure your connection. A typical test uses 10-50 MB. 
                        Be mindful of data usage on mobile or metered connections.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Is this speed test free?</h4>
                      <p className="text-muted-foreground text-sm">
                        Yes, our speed test is completely free with no registration required. 
                        You can test as many times as you need without any limitations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Troubleshooting Guide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Common issues and solutions for improving your internet speed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-semibold">Slow Download Speed</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Close background apps and downloads</li>
                  <li>• Connect via ethernet cable</li>
                  <li>• Restart your modem and router</li>
                  <li>• Check for interference sources</li>
                  <li>• Update network drivers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-semibold">High Ping/Latency</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Switch to wired connection</li>
                  <li>• Close online games and streaming</li>
                  <li>• Choose closer servers</li>
                  <li>• Update router firmware</li>
                  <li>• Check for network congestion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-semibold">Connection Drops</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Check cable connections</li>
                  <li>• Update network equipment</li>
                  <li>• Reduce WiFi interference</li>
                  <li>• Contact your ISP</li>
                  <li>• Check for overheating</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Test Your Speed?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Put your knowledge to the test and see how your internet connection performs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gradient-bg text-white px-8 py-6">
                Start Speed Test
              </Button>
            </Link>
            <Link href="/about">
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