import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { getSessionId } from "@/lib/sessionManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Wifi, Download, Upload, Clock, X } from "lucide-react";
import { performSpeedTest, type SpeedTestResult } from "@/lib/speedTest";
import { useToast } from "@/hooks/use-toast";

interface SpeedTestModalProps {
  onClose: () => void;
}

export default function SpeedTestModal({ onClose }: SpeedTestModalProps) {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const { toast } = useToast();

  const speedTestMutation = useMutation({
    mutationFn: async () => {
      const result = await performSpeedTest((progress, status) => {
        setTestProgress(progress);
        setTestStatus(status);
      });
      return result;
    },
    onSuccess: (result) => {
      setCurrentResult(result);
      
      // Save the result to the database
      const sessionId = getSessionId();
      fetch('/api/speed-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result, sessionId })
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/speed-tests'] });
      });
      
      toast({
        title: "Speed test completed!",
        description: `Download: ${result.downloadSpeed} Mbps, Upload: ${result.uploadSpeed} Mbps`,
      });
    },
    onError: (error) => {
      console.error('Speed test failed:', error);
      toast({
        title: "Speed test failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsTestRunning(false);
      setTestProgress(0);
      setTestStatus("Ready to test");
    }
  });

  const startSpeedTest = () => {
    if (isTestRunning) return;
    
    setIsTestRunning(true);
    setCurrentResult(null);
    setTestProgress(0);
    setTestStatus("Preparing test...");
    speedTestMutation.mutate();
  };

  const handleClose = () => {
    if (!isTestRunning) {
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Internet Speed Test</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isTestRunning}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Speed Test Button */}
          {!currentResult && (
            <div className="text-center">
              <Button
                onClick={startSpeedTest}
                disabled={isTestRunning}
                size="lg"
                className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                {isTestRunning ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Testing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Start Speed Test</span>
                  </div>
                )}
              </Button>
            </div>
          )}

          {/* Progress Bar */}
          {isTestRunning && (
            <div className="space-y-3">
              <Progress value={testProgress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">{testStatus}</p>
            </div>
          )}

          {/* Results */}
          {currentResult && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Test Results</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Download className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-500">
                      {currentResult.downloadSpeed}
                    </div>
                    <div className="text-sm text-muted-foreground">Mbps Download</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Upload className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-500">
                      {currentResult.uploadSpeed}
                    </div>
                    <div className="text-sm text-muted-foreground">Mbps Upload</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-500">
                      {currentResult.ping}
                    </div>
                    <div className="text-sm text-muted-foreground">ms Ping</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Wifi className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-500">
                      {currentResult.jitter}
                    </div>
                    <div className="text-sm text-muted-foreground">ms Jitter</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center pt-4">
                <Button onClick={startSpeedTest} variant="outline" className="mr-2">
                  Test Again
                </Button>
                <Button onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}