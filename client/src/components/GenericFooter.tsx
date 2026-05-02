import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Globe, HelpCircle, Gauge, Router } from "lucide-react";

export default function GenericFooter() {
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Internal Pages - Speed Testing */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" />
              Speed Testing
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-home"
                >
                  Home - Speed Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/internet-speed-requirements" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-requirements"
                >
                  Speed Requirements Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/internet-providers" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-providers"
                >
                  Internet Service Providers
                </Link>
              </li>
              <li>
                <Link 
                  href="/site-index" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-site-index"
                >
                  Site directory (all URLs)
                </Link>
              </li>
              <li>
                <Link 
                  href="/help" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-help"
                >
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              More tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/ai-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-ai-speed"
                >
                  AI Speed Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/speed-test-faq" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-speed-faq"
                >
                  Speed Test FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/wifi-speed-optimization" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-wifi-opt"
                >
                  WiFi Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Internal Pages - Network Tools */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Router className="h-5 w-5 text-primary" />
              Network tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/wifi-analyzer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-wifi-analyzer"
                >
                  WiFi Analyzer
                </Link>
              </li>
              <li>
                <Link 
                  href="/ping-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-ping-test"
                >
                  Ping Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/download-speed-guide" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-download-guide"
                >
                  Download Speed Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/upload-speed-guide" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-upload-guide"
                >
                  Upload Speed Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Country & city hubs */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Regional tests
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/in-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-in"
                >
                  🇮🇳 India speed test
                </Link>
              </li>
              <li>
                <Link 
                  href="/us-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-us"
                >
                  🇺🇸 United States speed test
                </Link>
              </li>
              <li>
                <Link 
                  href="/uk-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-uk"
                >
                  🇬🇧 United Kingdom speed test
                </Link>
              </li>
              <li>
                <Link 
                  href="/sg-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-sg"
                >
                  🇸🇬 Singapore speed test
                </Link>
              </li>
              <li>
                <Link 
                  href="/de-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-de"
                >
                  🇩🇪 Germany speed test
                </Link>
              </li>
              <li>
                <Link 
                  href="/delhi-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-delhi"
                >
                  Delhi speed test
                </Link>
              </li>
              <li>
                <Link 
                  href="/mumbai-speed-test" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-mumbai"
                >
                  Mumbai speed test
                </Link>
              </li>
              <li>
                <Link 
                  href="/internet-providers" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                  data-testid="link-footer-all-regions"
                >
                  All regions &amp; ISPs →
                </Link>
              </li>
            </ul>
          </div>

          {/* External Resources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              External Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://fast.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-fastcom"
                >
                  Fast.com Speed Test ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://www.speedtest.net/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-speedtestnet"
                >
                  Speedtest.net by Ookla ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/search?q=internet+speed+test" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-google"
                >
                  Google Speed Test ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://www.fcc.gov/general/broadband-speed-guide" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-fcc"
                >
                  FCC Broadband Guide ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO-Optimized Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-background/50 border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">About Internet Speed Testing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Test your internet connection speed with our free online speed test tool. We measure download speed, 
                upload speed, ping latency, and jitter to provide accurate bandwidth measurements for WiFi, fiber, 
                cable, and mobile networks. Compare results across major providers including{" "}
                <Link href="/providers/us/verizon" className="text-primary hover:underline">Verizon</Link>,{" "}
                <Link href="/providers/us/comcast" className="text-primary hover:underline">Comcast</Link>,{" "}
                <Link href="/providers/us/att" className="text-primary hover:underline">AT&T</Link>, and{" "}
                <Link href="/providers/uk/bt" className="text-primary hover:underline">BT</Link>.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Multilingual Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Speed test available in multiple languages to serve global users:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/" 
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  data-testid="link-footer-lang-en"
                >
                  🇺🇸 English
                </Link>
                <Link 
                  href="/es" 
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  data-testid="link-footer-lang-es"
                >
                  🇪🇸 Español
                </Link>
                <Link 
                  href="/id" 
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  data-testid="link-footer-lang-id"
                >
                  🇮🇩 Indonesia
                </Link>
                <Link 
                  href="/pt-br" 
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  data-testid="link-footer-lang-pt-br"
                >
                  🇧🇷 Português
                </Link>
                <Link 
                  href="/fr" 
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  data-testid="link-footer-lang-fr"
                >
                  🇫🇷 Français
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-8 border-t border-border/50">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Speed Test & Boost. Free internet speed test tool for all users worldwide.</p>
            <p className="mt-2 text-xs">
              Test your broadband speed, WiFi performance, and network latency with accurate measurements.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
