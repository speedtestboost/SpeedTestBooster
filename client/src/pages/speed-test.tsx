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
import { Play, Wifi, Monitor, Globe, Zap, CheckCircle2, Activity, BarChart3, Gauge, TrendingUp, Shield, Clock } from "lucide-react";
import { Link } from "wouter";
import type { SpeedTest } from "@shared/schema";
import { loadNetworkInfoWithFallback, type PublicNetworkInfo } from "@/lib/networkInfo";
import { SITE_ORIGIN, setCanonicalHref } from "@/lib/seo";

export default function SpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [liveSpeed, setLiveSpeed] = useState(0);
  const [livePhase, setLivePhase] = useState<"download" | "upload" | "idle">("idle");
  const [showOptimization, setShowOptimization] = useState(false);
  const { toast } = useToast();

  // SEO Meta Tags for homepage
  useEffect(() => {
    document.title = "Free Internet Speed Test Online - No Ads, No Downloads Required";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free internet speed test online with no ads or downloads. Accurate wifi speed test and bandwidth checker. Lightweight speed booster test works on mobile and desktop.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', 'free internet speed test online, speed test no ads, wifi speed test, internet speed booster test, speed test no download, lightweight speed test, accurate speed test, bandwidth test, mobile speed test, speed test for gaming');
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'HTML5 Speed Test - No Apps, No Downloads Required' },
      { property: 'og:description', content: 'Free HTML5 internet speed test - 100% browser-based, no apps or plugins needed. Test WiFi and broadband speeds instantly on any device with our web-based speed checker.' },
      { property: 'og:url', content: 'https://speedtestboost.com/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test & Boost' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://speedtestboost.com/apple-touch-icon.png' },
      { property: 'og:image:alt', content: 'Speed Test & Boost' },
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
      { name: 'twitter:title', content: 'HTML5 Speed Test - No Apps or Downloads Required' },
      { name: 'twitter:description', content: 'Free HTML5 speed test - 100% browser-based. Test internet speed on any device without apps or plugins.' },
      { name: 'twitter:image', content: 'https://speedtestboost.com/apple-touch-icon.png' },
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
    
    // Bing-specific content-language meta tag
    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', 'en-US');
    
    // Canonical: / and /speed-test both prefer the homepage URL (avoid duplicate content signals)
    setCanonicalHref(`${SITE_ORIGIN}/`);
    
    // Hreflang tags for multilingual support
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    const hreflangEn = document.createElement('link');
    hreflangEn.setAttribute('rel', 'alternate');
    hreflangEn.setAttribute('hreflang', 'en');
    hreflangEn.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangEn);

    const hreflangEs = document.createElement('link');
    hreflangEs.setAttribute('rel', 'alternate');
    hreflangEs.setAttribute('hreflang', 'es');
    hreflangEs.setAttribute('href', 'https://speedtestboost.com/es');
    document.head.appendChild(hreflangEs);

    const hreflangId = document.createElement('link');
    hreflangId.setAttribute('rel', 'alternate');
    hreflangId.setAttribute('hreflang', 'id');
    hreflangId.setAttribute('href', 'https://speedtestboost.com/id');
    document.head.appendChild(hreflangId);

    const hreflangPtBr = document.createElement('link');
    hreflangPtBr.setAttribute('rel', 'alternate');
    hreflangPtBr.setAttribute('hreflang', 'pt-BR');
    hreflangPtBr.setAttribute('href', 'https://speedtestboost.com/pt-br');
    document.head.appendChild(hreflangPtBr);

    const hreflangFr = document.createElement('link');
    hreflangFr.setAttribute('rel', 'alternate');
    hreflangFr.setAttribute('hreflang', 'fr');
    hreflangFr.setAttribute('href', 'https://speedtestboost.com/fr');
    document.head.appendChild(hreflangFr);

    const hreflangDefault = document.createElement('link');
    hreflangDefault.setAttribute('rel', 'alternate');
    hreflangDefault.setAttribute('hreflang', 'x-default');
    hreflangDefault.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangDefault);
    
    // Structured Data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://speedtestboost.com/#organization",
          "name": "Speed Test & Boost",
          "url": "https://speedtestboost.com/",
          "logo": "https://speedtestboost.com/apple-touch-icon.png",
        },
        {
          "@type": "WebSite",
          "@id": "https://speedtestboost.com/#website",
          "url": "https://speedtestboost.com/",
          "name": "Speed Test & Boost",
          "description": "Free HTML5 internet speed test - 100% browser-based with no apps, downloads, or plugins required.",
          "inLanguage": "en-US",
          "publisher": { "@id": "https://speedtestboost.com/#organization" },
        },
        {
          "@type": "WebApplication",
          "@id": "https://speedtestboost.com/#webapp",
          "name": "Speed Test & Boost - HTML5 Internet Speed Test",
          "description": "Free HTML5 internet speed test - 100% browser-based with no apps, downloads, or plugins required. Test WiFi and broadband speeds instantly on any device with our web-based speed checker.",
          "url": "https://speedtestboost.com/",
          "applicationCategory": "NetworkingApplication",
          "operatingSystem": "Web Browser",
          "browserRequirements": "Requires HTML5-capable browser",
          "isPartOf": { "@id": "https://speedtestboost.com/#website" },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
          },
          "publisher": { "@id": "https://speedtestboost.com/#organization" },
          "featureList": [
            "HTML5-based speed test (no plugins required)",
            "Browser-based testing (no app downloads)",
            "Cross-platform compatibility (works on any device)",
            "Multi-connection parallel download measurement",
            "Upload speed test",
            "Ping and jitter test",
            "WiFi optimization",
            "Global CDN edge server coverage",
            "All ISP support",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": "https://speedtestboost.com/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does this internet speed test work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our test opens multiple parallel TCP connections to CDN edge servers worldwide and measures how much data can be downloaded in ~12 seconds. The trimmed median of those samples gives you an accurate download Mbps. Upload is measured similarly with parallel POST requests. Ping and jitter are sampled against Cloudflare trace endpoints."
              }
            },
            {
              "@type": "Question",
              "name": "What is a good internet speed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For most households: 25 Mbps download covers basic streaming and browsing. 100 Mbps suits HD video and remote work. 300+ Mbps is comfortable for multiple 4K streams and gaming simultaneously. For gaming, low ping (under 30ms) matters more than raw speed."
              }
            },
            {
              "@type": "Question",
              "name": "Why does my speed test show a different result than my ISP plan?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ISP plans are theoretical maximums over a wired connection. Your actual speed can be lower due to WiFi overhead, router limitations, network congestion, the number of devices sharing the connection, and VPN usage. Test over a wired (Ethernet) connection to see your true line speed."
              }
            },
            {
              "@type": "Question",
              "name": "Is this speed test free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — completely free, no account required, no ads, no app downloads. Works entirely in your browser."
              }
            },
            {
              "@type": "Question",
              "name": "What affects WiFi speed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Distance from your router, physical obstacles (walls, floors), channel congestion from neighbouring networks, router age, number of connected devices, and 2.4 GHz vs 5 GHz band selection all impact WiFi speed. Use the Optimize WiFi feature for personalised tips."
              }
            }
          ]
        },
      ],
    });

    return () => {
      /* Next route sets canonical; avoid resetting here (navigation race). */
    };
  }, []);

  // Fetch network info (API when available; otherwise public geo so static hosting still works)
  const { data: networkInfo } = useQuery<PublicNetworkInfo>({
    queryKey: ["network-info", "v3-geojs"],
    queryFn: loadNetworkInfoWithFallback,
    staleTime: 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1500 * attempt, 4000),
    throwOnError: false,
  });

  // Fetch speed test history — tolerate missing API (empty list)
  const { data: speedTests, isLoading: isLoadingHistory } = useQuery<SpeedTest[]>({
    queryKey: ["/api/speed-tests"],
    queryFn: async () => {
      try {
        const sessionId = getSessionId();
        const res = await fetch("/api/speed-tests", {
          credentials: "include",
          headers: { "X-Session-ID": sessionId },
        });
        if (!res.ok) return [];
        return (await res.json()) as SpeedTest[];
      } catch {
        return [];
      }
    },
    staleTime: 30_000,
    retry: 1,
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
    setLiveSpeed(0);
    setLivePhase("idle");

    try {
      const result = await performSpeedTest({
        onProgress: (progress, status) => {
          setTestProgress(progress);
          setTestStatus(status);
        },
        onLiveSpeed: (mbps, phase) => {
          setLiveSpeed(mbps);
          setLivePhase(phase);
        },
      });

      setCurrentResult(result);
      trackSpeedTest(result);
      trackEvent('speed_test_completed', 'speed_test', 'success');
      saveSpeedTest.mutate(result);
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
      setLiveSpeed(0);
      setLivePhase("idle");
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

      {/* Hero Banner */}
      <div className="gradient-bg py-10 px-4 border-b border-border/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-medium mb-2">
              <Shield className="h-3.5 w-3.5" />
              <span>No account · No ads · No app downloads</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Free Internet &amp; WiFi Speed Test
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Multi-connection test · CDN edge servers · Instant results
            </p>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
              100% browser-based bandwidth test — measures download, upload, ping &amp; jitter using parallel connections for accuracy on any device.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-4">
              <div className="flex items-center space-x-2 text-white/90">
                <Monitor className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">Mobile &amp; Desktop</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Globe className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">Global CDN Servers</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Zap className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">Parallel Connections</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm md:text-base font-medium">100% Free</span>
              </div>
            </div>

            {/* Quick tools nav */}
            <nav aria-label="Quick tools" className="flex flex-wrap justify-center gap-2 pt-4">
              <Link href="/ping-test" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-white/90 text-sm font-medium transition-all">
                <Activity className="h-3.5 w-3.5" />Ping Test
              </Link>
              <Link href="/wifi-analyzer" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-white/90 text-sm font-medium transition-all">
                <BarChart3 className="h-3.5 w-3.5" />WiFi Analyzer
              </Link>
              <Link href="/speed-test-faq" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-white/90 text-sm font-medium transition-all">
                <Gauge className="h-3.5 w-3.5" />Speed FAQ
              </Link>
              <Link href="/ai-speed-test" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-white/90 text-sm font-medium transition-all">
                <TrendingUp className="h-3.5 w-3.5" />AI Speed Test
              </Link>
              <Link href="/internet-speed-requirements" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-white/90 text-sm font-medium transition-all">
                <BarChart3 className="h-3.5 w-3.5" />Speed Guide
              </Link>
              <Link href="/in-speed-test" className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 text-white/90 text-sm font-medium transition-all">
                🇮🇳 India Test
              </Link>
            </nav>
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

            <NetworkInfo networkInfo={networkInfo} />
          </div>

          {/* Center Column — multi-connection HTML5 speed test */}
          <div className="flex flex-col items-center justify-start">
            <div className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
              <p className="text-sm md:text-base font-medium text-foreground flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Multi-connection HTML5 test • CDN edge download • Parallel upload</span>
              </p>
            </div>

            <div className="w-full max-w-md">
              <SpeedGauge
                currentSpeed={displayResult?.downloadSpeed || 0}
                isTestRunning={isTestRunning}
                testProgress={testProgress}
                testStatus={testStatus}
                lastTest={lastTest}
                liveSpeed={liveSpeed}
                livePhase={livePhase}
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
            </div>
          </div>

          {/* Right Column - Results & History */}
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
            liveSpeed={liveSpeed}
            livePhase={livePhase}
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

      {/* ── How It Works ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12" aria-labelledby="how-it-works-heading">
        <h2 id="how-it-works-heading" className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
          How Our Speed Test Works
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Three-phase measurement using multiple parallel connections for results you can trust
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
            <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-4 shadow">
              <Activity className="h-7 w-7 text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Phase 1</span>
            <h3 className="font-bold text-foreground text-lg mb-2">Ping &amp; Jitter</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              14 sequential requests to Cloudflare's global edge measure your latency (ping) and variation (jitter) — the metrics that matter most for gaming and video calls.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
            <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-4 shadow">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Phase 2</span>
            <h3 className="font-bold text-foreground text-lg mb-2">Download Speed</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              6 parallel streams download from CDN edge servers for ~12 seconds. A trimmed median of interval samples eliminates TCP warm-up noise — similar to how Cloudflare and Netflix measure speed.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
            <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-4 shadow">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Phase 3</span>
            <h3 className="font-bold text-foreground text-lg mb-2">Upload Speed</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              4 parallel 2 MiB POST requests saturate your uplink simultaneously, giving a realistic picture of your upload capacity for video calls, cloud backups, and live streaming.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/speed-test-faq" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
            <Clock className="h-4 w-4" />Read full methodology &amp; FAQ →
          </Link>
        </div>
      </section>

      {/* ── Speed Standards Benchmark ───────────────────────────────────── */}
      <section className="bg-muted/30 border-y border-border/40 py-12" aria-labelledby="speed-standards-heading">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 id="speed-standards-heading" className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            Is Your Speed Fast Enough?
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Compare your results against recommended speeds for common activities.
            <Link href="/internet-speed-requirements" className="text-primary hover:underline ml-1">View full speed requirements guide →</Link>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📺", label: "HD Streaming", speed: "5–10 Mbps", ping: "—", color: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/20" },
              { icon: "📡", label: "4K Streaming", speed: "25+ Mbps", ping: "—", color: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/20" },
              { icon: "🎮", label: "Online Gaming", speed: "3–6 Mbps", ping: "<30 ms", color: "from-green-500/10 to-green-500/5", border: "border-green-500/20" },
              { icon: "📹", label: "Video Calls", speed: "1–4 Mbps", ping: "<50 ms", color: "from-orange-500/10 to-orange-500/5", border: "border-orange-500/20" },
              { icon: "🏠", label: "Work From Home", speed: "25+ Mbps", ping: "<60 ms", color: "from-cyan-500/10 to-cyan-500/5", border: "border-cyan-500/20" },
              { icon: "☁️", label: "Cloud Backup", speed: "10+ Mbps↑", ping: "—", color: "from-indigo-500/10 to-indigo-500/5", border: "border-indigo-500/20" },
              { icon: "🎵", label: "Music Streaming", speed: "1 Mbps", ping: "—", color: "from-pink-500/10 to-pink-500/5", border: "border-pink-500/20" },
              { icon: "⚡", label: "Smart Home", speed: "5–25 Mbps", ping: "—", color: "from-yellow-500/10 to-yellow-500/5", border: "border-yellow-500/20" },
            ].map(({ icon, label, speed, ping, color, border }) => (
              <div key={label} className={`p-4 rounded-xl bg-gradient-to-br ${color} border ${border} flex flex-col items-center text-center gap-1`}>
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-semibold text-foreground">{label}</span>
                <span className="text-xs text-primary font-bold">{speed}</span>
                {ping !== "—" && <span className="text-xs text-muted-foreground">Ping {ping}</span>}
              </div>
            ))}
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
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Speed Tests by Country</h2>
            <p className="text-center text-muted-foreground mb-8">
              Country-specific results compared against local ISP benchmarks
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {[
                { href: "/us-speed-test", flag: "🇺🇸", name: "USA", isps: "Verizon, AT&T" },
                { href: "/uk-speed-test", flag: "🇬🇧", name: "UK", isps: "BT, Sky, Virgin" },
                { href: "/in-speed-test", flag: "🇮🇳", name: "India", isps: "Jio, Airtel, BSNL" },
                { href: "/au-speed-test", flag: "🇦🇺", name: "Australia", isps: "NBN, Telstra" },
                { href: "/ca-speed-test", flag: "🇨🇦", name: "Canada", isps: "Rogers, Bell" },
                { href: "/de-speed-test", flag: "🇩🇪", name: "Germany", isps: "Telekom, O2" },
                { href: "/sg-speed-test", flag: "🇸🇬", name: "Singapore", isps: "Singtel, StarHub" },
                { href: "/th-speed-test", flag: "🇹🇭", name: "Thailand", isps: "AIS, True, 3BB" },
                { href: "/fr-speed-test", flag: "🇫🇷", name: "France", isps: "Orange, SFR" },
                { href: "/br-speed-test", flag: "🇧🇷", name: "Brazil", isps: "Claro, Vivo" },
                { href: "/mx-speed-test", flag: "🇲🇽", name: "Mexico", isps: "Telmex, Izzi" },
                { href: "/id-speed-test", flag: "🇮🇩", name: "Indonesia", isps: "Indihome, Biznet" },
                { href: "/my-speed-test", flag: "🇲🇾", name: "Malaysia", isps: "Maxis, Unifi" },
                { href: "/ph-speed-test", flag: "🇵🇭", name: "Philippines", isps: "PLDT, Globe" },
                { href: "/nl-speed-test", flag: "🇳🇱", name: "Netherlands", isps: "KPN, Ziggo" },
                { href: "/es-speed-test", flag: "🇪🇸", name: "Spain", isps: "Movistar, Orange" },
                { href: "/it-speed-test", flag: "🇮🇹", name: "Italy", isps: "TIM, Vodafone" },
                { href: "/za-speed-test", flag: "🇿🇦", name: "South Africa", isps: "Afrihost, Rain" },
                { href: "/ae-speed-test", flag: "🇦🇪", name: "UAE", isps: "Etisalat, du" },
                { href: "/sa-speed-test", flag: "🇸🇦", name: "Saudi Arabia", isps: "STC, Zain" },
                { href: "/pl-speed-test", flag: "🇵🇱", name: "Poland", isps: "Orange, Play" },
                { href: "/ar-speed-test", flag: "🇦🇷", name: "Argentina", isps: "Movistar, Claro" },
              ].map(({ href, flag, name, isps }) => (
                <Link key={href} href={href} className="group block min-h-[4.5rem] p-3 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <div className="text-sm font-medium text-foreground group-hover:text-primary leading-snug">{flag} {name}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">{isps}</div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/internet-providers" className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium">
                Browse all countries &amp; ISP pages →
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

          {/* Speed Test Types Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">Types of Internet Speed Tests</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose the right test for your connection type — WiFi, fiber, mobile data, or broadband.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-xl">📶</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">WiFi Speed Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    Test wireless speed from your router. Identify whether slow speeds are a WiFi issue or an ISP issue by comparing wired vs wireless. Use our <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi Analyzer</Link> to optimize channel and signal strength.
                  </p>
                  <Link href="/wifi-speed-optimization" className="text-sm text-primary hover:text-primary/80 font-medium mt-auto">WiFi Optimization Guide →</Link>
                </CardContent>
              </Card>
              <Card className="card-hover h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 text-xl">⚡</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Fiber &amp; Broadband Speed Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    Verify your fiber or cable broadband plan is delivering its promised speed. Popular in India for Jio Fiber, Airtel Xstream, ACT Fibernet. Check our <Link href="/download-speed-guide" className="text-primary hover:underline">download speed guide</Link> to understand your results.
                  </p>
                  <Link href="/in-speed-test" className="text-sm text-primary hover:text-primary/80 font-medium mt-auto">India Fiber Speed Test →</Link>
                </CardContent>
              </Card>
              <Card className="card-hover h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 text-xl">📱</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Mobile Data Speed Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    Test 4G/5G speed on the go. Our browser-based test works on any smartphone without installing an app. Compare results for <Link href="/in-speed-test" className="text-primary hover:underline">Jio, Vi, Airtel 5G</Link> or any global carrier.
                  </p>
                  <Link href="/ping-test" className="text-sm text-primary hover:text-primary/80 font-medium mt-auto">Check Mobile Ping &amp; Latency →</Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Frequently Asked Questions</h2>
            <p className="text-center text-muted-foreground mb-8">
              Common questions about internet speed tests, results, and optimization.&nbsp;
              <Link href="/speed-test-faq" className="text-primary hover:underline">See full FAQ →</Link>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How does this speed test work?",
                  a: <>Opens 6 parallel download streams to CDN edge servers for ~12 s, samples throughput every 200 ms, then returns a trimmed-median Mbps. Upload uses 4 parallel POST streams. Ping/jitter are sampled from 14 sequential Cloudflare requests. <Link href="/speed-test-faq" className="text-primary hover:underline">Full methodology →</Link></>
                },
                {
                  q: "What is a good internet speed?",
                  a: <>25 Mbps covers basic browsing and HD streaming. 100 Mbps suits most households. 300+ Mbps is comfortable for multiple 4K streams. For gaming, ping under 30 ms matters more than raw speed. <Link href="/internet-speed-requirements" className="text-primary hover:underline">See full requirements →</Link></>
                },
                {
                  q: "Why is my result lower than my ISP plan?",
                  a: "ISP plans are theoretical maximums over a wired connection. WiFi overhead, router age, network congestion, and shared connections all reduce your measured speed. Test with a wired Ethernet cable for your true line speed."
                },
                {
                  q: "What affects WiFi speed?",
                  a: <>Distance from router, walls and floors, 2.4 GHz vs 5 GHz band, channel congestion, and the number of connected devices. Use the <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi Analyzer</Link> or click <strong>"Optimize WiFi Speed"</strong> for personalised tips.</>
                },
                {
                  q: "How can I improve my internet speed?",
                  a: <>Switch to a wired connection, restart your router, move closer to your router, change your WiFi channel, or contact your ISP. Our <Link href="/wifi-speed-optimization" className="text-primary hover:underline">WiFi Optimization Guide</Link> walks through each step.</>
                },
                {
                  q: "Why do different speed tests give different results?",
                  a: "Each tool uses different server locations, connection counts, and scoring methods. Our tool uses Cloudflare CDN edge servers and parallel connections — similar to how Netflix's Fast.com and Cloudflare Speed test work."
                },
              ].map(({ q, a }) => (
                <div key={q} className="p-5 rounded-xl bg-card border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2 text-base">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links and Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-8 border-t border-border/30">
            <div>
              <h4 className="font-semibold text-foreground mb-3">India City Tests</h4>
              <div className="space-y-2 text-sm">
                <Link href="/in-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">India Speed Test</Link>
                <Link href="/delhi-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Delhi Speed Test</Link>
                <Link href="/mumbai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Mumbai Speed Test</Link>
                <Link href="/bangalore-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Bangalore Speed Test</Link>
                <Link href="/chennai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Chennai Speed Test</Link>
                <Link href="/hyderabad-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Hyderabad Speed Test</Link>
                <Link href="/kolkata-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Kolkata Speed Test</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Country Tests</h4>
              <div className="space-y-2 text-sm">
                <Link href="/us-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">USA Speed Test</Link>
                <Link href="/uk-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">UK Speed Test</Link>
                <Link href="/au-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Australia Speed Test</Link>
                <Link href="/ca-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Canada Speed Test</Link>
                <Link href="/de-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Germany Speed Test</Link>
                <Link href="/sg-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">Singapore Speed Test</Link>
                <Link href="/internet-providers" className="block text-primary hover:text-primary/80 font-medium transition-colors">All Countries →</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Guides &amp; Tools</h4>
              <div className="space-y-2 text-sm">
                <Link href="/ping-test" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-ping-test">Ping Test Tool</Link>
                <Link href="/wifi-analyzer" className="block text-muted-foreground hover:text-primary transition-colors">WiFi Analyzer</Link>
                <Link href="/ai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">AI Speed Test</Link>
                <Link href="/download-speed-guide" className="block text-muted-foreground hover:text-primary transition-colors">Download Speed Guide</Link>
                <Link href="/upload-speed-guide" className="block text-muted-foreground hover:text-primary transition-colors">Upload Speed Guide</Link>
                <Link href="/wifi-speed-optimization" className="block text-muted-foreground hover:text-primary transition-colors">WiFi Optimization</Link>
                <Link href="/internet-speed-requirements" className="block text-muted-foreground hover:text-primary transition-colors">Speed Requirements</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">ISP Speed Tests</h4>
              <div className="space-y-2 text-sm">
                <Link href="/providers/us/comcast" className="block text-muted-foreground hover:text-primary transition-colors">Comcast Speed Test</Link>
                <Link href="/providers/us/verizon" className="block text-muted-foreground hover:text-primary transition-colors">Verizon Speed Test</Link>
                <Link href="/providers/uk/bt" className="block text-muted-foreground hover:text-primary transition-colors">BT Speed Test</Link>
                <Link href="/providers/uk/sky" className="block text-muted-foreground hover:text-primary transition-colors">Sky Speed Test</Link>
                <Link href="/providers/in/jio-fiber" className="block text-muted-foreground hover:text-primary transition-colors">Jio Fiber Speed Test</Link>
                <Link href="/providers/in/airtel-broadband" className="block text-muted-foreground hover:text-primary transition-colors">Airtel Speed Test</Link>
                <Link href="/internet-providers" className="block text-primary hover:text-primary/80 font-medium transition-colors">All ISPs →</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">About &amp; Help</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</Link>
                <Link href="/help" className="block text-muted-foreground hover:text-primary transition-colors">Help &amp; FAQ</Link>
                <Link href="/speed-test-faq" className="block text-muted-foreground hover:text-primary transition-colors">Speed Test FAQ</Link>
                <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">Fast.com (Netflix)</a>
                <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">Speedtest.net (Ookla)</a>
                <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">FCC Broadband Guide</a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2026 Speed Test &amp; Boost — Free internet speed test for accurate bandwidth measurement.
              Compare with <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast.com</a> and <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Speedtest.net</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
