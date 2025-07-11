import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { type SpeedTest } from "@shared/schema";

interface TestHistoryProps {
  speedTests: SpeedTest[];
  isLoading: boolean;
  onClearHistory: () => void;
}

export default function TestHistory({
  speedTests,
  isLoading,
  onClearHistory,
}: TestHistoryProps) {
  const formatDate = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return "Yesterday";
    
    return date.toLocaleDateString();
  };

  const getSpeedQuality = (speed: number) => {
    if (speed > 50) return "bg-success";
    if (speed > 25) return "bg-accent";
    return "bg-error";
  };

  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Test History</h3>
          {speedTests.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearHistory}
              className="text-sm text-primary hover:text-accent transition-colors"
            >
              Clear All
            </Button>
          )}
        </div>
        
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24 ml-auto" />
              </div>
            ))}
          </div>
        ) : speedTests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No speed tests yet</p>
            <p className="text-sm mt-1">Run your first speed test to see results here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {speedTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-semibold text-foreground">
                      {test.downloadSpeed.toFixed(1)} Mbps
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ↑ {test.uploadSpeed.toFixed(1)} Mbps
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDate(test.timestamp)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getSpeedQuality(
                      test.downloadSpeed
                    )}`}
                  />
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
