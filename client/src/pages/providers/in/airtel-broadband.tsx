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

export default function AirtelBroadbandSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords["airtel-broadband"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="airtel-broadband" />
      <Header currentPath="/providers/in/airtel-broadband" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
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
              {seoConfig.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-red-500">Airtel internet speed</span> for free. Check your Airtel Xstream Fiber or broadband internet performance across India.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-airtel-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Airtel Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate Airtel Xstream Fiber Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your Airtel router for the most accurate fiber speed test results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (7-11 PM) when network traffic is highest in Indian metros.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your Airtel Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your Airtel Xstream Fiber internet speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal fiber internet performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⬇️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Download Speed</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Download speed</strong> measures how fast data travels from the internet to your device. 
                    Airtel Xstream Fiber delivers reliable speeds, so your download speed can range from 40 Mbps to 1 Gbps 
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
                    <strong>Airtel Xstream Fiber offers strong upload speeds</strong> on higher-tier plans, 
                    making it ideal for video conferencing, cloud backups, and content creation across India.
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
                    Airtel Xstream Fiber typically delivers ping under 20-30 ms thanks to its direct fiber connection, 
                    making it excellent for gaming, video calls, and real-time applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Airtel Broadband</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Bharti Airtel stands as India's leading telecommunications provider and second-largest telecom operator, 
                  commanding over 391 million subscribers with a significant 33.65% market share. Operating under the 
                  Airtel Xstream Fiber brand, this premium fiber-to-the-home service delivers high-speed internet 
                  connectivity with speeds ranging from 40 Mbps to 1 Gbps, serving major metros including Delhi NCR, 
                  Bangalore, Mumbai, Chennai, and Hyderabad while rapidly expanding to tier-2 and tier-3 cities across India.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Airtel Xstream Fiber Technology</h3>
                <p className="text-muted-foreground">
                  Airtel Xstream Fiber utilizes advanced <strong>fiber-optic infrastructure</strong> to deliver consistent 
                  high-speed internet directly to Indian homes and businesses. The comprehensive service portfolio includes 
                  speed tiers of 40 Mbps, 100 Mbps, 200 Mbps, 300 Mbps, 500 Mbps, and 1 Gbps plans, each designed to 
                  support diverse digital requirements from basic web browsing to bandwidth-intensive applications like 
                  4K streaming, video conferencing, online gaming, and smart home ecosystems throughout India's growing 
                  digital landscape.
                </p>

                <h3 className="text-xl font-semibold mb-3">Network Coverage Across India</h3>
                <p className="text-muted-foreground">
                  Airtel has deployed an extensive fiber network spanning over 1,000 cities and towns across India, 
                  focusing on major metropolitan areas including Delhi NCR, Bangalore, Mumbai, Chennai, and Hyderabad 
                  while rapidly expanding to tier-2 and tier-3 cities. The company's strategic network investment includes 
                  submarine cable partnerships, data center infrastructure, and 5G-ready fiber backbone, positioning Airtel 
                  as a technology leader in India's digital transformation journey and smart city initiatives.
                </p>

                <h3 className="text-xl font-semibold mb-3">Premium Entertainment Integration</h3>
                <p className="text-muted-foreground">
                  Airtel Xstream Fiber distinguishes itself through comprehensive entertainment bundling, offering customers 
                  access to Airtel Xstream app with over 10,000 movies and shows, live TV channels, and premium OTT platform 
                  subscriptions including Netflix, Amazon Prime Video, Disney+ Hotstar, and ZEE5. This integrated approach 
                  provides exceptional value for Indian families seeking both high-speed connectivity and diverse digital 
                  entertainment options without additional subscription management complexity.
                </p>

                <h3 className="text-xl font-semibold mb-3">Customer Support Excellence</h3>
                <p className="text-muted-foreground">
                  Airtel provides 24/7 customer support through the Airtel Thanks app, dedicated helpline at 
                  <strong> 1800-103-4444 or 121</strong>, and local service technicians for installation and maintenance. 
                  The company's commitment to service quality includes regular network monitoring, proactive service 
                  notifications, and rapid response to connectivity issues, ensuring reliable internet performance for 
                  both business and residential customers across India.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Airtel customers monitor their internet performance and ensure optimal 
                  service delivery from their Xstream Fiber connection. Our <strong>Airtel speed test</strong> measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance across India. This testing helps identify connectivity issues and ensures you're receiving 
                  the premium internet service quality that defines Airtel's telecommunications excellence. Regular 
                  <strong> Airtel broadband speed tests</strong> ensure you're getting the fiber performance you pay for.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your Airtel Xstream Fiber Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>Airtel speed test</strong> results, ensure your equipment supports your plan speed. 
                    Gigabit plans require a Gigabit-capable router. Position your Airtel router centrally and avoid interference 
                    from thick walls or electronics. Update router firmware via the Airtel Thanks app for optimal performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest Airtel Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest Airtel Xstream Fiber Internet Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Airtel Xstream Fiber delivers exceptional fiber internet speeds across major Indian metros with Gigabit speeds widely available and industry-leading reliability.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Delhi NCR</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Bangalore</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Mumbai</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Chennai</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing Airtel markets include Hyderabad, Pune, Kolkata, and Ahmedabad. 
                Airtel's fiber-optic network ensures ultra-reliable high-speed connectivity with strong upload speeds across India's smart cities.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-airtel-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your Airtel Xstream Fiber Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow Airtel Xstream Fiber Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your Airtel speed test results are below expectations, try these proven solutions before contacting technical support:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Optimize Wi-Fi Signal Strength</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Position your <strong>Airtel Xstream Fiber router</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the router away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider a <strong>WiFi 6 router</strong> or mesh system for larger Indian homes</li>
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
                      <li>Ensure your router supports your subscribed speed tier (Gigabit-capable for 1 Gbps plans)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal fiber performance</li>
                      <li>Update your Airtel router firmware through the Airtel Thanks app</li>
                      <li>Contact <a href="https://www.airtel.in/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Airtel support</a> for equipment upgrades if needed</li>
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
                      <li>Airtel Xstream Fiber should deliver 85%+ of plan speed on wired connections</li>
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
                      <li>Disconnect unused devices that may be consuming bandwidth</li>
                      <li>Limit simultaneous 4K streams and large downloads during speed tests</li>
                      <li>Use <strong>Quality of Service (QoS)</strong> settings to prioritize critical traffic</li>
                      <li>Check your <Link href="/wifi-speed-optimization" className="text-primary hover:underline">WiFi optimization guide</Link> for advanced tips</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact Airtel Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact Airtel support at <strong>1800-103-4444 or dial 121</strong></li>
                      <li>Check for fiber line issues or local network outages on <a href="https://www.airtel.in/broadband" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Airtel's website</a></li>
                      <li>Request a technician visit to inspect your fiber connection and ONT</li>
                      <li>Ask about plan upgrades if your current speed tier isn't meeting your needs</li>
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
                  {index === 0 && "Test your Airtel Xstream Fiber internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your fiber optic connection, ensuring you're getting the premium speeds that Airtel Xstream Fiber delivers across India's major cities and growing metros."}
                  {index === 1 && "Check your Airtel upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. Airtel Xstream Fiber offers strong upload speeds on higher-tier plans, making it ideal for Indian professionals working from home and content creators."}
                  {index === 2 && "Monitor your Airtel ping and latency for gaming, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional video conferencing on Airtel's fiber network across India."}
                  {index === 3 && "Test your Airtel Xstream Fiber speed to verify premium broadband performance. Airtel's fiber-optic technology provides reliable speeds from 40 Mbps to 1 Gbps with comprehensive OTT entertainment bundling across Indian smart cities."}
                  {index === 4 && "Find Airtel speed test locations near you for the most accurate local network performance measurements. Testing from nearby servers in Delhi NCR, Bangalore, Mumbai, Chennai, or Hyderabad provides the best indication of your actual Airtel connection quality and speed."}
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Test {section.title.includes('Upload') ? 'Upload' : section.title.includes('Ping') ? 'Ping' : 'Speed'} Now
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

          <RelatedProviders currentCountryCode="in" currentProviderSlug="airtel-broadband" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
