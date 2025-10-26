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

export default function BSNLBroadbandSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "BSNL Speed Test India - Check FTTH Fiber Internet Speed Free 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test BSNL FTTH fiber internet speed instantly - Free speed test for India. Accurate government broadband performance results in seconds.');
    }

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'bsnl broadband speed test, bsnl ftth, government internet');

    // Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'BSNL Broadband Speed Test - BSNL Fiber Internet Speed Test' },
      { property: 'og:description', content: 'Free speed test for BSNL Broadband customers. Test BSNL FTTH fiber speeds across India with government broadband service.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/in/bsnl-broadband' },
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
      { name: 'twitter:title', content: 'BSNL Broadband Speed Test - BSNL Fiber Internet Speed Test' },
      { name: 'twitter:description', content: 'Free speed test for BSNL Broadband customers. Test BSNL FTTH fiber speeds across India.' }
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
    canonical.href = 'https://speedtestboost.com/providers/in/bsnl-broadband';

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "BSNL Broadband Speed Test 2025",
      "description": "Free BSNL Broadband speed test for BSNL fiber customers. Test BSNL FTTH speeds across India with government broadband service.",
      "url": "https://speedtestboost.com/providers/in/bsnl-broadband",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "BSNL Broadband Speed Test Tool",
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
        "name": "BSNL",
        "description": "Bharat Sanchar Nigam Limited - India's government-owned telecommunications company",
        "areaServed": { "@type": "Country", "name": "India" },
        "serviceType": ["Fiber Internet", "Broadband", "Mobile Services", "Landline Services"]
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
            "name": "BSNL Broadband Speed Test",
            "item": "https://speedtestboost.com/providers/in/bsnl-broadband"
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
      <Header currentPath="/providers/in/bsnl-broadband" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "India", href: "/internet-providers" },
              { label: "Bsnl Broadband", href: "/providers/in/bsnl-broadband" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              BSNL Broadband Speed Test 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">BSNL Broadband internet speed</span> for free. Check BSNL FTTH fiber speeds, WiFi performance, and government broadband connectivity across India.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test BSNL Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About BSNL Broadband Service</h2>
              {/* Breadcrumb Navigation */}
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/in" className="hover:text-primary">India Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">BSNL Broadband Speed Test</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  <strong>Bharat Sanchar Nigam Limited (BSNL)</strong> operates as India's premier government-owned 
                  telecommunications company, maintaining a 7.77% market share with over 90.36 million subscribers 
                  across the nation. As India's largest public sector undertaking in telecommunications, BSNL provides 
                  comprehensive broadband services through its FTTH (Fiber-to-the-Home) network, offering reliable 
                  internet connectivity with speeds ranging from 10 Mbps to 300 Mbps across both urban and rural 
                  areas throughout India's diverse geographical landscape.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">BSNL FTTH Network and Speed Options</h3>
                <p className="text-muted-foreground">
                  BSNL's fiber-to-the-home infrastructure leverages <strong>advanced fiber-optic technology</strong> to 
                  deliver consistent broadband connectivity directly to subscribers' premises across India. The service 
                  portfolio encompasses multiple speed tiers including 10 Mbps, 20 Mbps, 50 Mbps, 100 Mbps, 200 Mbps, 
                  and 300 Mbps plans, each designed to accommodate different usage patterns from basic internet browsing 
                  to bandwidth-intensive applications like video streaming, online education, and remote work requirements. 
                  Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">speed requirements calculator</Link> to identify the optimal BSNL plan for your specific connectivity needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Nationwide Coverage and Rural Connectivity</h3>
                <p className="text-muted-foreground">
                  BSNL maintains India's most extensive telecommunications infrastructure, providing broadband services 
                  across all 28 states and 8 union territories with particular strength in rural and remote areas where 
                  private operators have limited presence. The company's commitment to digital inclusion ensures broadband 
                  accessibility in underserved regions, supporting government initiatives like Digital India and contributing 
                  to bridging the digital divide between urban and rural communities. Compare BSNL Broadband with other 
                  major Indian providers like <Link href="/providers/in/jio-fiber" className="text-primary hover:underline">Jio Fiber</Link>, 
                  <Link href="/providers/in/airtel-broadband" className="text-primary hover:underline">Airtel Broadband</Link>, and 
                  <Link href="/providers/in/act-fibernet" className="text-primary hover:underline">ACT Fibernet</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">Affordable Pricing and Government Initiatives</h3>
                <p className="text-muted-foreground">
                  As a government-owned entity, BSNL emphasizes affordable broadband pricing to promote digital accessibility 
                  across all economic segments of Indian society. The service supports various government digital initiatives 
                  including e-governance, digital education, telemedicine, and rural development programs, providing reliable 
                  internet connectivity for public institutions, educational establishments, healthcare facilities, and 
                  government offices across the country while maintaining competitive pricing for residential customers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Unlimited Data and Fair Usage Policy</h3>
                <p className="text-muted-foreground">
                  BSNL Broadband offers generous data allowances and unlimited usage options across most residential plans, 
                  with transparent fair usage policies that accommodate typical household internet consumption patterns. 
                  The service caters to diverse user requirements including students pursuing online education, professionals 
                  working from home, small businesses requiring reliable connectivity, and families seeking affordable 
                  high-speed internet for entertainment, communication, and digital services access without excessive data restrictions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Technical Support and Service Reliability</h3>
                <p className="text-muted-foreground">
                  BSNL provides comprehensive technical support through local telephone exchanges, dedicated customer service 
                  centers, and online portals for service management and troubleshooting assistance. The company's extensive 
                  field infrastructure ensures prompt service delivery and maintenance support across India's diverse terrain, 
                  from metropolitan cities to remote villages. Regular network upgrades and infrastructure modernization 
                  programs help maintain service quality and reliability for BSNL Broadband customers nationwide.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Speed Test Performance Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-green-500/10 rounded-full">
                    <Network className="h-12 w-12 text-green-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">BSNL FTTH Network</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Government-owned fiber infrastructure delivering reliable broadband across urban and rural India
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-blue-500/10 rounded-full">
                    <Signal className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Affordable Connectivity</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Cost-effective broadband plans supporting Digital India initiatives and rural connectivity
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About BSNL Broadband Speed Test</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What is a good BSNL Broadband internet speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      For most households, 50+ Mbps download speed is sufficient. BSNL's popular plans offer 
                      100 Mbps, 200 Mbps, and 300 Mbps speeds, suitable for multiple devices, HD streaming, and online work requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How do I test my BSNL FTTH speed accurately?</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect directly to your BSNL modem via ethernet cable, close background applications, 
                      disconnect other devices, and run tests at different times to get consistent speed measurements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why is my BSNL broadband slower than expected?</h4>
                    <p className="text-sm text-muted-foreground">
                      Common issues include WiFi interference, multiple connected devices, outdated modem firmware, 
                      network congestion during peak hours, or local infrastructure maintenance activities.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How can I improve my BSNL broadband speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      Restart your BSNL modem regularly, use wired connections for important tasks, optimize WiFi placement, 
                      ensure proper cable connections, and contact local BSNL exchange for technical support if needed.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When should I contact BSNL customer support?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact BSNL customer care at 1500 or visit local telephone exchange if speed tests consistently 
                      show significantly lower speeds than your plan, or if basic troubleshooting doesn't resolve connectivity issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What's the difference between WiFi and wired speeds on BSNL?</h4>
                    <p className="text-sm text-muted-foreground">
                      WiFi typically delivers 40-60% of advertised speeds due to interference and router limitations. 
                      Ethernet connections should achieve 70-85% of your BSNL plan's advertised speed for reliable performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="in" currentProviderSlug="bsnl-broadband" />
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
                <div className="text-muted-foreground">Government Broadband Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">External Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.bsnl.co.in/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Official BSNL Website
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
              © 2025 Speed Test and Boost. Free BSNL Broadband internet speed test for BSNL customers. 
              Test your BSNL FTTH fiber speed, WiFi performance, and government broadband connectivity across India.
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