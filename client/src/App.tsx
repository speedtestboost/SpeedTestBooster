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
import ComcastXfinitySpeedTest from "@/pages/providers/us/comcast-xfinity";
import ATTSpeedTest from "@/pages/providers/us/att";
import SpectrumSpeedTest from "@/pages/providers/us/spectrum";
import CenturyLinkSpeedTest from "@/pages/providers/us/centurylink";
import CoxSpeedTest from "@/pages/providers/us/cox";
import OptimumSpeedTest from "@/pages/providers/us/optimum";

// UK Providers  
import BTSpeedTest from "@/pages/providers/uk/bt";
import SkySpeedTest from "@/pages/providers/uk/sky";
import VirginMediaSpeedTest from "@/pages/providers/uk/virgin-media";
import EESpeedTest from "@/pages/providers/uk/ee";
import VodafoneUKSpeedTest from "@/pages/providers/uk/vodafone-uk";
import ThreeUKSpeedTest from "@/pages/providers/uk/three-uk";
import TalkTalkSpeedTest from "@/pages/providers/uk/talktalk";

// Canada Providers
import BellSpeedTest from "@/pages/providers/ca/bell";
import RogersSpeedTest from "@/pages/providers/ca/rogers";
import TelusSpeedTest from "@/pages/providers/ca/telus";
import ShawSpeedTest from "@/pages/providers/ca/shaw";
import VideotronSpeedTest from "@/pages/providers/ca/videotron";
import EastlinkSpeedTest from "@/pages/providers/ca/eastlink";
import SaskTelSpeedTest from "@/pages/providers/ca/sasktel";
import TekSavvySpeedTest from "@/pages/providers/ca/teksavvy";

// Australia Providers
import TelstraSpeedTest from "@/pages/providers/au/telstra";
import OptusSpeedTest from "@/pages/providers/au/optus";
import TPGSpeedTest from "@/pages/providers/au/tpg";
import iiNetSpeedTest from "@/pages/providers/au/iinet";
import AussieBroadbandSpeedTest from "@/pages/providers/au/aussie-broadband";
import VodafoneAUSpeedTest from "@/pages/providers/au/vodafone-au";
import InternodeSpeedTest from "@/pages/providers/au/internode";
import ExetelSpeedTest from "@/pages/providers/au/exetel";

// Germany Providers
import DeutscheTelekomSpeedTest from "@/pages/providers/de/deutsche-telekom";
import VodafoneDESpeedTest from "@/pages/providers/de/vodafone-de";
import O2DESpeedTest from "@/pages/providers/de/o2-de";
import OneAndOneSpeedTest from "@/pages/providers/de/1and1";
import UnitymediaSpeedTest from "@/pages/providers/de/unitymedia";
import NetCologneSpeedTest from "@/pages/providers/de/netcologne";
import MNetSpeedTest from "@/pages/providers/de/m-net";
import EWESpeedTest from "@/pages/providers/de/ewe";

// India Providers
import JioFiberSpeedTest from "@/pages/providers/in/jio-fiber";
import AirtelXstreamSpeedTest from "@/pages/providers/in/airtel-xstream";
import ACTFibernetSpeedTest from "@/pages/providers/in/act-fibernet";
import BSNLSpeedTest from "@/pages/providers/in/bsnl";
import HathwaySpeedTest from "@/pages/providers/in/hathway";
import ExcitelSpeedTest from "@/pages/providers/in/excitel";
import TataPlayFiberSpeedTest from "@/pages/providers/in/tata-play-fiber";
import GTPLSpeedTest from "@/pages/providers/in/gtpl";

// France Providers
import OrangeFRSpeedTest from "@/pages/providers/fr/orange-fr";
import SFRSpeedTest from "@/pages/providers/fr/sfr";
import FreeFRSpeedTest from "@/pages/providers/fr/free-fr";
import BouyguesTelecomSpeedTest from "@/pages/providers/fr/bouygues-telecom";
import RedBySFRSpeedTest from "@/pages/providers/fr/red-by-sfr";
import SoshSpeedTest from "@/pages/providers/fr/sosh";
import LaPosteMobileSpeedTest from "@/pages/providers/fr/la-poste-mobile";

