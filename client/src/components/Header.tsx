import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, Wifi } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

const countries = [
  {
    name: "United States",
    code: "us",
    flag: "🇺🇸",
    providers: [
      { name: "Verizon", slug: "verizon" },
      { name: "Comcast Xfinity", slug: "comcast-xfinity" },
      { name: "AT&T", slug: "att" },
      { name: "Spectrum", slug: "spectrum" },
      { name: "Cox", slug: "cox" },
      { name: "Mediacom", slug: "mediacom" },
      { name: "CenturyLink", slug: "centurylink" },
      { name: "Optimum", slug: "optimum" }
    ]
  },
  {
    name: "United Kingdom",
    code: "uk",
    flag: "🇬🇧",
    providers: [
      { name: "BT", slug: "bt" },
      { name: "Sky", slug: "sky" },
      { name: "Virgin Media", slug: "virgin-media" },
      { name: "TalkTalk", slug: "talktalk" },
      { name: "Plusnet", slug: "plusnet" },
      { name: "EE", slug: "ee" },
      { name: "Vodafone", slug: "vodafone-uk" },
      { name: "Three", slug: "three-uk" }
    ]
  },
  {
    name: "Canada",
    code: "ca",
    flag: "🇨🇦",
    providers: [
      { name: "Bell", slug: "bell" },
      { name: "Rogers", slug: "rogers" },
      { name: "Telus", slug: "telus" },
      { name: "Shaw", slug: "shaw" },
      { name: "Videotron", slug: "videotron" },
      { name: "Eastlink", slug: "eastlink" },
      { name: "SaskTel", slug: "sasktel" },
      { name: "TekSavvy", slug: "teksavvy" }
    ]
  },
  {
    name: "Australia",
    code: "au",
    flag: "🇦🇺",
    providers: [
      { name: "Telstra", slug: "telstra" },
      { name: "Optus", slug: "optus" },
      { name: "TPG", slug: "tpg" },
      { name: "iiNet", slug: "iinet" },
      { name: "Aussie Broadband", slug: "aussie-broadband" },
      { name: "Vodafone", slug: "vodafone-au" },
      { name: "Internode", slug: "internode" },
      { name: "Exetel", slug: "exetel" }
    ]
  },
  {
    name: "Germany",
    code: "de",
    flag: "🇩🇪",
    providers: [
      { name: "Deutsche Telekom", slug: "deutsche-telekom" },
      { name: "Vodafone", slug: "vodafone-de" },
      { name: "O2", slug: "o2-de" },
      { name: "1&1", slug: "1and1" },
      { name: "Unitymedia", slug: "unitymedia" },
      { name: "NetCologne", slug: "netcologne" },
      { name: "M-net", slug: "m-net" },
      { name: "EWE", slug: "ewe" }
    ]
  },
  {
    name: "India",
    code: "in",
    flag: "🇮🇳",
    providers: [
      { name: "Jio Fiber", slug: "jio-fiber" },
      { name: "Airtel Xstream", slug: "airtel-xstream" },
      { name: "ACT Fibernet", slug: "act-fibernet" },
      { name: "BSNL", slug: "bsnl" },
      { name: "Hathway", slug: "hathway" },
      { name: "Excitel", slug: "excitel" },
      { name: "Tata Play Fiber", slug: "tata-play-fiber" },
      { name: "GTPL", slug: "gtpl" }
    ]
  },
  {
    name: "France",
    code: "fr",
    flag: "🇫🇷",
    providers: [
      { name: "Orange", slug: "orange-fr" },
      { name: "SFR", slug: "sfr" },
      { name: "Free", slug: "free-fr" },
      { name: "Bouygues Telecom", slug: "bouygues-telecom" },
      { name: "RED by SFR", slug: "red-by-sfr" },
      { name: "Sosh", slug: "sosh" },
      { name: "B&YOU", slug: "b-and-you" },
      { name: "Nordnet", slug: "nordnet" }
    ]
  },
  {
    name: "Brazil",
    code: "br",
    flag: "🇧🇷",
    providers: [
      { name: "Vivo", slug: "vivo-br" },
      { name: "Claro", slug: "claro-br" },
      { name: "TIM", slug: "tim-br" },
      { name: "Oi", slug: "oi" },
      { name: "NET", slug: "net-br" },
      { name: "Copel Telecom", slug: "copel-telecom" },
      { name: "Algar Telecom", slug: "algar-telecom" },
      { name: "Brisanet", slug: "brisanet" }
    ]
  },
  {
    name: "Japan",
    code: "jp",
    flag: "🇯🇵",
    providers: [
      { name: "NTT", slug: "ntt" },
      { name: "SoftBank", slug: "softbank" },
      { name: "KDDI", slug: "kddi" },
      { name: "So-net", slug: "so-net" },
      { name: "OCN", slug: "ocn" },
      { name: "Biglobe", slug: "biglobe" },
      { name: "Nifty", slug: "nifty" },
      { name: "IIJ", slug: "iij" }
    ]
  },
  {
    name: "South Korea",
    code: "kr",
    flag: "🇰🇷",
    providers: [
      { name: "KT", slug: "kt" },
      { name: "SK Telecom", slug: "sk-telecom" },
      { name: "LG U+", slug: "lg-uplus" },
      { name: "LG HelloVision", slug: "lg-hellovision" },
      { name: "Hyundai HCN", slug: "hyundai-hcn" },
      { name: "CJ Hello", slug: "cj-hello" },
      { name: "D'Live", slug: "dlive" },
      { name: "CMB", slug: "cmb" }
    ]
  }
];

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = "/" }: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="relative z-10 bg-background/80 backdrop-blur-sm border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" stroke="url(#speedGradient)" strokeWidth="6" fill="none" className="animate-spin" style={{animationDuration: '8s'}} />
                <path d="M50 20 L55 30 L45 30 Z" fill="url(#speedGradient)" className="animate-pulse" />
                <circle cx="50" cy="50" r="4" fill="url(#speedGradient)" className="animate-pulse" />
                <path d="M20 50 Q30 40 40 50" stroke="url(#speedGradient)" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '0.5s'}} />
                <path d="M60 50 Q70 40 80 50" stroke="url(#speedGradient)" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '1s'}} />
                <path d="M50 60 Q60 70 50 80" stroke="url(#speedGradient)" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" style={{animationDelay: '1.5s'}} />
              </svg>
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Speed Test & Boost
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`transition-colors ${currentPath === "/" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
              >
                Speed Test
              </Link>
              
              {/* Internet Providers Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                  <Wifi className="h-4 w-4" />
                  <span>All Internet Providers</span>
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64">
                  <DropdownMenuItem asChild>
                    <Link href="/internet-providers" className="w-full">
                      View All Providers
                    </Link>
                  </DropdownMenuItem>
                  {countries.map((country) => (
                    <DropdownMenuSub key={country.code}>
                      <DropdownMenuSubTrigger>
                        <span className="flex items-center space-x-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {country.providers.map((provider) => (
                          <DropdownMenuItem key={provider.slug} asChild>
                            <Link href={`/providers/${country.code}/${provider.slug}`} className="w-full">
                              {provider.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                href="/about" 
                className={`transition-colors ${currentPath === "/about" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
              >
                About
              </Link>
              <Link 
                href="/help" 
                className={`transition-colors ${currentPath === "/help" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
              >
                Help
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-3 pt-4">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Speed Test
              </Link>
              <Link href="/internet-providers" className="text-muted-foreground hover:text-primary transition-colors py-2">
                All Internet Providers
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors py-2">
                About
              </Link>
              <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Help
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}