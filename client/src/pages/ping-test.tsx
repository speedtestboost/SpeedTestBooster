import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { trackEvent } from "@/lib/analytics";
import { Zap, Clock, Gauge, CheckCircle, XCircle, Wifi, Globe, Router, Smartphone } from "lucide-react";

export default function PingTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [pingResults, setPingResults] = useState<number[]>([]);
  const [averagePing, setAveragePing] = useState<number | null>(null);
  const [jitter, setJitter] = useState<number | null>(null);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const { toast } = useToast();

  // SEO Meta Tags for ping test page
  useEffect(() => {
    document.title = "Free Ping Test Tool - Check Network Latency & Connection Speed Online";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online ping test tool to check network latency, connection speed and internet responsiveness. Test ping to multiple servers instantly with detailed results and analysis.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'ping test, latency test, network ping test, ping speed test, check ping online, internet ping test, network latency check, ping tool online, connection test';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Free Ping Test Tool - Check Network Latency Online' },
      { property: 'og:description', content: 'Test your network latency with our free online ping test tool. Check connection speed and responsiveness to multiple servers worldwide.' },
      { property: 'og:url', content: 'https://speedtestboost.com/ping-test' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://speedtestboost.com/logo-option-5.svg' },
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
    
    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Free Ping Test Tool - Check Network Latency Online' },
      { name: 'twitter:description', content: 'Test your network latency with our free online ping test tool. Check connection speed and responsiveness instantly.' },
      { name: 'twitter:image', content: 'https://speedtestboost.com/logo-option-5.svg' }
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement;
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.name = tag.name;
        document.head.appendChild(twitterTag);
      }
      twitterTag.content = tag.content;
    });
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/ping-test';
    
    // Structured Data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free Ping Test Tool",
      "description": "Professional ping test tool to measure network latency, connection speed and internet responsiveness. Test ping to multiple servers worldwide with instant results.",
      "url": "https://speedtestboost.com/ping-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Network latency testing",
        "Ping speed measurement",
        "Multiple server testing",
        "Jitter calculation",
        "Real-time results",
        "Connection quality analysis"
      ],
      "provider": {
        "@type": "Organization",
        "name": "Speed Test & Boost",
        "url": "https://speedtestboost.com"
      }
    });

    // Cleanup function
    return () => {
      // Clean up meta tags
      const cleanupSelectors = [
        'meta[name="keywords"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]', 
        'meta[property="og:url"]',
        'meta[property="og:type"]',
        'meta[property="og:image"]',
        'meta[property="og:site_name"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]',
        'script[type="application/ld+json"]'
      ];
      
      cleanupSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element && element.textContent !== '{}') {
          element.remove();
        }
      });
    };
  }, []);

  const performPingTest = async () => {
    if (isTestRunning) return;

    setIsTestRunning(true);
    setTestProgress(0);
    setTestStatus("Initializing ping test...");
    setPingResults([]);
    setAveragePing(null);
    setJitter(null);

    // Track ping test start
    trackEvent('ping_test_started', 'ping_test', 'ping_page');

    try {
      const testServers = [
        'https://www.google.com/favicon.ico',
        'https://www.cloudflare.com/favicon.ico', 
        'https://www.microsoft.com/favicon.ico',
        'https://aws.amazon.com/favicon.ico',
        'https://www.github.com/favicon.ico'
      ];

      const results: number[] = [];
      const totalTests = testServers.length * 2; // 2 pings per server
      let completed = 0;

      for (let server of testServers) {
        for (let attempt = 0; attempt < 2; attempt++) {
          setTestStatus(`Testing server ${testServers.indexOf(server) + 1}/${testServers.length} (attempt ${attempt + 1}/2)...`);
          
          try {
            const startTime = performance.now();
            const response = await fetch(server + '?t=' + Date.now(), { 
              mode: 'no-cors',
              cache: 'no-cache'
            });
            const endTime = performance.now();
            const pingTime = endTime - startTime;
            
            results.push(pingTime);
            setPingResults([...results]);
            
            completed++;
            setTestProgress((completed / totalTests) * 100);
            
            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.warn(`Ping to ${server} failed:`, error);
            completed++;
            setTestProgress((completed / totalTests) * 100);
          }
        }
      }

      if (results.length > 0) {
        const avgPing = results.reduce((a, b) => a + b, 0) / results.length;
        setAveragePing(avgPing);
        
        // Calculate jitter (standard deviation)
        const variance = results.reduce((sum, ping) => sum + Math.pow(ping - avgPing, 2), 0) / results.length;
        const calculatedJitter = Math.sqrt(variance);
        setJitter(calculatedJitter);
        
        setTestStatus("Ping test completed successfully!");
        
        // Track successful ping test
        trackEvent('ping_test_completed', 'ping_test', 'success');
        
        toast({
          title: "Ping test completed",
          description: `Average ping: ${avgPing.toFixed(1)}ms`,
        });
      } else {
        throw new Error("No successful ping measurements");
      }
    } catch (error) {
      console.error('Ping test error:', error);
      setTestStatus("Ping test failed. Please check your connection and try again.");
      trackEvent('ping_test_failed', 'ping_test', 'error');
      
      toast({
        title: "Ping test failed",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestRunning(false);
    }
  };

  const getPingQuality = (ping: number) => {
    if (ping < 20) return { text: "Excellent", color: "text-green-500", icon: CheckCircle };
    if (ping < 50) return { text: "Good", color: "text-blue-500", icon: CheckCircle };
    if (ping < 100) return { text: "Fair", color: "text-yellow-500", icon: Clock };
    return { text: "Poor", color: "text-red-500", icon: XCircle };
  };

  const quality = averagePing ? getPingQuality(averagePing) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/ping-test" />

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Free Ping Test Tool
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your network latency and connection responsiveness with our professional ping test tool. 
            Get instant results from multiple servers worldwide.
          </p>
        </div>

        {/* Ping Test Tool */}
        <Card className="card-hover">
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              
              <h2 className="text-2xl font-semibold text-foreground">Network Ping Test</h2>
              
              <Button
                onClick={performPingTest}
                disabled={isTestRunning}
                data-testid="button-start-ping-test"
                className="gradient-bg text-white px-12 py-6 text-xl font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                size="lg"
              >
                {isTestRunning ? "Testing..." : "Start Ping Test"}
              </Button>

              {isTestRunning && (
                <div className="bg-muted/30 rounded-xl p-6 border border-border/50" data-testid="progress-ping">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Test Progress</span>
                    <span data-testid="progress-percentage">{testProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 mb-3">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-300"
                      style={{ width: `${testProgress}%` }}
                      data-testid="progress-bar"
                    />
                  </div>
                  <div className="text-sm text-foreground" data-testid="status-ping">
                    {testStatus}
                  </div>
                </div>
              )}

              {/* Results */}
              {averagePing && quality && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6" data-testid="ping-results">
                  <Card className="bg-muted/30 border-border/50" data-testid="card-avg-ping">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Average Ping</div>
                      <div className="text-2xl font-bold text-foreground" data-testid="text-avg-ping">
                        {averagePing.toFixed(1)}ms
                      </div>
                      <div className={`text-sm ${quality.color} flex items-center justify-center mt-1`} data-testid="text-ping-quality">
                        <quality.icon className="h-4 w-4 mr-1" />
                        {quality.text}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30 border-border/50" data-testid="card-jitter">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Jitter</div>
                      <div className="text-2xl font-bold text-foreground" data-testid="text-jitter">
                        {jitter?.toFixed(1)}ms
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Stability</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30 border-border/50" data-testid="card-test-count">
                    <CardContent className="p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Tests</div>
                      <div className="text-2xl font-bold text-foreground" data-testid="text-test-count">
                        {pingResults.length}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Completed</div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Educational Content */}
        <div className="space-y-8">
          <Separator />
          
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">Understanding Ping Test and Network Latency</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                A ping test is one of the most fundamental network diagnostic tools used to measure the round-trip time 
                for data packets to travel from your device to a server and back. This measurement, expressed in milliseconds (ms), 
                is crucial for understanding your network's responsiveness and overall performance quality.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">What is Ping?</h3>
                  </div>
                  <p className="text-sm">
                    Ping measures the time it takes for a small data packet to travel from your device to a destination 
                    server and return. Lower ping times indicate faster, more responsive connections.
                  </p>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center mb-4">
                    <Gauge className="h-8 w-8 text-accent mr-3" />
                    <h3 className="text-xl font-semibold text-foreground">Why Test Ping?</h3>
                  </div>
                  <p className="text-sm">
                    Ping testing helps diagnose network issues, optimize online gaming performance, troubleshoot 
                    video calls, and ensure smooth real-time applications.
                  </p>
                </Card>
              </div>

              <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">How Ping Testing Works</h3>
              
              <p>
                When you initiate a ping test, your device sends Internet Control Message Protocol (ICMP) packets 
                to the target server. The server immediately responds with an acknowledgment packet. Our ping test 
                tool measures the time elapsed between sending the request and receiving the response, providing 
                you with accurate latency measurements.
              </p>
              
              <p>
                Our professional ping test tool performs multiple measurements to different servers worldwide, 
                ensuring comprehensive network analysis. This multi-server approach provides a more accurate 
                picture of your overall network performance compared to single-point testing.
              </p>
              
              <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Understanding Ping Results</h3>
              
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Excellent (0-20ms)
                    </h4>
                    <p className="text-sm">
                      Outstanding for competitive gaming, video conferencing, and real-time applications. 
                      No noticeable delay in responsiveness.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                      Good (20-50ms)
                    </h4>
                    <p className="text-sm">
                      Suitable for most online activities including gaming, streaming, and video calls. 
                      Minimal impact on user experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                      Fair (50-100ms)
                    </h4>
                    <p className="text-sm">
                      Acceptable for web browsing and casual gaming. May notice slight delays in 
                      real-time applications and competitive gaming.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      Poor (100ms+)
                    </h4>
                    <p className="text-sm">
                      High latency affecting user experience. Noticeable delays in gaming, video calls, 
                      and real-time applications. Consider troubleshooting.
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Factors Affecting Ping Performance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                <Card className="p-4 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Distance</h4>
                  <p className="text-sm">
                    Physical distance to the server significantly impacts ping times. Closer servers generally provide lower latency.
                  </p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Router className="h-12 w-12 text-accent mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Network Equipment</h4>
                  <p className="text-sm">
                    Quality of routers, switches, and network infrastructure affects data transmission speed and efficiency.
                  </p>
                </Card>
                
                <Card className="p-4 text-center">
                  <Wifi className="h-12 w-12 text-secondary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">Connection Type</h4>
                  <p className="text-sm">
                    Fiber, cable, DSL, and wireless connections have different latency characteristics and performance profiles.
                  </p>
                </Card>
              </div>
              
              <p>
                Network congestion during peak hours can also significantly impact ping times. Internet Service Provider (ISP) 
                routing efficiency, server load, and the number of network hops between your device and the destination 
                all contribute to overall latency measurements.
              </p>
              
              <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Improving Your Ping Performance</h3>
              
              <p>
                Several strategies can help optimize your network latency and improve ping times. Using wired Ethernet 
                connections instead of WiFi typically reduces latency by eliminating wireless interference and providing 
                more stable data transmission. Ensuring your router firmware is updated and positioned optimally can 
                also make a significant difference.
              </p>
              
              <p>
                For gaming and real-time applications, consider connecting to servers geographically closer to your location. 
                Quality of Service (QoS) configuration on your router can prioritize time-sensitive traffic, reducing 
                latency for critical applications while managing bandwidth for other devices on your network.
              </p>
              
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50 mt-6">
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Smartphone className="h-5 w-5 text-primary mr-2" />
                  Professional Ping Testing Tips
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• Test at different times of day to identify network congestion patterns</li>
                  <li>• Compare results from multiple servers to get comprehensive network performance data</li>
                  <li>• Use both WiFi and wired connections to identify potential wireless issues</li>
                  <li>• Document ping results when troubleshooting network problems for ISP support</li>
                  <li>• Regular ping testing helps establish baseline performance metrics</li>
                </ul>
              </div>
              
              <p>
                Our free ping test tool provides professional-grade network analysis capabilities, helping you understand 
                and optimize your internet connection performance. Whether you're a gamer seeking competitive advantage, 
                a professional requiring reliable video conferencing, or simply want to ensure optimal network performance, 
                regular ping testing provides valuable insights into your connection quality and reliability.
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}