// Brazil Providers
import VivoBRSpeedTest from "@/pages/providers/br/vivo-br";
import ClaroBRSpeedTest from "@/pages/providers/br/claro-br";
import TIMBRSpeedTest from "@/pages/providers/br/tim-br";
import OiBRSpeedTest from "@/pages/providers/br/oi-br";
import NETBRSpeedTest from "@/pages/providers/br/net-br";
import AlgarTelecomSpeedTest from "@/pages/providers/br/algar-telecom";
import CopelTelecomSpeedTest from "@/pages/providers/br/copel-telecom";
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
      <Route path="/providers/us/comcast-xfinity" component={ComcastXfinitySpeedTest} />
      <Route path="/providers/us/att" component={ATTSpeedTest} />
      <Route path="/providers/us/spectrum" component={SpectrumSpeedTest} />
      <Route path="/providers/us/centurylink" component={CenturyLinkSpeedTest} />
      <Route path="/providers/us/cox" component={CoxSpeedTest} />
      <Route path="/providers/us/optimum" component={OptimumSpeedTest} />
      
      {/* UK Provider Routes */}
      <Route path="/providers/uk/bt" component={BTSpeedTest} />
      <Route path="/providers/uk/sky" component={SkySpeedTest} />
      <Route path="/providers/uk/virgin-media" component={VirginMediaSpeedTest} />
      <Route path="/providers/uk/ee" component={EESpeedTest} />
      <Route path="/providers/uk/vodafone-uk" component={VodafoneUKSpeedTest} />
      <Route path="/providers/uk/three-uk" component={ThreeUKSpeedTest} />
      <Route path="/providers/uk/talktalk" component={TalkTalkSpeedTest} />
      
      {/* Canada Provider Routes */}
      <Route path="/providers/ca/bell" component={BellSpeedTest} />
      <Route path="/providers/ca/rogers" component={RogersSpeedTest} />
      <Route path="/providers/ca/telus" component={TelusSpeedTest} />
      <Route path="/providers/ca/shaw" component={ShawSpeedTest} />
      <Route path="/providers/ca/videotron" component={VideotronSpeedTest} />
      <Route path="/providers/ca/eastlink" component={EastlinkSpeedTest} />
      <Route path="/providers/ca/sasktel" component={SaskTelSpeedTest} />
      <Route path="/providers/ca/teksavvy" component={TekSavvySpeedTest} />
      
      {/* Australia Provider Routes */}
      <Route path="/providers/au/telstra" component={TelstraSpeedTest} />
      <Route path="/providers/au/optus" component={OptusSpeedTest} />
      <Route path="/providers/au/tpg" component={TPGSpeedTest} />
      <Route path="/providers/au/iinet" component={iiNetSpeedTest} />
      <Route path="/providers/au/aussie-broadband" component={AussieBroadbandSpeedTest} />
      <Route path="/providers/au/vodafone-au" component={VodafoneAUSpeedTest} />
      <Route path="/providers/au/internode" component={InternodeSpeedTest} />
      <Route path="/providers/au/exetel" component={ExetelSpeedTest} />
      
      {/* Germany Provider Routes */}
      <Route path="/providers/de/deutsche-telekom" component={DeutscheTelekomSpeedTest} />
      <Route path="/providers/de/vodafone-de" component={VodafoneDESpeedTest} />
      <Route path="/providers/de/o2-de" component={O2DESpeedTest} />
      <Route path="/providers/de/1and1" component={OneAndOneSpeedTest} />
      <Route path="/providers/de/unitymedia" component={UnitymediaSpeedTest} />
      <Route path="/providers/de/netcologne" component={NetCologneSpeedTest} />
      <Route path="/providers/de/m-net" component={MNetSpeedTest} />
      <Route path="/providers/de/ewe" component={EWESpeedTest} />
      
      {/* India Provider Routes */}  
      <Route path="/providers/in/jio-fiber" component={JioFiberSpeedTest} />
      <Route path="/providers/in/airtel-xstream" component={AirtelXstreamSpeedTest} />
      <Route path="/providers/in/act-fibernet" component={ACTFibernetSpeedTest} />
      <Route path="/providers/in/bsnl" component={BSNLSpeedTest} />
      <Route path="/providers/in/hathway" component={HathwaySpeedTest} />
      <Route path="/providers/in/excitel" component={ExcitelSpeedTest} />
      <Route path="/providers/in/tata-play-fiber" component={TataPlayFiberSpeedTest} />
      <Route path="/providers/in/gtpl" component={GTPLSpeedTest} />
      
      {/* France Provider Routes */}
      <Route path="/providers/fr/orange-fr" component={OrangeFRSpeedTest} />
      <Route path="/providers/fr/sfr" component={SFRSpeedTest} />
      <Route path="/providers/fr/free-fr" component={FreeFRSpeedTest} />
      <Route path="/providers/fr/bouygues-telecom" component={BouyguesTelecomSpeedTest} />
      <Route path="/providers/fr/red-by-sfr" component={RedBySFRSpeedTest} />
      <Route path="/providers/fr/sosh" component={SoshSpeedTest} />
      <Route path="/providers/fr/la-poste-mobile" component={LaPosteMobileSpeedTest} />
      
      {/* Brazil Provider Routes */}
      <Route path="/providers/br/vivo-br" component={VivoBRSpeedTest} />
      <Route path="/providers/br/claro-br" component={ClaroBRSpeedTest} />
      <Route path="/providers/br/tim-br" component={TIMBRSpeedTest} />
      <Route path="/providers/br/oi-br" component={OiBRSpeedTest} />
      <Route path="/providers/br/net-br" component={NETBRSpeedTest} />
      <Route path="/providers/br/algar-telecom" component={AlgarTelecomSpeedTest} />
      <Route path="/providers/br/copel-telecom" component={CopelTelecomSpeedTest} />
      
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
