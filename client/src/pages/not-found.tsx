import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 Page Not Found | Speed Test & Boost";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Page not found. Return to Speed Test & Boost for free internet speed testing, WiFi analyzer, and network diagnostics.');
    }
    
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://speedtestboost.com/not-found';
    document.head.appendChild(canonical);
    
    return () => {
      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 pb-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved. Try our homepage for free internet speed testing.
          </p>

          <Link href="/">
            <Button className="w-full" data-testid="button-home">
              <Home className="h-4 w-4 mr-2" />
              Return to Homepage
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
