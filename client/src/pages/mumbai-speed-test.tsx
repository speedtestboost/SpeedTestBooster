import { useState, useEffect } from "react";
import { setCanonicalHref } from "@/lib/seo";
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

export default function MumbaiSpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);

  const { toast } = useToast();

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Mumbai Free Internet Speed Test Online - No Ads - Free Internet Free Internet Speed Test Online - No Ads Mumbai India | WiFi Speed Check";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mumbai speed test - Free speed test India for Jio Fiber, Airtel Xstream, ACT Fibernet, BSNL. Check WiFi speed test Mumbai, internet speed booster test Mumbai India, fiber speed test. Test your speed now!');
    }
    
    // Keywords meta tag for India/Mumbai
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'mumbai speed test, speed test india, speed test in india, internet speed booster test Mumbai india, wifi speed test mumbai, fiber speed test india, jio fiber speed test, airtel speed test mumbai, broadband speed test india, net speed test mumbai, data speed test india';
    
    // Add canonical URL
    setCanonicalHref('https://speedtestboost.com/mumbai-speed-test');

    return () => {
    };
  }, []);

  // Fetch network info
  const { data: networkInfo } = useQuery({
    queryKey: ["/api/network-info"],
  });

  // Fetch speed test history
  const { data: speedTests, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["/api/speed-tests"],
  });

  // Save speed test mutation
  const saveSpeedTest = useMutation({
    mutationFn: async (result: SpeedTestResult) => {
      const sessionId = getSessionId();
      const response = await fetch("/api/speed-tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId
        },
        body: JSON.stringify(result),
      });
      if (!response.ok) throw new Error("Failed to save speed test");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speed-tests"] });
    },
  });

  // Clear history mutation
  const clearHistory = useMutation({
    mutationFn: async () => {
      const sessionId = getSessionId();
      const response = await fetch("/api/speed-tests", {
        method: "DELETE",
        headers: {
          "X-Session-ID": sessionId
        }
      });
      if (!response.ok) throw new Error("Failed to clear history");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speed-tests"] });
      toast({
        title: "History cleared",
        description: "All speed test history has been cleared.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear history.",
        variant: "destructive",
      });
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

  const handleOptimizeWifi = () => {
    setShowOptimization(true);
  };

  const lastTest = speedTests?.[0];
  const displayResult = currentResult || lastTest;

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/mumbai-speed-test" />


      {/* Mumbai-specific SEO Content */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Mumbai Internet Free Internet Speed Test Online - No Ads
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Test your internet speed in Mumbai and get accurate results for all major ISPs including BSNL, Airtel, Jio Fiber, and Vi. 
            Mumbai's digital infrastructure demands reliable internet speeds for businesses, streaming, and daily connectivity. 
            Check your broadband performance and optimize your WiFi connection with our professional speed test tool.
          </p>
        </div>
      </section>

      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        <Breadcrumbs 
          items={[
            { label: "Mumbai Free Internet Speed Test Online - No Ads", href: "/mumbai-speed-test" }
          ]} 
        />
        
        {/* Desktop Layout - Three Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Left Column - Free Internet Speed Test Online - No Ads */}
          <div className="space-y-6">
            {/* Connection Status */}
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

            {/* Test Controls */}
            <Card className="card-hover">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Free Internet Speed Test Online - No Ads</h3>
                <Button
                  onClick={handleStartTest}
                  disabled={isTestRunning}
                  className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      <Play className="h-6 w-6" />
                    </div>
                    <span>{isTestRunning ? "Running Test..." : "Start Free Internet Speed Test Online - No Ads"}</span>
                  </div>
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
                    <div className="text-xs text-muted-foreground text-center">
                      {testStatus}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleOptimizeWifi}
                  variant="outline"
                  className="w-full rounded-xl py-4 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-200"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <Wifi className="h-5 w-5" />
                    </div>
                    <span>Optimize WiFi</span>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Speed Gauge */}
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

            {/* Network Information */}
            <Card className="card-hover">
              <CardContent className="p-6">
                <NetworkInfo networkInfo={networkInfo} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Test History */}
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

        {/* Mobile Layout - Single Column */}
        <div className="lg:hidden space-y-6">
          {/* Speed Gauge */}
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

          {/* Test Controls */}
          <Card className="card-hover">
            <CardContent className="p-6 space-y-4">
              <Button
                onClick={handleStartTest}
                disabled={isTestRunning}
                className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    <Play className="h-6 w-6" />
                  </div>
                  <span>{isTestRunning ? "Running Test..." : "Start Free Internet Speed Test Online - No Ads"}</span>
                </div>
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
                  <div className="text-xs text-muted-foreground text-center">
                    {testStatus}
                  </div>
                </div>
              )}

              <Button
                onClick={handleOptimizeWifi}
                variant="outline"
                className="w-full rounded-xl py-4 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-200"
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                    <Wifi className="h-5 w-5" />
                  </div>
                  <span>Optimize WiFi</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* Network Information */}
          <Card className="card-hover">
            <CardContent className="p-6">
              <NetworkInfo networkInfo={networkInfo} />
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* Test History */}
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

      {/* Main Free Internet Speed Test Online - No Ads Call-to-Action */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Try Our Universal Free Internet Speed Test Online - No Ads
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Test your internet speed with our main tool that works across all locations and ISPs
          </p>
          <Link href="/">
            <Button size="lg" className="gradient-bg text-white px-8 py-4 text-lg">
              Go to Main Free Internet Speed Test Online - No Ads
            </Button>
          </Link>
        </div>
      </section>

      {/* Other Cities Navigation */}
      <section className="bg-card/30 border-t border-border/30 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Test Internet Speed in Other Cities</h3>
            <p className="text-sm text-muted-foreground mb-6">Test your internet speed for free with no ads or downloads in Mumbai and boost performance in other major Indian cities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Link href="/delhi-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Delhi</div>
                <div className="text-xs text-muted-foreground">Capital Free Internet Speed Test Online - No Ads</div>
              </Link>
              <Link href="/bangalore-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Bangalore</div>
                <div className="text-xs text-muted-foreground">Tech Hub Free Internet Speed Test Online - No Ads</div>
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
                <h3 className="text-lg font-semibold text-foreground mb-3">About Internet Free Internet Speed Test Online - No Adss</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  An internet speed booster test Mumbai measures your connection's download speed, upload speed, and ping latency. 
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
              <h4 className="font-semibold text-foreground mb-3">Other City Tests</h4>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                  Main Free Internet Speed Test Online - No Ads
                </Link>
                <Link href="/delhi-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Delhi Free Internet Speed Test Online - No Ads
                </Link>
                <Link href="/bangalore-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Bangalore Free Internet Speed Test Online - No Ads
                </Link>
                <Link href="/hyderabad-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Hyderabad Free Internet Speed Test Online - No Ads
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">More Cities</h4>
              <div className="space-y-2 text-sm">
                <Link href="/chennai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Chennai Free Internet Speed Test Online - No Ads
                </Link>
                <Link href="/kolkata-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Kolkata Free Internet Speed Test Online - No Ads
                </Link>
                <div className="text-muted-foreground">WiFi Free Internet Speed Test Online - No Ads</div>
                <div className="text-muted-foreground">Fiber Free Internet Speed Test Online - No Ads</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Mumbai ISPs</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.jio.com/fiber/en-in" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Jio Fiber Mumbai
                </a>
                <a href="https://www.airtel.in/broadband" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Airtel Broadband
                </a>
                <a href="https://portal.bsnl.in/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  BSNL Mumbai
                </a>
                <a href="https://www.myvi.in/personal/broadband" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Vi Broadband
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">About & Help</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
                </Link>
                <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Compare Fast.com
                </a>
                <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speedtest.net
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 Free Internet Speed Test Online - No Ads and Boost. Free Mumbai internet speed booster test Mumbai tool for accurate bandwidth measurement. 
              Test your connection speed on any device. Compare with <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast.com</a> and <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Speedtest.net</a>.
            </p>
          </div>
        </div>
      </footer>

      {/* Optimization Modal */}
      <OptimizationModal
        isOpen={showOptimization}
        onClose={() => setShowOptimization(false)}
      />

      <GenericFooter />
    </div>
  );
}