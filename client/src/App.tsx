import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SpeedTest from "@/pages/speed-test";
import About from "@/pages/about";
import Help from "@/pages/help";
import Blog from "@/pages/blog";
import MumbaiSpeedTest from "@/pages/mumbai-speed-test";
import DelhiSpeedTest from "@/pages/delhi-speed-test";
import BangaloreSpeedTest from "@/pages/bangalore-speed-test";
import HyderabadSpeedTest from "@/pages/hyderabad-speed-test";
import ChennaiSpeedTest from "@/pages/chennai-speed-test";
import KolkataSpeedTest from "@/pages/kolkata-speed-test";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={SpeedTest} />
      <Route path="/about" component={About} />
      <Route path="/help" component={Help} />
      <Route path="/blog" component={Blog} />
      <Route path="/mumbai-speed-test" component={MumbaiSpeedTest} />
      <Route path="/delhi-speed-test" component={DelhiSpeedTest} />
      <Route path="/bangalore-speed-test" component={BangaloreSpeedTest} />
      <Route path="/hyderabad-speed-test" component={HyderabadSpeedTest} />
      <Route path="/chennai-speed-test" component={ChennaiSpeedTest} />
      <Route path="/kolkata-speed-test" component={KolkataSpeedTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing Google Analytics key: VITE_GA_MEASUREMENT_ID. Add it to your environment variables for tracking.');
    } else {
      initGA();
    }
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
