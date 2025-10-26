import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderSEO from "@/components/ProviderSEO";
import { providerKeywords } from "@/seo/providerKeywords";
import RelatedProviders from "@/components/RelatedProviders";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericFooter from "@/components/GenericFooter";

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
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Verizon Speed Now
              </Button>
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
                  service delivery from their Fios fiber or 5G home connection. Our Verizon speed test measures 
                  download speeds, upload speeds, and network latency, providing insights into your broadband 
                  performance. This testing helps identify connectivity issues and ensures you're receiving the 
                  premium internet service quality that defines Verizon's telecommunications excellence.
                </p>
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
