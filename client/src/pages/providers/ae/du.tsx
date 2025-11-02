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

export default function DuSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.du;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="du" />
      <Header currentPath="/providers/ae/du" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Du", href: "/providers/ae/du" }
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
              Test your <span className="font-semibold text-red-500">du Home Fiber internet speed</span> for free. Check your fiber and 5G performance across the UAE.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-du-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test du Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate du Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your du router for the most accurate fiber speed test results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (7-11 PM) when network traffic is highest in UAE.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your du Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your du Home Fiber internet speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal fiber internet performance.
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
                    du Home Fiber delivers high-speed connectivity, with download speeds ranging from 250 Mbps to 1 Gbps 
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
                    <strong>du Home Fiber offers excellent upload speeds</strong>—crucial for video conferencing, 
                    cloud backups, and content creation. Fast upload speeds ensure smooth performance for work-from-home and content creators.
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
                    du Home Fiber typically delivers ping under 15-25 ms thanks to its fiber connection, 
                    making it excellent for gaming, video calls, and real-time applications across the UAE.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About du UAE</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  du serves as the UAE's second major telecommunications provider, delivering competitive Home Fiber 
                  internet services and comprehensive 5G mobile coverage throughout the Emirates. Through strategic 
                  network investments and smart city service initiatives, du maintains a strong market position, 
                  offering high-speed connectivity across Dubai, Abu Dhabi, and the Northern Emirates with innovative 
                  digital solutions that serve millions of customers across residential and business sectors.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Home Fiber Excellence</h3>
                <p className="text-muted-foreground">
                  du's Home Fiber network delivers reliable high-speed internet across major UAE metropolitan areas, 
                  providing competitive fiber optic connectivity for residential and business customers. The company's 
                  commitment to network quality and customer service has established du as a formidable alternative 
                  in the UAE telecommunications market, with extensive coverage in key Emirates and continuous 
                  infrastructure expansion to serve growing demand. du Home Fiber plans range from 250 Mbps to 1 Gbps, 
                  offering customers flexible options to match their connectivity needs and budgets.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Innovation & Deployment</h3>
                <p className="text-muted-foreground">
                  du's advanced 5G deployment spans major UAE cities, delivering next-generation mobile connectivity 
                  that supports emerging technologies and bandwidth-intensive applications. The provider's investment 
                  in 5G infrastructure demonstrates its commitment to technological advancement, ensuring customers 
                  experience cutting-edge mobile speeds and low-latency connectivity essential for IoT devices, cloud 
                  services, and smart city applications throughout Dubai, Abu Dhabi, Sharjah, and beyond. This 5G 
                  network positions du at the forefront of UAE's digital transformation.
                </p>

                <h3 className="text-xl font-semibold mb-3">Smart City Services Leadership</h3>
                <p className="text-muted-foreground">
                  du plays a crucial role in UAE's smart city initiatives, providing telecommunications infrastructure 
                  and digital services that enable government entities and businesses to implement connected solutions. 
                  The company's smart city portfolio includes IoT connectivity, cloud computing platforms, and 
                  enterprise solutions that support the UAE's vision of becoming a global technology leader. Through 
                  partnerships with government agencies and private sector organizations, du contributes to digital 
                  transformation initiatives across transportation, healthcare, education, and urban planning sectors.
                </p>

                <h3 className="text-xl font-semibold mb-3">Competitive Market Position</h3>
                <p className="text-muted-foreground">
                  As the UAE's second telecommunications operator, du competes vigorously in the market by offering 
                  competitive pricing, innovative service bundles, and customer-focused solutions that differentiate 
                  it from its larger competitor. The company's approach emphasizes value-added services, flexible 
                  contract terms, and responsive customer support that appeals to both price-conscious consumers and 
                  quality-seeking customers. du's competitive positioning drives continuous improvement in network 
                  quality and service offerings across the Emirates.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps du customers verify their Home Fiber and mobile performance meets 
                  contracted service levels in UAE's competitive telecommunications landscape. Our <strong>du speed test</strong> measures 
                  real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights 
                  into your connection quality and helping optimize your internet experience across du's expanding 
                  fiber and 5G networks. Regular <strong>du fiber speed tests</strong> ensure you're receiving the premium 
                  internet service quality that defines du's telecommunications excellence in the UAE market.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your du Home Fiber Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>du fiber speed test</strong> results, ensure your equipment supports your plan speed. 
                    Gigabit plans require a Gigabit-capable router. Position your du router centrally and avoid interference 
                    from thick walls or electronics. For optimal WiFi coverage in UAE's typical villa or apartment layouts, 
                    consider a mesh WiFi system for larger spaces.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest du Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest du Internet Speeds in UAE</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                du delivers exceptional fiber internet speeds across major UAE cities with Gigabit speeds widely available and competitive reliability.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Dubai</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Abu Dhabi</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Sharjah</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Ajman</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing du markets include Ras Al Khaimah, Fujairah, Umm Al Quwain, and other Northern Emirates. 
                du's fiber-optic network ensures ultra-reliable high-speed connectivity with excellent upload/download speeds throughout the UAE.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-du-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your du Fiber Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow du Fiber Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your du Home Fiber speed test results are below expectations, try these proven solutions before contacting technical support:
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
                      <li>Position your <strong>du router</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the router away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider a <strong>WiFi 6 router</strong> or mesh system for larger UAE villas and apartments</li>
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
                      <li>Ensure your router supports your subscribed speed tier (Gigabit-capable for Gig plans)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal fiber performance</li>
                      <li>Update your du router firmware through the my du app or web portal</li>
                      <li>Contact <a href="https://www.du.ae/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">du support</a> for equipment upgrades if needed</li>
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
                      <li>du Home Fiber should deliver 85%+ of plan speed on wired connections</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact du Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact du support at <strong>800-155 or 155</strong></li>
                      <li>Check for fiber line issues or local network outages on <a href="https://www.du.ae" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">du's website</a></li>
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
                  {index === 0 && "Test your du Home Fiber internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your fiber optic connection, ensuring you're getting the premium speeds that du delivers across the UAE's major cities."}
                  {index === 1 && "Check your du upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. du Home Fiber offers excellent upload speeds that support work-from-home requirements and content creation needs across the Emirates."}
                  {index === 2 && "Monitor your du ping and latency for gaming, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional video conferencing on du's fiber network."}
                  {index === 3 && "Test your du 5G internet speed to verify wireless broadband performance. du's 5G network provides high-speed mobile connectivity throughout the UAE, supporting bandwidth-intensive applications in select coverage areas across Dubai, Abu Dhabi, and beyond."}
                  {index === 4 && "Find du speed test locations near you for the most accurate local network performance measurements. Testing from nearby servers provides the best indication of your actual du connection quality and speed across the Emirates."}
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

          <RelatedProviders currentCountryCode="ae" currentProviderSlug="du" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
