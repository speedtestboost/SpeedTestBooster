import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { 
  Wifi, 
  Globe, 
  Zap, 
  Monitor, 
  Smartphone, 
  Router, 
  Signal,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";
import { Link } from "wouter";

function SpeedTestGuide() {
  useEffect(() => {
    // Comprehensive SEO optimization for speed test guide keywords
    document.title = "Complete Speed Test Guide 2025 - How to Test Internet Speed & WiFi Speed Test Tutorial";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete guide to internet speed tests and WiFi speed tests. Learn how to test internet speed accurately, understand results, troubleshoot slow speeds, and optimize your connection for 2025.');
    }
    
    // High-volume educational keywords targeting
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    
    const guideKeywords = [
      // Primary educational keywords (high volume)
      'speed test guide', 'how to test internet speed', 'wifi speed test guide', 'internet speed test tutorial',
      'speed test help', 'internet speed test explained', 'how to check internet speed', 'speed test instructions',
      
      // Problem-solving keywords (high intent)
      'slow internet speed fix', 'improve internet speed', 'wifi speed troubleshooting', 'internet speed problems',
      'why is my internet slow', 'how to make internet faster', 'speed test results explained', 'internet speed requirements',
      
      // Technical guide keywords
      'understanding speed test results', 'download vs upload speed', 'ping and jitter explained', 'bandwidth vs speed',
      'internet speed measurement', 'network performance testing', 'speed test accuracy tips', 'best time to test speed',
      
      // Device-specific guide keywords
      'speed test on phone', 'speed test on laptop', 'speed test on tablet', 'smart tv speed test',
      'gaming console speed test', 'router speed test', 'ethernet vs wifi speed', 'mobile speed test guide',
      
      // ISP and technology guide keywords
      'fiber speed test guide', 'cable internet speed test', 'dsl speed test guide', '5g speed test tutorial',
      'satellite internet speed test', 'wifi 6 speed test guide', 'mesh network speed test', 'powerline speed test',
      
      // Comparison and analysis keywords
      'speed test comparison', 'best speed test sites', 'accurate speed test methods', 'speed test reliability',
      'free vs paid speed tests', 'speed test vs actual usage', 'multiple speed test comparison', 'speed test variations',
      
      // Advanced technical keywords
      'network latency testing', 'bandwidth monitoring', 'throughput measurement', 'network diagnostics guide',
      'quality of service testing', 'network congestion analysis', 'peak vs off-peak speeds', 'server location impact',
      
      // Long-tail educational keywords
      'how often should you test internet speed', 'what is a good internet speed test result',
      'why do speed tests show different results', 'how to prepare for accurate speed test',
      'what affects internet speed test results', 'how to interpret speed test data'
    ];
    
    keywords.setAttribute('content', guideKeywords.join(', '));
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Complete Speed Test Guide 2025 - How to Test Internet Speed & WiFi Speed Test Tutorial' },
      { property: 'og:description', content: 'Complete guide to internet speed tests and WiFi speed tests. Learn how to test internet speed accurately, understand results, and optimize your connection.' },
      { property: 'og:url', content: 'https://speedtestboost.com/speed-test-guide' },
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: 'Speed Test & Boost' }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/speed-test-guide';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/speed-test-guide" />

      {/* Hero Section */}
      <div className="gradient-bg py-12 px-4 border-b border-border/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Complete Speed Test Guide 2025
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">
            Master Internet Speed Testing & WiFi Speed Test Tutorial
          </p>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Learn how to test internet speed accurately, understand your results, troubleshoot slow connections, 
            and optimize your WiFi performance with our comprehensive speed test guide.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              <Zap className="mr-2 h-5 w-5" />
              Start Free Speed Test
            </Button>
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
        {/* Quick Start Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How to Test Internet Speed - Quick Start Guide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Close Apps</h3>
                <p className="text-sm text-muted-foreground">Close all background applications and streaming services for accurate WiFi speed test results.</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">2. Use One Device</h3>
                <p className="text-sm text-muted-foreground">Test on a single device for the most accurate internet speed test measurement.</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">3. Run Speed Test</h3>
                <p className="text-sm text-muted-foreground">Click start on our free speed test tool to measure download, upload, and ping speeds.</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">4. Analyze Results</h3>
                <p className="text-sm text-muted-foreground">Review your speed test results and compare with your internet plan specifications.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Understanding Speed Test Results */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Understanding Your Speed Test Results</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Download Speed Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Excellent (100+ Mbps)</h4>
                    <p className="text-sm text-muted-foreground">Perfect for 4K streaming, large downloads, multiple devices, and professional work.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Good (25-100 Mbps)</h4>
                    <p className="text-sm text-muted-foreground">Suitable for HD streaming, video calls, online gaming, and general internet usage.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">Average (5-25 Mbps)</h4>
                    <p className="text-sm text-muted-foreground">Adequate for basic streaming, web browsing, and light online activities.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Slow (Under 5 Mbps)</h4>
                    <p className="text-sm text-muted-foreground">Limited to basic web browsing and email. Consider upgrading your internet plan.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Ping & Jitter Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Excellent Ping (0-20ms)</h4>
                    <p className="text-sm text-muted-foreground">Perfect for competitive gaming, real-time applications, and professional video conferencing.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Good Ping (20-50ms)</h4>
                    <p className="text-sm text-muted-foreground">Suitable for most online activities including casual gaming and video calls.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">Average Ping (50-100ms)</h4>
                    <p className="text-sm text-muted-foreground">Noticeable delays in gaming and real-time applications but acceptable for general use.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">High Ping (100ms+)</h4>
                    <p className="text-sm text-muted-foreground">Significant delays affecting gaming, video calls, and real-time applications.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Common Speed Test Problems */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Common Speed Test Problems & Solutions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Slow WiFi Speed Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  WiFi speeds significantly slower than your internet plan? Common causes and fixes:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Router placement too far from device</li>
                  <li>• WiFi interference from other devices</li>
                  <li>• Outdated router or WiFi standards</li>
                  <li>• Too many connected devices</li>
                  <li>• Network congestion during peak hours</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Signal className="h-5 w-5" />
                  Inconsistent Speed Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Getting different results each time you test? Here's why and how to fix it:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Test server location varies each time</li>
                  <li>• Network traffic fluctuations</li>
                  <li>• Background app activity</li>
                  <li>• Different time of day testing</li>
                  <li>• ISP throttling or traffic shaping</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Router className="h-5 w-5" />
                  Mobile vs Desktop Speed Differences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mobile showing slower speeds than desktop? Common reasons:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Mobile device WiFi capability limits</li>
                  <li>• Distance from router affects mobile more</li>
                  <li>• Background app synchronization</li>
                  <li>• Mobile browser limitations</li>
                  <li>• Data saver or battery optimization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Speed Test Best Practices */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Speed Test Best Practices for Accurate Results</h2>
          <Card className="card-hover">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Do These for Accurate Speed Tests
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✅ Use a wired Ethernet connection when possible</li>
                    <li>✅ Close all streaming services and downloads</li>
                    <li>✅ Test at different times of day</li>
                    <li>✅ Run multiple tests for average results</li>
                    <li>✅ Use the same server location for consistency</li>
                    <li>✅ Update your device and browser</li>
                    <li>✅ Position close to WiFi router if testing wirelessly</li>
                    <li>✅ Restart your router before testing</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Avoid These Speed Test Mistakes
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>❌ Testing with multiple devices connected</li>
                    <li>❌ Running background downloads or updates</li>
                    <li>❌ Testing during peak network hours only</li>
                    <li>❌ Using only one speed test result</li>
                    <li>❌ Testing from far away from router</li>
                    <li>❌ Using outdated devices or browsers</li>
                    <li>❌ Testing with VPN enabled</li>
                    <li>❌ Comparing different server locations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* When to Contact ISP */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">When to Contact Your Internet Service Provider</h2>
          <Card className="card-hover border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Contact Your ISP If You Experience:</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Speed Issues:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Consistently getting less than 80% of advertised speed</li>
                        <li>• Speed tests show major fluctuations throughout day</li>
                        <li>• Ethernet and WiFi both showing slow speeds</li>
                        <li>• Multiple speed tests confirm slow performance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Connection Issues:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Frequent internet disconnections</li>
                        <li>• High ping times (over 100ms consistently)</li>
                        <li>• Packet loss during speed tests</li>
                        <li>• Unable to complete speed tests due to timeouts</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-background/80 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Pro Tip:</strong> Document your speed test results over several days and times before contacting your ISP. 
                      Include screenshots and note the testing conditions. This data helps ISP support diagnose and resolve issues faster.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Tools */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related Speed Test Tools & Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  WiFi Analyzer Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced WiFi diagnostics to identify interference, optimize channels, and improve wireless performance.
                </p>
                <Link href="/wifi-analyzer">
                  <Button className="w-full">Launch WiFi Analyzer</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  AI Speed Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Calculate exact internet speed requirements for AI tools like ChatGPT, Claude, and Midjourney.
                </p>
                <Link href="/ai-speed-test">
                  <Button variant="outline" className="w-full">Check AI Requirements</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-secondary" />
                  Global Speed Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Test your speed with servers optimized for your country and region for the most accurate results.
                </p>
                <Link href="/internet-providers">
                  <Button variant="outline" className="w-full">View All Countries</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <GenericFooter />
    </div>
  );
}

export default SpeedTestGuide;
