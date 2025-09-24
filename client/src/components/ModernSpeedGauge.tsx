import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type SpeedTestResult } from "@/lib/speedTest";
import { Download, Upload, Clock, Zap, Play, Wifi } from "lucide-react";

interface ModernSpeedGaugeProps {
  isTestRunning: boolean;
  testProgress: number;
  testStatus: string;
  result?: SpeedTestResult | null;
  onStartTest?: () => void;
  onOptimizeWifi?: () => void;
}

export default function ModernSpeedGauge({
  isTestRunning,
  testProgress,
  testStatus,
  result,
  onStartTest,
  onOptimizeWifi,
}: ModernSpeedGaugeProps) {
  // Show simple start interface if no test has been run and not currently testing
  if (!isTestRunning && !result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 py-12">
        {/* Large GO Button */}
        <Button
          onClick={onStartTest}
          className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-3xl md:text-4xl shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200"
          data-testid="button-start-speed-test"
          aria-label="Start internet speed test"
        >
          <div className="flex flex-col items-center">
            <Play className="h-12 w-12 md:h-16 md:w-16 mb-2" fill="currentColor" />
            <span>GO</span>
          </div>
        </Button>

        {/* Optimize Button */}
        <Button
          onClick={onOptimizeWifi}
          variant="outline"
          className="px-8 py-4 text-lg font-medium border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
          data-testid="button-optimize-wifi"
          aria-label="Optimize internet speed"
        >
          <Wifi className="h-5 w-5 mr-2" />
          Optimize Internet Speed
        </Button>
      </div>
    );
  }

  // Calculate gauge percentage and angle for results display
  const maxSpeed = 1000;
  const currentSpeed = result?.downloadSpeed || 0;
  const speedPercentage = Math.min((currentSpeed / maxSpeed) * 100, 100);
  const gaugeAngle = (speedPercentage / 100) * 180;

  // SVG parameters
  const centerX = 150;
  const centerY = 120;
  const radius = 80;
  const strokeWidth = 8;

  // Calculate arc path
  const startAngle = 180;
  const endAngle = startAngle + gaugeAngle;
  
  const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
  
  const largeArcFlag = gaugeAngle > 180 ? 1 : 0;

  // Scale markers
  const scaleMarkers = [0, 1, 5, 10, 50, 100, 500, 1000];

  // Mini chart data
  const generateMiniChart = (value: number) => {
    const bars = Array.from({ length: 8 }, (_, i) => {
      const percentage = Math.min((value / 100) * (i + 1) / 8, 1);
      return percentage * 40;
    });
    return bars;
  };

  // Show testing progress or results
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Speed Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* SVG Gauge */}
            <svg width="320" height="220" viewBox="0 0 300 200" className="mx-auto">
              {/* Background arc */}
              <path
                d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
                fill="none"
                stroke="#e5e7eb"
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
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
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
                    className="fill-gray-500 text-xs font-medium"
                  >
                    {speed >= 1000 ? '1000+' : speed}
                  </text>
                );
              })}
            </svg>
            
            {/* Center Speed Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center mt-8">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-1">
                  {isTestRunning ? testProgress.toFixed(0) : (currentSpeed || 0).toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">
                  {isTestRunning ? "% complete" : "Mbps"}
                </div>
                {result && !isTestRunning && (
                  <div className="text-xs text-gray-400 mt-1">
                    {result.downloadSpeed > result.uploadSpeed ? "download" : "upload"}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          {isTestRunning && (
            <div className="mt-6 w-full max-w-sm">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>Test Progress</span>
                <span>{testProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${testProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 text-center mt-2">
                {testStatus}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Speed Stats (only show after test completion) */}
        {result && !isTestRunning && (
          <div className="space-y-4">
            {/* Download Speed */}
            <Card className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Download</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {result.downloadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-500">Mbps</div>
                    </div>
                  </div>
                  <div className="w-16 h-10 flex items-end space-x-1">
                    {generateMiniChart(result.downloadSpeed).map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-400 to-blue-500 rounded-sm transition-all duration-500"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Speed */}
            <Card className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Upload</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {result.uploadSpeed.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-500">Mbps</div>
                    </div>
                  </div>
                  <div className="w-16 h-10 flex items-end space-x-1">
                    {generateMiniChart(result.uploadSpeed).map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-green-400 to-green-500 rounded-sm transition-all duration-500"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ping and Jitter */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Ping</div>
                  <div className="text-xl font-bold text-gray-900">
                    {result.ping.toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-500">ms</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Jitter</div>
                  <div className="text-xl font-bold text-gray-900">
                    {result.jitter.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500">ms</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}