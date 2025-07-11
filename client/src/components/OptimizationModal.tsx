import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wifi, Check, Loader2, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  analyzeDeviceCapabilities, 
  generateOptimizationSuggestions, 
  type OptimizationReport,
  type DeviceCapabilities,
  type NetworkConditions
} from "@/lib/wifiOptimization";
import OptimizationReport from "./OptimizationReport";

interface OptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  networkConditions?: {
    downloadSpeed: number;
    uploadSpeed: number;
    ping: number;
    jitter: number;
    ipAddress: string;
    connectionType: string;
  };
}

interface OptimizationStep {
  id: string;
  label: string;
  duration: number;
  status: "pending" | "running" | "completed";
}

export default function OptimizationModal({ isOpen, onClose, networkConditions }: OptimizationModalProps) {
  const [steps, setSteps] = useState<OptimizationStep[]>([
    { id: "device", label: "Analyzing device capabilities", duration: 800, status: "pending" },
    { id: "network", label: "Evaluating network performance", duration: 600, status: "pending" },
    { id: "analyze", label: "Identifying optimization opportunities", duration: 1000, status: "pending" },
    { id: "generate", label: "Generating personalized recommendations", duration: 700, status: "pending" },
    { id: "complete", label: "Optimization analysis complete", duration: 400, status: "pending" }
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationReport, setOptimizationReport] = useState<OptimizationReport | null>(null);
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !isOptimizing && !isComplete) {
      startOptimization();
    }
  }, [isOpen]);

  const startOptimization = async () => {
    setIsOptimizing(true);
    setCurrentStepIndex(0);
    setIsComplete(false);
    setOptimizationReport(null);
    
    // Reset all steps
    setSteps(prev => prev.map(step => ({ ...step, status: "pending" })));

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      
      // Mark current step as running
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? "running" : index < i ? "completed" : "pending"
      })));

      // Perform actual analysis based on step
      if (steps[i].id === "device") {
        const capabilities = await analyzeDeviceCapabilities();
        setDeviceCapabilities(capabilities);
      } else if (steps[i].id === "generate" && deviceCapabilities && networkConditions) {
        const report = generateOptimizationSuggestions(deviceCapabilities, networkConditions);
        setOptimizationReport(report);
      }

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      
      // Mark current step as completed
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? "completed" : "pending"
      })));
    }

    // Show completion
    setIsOptimizing(false);
    setIsComplete(true);
  };

  const handleClose = () => {
    if (!isOptimizing) {
      setIsOptimizing(false);
      setIsComplete(false);
      setOptimizationReport(null);
      setDeviceCapabilities(null);
      onClose();
    }
  };

  const completedSteps = steps.filter(step => step.status === "completed").length;
  const totalSteps = steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  // Show optimization report if available
  if (optimizationReport && isComplete) {
    return (
      <OptimizationReport 
        report={optimizationReport}
        onClose={handleClose}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center glow-effect">
              <Wifi className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-lg font-semibold text-foreground">
              WiFi Optimization Analysis
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-center">
              {isComplete ? "Analysis complete! Your personalized report is ready." : "Analyzing your setup for optimization opportunities..."}
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
              {optimizationReport && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-3 text-center">
                      <Gauge className="h-6 w-6 text-primary mx-auto mb-1" />
                      <p className="text-sm font-medium">Overall Score</p>
                      <p className="text-xs text-muted-foreground">
                        {optimizationReport.overallScore}/100
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 text-center">
                      <Wifi className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-sm font-medium">Suggestions</p>
                      <p className="text-xs text-muted-foreground">
                        {optimizationReport.suggestions.length} found
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-3">
                    <p className="text-sm text-foreground">
                      {optimizationReport.summary}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isOptimizing}
            >
              {isOptimizing ? "Analyzing..." : "Close"}
            </Button>
            {isComplete && optimizationReport && (
              <Button onClick={() => setIsComplete(false)} className="gradient-bg text-white">
                View Report
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
