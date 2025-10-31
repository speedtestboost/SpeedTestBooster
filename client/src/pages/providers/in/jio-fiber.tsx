import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Network, Router, Signal } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import { Link } from "wouter";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function JioFiberSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Jio Fiber Speed Test India - Free WiFi Speed Test Jio | Speed Test India";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Jio Fiber speed test India - Test my fiber speed test for Jio. Run wifi speed test, internet speed test India, speed test in india. Check Reliance Jio broadband speed online free.');
    }

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'jio fiber speed test, speed test india, speed test in india, jio fiber speed test india, my fiber speed test, fiber speed test india, wifi speed test india, internet speed test india, reliance jio speed test, jio broadband speed test, jio wifi speed test';

    // Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Jio Fiber Speed Test - Reliance Jio Broadband Speed Test' },
      { property: 'og:description', content: 'Free speed test for Reliance Jio Fiber customers. Test broadband and WiFi speeds up to 1 Gbps across India.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/in/jio-fiber' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test and Boost' }
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Jio Fiber Speed Test - Reliance Jio Broadband Speed Test' },
      { name: 'twitter:description', content: 'Free speed test for Reliance Jio Fiber customers. Test broadband and WiFi speeds up to 1 Gbps.' }
    ];

    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', tag.content);
    });

    // Update canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/providers/in/jio-fiber';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Jio Fiber Speed Test 2025",
      "description": "Free Jio Fiber speed test for Reliance Jio broadband customers. Test fiber internet speeds up to 1 Gbps across India.",
      "url": "https://speedtestboost.com/providers/in/jio-fiber",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Jio Fiber Speed Test Tool",
        "applicationCategory": "NetworkingApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      "provider": {
        "@type": "Organization",
        "name": "Reliance Jio",
        "description": "India's largest telecom operator offering fiber broadband and mobile services",
        "areaServed": { "@type": "Country", "name": "India" },
        "serviceType": ["Fiber Internet", "Broadband", "Mobile Services", "Digital Services"]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://speedtestboost.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Internet Providers",
            "item": "https://speedtestboost.com/internet-providers"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "India Providers",
            "item": "https://speedtestboost.com/providers/in"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Jio Fiber Speed Test",
            "item": "https://speedtestboost.com/providers/in/jio-fiber"
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/in/jio-fiber" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Jio Fiber", href: "/providers/in/jio-fiber" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Jio Fiber Speed Test 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Reliance Jio Fiber internet speed</span> for free. Check download speeds, upload speeds, and WiFi performance for fiber broadband customers across India.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Jio Fiber Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Reliance Jio Fiber Internet Service</h2>
              {/* Breadcrumb Navigation */}
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/in" className="hover:text-primary">India Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">Jio Fiber Speed Test</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  <strong>Reliance Jio Fiber</strong> operates as India's largest fiber broadband provider, commanding 
                  a dominant 41.04% market share with over 477.5 million subscribers nationwide. Launched by Reliance 
                  Industries under the Jio brand, this fiber-to-the-home (FTTH) service has revolutionized India's 
                  broadband landscape by offering high-speed internet connectivity with speeds ranging from 30 Mbps 
                  to 1 Gbps across urban and rural areas throughout the country.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Fiber Network Infrastructure and Speed Plans</h3>
                <p className="text-muted-foreground">
                  Jio Fiber utilizes cutting-edge <strong>fiber-optic technology</strong> to deliver consistent high-speed 
                  internet connectivity directly to customers' homes across India's major cities and towns. The service 
                  offers comprehensive speed plans including 30 Mbps, 100 Mbps, 150 Mbps, 300 Mbps, 500 Mbps, and 
                  1 Gbps options, supporting everything from basic web browsing to demanding applications like 4K streaming, 
                  online gaming, video conferencing, and smart home automation. Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">speed requirements calculator</Link> to determine the ideal Jio Fiber plan for your household needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital India Initiative and Coverage</h3>
                <p className="text-muted-foreground">
                  As part of India's Digital India vision, Jio Fiber has established an extensive fiber-optic network 
                  covering over 1,600 cities and towns across all Indian states and union territories. The service 
                  extends beyond traditional metros to tier-2 and tier-3 cities, bringing high-speed broadband connectivity 
                  to previously underserved areas and contributing significantly to bridging India's digital divide. 
                  Compare Jio Fiber with other major Indian providers like <Link href="/providers/in/airtel-broadband" className="text-primary hover:underline">Airtel Broadband</Link>, 
                  <Link href="/providers/in/act-fibernet" className="text-primary hover:underline">ACT Fibernet</Link>, and 
                  <Link href="/providers/in/bsnl-broadband" className="text-primary hover:underline">BSNL Broadband</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">Unlimited Data and Value-Added Services</h3>
                <p className="text-muted-foreground">
                  Jio Fiber distinguishes itself in the Indian broadband market by offering truly unlimited data usage 
                  across all residential plans without any fair usage policy (FUP) limitations or speed throttling. 
                  This unlimited approach particularly benefits Indian households with multiple connected devices, 
                  remote workers, students pursuing online education, content creators, and gaming enthusiasts who 
                  require consistent, unrestricted access to high-speed internet for work, entertainment, and digital lifestyle needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Integrated Entertainment and Smart Home Solutions</h3>
                <p className="text-muted-foreground">
                  Jio Fiber provides customers with comprehensive digital entertainment through bundled services including 
                  JioTV, JioCinema, JioSaavn music streaming, and access to premium OTT platforms. The service includes 
                  advanced WiFi 6 routers, smart home integration capabilities, and JioFiber Set-Top Box for seamless 
                  4K streaming experience. Jio's ecosystem approach combines high-speed internet with digital services, 
                  making it a complete digital solution for modern Indian households seeking integrated connectivity and entertainment.
                </p>

                <h3 className="text-xl font-semibold mb-3">Customer Support and Network Reliability</h3>
                <p className="text-muted-foreground">
                  Reliance Jio maintains a robust customer support infrastructure with 24/7 technical assistance through 
                  the MyJio app, dedicated helpline numbers, and local service centers across India. The fiber network 
                  is designed for high reliability with redundant connections and minimal downtime, ensuring consistent 
                  internet performance for business and personal use. Regular network monitoring and proactive maintenance 
                  help maintain optimal speed performance across the Jio Fiber network nationwide.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Speed Test Performance Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-blue-500/10 rounded-full">
                    <Network className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Jio Fiber Network Technology</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Advanced fiber-optic infrastructure delivering speeds up to 1 Gbps across India's digital network
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-green-500/10 rounded-full">
                    <Signal className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Unlimited Data Policy</h3>
                <p className="text-sm text-muted-foreground text-center">
                  True unlimited data usage on all Jio Fiber plans without FUP limitations or speed throttling
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About Jio Fiber Speed Test</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What is a good Jio Fiber internet speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      For most Indian households, 100+ Mbps download speed is recommended. Jio Fiber's popular plans offer 
                      150 Mbps, 300 Mbps, and 1 Gbps speeds, which support multiple devices, 4K streaming, and work-from-home requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How do I run an accurate Jio Fiber speed test?</h4>
                    <p className="text-sm text-muted-foreground">
                      Use a wired ethernet connection to your Jio Fiber router, close background applications, disconnect other devices, 
                      and run multiple tests at different times. This provides the most accurate representation of your Jio Fiber connection speed.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why are my Jio Fiber speeds slower than advertised?</h4>
                    <p className="text-sm text-muted-foreground">
                      Common causes include WiFi interference, multiple devices connected, outdated router firmware, network 
                      congestion during peak hours (7-11 PM), or testing during high-usage periods in your area.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How can I improve my Jio Fiber internet speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      Restart your Jio Fiber router monthly, use ethernet instead of WiFi for important tasks, relocate router centrally, 
                      update router firmware through MyJio app, and ensure optimal router placement. Contact Jio support if issues persist.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When should I contact Jio Fiber customer support?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact Jio support through MyJio app or 199 helpline if speed tests consistently show speeds significantly 
                      below your plan's advertised rate, or if troubleshooting steps don't resolve persistent connectivity issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What's the difference between WiFi and wired speeds on Jio Fiber?</h4>
                    <p className="text-sm text-muted-foreground">
                      WiFi speeds typically range 40-60% of advertised speeds due to interference and distance. Ethernet connections 
                      should reach at least 80-90% of your Jio Fiber plan's advertised speed for optimal performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="in" currentProviderSlug="jio-fiber" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background/50 backdrop-blur-sm border-t border-border/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Footer Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">India Providers</h4>
              <div className="space-y-2 text-sm">
                <Link href="/providers/in/jio-fiber" className="block text-muted-foreground hover:text-primary transition-colors">
                  Jio Fiber Speed Test
                </Link>
                <Link href="/providers/in/airtel-broadband" className="block text-muted-foreground hover:text-primary transition-colors">
                  Airtel Broadband Speed Test
                </Link>
                <Link href="/providers/in/act-fibernet" className="block text-muted-foreground hover:text-primary transition-colors">
                  ACT Fibernet Speed Test
                </Link>
                <Link href="/providers/in/bsnl-broadband" className="block text-muted-foreground hover:text-primary transition-colors">
                  BSNL Broadband Speed Test
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Speed Test Tools</h4>
              <div className="space-y-2 text-sm">
                <Link href="/internet-speed-requirements" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speed Requirements
                </Link>
                <Link href="/wifi-analyzer" className="block text-muted-foreground hover:text-primary transition-colors">
                  WiFi Analyzer
                </Link>
                <Link href="/ai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  AI Speed Test
                </Link>
                <div className="text-muted-foreground">Fiber Speed Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">External Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.jio.com/fiber/en-in" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Official Jio Fiber
                </a>
                <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speedtest by Ookla
                </a>
                <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Fast.com by Netflix
                </a>
                <a href="https://www.trai.gov.in/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  TRAI Broadband Guide
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">About & Help</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
                </Link>
                <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speed Test Home
                </Link>
                <Link href="/internet-providers" className="block text-muted-foreground hover:text-primary transition-colors">
                  All Providers
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 Speed Test and Boost. Free Jio Fiber internet speed test for Reliance Jio customers. 
              Test your fiber broadband speed, WiFi performance, and network connectivity across India.
            </p>
          </div>
        </div>
      </footer>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
