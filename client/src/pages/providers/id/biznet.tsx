import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function BiznetSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Biznet Speed Test Indonesia - Check Home Fiber Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Biznet Home fiber internet speed instantly - Free speed test for Indonesia. Accurate download/upload speeds & gaming performance now.');
    }

    const canonical = document.createElement('link');


    canonical.rel = 'canonical';


    canonical.href = 'https://speedtestboost.com/providers/id/biznet';


    document.head.appendChild(canonical);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Biznet Speed Test Indonesia",
      "description": "Test your Biznet Home fiber internet speed for free. Speed test for Biznet customers in Indonesian urban markets.",
      "url": "https://speedtestboost.com/providers/id/biznet",
      "provider": {
        "@type": "Organization",
        "name": "Biznet",
        "description": "Premium fiber internet provider specializing in urban markets across Indonesia with gaming-optimized high-speed connectivity",
        "areaServed": { "@type": "Country", "name": "Indonesia" },
        "serviceType": ["Fiber Internet", "Gaming Internet", "Business Broadband", "Data Center Services"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);

      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/id/biznet" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: "Biznet", href: "/providers/id/biznet" }
            ]} 
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Biznet Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-blue-500">Biznet Home fiber internet speed</span> for free. Check your premium fiber performance in Indonesian cities.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
                data-testid="button-start-test"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Biznet Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Biznet Indonesia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Biznet has established itself as Indonesia's premier urban fiber specialist, targeting metropolitan areas with premium high-speed internet services. Known for exceptional performance and reliability, Biznet Home delivers fiber-optic connectivity specifically optimized for demanding users including gamers, content creators, and professionals requiring consistent ultra-fast internet speeds. The provider's strategic focus on major Indonesian cities has earned it a reputation for quality over quantity in the competitive broadband market.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Urban Market Expertise</h3>
                <p className="text-muted-foreground">
                  Biznet concentrates its infrastructure investment in Indonesia's major metropolitan areas, with particularly strong presence in Jakarta, Surabaya, Bandung, and other key urban centers. This focused deployment strategy allows Biznet to deliver superior service quality with symmetrical upload and download speeds, minimal latency, and exceptional network stability. The company's premium positioning attracts tech-savvy customers willing to pay more for guaranteed performance, making Biznet the preferred choice for users who demand reliable, high-speed connectivity for professional and entertainment applications.
                </p>

                <h3 className="text-xl font-semibold mb-3">Gaming-Optimized Performance</h3>
                <p className="text-muted-foreground">
                  Biznet's fiber network is specifically engineered for low-latency, high-throughput applications, making it exceptionally popular among Indonesia's growing gaming community. The provider offers plans up to 275 Mbps with optimized routing to major gaming servers and content delivery networks, ensuring smooth online gaming experiences, seamless 4K streaming, and rapid cloud service access. Biznet's technical infrastructure and network engineering expertise deliver consistent performance that sets it apart from mainstream providers, justifying its premium market positioning among Indonesia's urban internet users.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Verification</h3>
                <p className="text-muted-foreground">
                  Regular speed testing is essential for Biznet customers to verify they receive the premium performance they're paying for. Our Biznet speed test measures real-time download speeds, upload speeds, ping latency, and jitter, providing accurate insights into your fiber connection quality. These metrics help optimize your network configuration, troubleshoot connectivity issues, and ensure your Biznet Home service delivers the exceptional speeds and low latency that define the provider's premium market position across Indonesian urban markets.
                </p>
              </div>
            </CardContent>
          </Card>
          <RelatedProviders currentCountryCode="id" currentProviderSlug="biznet" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
      
      <GenericFooter />
    </div>
  );
}
