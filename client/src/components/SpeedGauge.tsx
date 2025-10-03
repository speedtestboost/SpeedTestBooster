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

  // Calculate gauge percentage and rotation
  const displayValue = isTestRunning ? testProgress : currentSpeed;
  const maxSpeed = 200; // Maximum speed for gauge scale
  const percentage = Math.min(displayValue / maxSpeed, 1);
  
  // Calculate rotation for needle (270 degrees total arc, -135 to +135)
  const needleRotation = -135 + (percentage * 270);
  
  // SVG circle calculations for progress ring
  const radius = 85;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const arcLength = (270 / 360) * circumference; // 270 degree arc
  const strokeDashoffset = arcLength - (percentage * arcLength);

  return (
    <div className="text-center mb-6">
      {/* Circular Gauge Container */}
      <div className="relative w-64 h-64 lg:w-80 lg:h-80 mx-auto mb-6">
        <svg 
          className="w-full h-full"
          viewBox="0 0 200 200"
        >
          {/* Outer glow circle */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="url(#outerGlow)"
            strokeWidth="2"
            opacity="0.3"
            className={isTestRunning ? "animate-pulse" : ""}
          />
          
          {/* Background arc */}
          <path
            d="M 15,100 A 85,85 0 1,1 185,100"
            fill="none"
            stroke="hsl(240, 3.7%, 15.9%)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d="M 15,100 A 85,85 0 1,1 185,100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-700 ease-out ${isTestRunning ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : ''}`}
            style={{
              filter: isTestRunning ? 'drop-shadow(0 0 8px rgba(168,85,247,0.6))' : 'none'
            }}
          />
          
          {/* Speed markers */}
          {[0, 25, 50, 75, 100, 150, 200].map((speed) => {
            const angle = -135 + ((speed / maxSpeed) * 270);
            const markerRadius = 73;
            const x = 100 + markerRadius * Math.cos((angle * Math.PI) / 180);
            const y = 100 + markerRadius * Math.sin((angle * Math.PI) / 180);
            const isActive = displayValue >= speed;
            
            return (
              <g key={speed}>
                <circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill={isActive ? "url(#gradient)" : "hsl(240, 5%, 25%)"}
                  className="transition-all duration-500"
                />
                <text
                  x={100 + (markerRadius - 18) * Math.cos((angle * Math.PI) / 180)}
                  y={100 + (markerRadius - 18) * Math.sin((angle * Math.PI) / 180)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[8px] fill-muted-foreground font-semibold"
                >
                  {speed}
                </text>
              </g>
            );
          })}
          
          {/* Animated needle */}
          <g
            style={{
              transform: `rotate(${needleRotation}deg)`,
              transformOrigin: '100px 100px',
              transition: isTestRunning ? 'transform 0.3s ease-out' : 'transform 0.7s ease-out'
            }}
          >
            <path
              d="M 100,100 L 98,100 L 100,30 L 102,100 Z"
              fill="url(#needleGradient)"
              className={isTestRunning ? 'drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]' : ''}
            />
            <circle
              cx="100"
              cy="100"
              r="6"
              fill="url(#gradient)"
              className={isTestRunning ? 'animate-pulse' : ''}
            />
          </g>
          
          {/* Center circle glow effect when testing */}
          {isTestRunning && (
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1"
              opacity="0.4"
              className="animate-ping"
            />
          )}
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(262, 83%, 58%)" />
              <stop offset="50%" stopColor="hsl(276, 79%, 59%)" />
              <stop offset="100%" stopColor="hsl(290, 76%, 60%)" />
            </linearGradient>
            
            <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(290, 76%, 60%)" />
              <stop offset="100%" stopColor="hsl(262, 83%, 58%)" />
            </linearGradient>
            
            <radialGradient id="outerGlow">
              <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(290, 76%, 60%)" stopOpacity="0.6" />
            </radialGradient>
          </defs>
        </svg>
        
        {/* Speed display overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-8">
            <div className={`text-5xl lg:text-6xl font-bold gradient-text mb-1 transition-all duration-300 ${isTestRunning ? 'scale-110' : 'scale-100'}`}>
              {displayValue.toFixed(1)}
            </div>
            <div className="text-sm lg:text-base text-muted-foreground font-semibold tracking-wider">
              {isTestRunning ? "%" : "MBPS"}
            </div>
          </div>
        </div>
        
        {/* Animated particles when testing */}
        {isTestRunning && (
          <>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
          </>
        )}
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
        <div className="mt-4 animate-pulse">
          <Progress value={testProgress} className="h-3 bg-muted/30" />
        </div>
      )}
    </div>
  );
}
