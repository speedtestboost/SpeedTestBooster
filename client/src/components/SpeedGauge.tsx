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

  // Format speed to show digits like an odometer
  const displayValue = isTestRunning ? testProgress.toFixed(0) : currentSpeed.toFixed(1);
  const digits = displayValue.split('');

  return (
    <div className="text-center mb-6">
      {/* Odometer-style display */}
      <div className="relative mx-auto mb-6">
        <Card className="card-hover bg-gradient-to-br from-background to-muted/30 border-2">
          <CardContent className="p-8">
            {/* Odometer Label */}
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              {isTestRunning ? "Test Progress" : "Download Speed"}
            </div>
            
            {/* Odometer Digits Container */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {digits.map((digit, index) => (
                <div
                  key={index}
                  className={`
                    ${digit === '.' ? 'w-3' : 'w-12 lg:w-16'}
                    h-16 lg:h-20
                    flex items-center justify-center
                    ${digit === '.' 
                      ? 'bg-transparent' 
                      : 'bg-gradient-to-b from-card to-muted/50 border-2 border-primary/30 rounded-lg shadow-lg'
                    }
                    transition-all duration-500
                  `}
                >
                  <span className={`
                    font-mono font-bold
                    ${digit === '.' 
                      ? 'text-4xl lg:text-5xl gradient-text' 
                      : 'text-4xl lg:text-5xl gradient-text'
                    }
                  `}>
                    {digit}
                  </span>
                </div>
              ))}
            </div>

            {/* Unit Display */}
            <div className="text-lg lg:text-xl text-muted-foreground font-semibold tracking-wider">
              {isTestRunning ? "PERCENT" : "MBPS"}
            </div>

            {/* Speed Indicator Bars */}
            <div className="mt-6 flex gap-1 justify-center">
              {[...Array(10)].map((_, i) => {
                const threshold = (i + 1) * 10;
                const currentValue = isTestRunning ? testProgress : currentSpeed;
                const isActive = currentValue >= threshold;
                return (
                  <div
                    key={i}
                    className={`
                      w-2 h-8 rounded-full transition-all duration-300
                      ${isActive 
                        ? 'bg-gradient-to-t from-primary to-accent shadow-lg' 
                        : 'bg-muted/30'
                      }
                    `}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Text */}
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
