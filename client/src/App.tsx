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
import DESpeedTest from "@/pages/de-speed-test";
import SGSpeedTest from "@/pages/sg-speed-test";
import THSpeedTest from "@/pages/th-speed-test";
import NLSpeedTest from "@/pages/nl-speed-test";
import INSpeedTest from "@/pages/in-speed-test";
import MXSpeedTest from "@/pages/mx-speed-test";
import MYSpeedTest from "@/pages/my-speed-test";
import IDSpeedTest from "@/pages/id-speed-test";
import ESSpeedTest from "@/pages/es-speed-test";
import ZASpeedTest from "@/pages/za-speed-test";
import ARSpeedTest from "@/pages/ar-speed-test";
import AESpeedTest from "@/pages/ae-speed-test";
import SASpeedTest from "@/pages/sa-speed-test";
import PLSpeedTest from "@/pages/pl-speed-test";
import FRSpeedTest from "@/pages/fr-speed-test";
import ITSpeedTest from "@/pages/it-speed-test";
import BRSpeedTest from "@/pages/br-speed-test";
import PHSpeedTest from "@/pages/ph-speed-test";
import InternetSpeedRequirements from "@/pages/internet-speed-requirements";
import InternetProviders from "@/pages/internet-providers";
// US Providers
import VerizonSpeedTest from "@/pages/providers/us/verizon";
import ComcastSpeedTest from "@/pages/providers/us/comcast";
import ATTSpeedTest from "@/pages/providers/us/att";
import SpectrumSpeedTest from "@/pages/providers/us/spectrum";
import CenturyLinkSpeedTest from "@/pages/providers/us/centurylink";
import OptimumSpeedTest from "@/pages/providers/us/optimum";
import CoxSpeedTest from "@/pages/providers/us/cox";
import FrontierSpeedTest from "@/pages/providers/us/frontier";
import WindstreamSpeedTest from "@/pages/providers/us/windstream";

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

// Netherlands Providers
import KPNSpeedTest from "@/pages/providers/nl/kpn";
import VodafoneZiggoSpeedTest from "@/pages/providers/nl/vodafoneziggo";
import OdidoSpeedTest from "@/pages/providers/nl/odido";

// India Providers
import JioFiberSpeedTest from "@/pages/providers/in/jio-fiber";
import AirtelBroadbandSpeedTest from "@/pages/providers/in/airtel-broadband";
import BSNLBroadbandSpeedTest from "@/pages/providers/in/bsnl-broadband";
import ACTFibernetSpeedTest from "@/pages/providers/in/act-fibernet";
import HathwayBroadbandSpeedTest from "@/pages/providers/in/hathway-broadband";

// France Providers
import OrangeSpeedTest from "@/pages/providers/fr/orange";

// Italy Providers
import TIMSpeedTest from "@/pages/providers/it/tim";

// Brazil Providers
import VivoSpeedTest from "@/pages/providers/br/vivo";

// Mexico Providers
import TelmexSpeedTest from "@/pages/providers/mx/telmex";
import IzziSpeedTest from "@/pages/providers/mx/izzi";
import MegacableSpeedTest from "@/pages/providers/mx/megacable";
import TotalplaySpeedTest from "@/pages/providers/mx/totalplay";

// Malaysia Providers
import UnifiSpeedTest from "@/pages/providers/my/unifi";
import MaxisSpeedTest from "@/pages/providers/my/maxis";
import TIMESpeedTest from "@/pages/providers/my/time";
import CelcomSpeedTest from "@/pages/providers/my/celcom";

// Spain Providers
import MovistarSpeedTest from "@/pages/providers/es/movistar";
import OrangeSpainSpeedTest from "@/pages/providers/es/orange-es";
import VodafoneSpainSpeedTest from "@/pages/providers/es/vodafone-es";
import MasOrangeSpeedTest from "@/pages/providers/es/masorange";

// Philippines Providers
import PLDTSpeedTest from "@/pages/providers/ph/pldt";
import GlobeSpeedTest from "@/pages/providers/ph/globe";
import ConvergeSpeedTest from "@/pages/providers/ph/converge";
import DITOSpeedTest from "@/pages/providers/ph/dito";

