import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import SpeedGauge from "@/components/SpeedGauge";
import TestHistory from "@/components/TestHistory";
import NetworkInfo from "@/components/NetworkInfo";
import OptimizationModal from "@/components/OptimizationModal";
import { performSpeedTest, type SpeedTestResult } from "@/lib/speedTest";
import { Play, Wifi, Gauge } from "lucide-react";

export default function SpeedTest() {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  const { toast } = useToast();

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
      const response = await fetch("/api/speed-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
      const response = await fetch("/api/speed-tests", {
        method: "DELETE",
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
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl gradient-bg">
                <Gauge className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold gradient-text">Speed Test and Boost</h1>
            </div>

          </div>
        </div>
      </header>

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

            {/* Test Controls */}
            <Card className="card-hover">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Speed Test</h3>
                <Button
                  onClick={handleStartTest}
                  disabled={isTestRunning}
                  className="w-full gradient-bg text-white rounded-xl py-6 px-6 font-bold text-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 glow-effect"
                  size="lg"
                >
                  <Play className="mr-3 h-6 w-6" />
                  {isTestRunning ? "Running Test..." : "Start Speed Test"}
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
                  <Wifi className="mr-3 h-6 w-6" />
                  Optimize WiFi Speed
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
              <Play className="mr-3 h-6 w-6" />
              {isTestRunning ? "Running Test..." : "Start Speed Test"}
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
              <Wifi className="mr-3 h-6 w-6" />
              Optimize WiFi Speed
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
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>How It Works</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Contact Us</div>
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
    </div>
  );
}
