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

export default function SpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { toast } = useToast();

  // SEO Meta Tags for homepage
  useEffect(() => {
    document.title = "Free Internet Speed Test - Check WiFi & Broadband Speed | Speed Test & Boost";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free internet speed test tool. Test WiFi and broadband speeds instantly with accurate results. Check download, upload speeds and ping. Works globally with all ISPs.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'internet speed test, wifi speed test, broadband speed test, speed test online, check internet speed, bandwidth test, network speed test, fast speed test';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Free Internet Speed Test - Check WiFi & Broadband Speed' },
      { property: 'og:description', content: 'Free internet speed test tool. Test WiFi and broadband speeds instantly with accurate results. Check download, upload speeds and ping. Works globally with all ISPs.' },
      { property: 'og:url', content: 'https://speedtestboost.com/' },
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
      { name: 'twitter:title', content: 'Free Internet Speed Test - Check WiFi & Broadband Speed' },
      { name: 'twitter:description', content: 'Free internet speed test tool. Test WiFi and broadband speeds instantly with accurate results.' }
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
    
    // Canonical URL for homepage
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/';
    
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
      "name": "Speed Test & Boost",
      "description": "Free internet speed test tool with global coverage. Test WiFi and broadband speeds instantly with accurate results for all ISPs.",
      "url": "https://speedtestboost.com/",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Speed Test & Boost",
        "url": "https://speedtestboost.com/"
      },
      "featureList": [
        "Download speed test",
        "Upload speed test", 
        "Ping test",
        "WiFi optimization",
        "Global server coverage",
        "All ISP support"
      ]
    });
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
        body: JSON.stringify({
          sessionId,
          downloadSpeed: result.downloadSpeed,
          uploadSpeed: result.uploadSpeed,
          ping: result.ping,
          jitter: result.jitter,
          serverLocation: result.serverLocation,
          connectionType: result.connectionType,
        }),
      });
      if (!response.ok) throw new Error("Failed to save test");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speed-tests"] });
      toast({
        title: "Speed test completed",
        description: "Your test results have been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save test results.",
        variant: "destructive",
      });
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
    setCurrentResult(null); // Clear previous result

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
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse opacity-30 -top-16 -left-16"></div>
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-accent to-primary animate-pulse opacity-20 -top-12 right-20 animation-delay-1000"></div>
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse opacity-25 -bottom-8 left-1/3 animation-delay-500"></div>
          </div>
        </div>
        
        <div className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Enhanced Custom Icon with Animations */}
              <div className="relative">
                <div className="p-3 rounded-2xl gradient-bg hover:scale-105 transition-all duration-300">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
                        <stop offset="50%" style={{stopColor: '#f8fafc', stopOpacity: 0.9}} />
                        <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
                      </linearGradient>

                    </defs>
                    
                    {/* Speed Gauge Arc */}
                    <path d="M 10 20 A 10 10 0 0 1 30 20" stroke="url(#iconGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                      <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                    </path>
                    
                    {/* Dynamic Speed Needle */}
                    <line x1="20" y1="20" x2="27" y2="14" stroke="url(#iconGradient)" strokeWidth="3" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" values="0 20 20;15 20 20;0 20 20" dur="3s" repeatCount="indefinite"/>
                    </line>
                    
                    {/* Pulsing Center */}
                    <circle cx="20" cy="20" r="2.5" fill="url(#iconGradient)">
                      <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="fill-opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    
                    {/* Speed Marks with Stagger Animation */}
                    <g stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round">
                      <line x1="11" y1="18" x2="13" y2="17">
                        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" begin="0s" repeatCount="indefinite"/>
                      </line>
                      <line x1="10" y1="20" x2="12" y2="20">
                        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" begin="0.3s" repeatCount="indefinite"/>
                      </line>
                      <line x1="11" y1="22" x2="13" y2="23">
                        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" begin="0.6s" repeatCount="indefinite"/>
                      </line>
                      
                      <line x1="27" y1="17" x2="29" y2="18">
                        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" begin="0.9s" repeatCount="indefinite"/>
                      </line>
                      <line x1="28" y1="20" x2="30" y2="20">
                        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" begin="1.2s" repeatCount="indefinite"/>
                      </line>
                      <line x1="27" y1="23" x2="29" y2="22">
                        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" begin="1.5s" repeatCount="indefinite"/>
                      </line>
                    </g>
                    
                    {/* Animated WiFi Waves */}
                    <g stroke="url(#iconGradient)" strokeWidth="2" fill="none" strokeLinecap="round">
                      <path d="M 16 28 Q 20 26 24 28">
                        <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                      </path>
                      <path d="M 17 30 Q 20 28.5 23 30">
                        <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
                      </path>
                      <circle cx="20" cy="32" r="1.5" fill="url(#iconGradient)">
                        <animate attributeName="fill-opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                  </svg>
                </div>
              </div>
              
              {/* Enhanced Title with Gradient Animation */}
              <div className="flex flex-col">
                <h1 className="text-2xl lg:text-4xl font-bold gradient-text relative">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                    Speed Test & Boost
                  </span>
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground mt-1 opacity-75">
                  Professional Network Diagnostics
                </p>
              </div>
            </div>
            
            {/* Navigation and Status */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link href="/us-speed-test" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Global Speed Test
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
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
                  href="/us-speed-test" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Global Speed Test
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
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Help & FAQ
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* City Navigation Menu */}
      <section className="bg-card/30 border-b border-border/30 py-4">
        <div className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">Test Your Internet Speed by City</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link href="/mumbai-speed-test" className="block p-3 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Mumbai</div>
                <div className="text-xs text-muted-foreground">Internet Speed & Booster</div>
              </Link>
              <Link href="/delhi-speed-test" className="block p-3 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Delhi</div>
                <div className="text-xs text-muted-foreground">Internet Speed & Booster</div>
              </Link>
              <Link href="/bangalore-speed-test" className="block p-3 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Bangalore</div>
                <div className="text-xs text-muted-foreground">Internet Speed & Booster</div>
              </Link>
              <Link href="/hyderabad-speed-test" className="block p-3 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Hyderabad</div>
                <div className="text-xs text-muted-foreground">Internet Speed & Booster</div>
              </Link>
              <Link href="/chennai-speed-test" className="block p-3 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Chennai</div>
                <div className="text-xs text-muted-foreground">Internet Speed & Booster</div>
              </Link>
              <Link href="/kolkata-speed-test" className="block p-3 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Kolkata</div>
                <div className="text-xs text-muted-foreground">Internet Speed & Booster</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compare with External Tools Section */}
      <section className="bg-muted/20 py-8 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Compare Speed Test Results</h2>
            <p className="text-sm text-muted-foreground">
              Test your connection across multiple platforms for the most accurate assessment
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
              <span className="text-sm font-medium text-foreground">Fast.com</span>
              <span className="text-xs text-muted-foreground">by Netflix</span>
            </a>
            <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
              <span className="text-sm font-medium text-foreground">Speedtest.net</span>
              <span className="text-xs text-muted-foreground">by Ookla</span>
            </a>
            <a href="https://www.google.com/search?q=internet+speed+test" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
              <span className="text-sm font-medium text-foreground">Google Speed Test</span>
              <span className="text-xs text-muted-foreground">Search Tool</span>
            </a>
          </div>
        </div>
      </section>



      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Desktop Layout - Three Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Left Column - Speed Test */}
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
                <h3 className="text-lg font-semibold text-foreground">Speed Test</h3>
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
                    <div className="text-xs text-foreground text-center">
                      {testStatus}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleOptimizeWifi}
                  disabled={isTestRunning}
                  className="w-full bg-secondary text-secondary-foreground rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      <Wifi className="h-6 w-6" />
                    </div>
                    <span>Optimize WiFi Speed</span>
                  </div>
                </Button>

              </CardContent>
            </Card>

            {/* Network Info */}
            <NetworkInfo networkInfo={networkInfo} />
          </div>

          {/* Center Column - Speed Gauge */}
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

          {/* Right Column - Results & History */}
          <div className="space-y-6">
            {/* Test Results */}
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
                      <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">Ping</div>
                        <div className="text-xl font-bold text-foreground">
                          {displayResult.ping}ms
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">Jitter</div>
                        <div className="text-xl font-bold text-foreground">
                          {displayResult.jitter.toFixed(1)}ms
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Test History */}
            <TestHistory
              speedTests={speedTests || []}
              isLoading={isLoadingHistory}
              onClearHistory={() => clearHistory.mutate()}
            />
          </div>
        </div>

        {/* Mobile Layout - Single Column (unchanged) */}
        <div className="lg:hidden space-y-6">
          {/* Connection Status */}
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse glow-effect"></div>
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

          {/* Speed Gauge */}
          <SpeedGauge
            currentSpeed={displayResult?.downloadSpeed || 0}
            isTestRunning={isTestRunning}
            testProgress={testProgress}
            testStatus={testStatus}
            lastTest={lastTest}
          />

          {/* Test Controls */}
          <div className="space-y-4">
            <Button
              onClick={handleStartTest}
              disabled={isTestRunning}
              className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 glow-effect"
              size="lg"
            >
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  <Play className="h-6 w-6" />
                </div>
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
                <div className="text-xs text-foreground text-center">
                  {testStatus}
                </div>
              </div>
            )}

            <Button
              onClick={handleOptimizeWifi}
              disabled={isTestRunning}
              className="w-full bg-secondary text-secondary-foreground rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
              size="lg"
            >
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  <Wifi className="h-6 w-6" />
                </div>
                <span>Optimize WiFi Speed</span>
              </div>
            </Button>

          </div>

          {/* Test Results */}
          {displayResult && (
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Latest Results</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Download</div>
                    <div className="text-2xl font-bold gradient-text">
                      {displayResult.downloadSpeed.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Mbps</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Upload</div>
                    <div className="text-2xl font-bold gradient-text">
                      {displayResult.uploadSpeed.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">Mbps</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Ping</span>
                    <span className="font-semibold text-foreground">
                      {displayResult.ping}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Jitter</span>
                    <span className="font-semibold text-foreground">
                      {displayResult.jitter.toFixed(1)}ms
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Test History */}
          <TestHistory
            speedTests={speedTests || []}
            isLoading={isLoadingHistory}
            onClearHistory={() => clearHistory.mutate()}
          />

          {/* Network Info */}
          <NetworkInfo networkInfo={networkInfo} />
        </div>
      </main>

      {/* Optimization Modal */}
      <OptimizationModal
        isOpen={showOptimization}
        onClose={() => setShowOptimization(false)}
      />

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
                  including 4G and 5G networks. Test your speed in major cities like <Link href="/delhi-speed-test" className="text-primary hover:underline">Delhi</Link>, <Link href="/mumbai-speed-test" className="text-primary hover:underline">Mumbai</Link>, and <Link href="/bangalore-speed-test" className="text-primary hover:underline">Bangalore</Link>. 
                  Compare your results with <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast.com</a> or <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Speedtest.net</a>.
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
                <h3 className="text-lg font-semibold text-foreground mb-3">Speed Requirements by City</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">HD Streaming:</strong> 5-10 Mbps</div>
                  <div><strong className="text-foreground">4K Streaming:</strong> 25+ Mbps</div>
                  <div><strong className="text-foreground">Gaming:</strong> 3-6 Mbps + low ping</div>
                  <div><strong className="text-foreground">Video Calls:</strong> 1-4 Mbps</div>
                  <div className="pt-2 border-t border-border/30">
                    <div className="text-xs">Test across India's major tech hubs: <Link href="/chennai-speed-test" className="text-primary hover:underline">Chennai</Link>, <Link href="/hyderabad-speed-test" className="text-primary hover:underline">Hyderabad</Link>, <Link href="/kolkata-speed-test" className="text-primary hover:underline">Kolkata</Link></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


          {/* International Country Speed Tests Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">International Speed Tests</h2>
            <p className="text-center text-muted-foreground mb-8">
              Test your internet speed with servers optimized for your country's network infrastructure
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/us-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇺🇸 USA Speed Test</div>
                <div className="text-xs text-muted-foreground">Verizon, AT&T, Comcast</div>
              </Link>
              <Link href="/uk-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇬🇧 UK Speed Test</div>
                <div className="text-xs text-muted-foreground">BT, Sky, Virgin Media</div>
              </Link>
              <Link href="/au-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇦🇺 Australia Speed Test</div>
                <div className="text-xs text-muted-foreground">NBN, Telstra, Optus</div>
              </Link>
              <Link href="/ca-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇨🇦 Canada Speed Test</div>
                <div className="text-xs text-muted-foreground">Rogers, Bell, Telus</div>
              </Link>
            </div>
          </div>

          {/* Featured City Speed Tests Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Featured City Speed Tests</h2>
            <p className="text-center text-muted-foreground mb-8">
              Get location-specific speed test results optimized for your city's network infrastructure
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/delhi-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">Delhi Speed Test</div>
                <div className="text-xs text-muted-foreground">NCR Network Analysis</div>
              </Link>
              <Link href="/mumbai-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">Mumbai Speed Test</div>
                <div className="text-xs text-muted-foreground">Financial Hub Analysis</div>
              </Link>
              <Link href="/bangalore-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">Bangalore Speed Test</div>
                <div className="text-xs text-muted-foreground">Tech Hub Analysis</div>
              </Link>
              <Link href="/hyderabad-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">Hyderabad Speed Test</div>
                <div className="text-xs text-muted-foreground">IT Hub Analysis</div>
              </Link>
              <Link href="/chennai-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">Chennai Speed Test</div>
                <div className="text-xs text-muted-foreground">South India Analysis</div>
              </Link>
              <Link href="/kolkata-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">Kolkata Speed Test</div>
                <div className="text-xs text-muted-foreground">East India Analysis</div>
              </Link>
            </div>
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
                    and close unnecessary applications consuming bandwidth. Consult your ISP's support pages like <a href="https://www.jio.com/fiber/en-in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Jio Fiber</a> or <a href="https://www.airtel.in/broadband" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Airtel Broadband</a> for optimization tips.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-border/30">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Major City Tests</h4>
              <div className="space-y-2 text-sm">
                <Link href="/delhi-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Delhi Speed Test
                </Link>
                <Link href="/mumbai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Mumbai Speed Test
                </Link>
                <Link href="/bangalore-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Bangalore Speed Test
                </Link>
                <Link href="/chennai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Chennai Speed Test
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Regional Cities</h4>
              <div className="space-y-2 text-sm">
                <Link href="/hyderabad-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Hyderabad Speed Test
                </Link>
                <Link href="/kolkata-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Kolkata Speed Test
                </Link>
                <div className="text-muted-foreground">WiFi Speed Test</div>
                <div className="text-muted-foreground">Fiber Speed Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">External Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speedtest by Ookla
                </a>
                <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Fast.com by Netflix
                </a>
                <a href="https://www.google.com/search?q=internet+speed+test" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Google Speed Test
                </a>
                <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  FCC Broadband Guide
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
                <a href="https://en.wikipedia.org/wiki/Internet_speed_test" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speed Test Info
                </a>
                <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  FCC Speed Guide
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 Speed Test and Boost. Free internet speed test tool for accurate bandwidth measurement. 
              Test your connection speed on any device. Compare with <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast.com</a> and <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Speedtest.net</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
