import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { getSessionId } from "@/lib/sessionManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SpeedGauge from "@/components/SpeedGauge";
import TestHistory from "@/components/TestHistory";
import NetworkInfo from "@/components/NetworkInfo";
import OptimizationModal from "@/components/OptimizationModal";
import Header from "@/components/Header";
import { performSpeedTest, type SpeedTestResult } from "@/lib/speedTest";
import { trackEvent, trackSpeedTest, trackWifiOptimization } from "@/lib/analytics";
import { Play, Wifi, Monitor, Globe, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { SpeedTest } from "@shared/schema";
import { useTranslation } from "@/hooks/useTranslation";
import { fetchNetworkData } from "@/lib/networkUtils";

type NetworkInfo = {
  ipAddress: string;
  connectionType: string;
  serverLocation: string;
  isp: string;
};

export default function SpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  const { toast } = useToast();
  
  // Multilingual support with automatic language detection
  const { t, currentLanguage, isLoading: isTranslationLoading } = useTranslation();

  // SEO Meta Tags and multilingual setup
  useEffect(() => {
    if (isTranslationLoading || !t) return;
    
    // Update document title and meta tags with translations
    document.title = t.title;
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.metaDescription);
    }
    
    // Keywords meta tag with high-volume, low-competition keywords
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    
    // Optimize for top-performing keywords from analytics data
    const highValueKeywords = [
      // Primary high-volume keywords (from analytics data)
      'wifi speed test', 'internet speed test', 'speed test', 'fiber speed test', 'net speed test',
      'free internet speed test', 'broadband speed test', 'wifi test', 'speed test online',
      'internet speed check', 'bandwidth test', 'network speed test', 'data speed test',
      
      // Long-tail high-intent keywords  
      'wifi speed test online free', 'internet speed test free online', 'speed test wifi free',
      'free wifi speed test', 'online internet speed test', 'wifi speed checker free',
      'internet speed test tool', 'accurate internet speed test', 'real time speed test',
      
      // Geographic keywords for better local ranking
      'speed test india', 'wifi speed test mumbai', 'internet speed test delhi',
      'broadband speed test bangalore', 'speed test chennai', 'fiber speed test india',
      
      // ISP and technology specific keywords
      'jio fiber speed test', 'airtel speed test', 'bsnl speed test', 'vi speed test',
      '5g speed test', 'wifi 6 speed test', 'ethernet speed test',
      
      // Problem-solving keywords (high commercial intent)
      'slow internet speed test', 'wifi troubleshooting speed test', 'internet not working speed test',
      'check internet speed', 'test my wifi speed', 'measure internet speed',
      
      // Comparison keywords (high commercial value)
      'speed test vs fast.com', 'best free speed test', 'accurate speed test online',
      'speed test no download', 'html5 speed test', 'javascript speed test'
    ];
    
    keywords.setAttribute('content', `${t.keywords}, ${highValueKeywords.join(', ')}`);
    
    // Open Graph tags with translations
    const currentRoute = currentLanguage === 'en' ? '/' : `/${currentLanguage === 'pt-BR' ? 'pt-br' : currentLanguage}`;
    const ogTags = [
      { property: 'og:title', content: t.title },
      { property: 'og:description', content: t.metaDescription },
      { property: 'og:url', content: `https://speedtestboost.com${currentRoute}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test & Boost' },
      { property: 'og:locale', content: currentLanguage === 'en' ? 'en_US' : currentLanguage === 'es' ? 'es_ES' : currentLanguage === 'pt-BR' ? 'pt_BR' : currentLanguage === 'fr' ? 'fr_FR' : currentLanguage === 'id' ? 'id_ID' : currentLanguage === 'de' ? 'de_DE' : 'en_US' }
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
    
    // Twitter Card tags with translations
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: t.title },
      { name: 'twitter:description', content: t.metaDescription }
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', tag.content);
    });
    
    // Language-specific content-language meta tag
    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', currentLanguage === 'en' ? 'en-US' : currentLanguage === 'pt-BR' ? 'pt-BR' : currentLanguage);
    
    // Canonical URL with language support
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://speedtestboost.com${currentRoute}`;
    
    // Hreflang tags for multilingual SEO - handled by useTranslation hook
    
    // Structured Data (JSON-LD) with multilingual support
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }
    
    const currency = currentLanguage === 'en' ? 'USD' : currentLanguage === 'es' ? 'EUR' : currentLanguage === 'pt-BR' ? 'BRL' : currentLanguage === 'fr' ? 'EUR' : currentLanguage === 'id' ? 'IDR' : currentLanguage === 'de' ? 'EUR' : 'USD';
    
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `Speed Test & Boost - ${t.heroTitle}`,
      "description": t.metaDescription,
      "url": `https://speedtestboost.com${currentRoute}`,
      "inLanguage": currentLanguage,
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires HTML5-capable browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": currency
      },
      "creator": {
        "@type": "Organization",
        "name": "Speed Test & Boost",
        "url": "https://speedtestboost.com/"
      },
      "featureList": [
        t.noPlugins,
        t.noDownloads,
        t.crossPlatform,
        t.downloadSpeed,
        t.uploadSpeed,
        t.ping,
        t.wifiAnalyzer,
        t.globalServers,
        t.allISPs
      ]
    });

    return () => {
      // Cleanup handled by useTranslation hook
    };
  }, [t, currentLanguage, isTranslationLoading]);

  // Fetch network info using client-side utility
  const { data: networkInfo } = useQuery<NetworkInfo>({
    queryKey: ["network-info"],
    queryFn: fetchNetworkData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Fetch speed test history
  const { data: speedTests, isLoading: isLoadingHistory } = useQuery<SpeedTest[]>({
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
      trackEvent('history_cleared', 'user_action', 'speed_test_history');
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

    trackEvent('speed_test_started', 'speed_test', 'homepage');

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
      
      trackSpeedTest(result);
      trackEvent('speed_test_completed', 'speed_test', 'success');
    } catch (error) {
      console.error('Speed test error:', error);
      trackEvent('speed_test_failed', 'speed_test', 'error');
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
    trackWifiOptimization('start');
    trackEvent('wifi_optimization_clicked', 'optimization', 'homepage');
    setShowOptimization(true);
  };

  const lastTest = speedTests?.[0];
  const displayResult = currentResult || lastTest;

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/" />

      {/* HTML5 Hero Banner */}
      <div className="gradient-bg py-8 px-4 border-b border-border/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              {t.heroSubtitle}
            </p>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
              {t.heroDescription}
            </p>
            
            {/* Feature Icons */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-4">
              <div className="flex items-center space-x-2 text-white/90">
                <Monitor className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">{t.worksAnywhere}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Globe className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">{t.noApps}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Zap className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">{t.instantResults}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">{t.free}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Desktop Layout - Three Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Left Column - Connection Status & Network Info */}
          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">{t.connected}</span>
                  </div>
                  <div className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-muted/50">
                    {networkInfo?.connectionType || "WiFi"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">{t.ipAddress}</div>
                  <div className="font-mono text-foreground text-lg font-semibold">
                    {networkInfo?.ipAddress || "Loading..."}
                  </div>
                </div>
              </CardContent>
            </Card>

            <NetworkInfo networkInfo={networkInfo} />
          </div>

          {/* Center Column - Speed Gauge & Test Controls */}
          <div className="flex flex-col items-center justify-start">
            {/* HTML5 Badge */}
            <div className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
              <p className="text-sm md:text-base font-medium text-foreground flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>100% Web-Based HTML5 Test • No Flash • No Java • Works Everywhere</span>
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <SpeedGauge
                currentSpeed={displayResult?.downloadSpeed || 0}
                isTestRunning={isTestRunning}
                testProgress={testProgress}
                testStatus={testStatus}
                lastTest={lastTest}
              />
              
              <div className="space-y-4 mt-6">
                <Button
                  onClick={handleStartTest}
                  disabled={isTestRunning}
                  className="w-full gradient-bg text-white rounded-2xl py-8 px-8 font-bold text-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      <Play className="h-8 w-8" />
                    </div>
                    <span>{isTestRunning ? t.runningTest : t.startTest}</span>
                  </div>
                </Button>

                <Button
                  onClick={handleOptimizeWifi}
                  disabled={isTestRunning}
                  className="w-full bg-secondary text-secondary-foreground rounded-2xl py-8 px-8 font-bold text-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      <Wifi className="h-8 w-8" />
                    </div>
                    <span>{t.optimize}</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Results & History */}
          <div className="space-y-6">
            {displayResult && (
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{t.latestResults}</h3>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">{t.downloadSpeed}</div>
                      <div className="text-3xl font-bold gradient-text">
                        {displayResult.downloadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">{t.mbps}</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">{t.uploadSpeed}</div>
                      <div className="text-3xl font-bold gradient-text">
                        {displayResult.uploadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">{t.mbps}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">{t.ping}</div>
                        <div className="text-xl font-bold text-foreground">
                          {displayResult.ping}{t.ms}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">{t.jitter}</div>
                        <div className="text-xl font-bold text-foreground">
                          {displayResult.jitter.toFixed(1)}{t.ms}
                        </div>
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

          <SpeedGauge
            currentSpeed={displayResult?.downloadSpeed || 0}
            isTestRunning={isTestRunning}
            testProgress={testProgress}
            testStatus={testStatus}
            lastTest={lastTest}
          />

          <div className="space-y-4">
            <Button
              onClick={handleStartTest}
              disabled={isTestRunning}
              className="w-full gradient-bg text-white rounded-2xl py-8 px-8 font-bold text-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  <Play className="h-8 w-8" />
                </div>
                <span>{isTestRunning ? "Running Test..." : "Start Speed Test"}</span>
              </div>
            </Button>

            <Button
              onClick={handleOptimizeWifi}
              disabled={isTestRunning}
              className="w-full bg-secondary text-secondary-foreground rounded-2xl py-8 px-8 font-bold text-xl hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  <Wifi className="h-8 w-8" />
                </div>
                <span>Optimize WiFi Speed</span>
              </div>
            </Button>
          </div>

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

          <TestHistory
            speedTests={speedTests || []}
            isLoading={isLoadingHistory}
            onClearHistory={() => clearHistory.mutate()}
          />

          <NetworkInfo networkInfo={networkInfo} />
        </div>
      </main>

      <OptimizationModal
        isOpen={showOptimization}
        onClose={() => setShowOptimization(false)}
      />

      {/* SEO-Optimized Footer Content */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Educational Content Section - Optimized for High-Volume Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Free WiFi Speed Test & Internet Speed Test</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our free WiFi speed test and internet speed test measures download speed, upload speed, and ping latency with accurate results. 
                  Test your WiFi speed, run a fiber speed test, or check broadband speed for connections including 4G, 5G, and WiFi 6 networks. 
                  Free internet speed test online with no download required - test your speed in <Link href="/delhi-speed-test" className="text-primary hover:underline">Delhi</Link>, <Link href="/mumbai-speed-test" className="text-primary hover:underline">Mumbai</Link>, and <Link href="/bangalore-speed-test" className="text-primary hover:underline">Bangalore</Link>. 
                  Our speed test tool provides more accurate results than <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast.com</a> or <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Speedtest.net</a> with real-time measurements.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">WiFi Speed Test Results & Bandwidth Test Analysis</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">Download Speed Test:</strong> Measures how fast you receive data (streaming, downloads)</div>
                  <div><strong className="text-foreground">Upload Speed Test:</strong> Measures how fast you send data (video calls, file uploads)</div>
                  <div><strong className="text-foreground">Ping Test:</strong> Network response time in milliseconds (gaming, video calls)</div>
                  <div><strong className="text-foreground">Jitter Test:</strong> Network stability measurement for consistent performance</div>
                  <div className="pt-2 text-xs"><strong>Net Speed Test Tip:</strong> Test multiple times for accurate internet speed measurement</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Internet Speed Requirements & Fiber Speed Test Guide</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">HD Streaming (Netflix, YouTube):</strong> 5-10 Mbps download speed</div>
                  <div><strong className="text-foreground">4K Streaming & UHD:</strong> 25+ Mbps fiber speed test recommended</div>
                  <div><strong className="text-foreground">Online Gaming:</strong> 3-6 Mbps + low ping (under 50ms)</div>
                  <div><strong className="text-foreground">Video Calls (Zoom, Teams):</strong> 1-4 Mbps upload speed</div>
                  <div><strong className="text-foreground">WiFi 6 & 5G Speed:</strong> 100+ Mbps for optimal performance</div>
                  <div className="pt-2 border-t border-border/30">
                    <div className="text-xs">Free speed test across India: <Link href="/chennai-speed-test" className="text-primary hover:underline">Chennai Speed Test</Link>, <Link href="/hyderabad-speed-test" className="text-primary hover:underline">Hyderabad WiFi Test</Link>, <Link href="/kolkata-speed-test" className="text-primary hover:underline">Kolkata Broadband Test</Link></div>
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

          {/* Speed Guide Articles Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Expert Speed Guides & Optimization</h2>
            <p className="text-center text-muted-foreground mb-8">
              Comprehensive guides to understand, test, and optimize your internet connection for maximum performance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover group h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 text-2xl">
                      ⬇️
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Download Speed Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    Complete guide to understanding download speeds, requirements for different activities, and optimization techniques for streaming, gaming, and browsing.
                  </p>
                  <Link 
                    href="/download-speed-guide" 
                    data-testid="card-download-speed-guide"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm mt-auto"
                  >
                    Read Complete Guide →
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-hover group h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 text-2xl">
                      ⬆️
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Upload Speed Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    Essential upload speed knowledge for video calls, file sharing, streaming, and remote work. Learn requirements and improvement strategies.
                  </p>
                  <Link 
                    href="/upload-speed-guide" 
                    data-testid="card-upload-speed-guide"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm mt-auto"
                  >
                    Read Complete Guide →
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-hover group h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4 text-2xl">
                      📶
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">WiFi Optimization Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    Advanced WiFi optimization techniques, troubleshooting tips, and our interactive WiFi optimization tool to maximize your wireless performance.
                  </p>
                  <Link 
                    href="/wifi-speed-optimization" 
                    data-testid="card-wifi-optimization-guide"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm mt-auto"
                  >
                    Read Complete Guide →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Professional WiFi Analyzer & Network Tools Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Professional WiFi Analyzer & Network Tools</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
              Advanced network diagnostics and WiFi optimization suite designed for IT professionals, network administrators, and power users who demand comprehensive network analysis
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main WiFi Analyzer Card */}
              <div className="lg:col-span-2">
                <Card className="card-hover group h-full bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-20 h-20 bg-primary/15 rounded-2xl flex items-center justify-center mr-6 text-4xl">
                        📡
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">WiFi Analyzer & Network Diagnostics</h3>
                        <p className="text-primary font-medium">Professional Network Analysis Tool</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Comprehensive WiFi network analysis with real-time signal monitoring, channel optimization, 
                      interference detection, and advanced network diagnostics. Perfect for troubleshooting 
                      connectivity issues and optimizing network performance.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          📊
                        </div>
                        <span className="text-sm font-medium text-foreground">Real-time Signal Analysis</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          ⚙️
                        </div>
                        <span className="text-sm font-medium text-foreground">Channel Optimization</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          🔍
                        </div>
                        <span className="text-sm font-medium text-foreground">Interference Detection</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          🩺
                        </div>
                        <span className="text-sm font-medium text-foreground">Network Diagnostics</span>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <Link 
                        href="/wifi-analyzer" 
                        data-testid="card-wifi-analyzer"
                        className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
                      >
                        Launch WiFi Analyzer
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Features */}
              <div className="space-y-6">
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-2xl">
                      ⚡
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Speed Optimization</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automated WiFi optimization with intelligent QoS configuration and bandwidth management for maximum performance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-2xl">
                      📋
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Professional Reports</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Generate comprehensive network analysis reports with detailed insights and recommendations for IT documentation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Speed Test Types Section - Optimized for High-Volume Keywords */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Free WiFi Speed Test & Internet Speed Test Online</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Run free internet speed test online with our WiFi speed test, fiber speed test, and broadband speed checker. 
              Test your WiFi speed, check internet speed, and measure bandwidth with accurate results - no download required.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">WiFi Speed Test Free Online</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Free WiFi speed test online to check WiFi speed, test WiFi signal strength, and run WiFi speed checker. 
                    Test my WiFi speed with accurate measurements for WiFi 6, WiFi 5, and all wireless networks. 
                    WiFi speed test free with real-time results - no app download required.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Fiber Speed Test & Broadband Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    My fiber speed test for Jio Fiber speed test, Airtel Xstream Fiber, ACT Fibernet speed test, and BSNL fiber. 
                    Run fiber speed test to check internet speed and broadband speed test with accurate fiber optic measurements. 
                    Best fiber speed test tool for high-speed internet connections.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Net Speed Test & Bandwidth Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Data speed test online, net speed test, and bandwidth test for mobile and broadband connections. 
                    Test internet speed, check my internet speed, and run speed test with accurate 4G, 5G, and broadband measurements. 
                    Free net speed test with download speed, upload speed, and ping test results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section - Optimized for High-Volume Search Queries */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">WiFi Speed Test & Internet Speed Test FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">How to run free WiFi speed test online?</h4>
                  <p className="text-sm text-muted-foreground">
                    Click "Start Test" to run our free WiFi speed test. Our internet speed test online checks download speed, upload speed, ping, and jitter in seconds. 
                    Free speed test works on all devices - no download, no app required. Test WiFi speed instantly with accurate results.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What affects my WiFi speed test results?</h4>
                  <p className="text-sm text-muted-foreground">
                    WiFi interference, network congestion, router distance, device limitations, background downloads, and ISP throttling 
                    can affect your internet speed test results. Run multiple speed tests for accurate measurements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Which is better: WiFi speed test vs Ethernet speed test?</h4>
                  <p className="text-sm text-muted-foreground">
                    Ethernet speed test typically shows faster, more stable results than WiFi speed test. 
                    Run both tests to compare - WiFi speeds are usually 20-50% slower than wired connections.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Is this free internet speed test accurate?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! Our free internet speed test online provides accurate results with real servers. 
                    Free WiFi speed test, free broadband test, no signup required. Check internet speed test free anytime with reliable measurements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">How to improve WiFi speed test results?</h4>
                  <p className="text-sm text-muted-foreground">
                    Upgrade internet plan, use WiFi 6 router, position router centrally, reduce WiFi interference, 
                    update device drivers, and close bandwidth-heavy applications. Test speed before and after changes.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What's a good internet speed test result?</h4>
                  <p className="text-sm text-muted-foreground">
                    25+ Mbps download for streaming, 3+ Mbps upload for video calls, under 50ms ping for gaming. 
                    Fiber speed test results are typically 100+ Mbps. 5G speed test can reach 200+ Mbps.
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
                <Link href="/ping-test" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-ping-test">
                  Ping Test Tool
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
