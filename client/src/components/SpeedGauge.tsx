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

  // Calculate gauge percentage (0-100 scale for speed up to 100 Mbps)
  const displayValue = isTestRunning ? testProgress : currentSpeed;
  const gaugePercentage = Math.min(displayValue / 100, 1) * 100;
  
  // SVG circle calculations for animated ring
  const radius = 85;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashOffset = circumference - (gaugePercentage / 100) * circumference;

  // Format speed display with leading zeros like an odometer
  const formattedSpeed = displayValue.toFixed(1).padStart(6, '0');
  const [whole, decimal] = formattedSpeed.split('.');

  return (
    <div className="text-center mb-6">
      <div className="relative w-64 h-64 lg:w-96 lg:h-96 mx-auto mb-6">
        {/* Outer circular gauge */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={normalizedRadius}
            fill="none"
            stroke="hsl(240, 3.7%, 15.9%)"
            strokeWidth={strokeWidth}
          />
          
          {/* Animated progress circle */}
          <circle
            cx="100"
            cy="100"
            r={normalizedRadius}
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashOffset}
            className="transition-all duration-700 ease-out"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))'
            }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(262, 83%, 58%)" />
              <stop offset="50%" stopColor="hsl(276, 80%, 59%)" />
              <stop offset="100%" stopColor="hsl(290, 76%, 60%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Digital odometer display in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {/* Speed digits with odometer styling */}
            <div className="flex items-end justify-center gap-1 mb-2">
              {whole.split('').map((digit, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden bg-gradient-to-b from-card to-muted/50 border-2 border-primary/20 rounded-md px-2 py-1 lg:px-3 lg:py-2"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="font-mono font-bold text-3xl lg:text-5xl gradient-text transition-all duration-500 animate-in">
                    {digit}
                  </div>
                </div>
              ))}
              
              {/* Decimal point */}
              <div className="text-3xl lg:text-5xl font-bold gradient-text mb-1">.</div>
              
              {/* Decimal digit */}
              <div
                className="relative overflow-hidden bg-gradient-to-b from-card to-muted/50 border-2 border-primary/20 rounded-md px-2 py-1 lg:px-3 lg:py-2"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="font-mono font-bold text-3xl lg:text-5xl gradient-text transition-all duration-500">
                  {decimal}
                </div>
              </div>
            </div>
            
            {/* Unit label */}
            <div className="text-sm lg:text-base text-muted-foreground font-semibold tracking-wider uppercase">
              {isTestRunning ? "Percent" : "Mbps"}
            </div>

            {/* Animated indicator lights */}
            <div className="flex gap-1 justify-center mt-4">
              {[...Array(8)].map((_, i) => {
                const threshold = (i + 1) * 12.5;
                const isActive = displayValue >= threshold;
                return (
                  <div
                    key={i}
                    className={`
                      w-1.5 h-6 lg:w-2 lg:h-8 rounded-full transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-t from-primary via-accent to-primary shadow-lg animate-pulse' 
                        : 'bg-muted/30'
                      }
                    `}
                    style={{
                      transitionDelay: `${i * 50}ms`
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Speed markers around the circle */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 25, 50, 75, 100].map((value, index) => {
            const angle = (value / 100) * 270 - 135; // Start from bottom left, go clockwise
            const x = 50 + 45 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 45 * Math.sin((angle * Math.PI) / 180);
            
            return (
              <div
                key={index}
                className="absolute text-xs lg:text-sm text-muted-foreground font-semibold"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Status text */}
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