// Indonesia Providers
import IndiHomeSpeedTest from "@/pages/providers/id/indihome";
import BiznetSpeedTest from "@/pages/providers/id/biznet";
import FirstMediaSpeedTest from "@/pages/providers/id/first-media";
import MyRepublicSpeedTest from "@/pages/providers/id/myrepublic";

// South Africa Providers
import RainSpeedTest from "@/pages/providers/za/rain";
import VodacomFibreSpeedTest from "@/pages/providers/za/vodacom-fibre";
import CoolIdeasSpeedTest from "@/pages/providers/za/cool-ideas";
import AfrihostSpeedTest from "@/pages/providers/za/afrihost";

// Argentina Providers
import MovistarArgentinaSpeedTest from "@/pages/providers/ar/movistar-ar";
import PersonalSpeedTest from "@/pages/providers/ar/personal";
import ClaroArgentinaSpeedTest from "@/pages/providers/ar/claro";
import TelecentroSpeedTest from "@/pages/providers/ar/telecentro";

// UAE Providers
import EtisalatSpeedTest from "@/pages/providers/ae/etisalat";
import DuSpeedTest from "@/pages/providers/ae/du";
import VirginMobileAESpeedTest from "@/pages/providers/ae/virgin-mobile-ae";
import YallaSpeedTest from "@/pages/providers/ae/yalla";

// Saudi Arabia Providers
import STCSpeedTest from "@/pages/providers/sa/stc";
import MobilySpeedTest from "@/pages/providers/sa/mobily";
import ZainSpeedTest from "@/pages/providers/sa/zain";
import GOSpeedTest from "@/pages/providers/sa/go";

// Singapore Providers
import SingtelSpeedTest from "@/pages/providers/sg/singtel";
import StarhubSpeedTest from "@/pages/providers/sg/starhub";
import M1SpeedTest from "@/pages/providers/sg/m1";

// Thailand Providers
import AisSpeedTest from "@/pages/providers/th/ais";
import TrueThSpeedTest from "@/pages/providers/th/true-th";
import ThreeBbSpeedTest from "@/pages/providers/th/3bb";

// Poland Providers
import OrangePlSpeedTest from "@/pages/providers/pl/orange-pl";
import PlayPlSpeedTest from "@/pages/providers/pl/play-pl";
import TMobilePlSpeedTest from "@/pages/providers/pl/t-mobile-pl";

