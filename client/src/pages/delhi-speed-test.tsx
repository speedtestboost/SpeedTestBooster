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
import { Play, Gauge, Wifi } from "lucide-react";
import { Link } from "wouter";

export default function DelhiSpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  const { toast } = useToast();

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Delhi Internet Speed Test - Check Your Connection Speed | Speed Test & Boost";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your internet speed in Delhi NCR. Get accurate broadband speed results for all major ISPs including BSNL, Airtel, Jio Fiber, and Vi. Free speed test with WiFi optimization for Delhi users.');
    }
  }, []);

  // ... [Rest of the component logic is identical to Mumbai page] ...

  const { data: networkInfo } = useQuery({
    queryKey: ["/api/network-info"],
  });

  const { data: speedTests, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["/api/speed-tests"],
  });

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
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 relative overflow-hidden">
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
                    <path d="M 10 20 A 10 10 0 0 1 30 20" stroke="url(#iconGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                      <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <line x1="20" y1="20" x2="27" y2="14" stroke="url(#iconGradient)" strokeWidth="3" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" values="0 20 20;15 20 20;0 20 20" dur="3s" repeatCount="indefinite"/>
                    </line>
                    <circle cx="20" cy="20" r="2.5" fill="url(#iconGradient)">
                      <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl lg:text-4xl font-bold gradient-text relative">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                    Delhi Speed Test & Boost
                  </span>
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground mt-1 opacity-75">
                  Professional Network Diagnostics for Delhi NCR
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex items-center space-x-6">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">Help & FAQ</Link>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-success/20 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-success">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Delhi-specific SEO Content */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Delhi Internet Speed Test
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Test your internet speed in Delhi NCR and get accurate results for all major ISPs including BSNL, Airtel, Jio Fiber, and Vi. 
            As India's capital city, Delhi requires high-speed internet for government services, businesses, and educational institutions. 
            Check your broadband performance and optimize your WiFi connection with our professional speed test tool designed for Delhi users.
          </p>
        </div>
      </section>

      {/* Main Content - Same layout as Mumbai */}
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

        {/* Mobile Layout */}
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
              <Link href="/bangalore-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Bangalore</div>
                <div className="text-xs text-muted-foreground">Tech Hub Speed Test</div>
              </Link>
              <Link href="/hyderabad-speed-test" className="block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground">Hyderabad</div>
                <div className="text-xs text-muted-foreground">Cyberabad Speed Test</div>
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

      <footer className="bg-card/50 border-t border-border/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Speed Test & Boost. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/help" className="hover:text-primary transition-colors">Help & FAQ</Link>
            </div>
          </div>
        </div>
      </footer>

      <OptimizationModal
        isOpen={showOptimization}
        onClose={() => setShowOptimization(false)}
      />
    </div>
  );
}