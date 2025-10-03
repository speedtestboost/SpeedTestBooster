import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type SpeedTest } from "@shared/schema";

interface SpeedGaugeProps {
  currentSpeed: number;
  isTestRunning: boolean;
  testProgress: number;
  testStatus: string;
  lastTest?: SpeedTest;
}

export default function SpeedGauge({
  currentSpeed,
  isTestRunning,
  testProgress,
  testStatus,
  lastTest,
}: SpeedGaugeProps) {
  const formatLastTest = (test?: SpeedTest) => {
    if (!test) return "Last test: Never";
    const date = new Date(test.timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Last test: Less than 1 hour ago";
    if (diffHours < 24) return `Last test: ${diffHours} hours ago`;
    
    return `Last test: ${date.toLocaleDateString()}`;
  };

  // Calculate gauge percentage (0-100 scale)
  const gaugePercentage = Math.min(currentSpeed / 100, 1) * 100;
  
  // SVG circle calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashOffset = circumference - (gaugePercentage / 100) * circumference;

  return (
    <div className="text-center mb-6">
      <div className="relative w-52 h-52 lg:w-80 lg:h-80 mx-auto mb-6">
        {/* Speed Gauge Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(240, 3.7%, 15.9%)"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashOffset}
            className="transition-all duration-1000 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(262, 83%, 58%)" />
              <stop offset="100%" stopColor="hsl(290, 76%, 60%)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Speed display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl lg:text-6xl font-bold gradient-text mb-1">
              {isTestRunning ? testProgress.toFixed(0) : currentSpeed.toFixed(1)}
            </div>
            <div className="text-sm lg:text-base text-muted-foreground font-medium">
              {isTestRunning ? "%" : "Mbps"}
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm lg:text-base text-foreground mb-2 font-medium">
        {isTestRunning ? testStatus : "Ready to test"}
      </div>
      <div className="text-xs lg:text-sm text-muted-foreground">
        {isTestRunning ? `${testProgress.toFixed(0)}% complete` : formatLastTest(lastTest)}
      </div>
      
      {/* Progress bar for testing */}
      {isTestRunning && (
        <div className="mt-4">
          <Progress value={testProgress} className="h-3 bg-muted/30" />
        </div>
      )}
    </div>
  );
}
