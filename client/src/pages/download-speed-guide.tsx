import { useEffect, useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Download, Wifi, Clock, Monitor, Smartphone, Tv } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DownloadSpeedGuide() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Internet Download Speed Explained: Complete Guide 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete guide to internet download speeds. Learn what download speed you need, how to test it, and optimize your connection for streaming, gaming, and work.');
    }

    // Update canonical URL
    const canonical = document.createElement('link');

    canonical.rel = 'canonical';

    canonical.href = 'https://speedtestboost.com/download-speed-guide';

    document.head.appendChild(canonical);

    // Open Graph and Twitter meta tags
    const createOrUpdateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    const createOrUpdateTwitterMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    createOrUpdateMetaTag('og:title', 'Internet Download Speed Explained: Complete Guide 2025');
    createOrUpdateMetaTag('og:description', 'Complete guide to internet download speeds. Learn what download speed you need, how to test it, and optimize your connection.');
    createOrUpdateMetaTag('og:type', 'article');
    createOrUpdateMetaTag('og:url', 'https://speedtestboost.com/download-speed-guide');
    createOrUpdateMetaTag('og:image', 'https://speedtestboost.com/logo-option-5.svg');
    createOrUpdateTwitterMetaTag('twitter:card', 'summary_large_image');
    createOrUpdateTwitterMetaTag('twitter:title', 'Internet Download Speed Explained: Complete Guide 2025');
    createOrUpdateTwitterMetaTag('twitter:description', 'Complete guide to internet download speeds. Learn what download speed you need, how to test it, and optimize your connection.');
    createOrUpdateTwitterMetaTag('twitter:image', 'https://speedtestboost.com/logo-option-5.svg');

    // Structured data for article
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://speedtestboost.com/download-speed-guide#article",
          "headline": "Internet Download Speed Explained: Complete Guide 2025",
          "description": "Complete guide to internet download speeds. Learn what download speed you need, how to test it, and optimize your connection for streaming, gaming, and work.",
          "author": {
            "@type": "Organization",
            "name": "Speed Test & Boost"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Speed Test & Boost",
            "logo": {
              "@type": "ImageObject",
              "url": "https://speedtestboost.com/logo-option-5.svg"
            }
          },
          "datePublished": "2025-01-17",
          "dateModified": "2025-01-17",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://speedtestboost.com/download-speed-guide"
          },
          "articleSection": "Technology",
          "keywords": ["download speed", "internet speed", "broadband speed", "speed test", "bandwidth"]
        },
        {
          "@type": "FAQPage",
          "@id": "https://speedtestboost.com/download-speed-guide#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a good download speed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good download speed depends on your usage. For basic browsing: 5-10 Mbps, streaming HD: 25 Mbps, 4K streaming: 50+ Mbps, and heavy gaming or multiple users: 100+ Mbps."
              }
            },
            {
              "@type": "Question", 
              "name": "How do I test my download speed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use our free speed test tool above. Close other applications, connect via ethernet if possible, and run the test multiple times at different hours for accurate results."
              }
            },
            {
              "@type": "Question",
              "name": "Why is my download speed slow?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Slow download speeds can be caused by network congestion, WiFi interference, outdated equipment, background downloads, or ISP throttling during peak hours."
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'download-speed-guide-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
      
      const existingScript = document.querySelector('script#download-speed-guide-structured-data');
      if (existingScript) existingScript.remove();
      
      // Clean up meta tags
      const tagsToRemove = [
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:type"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]'
      ];
      
      tagsToRemove.forEach(selector => {
        const tag = document.querySelector(selector);
        if (tag) tag.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/download-speed-guide" />
      
      
      
      <main className="pt-24 pb-12">
        <Breadcrumbs 
          items={[
            { label: "Tools", href: "/" },
            { label: "Download Speed Guide", href: "/download-speed-guide" }
          ]} 
        />

        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Download className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Internet Download Speed Explained
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master everything about download speeds with our comprehensive guide. Learn what speeds you need, how to test them, and optimize your internet connection for peak performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                data-testid="button-test-download-speed"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Your Download Speed Now
              </Button>
            </div>
          </div>

          {/* Quick Summary */}
          <Card className="mb-8" data-testid="card-quick-summary">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">What is Download Speed?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Download speed measures how quickly your internet connection can retrieve data from servers on the internet to your device. 
                It's measured in megabits per second (Mbps) and determines how fast you can stream videos, download files, load web pages, 
                and enjoy online content.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Monitor className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">Basic Browsing</div>
                  <div className="text-sm text-muted-foreground">5-10 Mbps</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Tv className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">HD Streaming</div>
                  <div className="text-sm text-muted-foreground">25+ Mbps</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Wifi className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">Multiple Devices</div>
                  <div className="text-sm text-muted-foreground">100+ Mbps</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Download Speed Requirements */}
          <Card className="mb-8" data-testid="card-speed-requirements">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Download Speed Requirements by Activity</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-semibold mb-2">Web Browsing and Email (1-5 Mbps)</h3>
                  <p className="text-muted-foreground">
                    Basic internet activities like checking email, browsing websites, and social media require minimal download speeds. 
                    Even older broadband connections can handle these tasks comfortably. However, image-heavy websites and news portals 
                    load faster with higher speeds.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-semibold mb-2">Standard Definition Video Streaming (3-8 Mbps)</h3>
                  <p className="text-muted-foreground">
                    Platforms like YouTube, Netflix, and Hulu in standard definition require consistent speeds of 3-8 Mbps. 
                    While buffering might occur occasionally at lower speeds, maintaining this range ensures smooth playback 
                    without interruptions or quality drops.
                  </p>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-xl font-semibold mb-2">High Definition Streaming (15-25 Mbps)</h3>
                  <p className="text-muted-foreground">
                    HD content from streaming services demands higher bandwidth. Netflix recommends 15 Mbps for HD quality, 
                    while 25 Mbps provides buffer room for consistent performance. Multiple HD streams require proportionally 
                    more bandwidth per concurrent viewer.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-semibold mb-2">4K Ultra HD Streaming (50+ Mbps)</h3>
                  <p className="text-muted-foreground">
                    Ultra-high-definition content requires substantial download speeds. Netflix 4K content needs 25-50 Mbps, 
                    while other platforms may require even more. Consider that 4K streaming consumes significantly more data 
                    and benefits from fiber-optic connections for optimal performance.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-semibold mb-2">Online Gaming (3-25 Mbps)</h3>
                  <p className="text-muted-foreground">
                    While gaming doesn't require enormous download speeds, consistent performance matters more than peak speed. 
                    Most games work well with 3-6 Mbps, but downloading large game files or updates benefits from higher speeds. 
                    Low latency is often more critical than raw download speed for competitive gaming.
                  </p>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-xl font-semibold mb-2">Large File Downloads (50+ Mbps)</h3>
                  <p className="text-muted-foreground">
                    Downloading software, games, movies, or work files benefits significantly from higher speeds. 
                    A 50 GB game download takes about 2 hours at 50 Mbps versus 8 hours at 15 Mbps. 
                    Professional workflows often require 100+ Mbps for efficient file transfers.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Your total household needs equal the sum of all simultaneous activities. If two people stream HD while another 
                  person games, you need roughly 60-70 Mbps for optimal performance without congestion.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Factors Affecting Download Speed */}
          <Card className="mb-8" data-testid="card-speed-factors">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">What Affects Your Download Speed?</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Network Infrastructure</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Fiber Optic:</strong> Fastest and most reliable connection type</li>
                    <li>• <strong>Cable Internet:</strong> Good speeds but shared neighborhood bandwidth</li>
                    <li>• <strong>DSL:</strong> Speed decreases with distance from provider</li>
                    <li>• <strong>Satellite:</strong> Higher latency but improving with new technology</li>
                    <li>• <strong>5G/LTE:</strong> Variable speeds based on tower proximity and congestion</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Environmental Factors</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Network Congestion:</strong> Peak usage times slow speeds</li>
                    <li>• <strong>WiFi Interference:</strong> Other devices and networks compete</li>
                    <li>• <strong>Distance:</strong> Further from router/tower reduces performance</li>
                    <li>• <strong>Weather:</strong> Affects satellite and some wireless connections</li>
                    <li>• <strong>Hardware Age:</strong> Older modems/routers limit maximum speeds</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold mb-2">🔧 Quick Fix</h4>
                <p className="text-sm text-muted-foreground">
                  Test your speed with ethernet connection first. If WiFi speeds are significantly lower, 
                  your wireless setup needs optimization rather than a service upgrade.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How to Test Download Speed */}
          <Card className="mb-8" data-testid="card-testing-guide">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">How to Accurately Test Your Download Speed</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Pre-Test Preparation</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Close all unnecessary applications and browser tabs</li>
                    <li>Pause any active downloads, updates, or cloud syncing</li>
                    <li>Disconnect other devices from your network temporarily</li>
                    <li>Use an ethernet cable for the most accurate results</li>
                    <li>Test at different times of day to identify peak congestion</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Understanding Test Results</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <Clock className="h-8 w-8 mb-2 text-primary" />
                      <h4 className="font-semibold">Ping (Latency)</h4>
                      <p className="text-sm text-muted-foreground">
                        Response time measured in milliseconds. Lower is better for gaming and video calls.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Download className="h-8 w-8 mb-2 text-accent" />
                      <h4 className="font-semibold">Download Speed</h4>
                      <p className="text-sm text-muted-foreground">
                        How fast data comes to your device. Primary factor for streaming and browsing.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Wifi className="h-8 w-8 mb-2 text-secondary" />
                      <h4 className="font-semibold">Jitter</h4>
                      <p className="text-sm text-muted-foreground">
                        Consistency of connection. Low jitter means stable performance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3">Ready to Test Your Connection?</h4>
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-primary hover:bg-primary/90"
                    data-testid="button-test-speed-middle"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Run Speed Test Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Improving Download Speed */}
          <Card className="mb-8" data-testid="card-speed-optimization">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">How to Improve Your Download Speed</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Immediate Solutions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Router Optimization</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Restart your modem and router</li>
                        <li>• Position router centrally and elevated</li>
                        <li>• Switch to 5GHz WiFi band if available</li>
                        <li>• Update router firmware regularly</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Network Management</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Limit background applications</li>
                        <li>• Schedule large downloads during off-peak hours</li>
                        <li>• Use Quality of Service (QoS) settings</li>
                        <li>• Clear browser cache and cookies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Advanced Optimization</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold">Hardware Upgrades</h4>
                      <p className="text-muted-foreground text-sm">
                        Upgrade to a modern router supporting WiFi 6, ensure your devices have current network drivers, 
                        and consider mesh networking for large homes.
                      </p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold">Internet Plan Evaluation</h4>
                      <p className="text-muted-foreground text-sm">
                        Analyze your actual usage patterns and upgrade your plan if current speeds consistently fall 
                        short of your needs during normal usage.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-secondary/10 rounded-lg">
                  <h4 className="font-semibold mb-2">🚀 Boost Your WiFi Performance</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our WiFi optimization tool can help identify and fix common issues affecting your wireless speeds.
                  </p>
                  <Link href="/wifi-analyzer" className="text-sm text-primary hover:underline">
                    Try WiFi Optimizer Tool →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-8" data-testid="card-faq-section">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">What is a good download speed for my home?</h3>
                  <p className="text-muted-foreground">
                    A good download speed depends on your household size and usage. For 1-2 people with basic needs: 25-50 Mbps. 
                    For families with multiple devices and streaming: 100-200 Mbps. For power users or large households: 300+ Mbps.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">Why is my download speed slower than advertised?</h3>
                  <p className="text-muted-foreground">
                    Advertised speeds represent maximum theoretical speeds under ideal conditions. Real-world factors like network 
                    congestion, WiFi interference, device limitations, and testing methodology affect actual speeds. 
                    Expect 70-90% of advertised speeds during normal usage.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">Should I test download speed on WiFi or ethernet?</h3>
                  <p className="text-muted-foreground">
                    Test both to understand your complete network performance. Ethernet testing shows your maximum connection 
                    potential, while WiFi testing reflects real-world wireless performance. Significant differences indicate 
                    wireless optimization opportunities.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">How often should I test my download speed?</h3>
                  <p className="text-muted-foreground">
                    Test monthly to monitor consistency, and whenever you experience performance issues. Test at different 
                    times of day to identify peak congestion periods. After making network changes or upgrading equipment, 
                    test to verify improvements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">What's the difference between Mbps and MBps?</h3>
                  <p className="text-muted-foreground">
                    Mbps (megabits per second) measures internet speed, while MBps (megabytes per second) measures file transfer rates. 
                    Since 1 byte = 8 bits, divide Mbps by 8 to get MBps. A 100 Mbps connection theoretically downloads at 12.5 MBps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card data-testid="card-related-articles">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Related Speed Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/upload-speed-guide" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Upload Speed Explained</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about upload speeds, why they matter, and how to optimize them for video calls and file sharing.
                  </p>
                </Link>
                <Link href="/wifi-speed-optimization" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">WiFi Speed Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover how to maximize your WiFi performance with our optimization tools and expert tips.
                  </p>
                </Link>
              </div>
              <div className="mt-6 text-center">
                <Link href="/internet-speed-requirements" className="text-primary hover:underline">
                  View All Speed Requirements →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}

      <GenericFooter />
    </div>
  );
}
