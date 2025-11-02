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

export default function VerizonSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.verizon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="verizon" />
      <Header currentPath="/providers/us/verizon" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Verizon", href: "/providers/us/verizon" }
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
              Test your <span className="font-semibold text-red-500">Verizon internet speed</span> for free. Check your Fios fiber or 5G home internet performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-verizon-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Verizon Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate Verizon Fios Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your Verizon router for the most accurate fiber speed test results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (6-11 PM) when network traffic is highest.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your Verizon Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your Verizon Fios internet speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal fiber internet performance.
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
                    Verizon Fios fiber delivers symmetrical speeds, so your download speed can range from 300 Mbps to 2 Gbps 
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
                    Unlike cable internet, <strong>Verizon Fios offers symmetrical speeds</strong>—meaning your upload speed 
                    matches your download speed. This is ideal for video conferencing, cloud backups, and content creation.
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
                    Verizon Fios typically delivers ping under 10-20 ms thanks to its direct fiber connection, 
                    making it excellent for gaming, video calls, and real-time applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Verizon</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Verizon Communications stands as one of America's largest telecommunications companies, renowned for 
                  its premium fiber-optic network infrastructure and advanced 5G wireless technology. Operating 
                  primarily in the eastern United States, Verizon serves millions of customers with comprehensive 
                  internet, mobile, and digital services while maintaining a reputation for network quality and 
                  technological innovation in the competitive American telecommunications market.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Fiber Network Leadership</h3>
                <p className="text-muted-foreground">
                  Verizon Fios represents one of the most extensive pure fiber-optic networks in the United States, 
                  delivering symmetrical upload and download speeds directly to homes and businesses. The company's 
                  fiber infrastructure spans major metropolitan areas across the eastern seaboard, providing customers 
                  with reliable, high-capacity internet connections that support bandwidth-intensive applications 
                  including 4K streaming, cloud computing, and smart home technologies.
                </p>

                <h3 className="text-xl font-semibold mb-3">5G Innovation Excellence</h3>
                <p className="text-muted-foreground">
                  Verizon operates one of America's most advanced 5G networks, pioneering mmWave 5G Ultra Wideband 
                  technology in major cities across the country. The company's 5G infrastructure supports not only 
                  mobile communications but also 5G home internet services that provide wireless broadband alternatives 
                  to traditional fixed-line connections. This wireless innovation positions Verizon at the forefront 
                  of next-generation telecommunications technology.
                </p>

                <h3 className="text-xl font-semibold mb-3">Premium Service Quality</h3>
                <p className="text-muted-foreground">
                  Verizon distinguishes itself through consistent focus on network quality and customer service 
                  excellence, operating premium telecommunications infrastructure that emphasizes reliability and 
                  performance over aggressive pricing strategies. The company's approach appeals to customers who 
                  prioritize service quality and technological innovation, making Verizon particularly attractive 
                  to business customers and technology-focused consumers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Business and Enterprise Solutions</h3>
                <p className="text-muted-foreground">
                  Verizon provides comprehensive business telecommunications solutions including enterprise networking, 
                  cloud services, cybersecurity, and IoT applications that support American businesses across all 
                  industries. The company's business division leverages its advanced network infrastructure to 
                  deliver sophisticated technical solutions while maintaining the reliability and security standards 
                  required by enterprise customers.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Verizon customers monitor their internet performance and ensure optimal 
                  service delivery from their Fios fiber or 5G home connection. Our <strong>Verizon Fios speed test</strong> measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  premium internet service quality that defines Verizon's telecommunications excellence. Regular 
                  <strong>Verizon internet speed tests</strong> ensure you're getting the fiber performance you pay for.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your Verizon Fios Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>Verizon Fios speed test</strong> results, ensure your equipment supports your plan speed. 
                    Gigabit plans require a Gigabit-capable router. Position your Verizon router centrally and avoid interference 
                    from thick walls or electronics. For 5G Home Internet, placement near windows facing cell towers improves performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest Verizon Fios Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest Verizon Fios Internet Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Verizon Fios delivers exceptional fiber internet speeds across major East Coast metros with symmetrical Gigabit speeds widely available and industry-leading reliability.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">New York City</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Philadelphia</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Boston</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Washington DC</div>
                  <div className="text-sm text-muted-foreground">Up to 2 Gig</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing Fios markets include Richmond, Pittsburgh, Tampa, and parts of New Jersey. 
                Verizon's 100% fiber-optic network ensures ultra-reliable high-speed connectivity with symmetrical upload/download speeds.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-verizon-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your Verizon Fios Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow Verizon Fios Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your Verizon Fios speed test results are below expectations, try these proven solutions before contacting technical support:
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
                      <li>Position your <strong>Verizon Fios router</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the router away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider a <strong>WiFi 6 router</strong> or mesh system for larger homes</li>
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
                      <li>Update your Verizon Fios router firmware through the My Verizon app</li>
                      <li>Contact <a href="https://www.verizon.com/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Verizon support</a> for equipment upgrades if needed</li>
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
                      <li>Verizon Fios should deliver 90%+ of plan speed on wired connections</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact Verizon Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact Verizon support at <strong>1-800-VERIZON (1-800-837-4966)</strong></li>
                      <li>Check for fiber line issues or local network outages on <a href="https://www.verizon.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Verizon's website</a></li>
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
                  {index === 0 && "Test your Verizon Fios internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your fiber optic connection, ensuring you're getting the premium speeds that Verizon Fios delivers across the eastern United States."}
                  {index === 1 && "Check your Verizon upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. Verizon Fios offers symmetrical speeds, meaning your upload speeds should match your download speeds for premium fiber service."}
                  {index === 2 && "Monitor your Verizon ping and latency for gaming, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional video conferencing on Verizon's fiber network."}
                  {index === 3 && "Test your Verizon 5G Home internet speed to verify wireless broadband performance. Verizon's 5G Ultra Wideband technology provides fiber-like speeds without traditional cable connections in select coverage areas."}
                  {index === 4 && "Find Verizon speed test locations near you for the most accurate local network performance measurements. Testing from nearby servers provides the best indication of your actual Verizon connection quality and speed."}
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

          <RelatedProviders currentCountryCode="us" currentProviderSlug="verizon" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
