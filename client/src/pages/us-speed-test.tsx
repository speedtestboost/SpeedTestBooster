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

import { performSpeedTest, type SpeedTestResult } from "@/lib/speedTest";
import { Play, Gauge, Wifi, Menu, X } from "lucide-react";
import { Link } from "wouter";

export default function USSpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { toast } = useToast();

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Internet Speed Test USA - Free WiFi & Broadband Speed Checker | Speed Test & Boost";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your internet speed in the United States. Free online speed test for Verizon, AT&T, Comcast, and Spectrum. Check WiFi, broadband, and fiber speeds with accurate US server results.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'internet speed test USA, wifi speed test US, broadband speed test America, Verizon speed test, AT&T speed test, Comcast speed test, Spectrum speed test, fiber speed test USA, online speed test US';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Internet Speed Test USA - Free WiFi & Broadband Speed Checker' },
      { property: 'og:description', content: 'Test your internet speed in the United States. Free online speed test for Verizon, AT&T, Comcast, and Spectrum. Check WiFi, broadband, and fiber speeds with accurate US server results.' },
      { property: 'og:url', content: 'https://speedtestboost.com/us-speed-test' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test & Boost' },
      { property: 'og:locale', content: 'en_US' }
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
      { name: 'twitter:title', content: 'Internet Speed Test USA - Free WiFi & Broadband Speed Checker' },
      { name: 'twitter:description', content: 'Test your internet speed in the United States. Free online speed test for Verizon, AT&T, Comcast, and Spectrum.' }
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.name = tag.name;
        document.head.appendChild(twitterTag);
      }
      twitterTag.content = tag.content;
    });
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/us-speed-test';
    
    // Structured Data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Internet Speed Test USA",
      "description": "Free online internet speed test for USA users with Verizon, AT&T, Comcast, and Spectrum ISP support",
      "url": "https://speedtestboost.com/us-speed-test",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Speed Test & Boost"
      },
      "audience": {
        "@type": "Audience",
        "geographicArea": {
          "@type": "Country",
          "name": "United States"
        }
      }
    });
  }, []);

  // Fetch network info and speed test history
  const { data: networkInfo } = useQuery({ queryKey: ["/api/network-info"] });
  const { data: speedTests, isLoading: isLoadingHistory } = useQuery({ queryKey: ["/api/speed-tests"] });

  // Save speed test mutation
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/speed-tests"] }),
  });

  // Clear history mutation
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
    }
  };

  const handleOptimizeWifi = () => setShowOptimization(true);
  const displayResult = currentResult || (speedTests && speedTests.length > 0 ? speedTests[0] : null);
  const lastTest = speedTests && speedTests.length > 0 ? speedTests[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Header with Animation */}
      <header className="bg-card/30 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Gauge className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
              </div>
              
              <div className="flex flex-col">
                <Link href="/" className="text-xl lg:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
                  Speed Test & Boost
                </Link>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  USA Internet Speed Test
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-6">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/uk-speed-test" className="text-muted-foreground hover:text-primary transition-colors">
                  🇬🇧 UK
                </Link>
                <Link href="/au-speed-test" className="text-muted-foreground hover:text-primary transition-colors">
                  🇦🇺 Australia
                </Link>
                <Link href="/ca-speed-test" className="text-muted-foreground hover:text-primary transition-colors">
                  🇨🇦 Canada
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
                </Link>
              </div>
              
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 pt-4 border-t border-border/30">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors py-2">
                  Home
                </Link>
                <Link href="/uk-speed-test" className="text-muted-foreground hover:text-primary transition-colors py-2">
                  🇬🇧 UK Speed Test
                </Link>
                <Link href="/au-speed-test" className="text-muted-foreground hover:text-primary transition-colors py-2">
                  🇦🇺 Australia Speed Test
                </Link>
                <Link href="/ca-speed-test" className="text-muted-foreground hover:text-primary transition-colors py-2">
                  🇨🇦 Canada Speed Test
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors py-2">
                  About
                </Link>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors py-2">
                  Help & FAQ
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column */}
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
                <h3 className="text-lg font-semibold text-foreground">US Speed Test</h3>
                <Button
                  onClick={handleStartTest}
                  disabled={isTestRunning}
                  className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <Play className="h-6 w-6 mr-3" />
                    <span>{isTestRunning ? "Running Test..." : "Start Speed Test"}</span>
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
                    <div className="text-xs text-foreground text-center">{testStatus}</div>
                  </div>
                )}

                <Button
                  onClick={handleOptimizeWifi}
                  disabled={isTestRunning}
                  className="w-full bg-secondary text-secondary-foreground rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <Wifi className="h-6 w-6 mr-3" />
                    <span>Optimize WiFi Speed</span>
                  </div>
                </Button>
              </CardContent>
            </Card>

            <NetworkInfo networkInfo={networkInfo} />
          </div>

          {/* Center Column */}
          <div className="flex items-start justify-center">
            <div className="w-full max-w-md">
              <SpeedGauge
                currentSpeed={displayResult?.downloadSpeed || 0}
                isTestRunning={isTestRunning}
                testProgress={testProgress}
                testStatus={testStatus}
                lastTest={lastTest}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {displayResult && (
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Latest Results</h3>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Download Speed</div>
                      <div className="text-3xl font-bold gradient-text">
                        {displayResult.downloadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Mbps</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Upload Speed</div>
                      <div className="text-3xl font-bold gradient-text">
                        {displayResult.uploadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Mbps</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-xl border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">Ping</div>
                        <div className="text-xl font-bold text-foreground">{displayResult.ping.toFixed(0)}</div>
                        <div className="text-xs text-muted-foreground">ms</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-xl border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">Jitter</div>
                        <div className="text-xl font-bold text-foreground">{displayResult.jitter.toFixed(0)}</div>
                        <div className="text-xs text-muted-foreground">ms</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <TestHistory
              speedTests={speedTests || []}
              isLoading={isLoadingHistory}
              onClearHistory={() => clearHistory.mutate()}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <SpeedGauge
            currentSpeed={displayResult?.downloadSpeed || 0}
            isTestRunning={isTestRunning}
            testProgress={testProgress}
            testStatus={testStatus}
            lastTest={lastTest}
          />

          <Card className="card-hover">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">US Speed Test</h3>
              <Button
                onClick={handleStartTest}
                disabled={isTestRunning}
                className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <Play className="h-6 w-6 mr-3" />
                  <span>{isTestRunning ? "Running Test..." : "Start Speed Test"}</span>
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
                  <div className="text-xs text-foreground text-center">{testStatus}</div>
                </div>
              )}

              <Button
                onClick={handleOptimizeWifi}
                disabled={isTestRunning}
                className="w-full bg-secondary text-secondary-foreground rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                size="lg"
              >
                <div className="flex items-center justify-center">
                  <Wifi className="h-6 w-6 mr-3" />
                  <span>Optimize WiFi Speed</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          {displayResult && (
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Latest Results</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Download Speed</div>
                    <div className="text-3xl font-bold gradient-text">
                      {displayResult.downloadSpeed.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Mbps</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Upload Speed</div>
                    <div className="text-3xl font-bold gradient-text">
                      {displayResult.uploadSpeed.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Mbps</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-xl border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Ping</div>
                      <div className="text-xl font-bold text-foreground">{displayResult.ping.toFixed(0)}</div>
                      <div className="text-xs text-muted-foreground">ms</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-xl border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Jitter</div>
                      <div className="text-xl font-bold text-foreground">{displayResult.jitter.toFixed(0)}</div>
                      <div className="text-xs text-muted-foreground">ms</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <TestHistory
            speedTests={speedTests || []}
            isLoading={isLoadingHistory}
            onClearHistory={() => clearHistory.mutate()}
          />

          <NetworkInfo networkInfo={networkInfo} />
        </div>
      </main>

      {/* SEO Content Section */}
      <section className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Internet Speed Test USA</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Test your internet speed across the United States with our free online speed checker. 
                  Get accurate results for Verizon, AT&T, Comcast, Spectrum, and other major US ISPs. 
                  Our US servers provide precise measurements for broadband, fiber, and WiFi connections.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Major US Internet Providers</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">Verizon FiOS:</strong> Fiber speeds up to 940 Mbps</div>
                  <div><strong className="text-foreground">AT&T Fiber:</strong> Gigabit speeds available</div>
                  <div><strong className="text-foreground">Comcast Xfinity:</strong> Cable speeds up to 1200 Mbps</div>
                  <div><strong className="text-foreground">Spectrum:</strong> No data caps, up to 940 Mbps</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">US Speed Test Servers</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">East Coast:</strong> New York, Atlanta, Miami</div>
                  <div><strong className="text-foreground">West Coast:</strong> Los Angeles, San Francisco, Seattle</div>
                  <div><strong className="text-foreground">Central:</strong> Chicago, Dallas, Denver</div>
                  <div><strong className="text-foreground">Coverage:</strong> All 50 states supported</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our US Speed Test?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Accurate US Measurements</h4>
                  <p className="text-sm text-muted-foreground">
                    Our speed test uses multiple US-based servers to provide the most accurate internet speed 
                    measurements for American users. Test your connection against servers in your region.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">All Major US ISPs Supported</h4>
                  <p className="text-sm text-muted-foreground">
                    Whether you're using Verizon, AT&T, Comcast, Spectrum, or any other US internet provider, 
                    our test works with all networks to give you reliable speed results.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Free WiFi Speed Testing</h4>
                  <p className="text-sm text-muted-foreground">
                    Test your WiFi speed, broadband connection, or mobile internet for free. No registration 
                    required - just click start and get instant results with download, upload, and ping measurements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Optimize Your US Connection</h4>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendations to improve your internet speed based on your US location 
                    and ISP. Learn how to optimize your home network for better performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OptimizationModal
        isOpen={showOptimization}
        onClose={() => setShowOptimization(false)}
      />
    </div>
  );
}