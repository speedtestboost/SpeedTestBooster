import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Network, Router, Signal } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Link } from "wouter";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

export default function SpectrumSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Spectrum Speed Test USA - Check Charter Cable Internet Free 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Charter Spectrum cable internet speed instantly - Free speed test for USA. Accurate 1 Gig download/upload performance results in seconds.');
    }

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'spectrum speed test, charter spectrum, cable internet');

    // Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Spectrum Speed Test - Charter Spectrum Internet Speed Test' },
      { property: 'og:description', content: 'Free speed test for Charter Spectrum internet customers. Test cable internet and WiFi speeds nationwide.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/us/spectrum' },
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
      { name: 'twitter:title', content: 'Spectrum Speed Test - Charter Spectrum Internet Speed Test' },
      { name: 'twitter:description', content: 'Free speed test for Charter Spectrum internet customers. Test cable internet and WiFi speeds.' }
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
    canonical.href = 'https://speedtestboost.com/providers/us/spectrum';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Spectrum Speed Test 2025",
      "description": "Free Spectrum internet speed test for Charter Spectrum customers. Test cable internet, WiFi, and gig speeds nationwide.",
      "url": "https://speedtestboost.com/providers/us/spectrum",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Spectrum Speed Test Tool",
        "applicationCategory": "NetworkingApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      "provider": {
        "@type": "Organization",
        "name": "Charter Spectrum",
        "description": "America's second-largest cable internet provider offering high-speed internet and TV services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "Gig Internet", "WiFi", "TV", "Mobile Services"]
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
            "name": "US Providers",
            "item": "https://speedtestboost.com/providers/us"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Spectrum Speed Test",
            "item": "https://speedtestboost.com/providers/us/spectrum"
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
      <Header currentPath="/providers/us/spectrum" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Spectrum", href: "/providers/us/spectrum" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Spectrum Speed Test 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Charter Spectrum internet speed</span> for free. Check download speeds, upload speeds, and WiFi performance for cable internet customers nationwide.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Spectrum Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Charter Spectrum Internet Service</h2>
              {/* Breadcrumb Navigation */}
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/us" className="hover:text-primary">US Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">Spectrum Speed Test</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  <strong>Charter Spectrum</strong> operates as the second-largest cable internet provider in the United States, 
                  serving over 32 million customers across 41 states with comprehensive broadband, television, 
                  and mobile services. Following Charter Communications' acquisition of Time Warner Cable and 
                  Bright House Networks, Spectrum has established itself as a dominant force in American 
                  telecommunications, offering reliable high-speed internet through advanced cable infrastructure and competitive speeds.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Internet Excellence and Speed Plans</h3>
                <p className="text-muted-foreground">
                  Spectrum's cable internet network utilizes <strong>DOCSIS 3.1 technology</strong> to deliver high-speed 
                  broadband connections across urban, suburban, and rural communities throughout America. 
                  The company's hybrid fiber-coaxial infrastructure provides customers with download speeds 
                  ranging from 300 Mbps on their base plan to 1 Gig (1000 Mbps) connections, supporting everything from 
                  basic web browsing to demanding applications like 4K streaming, online gaming, and 
                  remote work requirements. Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">speed requirements calculator</Link> to determine the right plan for your needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Nationwide Coverage Network</h3>
                <p className="text-muted-foreground">
                  Spectrum maintains one of America's most extensive cable networks, providing internet 
                  service across major metropolitan areas and smaller communities in states from coast to 
                  coast. The company's broad geographic footprint includes significant presence in key 
                  markets such as New York, Los Angeles, Texas, Florida, and the Carolinas, making 
                  Spectrum accessible to millions of American households seeking reliable broadband connectivity.
                  Compare Spectrum with other major providers like <Link href="/providers/us/verizon" className="text-primary hover:underline">Verizon</Link>, 
                  <Link href="/providers/us/comcast" className="text-primary hover:underline">Comcast</Link>, and 
                  <Link href="/providers/us/att" className="text-primary hover:underline">AT&T</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">No Data Caps Policy</h3>
                <p className="text-muted-foreground">
                  Spectrum distinguishes itself in the cable internet market by offering unlimited data 
                  usage across all residential internet plans, eliminating concerns about monthly data 
                  caps or overage fees that affect many competitors. This policy particularly benefits 
                  households with heavy internet usage, including families with multiple streaming devices, 
                  remote workers, students engaged in online learning, and gaming enthusiasts who require 
                  consistent, unrestricted access to high-speed internet.
                </p>

                <h3 className="text-xl font-semibold mb-3">Security and WiFi Technology</h3>
                <p className="text-muted-foreground">
                  Spectrum provides customers with advanced WiFi routers and security features designed 
                  to protect home networks and optimize wireless performance. The company's internet 
                  service includes built-in security software, parental controls, and WiFi 6 capable 
                  equipment that ensures reliable wireless connectivity throughout the home. Spectrum's 
                  technical support infrastructure assists customers with network optimization and 
                  troubleshooting to maintain consistent internet performance.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Internet Solutions</h3>
                <p className="text-muted-foreground">
                  Charter Spectrum Enterprise serves business customers across industries with scalable 
                  internet solutions ranging from small business broadband to enterprise-grade connectivity. 
                  The company's business services include dedicated internet access, managed networking, 
                  voice communications, and cloud connectivity options that support organizations of all 
                  sizes. Spectrum's business division leverages the same reliable cable infrastructure 
                  that serves residential customers while providing enhanced service level agreements 
                  and dedicated technical support for commercial applications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Integration Services</h3>
                <p className="text-muted-foreground">
                  Spectrum Mobile complements the company's internet services by offering wireless phone 
                  plans that integrate seamlessly with home internet subscriptions. Operating as a mobile 
                  virtual network operator using Verizon's cellular infrastructure, Spectrum Mobile provides 
                  customers with unlimited talk, text, and data options that work in conjunction with 
                  Spectrum's extensive WiFi hotspot network, creating a comprehensive connectivity solution 
                  for both home and mobile internet needs.
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
                <h3 className="text-xl font-semibold mb-3 text-center">Spectrum Cable Network Infrastructure</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Advanced DOCSIS 3.1 technology delivering high-speed internet across America's second-largest cable network
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
                <h3 className="text-xl font-semibold mb-3 text-center">No Data Caps Policy</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Unlimited data usage on all Spectrum residential plans with consistent speed performance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About Spectrum Speed Test</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What is a good Spectrum internet speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      For most households, 100+ Mbps download speed is recommended. Spectrum's base plan offers 300 Mbps download 
                      and 10 Mbps upload, which supports multiple devices, HD streaming, and remote work requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How do I run an accurate Spectrum speed test?</h4>
                    <p className="text-sm text-muted-foreground">
                      Use a wired ethernet connection, close all background applications, disconnect other devices, and run multiple 
                      tests at different times. This provides the most accurate representation of your Spectrum connection speed.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why are my Spectrum speeds slower than advertised?</h4>
                    <p className="text-sm text-muted-foreground">
                      Common causes include WiFi interference, multiple devices connected, outdated router equipment, network 
                      congestion during peak hours, or testing during high-usage periods in your area.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How can I improve my Spectrum internet speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      Restart your modem monthly, use ethernet instead of WiFi, relocate your router centrally, disconnect unused 
                      devices, and ensure your equipment supports your speed tier. Contact Spectrum if issues persist.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When should I contact Spectrum support?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact Spectrum at 800-892-4357 if speed tests consistently show speeds significantly below your plan's 
                      advertised rate, or if troubleshooting steps don't resolve persistent connectivity issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What's the difference between WiFi and wired speeds?</h4>
                    <p className="text-sm text-muted-foreground">
                      WiFi speeds typically range 30-50% of advertised speeds due to interference and distance. Ethernet connections 
                      should reach at least 80% of your Spectrum plan's advertised speed for optimal performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="us" currentProviderSlug="spectrum" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background/50 backdrop-blur-sm border-t border-border/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Footer Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">US Providers</h4>
              <div className="space-y-2 text-sm">
                <Link href="/providers/us/spectrum" className="block text-muted-foreground hover:text-primary transition-colors">
                  Spectrum Speed Test
                </Link>
                <Link href="/providers/us/verizon" className="block text-muted-foreground hover:text-primary transition-colors">
                  Verizon Speed Test
                </Link>
                <Link href="/providers/us/comcast" className="block text-muted-foreground hover:text-primary transition-colors">
                  Comcast Speed Test
                </Link>
                <Link href="/providers/us/att" className="block text-muted-foreground hover:text-primary transition-colors">
                  AT&T Speed Test
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
                <div className="text-muted-foreground">Cable Speed Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">External Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.spectrum.com/internet/speed-test" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Official Spectrum Test
                </a>
                <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speedtest by Ookla
                </a>
                <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Fast.com by Netflix
                </a>
                <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  FCC Broadband Guide
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
              © 2025 Speed Test and Boost. Free Spectrum internet speed test for Charter Spectrum customers. 
              Test your cable internet speed, WiFi performance, and network connectivity. Compare with official Spectrum speed test results.
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
