import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wifi, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [steps, setSteps] = useState<OptimizationStep[]>([
    { id: "scan", label: "Scanning channels", duration: 2000, status: "pending" },
    { id: "bandwidth", label: "Optimizing bandwidth", duration: 3000, status: "pending" },
    { id: "cache", label: "Clearing cache", duration: 1500, status: "pending" },
  ]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !isOptimizing) {
      startOptimization();
    }
  }, [isOpen]);

  const startOptimization = async () => {
    setIsOptimizing(true);
    setCurrentStepIndex(0);
    
    // Reset all steps
    setSteps(prev => prev.map(step => ({ ...step, status: "pending" })));

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      
      // Mark current step as running
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? "running" : index < i ? "completed" : "pending"
      })));

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      
      // Mark current step as completed
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? "completed" : "pending"
      })));
    }

    // Show completion
    setTimeout(() => {
      setIsOptimizing(false);
      toast({
        title: "Optimization Complete",
        description: "Your WiFi connection has been optimized for better performance.",
      });
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    if (!isOptimizing) {
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
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
              <Wifi className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              WiFi Optimization
            </DialogTitle>
            <p className="text-sm text-gray-600 text-center">
              Optimizing your connection for better performance...
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{step.label}</span>
                <div className="flex items-center">
                  {step.status === "completed" ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : step.status === "running" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Button
            onClick={handleClose}
            disabled={isOptimizing}
            className="w-full"
            variant="outline"
          >
            {isOptimizing ? "Optimizing..." : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
