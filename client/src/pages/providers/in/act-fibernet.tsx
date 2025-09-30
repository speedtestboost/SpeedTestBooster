import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Network, Router, Signal } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Link } from "wouter";

export default function ACTFibernetSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "ACT Fibernet Speed Test India - Check Fiber Internet Speed Free 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test ACT Fibernet internet speed instantly - Free speed test for India. Accurate 1 Gbps fiber download/upload & gaming performance now.');
    }

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'act fibernet speed test, act broadband, gaming fiber');

    // Open Graph tags for social sharing
    const ogTags = [
      { property: 'og:title', content: 'ACT Fibernet Speed Test - ACT Broadband Fiber Speed Test' },
      { property: 'og:description', content: 'Free speed test for ACT Fibernet customers. Test ACT fiber internet speeds up to 1 Gbps in metro cities across India.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/in/act-fibernet' },
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
      { name: 'twitter:title', content: 'ACT Fibernet Speed Test - ACT Broadband Fiber Speed Test' },
      { name: 'twitter:description', content: 'Free speed test for ACT Fibernet customers. Test ACT fiber internet speeds up to 1 Gbps.' }
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
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/in/act-fibernet');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "ACT Fibernet Speed Test 2025",
      "description": "Free ACT Fibernet speed test for ACT broadband customers. Test ACT fiber internet speeds up to 1 Gbps in metro cities.",
      "url": "https://speedtestboost.com/providers/in/act-fibernet",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "ACT Fibernet Speed Test Tool",
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
        "name": "ACT Fibernet",
        "description": "Leading fiber broadband provider in Indian metropolitan cities specializing in high-speed internet and gaming",
        "areaServed": { "@type": "Country", "name": "India" },
        "serviceType": ["Fiber Internet", "Gaming Broadband", "Business Internet", "WiFi Services"]
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
            "name": "ACT Fibernet Speed Test",
            "item": "https://speedtestboost.com/providers/in/act-fibernet"
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
      <Header currentPath="/providers/in/act-fibernet" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              ACT Fibernet Speed Test 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">ACT Fibernet internet speed</span> for free. Check ACT broadband speeds up to 1 Gbps, gaming performance, and fiber connectivity in metro cities.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test ACT Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About ACT Fibernet Broadband Service</h2>
              {/* Breadcrumb Navigation */}
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/in" className="hover:text-primary">India Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">ACT Fibernet Speed Test</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  <strong>ACT Fibernet</strong> operates as India's premier fiber broadband provider specializing in 
                  high-speed internet services across major metropolitan cities and urban centers. Known for delivering 
                  exceptional speeds and reliability, ACT Fibernet has established itself as the preferred choice for 
                  gaming enthusiasts, content creators, and professionals requiring ultra-fast internet connectivity 
                  with speeds ranging from 50 Mbps to 1 Gbps across cities including Bengaluru, Chennai, Hyderabad, 
                  Delhi, and other major Indian metros.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">High-Performance Fiber Network and Gaming Focus</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet utilizes cutting-edge <strong>fiber-optic infrastructure</strong> designed specifically 
                  for low-latency, high-bandwidth applications, making it the optimal choice for online gaming, live 
                  streaming, video conferencing, and bandwidth-intensive professional work. The service offers comprehensive 
                  speed plans including 50 Mbps, 100 Mbps, 150 Mbps, 200 Mbps, 300 Mbps, 500 Mbps, and 1 Gbps options, 
                  each optimized for minimal ping times and consistent performance during peak usage hours. Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">speed requirements calculator</Link> to determine the ideal ACT Fibernet plan for gaming, streaming, or professional requirements.
                </p>

                <h3 className="text-xl font-semibold mb-3">Metropolitan Coverage and Urban Excellence</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet focuses on providing premium broadband services across India's major metropolitan areas, 
                  with extensive coverage in technology hubs like Bengaluru, Chennai, Hyderabad, Delhi NCR, Mumbai, 
                  Pune, and other tier-1 cities. The company's strategic approach emphasizes quality over quantity, 
                  ensuring superior network performance and customer service within its coverage areas rather than 
                  pursuing widespread geographical expansion. Compare ACT Fibernet with other major Indian providers 
                  like <Link href="/providers/in/jio-fiber" className="text-primary hover:underline">Jio Fiber</Link>, 
                  <Link href="/providers/in/airtel-broadband" className="text-primary hover:underline">Airtel Broadband</Link>, and 
                  <Link href="/providers/in/bsnl-broadband" className="text-primary hover:underline">BSNL Broadband</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">Gaming and Entertainment Optimization</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet has built its reputation as India's premier gaming broadband provider, offering optimized 
                  network routes for popular gaming platforms, minimal latency to international gaming servers, and 
                  specialized plans designed for competitive gaming and esports enthusiasts. The service includes features 
                  like gaming VPN services, priority bandwidth allocation for gaming traffic, and partnerships with gaming 
                  platforms to ensure optimal performance for multiplayer gaming, live streaming, and content creation activities.
                </p>

                <h3 className="text-xl font-semibold mb-3">Unlimited Data and Performance Guarantee</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet provides truly unlimited data usage across all residential plans without fair usage policy 
                  limitations or speed throttling, ensuring consistent performance regardless of consumption patterns. 
                  The service particularly appeals to power users including software developers, content creators, online 
                  gamers, streamers, and work-from-home professionals who require reliable, high-speed connectivity for 
                  demanding applications without data restrictions or performance degradation during peak usage hours.
                </p>

                <h3 className="text-xl font-semibold mb-3">Premium Customer Support and Technical Excellence</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet emphasizes premium customer service with dedicated technical support teams, rapid response 
                  times for service issues, and proactive network monitoring to maintain optimal performance. The company 
                  provides 24/7 customer support through multiple channels including phone, email, and online portals, 
                  with local technical teams ensuring quick resolution of connectivity issues and installation services. 
                  Regular network upgrades and infrastructure investments maintain ACT Fibernet's position as a technology 
                  leader in India's competitive broadband market.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Speed Test Performance Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 mt-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-purple-500/10 rounded-full">
                    <Network className="h-12 w-12 text-purple-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Gaming-Optimized Network</h3>
                <p className="text-sm text-muted-foreground text-center">
                  High-performance fiber infrastructure optimized for gaming with ultra-low latency and speeds up to 1 Gbps
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-indigo-500/10 rounded-full">
                    <Signal className="h-12 w-12 text-indigo-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Metro City Excellence</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Premium broadband service focused on metropolitan areas with superior customer support
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About ACT Fibernet Speed Test</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What is a good ACT Fibernet internet speed for gaming?</h4>
                    <p className="text-sm text-muted-foreground">
                      For competitive gaming, 100+ Mbps download speed is recommended. ACT's popular gaming plans offer 
                      150 Mbps, 300 Mbps, and 1 Gbps speeds with optimized latency for esports and multiplayer gaming.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How do I test my ACT Fibernet speed accurately?</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect directly to your ACT router via ethernet cable, close gaming applications and streaming services, 
                      disconnect other devices, and run multiple tests to get consistent speed measurements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why is my ACT Fibernet slower than expected?</h4>
                    <p className="text-sm text-muted-foreground">
                      Common causes include WiFi interference, multiple gaming devices connected, router overheating, 
                      background downloads, or network congestion during peak gaming hours (6-11 PM).
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How can I optimize my ACT Fibernet for gaming?</h4>
                    <p className="text-sm text-muted-foreground">
                      Use wired ethernet connections for gaming, enable QoS settings for gaming traffic, restart router regularly, 
                      optimize router placement, and consider ACT's gaming VPN services for international servers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When should I contact ACT Fibernet support?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact ACT support through their app or 04468186186 if speed tests consistently show significantly 
                      lower speeds than your plan, high ping times affecting gaming, or persistent connectivity issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What ping should I expect with ACT Fibernet for gaming?</h4>
                    <p className="text-sm text-muted-foreground">
                      ACT Fibernet typically provides 5-15ms ping to Indian servers and 50-80ms to international gaming servers. 
                      Ethernet connections and gaming plans offer the lowest latency for competitive gaming.
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
                <div className="text-muted-foreground">Gaming Speed Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">External Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.actcorp.in/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Official ACT Fibernet
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
              © 2025 Speed Test and Boost. Free ACT Fibernet internet speed test for ACT broadband customers. 
              Test your ACT fiber speed, gaming performance, and network connectivity in metro cities across India.
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