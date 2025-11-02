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

export default function TelstraSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.telstra;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="telstra" />
      <Header currentPath="/providers/au/telstra" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Telstra", href: "/providers/au/telstra" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              {seoConfig.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Telstra internet speed</span> for free. Check your NBN or 5G home internet performance across Australia.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-telstra-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Telstra Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate Telstra Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your Telstra modem for the most accurate NBN speed test results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (6-11 PM) when network traffic is highest.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your Telstra Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your Telstra NBN internet speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal broadband performance.
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
                    Telstra NBN plans deliver speeds ranging from 25 Mbps to 1 Gbps (1000 Mbps) 
                    depending on your plan and NBN technology type (FTTP, HFC, or FTTC). This speed determines how quickly you can stream video, download files, and browse websites.
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
                    Telstra NBN upload speeds vary by plan and technology—<strong>FTTP connections offer the best upload speeds</strong>, 
                    while FTTN and HFC typically provide lower uploads. This is crucial for video conferencing, cloud backups, and content creation.
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
                    Telstra's NBN network typically delivers ping under 15-30 ms depending on your connection type and location, 
                    making it suitable for gaming, video calls, and real-time applications across Australia.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Telstra</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Telstra stands as Australia's largest and most established telecommunications company, with over 150 years 
                  of experience connecting Australians across the vast continent. From its origins as the Postmaster-General's 
                  Department to becoming a privatized telecommunications giant, Telstra has remained the backbone of Australian 
                  communications infrastructure, serving millions of customers with reliable internet, mobile, and digital services.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Network Leadership</h3>
                <p className="text-muted-foreground">
                  Telstra operates Australia's most extensive telecommunications network, covering more geographic area 
                  than any other provider. The company's infrastructure spans from major metropolitan centers like Sydney, 
                  Melbourne, Brisbane, Perth, and Adelaide to remote outback communities, ensuring connectivity across Australia's 
                  challenging terrain. Telstra's network investments focus on expanding 5G coverage, enhancing NBN services, and 
                  maintaining critical communications infrastructure for emergency services and government operations.
                </p>

                <h3 className="text-xl font-semibold mb-3">NBN Partnership Excellence</h3>
                <p className="text-muted-foreground">
                  As Australia's leading NBN retail service provider, Telstra leverages its extensive experience and 
                  infrastructure expertise to deliver superior NBN broadband services. The company's wholesale arrangements 
                  and technical capabilities enable optimized NBN performance across all technology types—Fiber to the Premises 
                  (FTTP), Hybrid Fibre-Coaxial (HFC), and Fiber to the Curb (FTTC). Telstra's NBN services benefit from the 
                  company's deep understanding of Australian network conditions and customer requirements, offering plans from 
                  NBN 25 to NBN 1000 (1 Gbps).
                </p>

                <h3 className="text-xl font-semibold mb-3">Mobile Network Innovation</h3>
                <p className="text-muted-foreground">
                  Telstra's mobile network reaches 99.5% of the Australian population, making it the country's most 
                  comprehensive wireless network. The company leads Australia's 5G rollout, deploying next-generation 
                  technology across major cities and regional centers. Telstra's 5G Home Internet service provides wireless 
                  broadband alternatives to traditional NBN connections, offering speeds up to 600 Mbps in select coverage 
                  areas. This mobile infrastructure supports not only consumer communications but also critical business 
                  applications and Internet of Things (IoT) deployments.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise and Government Services</h3>
                <p className="text-muted-foreground">
                  Beyond consumer services, Telstra provides mission-critical telecommunications solutions for Australian 
                  businesses, government agencies, and essential services organizations. The company's enterprise division 
                  offers cloud computing, cybersecurity, managed network services, and digital transformation consulting. 
                  Telstra's role in national security and emergency communications underscores its importance to Australia's 
                  critical infrastructure and economic resilience, maintaining the nation's largest and most reliable network.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Telstra customers monitor their internet and mobile performance across 
                  Australia's diverse geographic conditions. Our <strong>Telstra speed test</strong> measures download speeds, upload 
                  speeds, and network latency for both NBN and 5G Home connections. This testing is particularly valuable 
                  given Australia's unique geography and helps ensure optimal performance whether you're in Sydney, 
                  Perth, or remote regional areas. Regular <strong>Telstra NBN speed tests</strong> and <strong>Telstra broadband speed tests</strong> 
                  ensure you're getting the internet performance you pay for from Australia's leading telecommunications provider.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your Telstra NBN Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>Telstra NBN speed test</strong> results, ensure your equipment supports your plan speed. 
                    Gigabit plans require a Gigabit-capable modem and router. Position your Telstra modem centrally and avoid interference 
                    from thick walls or electronics. For 5G Home Internet, placement near windows facing cell towers improves performance significantly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest Telstra Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest Telstra Internet Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Telstra delivers exceptional NBN and 5G internet speeds across Australia's major metros with NBN 1000 (Gigabit) widely available and industry-leading 5G coverage.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Sydney</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig NBN</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Melbourne</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig NBN</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Brisbane</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig NBN</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Perth</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig NBN</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing Telstra markets include Adelaide, Canberra, Gold Coast, and Newcastle. 
                Telstra's extensive NBN network and nationwide 5G coverage ensure ultra-reliable high-speed connectivity across urban and regional Australia.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-telstra-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your Telstra Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow Telstra Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your Telstra speed test results are below expectations, try these proven solutions before contacting technical support:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Optimize Wi-Fi Signal Strength</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Position your <strong>Telstra modem</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the modem away from thick walls, metal objects, and electronic interference</li>
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
                      <li>Ensure your modem supports your subscribed speed tier (Gigabit-capable for NBN 1000 plans)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal NBN performance</li>
                      <li>Update your Telstra modem firmware through the Telstra app or online account</li>
                      <li>Contact <a href="https://www.telstra.com.au/support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telstra support</a> for equipment upgrades if needed</li>
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
                      <li>Telstra NBN should deliver 85%+ of plan speed on wired connections</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact Telstra Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact Telstra support at <strong>13 22 00</strong></li>
                      <li>Check for NBN line issues or local network outages on <a href="https://www.telstra.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telstra's website</a></li>
                      <li>Request a technician visit to inspect your NBN connection and equipment</li>
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
                  {index === 0 && "Test your Telstra NBN internet speed with our advanced online speed test tool. Our platform provides accurate measurements of your NBN connection across all technology types—FTTP, HFC, and FTTC—ensuring you're getting the premium speeds that Telstra delivers across Australia."}
                  {index === 1 && "Check your Telstra upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. Upload speeds vary by NBN technology type, with FTTP connections offering the best upload performance for professional applications and content creation."}
                  {index === 2 && "Monitor your Telstra ping and latency for gaming, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional video conferencing on Telstra's extensive Australian network."}
                  {index === 3 && "Test your Telstra 5G Home internet speed to verify wireless broadband performance. Telstra's 5G network provides fiber-like speeds without traditional NBN connections in select coverage areas across Australia's major cities and regional centers."}
                  {index === 4 && "Run a comprehensive Telstra broadband speed test to check your internet connection quality. Whether you're on NBN 25, NBN 50, NBN 100, NBN 250, or NBN 1000 (Gigabit), our test measures real-world performance to ensure you're getting value from Australia's largest telco."}
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-blue-500 hover:bg-blue-600"
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

          <RelatedProviders currentCountryCode="au" currentProviderSlug="telstra" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}
