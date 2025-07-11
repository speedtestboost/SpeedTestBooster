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
import { Play, Wifi, History, Gauge } from "lucide-react";

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
      toast({
        title: "Test failed",
        description: "Failed to complete speed test. Please try again.",
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
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl gradient-bg">
                <Gauge className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">SpeedTest Pro</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="p-2 rounded-full hover:bg-muted/50"
            >
              <History className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
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
      </main>

      {/* Optimization Modal */}
      <OptimizationModal
        isOpen={showOptimization}
        onClose={() => setShowOptimization(false)}
      />
    </div>
  );
}
