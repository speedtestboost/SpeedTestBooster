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
    
    if (diffHours < 1) return "Less than 1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return date.toLocaleDateString();
  };

  const displayValue = isTestRunning ? testProgress : currentSpeed;
  const maxSpeed = 200;
  const percentage = Math.min(displayValue / maxSpeed, 1);
  
  // Calculate rotation for needle (240 degrees total arc)
  const needleRotation = -120 + (percentage * 240);
  
  // SVG arc calculations
  const radius = 90;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (240 / 360) * circumference;
  const strokeDashoffset = arcLength - (percentage * arcLength);

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-8">
      {/* Main Gauge Container */}
      <Card className="bg-white dark:bg-card shadow-[0_30px_60px_-30px_rgba(28,63,107,0.25)] rounded-2xl border-0 overflow-hidden">
        <CardContent className="p-12 lg:p-16">
          {/* Circular Gauge */}
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <svg 
              className="w-full h-full"
              viewBox="0 0 240 240"
              style={{ filter: 'drop-shadow(0 4px 20px rgba(28, 63, 107, 0.08))' }}
            >
              {/* Background arc with subtle gradient */}
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E3E6EF" />
                  <stop offset="100%" stopColor="#D1D5E3" />
                </linearGradient>
                
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1C3F6B" />
                  <stop offset="50%" stopColor="#2D5A8C" />
                  <stop offset="100%" stopColor="#3B9DBD" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Outer decorative ring */}
              <circle
                cx="120"
                cy="120"
                r="108"
                fill="none"
                stroke="#F0F2F8"
                strokeWidth="1"
              />
              
              {/* Background arc */}
              <path
                d="M 30,120 A 90,90 0 1,1 210,120"
                fill="none"
                stroke="url(#bgGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity="0.4"
              />
              
              {/* Progress arc with animation */}
              <path
                d="M 30,120 A 90,90 0 1,1 210,120"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={arcLength}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: isTestRunning ? 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'stroke-dashoffset 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: isTestRunning ? 'url(#glow)' : 'none'
                }}
              />
              
              {/* Speed scale markers */}
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((speed) => {
                const angle = -120 + ((speed / maxSpeed) * 240);
                const markerRadius = 78;
                const x = 120 + markerRadius * Math.cos((angle * Math.PI) / 180);
                const y = 120 + markerRadius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <g key={speed}>
                    <line
                      x1={120 + 86 * Math.cos((angle * Math.PI) / 180)}
                      y1={120 + 86 * Math.sin((angle * Math.PI) / 180)}
                      x2={120 + 82 * Math.cos((angle * Math.PI) / 180)}
                      y2={120 + 82 * Math.sin((angle * Math.PI) / 180)}
                      stroke={displayValue >= speed ? "#1C3F6B" : "#D1D5E3"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    {speed % 40 === 0 && (
                      <text
                        x={120 + 68 * Math.cos((angle * Math.PI) / 180)}
                        y={120 + 68 * Math.sin((angle * Math.PI) / 180)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-semibold"
                        fill="#6B7280"
                      >
                        {speed}
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Animated needle */}
              <g
                style={{
                  transform: `rotate(${needleRotation}deg)`,
                  transformOrigin: '120px 120px',
                  transition: isTestRunning ? 'transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <path
                  d="M 120,120 L 118,118 L 120,35 L 122,118 Z"
                  fill="url(#progressGradient)"
                  filter={isTestRunning ? "url(#glow)" : "none"}
                />
                <circle
                  cx="120"
                  cy="120"
                  r="8"
                  fill="#1C3F6B"
                  className={isTestRunning ? 'animate-pulse' : ''}
                />
                <circle
                  cx="120"
                  cy="120"
                  r="4"
                  fill="white"
                />
              </g>
              
              {/* Subtle pulse effect when testing */}
              {isTestRunning && (
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  fill="none"
                  stroke="#3B9DBD"
                  strokeWidth="1"
                  opacity="0.3"
                  className="animate-ping"
                  style={{ animationDuration: '3s' }}
                />
              )}
            </svg>
            
            {/* Center speed display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center mt-4">
                <div 
                  className={`text-7xl lg:text-8xl font-light text-[#1C3F6B] mb-2 transition-all duration-500 ${isTestRunning ? 'scale-105' : 'scale-100'}`}
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}
                >
                  {displayValue.toFixed(1)}
                </div>
                <div className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                  {isTestRunning ? "Percent" : "Mbps"}
                </div>
              </div>
            </div>
          </div>
          
          {/* Status information */}
          <div className="mt-12 text-center space-y-3">
            <div className="text-base font-medium text-gray-700">
              {isTestRunning ? testStatus : "Ready to test your connection"}
            </div>
            <div className="text-sm text-gray-500">
              {isTestRunning ? (
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-[#3B9DBD] rounded-full animate-pulse mr-2"></span>
                  {testProgress.toFixed(0)}% complete
                </span>
              ) : (
                lastTest && <span>Last test: {formatLastTest(lastTest)}</span>
              )}
            </div>
          </div>
          
          {/* Minimal progress bar */}
          {isTestRunning && (
            <div className="mt-8">
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1C3F6B] to-[#3B9DBD] transition-all duration-300 ease-out"
                  style={{ width: `${testProgress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
