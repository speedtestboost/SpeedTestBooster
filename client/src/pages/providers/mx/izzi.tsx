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

export default function IzziSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const seoConfig = providerKeywords.izzi;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ProviderSEO providerSlug="izzi" />
      <Header currentPath="/providers/mx/izzi" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Izzi", href: "/providers/mx/izzi" }
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
              Test your <span className="font-semibold text-orange-500">Izzi internet speed</span> for free. Check your cable or fiber internet performance in Mexico.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
                data-testid="button-test-izzi-speed-primary"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Izzi Speed Now
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Get the Most Accurate Izzi Speed Test Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect via Ethernet cable directly to your Izzi modem for the most accurate cable speed test results. 
                    Close all background apps and disconnect other devices during testing. Test at multiple times throughout the day, 
                    avoiding peak hours (6-11 PM) when network traffic is highest across Mexico's urban centers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Your Speed Test Results */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Understanding Your Izzi Speed Test Results</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn what your Izzi internet speed test results mean and how to interpret download speeds, upload speeds, and ping for optimal cable and fiber internet performance.
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
                    Izzi's cable and fiber network delivers speeds ranging from 20 Mbps to 1 Gbps 
                    depending on your plan. This speed determines how quickly you can stream video, download files, and browse websites 
                    across Mexico's major metropolitan areas.
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
                    Izzi's <strong>cable DOCSIS 3.1 technology</strong> provides asymmetric speeds with upload speeds typically 
                    10-20% of download speeds. Fiber plans offer better upload performance, 
                    ideal for video conferencing, cloud backups, and content creation.
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
                    Izzi typically delivers ping between 20-40 ms on cable connections, with fiber offering lower latency, 
                    making it suitable for gaming, video calls, and real-time applications across Mexico.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Izzi Telecom</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Izzi Telecom, owned by Grupo Televisa, commands 25% of Mexico's fixed broadband market as the country's 
                  second-largest internet service provider. Known for competitive pricing and bundled entertainment packages, 
                  Izzi delivers high-speed cable internet to millions of Mexican homes through its hybrid fiber-coaxial network 
                  infrastructure, emphasizing urban and suburban coverage across central and northern Mexico with a focus on 
                  integrated telecommunications and entertainment services.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cable Network Excellence</h3>
                <p className="text-muted-foreground">
                  Izzi's cable internet infrastructure leverages DOCSIS 3.1 technology to deliver reliable broadband speeds 
                  up to 500 Mbps in key metropolitan areas including Mexico City, Monterrey, Guadalajara, and Puebla. The 
                  company's hybrid fiber-coaxial network combines fiber backbone connectivity with coaxial cable last-mile 
                  distribution, providing consistent connectivity for streaming, gaming, and remote work applications. This 
                  cable technology advantage enables rapid service provisioning and competitive pricing compared to traditional 
                  DSL alternatives while maintaining quality standards across Mexico's diverse urban landscape.
                </p>

                <h3 className="text-xl font-semibold mb-3">Entertainment Integration</h3>
                <p className="text-muted-foreground">
                  As part of Grupo Televisa, Izzi uniquely combines high-speed internet with extensive television content 
                  offerings, creating compelling triple-play bundles for Mexican families seeking integrated home entertainment 
                  solutions. The company's strategic focus on entertainment-oriented services appeals to households desiring 
                  combined packages for broadband connectivity, premium TV channels, and streaming platforms. This content 
                  advantage differentiates Izzi from competitors in Mexico's competitive telecommunications market, particularly 
                  among families prioritizing comprehensive media access.
                </p>

                <h3 className="text-xl font-semibold mb-3">Geographic Coverage Strategy</h3>
                <p className="text-muted-foreground">
                  Izzi concentrates its network infrastructure across Mexico's major population centers, delivering cable 
                  internet services to urban and suburban communities in the country's most economically vibrant regions. 
                  The company's coverage emphasizes metropolitan areas where cable infrastructure investment yields maximum 
                  subscriber density, creating efficient network economics that support competitive pricing strategies. This 
                  geographic focus enables Izzi to provide reliable high-speed internet to millions of Mexican households 
                  while maintaining network quality across its service territories.
                </p>

                <h3 className="text-xl font-semibold mb-3">Service Innovation and Technology</h3>
                <p className="text-muted-foreground">
                  Izzi continues investing in network infrastructure upgrades to support increasing bandwidth demands from 
                  Mexican consumers, implementing DOCSIS 3.1 technology and selective fiber deployments in high-density areas. 
                  The company balances technological advancement with affordability, offering tiered service plans that accommodate 
                  diverse household budgets while delivering consistent internet performance. Izzi's approach emphasizes practical 
                  connectivity solutions that meet everyday Mexican families' needs for streaming, social media, online education, 
                  and remote work capabilities.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Optimization</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Izzi customers monitor their internet performance and ensure optimal service 
                  delivery from their cable or fiber connection. Our <strong>Izzi speed test</strong> measures download speeds, 
                  upload speeds, and network latency, providing insights into your broadband performance across Mexico's major 
                  cities. This testing helps identify connectivity issues and ensures you're receiving the quality internet 
                  service that defines Izzi's telecommunications excellence in the Mexican market. Regular 
                  <strong> test de velocidad Izzi</strong> measurements ensure you're getting the cable performance you pay for.
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
                  <h3 className="font-semibold text-foreground mb-2">Pro Tip: Maximize Your Izzi Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    To get the best <strong>Izzi internet speed test</strong> results, ensure your equipment supports your plan speed. 
                    Plans over 200 Mbps require a DOCSIS 3.1-capable modem. Position your Izzi router centrally and avoid interference 
                    from thick walls or electronics. For optimal WiFi coverage in larger Mexican homes, consider a mesh WiFi system 
                    that works with your Izzi connection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cities with Fastest Izzi Speeds */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Cities with Fastest Izzi Internet Speeds in Mexico</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                Izzi delivers exceptional cable and fiber internet speeds across Mexico's major metropolitan areas with speeds up to 1 Gbps widely available and competitive pricing.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Mexico City</div>
                  <div className="text-sm text-muted-foreground">Up to 1 Gig</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Guadalajara</div>
                  <div className="text-sm text-muted-foreground">Up to 500 Mbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Monterrey</div>
                  <div className="text-sm text-muted-foreground">Up to 500 Mbps</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">Puebla</div>
                  <div className="text-sm text-muted-foreground">Up to 500 Mbps</div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Other top-performing Izzi markets include León, Querétaro, Toluca, and Tijuana. 
                Izzi's DOCSIS 3.1 cable network ensures reliable high-speed connectivity with competitive pricing for Mexican families.
              </p>
            </CardContent>
          </Card>

          {/* Second CTA */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setShowSpeedTest(true)} 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 transition-opacity"
              data-testid="button-test-izzi-speed-secondary"
            >
              <Zap className="mr-2 h-5 w-5" />
              Test Your Izzi Speed
            </Button>
          </div>

          {/* Troubleshooting Section */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Troubleshooting Slow Izzi Speeds</h2>
              <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                If your Izzi speed test results are below expectations, try these proven solutions before contacting technical support:
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
                      <li>Position your <strong>Izzi modem/router</strong> centrally and elevated for maximum coverage</li>
                      <li>Keep the router away from thick walls, metal objects, and electronic interference</li>
                      <li>Consider a <strong>WiFi 6 router</strong> or mesh system for larger Mexican homes</li>
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
                      <li>Ensure your modem supports your subscribed speed tier (DOCSIS 3.1 for plans over 200 Mbps)</li>
                      <li>Check that Ethernet cables are <strong>Cat5e or Cat6</strong> for optimal cable performance</li>
                      <li>Update your Izzi modem firmware by restarting or contacting support</li>
                      <li>Contact <a href="https://izzi.mx/ayuda" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Izzi support</a> for equipment upgrades if needed</li>
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
                      <li>Izzi cable should deliver 80%+ of plan speed on wired connections</li>
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
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Contact Izzi Technical Support</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>If issues persist, contact Izzi support at <strong>800-12-IZZI (800-124-994)</strong></li>
                      <li>Check for cable line issues or local network outages on <a href="https://izzi.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Izzi's website</a></li>
                      <li>Request a technician visit to inspect your cable connection and modem</li>
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
                  {index === 0 && "Test your Izzi internet speed with our advanced online speed test tool designed for Mexico's major cable provider. Our platform provides accurate measurements of your cable and fiber connection, ensuring you're getting the competitive speeds that Izzi delivers across Mexico's metropolitan areas."}
                  {index === 1 && "Check your Izzi upload speed to ensure optimal performance for video conferencing, file uploads, and cloud backups. While Izzi cable connections offer asymmetric speeds, fiber plans provide better upload performance for content creators and remote workers across Mexico."}
                  {index === 2 && "Monitor your Izzi ping and latency for gaming, video calls, and real-time applications. Lower ping times indicate better network responsiveness, which is crucial for competitive gaming and professional video conferencing on Izzi's cable network across Mexican cities."}
                  {index === 3 && "Test your Izzi cable speed with DOCSIS 3.1 technology to verify broadband performance. Izzi's advanced cable infrastructure provides reliable high-speed internet without traditional phone line limitations in Mexico's urban centers."}
                  {index === 4 && "Test your Izzi fiber speed to verify premium broadband performance in select Mexican markets. Izzi's fiber deployments offer superior speeds and lower latency compared to traditional cable in high-density areas where fiber infrastructure is available."}
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-orange-500 hover:bg-orange-600"
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

          <RelatedProviders currentCountryCode="mx" currentProviderSlug="izzi" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