import WiFiAnalyzer from "@/pages/wifi-analyzer";
import AISpeedTest from "@/pages/ai-speed-test";
import DownloadSpeedGuide from "@/pages/download-speed-guide";
import UploadSpeedGuide from "@/pages/upload-speed-guide";
import WiFiSpeedOptimization from "@/pages/wifi-speed-optimization";
import SpeedTestFAQ from "@/pages/speed-test-faq";
import PingTest from "@/pages/ping-test";
import LogoDemo from "@/pages/logo-demo";
import NotFound from "@/pages/not-found";
import SpanishSpeedTest from "@/pages/spanish-speed-test";
import IndonesianSpeedTest from "@/pages/indonesian-speed-test";
import PortugueseSpeedTest from "@/pages/portuguese-speed-test";
import FrenchSpeedTest from "@/pages/french-speed-test";
import { useEffect, useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { Sun, Moon } from "lucide-react";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={SpeedTest} />
      <Route path="/speed-test" component={SpeedTest} />
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
      <Route path="/de-speed-test" component={DESpeedTest} />
      <Route path="/sg-speed-test" component={SGSpeedTest} />
      <Route path="/th-speed-test" component={THSpeedTest} />
      <Route path="/nl-speed-test" component={NLSpeedTest} />
      <Route path="/in-speed-test" component={INSpeedTest} />
      <Route path="/mx-speed-test" component={MXSpeedTest} />
      <Route path="/my-speed-test" component={MYSpeedTest} />
      <Route path="/id-speed-test" component={IDSpeedTest} />
      <Route path="/es-speed-test" component={ESSpeedTest} />
      <Route path="/za-speed-test" component={ZASpeedTest} />
      <Route path="/ar-speed-test" component={ARSpeedTest} />
      <Route path="/ae-speed-test" component={AESpeedTest} />
      <Route path="/sa-speed-test" component={SASpeedTest} />
      <Route path="/pl-speed-test" component={PLSpeedTest} />
      <Route path="/fr-speed-test" component={FRSpeedTest} />
      <Route path="/it-speed-test" component={ITSpeedTest} />
      <Route path="/br-speed-test" component={BRSpeedTest} />
      <Route path="/ph-speed-test" component={PHSpeedTest} />
      <Route path="/internet-speed-requirements" component={InternetSpeedRequirements} />
      <Route path="/internet-providers" component={InternetProviders} />
      <Route path="/wifi-analyzer" component={WiFiAnalyzer} />
      <Route path="/ai-speed-test" component={AISpeedTest} />
      <Route path="/download-speed-guide" component={DownloadSpeedGuide} />
      <Route path="/upload-speed-guide" component={UploadSpeedGuide} />
      <Route path="/wifi-speed-optimization" component={WiFiSpeedOptimization} />
      <Route path="/speed-test-faq" component={SpeedTestFAQ} />
      <Route path="/ping-test" component={PingTest} />
      <Route path="/logo-demo" component={LogoDemo} />
      
      {/* Language-Specific Pages */}
      <Route path="/es" component={SpanishSpeedTest} />
      <Route path="/id" component={IndonesianSpeedTest} />
      <Route path="/pt-br" component={PortugueseSpeedTest} />
      <Route path="/fr" component={FrenchSpeedTest} />
      
      {/* US Provider Routes */}
      <Route path="/providers/us/verizon" component={VerizonSpeedTest} />
      <Route path="/providers/us/comcast" component={ComcastSpeedTest} />
      <Route path="/providers/us/att" component={ATTSpeedTest} />
      <Route path="/providers/us/spectrum" component={SpectrumSpeedTest} />
      <Route path="/providers/us/centurylink" component={CenturyLinkSpeedTest} />
      <Route path="/providers/us/optimum" component={OptimumSpeedTest} />
      <Route path="/providers/us/cox" component={CoxSpeedTest} />
      <Route path="/providers/us/frontier" component={FrontierSpeedTest} />
      <Route path="/providers/us/windstream" component={WindstreamSpeedTest} />
      
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
      
      {/* Netherlands Provider Routes */}
      <Route path="/providers/nl/kpn" component={KPNSpeedTest} />
      <Route path="/providers/nl/vodafoneziggo" component={VodafoneZiggoSpeedTest} />
      <Route path="/providers/nl/odido" component={OdidoSpeedTest} />
      
      {/* India Provider Routes */}
      <Route path="/providers/in/jio-fiber" component={JioFiberSpeedTest} />
      <Route path="/providers/in/airtel-broadband" component={AirtelBroadbandSpeedTest} />
      <Route path="/providers/in/bsnl-broadband" component={BSNLBroadbandSpeedTest} />
      <Route path="/providers/in/act-fibernet" component={ACTFibernetSpeedTest} />
      <Route path="/providers/in/hathway-broadband" component={HathwayBroadbandSpeedTest} />
      
      {/* France Provider Routes */}
      <Route path="/providers/fr/orange" component={OrangeSpeedTest} />
      
      {/* Italy Provider Routes */}
      <Route path="/providers/it/tim" component={TIMSpeedTest} />
      
      {/* Brazil Provider Routes */}
      <Route path="/providers/br/vivo" component={VivoSpeedTest} />
      
      {/* Mexico Provider Routes */}
      <Route path="/providers/mx/telmex" component={TelmexSpeedTest} />
      <Route path="/providers/mx/izzi" component={IzziSpeedTest} />
      <Route path="/providers/mx/megacable" component={MegacableSpeedTest} />
      <Route path="/providers/mx/totalplay" component={TotalplaySpeedTest} />
      
      {/* Malaysia Provider Routes */}
      <Route path="/providers/my/unifi" component={UnifiSpeedTest} />
      <Route path="/providers/my/maxis" component={MaxisSpeedTest} />
      <Route path="/providers/my/time" component={TIMESpeedTest} />
      <Route path="/providers/my/celcom" component={CelcomSpeedTest} />
      
      {/* Philippines Provider Routes */}
      <Route path="/providers/ph/pldt" component={PLDTSpeedTest} />
      <Route path="/providers/ph/globe" component={GlobeSpeedTest} />
      <Route path="/providers/ph/converge" component={ConvergeSpeedTest} />
      <Route path="/providers/ph/dito" component={DITOSpeedTest} />
      
      {/* Indonesia Provider Routes */}
      <Route path="/providers/id/indihome" component={IndiHomeSpeedTest} />
      <Route path="/providers/id/biznet" component={BiznetSpeedTest} />
      <Route path="/providers/id/first-media" component={FirstMediaSpeedTest} />
      <Route path="/providers/id/myrepublic" component={MyRepublicSpeedTest} />
      
      {/* Spain Provider Routes */}
      <Route path="/providers/es/movistar" component={MovistarSpeedTest} />
      <Route path="/providers/es/orange-es" component={OrangeSpainSpeedTest} />
      <Route path="/providers/es/vodafone-es" component={VodafoneSpainSpeedTest} />
      <Route path="/providers/es/masorange" component={MasOrangeSpeedTest} />
      
      {/* South Africa Provider Routes */}
      <Route path="/providers/za/rain" component={RainSpeedTest} />
      <Route path="/providers/za/vodacom-fibre" component={VodacomFibreSpeedTest} />
      <Route path="/providers/za/cool-ideas" component={CoolIdeasSpeedTest} />
      <Route path="/providers/za/afrihost" component={AfrihostSpeedTest} />
      
      {/* Argentina Provider Routes */}
      <Route path="/providers/ar/movistar-ar" component={MovistarArgentinaSpeedTest} />
      <Route path="/providers/ar/personal" component={PersonalSpeedTest} />
      <Route path="/providers/ar/claro" component={ClaroArgentinaSpeedTest} />
      <Route path="/providers/ar/telecentro" component={TelecentroSpeedTest} />
      
      {/* UAE Provider Routes */}
      <Route path="/providers/ae/etisalat" component={EtisalatSpeedTest} />
      <Route path="/providers/ae/du" component={DuSpeedTest} />
      <Route path="/providers/ae/virgin-mobile-ae" component={VirginMobileAESpeedTest} />
      <Route path="/providers/ae/yalla" component={YallaSpeedTest} />
      
      {/* Saudi Arabia Provider Routes */}
      <Route path="/providers/sa/stc" component={STCSpeedTest} />
      <Route path="/providers/sa/mobily" component={MobilySpeedTest} />
      <Route path="/providers/sa/zain" component={ZainSpeedTest} />
      <Route path="/providers/sa/go" component={GOSpeedTest} />

      {/* Singapore Provider Routes */}
      <Route path="/providers/sg/singtel" component={SingtelSpeedTest} />
      <Route path="/providers/sg/starhub" component={StarhubSpeedTest} />
      <Route path="/providers/sg/m1" component={M1SpeedTest} />

      {/* Thailand Provider Routes */}
      <Route path="/providers/th/ais" component={AisSpeedTest} />
      <Route path="/providers/th/true-th" component={TrueThSpeedTest} />
      <Route path="/providers/th/3bb" component={ThreeBbSpeedTest} />

      {/* Poland Provider Routes */}
      <Route path="/providers/pl/orange-pl" component={OrangePlSpeedTest} />
      <Route path="/providers/pl/play-pl" component={PlayPlSpeedTest} />
      <Route path="/providers/pl/t-mobile-pl" component={TMobilePlSpeedTest} />
      
      <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialize Google Analytics and theme when app loads
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing Google Analytics key: VITE_GA_MEASUREMENT_ID. Add it to your environment variables for tracking.');
    } else {
      initGA();
    }

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Router />
      
      {/* Floating Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        aria-label="Toggle theme"
        data-testid="button-theme-toggle"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </TooltipProvider>
  );
}

export default App;
