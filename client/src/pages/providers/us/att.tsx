import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Router, Network, Signal } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderSEO from "@/components/ProviderSEO";
import { providerKeywords } from "@/seo/providerKeywords";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";
import { Link } from "wouter";

export default function ATTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.att;

  useEffect(() => {
    document.title = "AT&T Speed Test USA - Check Fiber Internet Speed Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test AT&T Fiber internet speed instantly - Free speed test for USA. Accurate gigabit download/upload performance results in seconds.');
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'att speed test, at&t fiber speed test, att internet speed test, at&t wifi speed test, att fiber test, att dsl speed test, at&t internet test, att upload speed test, at&t speed check, att fixed wireless test, at&t gigapower test, att broadband test');

    const ogTags = [
      { property: 'og:title', content: 'AT&T Speed Test USA - Free Fiber Internet Speed Test 2025' },
      { property: 'og:description', content: 'Test AT&T Fiber internet speed. Check download/upload speeds and ping. Accurate AT&T speed test results for fiber and DSL.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/us/att' },
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

    const twitterTags = [
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'AT&T Speed Test USA - Free Fiber Internet Speed Test 2025' },
      { name: 'twitter:description', content: 'Test AT&T Fiber internet speed. Accurate AT&T speed test for download, upload, and ping.' }
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

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/providers/us/att';


    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AT&T Speed Test 2025",
      "description": "Test your AT&T internet speed for free. Speed test for AT&T fiber and DSL customers.",
      "url": "https://speedtestboost.com/providers/us/att",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "AT&T Speed Test Tool",
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
        "name": "AT&T",
        "description": "Major US telecommunications company providing fiber and DSL internet services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Fiber Internet", "DSL", "Fixed Wireless", "5G", "TV", "Business Services"]
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
            "name": "AT&T Speed Test",
            "item": "https://speedtestboost.com/providers/us/att"
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        document.head.removeChild(existingCanonical);
      }
      
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="att" />
      <Header currentPath="/providers/us/att" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "AT&T", href: "/providers/us/att" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-orange-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              {seoConfig.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-orange-500">AT&T internet speed</span> for free. Check your AT&T Fiber or DSL internet performance with symmetrical gigabit speeds.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-att-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test AT&T Speed Now
              </Button>
            </div>
          </div>

          {/* Pro Tip Callout */}
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate AT&T Fiber Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your AT&T gateway for the most accurate <strong>AT&T Fiber speed test</strong> results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (6-11 PM) when network traffic is highest for the best <strong>AT&T internet speed test</strong> accuracy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your AT&T Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your <strong>AT&T speed test</strong> results mean and how to interpret download speeds, upload speeds, and ping for optimal fiber and DSL internet performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⬇️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Download Speed</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Download speed</strong> measures how fast data travels from the internet to your device. 
                    <strong>AT&T Fiber</strong> delivers symmetrical speeds ranging from 300 Mbps to 5 Gig (5000 Mbps), 
                    while DSL typically provides 10-100 Mbps. This speed determines how quickly you can stream video, download files, and browse websites.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⬆️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Upload Speed</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Upload speed</strong> shows how fast you can send data from your device to the internet. 
                    Unlike cable or DSL, <strong>AT&T Fiber offers symmetrical speeds</strong>—meaning your upload speed 
                    matches your download speed (300 Mbps to 5 Gig). This is ideal for video conferencing, cloud backups, and content creation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Ping Rate (Latency)</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Ping</strong> measures network latency—how long it takes for data to travel to a server and back. 
                    AT&T Fiber typically delivers ping under 10-20 ms thanks to its direct fiber connection, 
                    making it excellent for gaming, video calls, and real-time applications. Test your <Link href="/ping-test" className="text-primary hover:underline">ping here</Link>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About AT&T</h2>
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/us" className="hover:text-primary">US Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">AT&T Speed Test</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  AT&T Inc. operates as one of America's oldest and largest telecommunications companies, with a rich 
                  history spanning more than a century of communications innovation. Today, AT&T serves millions of 
                  customers across the United States with comprehensive internet, mobile, and digital services while 
                  maintaining extensive network infrastructure that supports both consumer and enterprise telecommunications 
                  needs throughout the American market. Regular <strong>AT&T speed tests</strong> help ensure optimal performance.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">AT&T Fiber Network Excellence</h3>
                <p className="text-muted-foreground">
                  <strong>AT&T Fiber</strong> represents the company's investment in next-generation network technology, delivering 
                  <strong>symmetrical gigabit internet speeds</strong> directly to homes and businesses across expanding service areas. 
                  The company's fiber deployment strategy focuses on both urban centers and suburban communities, 
                  providing customers with advanced broadband capabilities ranging from 300 Mbps to 5 Gig that support streaming, 
                  remote work, and smart home applications. AT&T's 100% fiber-optic network ensures ultra-reliable high-speed 
                  connectivity with equal upload and download speeds—a major advantage over cable competitors. 
                  Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">speed requirements calculator</Link> to determine your ideal plan. 
                  Compare AT&T with <Link href="/providers/us/verizon" className="text-primary hover:underline">Verizon</Link>, 
                  <Link href="/providers/us/spectrum" className="text-primary hover:underline">Spectrum</Link>, and 
                  <Link href="/providers/us/comcast" className="text-primary hover:underline">Comcast</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">Extensive Network Coverage</h3>
                <p className="text-muted-foreground">
                  AT&T operates one of America's most extensive telecommunications network infrastructures, built upon 
                  decades of investment in copper, fiber, and wireless technologies. The company's network spans rural 
                  communities, suburban areas, and major metropolitan centers including Dallas, Houston, Atlanta, Los Angeles, 
                  and Chicago, providing comprehensive coverage that reflects AT&T's historical role as America's primary 
                  telecommunications provider. This extensive infrastructure foundation enables diverse connectivity solutions 
                  across varied geographic markets, from <strong>AT&T Fiber</strong> in urban areas to DSL and Fixed Wireless in rural regions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Integrated Communications Platform</h3>
                <p className="text-muted-foreground">
                  AT&T provides integrated telecommunications solutions that combine internet connectivity with mobile 
                  services, television programming, and business communications platforms. The company's approach 
                  emphasizes bundled services that leverage multiple network technologies to provide customers with 
                  comprehensive connectivity solutions. This integration strategy appeals to customers seeking unified 
                  telecommunications services from a single provider, with options for fiber, DSL, and fixed wireless internet. 
                  Check our <Link href="/wifi-speed-optimization" className="text-primary hover:underline">WiFi optimization guide</Link> for better performance.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise and Business Solutions</h3>
                <p className="text-muted-foreground">
                  AT&T Business delivers sophisticated telecommunications solutions for American enterprises, including 
                  dedicated internet access, private networking, cloud services, and cybersecurity applications. The 
                  company's business division leverages its extensive network infrastructure and technical expertise 
                  to serve large corporations, government agencies, and small businesses with scalable connectivity 
                  solutions that support diverse operational requirements. Regular <strong>AT&T internet speed tests</strong> ensure 
                  businesses are getting the reliable fiber performance they need.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps AT&T customers monitor their internet performance and ensure optimal 
                  service delivery from their fiber, DSL, or wireless connection. Our <strong>AT&T Fiber speed test</strong> measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  reliable internet service that reflects AT&T's telecommunications heritage and technological capabilities. 
                  For fiber customers, regular <strong>AT&T speed tests</strong> verify you're getting the symmetrical gigabit speeds you pay for.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pro Tip Callout 2 */}
          <Card className="mb-12 mt-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💡</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your AT&T Fiber Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>AT&T Fiber speed test</strong> results, ensure your equipment supports your plan speed. 
                    Multi-gig plans (2 Gig, 5 Gig) require compatible gateway and network cards. Position your AT&T gateway centrally 
                    and avoid interference from thick walls or electronics. For DSL customers, line quality impacts speeds—contact 
                    <a href="https://att.com/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> AT&T support</a> if 
                    <strong>AT&T internet speed tests</strong> consistently show poor results. Use our <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi analyzer</Link> to optimize channel selection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speed Test Performance Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-orange-500/10 rounded-full">
                    <Network className="h-12 w-12 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">AT&T Fiber Symmetrical Speeds</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Pure fiber-optic technology delivering equal upload and download speeds from 300 Mbps to 5 Gig across major US markets
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
                <h3 className="text-xl font-semibold mb-3 text-center">Multi-Technology Coverage</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Fiber, DSL, and Fixed Wireless options providing internet access across urban, suburban, and rural America
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cities with Fastest AT&T Fiber Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest AT&T Fiber Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                AT&T Fiber delivers exceptional symmetrical internet speeds across major US metros with multi-gig speeds widely available and excellent <strong>AT&T speed test</strong> results.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Dallas</div>
                  <div className="text-sm text-muted-foreground">Up to 5 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Houston</div>
                  <div className="text-sm text-muted-foreground">Up to 5 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Atlanta</div>
                  <div className="text-sm text-muted-foreground">Up to 5 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Los Angeles</div>
                  <div className="text-sm text-muted-foreground">Up to 5 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Chicago</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing AT&T Fiber markets include Austin, San Antonio, Nashville, Charlotte, and Birmingham. 
                AT&T's 100% fiber-optic network ensures ultra-reliable high-speed connectivity with symmetrical upload/download speeds.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-att-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your AT&T Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow AT&T Internet Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your <strong>AT&T speed test</strong> results are below expectations, try these proven solutions before contacting technical support:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Optimize Wi-Fi Signal Strength</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Position your <strong>AT&T gateway</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the gateway away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider a <strong>WiFi 6 router</strong> or mesh system for larger homes with AT&T Fiber</li>
                      <li>Check your <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi analyzer</Link> for optimal channel selection</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Router className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Verify Equipment Compatibility</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Ensure your gateway supports your subscribed speed tier (multi-gig capable for 2 Gig/5 Gig plans)</li>
                      <li>Check that Ethernet cables are <strong>Cat6 or Cat6a</strong> for optimal AT&T Fiber performance</li>
                      <li>Update your AT&T gateway firmware through the Smart Home Manager app</li>
                      <li>Contact <a href="https://att.com/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AT&T support</a> at <strong>1-800-288-2020</strong> for equipment upgrades if needed</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Network className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Test With Ethernet Connection</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Use a <strong>wired Ethernet connection</strong> to eliminate WiFi as the bottleneck</li>
                      <li>If wired speeds are normal but WiFi is slow, the issue is your wireless setup</li>
                      <li>Run a <Link href="/ping-test" className="text-primary hover:underline">ping test</Link> to check for latency issues</li>
                      <li>AT&T Fiber should deliver 90%+ of plan speed on wired connections with symmetrical upload/download</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Signal className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">4. Manage Connected Devices</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Disconnect unused devices that may be consuming bandwidth</li>
                      <li>Limit simultaneous 4K streams and large downloads during <strong>AT&T speed tests</strong></li>
                      <li>Use <strong>Quality of Service (QoS)</strong> settings to prioritize critical traffic</li>
                      <li>Check your <Link href="/wifi-speed-optimization" className="text-primary hover:underline">WiFi optimization guide</Link> for advanced tips</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact AT&T Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact AT&T support at <strong>1-800-288-2020</strong></li>
                      <li>Check for fiber line issues or local network outages on <a href="https://att.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AT&T's website</a></li>
                      <li>Request a technician visit to inspect your fiber connection and ONT (Optical Network Terminal)</li>
                      <li>Ask about plan upgrades if your current speed tier isn't meeting your household needs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Long-tail Keyword Optimized Sections */}
          {seoConfig.h2Sections.map((section, index) => (
            <Card key={index} className="mt-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground">
                  {index === 0 && "Test your AT&T Fiber internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your fiber optic connection, ensuring you're getting the premium symmetrical speeds that AT&T Fiber delivers across major US markets from 300 Mbps to 5 Gig."}
                  {index === 1 && "Check your AT&T DSL speed to verify performance for legacy connections. AT&T DSL typically delivers 10-100 Mbps depending on your location and line quality. DSL speeds vary based on distance from the central office and copper line condition. Regular AT&T internet speed tests help monitor DSL performance."}
                  {index === 2 && "Monitor your AT&T upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. AT&T Fiber offers symmetrical speeds, meaning your upload speed matches your download speed—a major advantage over cable competitors. DSL upload speeds are typically lower, ranging from 1-10 Mbps."}
                  {index === 3 && "Test your AT&T WiFi speed to verify wireless performance throughout your home. WiFi speeds depend on your gateway model, network congestion, and physical obstacles. For best results, use the AT&T Smart Home Manager app to optimize WiFi settings and check for interference. Consider WiFi 6 for AT&T Fiber multi-gig plans."}
                  {index === 4 && "Check AT&T Fixed Wireless speed for rural internet access. AT&T offers fixed wireless internet in areas where fiber and DSL aren't available, providing an alternative to satellite internet. Fixed wireless speeds vary based on signal strength and network congestion, typically delivering 25-50 Mbps. Test your AT&T connection regularly to monitor performance."}
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Test {section.title.includes('Upload') ? 'Upload' : section.title.includes('WiFi') ? 'WiFi' : section.title.includes('DSL') ? 'DSL' : 'Speed'} Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {seoConfig.faq.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="us" currentProviderSlug="att" />
        </div>
      </main>

      <GenericFooter />

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
