import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function BouyguesTelecomSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  useEffect(() => {
    document.title = "Bouygues Telecom Speed Test - Test Bouygues Fiber 4G France 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) { metaDescription.setAttribute('content', 'Test your Bouygues Telecom internet speed for free. Check fiber and 4G speeds across France.'); }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/fr/bouygues-telecom" />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text">Bouygues Telecom</h1>
              <p className="text-xl text-muted-foreground mt-2">Speed Test</p>
            </div>
          </div>
          <Button onClick={() => setShowSpeedTest(true)} className="gradient-bg text-white px-8 py-6 text-lg font-semibold rounded-xl">
            <Zap className="h-5 w-5 mr-2" />Test Bouygues Speed Now
          </Button>
        </div>
      </main>
      <SpeedTestModal isOpen={showSpeedTest} onClose={() => setShowSpeedTest(false)} providerName="Bouygues Telecom" />
    </div>
  );
}