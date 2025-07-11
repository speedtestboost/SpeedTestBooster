import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wifi, Check, Loader2 } from "lucide-react";

interface OptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OptimizationStep {
  id: string;
  label: string;
  duration: number;
  status: "pending" | "running" | "completed";
}

export default function OptimizationModal({ isOpen, onClose }: OptimizationModalProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [steps, setSteps] = useState<OptimizationStep[]>([
    { id: "scan", label: "Scanning WiFi channels", duration: 2000, status: "pending" },
    { id: "bandwidth", label: "Optimizing bandwidth allocation", duration: 2500, status: "pending" },
    { id: "cache", label: "Clearing network cache", duration: 1500, status: "pending" },
    { id: "qos", label: "Configuring QoS settings", duration: 2000, status: "pending" },
    { id: "finalize", label: "Finalizing optimizations", duration: 1000, status: "pending" }
  ]);

  useEffect(() => {
    if (isOpen && !isOptimizing && !isComplete) {
      startOptimization();
    }
  }, [isOpen]);

  const startOptimization = async () => {
    setIsOptimizing(true);
    setIsComplete(false);
    
    // Reset all steps to pending
    setSteps(steps => steps.map(step => ({ ...step, status: "pending" as const })));
    
    // Process each step
    for (let i = 0; i < steps.length; i++) {
      // Set current step to running
      setSteps(prevSteps => 
        prevSteps.map((step, index) => 
          index === i ? { ...step, status: "running" as const } : step
        )
      );
      
      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      
      // Set current step to completed
      setSteps(prevSteps => 
        prevSteps.map((step, index) => 
          index === i ? { ...step, status: "completed" as const } : step
        )
      );
    }
    
    setIsOptimizing(false);
    setIsComplete(true);
  };

  const handleClose = () => {
    if (!isOptimizing) {
      setIsComplete(false);
      setSteps(steps => steps.map(step => ({ ...step, status: "pending" as const })));
      onClose();
    }
  };

  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center glow-effect">
              <Wifi className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-lg font-semibold text-foreground">
              WiFi Optimization
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-center">
              {isComplete ? "Optimization complete! Your WiFi has been optimized." : "Optimizing your connection for better performance..."}
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {!isComplete ? (
            <>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                    <span className="text-sm text-foreground">{step.label}</span>
                    <div className="flex items-center">
                      {step.status === "completed" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : step.status === "running" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-muted rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3 bg-muted/30" />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Optimization Complete
                  </p>
                </div>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  Your WiFi connection has been optimized for better performance. You may notice improved speeds and reduced latency.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-sm font-medium text-foreground">Channels Scanned</p>
                  <p className="text-xs text-muted-foreground">11 available</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <p className="text-sm font-medium text-foreground">Bandwidth Optimized</p>
                  <p className="text-xs text-muted-foreground">QoS configured</p>
                </div>
              </div>
            </div>
          )}
          
          <Button
            onClick={handleClose}
            disabled={isOptimizing}
            className="w-full gradient-bg text-white"
          >
            {isOptimizing ? "Optimizing..." : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}