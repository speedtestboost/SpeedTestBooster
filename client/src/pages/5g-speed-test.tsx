import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { 
  Smartphone, 
  Wifi, 
  Zap, 
  TrendingUp, 
  Signal,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Antenna
} from "lucide-react";
import { Link } from "wouter";

function FiveGSpeedTest() {
  useEffect(() => {
    // SEO optimization for 5G speed test keywords (emerging high-value market)
    document.title = "5G Speed Test 2025 - Test Your 5G Internet Speed & Mobile Network Performance";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free 5G speed test to check your 5G internet speed, mobile network performance, and compare 5G vs 4G speeds. Test 5G connectivity with accurate results for all carriers.');
    }
    
    // 5G speed test keywords (high growth opportunity)
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    
    const fiveGKeywords = [
      // Primary 5G speed test keywords (emerging high-volume)
      '5g speed test', '5g internet speed test', 'test 5g speed', '5g network speed test',
      '5g wifi speed test', '5g broadband speed test', 'check 5g speed', '5g speed checker',
      'free 5g speed test', '5g speed test online', 'mobile 5g speed test', '5g connection test',
      
      // 5G vs other technology comparisons (high engagement)
      '5g vs 4g speed test', '5g vs wifi speed test', '5g vs fiber speed comparison',
      '5g vs cable internet speed', '5g vs broadband speed test', '4g lte vs 5g speed',
      
      // Carrier-specific 5G keywords (high commercial value)
      'verizon 5g speed test', 'att 5g speed test', 't-mobile 5g speed test',
      'sprint 5g speed test', 'rogers 5g speed test', 'bell 5g speed test',
      'telus 5g speed test', 'vodafone 5g speed test', 'ee 5g speed test',
      
      // 5G technology specific keywords
      '5g ultra wideband speed test', '5g millimeter wave speed test', '5g sub-6 speed test',
      '5g standalone speed test', '5g non-standalone speed test', '5g low band speed test',
      '5g mid band speed test', '5g high band speed test', 'mmwave 5g speed test',
      
      // Location-based 5G keywords
      '5g speed test near me', '5g coverage speed test', '5g network coverage test',
      '5g tower speed test', '5g signal strength test', '5g reception test',
      
      // Device-specific 5G keywords
      'iphone 5g speed test', 'android 5g speed test', 'samsung 5g speed test',
      'google pixel 5g speed test', '5g phone speed test', '5g tablet speed test',
      '5g hotspot speed test', '5g modem speed test', '5g router speed test',
      
      // 5G performance and quality keywords
      '5g latency test', '5g ping test', '5g jitter test', '5g packet loss test',
      '5g network quality test', '5g performance test', '5g stability test',
      '5g consistency test', '5g reliability test', '5g uptime test',
      
      // Problem-solving 5G keywords (high intent)
      'slow 5g speed', '5g not working', '5g speed issues', 'improve 5g speed',
      '5g troubleshooting', '5g optimization', '5g signal problems', '5g connectivity issues',
      
      // Geographic 5G keywords (local SEO)
      '5g speed test usa', '5g speed test canada', '5g speed test uk',
      '5g speed test australia', '5g speed test india', '5g speed test europe',
      
      // Advanced 5G technical keywords
      '5g network slicing test', '5g edge computing speed', '5g iot speed test',
      '5g enterprise speed test', '5g private network test', '5g mesh network test',
      
      // 5G use case specific keywords
      '5g gaming speed test', '5g streaming speed test', '5g video call test',
      '5g ar vr speed test', '5g cloud gaming test', '5g smart city test'
    ];
    
    keywords.setAttribute('content', fiveGKeywords.join(', '));
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: '5G Speed Test 2025 - Test Your 5G Internet Speed & Mobile Network Performance' },
      { property: 'og:description', content: 'Free 5G speed test to check your 5G internet speed, mobile network performance, and compare 5G vs 4G speeds. Test 5G connectivity with accurate results.' },
      { property: 'og:url', content: 'https://speedtestboost.com/5g-speed-test' },
      { property: 'og:type', content: 'website' },
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
    canonical.href = 'https://speedtestboost.com/5g-speed-test';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/5g-speed-test" />

      {/* Hero Section */}
      <div className="gradient-bg py-12 px-4 border-b border-border/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            5G Speed Test 2025
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">
            Test Your 5G Internet Speed & Mobile Network Performance
          </p>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Free 5G speed test to check your 5G internet speed, compare 5G vs 4G performance, 
            and test mobile network quality with accurate real-time results.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              <Smartphone className="mr-2 h-5 w-5" />
              Start 5G Speed Test
            </Button>
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
        {/* 5G vs 4G Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">5G vs 4G Speed Test Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Radio className="h-6 w-6" />
                  5G Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Download Speed:</span>
                    <span className="text-lg font-bold text-primary">100-1000+ Mbps</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Upload Speed:</span>
                    <span className="text-lg font-bold text-primary">50-500+ Mbps</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Latency (Ping):</span>
                    <span className="text-lg font-bold text-primary">1-10ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Coverage:</span>
                    <span className="text-sm text-muted-foreground">Expanding rapidly</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-muted-foreground/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-muted-foreground">
                  <Signal className="h-6 w-6" />
                  4G LTE Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Download Speed:</span>
                    <span className="text-lg font-bold text-muted-foreground">10-50 Mbps</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Upload Speed:</span>
                    <span className="text-lg font-bold text-muted-foreground">5-25 Mbps</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Latency (Ping):</span>
                    <span className="text-lg font-bold text-muted-foreground">20-50ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Coverage:</span>
                    <span className="text-sm text-muted-foreground">Widespread</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5G Carrier Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">5G Speed Test by Carrier</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Antenna className="h-5 w-5 text-red-600" />
                  Verizon 5G Ultra Wideband
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Peak Speed:</strong> 4000+ Mbps</div>
                  <div><strong>Avg Speed:</strong> 200-400 Mbps</div>
                  <div><strong>Technology:</strong> mmWave + C-Band</div>
                  <div><strong>Coverage:</strong> Major cities + suburbs</div>
                  <Link href="/providers/us/verizon">
                    <Button variant="outline" size="sm" className="w-full mt-4">Test Verizon 5G</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Antenna className="h-5 w-5 text-blue-600" />
                  AT&T 5G+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Peak Speed:</strong> 2000+ Mbps</div>
                  <div><strong>Avg Speed:</strong> 150-300 Mbps</div>
                  <div><strong>Technology:</strong> mmWave + Mid-Band</div>
                  <div><strong>Coverage:</strong> Urban areas</div>
                  <Link href="/providers/us/att">
                    <Button variant="outline" size="sm" className="w-full mt-4">Test AT&T 5G</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Antenna className="h-5 w-5 text-pink-600" />
                  T-Mobile 5G UC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Peak Speed:</strong> 3000+ Mbps</div>
                  <div><strong>Avg Speed:</strong> 100-200 Mbps</div>
                  <div><strong>Technology:</strong> Mid-Band + mmWave</div>
                  <div><strong>Coverage:</strong> Nationwide</div>
                  <Button variant="outline" size="sm" className="w-full mt-4">Test T-Mobile 5G</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5G Speed Requirements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">5G Speed Requirements for Different Uses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Basic 5G Usage</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>50-100 Mbps</strong></div>
                  <div>Web browsing, email</div>
                  <div>Social media, messaging</div>
                  <div>Music streaming</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">5G Streaming</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>100-300 Mbps</strong></div>
                  <div>4K video streaming</div>
                  <div>Live streaming</div>
                  <div>Video calls</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">5G Gaming</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>300-500 Mbps</strong></div>
                  <div>Cloud gaming</div>
                  <div>Game downloads</div>
                  <div>Ultra-low latency gaming</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold mb-2">Enterprise 5G</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>500+ Mbps</strong></div>
                  <div>AR/VR applications</div>
                  <div>IoT and automation</div>
                  <div>Edge computing</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5G Troubleshooting Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">5G Speed Test Troubleshooting Guide</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Common 5G Speed Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Slow 5G Speeds</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Not connected to true 5G network</li>
                      <li>• Distance from 5G tower</li>
                      <li>• Network congestion</li>
                      <li>• Device not 5G compatible</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">5G Connection Drops</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Moving between coverage areas</li>
                      <li>• Building interference</li>
                      <li>• Weather conditions</li>
                      <li>• Carrier network issues</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  How to Improve 5G Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Optimize 5G Connection</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Enable 5G in device settings</li>
                      <li>• Update carrier settings</li>
                      <li>• Move closer to windows/outdoors</li>
                      <li>• Restart device regularly</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Check 5G Coverage</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use carrier coverage maps</li>
                      <li>• Test in different locations</li>
                      <li>• Compare carrier options</li>
                      <li>• Consider 5G signal boosters</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related Speed Test Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  WiFi Speed Test
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare your 5G mobile speed with WiFi performance to see which connection is faster.
                </p>
                <Link href="/">
                  <Button className="w-full">Test WiFi Speed</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Ping Test Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Test 5G network latency and ping times for gaming and real-time applications.
                </p>
                <Link href="/ping-test">
                  <Button variant="outline" className="w-full">Test 5G Ping</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  Speed Test by Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Test 5G speeds in your specific city or region with location-optimized servers.
                </p>
                <Link href="/internet-providers">
                  <Button variant="outline" className="w-full">Test by Location</Button>
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

export default FiveGSpeedTest;
