import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function ACTFibernetSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  useEffect(() => {
    document.title = "ACT Fibernet Speed Test - Test ACT Fiber Internet India 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) { metaDescription.setAttribute('content', 'Test your ACT Fibernet speed for free. Check fiber speeds in major Indian cities.'); }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/in/act-fibernet" />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold gradient-text">ACT Fibernet</h1>
              <p className="text-xl text-muted-foreground mt-2">Speed Test</p>
            </div>
          </div>
          <Button onClick={() => setShowSpeedTest(true)} className="gradient-bg text-white px-8 py-6 text-lg font-semibold rounded-xl">
            <Zap className="h-5 w-5 mr-2" />Test ACT Speed Now
          </Button>
        </div>
      </main>
      <SpeedTestModal isOpen={showSpeedTest} onClose={() => setShowSpeedTest(false)} providerName="ACT Fibernet" />
    </div>
  );
}