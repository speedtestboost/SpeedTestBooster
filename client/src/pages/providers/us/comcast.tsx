import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Router, Network, Signal } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";

export default function ComcastSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Comcast Xfinity Speed Test No Ads - Comcast USA - Check Cable Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Comcast Xfinity cable lightweight speed test for Comcast instantly - Free speed test for USA. Accurate download/upload WiFi performance results now.');
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'xfinity speed test, comcast speed test, comcast xfinity speed test, xfinity lightweight speed test for Comcast test, comcast cable test, xfinity wifi speed test, comcast lightweight speed test for Comcast test, xfinity broadband test, comcast upload speed test, test xfinity speed, comcast cable internet test, xfinity gig speed test');

    const ogTags = [
      { property: 'og:title', content: 'Comcast Xfinity Speed Test No Ads - Comcast USA - Free Cable Internet Speed Test No Ads - Comcast 2025' },
      { property: 'og:description', content: 'Test Comcast Xfinity cable lightweight speed test for Comcast. Check download/upload speeds and ping. Accurate Xfinity speed test results.' },
      { property: 'og:url', content: 'https://speedtestboost.com/providers/us/comcast' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test No Ads - Comcast and Boost' }
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
      { name: 'twitter:title', content: 'Comcast Xfinity Speed Test No Ads - Comcast USA - Free Cable Internet Speed Test No Ads - Comcast 2025' },
      { name: 'twitter:description', content: 'Test Comcast Xfinity cable lightweight speed test for Comcast. Accurate Xfinity speed test for download, upload, and ping.' }
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

    setCanonicalHref('https://speedtestboost.com/providers/us/comcast');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Comcast Xfinity Speed Test No Ads - Comcast 2025",
      "description": "Test your Comcast Xfinity lightweight speed test for Comcast for free. Speed test for Xfinity cable and fiber customers.",
      "url": "https://speedtestboost.com/providers/us/comcast",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Comcast Xfinity Speed Test No Ads - Comcast Tool",
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
        "name": "Comcast Xfinity",
        "description": "Major US telecommunications company providing cable and fiber internet services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Cable Internet", "Fiber", "TV", "Mobile", "Business Services"]
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
            "name": "Comcast Xfinity Speed Test No Ads - Comcast",
            "item": "https://speedtestboost.com/providers/us/comcast"
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
      <Header currentPath="/providers/us/comcast" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Comcast Xfinity", href: "/providers/us/comcast" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Comcast Xfinity Speed Test No Ads - Comcast
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Comcast Xfinity lightweight speed test for Comcast</span> for free. Check your cable or fiber internet performance with accurate download, upload, and ping measurements.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-comcast-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Xfinity Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate Xfinity Speed Test No Ads - Comcast Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your Xfinity gateway for the most accurate <strong>comcast cable test</strong> results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (6-11 PM) when network traffic is highest for the best <strong>xfinity lightweight speed test for Comcast test</strong> accuracy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test No Ads - Comcast Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your Comcast Xfinity Speed Test No Ads - Comcast Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your <strong>Xfinity speed test</strong> results mean and how to interpret download speeds, upload speeds, and ping for optimal cable internet performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⬇️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Download Speed</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Download speed</strong> measures how fast data travels from the internet to your device. 
                    Comcast Xfinity's <strong>DOCSIS 3.1 cable internet</strong> delivers speeds ranging from 75 Mbps to 2 Gbps 
                    depending on your plan. This speed determines how quickly you can stream video, download files, and browse websites.
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
                    Xfinity cable internet typically offers upload speeds of 5-35 Mbps on standard plans. This is important 
                    for video conferencing, cloud backups, and sharing files. Xfinity Gigabit Pro offers symmetrical speeds.
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
                    Comcast Xfinity cable internet typically delivers ping under 20-40 ms on wired connections, 
                    making it suitable for gaming, video calls, and real-time applications. Test your <Link href="/ping-test" className="text-primary hover:underline">ping here</Link>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Comcast Xfinity</h2>
              <nav className="mb-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/internet-providers" className="hover:text-primary">Internet Providers</Link>
                <span className="mx-2">›</span>
                <Link href="/providers/us" className="hover:text-primary">US Providers</Link>
                <span className="mx-2">›</span>
                <span className="text-foreground">Comcast Xfinity Speed Test No Ads - Comcast</span>
              </nav>
              
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Comcast Corporation operates as America's largest cable television and internet service provider, 
                  serving millions of customers across the United States under the Xfinity brand. Known for extensive 
                  cable network infrastructure and comprehensive entertainment services, Comcast combines traditional 
                  cable television with advanced <strong>DOCSIS 3.1 technology</strong> to provide integrated connectivity and content 
                  solutions for American households and businesses. Regular <strong>xfinity speed tests</strong> help ensure optimal performance.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Extensive Cable Network Infrastructure</h3>
                <p className="text-muted-foreground">
                  Comcast operates one of the world's largest cable network infrastructures, utilizing hybrid fiber-coaxial 
                  technology to deliver high-speed internet services across diverse American communities. The company's 
                  cable network spans urban centers, suburban neighborhoods, and smaller towns, providing comprehensive 
                  coverage that serves varied demographic and geographic markets. This extensive infrastructure foundation 
                  enables Comcast to offer consistent internet connectivity across its service territories. Use our 
                  <Link href="/internet-speed-requirements" className="text-primary hover:underline"> speed requirements calculator</Link> to determine your ideal plan. 
                  Compare Xfinity with <Link href="/providers/us/verizon" className="text-primary hover:underline">Verizon</Link>, 
                  <Link href="/providers/us/spectrum" className="text-primary hover:underline">Spectrum</Link>, and 
                  <Link href="/providers/us/att" className="text-primary hover:underline">AT&T</Link>.
                </p>

                <h3 className="text-xl font-semibold mb-3">Integrated Entertainment Platform</h3>
                <p className="text-muted-foreground">
                  Xfinity represents more than internet connectivity, offering integrated entertainment experiences 
                  that combine broadband internet with television programming, streaming services, and digital content 
                  platforms. The company's approach emphasizes convergence between traditional cable television and 
                  modern internet-based entertainment, providing customers with comprehensive media solutions that 
                  leverage high-speed internet infrastructure for enhanced viewing experiences.
                </p>

                <h3 className="text-xl font-semibold mb-3">Advanced DOCSIS 3.1 Technology Development</h3>
                <p className="text-muted-foreground">
                  Comcast invests significantly in network technology advancement, implementing <strong>DOCSIS 3.1 standards</strong> upgrades, 
                  fiber network expansion, and emerging wireless technologies that enhance internet service capabilities. 
                  The company's technical innovation focus includes exploring next-generation cable technologies, 
                  improving network capacity, and developing customer experience technologies that modernize traditional 
                  cable television and internet service delivery. Regular <strong>comcast lightweight speed test for Comcast tests</strong> verify network performance.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business and Commercial Services</h3>
                <p className="text-muted-foreground">
                  Comcast Business provides comprehensive telecommunications solutions for American enterprises, including 
                  dedicated internet access, voice services, networking solutions, and cloud-based applications. The 
                  company's business division leverages its extensive network infrastructure to serve commercial customers 
                  with scalable connectivity solutions that support business operations across various industries and 
                  organizational sizes.
                </p>

                <h3 className="text-xl font-semibold mb-3">Service Performance Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Comcast Xfinity customers monitor their internet performance and ensure 
                  optimal service delivery from their cable or fiber connection. Our <strong>Xfinity speed test</strong> measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  comprehensive internet service that defines Comcast's approach to American telecommunications. 
                  Check our <Link href="/wifi-speed-optimization" className="text-primary hover:underline">WiFi optimization guide</Link> for better performance.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your Xfinity WiFi Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    For best <strong>xfinity wifi speed test</strong> results, position your Xfinity gateway centrally and elevated for maximum coverage. 
                    Avoid placing it near metal objects, microwaves, or thick walls. If you have a large home, consider upgrading to the xFi Advanced Gateway 
                    or adding xFi Pods for mesh coverage. Use our <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi analyzer</Link> to 
                    optimize channel selection and reduce interference. Test your <strong>comcast cable internet</strong> regularly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speed Test No Ads - Comcast Performance Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-blue-500/10 rounded-full">
                    <Network className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Comcast DOCSIS 3.1 Cable Network</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Advanced hybrid fiber-coaxial technology delivering multi-gigabit speeds across America's largest cable network
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
                <h3 className="text-xl font-semibold mb-3 text-center">Xfinity xFi Gateway</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Next-generation WiFi 6 equipment with advanced features for whole-home coverage and speed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cities with Fastest Comcast Xfinity Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest Comcast Xfinity Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                These major metro areas consistently deliver the best Xfinity internet performance, with Gigabit speeds widely available and excellent <strong>comcast speed test</strong> results.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Chicago</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Philadelphia</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Atlanta</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Seattle</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Denver</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing cities include San Francisco, Boston, Washington DC, Miami, and Portland. 
                Comcast Xfinity's extensive cable infrastructure ensures reliable high-speed connectivity across all major markets.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-comcast-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your Xfinity Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow Comcast Xfinity Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your <strong>xfinity lightweight speed test for Comcast test</strong> results are below expectations, try these proven solutions before contacting technical support:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Optimize WiFi Signal Strength</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Position your <strong>Xfinity xFi Gateway</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the gateway away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider adding <strong>xFi Pods</strong> for mesh coverage in larger homes</li>
                      <li>Check your <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi analyzer</Link> for optimal channel selection to improve <strong>xfinity wifi speed test</strong> results</li>
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
                      <li>Ensure your gateway supports your subscribed speed tier (<strong>DOCSIS 3.1</strong> for Gigabit plans)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal cable performance</li>
                      <li>Update your Xfinity gateway firmware through the Xfinity app</li>
                      <li>Contact <a href="https://www.xfinity.com/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Xfinity support</a> for equipment upgrades if needed</li>
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
                      <li>Run a <Link href="/ping-test" className="text-primary hover:underline">ping test</Link> to check for latency issues with your <strong>comcast cable test</strong></li>
                      <li>Xfinity should deliver 90%+ of plan speed on wired connections during off-peak hours</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Signal className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">4. Manage Connected Devices</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Disconnect unused devices that may be consuming bandwidth during your <strong>xfinity speed test</strong></li>
                      <li>Limit simultaneous 4K streams and large downloads during speed tests</li>
                      <li>Use <strong>xFi Advanced Security</strong> to identify bandwidth-hogging devices</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact Comcast Xfinity Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact Xfinity support at <strong>1-800-XFINITY (1-800-934-6489)</strong></li>
                      <li>Check for cable line issues or local network outages on <a href="https://www.xfinity.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Xfinity's website</a></li>
                      <li>Request a technician visit to inspect your coaxial cable connection and signal strength</li>
                      <li>Ask about plan upgrades if your current speed tier isn't meeting your household's needs per our <Link href="/internet-speed-requirements" className="text-primary hover:underline">requirements guide</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions About Comcast Xfinity Speed Test No Ads - Comcast</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How do I test my Comcast Xfinity lightweight speed test for Comcast?</h4>
                    <p className="text-sm text-muted-foreground">
                      Use our speed test tool above by clicking 'Start Speed Test No Ads - Comcast'. It will measure your Xfinity cable internet download speed, upload speed, and ping in seconds for accurate results.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What speeds should I expect with Xfinity?</h4>
                    <p className="text-sm text-muted-foreground">
                      Xfinity plans range from 75 Mbps to 2000 Mbps (2 Gig). Your actual speeds should reach at least 80-90% of your plan speed during off-peak hours on a wired connection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Why is my Xfinity internet slow?</h4>
                    <p className="text-sm text-muted-foreground">
                      Slow Xfinity speeds may be due to network congestion during peak hours (6-11 PM), old modem/gateway, WiFi interference, or too many connected devices. Check during different times of day.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Is this Xfinity speed test accurate?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, our test uses advanced algorithms to measure your true Xfinity connection speed by testing sustained bandwidth over multiple connections, similar to official speed test tools.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Does Comcast Xfinity throttle lightweight speed test for Comcasts?</h4>
                    <p className="text-sm text-muted-foreground">
                      Comcast doesn't impose data caps on most residential plans, but network management during peak congestion can affect speeds. If you consistently experience throttling, run regular speed tests and contact Xfinity support at 1-800-XFINITY.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What's the difference between WiFi and wired speeds on Xfinity?</h4>
                    <p className="text-sm text-muted-foreground">
                      WiFi speeds typically range 40-60% of advertised speeds due to interference and distance. Ethernet connections should reach 80-95% of your Xfinity plan's advertised cable speed for optimal performance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">When should I contact Xfinity support about slow speeds?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact Xfinity at 1-800-XFINITY (1-800-934-6489) if wired speed tests consistently show speeds below 80% of your plan, or if troubleshooting steps don't resolve persistent connectivity issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How fast should my Comcast Xfinity connection be?</h4>
                    <p className="text-sm text-muted-foreground">
                      Your speeds should reach at least 80-90% of your plan's advertised rate on wired connections. Common Xfinity plans: 200 Mbps, 400 Mbps, 800 Mbps, 1 Gig (1000 Mbps), and 2 Gig (2000 Mbps).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How much lightweight speed test for Comcast does my household need?</h4>
                    <p className="text-sm text-muted-foreground">
                      For basic use, 100-200 Mbps works well. Multiple 4K streams and gaming require 300-500 Mbps. Heavy usage households benefit from Gigabit plans. Use our <Link href="/internet-speed-requirements" className="text-primary hover:underline">lightweight speed test for Comcast requirements calculator</Link> for personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="us" currentProviderSlug="comcast" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background/50 backdrop-blur-sm border-t border-border/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">US Providers</h4>
              <div className="space-y-2 text-sm">
                <Link href="/providers/us/comcast" className="block text-muted-foreground hover:text-primary transition-colors">
                  Comcast Speed Test No Ads - Comcast
                </Link>
                <Link href="/providers/us/verizon" className="block text-muted-foreground hover:text-primary transition-colors">
                  Verizon Speed Test No Ads - Comcast
                </Link>
                <Link href="/providers/us/spectrum" className="block text-muted-foreground hover:text-primary transition-colors">
                  Spectrum Speed Test No Ads - Comcast
                </Link>
                <Link href="/providers/us/att" className="block text-muted-foreground hover:text-primary transition-colors">
                  AT&T Speed Test No Ads - Comcast
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Speed Test No Ads - Comcast Tools</h4>
              <div className="space-y-2 text-sm">
                <Link href="/internet-speed-requirements" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speed Requirements
                </Link>
                <Link href="/wifi-analyzer" className="block text-muted-foreground hover:text-primary transition-colors">
                  WiFi Analyzer
                </Link>
                <Link href="/wifi-speed-optimization" className="block text-muted-foreground hover:text-primary transition-colors">
                  WiFi Optimization
                </Link>
                <Link href="/ping-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Ping Test
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">External Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.xfinity.com/support/internet/test-your-speed" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Official Xfinity Test
                </a>
                <a href="https://www.xfinity.com/support" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Xfinity Support Center
                </a>
                <a href="https://speedtest.xfinity.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Xfinity Speed Test No Ads - Comcast Tool
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
                  Speed Test No Ads - Comcast Home
                </Link>
                <Link href="/internet-providers" className="block text-muted-foreground hover:text-primary transition-colors">
                  All Providers
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 Speed Test No Ads - Comcast and Boost. Free Comcast Xfinity lightweight speed test for Comcast test. 
              Test your cable lightweight speed test for Comcast, WiFi performance, and network connectivity with our accurate Xfinity speed test tool.
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
