import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wifi, Zap, Router, Settings } from "lucide-react";

interface OptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OptimizationModal({ isOpen, onClose }: OptimizationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              Optimize your WiFi connection for better performance
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg border border-border/50">
              <Router className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Router Position</p>
                <p className="text-xs text-muted-foreground">Place router in central location</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg border border-border/50">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Channel Optimization</p>
                <p className="text-xs text-muted-foreground">Switch to less congested channels</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg border border-border/50">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Bandwidth Settings</p>
                <p className="text-xs text-muted-foreground">Optimize QoS and bandwidth allocation</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full gradient-bg text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}