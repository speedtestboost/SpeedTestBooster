import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { getSessionId } from "@/lib/sessionManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import SpeedGauge from "@/components/SpeedGauge";
import TestHistory from "@/components/TestHistory";
import NetworkInfo from "@/components/NetworkInfo";
import OptimizationModal from "@/components/OptimizationModal";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { performSpeedTest, type SpeedTestResult } from "@/lib/speedTest";
import { Play, Gauge, Wifi } from "lucide-react";
import { Link } from "wouter";

export default function HyderabadSpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    document.title = "Hyderabad Internet Speed Test - Free Cyberabad WiFi & Fiber Speed Checker | Speed Test & Boost";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your internet speed in Hyderabad (Cyberabad). Free speed test for Airtel, Jio Fiber, ACT Fibernet, and Railwire. Check WiFi, fiber speeds optimized for HITEC City, Gachibowli, and pharma industries.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'hyderabad internet speed test, cyberabad wifi speed test, hitec city speed test, gachibowli speed test, madhapur speed test, secunderabad speed test, airtel hyderabad fiber, jio fiber cyberabad, ACT fibernet hyderabad';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Hyderabad Internet Speed Test - Free Cyberabad WiFi & Fiber Speed Checker' },
      { property: 'og:description', content: 'Test your internet speed in Hyderabad (Cyberabad). Free speed test for Airtel, Jio Fiber, ACT Fibernet, and Railwire. Check WiFi, fiber speeds optimized for HITEC City and pharma industries.' },
      { property: 'og:url', content: 'https://speedtestboost.com/hyderabad-speed-test' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test & Boost' },
      { property: 'og:locale', content: 'en_IN' }
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
      { name: 'twitter:title', content: 'Hyderabad Internet Speed Test - Free Cyberabad WiFi & Fiber Speed Checker' },
      { name: 'twitter:description', content: 'Test your internet speed in Hyderabad Cyberabad. Free speed test for Airtel, Jio Fiber, ACT Fibernet optimized for HITEC City.' }
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
    canonical.href = 'https://speedtestboost.com/hyderabad-speed-test';
    
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
      "name": "Hyderabad Internet Speed Test",
      "description": "Free online internet speed test for Hyderabad Cyberabad with Airtel, Jio Fiber, ACT Fibernet, and Railwire ISP support",
      "url": "https://speedtestboost.com/hyderabad-speed-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "creator": {
        "@type": "Organization",
        "name": "Speed Test & Boost"
      },
      "audience": {
        "@type": "Audience",
        "geographicArea": {
          "@type": "City",
          "name": "Hyderabad",
          "alternateName": "Cyberabad",
          "containedInPlace": {
            "@type": "Country",
            "name": "India"
          }
        }
      }
    });
  }, []);

  const { data: networkInfo } = useQuery({ queryKey: ["/api/network-info"] });
  const { data: speedTests, isLoading: isLoadingHistory } = useQuery({ queryKey: ["/api/speed-tests"] });

  const saveSpeedTest = useMutation({
    mutationFn: async (result: SpeedTestResult) => {
      const sessionId = getSessionId();
      const response = await fetch("/api/speed-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Session-ID": sessionId },
        body: JSON.stringify(result),
      });
      if (!response.ok) throw new Error("Failed to save speed test");
      return response.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/speed-tests"] }); },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      const sessionId = getSessionId();
      const response = await fetch("/api/speed-tests", {
        method: "DELETE",
        headers: { "X-Session-ID": sessionId }
      });
      if (!response.ok) throw new Error("Failed to clear history");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speed-tests"] });
      toast({ title: "History cleared", description: "All speed test history has been cleared." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to clear history.", variant: "destructive" });
    },
  });

  const handleStartTest = async () => {
    if (isTestRunning) return;
    setIsTestRunning(true);
    setTestProgress(0);
    setTestStatus("Initializing test...");
    setCurrentResult(null);
    try {
      const result = await performSpeedTest({
        onProgress: (progress, status) => {
          setTestProgress(progress);
          setTestStatus(status);
        },
      });
      setCurrentResult(result);
      await saveSpeedTest.mutateAsync(result);
    } catch (error) {
      console.error('Speed test error:', error);
      toast({
        title: "Test failed",
        description: "Network test encountered an issue. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestRunning(false);
      setTestProgress(0);
      setTestStatus("Ready to test");
    }
  };

  const handleOptimizeWifi = () => { setShowOptimization(true); };
  const lastTest = speedTests?.[0];
  const displayResult = currentResult || lastTest;

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/hyderabad-speed-test" />


      <section className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Hyderabad Cyberabad Speed Test
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Test your internet speed in Hyderabad (Cyberabad), India's leading biotech and pharmaceutical hub. 
            Get accurate results for all major ISPs including Airtel Xstream Fiber, Jio Fiber, ACT Fibernet, Railwire, and BSNL Bharat Fiber. 
            Hyderabad's HITEC City, Gachibowli, and Madhapur house global pharmaceutical giants like Dr. Reddy's, Aurobindo Pharma, 
            plus major IT companies in Financial District demanding ultra-reliable gigabit connections 
            for research operations, clinical trials, regulatory compliance, and 24/7 global pharmaceutical manufacturing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card/50 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">Tech Corridors</h3>
              <p className="text-sm text-muted-foreground">HITEC City, Gachibowli, Madhapur, Financial District</p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">Premium ISPs</h3>
              <p className="text-sm text-muted-foreground">Airtel, Jio Fiber, ACT, Railwire, BSNL</p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">Key Industries</h3>
              <p className="text-sm text-muted-foreground">Pharma, Biotech, IT services, Financial services</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Connected</span>
                  </div>
                  <div className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted/50">
                    {networkInfo?.connectionType || "WiFi"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Current IP Address</div>
                  <div className="font-mono text-foreground text-lg font-semibold">
                    {networkInfo?.ipAddress || "Loading..."}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Speed Test</h3>
                <Button
                  onClick={handleStartTest}
                  disabled={isTestRunning}
                  className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                  size="lg"
                >
                  <Play className="h-6 w-6 mr-3" />
                  <span>{isTestRunning ? "Running Test..." : "Start Speed Test"}</span>
                </Button>
                {isTestRunning && (
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Test Progress</span>
                      <span>{testProgress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${testProgress}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-center">{testStatus}</div>
                  </div>
                )}
                <Button
                  onClick={handleOptimizeWifi}
                  variant="outline"
                  className="w-full rounded-xl py-4 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-200"
                  size="lg"
                >
                  <Wifi className="h-5 w-5 mr-2" />
                  <span>Optimize WiFi</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-8">
                <SpeedGauge
                  currentSpeed={displayResult?.downloadSpeed || 0}
                  isTestRunning={isTestRunning}
                  testProgress={testProgress}
                  testStatus={testStatus}
                  lastTest={lastTest}
                />
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-6">
                <NetworkInfo networkInfo={networkInfo} />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <TestHistory
                  speedTests={speedTests || []}
                  isLoading={isLoadingHistory}
                  onClearHistory={() => clearHistory.mutate()}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:hidden space-y-6">
          <Card className="card-hover">
            <CardContent className="p-6">
              <SpeedGauge
                currentSpeed={displayResult?.downloadSpeed || 0}
                isTestRunning={isTestRunning}
                testProgress={testProgress}
                testStatus={testStatus}
                lastTest={lastTest}
              />
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardContent className="p-6 space-y-4">
              <Button
                onClick={handleStartTest}
                disabled={isTestRunning}
                className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                size="lg"
              >
                <Play className="h-6 w-6 mr-3" />
                <span>{isTestRunning ? "Running Test..." : "Start Speed Test"}</span>
              </Button>
              {isTestRunning && (
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Test Progress</span>
                    <span>{testProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${testProgress}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">{testStatus}</div>
                </div>
              )}
              <Button
                onClick={handleOptimizeWifi}
                variant="outline"
                className="w-full rounded-xl py-4 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-200"
                size="lg"
              >
                <Wifi className="h-5 w-5 mr-2" />
                <span>Optimize WiFi</span>
              </Button>
            </CardContent>
          </Card>
          <Separator className="my-6" />
          <Card className="card-hover">
            <CardContent className="p-6">
              <NetworkInfo networkInfo={networkInfo} />
            </CardContent>
          </Card>
          <Separator className="my-6" />
          <Card className="card-hover">
            <CardContent className="p-6">
              <TestHistory
                speedTests={speedTests || []}
                isLoading={isLoadingHistory}
                onClearHistory={() => clearHistory.mutate()}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Other Cities Navigation */}
      <section className="bg-card/30 border-t border-border/30 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Test Internet Speed in Other Cities</h3>
            <p className="text-sm text-muted-foreground mb-6">Check your internet speed and boost performance in other major Indian cities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/mumbai-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Mumbai</div>
                <div className="text-xs text-muted-foreground">Financial Hub Speed Test</div>
              </Link>
              <Link href="/delhi-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Delhi</div>
                <div className="text-xs text-muted-foreground">Capital Speed Test</div>
              </Link>
              <Link href="/bangalore-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Bangalore</div>
                <div className="text-xs text-muted-foreground">Tech Hub Speed Test</div>
              </Link>
              <Link href="/chennai-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Chennai</div>
                <div className="text-xs text-muted-foreground">South India Speed Test</div>
              </Link>
              <Link href="/kolkata-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Kolkata</div>
                <div className="text-xs text-muted-foreground">East India Speed Test</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Footer Content */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Educational Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">About Internet Speed Tests</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  An internet speed test measures your connection's download speed, upload speed, and ping latency. 
                  Our free bandwidth test tool provides accurate results for WiFi, broadband, fiber, and mobile connections 
                  including 4G and 5G networks.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Understanding Your Results</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">Download Speed:</strong> How fast you receive data</div>
                  <div><strong className="text-foreground">Upload Speed:</strong> How fast you send data</div>
                  <div><strong className="text-foreground">Ping:</strong> Response time in milliseconds</div>
                  <div><strong className="text-foreground">Jitter:</strong> Variation in ping times</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Speed Requirements</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">HD Streaming:</strong> 5-10 Mbps</div>
                  <div><strong className="text-foreground">4K Streaming:</strong> 25+ Mbps</div>
                  <div><strong className="text-foreground">Gaming:</strong> 3-6 Mbps + low ping</div>
                  <div><strong className="text-foreground">Video Calls:</strong> 1-4 Mbps</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">How accurate is this speed test?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our speed test uses multiple test servers and advanced algorithms to provide highly accurate results. 
                    We measure real-world performance using multiple data sizes and connection protocols.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What affects my internet speed?</h4>
                  <p className="text-sm text-muted-foreground">
                    Network congestion, WiFi interference, device limitations, background downloads, and distance 
                    from your router can all impact your connection speed.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">When should I test my speed?</h4>
                  <p className="text-sm text-muted-foreground">
                    Test during different times of day to get a complete picture. Peak hours (evening) often show 
                    slower speeds due to network congestion.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">How can I improve my internet speed?</h4>
                  <p className="text-sm text-muted-foreground">
                    Upgrade your plan, use wired connections, update your router, reduce network interference, 
                    and close unnecessary applications consuming bandwidth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-border/30">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Speed Test Tools</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Download Speed Test</div>
                <div>Upload Speed Test</div>
                <div>Ping Test Tool</div>
                <div>Bandwidth Checker</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Connection Types</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>WiFi Speed Test</div>
                <div>Fiber Speed Test</div>
                <div>Cable Speed Test</div>
                <div>Mobile Speed Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Speed Test History</div>
                <div>Network Diagnostics</div>
                <div>Connection Optimization</div>
                <div>Speed Comparisons</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">About</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
                </Link>
                <div className="text-muted-foreground">How It Works</div>
                <div className="text-muted-foreground">Contact Us</div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 Speed Test and Boost. Free internet speed test tool for accurate bandwidth measurement. 
              Test your connection speed on any device.
            </p>
          </div>
        </div>
      </footer>

      <OptimizationModal
        isOpen={showOptimization}
        onClose={() => setShowOptimization(false)}
      />

      <GenericFooter />
    </div>
  );
}