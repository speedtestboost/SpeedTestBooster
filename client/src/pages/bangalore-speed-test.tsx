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
import Breadcrumbs from "@/components/Breadcrumbs";
import { performSpeedTest, type SpeedTestResult } from "@/lib/speedTest";
import { Play, Gauge, Wifi } from "lucide-react";
import { Link } from "wouter";

export default function BangaloreSpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    document.title = "Bangalore Internet Free Internet Speed Test Online - No Ads - Free Tech Hub WiFi & Fiber Speed Checker | Free Internet Speed Test Online - No Ads & Boost";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your internet speed in Bangalore (Bengaluru) Silicon Valley. Free speed test for ACT Fibernet, Airtel, Jio Fiber, and BSNL. Check WiFi, fiber, and 5G speeds optimized for tech professionals and IT companies.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'bangalore internet speed booster test Bangalore, bengaluru wifi speed test, silicon valley india broadband, whitefield speed test, electronic city speed test, koramangala speed test, ACT fibernet bangalore, airtel bangalore fiber, jio fiber bengaluru';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Bangalore Internet Free Internet Speed Test Online - No Ads - Free Tech Hub WiFi & Fiber Speed Checker' },
      { property: 'og:description', content: 'Test your internet speed in Bangalore (Bengaluru) Silicon Valley. Free speed test for ACT Fibernet, Airtel, Jio Fiber, and BSNL. Check WiFi, fiber, and 5G speeds optimized for tech professionals.' },
      { property: 'og:url', content: 'https://speedtestboost.com/bangalore-speed-test' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Free Internet Speed Test Online - No Ads & Boost' },
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
      { name: 'twitter:title', content: 'Bangalore Internet Free Internet Speed Test Online - No Ads - Free Tech Hub WiFi & Fiber Speed Checker' },
      { name: 'twitter:description', content: 'Test your internet speed in Bangalore Silicon Valley. Free speed test for ACT Fibernet, Airtel, Jio Fiber optimized for tech professionals.' }
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

    
    const canonical = document.createElement('link');

    
    canonical.rel = 'canonical';

    
    canonical.href = 'https://speedtestboost.com/bangalore-speed-test';

    
    document.head.appendChild(canonical);
    
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
      "name": "Bangalore Internet Free Internet Speed Test Online - No Ads",
      "description": "Free online internet speed booster test Bangalore for Bangalore tech professionals with ACT Fibernet, Airtel, Jio Fiber, and BSNL ISP support",
      "url": "https://speedtestboost.com/bangalore-speed-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "creator": {
        "@type": "Organization",
        "name": "Free Internet Speed Test Online - No Ads & Boost"
      },
      "audience": {
        "@type": "Audience",
        "geographicArea": {
          "@type": "City",
          "name": "Bangalore",
          "alternateName": "Bengaluru",
          "containedInPlace": {
            "@type": "Country",
            "name": "India"
          }
        }
      }
    });

    return () => {
      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
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
      <Header currentPath="/bangalore-speed-test" />

      <section className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Bangalore Silicon Valley Free Internet Speed Test Online - No Ads
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Test your internet speed in Bangalore (Bengaluru), India's Silicon Valley and tech capital. 
            Get accurate results for all major ISPs including ACT Fibernet, Airtel Xstream Fiber, Jio Fiber, Tata Play Fiber, and BSNL Bharat Fiber. 
            Bangalore's thriving IT ecosystem in Electronic City, Whitefield, Koramangala, and Indiranagar demands ultra-reliable gigabit connections 
            for software development, cloud computing, video conferencing, and 24/7 global operations across Fortune 500 companies and innovative startups.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card/50 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">Tech Hubs</h3>
              <p className="text-sm text-muted-foreground">Electronic City, Whitefield, Koramangala, Indiranagar</p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">Premium ISPs</h3>
              <p className="text-sm text-muted-foreground">ACT Fibernet, Airtel, Jio Fiber, Tata Play</p>
            </div>
            <div className="bg-card/50 rounded-lg p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">IT Requirements</h3>
              <p className="text-sm text-muted-foreground">Low latency, High upload, 99.9% uptime</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        <Breadcrumbs 
          items={[
            { label: "Bangalore Free Internet Speed Test Online - No Ads", href: "/bangalore-speed-test" }
          ]} 
        />
        
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
                <h3 className="text-lg font-semibold text-foreground">Free Internet Speed Test Online - No Ads</h3>
                <Button
                  onClick={handleStartTest}
                  disabled={isTestRunning}
                  className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                  size="lg"
                >
                  <Play className="h-6 w-6 mr-3" />
                  <span>{isTestRunning ? "Running Test..." : "Start Free Internet Speed Test Online - No Ads"}</span>
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
                <span>{isTestRunning ? "Running Test..." : "Start Free Internet Speed Test Online - No Ads"}</span>
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
            <p className="text-sm text-muted-foreground mb-6">Test your internet speed for free with no ads or downloads in Bangalore and boost performance in other major Indian cities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/mumbai-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Mumbai</div>
                <div className="text-xs text-muted-foreground">Financial Hub Free Internet Speed Test Online - No Ads</div>
              </Link>
              <Link href="/delhi-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Delhi</div>
                <div className="text-xs text-muted-foreground">Capital Free Internet Speed Test Online - No Ads</div>
              </Link>
              <Link href="/hyderabad-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Hyderabad</div>
                <div className="text-xs text-muted-foreground">Cyberabad Free Internet Speed Test Online - No Ads</div>
              </Link>
              <Link href="/chennai-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Chennai</div>
                <div className="text-xs text-muted-foreground">South India Free Internet Speed Test Online - No Ads</div>
              </Link>
              <Link href="/kolkata-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Kolkata</div>
                <div className="text-xs text-muted-foreground">East India Free Internet Speed Test Online - No Ads</div>
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
                <h3 className="text-lg font-semibold text-foreground mb-3">Bangalore Tech Infrastructure</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bangalore leads India in fiber optic infrastructure with the highest concentration of IT companies. 
                  Electronic City, Whitefield, and Koramangala offer gigabit connections from ACT Fibernet and Airtel Xstream Fiber, 
                  making it the most connected city for software professionals and global tech operations.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Popular ISPs in Bangalore</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">ACT Fibernet:</strong> Premium speeds up to 1 Gbps</div>
                  <div><strong className="text-foreground">Airtel Xstream Fiber:</strong> Reliable enterprise grade</div>
                  <div><strong className="text-foreground">Jio Fiber:</strong> Competitive pricing, good coverage</div>
                  <div><strong className="text-foreground">Tata Play Fiber:</strong> Business focused plans</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Tech Professional Requirements</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">Software Development:</strong> 100+ Mbps upload</div>
                  <div><strong className="text-foreground">Video Conferencing:</strong> 25+ Mbps stable</div>
                  <div><strong className="text-foreground">Cloud Computing:</strong> Low latency essential</div>
                  <div><strong className="text-foreground">Startup Operations:</strong> 99.9% uptime needed</div>
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
              <h4 className="font-semibold text-foreground mb-3">Free Internet Speed Test Online - No Ads Tools</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Download Free Internet Speed Test Online - No Ads</div>
                <div>Upload Free Internet Speed Test Online - No Ads</div>
                <div>Ping Test Tool</div>
                <div>Bandwidth Checker</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Connection Types</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>WiFi Free Internet Speed Test Online - No Ads</div>
                <div>Fiber Free Internet Speed Test Online - No Ads</div>
                <div>Cable Free Internet Speed Test Online - No Ads</div>
                <div>Mobile Free Internet Speed Test Online - No Ads</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Free Internet Speed Test Online - No Ads History</div>
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
              © 2025 Free Internet Speed Test Online - No Ads and Boost. Free internet speed booster test Bangalore tool for accurate bandwidth measurement. 
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