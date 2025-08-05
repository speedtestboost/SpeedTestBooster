import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SpeedTest from "@/pages/speed-test";
import About from "@/pages/about";
import Help from "@/pages/help";
import MumbaiSpeedTest from "@/pages/mumbai-speed-test";
import DelhiSpeedTest from "@/pages/delhi-speed-test";
import BangaloreSpeedTest from "@/pages/bangalore-speed-test";
import HyderabadSpeedTest from "@/pages/hyderabad-speed-test";
import ChennaiSpeedTest from "@/pages/chennai-speed-test";
import KolkataSpeedTest from "@/pages/kolkata-speed-test";
import USSpeedTest from "@/pages/us-speed-test";
import UKSpeedTest from "@/pages/uk-speed-test";
import AUSpeedTest from "@/pages/au-speed-test";
import CASpeedTest from "@/pages/ca-speed-test";
import InternetSpeedRequirements from "@/pages/internet-speed-requirements";
import InternetProviders from "@/pages/internet-providers";
// US Providers
import VerizonSpeedTest from "@/pages/providers/us/verizon";
import ComcastSpeedTest from "@/pages/providers/us/comcast";
import ATTSpeedTest from "@/pages/providers/us/att";

// UK Providers  
import BTSpeedTest from "@/pages/providers/uk/bt";
import SkySpeedTest from "@/pages/providers/uk/sky";
import VirginMediaSpeedTest from "@/pages/providers/uk/virgin-media";

// Canada Providers
import BellSpeedTest from "@/pages/providers/ca/bell";
import RogersSpeedTest from "@/pages/providers/ca/rogers";
import TelusSpeedTest from "@/pages/providers/ca/telus";

// Germany Providers
import DeutscheTelekomSpeedTest from "@/pages/providers/de/deutsche-telekom";
import VodafoneDESpeedTest from "@/pages/providers/de/vodafone-de";
import O2DESpeedTest from "@/pages/providers/de/o2-de";

// Australia Providers
import TelstraSpeedTest from "@/pages/providers/au/telstra";
import OptusSpeedTest from "@/pages/providers/au/optus";
import TPGSpeedTest from "@/pages/providers/au/tpg";
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
      <Route path="/mumbai-speed-test" component={MumbaiSpeedTest} />
      <Route path="/delhi-speed-test" component={DelhiSpeedTest} />
      <Route path="/bangalore-speed-test" component={BangaloreSpeedTest} />
      <Route path="/hyderabad-speed-test" component={HyderabadSpeedTest} />
      <Route path="/chennai-speed-test" component={ChennaiSpeedTest} />
      <Route path="/kolkata-speed-test" component={KolkataSpeedTest} />
      <Route path="/us-speed-test" component={USSpeedTest} />
      <Route path="/uk-speed-test" component={UKSpeedTest} />
      <Route path="/au-speed-test" component={AUSpeedTest} />
      <Route path="/ca-speed-test" component={CASpeedTest} />
      <Route path="/internet-speed-requirements" component={InternetSpeedRequirements} />
      <Route path="/internet-providers" component={InternetProviders} />
      
      {/* US Provider Routes */}
      <Route path="/providers/us/verizon" component={VerizonSpeedTest} />
      <Route path="/providers/us/comcast" component={ComcastSpeedTest} />
      <Route path="/providers/us/att" component={ATTSpeedTest} />
      
      {/* UK Provider Routes */}
      <Route path="/providers/uk/bt" component={BTSpeedTest} />
      <Route path="/providers/uk/sky" component={SkySpeedTest} />
      <Route path="/providers/uk/virgin-media" component={VirginMediaSpeedTest} />
      
      {/* Canada Provider Routes */}
      <Route path="/providers/ca/bell" component={BellSpeedTest} />
      <Route path="/providers/ca/rogers" component={RogersSpeedTest} />
      <Route path="/providers/ca/telus" component={TelusSpeedTest} />
      
      {/* Germany Provider Routes */}
      <Route path="/providers/de/deutsche-telekom" component={DeutscheTelekomSpeedTest} />
      <Route path="/providers/de/vodafone-de" component={VodafoneDESpeedTest} />
      <Route path="/providers/de/o2-de" component={O2DESpeedTest} />
      
      {/* Australia Provider Routes */}
      <Route path="/providers/au/telstra" component={TelstraSpeedTest} />
      <Route path="/providers/au/optus" component={OptusSpeedTest} />
      <Route path="/providers/au/tpg" component={TPGSpeedTest} />
      
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
