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

export default function MobilySpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.mobily;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="mobily" />
      <Header currentPath="/providers/sa/mobily" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Mobily", href: "/providers/sa/mobily" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-green-600 to-green-500 bg-clip-text text-transparent">
              {seoConfig.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-green-500">Mobily internet speed</span> for free. Check your fiber or 5G internet performance across Saudi Arabia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-mobily-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Mobily Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate Mobily Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your Mobily router for the most accurate fiber speed test results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (7-11 PM) when network traffic is highest in Saudi Arabia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your Mobily Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your Mobily internet speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal fiber and 5G internet performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⬇️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Download Speed</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Download speed</strong> measures how fast data travels from the internet to your device. 
                    Mobily fiber delivers high-performance speeds, so your download speed can range from 100 Mbps to 1 Gbps 
                    depending on your plan. This speed determines how quickly you can stream video, download files, and browse websites.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⬆️</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Upload Speed</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Upload speed</strong> shows how fast you can send data from your device to the internet. 
                    <strong>Mobily fiber offers competitive upload speeds</strong> that support video conferencing, 
                    cloud backups, and content creation. Higher upload speeds are essential for remote work and online collaboration.
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
                    Mobily fiber typically delivers ping under 20-30 ms thanks to its fiber connection, 
                    making it excellent for gaming, video calls, and real-time applications across Saudi Arabia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Mobily Saudi Arabia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Mobily, officially known as Etihad Etisalat, stands as Saudi Arabia's strong second-place telecommunications provider, delivering competitive fiber broadband and mobile services to millions of customers nationwide. As a major market challenger, Mobily combines innovative technology deployment with customer-focused service offerings, positioning itself as the preferred alternative for both residential and business customers seeking high-performance connectivity at competitive prices throughout the Kingdom.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Competitive Market Position</h3>
                <p className="text-muted-foreground">
                  Operating under the Etihad Etisalat brand, Mobily maintains a robust nationwide infrastructure that rivals the market leader in coverage and quality across Saudi Arabia's major cities. The company's strategic investments in network modernization ensure customers in Riyadh, Jeddah, Dammam, Mecca, and Medina enjoy reliable, high-speed internet access. Mobily's competitive positioning emphasizes value-driven service packages that combine fiber broadband, mobile connectivity, and digital services, appealing to cost-conscious consumers and businesses seeking comprehensive telecommunications solutions.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Expansion</h3>
                <p className="text-muted-foreground">
                  Mobily's fiber network delivers gigabit-capable broadband services across Saudi Arabia's urban centers, with ongoing expansion into suburban markets. The company's fiber-to-the-home (FTTH) deployment strategy prioritizes high-density residential areas and business districts, offering speeds ranging from 100 Mbps to 1 Gbps that support bandwidth-intensive applications. Mobily's fiber infrastructure provides reliable, high-capacity internet connections ideal for 4K streaming, cloud computing, online gaming, and smart home technologies throughout the Kingdom.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Technology Leadership</h3>
                <p className="text-muted-foreground">
                  Complementing its fixed-line infrastructure, Mobily's 5G mobile network provides ultra-fast wireless connectivity across Saudi Arabia's major metropolitan areas. The company's 5G deployment enables seamless transitions between home and mobile internet access for customers who demand always-on connectivity. Mobily's 5G technology supports not only mobile communications but also provides wireless broadband alternatives to traditional fixed-line connections in select coverage areas.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise Solutions and Business Focus</h3>
                <p className="text-muted-foreground">
                  Beyond consumer services, Mobily targets the enterprise market with specialized business broadband packages, dedicated fiber connections, and managed network services. The company's business-focused approach includes tailored SLAs, priority technical support at 1100, and scalable bandwidth options that accommodate growing organizational needs. Mobily's enterprise solutions support mission-critical business applications, cloud services, and collaborative work platforms essential for modern Saudi businesses across all industries.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing allows Mobily customers to verify their connection performance meets contracted service levels, ensuring reliable support for work-from-home, streaming, gaming, and business applications. Our <strong>Mobily speed test</strong> measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance across Saudi Arabia. This testing helps identify connectivity issues and ensures you're receiving the 
                  competitive internet service quality that defines Mobily's telecommunications excellence. Regular 
                  <strong>Mobily fiber speed tests</strong> ensure you're getting the high-speed performance you pay for.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your Mobily Fiber Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>Mobily fiber speed test</strong> results, ensure your equipment supports your plan speed. 
                    Gigabit plans require a Gigabit-capable router. Position your Mobily router centrally and avoid interference 
                    from thick walls or electronics. For 5G internet, placement near windows with clear line of sight improves performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest Mobily Fiber Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest Mobily Fiber Internet Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Mobily delivers exceptional fiber internet speeds across Saudi Arabia's major cities with Gigabit speeds widely available and competitive pricing.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Riyadh</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Jeddah</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Dammam</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Mecca</div>
                  <div className="text-sm text-muted-foreground">Up to 500 Mbps</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing Mobily markets include Medina, Khobar, Dhahran, and Taif. 
                Mobily's fiber-optic network ensures reliable high-speed connectivity with competitive pricing across Saudi Arabia.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-mobily-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your Mobily Fiber Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow Mobily Fiber Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your Mobily speed test results are below expectations, try these proven solutions before contacting technical support:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Optimize Wi-Fi Signal Strength</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Position your <strong>Mobily router</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the router away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider a <strong>WiFi 6 router</strong> or mesh system for larger homes</li>
                      <li>Check your <Link href="/wifi-analyzer" className="text-primary hover:underline">WiFi analyzer</Link> for optimal channel selection</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Router className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Verify Equipment Compatibility</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Ensure your router supports your subscribed speed tier (Gigabit-capable for Gig plans)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal fiber performance</li>
                      <li>Update your Mobily router firmware through the router's admin panel</li>
                      <li>Contact <a href="https://www.mobily.com.sa/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mobily support</a> for equipment upgrades if needed</li>
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
                      <li>Mobily fiber should deliver 85%+ of plan speed on wired connections</li>
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
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact Mobily Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact Mobily support at <strong>1100</strong></li>
                      <li>Check for fiber line issues or local network outages on <a href="https://www.mobily.com.sa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mobily's website</a></li>
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
                  {index === 0 && "Test your Mobily fiber internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your fiber optic connection, ensuring you're getting the competitive speeds that Mobily delivers across Saudi Arabia's major cities including Riyadh, Jeddah, and Dammam."}
                  {index === 1 && "Check your Mobily upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. Mobily fiber offers competitive upload speeds that support remote work, content creation, and online collaboration across the Kingdom."}
                  {index === 2 && "Monitor your Mobily ping and latency for gaming, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional video conferencing on Mobily's fiber network."}
                  {index === 3 && "Test your Mobily 5G internet speed to verify wireless broadband performance. Mobily's 5G technology provides high-speed wireless connectivity in major Saudi cities, complementing their fiber offerings with mobile broadband alternatives."}
                  {index === 4 && "Find Mobily speed test locations across Saudi Arabia for the most accurate local network performance measurements. Testing from nearby servers provides the best indication of your actual Mobily connection quality and speed in your city."}
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-green-500 hover:bg-green-600"
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

          <RelatedProviders currentCountryCode="sa" currentProviderSlug="mobily" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
