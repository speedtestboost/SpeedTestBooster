import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NetworkInfoProps {
  networkInfo?: {
    ipAddress: string;
    connectionType: string;
    serverLocation: string;
    isp: string;
  };
}

export default function NetworkInfo({ networkInfo }: NetworkInfoProps) {
  const getSignalStrength = () => {
    // Mock signal strength - in a real app this would come from the API
    const bars = [true, true, true, false]; // 3 out of 4 bars
    return bars;
  };

  const signalBars = getSignalStrength();

  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Network Information</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Network Type</span>
            <span className="font-medium text-foreground">
              {networkInfo?.connectionType || <Skeleton className="h-4 w-12" />}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Signal Strength</span>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {signalBars.map((isActive, index) => (
                  <div
                    key={index}
                    className={`w-1 h-4 rounded-full ${
                      isActive ? "bg-success glow-effect" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">Good</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Server Location</span>
            <span className="font-medium text-foreground">
              {networkInfo?.serverLocation || <Skeleton className="h-4 w-20" />}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">ISP</span>
            <span className="font-medium text-foreground">
              {networkInfo?.isp || <Skeleton className="h-4 w-16" />}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
