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
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="relative w-48 h-48 mx-auto mb-4">
            {/* Speed Gauge Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="hsl(20, 5.9%, 90%)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="hsl(207, 90%, 54%)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashOffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            {/* Speed display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {isTestRunning ? testProgress.toFixed(0) : currentSpeed.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">
                  {isTestRunning ? "%" : "Mbps"}
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            {isTestRunning ? testStatus : "Ready to test"}
          </div>
          <div className="text-xs text-gray-500">
            {formatLastTest(lastTest)}
          </div>
        </div>
        
        {/* Progress bar for testing */}
        {isTestRunning && (
          <div className="mt-4">
            <Progress value={testProgress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
