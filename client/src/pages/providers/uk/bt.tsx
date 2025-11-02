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

export default function BTSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.bt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="bt" />
      <Header currentPath="/providers/uk/bt" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "BT", href: "/providers/uk/bt" }
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
              Test your <span className="font-semibold text-purple-500">BT broadband speed</span> for free. Check your BT Full Fibre or FTTC internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-bt-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test BT Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate BT Broadband Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your BT Hub for the most accurate fiber speed test results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (6-11 PM) when network traffic is highest on shared infrastructure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your BT Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your BT broadband speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal fiber internet performance.
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
                    BT Full Fibre delivers consistent speeds, ranging from 50 Mbps to 900 Mbps 
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
                    <strong>BT Full Fibre offers faster upload speeds</strong> than FTTC connections, typically 
                    ranging from 10 Mbps to 110 Mbps. This is crucial for video conferencing, cloud backups, and content creation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <span className="text-3xl">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Ping Rate (Latency)</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Ping</strong> measures network latency—how long it takes for data to travel to a server and back. 
                    BT broadband typically delivers ping under 15-30 ms thanks to the UK's extensive fiber network, 
                    making it excellent for gaming, video calls, and real-time applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About BT</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  BT Group plc represents the United Kingdom's oldest and most established telecommunications company, 
                  with origins tracing back to the founding of the public telephone system. As the UK's largest provider 
                  and incumbent operator, BT maintains extensive network infrastructure across the UK while serving millions 
                  of customers with comprehensive internet, mobile, and digital services. The company operates critical national 
                  telecommunications infrastructure while competing in modern broadband and business communications markets, 
                  and enhancing customer experience with integrated services including BT Sport.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Infrastructure Heritage</h3>
                <p className="text-muted-foreground">
                  BT operates the United Kingdom's most extensive telecommunications network infrastructure, built 
                  upon decades of investment in copper, fiber, and wireless technologies. The company's network 
                  reaches virtually every community across England, Scotland, Wales, and Northern Ireland, providing 
                  comprehensive coverage that reflects BT's historical role as the UK's primary telecommunications 
                  provider. This extensive infrastructure foundation enables diverse connectivity solutions across 
                  varied geographic and demographic markets, making BT the natural choice for reliable broadband.
                </p>

                <h3 className="text-xl font-semibold mb-3">BT Full Fibre Network Advancement</h3>
                <p className="text-muted-foreground">
                  BT's Full Fibre broadband network represents significant modernization of UK telecommunications 
                  infrastructure, delivering superfast and ultrafast broadband services through fiber-to-the-cabinet (FTTC) 
                  and fiber-to-the-premises (FTTP) technologies. The company's fiber deployment strategy encompasses both 
                  urban centers and rural communities, supporting the UK government's digital connectivity goals 
                  while providing customers with advanced broadband capabilities for streaming, remote work, and 
                  digital applications. BT Full Fibre delivers speeds up to 900 Mbps for demanding households.
                </p>

                <h3 className="text-xl font-semibold mb-3">BT Sport Integration</h3>
                <p className="text-muted-foreground">
                  BT uniquely combines broadband services with premium sports content through BT Sport, offering customers 
                  integrated entertainment packages that include live Premier League football, UEFA Champions League, and 
                  exclusive sporting events. This convergence of connectivity and content sets BT apart from pure-play 
                  internet providers, delivering value to sports enthusiasts who demand both high-speed broadband for 
                  4K streaming and access to premium live sports programming.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business and Enterprise Leadership</h3>
                <p className="text-muted-foreground">
                  BT Global Services operates as a major provider of telecommunications solutions for UK and 
                  international businesses, delivering managed networks, cloud services, cybersecurity, and 
                  communication platforms. The company's business division leverages its extensive network 
                  infrastructure and technical expertise to serve large corporations, government agencies, and 
                  public sector organizations with sophisticated connectivity and communication requirements.
                </p>

                <h3 className="text-xl font-semibold mb-3">Technology Innovation Focus</h3>
                <p className="text-muted-foreground">
                  BT invests in emerging telecommunications technologies including 5G networks, Internet of Things 
                  applications, and artificial intelligence solutions that enhance network performance and customer 
                  experiences. The company's innovation strategy emphasizes research and development while maintaining 
                  the reliability and coverage standards expected from the UK's national telecommunications provider. 
                  This technology focus supports both consumer services and specialized business applications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps BT customers monitor their internet performance and ensure optimal 
                  service delivery from their Full Fibre or FTTC connection. Our <strong>BT broadband speed test</strong> measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  reliable internet service that reflects BT's telecommunications heritage and infrastructure excellence. Regular 
                  <strong>BT speed tests</strong> ensure you're getting the fiber performance you pay for.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your BT Broadband Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>BT broadband speed test</strong> results, ensure your BT Hub supports your plan speed. 
                    Full Fibre plans require compatible equipment—BT typically provides the right Hub for your package. Position your BT Hub 
                    centrally and avoid interference from thick walls or electronics. For FTTC connections, distance from the street cabinet affects speeds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest BT Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest BT Full Fibre Internet Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                BT Full Fibre delivers exceptional broadband speeds across major UK cities with ultrafast fiber widely available and the reliability that comes from the UK's largest provider.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">London</div>
                  <div className="text-sm text-muted-foreground">Up to 900 Mbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Manchester</div>
                  <div className="text-sm text-muted-foreground">Up to 900 Mbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Birmingham</div>
                  <div className="text-sm text-muted-foreground">Up to 900 Mbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Edinburgh</div>
                  <div className="text-sm text-muted-foreground">Up to 900 Mbps</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing BT markets include Bristol, Leeds, Glasgow, Liverpool, and Cardiff. 
                BT's extensive fiber network ensures reliable high-speed connectivity with comprehensive UK coverage as the nation's largest provider.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-bt-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your BT Broadband Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow BT Broadband Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your BT broadband speed test results are below expectations, try these proven solutions before contacting technical support:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Optimize Wi-Fi Signal Strength</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Position your <strong>BT Hub</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the Hub away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider <strong>BT Complete Wi-Fi</strong> or a mesh system for larger homes</li>
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
                      <li>Ensure your BT Hub supports your subscribed speed tier (Full Fibre requires compatible Hub)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal fiber performance</li>
                      <li>Update your BT Hub firmware—it usually updates automatically</li>
                      <li>Contact <a href="https://bt.com/help" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">BT support</a> for equipment upgrades if needed</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Network className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Test With Ethernet Connection</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Use a <strong>wired Ethernet connection</strong> to eliminate WiFi as the bottleneck</li>
                      <li>If wired speeds are normal but WiFi is slow, the issue is your wireless setup</li>
                      <li>Run a <Link href="/ping-test" className="text-primary hover:underline">ping test</Link> to check for latency issues</li>
                      <li>BT Full Fibre should deliver 85%+ of plan speed on wired connections</li>
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
                      <li>Limit simultaneous 4K streams (especially BT Sport) and large downloads during speed tests</li>
                      <li>Use <strong>Quality of Service (QoS)</strong> settings in your BT Hub to prioritize critical traffic</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact BT Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact BT support at <strong>0800 800 150</strong></li>
                      <li>Check for line issues or local network outages on <a href="https://bt.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">BT's website</a></li>
                      <li>Request a technician visit to inspect your fiber connection and Openreach infrastructure</li>
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
                  {index === 0 && "Test your BT broadband internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your fiber optic or FTTC connection, ensuring you're getting the speeds that BT delivers across the United Kingdom as the nation's largest provider."}
                  {index === 1 && "Check your BT fiber speed to ensure optimal Full Fibre performance for streaming, gaming, and work from home. BT Full Fibre offers fast download speeds up to 900 Mbps, making it ideal for bandwidth-intensive households with multiple devices and 4K streaming needs."}
                  {index === 2 && "Check your BT upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. BT Full Fibre offers faster upload speeds than FTTC connections, providing better performance for remote work and content creation."}
                  {index === 3 && "Monitor your BT ping and latency for gaming, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional video conferencing on BT's fiber network."}
                  {index === 4 && "Test your BT FTTC speed to verify Superfast Broadband performance. FTTC (Fiber to the Cabinet) delivers speeds up to 67-80 Mbps depending on your distance from the street cabinet, providing reliable broadband for most households across the UK."}
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-purple-500 hover:bg-purple-600"
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

          <RelatedProviders currentCountryCode="uk" currentProviderSlug="bt" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
