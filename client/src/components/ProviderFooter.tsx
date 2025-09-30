import { Link } from "wouter";
import { Globe, Wifi, Zap, Network } from "lucide-react";

export default function ProviderFooter() {
  return (
    <footer className="mt-16 border-t border-border/40 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">Speed Test & Boost</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Free internet speed testing for users worldwide. Check your connection performance instantly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Network className="h-4 w-4 text-purple-500" />
              Tools & Tests
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-speedtest"
                >
                  Speed Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/ping-test" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-pingtest"
                >
                  Ping Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/wifi-analyzer" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-wifi"
                >
                  WiFi Analyzer
                </Link>
              </li>
              <li>
                <Link 
                  href="/speed-requirements" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-requirements"
                >
                  Speed Requirements
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4 text-purple-500" />
              Popular Providers
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/providers/us/att" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-att"
                >
                  AT&T Speed Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/providers/us/comcast" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-comcast"
                >
                  Comcast Speed Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/providers/us/verizon" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-verizon"
                >
                  Verizon Speed Test
                </Link>
              </li>
              <li>
                <Link 
                  href="/providers/us/spectrum" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-spectrum"
                >
                  Spectrum Speed Test
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Wifi className="h-4 w-4 text-purple-500" />
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/internet-providers" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-providers"
                >
                  All Providers
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">About Speed Tests</span>
              </li>
              <li>
                <span className="text-muted-foreground">Network Diagnostics</span>
              </li>
              <li>
                <span className="text-muted-foreground">Troubleshooting</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p data-testid="text-copyright">
              © 2025 Speed Test & Boost. All rights reserved.
            </p>
            <p className="text-center md:text-right" data-testid="text-disclaimer">
              Speed test results may vary based on network conditions, device capabilities, and server location.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
