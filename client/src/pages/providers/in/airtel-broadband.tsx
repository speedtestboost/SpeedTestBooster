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

export default function AirtelBroadbandSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Airtel Speed Test India - Check Xstream Fiber Internet Speed Free 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Airtel Xstream Fiber speed instantly - Free speed checker for India. Accurate 1 Gbps download/upload broadband results in seconds.');
    }

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'airtel broadband speed test, bharti airtel, xstream fiber');

    // Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Airtel Broadband Speed Test - Bharti Airtel Fiber Speed Test' },
      { property: 'og:description', content: 'Free speed test for Bharti Airtel Broadband customers. Test Airtel Xstream Fiber speeds up to 1 Gbps across India.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/in/airtel-broadband' },
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
      { name: 'twitter:title', content: 'Airtel Broadband Speed Test - Bharti Airtel Fiber Speed Test' },
      { name: 'twitter:description', content: 'Free speed test for Bharti Airtel Broadband customers. Test Airtel Xstream Fiber speeds up to 1 Gbps.' }
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
    canonical.href = 'https://speedtestboost.com/providers/in/airtel-broadband';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Airtel Broadband Speed Test 2025",
      "description": "Free Airtel Broadband speed test for Bharti Airtel fiber customers. Test Airtel Xstream Fiber speeds up to 1 Gbps across India.",
      "url": "https://speedtestboost.com/providers/in/airtel-broadband",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Airtel Broadband Speed Test Tool",
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
        "name": "Bharti Airtel",
        "description": "India's second-largest telecom operator offering fiber broadband and mobile services",
        "areaServed": { "@type": "Country", "name": "India" },
        "serviceType": ["Fiber Internet", "Broadband", "Mobile Services", "Digital TV"]
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
            "name": "Airtel Broadband Speed Test",
            "item": "https://speedtestboost.com/providers/in/airtel-broadband"
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
      <Header currentPath="/providers/in/airtel-broadband" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "India", href: "/internet-providers" },
              { label: "Airtel Broadband", href: "/providers/in/airtel-broadband" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Airtel Broadband Speed Test 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Bharti Airtel Broadband internet speed</span> for free. Check Airtel Xstream Fiber speeds, WiFi performance, and network connectivity across India.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Airtel Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Bharti Airtel Broadband Service</h2>
              {/* Breadcrumb Navigation */}
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/in" className="hover:text-primary">India Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">Airtel Broadband Speed Test</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  <strong>Bharti Airtel Broadband</strong> stands as India's second-largest internet service provider, 
                  commanding a substantial 33.65% market share with over 391.5 million subscribers across the country. 
                  Operating under the Airtel Xstream Fiber brand, this fiber-to-the-home service has established itself 
                  as a premium broadband provider offering high-speed internet connectivity with speeds ranging from 
                  40 Mbps to 1 Gbps, serving urban metros, tier-2 cities, and expanding rural markets throughout India.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Airtel Xstream Fiber Technology and Speed Plans</h3>
                <p className="text-muted-foreground">
                  Airtel Xstream Fiber utilizes advanced <strong>fiber-optic infrastructure</strong> combined with cutting-edge 
                  networking technology to deliver consistent high-speed internet directly to customers' premises across India. 
                  The service portfolio includes comprehensive speed tiers: 40 Mbps, 100 Mbps, 200 Mbps, 300 Mbps, 500 Mbps, 
                  and 1 Gbps plans, each designed to support diverse digital requirements from basic web browsing to bandwidth-intensive 
                  applications like 4K streaming, video conferencing, online gaming, and smart home ecosystems. Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">speed requirements calculator</Link> to find the perfect Airtel plan for your specific needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Network Coverage and Digital Infrastructure</h3>
                <p className="text-muted-foreground">
                  Airtel has deployed an extensive fiber network spanning over 1,000 cities and towns across India, 
                  focusing on major metropolitan areas while rapidly expanding to tier-2 and tier-3 cities. The company's 
                  strategic network investment includes submarine cable partnerships, data center infrastructure, and 
                  5G-ready fiber backbone, positioning Airtel as a technology leader in India's digital transformation journey. 
                  Compare Airtel Broadband with other leading Indian providers like <Link href="/providers/in/jio-fiber" className="text-primary hover:underline">Jio Fiber</Link>, 
                  <Link href="/providers/in/act-fibernet" className="text-primary hover:underline">ACT Fibernet</Link>, and 
                  <Link href="/providers/in/bsnl-broadband" className="text-primary hover:underline">BSNL Broadband</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">Premium Entertainment and OTT Integration</h3>
                <p className="text-muted-foreground">
                  Airtel Xstream Fiber distinguishes itself through comprehensive entertainment bundling, offering customers 
                  access to Airtel Xstream app with over 10,000 movies and shows, live TV channels, and premium OTT platform 
                  subscriptions including Netflix, Amazon Prime Video, Disney+ Hotstar, and ZEE5. This integrated approach 
                  provides exceptional value for Indian families seeking both high-speed connectivity and diverse digital 
                  entertainment options without additional subscription management complexity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Unlimited Data and Fair Usage Policy</h3>
                <p className="text-muted-foreground">
                  Bharti Airtel provides unlimited data usage across most residential broadband plans with generous fair usage 
                  policy limits that accommodate heavy internet consumption patterns. The service caters particularly well to 
                  households with multiple connected devices, remote professionals, content creators, streaming enthusiasts, 
                  and gaming communities who require reliable, high-speed connectivity for work, education, and entertainment 
                  without concerns about data consumption restrictions or overage charges.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Solutions and Customer Support</h3>
                <p className="text-muted-foreground">
                  Airtel Business provides dedicated enterprise broadband solutions with service level agreements, dedicated 
                  account management, and priority technical support for corporate clients across India. The consumer broadband 
                  service includes 24/7 customer support through Airtel Thanks app, dedicated helpline, and local service 
                  technicians for installation and maintenance. Regular network monitoring, proactive service notifications, 
                  and commitment to service quality ensure reliable internet performance for both business and residential customers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Speed Test Performance Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-red-500/10 rounded-full">
                    <Network className="h-12 w-12 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Airtel Xstream Fiber Network</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Premium fiber-optic infrastructure delivering speeds up to 1 Gbps with OTT entertainment bundling
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-orange-500/10 rounded-full">
                    <Signal className="h-12 w-12 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Premium Service Quality</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Superior network reliability with 24/7 customer support and entertainment integration
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About Airtel Broadband Speed Test</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What is a good Airtel Broadband internet speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      For most Indian households, 100+ Mbps download speed is ideal. Airtel's popular plans offer 
                      200 Mbps, 300 Mbps, and 1 Gbps speeds, perfect for multiple devices, 4K streaming, and remote work requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How do I test my Airtel Xstream Fiber speed accurately?</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect directly to your Airtel router via ethernet cable, close all background applications, 
                      disconnect other devices, and run multiple tests throughout the day for consistent speed measurements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why is my Airtel broadband slower than expected?</h4>
                    <p className="text-sm text-muted-foreground">
                      Common causes include WiFi interference, multiple connected devices, router placement issues, 
                      network congestion during peak hours (7-11 PM), or testing during high-traffic periods in your locality.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How can I improve my Airtel broadband speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      Restart your Airtel router regularly, use wired connections for important tasks, optimize router placement, 
                      update firmware via Airtel Thanks app, and ensure minimal WiFi interference from other devices.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When should I contact Airtel customer support?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact Airtel support through Airtel Thanks app or 121 helpline if consistent speed tests show significantly 
                      lower speeds than your subscribed plan, or if troubleshooting doesn't resolve persistent connectivity issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What's the difference between WiFi and wired speeds on Airtel?</h4>
                    <p className="text-sm text-muted-foreground">
                      WiFi typically delivers 50-70% of advertised speeds due to interference and distance factors. 
                      Ethernet connections should achieve 85-95% of your Airtel plan's advertised speed for optimal performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="in" currentProviderSlug="airtel-broadband" />
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
                <a href="https://www.airtel.in/broadband" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Official Airtel Broadband
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
              © 2025 Speed Test and Boost. Free Airtel Broadband internet speed test for Bharti Airtel customers. 
              Test your Airtel Xstream Fiber speed, WiFi performance, and network connectivity across India.
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