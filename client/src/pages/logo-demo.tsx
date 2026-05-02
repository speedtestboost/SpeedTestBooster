import { useState, useEffect } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const logoOptions = [
  {
    id: 1,
    name: "Speedometer Gauge",
    description: "Classic speedometer with needle indicator",
    path: "/logo-option-1.svg"
  },
  {
    id: 2,
    name: "WiFi Speed Signal",
    description: "WiFi waves with speed arrow",
    path: "/logo-option-2.svg"
  },
  {
    id: 3,
    name: "Lightning Bolt",
    description: "Bold lightning for instant speed",
    path: "/logo-option-3.svg"
  },
  {
    id: 4,
    name: "Signal Bars",
    description: "Network signal strength bars",
    path: "/logo-option-4.svg"
  },
  {
    id: 5,
    name: "Progress Gauge",
    description: "Circular progress with indicator",
    path: "/logo-option-5.svg"
  },
  {
    id: 6,
    name: "Speed Letter S",
    description: "Modern stylized S for Speed",
    path: "/logo-option-6.svg"
  }
];

export default function LogoDemo() {
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Logo Options - Speed Test & Boost";
    
    // Canonical URL

    
    setCanonicalHref('https://speedtestboost.com/logo-demo');
    
    // Add noindex meta tag since this is an internal demo page
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const createdRobots = !robotsMeta;
    const previousRobots = robotsMeta?.getAttribute('content') ?? '';
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';

    return () => {
      if (createdRobots) {
        robotsMeta?.remove();
      } else if (robotsMeta) {
        robotsMeta.setAttribute('content', previousRobots || 'index, follow');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/logo-demo" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Logo Options
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose from these static logo designs for your speed test website. All logos use your brand colors and are optimized for web use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {logoOptions.map((logo) => (
              <Card 
                key={logo.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLogo === logo.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedLogo(logo.id)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <img 
                        src={logo.path} 
                        alt={logo.name}
                        className="w-16 h-16"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{logo.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{logo.description}</p>
                  {selectedLogo === logo.id && (
                    <div className="mt-4 text-center">
                      <Button size="sm" variant="outline">
                        Selected ✓
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedLogo && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Preview with Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-4 p-8 bg-muted/20 rounded-lg">
                  <img 
                    src={logoOptions.find(l => l.id === selectedLogo)?.path} 
                    alt="Selected logo"
                    className="w-10 h-10"
                  />
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Speed Test & Boost
                  </div>
                </div>
                <div className="mt-6 text-center space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Selected:</strong> {logoOptions.find(l => l.id === selectedLogo)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This logo will replace the current animated version in the header
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}