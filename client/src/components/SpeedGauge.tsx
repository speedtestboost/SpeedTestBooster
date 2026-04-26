import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type SpeedTest } from "@shared/schema";

interface SpeedGaugeProps {
  currentSpeed: number;
  isTestRunning: boolean;
  testProgress: number;
  testStatus: string;
  lastTest?: SpeedTest;
  liveSpeed?: number;
  livePhase?: "download" | "upload" | "idle";
}

export default function SpeedGauge({
  currentSpeed,
  isTestRunning,
  testProgress,
  testStatus,
  lastTest,
  liveSpeed = 0,
  livePhase = "idle",
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

  const displaySpeed = isTestRunning ? liveSpeed : currentSpeed;
  const gaugeMax = Math.max(100, Math.ceil(Math.max(currentSpeed, liveSpeed, 25) / 50) * 50);
  const ratio = Math.max(0, Math.min(displaySpeed / gaugeMax, 1));
  const needleAngle = -120 + ratio * 240;
  const ticks = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="text-center mb-6">
      <div className="relative w-56 h-56 lg:w-64 lg:h-64 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <defs>
            <radialGradient id="hubGradient" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="hsl(0, 0%, 98%)" />
              <stop offset="100%" stopColor="hsl(240, 8%, 78%)" />
            </radialGradient>
          </defs>
          {ticks.map((t) => {
            const angle = -120 + t * 40;
            return (
              <line
                key={t}
                x1="60"
                y1="9"
                x2="60"
                y2="15"
                stroke="hsl(240, 4%, 45%)"
                strokeWidth="1.2"
                transform={`rotate(${angle} 60 60)`}
              />
            );
          })}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="hsl(240, 3.7%, 18%)"
            strokeWidth="8"
            transform="rotate(120 60 60)"
            strokeLinecap="round"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="hsl(262, 70%, 58%)"
            strokeWidth="4"
            transform="rotate(120 60 60)"
            strokeLinecap="round"
            strokeDasharray={`${314 * ratio} 314`}
            className="transition-all duration-300 ease-out"
          />
          <line
            x1="60"
            y1="60"
            x2="60"
            y2="17"
            stroke="hsl(262, 83%, 58%)"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${needleAngle} 60 60)`}
            className="transition-transform duration-300 ease-out"
          />
          <circle cx="60" cy="60" r="6.2" fill="url(#hubGradient)" stroke="hsl(240, 8%, 60%)" strokeWidth="0.8" />
          <circle cx="60" cy="60" r="1.5" fill="hsl(240, 10%, 35%)" />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-[2rem] lg:text-[2.8rem] leading-none font-bold gradient-text mb-1 tabular-nums tracking-tight">
              {displaySpeed.toFixed(1)}
            </div>
            <div className="text-[11px] lg:text-xs text-muted-foreground font-semibold tracking-wide uppercase">
              Mbps
            </div>
            {isTestRunning && <div className="text-[10px] mt-2 text-primary">{livePhase === "upload" ? "upload" : "download"}</div>}
          </div>
        </div>
      </div>
      <div className="text-[11px] text-muted-foreground/80 mb-2">Scale: 0-{gaugeMax} Mbps</div>
      <div className="text-sm lg:text-base text-foreground mb-2 font-medium">
        {isTestRunning ? testStatus : "Ready to test"}
      </div>
      <div className="text-xs lg:text-sm text-muted-foreground">
        {isTestRunning ? `${testProgress.toFixed(0)}% complete • scale 0-${gaugeMax} Mbps` : formatLastTest(lastTest)}
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
