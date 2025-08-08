import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { getSessionId } from "@/lib/sessionManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Wifi, Download, Upload, Clock, X } from "lucide-react";
import { performSpeedTest, type SpeedTestResult } from "@/lib/speedTest";
import { useToast } from "@/hooks/use-toast";
import AnimatedCircularProgress from "@/components/AnimatedCircularProgress";
import AnimatedConnectionVisualization from "@/components/AnimatedConnectionVisualization";
import AnimatedSpeedIndicator from "@/components/AnimatedSpeedIndicator";
import { motion, AnimatePresence } from "framer-motion";

interface SpeedTestModalProps {
  onClose: () => void;
}

export default function SpeedTestModal({ onClose }: SpeedTestModalProps) {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testStatus, setTestStatus] = useState("Ready to test");
  const [currentResult, setCurrentResult] = useState<SpeedTestResult | null>(null);
  const [currentPhase, setCurrentPhase] = useState<"idle" | "ping" | "download" | "upload" | "jitter" | "complete">("idle");
  const [realTimeStats, setRealTimeStats] = useState({
    download: 0,
    upload: 0,
    ping: 0,
    jitter: 0,
    maxDownload: 0,
    maxUpload: 0
  });
  const { toast } = useToast();

  const speedTestMutation = useMutation({
    mutationFn: async () => {
      const result = await performSpeedTest({
        onProgress: (progress: number, status: string) => {
          setTestProgress(progress);
          setTestStatus(status);
          
          // Determine current phase and update real-time stats
          if (status.includes("ping")) {
            setCurrentPhase("ping");
          } else if (status.includes("download")) {
            setCurrentPhase("download");
            // Simulate real-time download speed updates
            const simulatedSpeed = Math.random() * 100 + 50;
            setRealTimeStats(prev => ({
              ...prev,
              download: simulatedSpeed,
              maxDownload: Math.max(prev.maxDownload, simulatedSpeed)
            }));
          } else if (status.includes("upload")) {
            setCurrentPhase("upload");
            // Simulate real-time upload speed updates
            const simulatedSpeed = Math.random() * 50 + 20;
            setRealTimeStats(prev => ({
              ...prev,
              upload: simulatedSpeed,
              maxUpload: Math.max(prev.maxUpload, simulatedSpeed)
            }));
          } else if (status.includes("jitter")) {
            setCurrentPhase("jitter");
          }
        }
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
      setCurrentPhase("complete");
      setTimeout(() => {
        setIsTestRunning(false);
        setTestProgress(0);
        setTestStatus("Ready to test");
        setCurrentPhase("idle");
        setRealTimeStats({
          download: 0,
          upload: 0,
          ping: 0,
          jitter: 0,
          maxDownload: 0,
          maxUpload: 0
        });
      }, 2000);
    }
  });

  const startSpeedTest = () => {
    if (isTestRunning) return;
    
    setIsTestRunning(true);
    setCurrentResult(null);
    setTestProgress(0);
    setTestStatus("Preparing test...");
    setCurrentPhase("idle");
    setRealTimeStats({
      download: 0,
      upload: 0,
      ping: 0,
      jitter: 0,
      maxDownload: 0,
      maxUpload: 0
    });
    speedTestMutation.mutate();
  };

  const handleClose = () => {
    if (!isTestRunning) {
      onClose();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: isTestRunning ? 360 : 0 }}
                transition={{ duration: 2, repeat: isTestRunning ? Infinity : 0, ease: "linear" }}
              >
                <Zap className="h-5 w-5 text-primary" />
              </motion.div>
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
          {!currentResult && !isTestRunning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button
                onClick={startSpeedTest}
                size="lg"
                className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-105 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Start Interactive Speed Test</span>
                </div>
              </Button>
            </motion.div>
          )}

          {/* Interactive Test Progress */}
          {isTestRunning && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Main Progress Circle */}
                <div className="flex justify-center">
                  <AnimatedCircularProgress
                    progress={testProgress}
                    phase={currentPhase}
                    label={testStatus}
                  />
                </div>

                {/* Connection Visualization */}
                <AnimatedConnectionVisualization
                  phase={currentPhase}
                  isActive={isTestRunning}
                />

                {/* Real-time Speed Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnimatedSpeedIndicator
                    currentSpeed={realTimeStats.download}
                    maxSpeed={realTimeStats.maxDownload}
                    label="Download Speed"
                    color="rgb(34, 197, 94)"
                    unit="Mbps"
                    isActive={currentPhase === "download"}
                    icon={<Download className="h-5 w-5" />}
                  />
                  <AnimatedSpeedIndicator
                    currentSpeed={realTimeStats.upload}
                    maxSpeed={realTimeStats.maxUpload}
                    label="Upload Speed"
                    color="rgb(59, 130, 246)"
                    unit="Mbps"
                    isActive={currentPhase === "upload"}
                    icon={<Upload className="h-5 w-5" />}
                  />
                </div>

                {/* Status Text */}
                <motion.p
                  key={testStatus}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  {testStatus}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Animated Results */}
          {currentResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  🎉 Test Complete!
                </motion.h3>
                <p className="text-muted-foreground">Here are your internet speed results</p>
              </div>
              
              {/* Animated Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { 
                    icon: <Download className="h-7 w-7" />, 
                    value: currentResult.downloadSpeed, 
                    label: "Download", 
                    unit: "Mbps", 
                    color: "text-green-500",
                    bgColor: "bg-green-500/10",
                    delay: 0
                  },
                  { 
                    icon: <Upload className="h-7 w-7" />, 
                    value: currentResult.uploadSpeed, 
                    label: "Upload", 
                    unit: "Mbps", 
                    color: "text-blue-500",
                    bgColor: "bg-blue-500/10",
                    delay: 0.1
                  },
                  { 
                    icon: <Clock className="h-7 w-7" />, 
                    value: currentResult.ping, 
                    label: "Ping", 
                    unit: "ms", 
                    color: "text-orange-500",
                    bgColor: "bg-orange-500/10",
                    delay: 0.2
                  },
                  { 
                    icon: <Wifi className="h-7 w-7" />, 
                    value: currentResult.jitter, 
                    label: "Jitter", 
                    unit: "ms", 
                    color: "text-purple-500",
                    bgColor: "bg-purple-500/10",
                    delay: 0.3
                  }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: metric.delay, type: "spring", stiffness: 150 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <CardContent className={`p-6 text-center relative ${metric.bgColor}`}>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: metric.delay + 0.2, type: "spring", stiffness: 200 }}
                          className={`${metric.color} mx-auto mb-3`}
                        >
                          {metric.icon}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: metric.delay + 0.4 }}
                          className={`text-3xl font-bold mb-1 ${metric.color}`}
                        >
                          {metric.value}
                        </motion.div>
                        <div className="text-sm text-muted-foreground">
                          {metric.unit} {metric.label}
                        </div>
                        
                        {/* Animated accent line */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "40%" }}
                          transition={{ delay: metric.delay + 0.6, duration: 0.5 }}
                          className={`h-0.5 mx-auto mt-2 rounded-full ${metric.color.replace('text-', 'bg-')}`}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-4 pt-6"
              >
                <Button 
                  onClick={startSpeedTest} 
                  variant="outline" 
                  className="hover:scale-105 transition-all duration-200"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Test Again
                </Button>
                <Button 
                  onClick={handleClose}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-105 transition-all duration-200"
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}