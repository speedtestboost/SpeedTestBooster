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
      { name: "Comcast Xfinity", slug: "comcast" },
      { name: "AT&T", slug: "att" }
    ]
  },
  {
    name: "United Kingdom",
    code: "uk",
    flag: "🇬🇧",
    providers: [
      { name: "Sky", slug: "sky" },
      { name: "Virgin Media", slug: "virgin-media" },
      { name: "BT", slug: "bt" }
    ]
  },
  {
    name: "Canada",
    code: "ca",
    flag: "🇨🇦",
    providers: [
      { name: "Bell", slug: "bell" },
      { name: "Rogers", slug: "rogers" },
      { name: "Telus", slug: "telus" }
    ]
  },
  {
    name: "Germany",
    code: "de",
    flag: "🇩🇪",
    providers: [
      { name: "Deutsche Telekom", slug: "deutsche-telekom" },
      { name: "Vodafone", slug: "vodafone-de" },
      { name: "O2", slug: "o2-de" }
    ]
  },
  {
    name: "Australia",
    code: "au",
    flag: "🇦🇺",
    providers: [
      { name: "Telstra", slug: "telstra" },
      { name: "Optus", slug: "optus" },
      { name: "TPG", slug: "tpg" }
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
          <Link href="/" className="flex items-center space-x-3 md:space-x-4">
            <img 
              src="/logo-option-5.svg" 
              alt="Speed Test Logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Speed Test & Boost
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors ${currentPath === "/" ? "bg-primary/90" : ""}`}
              >
                Home
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
              <Link 
                href="/" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link 
                href="/internet-providers" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                All Internet Providers
              </Link>
              <Link 
                href="/about" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                About
              </Link>
              <Link 
                href="/help" 
                className="text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                Help
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}