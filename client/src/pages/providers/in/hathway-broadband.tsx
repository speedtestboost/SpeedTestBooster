import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Network, Router, Signal } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Link } from "wouter";

export default function HathwayBroadbandSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Hathway Broadband Speed Test - Test Hathway Cable Internet Speed 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Hathway Broadband speed test - Cable internet provider with fiber options. Check Hathway speeds across India.');
    }

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'hathway broadband speed test, hathway cable, cable internet');

    // Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'Hathway Broadband Speed Test - Hathway Cable Internet Speed Test' },
      { property: 'og:description', content: 'Free speed test for Hathway Broadband customers. Test Hathway cable internet and fiber speeds across India.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/in/hathway-broadband' },
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
      { name: 'twitter:title', content: 'Hathway Broadband Speed Test - Hathway Cable Internet Speed Test' },
      { name: 'twitter:description', content: 'Free speed test for Hathway Broadband customers. Test Hathway cable internet speeds across India.' }
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
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/in/hathway-broadband');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Hathway Broadband Speed Test 2025",
      "description": "Free Hathway Broadband speed test for Hathway cable internet customers. Test Hathway fiber speeds across India.",
      "url": "https://speedtestboost.com/providers/in/hathway-broadband",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Hathway Broadband Speed Test Tool",
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
        "name": "Hathway Cable & Datacom",
        "description": "Leading cable broadband provider in India offering high-speed internet and digital TV services",
        "areaServed": { "@type": "Country", "name": "India" },
        "serviceType": ["Cable Internet", "Digital TV", "Broadband", "WiFi Services"]
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
            "name": "Hathway Broadband Speed Test",
            "item": "https://speedtestboost.com/providers/in/hathway-broadband"
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
      <Header currentPath="/providers/in/hathway-broadband" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Hathway Broadband Speed Test 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">Hathway Broadband internet speed</span> for free. Check Hathway cable internet speeds, WiFi performance, and digital connectivity across India.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Hathway Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Hathway Cable & Datacom Broadband Service</h2>
              {/* Breadcrumb Navigation */}
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/in" className="hover:text-primary">India Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">Hathway Broadband Speed Test</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  <strong>Hathway Cable & Datacom Limited</strong> operates as one of India's prominent cable broadband 
                  providers, serving approximately 11 million subscribers with around 1.77 million having access to 
                  high-speed internet services. Established as a pioneering cable television and broadband company, 
                  Hathway has evolved into a comprehensive digital services provider offering cable internet, fiber 
                  broadband, and digital TV services with speeds ranging from 50 Mbps to 300 Mbps across major 
                  Indian cities and suburban areas.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable and Fiber Broadband Infrastructure</h3>
                <p className="text-muted-foreground">
                  Hathway utilizes a hybrid network combining traditional <strong>cable internet technology</strong> with 
                  modern fiber-optic infrastructure to deliver reliable broadband connectivity across residential and 
                  commercial areas. The service portfolio includes multiple speed tiers: 50 Mbps, 100 Mbps, 150 Mbps, 
                  200 Mbps, and 300 Mbps plans, each designed to meet diverse connectivity requirements from basic web 
                  browsing to high-bandwidth applications like video streaming, online gaming, and work-from-home setups. 
                  Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">speed requirements calculator</Link> to determine the most suitable Hathway broadband plan for your specific internet usage needs.
                </p>

                <h3 className="text-xl font-semibold mb-3">Urban and Suburban Coverage Network</h3>
                <p className="text-muted-foreground">
                  Hathway's broadband network spans across major Indian cities and suburban localities, with strong 
                  presence in metropolitan areas and expanding coverage in tier-2 cities. The company's cable infrastructure 
                  legacy enables effective last-mile connectivity in densely populated urban areas, residential complexes, 
                  and commercial districts where traditional cable TV services have established foundations. Compare Hathway 
                  Broadband with other major Indian providers like <Link href="/providers/in/jio-fiber" className="text-primary hover:underline">Jio Fiber</Link>, 
                  <Link href="/providers/in/airtel-broadband" className="text-primary hover:underline">Airtel Broadband</Link>, and 
                  <Link href="/providers/in/act-fibernet" className="text-primary hover:underline">ACT Fibernet</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital TV and Broadband Bundling</h3>
                <p className="text-muted-foreground">
                  Hathway's integrated approach combines cable broadband with digital television services, providing 
                  customers with comprehensive entertainment and connectivity solutions through bundled packages. The 
                  service includes access to multiple TV channels, digital content platforms, and video-on-demand services 
                  alongside high-speed internet connectivity, creating value for households seeking combined entertainment 
                  and internet services from a single provider with unified billing and customer support.
                </p>

                <h3 className="text-xl font-semibold mb-3">Competitive Pricing and Data Plans</h3>
                <p className="text-muted-foreground">
                  Hathway Broadband emphasizes affordable pricing structures and flexible data plans designed to accommodate 
                  various budget requirements and usage patterns across Indian households. The service offers competitive 
                  monthly rates with generous data allowances, unlimited usage options on higher-tier plans, and transparent 
                  pricing without hidden charges, making reliable broadband connectivity accessible to middle-class families, 
                  students, small businesses, and residential communities seeking cost-effective internet solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Local Service and Technical Support</h3>
                <p className="text-muted-foreground">
                  Hathway provides localized customer service through neighborhood service centers, field technicians, 
                  and dedicated customer support teams familiar with area-specific connectivity challenges and infrastructure 
                  requirements. The company's local presence enables quick response times for installation, maintenance, 
                  and technical support, ensuring reliable service delivery and customer satisfaction. Regular network 
                  monitoring and infrastructure upgrades help maintain consistent broadband performance for Hathway customers 
                  across diverse urban and suburban environments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Speed Test Performance Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-orange-500/10 rounded-full">
                    <Network className="h-12 w-12 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Cable Broadband Network</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Hybrid cable and fiber infrastructure delivering reliable internet speeds up to 300 Mbps
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-yellow-500/10 rounded-full">
                    <Signal className="h-12 w-12 text-yellow-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Integrated Digital Services</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Combined broadband and digital TV services with local support and competitive pricing
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About Hathway Broadband Speed Test</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What is a good Hathway Broadband internet speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      For most households, 100+ Mbps download speed is ideal. Hathway's popular plans offer 
                      150 Mbps, 200 Mbps, and 300 Mbps speeds, suitable for multiple devices, streaming, and remote work.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How do I test my Hathway cable internet speed accurately?</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect directly to your Hathway modem via ethernet cable, close streaming applications, 
                      disconnect other devices, and run multiple tests throughout the day for consistent measurements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why is my Hathway broadband slower than expected?</h4>
                    <p className="text-sm text-muted-foreground">
                      Common causes include WiFi interference, cable connection issues, multiple devices streaming, 
                      neighborhood network congestion, or router placement affecting signal quality.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How can I improve my Hathway broadband speed?</h4>
                    <p className="text-sm text-muted-foreground">
                      Check cable connections, restart your Hathway modem regularly, use ethernet for streaming devices, 
                      optimize router placement, and contact local Hathway service center for cable line inspection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When should I contact Hathway customer support?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact Hathway support at 1800-419-5555 if speed tests consistently show significantly lower speeds 
                      than your plan, frequent disconnections occur, or basic troubleshooting doesn't resolve issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What's the difference between cable and fiber speeds on Hathway?</h4>
                    <p className="text-sm text-muted-foreground">
                      Cable connections typically deliver 60-80% of advertised speeds while fiber connections can achieve 
                      85-95% of advertised speeds. Ethernet connections provide better performance than WiFi for both technologies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                <Link href="/providers/in/hathway-broadband" className="block text-muted-foreground hover:text-primary transition-colors">
                  Hathway Broadband Speed Test
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
                <a href="https://www.hathway.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Official Hathway Website
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
              © 2025 Speed Test and Boost. Free Hathway Broadband internet speed test for Hathway customers. 
              Test your Hathway cable internet speed, WiFi performance, and digital connectivity across India.
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