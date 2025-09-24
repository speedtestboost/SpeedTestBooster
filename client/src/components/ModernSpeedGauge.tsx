import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type SpeedTestResult } from "@/lib/speedTest";
import { Download, Upload, Clock, Zap, Play } from "lucide-react";

interface ModernSpeedGaugeProps {
  isTestRunning: boolean;
  testProgress: number;
  testStatus: string;
  result?: SpeedTestResult | null;
  onStartTest?: () => void;
}

export default function ModernSpeedGauge({
  isTestRunning,
  testProgress,
  testStatus,
  result,
  onStartTest,
}: ModernSpeedGaugeProps) {
  // Calculate gauge percentage and angle
  const maxSpeed = 1000; // Max speed for gauge
  const currentSpeed = result?.downloadSpeed || 0;
  const speedPercentage = Math.min((currentSpeed / maxSpeed) * 100, 100);
  const gaugeAngle = (speedPercentage / 100) * 180; // 180 degrees for semicircle

  // SVG parameters
  const centerX = 150;
  const centerY = 120;
  const radius = 80;
  const strokeWidth = 8;

  // Calculate arc path
  const startAngle = 180; // Start at left (180 degrees)
  const endAngle = startAngle + gaugeAngle;
  
  const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
  
  const largeArcFlag = gaugeAngle > 180 ? 1 : 0;

  // Scale markers
  const scaleMarkers = [0, 1, 5, 10, 50, 100, 500, 1000];

  // Mini chart data for download/upload
  const generateMiniChart = (value: number) => {
    const bars = Array.from({ length: 8 }, (_, i) => {
      const percentage = Math.min((value / 100) * (i + 1) / 8, 1);
      return percentage * 40; // Max height 40px
    });
    return bars;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Speed Gauge */}
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="relative">
            {/* SVG Gauge */}
            <svg width="300" height="200" viewBox="0 0 300 200" className="mx-auto">
              {/* Background arc */}
              <path
                d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
                fill="none"
                stroke="hsl(240, 3.7%, 15.9%)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              {/* Progress arc */}
              {gaugeAngle > 0 && (
                <path
                  d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
                  fill="none"
                  stroke="url(#speedGradient)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              )}
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(262, 83%, 58%)" />
                  <stop offset="100%" stopColor="hsl(290, 76%, 60%)" />
                </linearGradient>
              </defs>
              
              {/* Scale markers */}
              {scaleMarkers.map((speed, index) => {
                const angle = 180 + (index / (scaleMarkers.length - 1)) * 180;
                const tickX = centerX + (radius + 15) * Math.cos((angle * Math.PI) / 180);
                const tickY = centerY + (radius + 15) * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <text
                    key={speed}
                    x={tickX}
                    y={tickY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-muted-foreground text-xs font-medium"
                  >
                    {speed >= 1000 ? '1000+' : speed}
                  </text>
                );
              })}
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center mt-8">
                {!isTestRunning && !result && onStartTest && (
                  <Button
                    onClick={onStartTest}
                    className="w-32 h-32 rounded-full gradient-bg text-white font-bold text-xl hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg"
                    data-testid="button-start-speed-test"
                  >
                    <div className="flex flex-col items-center">
                      <Play className="h-8 w-8 mb-2" />
                      <span className="text-sm">GO</span>
                    </div>
                  </Button>
                )}
                {(isTestRunning || result) && (
                  <>
                    <div className="text-4xl lg:text-5xl font-bold text-foreground mb-1">
                      {isTestRunning ? testProgress.toFixed(0) : (currentSpeed || 0).toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isTestRunning ? "% complete" : "Mbps"}
                    </div>
                    {result && !isTestRunning && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.downloadSpeed > result.uploadSpeed ? "download" : "upload"}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          {isTestRunning && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Test Progress</span>
                <span>{testProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${testProgress}%` }}
                />
              </div>
              <div className="text-xs text-foreground text-center mt-2">
                {testStatus}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right Column - Speed Stats */}
      <div className="space-y-4">
        {/* Download Speed */}
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">DOWNLOAD</div>
                  <div className="text-2xl font-bold text-foreground">
                    {result?.downloadSpeed?.toFixed(1) || "---"}
                  </div>
                  <div className="text-sm text-muted-foreground">Mbps</div>
                </div>
              </div>
              <div className="w-16 h-8 flex items-end space-x-1">
                {generateMiniChart(result?.downloadSpeed || 0).map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary to-accent rounded-sm transition-all duration-500"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Speed */}
        <Card className="card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Upload className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">UPLOAD</div>
                  <div className="text-2xl font-bold text-foreground">
                    {result?.uploadSpeed?.toFixed(1) || "---"}
                  </div>
                  <div className="text-sm text-muted-foreground">Mbps</div>
                </div>
              </div>
              <div className="w-16 h-8 flex items-end space-x-1">
                {generateMiniChart(result?.uploadSpeed || 0).map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-accent to-primary rounded-sm transition-all duration-500"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ping and Jitter */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-success" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">PING</div>
              <div className="text-xl font-bold text-foreground">
                {result?.ping?.toFixed(0) || "---"}
              </div>
              <div className="text-xs text-muted-foreground">ms</div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">JITTER</div>
              <div className="text-xl font-bold text-foreground">
                {result?.jitter?.toFixed(1) || "---"}
              </div>
              <div className="text-xs text-muted-foreground">ms</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}