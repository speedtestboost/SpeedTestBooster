import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function VerizonSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Verizon Speed Test - Test Verizon Fios Internet Speed 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Verizon internet speed for free. Verizon Fios speed test for fiber internet and 5G home internet nationwide.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', `${window.location.origin}/providers/us/verizon`);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Verizon Speed Test",
      "description": "Test your Verizon internet speed for free. Speed test for Verizon Fios and 5G customers.",
      "url": `${window.location.origin}/providers/us/verizon`,
      "provider": {
        "@type": "Organization",
        "name": "Verizon",
        "description": "Major US telecommunications company providing fiber and 5G internet services",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Fiber Internet", "5G Home", "Mobile", "TV", "Business Services"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
      // Reset canonical to homepage when leaving page
      const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
      if (canonical) {
        canonical.setAttribute('href', 'https://speedtestboost.com/');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/verizon" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-red-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
              Verizon Speed Test
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
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}