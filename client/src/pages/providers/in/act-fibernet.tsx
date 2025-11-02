import { useState } from "react";
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

export default function ACTFibernetSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.actfibernet;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="in/act-fibernet" />
      <Header currentPath="/providers/in/act-fibernet" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "ACT Fibernet", href: "/providers/in/act-fibernet" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              {seoConfig.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-500">ACT Fibernet internet speed</span> for free. Check your GPON fiber or gaming broadband performance in metro cities.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-act-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test ACT Fibernet Speed Now
              </Button>
            </div>
          </div>

          {/* Pro Tip Callout 1 */}
          <Card className="mb-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate ACT Fibernet Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your ACT Fibernet router for the most accurate gaming fiber speed test results. 
                    Close all background gaming apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak gaming hours (6-11 PM) when network traffic is highest in metro cities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your ACT Fibernet Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your ACT Fibernet internet speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal gaming fiber internet performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⬇️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Download Speed</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Download speed</strong> measures how fast data travels from the internet to your device. 
                    ACT Fibernet GPON fiber delivers symmetrical speeds, so your download speed can range from 100 Mbps to 1 Gbps 
                    depending on your plan. This speed determines how quickly you can stream 4K video, download games, and browse websites.
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
                    <strong>ACT Fibernet offers symmetrical speeds</strong>—meaning your upload speed 
                    matches your download speed. This is ideal for live streaming, video conferencing, cloud gaming, and content creation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Ping Rate (Latency)</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Ping</strong> measures network latency—how long it takes for data to travel to a server and back. 
                    ACT Fibernet typically delivers ping under 5-15 ms to Indian servers thanks to its gaming-optimized fiber connection, 
                    making it excellent for competitive gaming, esports, and real-time multiplayer applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About ACT Fibernet</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  ACT Fibernet stands as India's premier gaming-focused fiber broadband provider, renowned for 
                  its GPON fiber-optic network infrastructure and ultra-low latency technology. Operating 
                  primarily in major metropolitan cities across India, ACT Fibernet serves millions of gamers and power users with comprehensive 
                  internet and digital services while maintaining a reputation for gaming performance and 
                  technological innovation in the competitive Indian telecommunications market.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Gaming-Optimized GPON Fiber Network</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet represents one of India's most extensive gaming-focused pure fiber-optic networks, 
                  delivering symmetrical upload and download speeds directly to homes and businesses. The company's 
                  GPON fiber infrastructure spans major metropolitan areas across Hyderabad, Bangalore, Delhi, Chennai, Mumbai, 
                  and other tier-1 cities, providing gamers and content creators 
                  with reliable, low-latency internet connections that support bandwidth-intensive applications 
                  including competitive gaming, 4K streaming, cloud computing, and esports technologies.
                </p>

                <h3 className="text-xl font-semibold mb-3">Ultra-Low Latency Gaming Excellence</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet operates India's premier gaming-optimized broadband network, pioneering ultra-low latency fiber 
                  technology in major cities across the country. The company's GPON infrastructure supports not only 
                  competitive gaming but also streaming services that provide symmetric speeds and consistent performance 
                  to traditional fixed-line gaming connections. This gaming innovation positions ACT Fibernet at the forefront 
                  of next-generation esports telecommunications technology in India.
                </p>

                <h3 className="text-xl font-semibold mb-3">Premium Gaming Service Quality</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet distinguishes itself through consistent focus on gaming performance and customer service 
                  excellence, operating premium telecommunications infrastructure that emphasizes ultra-low ping and 
                  performance over aggressive pricing strategies. The company's approach appeals to customers who 
                  prioritize gaming quality and technological innovation, making ACT Fibernet particularly attractive 
                  to esports professionals, streamers, and gaming-focused consumers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Metro City Gaming Solutions</h3>
                <p className="text-muted-foreground">
                  ACT Fibernet provides comprehensive metro gaming telecommunications solutions including dedicated gaming routes, 
                  cloud gaming services, VPN optimization, and streaming applications that support Indian gamers across all 
                  esports titles. The company's gaming division leverages its advanced GPON network infrastructure to 
                  deliver sophisticated gaming solutions while maintaining the ultra-low latency and performance standards 
                  required by competitive gamers and content creators.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Gaming Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps ACT Fibernet customers monitor their gaming performance and ensure optimal 
                  service delivery from their GPON fiber or gaming broadband connection. Our <strong>ACT Fibernet speed test</strong> measures 
                  download speeds, upload speeds, and gaming latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  premium gaming internet service quality that defines ACT Fibernet's telecommunications excellence. Regular 
                  <strong>ACT broadband speed tests</strong> ensure you're getting the gaming fiber performance you pay for.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your ACT Fibernet Gaming Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>ACT Fibernet speed test</strong> results, ensure your gaming equipment supports your plan speed. 
                    Gigabit plans require a Gigabit-capable gaming router. Position your ACT router centrally and avoid interference 
                    from thick walls or electronics. For competitive gaming, use ethernet connections and enable QoS settings for gaming traffic prioritization.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest ACT Fibernet Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest ACT Fibernet Gaming Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                ACT Fibernet delivers exceptional gaming fiber internet speeds across major Indian metros with symmetrical Gigabit speeds widely available and industry-leading ultra-low latency.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Hyderabad</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Bangalore</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Delhi NCR</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Chennai</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing ACT Fibernet markets include Mumbai, Pune, Vizag, and Coimbatore. 
                ACT's 100% GPON fiber-optic network ensures ultra-reliable high-speed gaming connectivity with symmetrical upload/download speeds and ultra-low ping.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-act-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your ACT Fibernet Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow ACT Fibernet Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your ACT Fibernet speed test results are below expectations, try these proven gaming optimization solutions before contacting technical support:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Optimize Gaming Wi-Fi Signal Strength</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Position your <strong>ACT Fibernet router</strong> centrally and elevated for maximum gaming coverage</li>
                      <li>Keep the router away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider a <strong>WiFi 6 gaming router</strong> or mesh system for larger homes and multiple devices</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Verify Gaming Equipment Compatibility</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Ensure your gaming router supports your subscribed speed tier (Gigabit-capable for Gig gaming plans)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal fiber gaming performance</li>
                      <li>Update your ACT Fibernet router firmware through the ACT Fibernet app or portal</li>
                      <li>Contact <a href="https://actcorp.in/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ACT Fibernet support</a> for equipment upgrades if needed</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Network className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Test With Ethernet Gaming Connection</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Use a <strong>wired Ethernet gaming connection</strong> to eliminate WiFi as the bottleneck for competitive gaming</li>
                      <li>If wired speeds are normal but WiFi is slow, the issue is your wireless gaming setup</li>
                      <li>Run a <Link href="/ping-test" className="text-primary hover:underline">ping test</Link> to check for latency issues affecting gaming</li>
                      <li>ACT Fibernet should deliver 85%+ of plan speed on wired connections for optimal gaming</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">4. Manage Connected Gaming Devices</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Disconnect unused devices that may be consuming gaming bandwidth during competitive sessions</li>
                      <li>Limit simultaneous 4K streams and large downloads during gaming speed tests</li>
                      <li>Use <strong>Quality of Service (QoS)</strong> settings to prioritize gaming traffic for esports</li>
                      <li>Check your <Link href="/wifi-speed-optimization" className="text-primary hover:underline">WiFi optimization guide</Link> for advanced gaming tips</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact ACT Fibernet Gaming Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If gaming issues persist, contact ACT Fibernet support at <strong>1800-419-2225</strong></li>
                      <li>Check for fiber line issues or local network outages on <a href="https://actcorp.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ACT Fibernet's website</a></li>
                      <li>Request a technician visit to inspect your fiber connection and ONT for gaming optimization</li>
                      <li>Ask about gaming plan upgrades if your current speed tier isn't meeting your esports needs</li>
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
                  {index === 0 && "Test your ACT Fibernet internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your GPON fiber optic connection, ensuring you're getting the premium gaming speeds that ACT Fibernet delivers across Indian metropolitan cities."}
                  {index === 1 && "Check your ACT broadband upload speed to ensure optimal performance for live streaming, cloud gaming, file uploads, and content creation. ACT Fibernet offers symmetrical speeds, meaning your upload speeds should match your download speeds for premium fiber gaming service."}
                  {index === 2 && "Monitor your ACT Fibernet ping and latency for competitive gaming, esports, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional esports on ACT's gaming-optimized fiber network."}
                  {index === 3 && "Test your ACT gaming internet speed to verify competitive gaming performance and esports readiness. ACT Fibernet's gaming-focused GPON technology provides ultra-low latency speeds without throttling for optimal gaming performance in Indian metro cities."}
                  {index === 4 && "Find ACT Fibernet speed test locations near you for the most accurate local network gaming performance measurements. Testing from nearby servers provides the best indication of your actual ACT connection quality, speed, and gaming latency."}
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Test {section.title.includes('Upload') ? 'Upload' : section.title.includes('Ping') ? 'Ping' : section.title.includes('Gaming') ? 'Gaming' : 'Speed'} Now
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
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="in" currentProviderSlug="act-fibernet" />
        </div>
      </main>

      <GenericFooter />

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
