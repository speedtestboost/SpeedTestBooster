import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import RelatedProviders from "@/components/RelatedProviders";

export default function WindstreamSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Windstream Speed Test USA - Check Fiber & DSL Internet Free 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test Windstream fiber & DSL internet speed instantly - Free speed test for USA. Accurate rural broadband performance results in seconds.');
    }

    // Update canonical tag
    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/providers/us/windstream');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Windstream Speed Test",
      "description": "Test your Windstream internet speed for free. Speed test for Windstream fiber and DSL customers.",
      "url": "https://speedtestboost.com/providers/us/windstream",
      "provider": {
        "@type": "Organization",
        "name": "Windstream Communications",
        "description": "Rural internet provider specializing in fiber and DSL services across multiple states",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": ["Fiber Internet", "DSL Broadband", "Business Services", "Cloud Solutions"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'windstream-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#windstream-structured-data');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/us/windstream" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-purple-600/10 rounded-full">
                <Wifi className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-600 bg-clip-text text-transparent">
              Windstream Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-purple-600">Windstream internet speed</span> for free. Check your fiber or DSL broadband performance.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Windstream Speed Now
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Windstream Communications</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Windstream Communications operates as a specialized telecommunications provider focusing on 
                  rural and small-town markets across 18 states, delivering essential broadband connectivity 
                  through fiber-optic and DSL technologies. Known for its commitment to underserved communities 
                  and comprehensive business solutions, Windstream bridges the digital divide by providing 
                  reliable internet access and advanced communications services where traditional providers 
                  often find market entry challenging.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Rural America Connectivity</h3>
                <p className="text-muted-foreground">
                  Windstream specializes in serving rural communities and small towns across 18 states, 
                  providing essential broadband infrastructure where internet access remains limited or 
                  unavailable. The company's rural focus enables targeted service delivery that addresses 
                  the unique challenges of low-density markets while supporting local economic development, 
                  education, and healthcare initiatives. This geographic specialization positions Windstream 
                  as a critical telecommunications provider for America's rural communities.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fiber Network Development</h3>
                <p className="text-muted-foreground">
                  Windstream has invested substantially in fiber-optic network expansion, building modern 
                  telecommunications infrastructure that delivers high-speed internet to previously underserved 
                  areas. The company's fiber initiative provides symmetrical gigabit speeds that support 
                  bandwidth-intensive applications including telemedicine, distance learning, and cloud-based 
                  business operations. This fiber development represents Windstream's commitment to bringing 
                  21st-century connectivity to rural America.
                </p>

                <h3 className="text-xl font-semibold mb-3">Enterprise and Business Focus</h3>
                <p className="text-muted-foreground">
                  Windstream operates a significant business division providing comprehensive telecommunications 
                  solutions including dedicated internet access, MPLS networking, cloud services, and unified 
                  communications systems for enterprises nationwide. The company's business expertise extends 
                  beyond its rural residential markets, serving Fortune 500 companies and government organizations 
                  with sophisticated networking solutions. This business focus provides revenue stability 
                  while supporting Windstream's rural infrastructure investments.
                </p>

                <h3 className="text-xl font-semibold mb-3">Technology Integration Solutions</h3>
                <p className="text-muted-foreground">
                  Windstream provides advanced technology integration services including cloud computing, 
                  cybersecurity, and managed services that enable businesses to leverage modern digital 
                  technologies regardless of their geographic location. The company's technology solutions 
                  help rural businesses compete effectively in national markets by providing access to 
                  enterprise-grade communications and computing resources. This integration capability 
                  distinguishes Windstream as more than a traditional internet provider.
                </p>

                <h3 className="text-xl font-semibold mb-3">Community Development Partnership</h3>
                <p className="text-muted-foreground">
                  Windstream actively partners with local communities, economic development organizations, 
                  and government agencies to accelerate broadband deployment and digital literacy initiatives 
                  in rural markets. The company's community partnership approach recognizes that successful 
                  rural telecommunications requires collaboration with local stakeholders who understand 
                  regional needs and priorities. These partnerships enable more effective broadband deployment 
                  and community adoption of digital technologies.
                </p>

                <h3 className="text-xl font-semibold mb-3">Performance Testing and Support</h3>
                <p className="text-muted-foreground">
                  Regular speed testing helps Windstream customers monitor their internet performance and 
                  ensure optimal service delivery from their fiber or DSL connection. Our Windstream speed test 
                  measures download speeds, upload speeds, and network latency, providing insights into your 
                  broadband performance across the company's rural-focused network infrastructure. This testing 
                  helps identify connectivity issues and ensures you're receiving the reliable internet service 
                  that defines Windstream's rural telecommunications excellence and community commitment.
                </p>
              </div>
            </CardContent>
          </Card>

          <RelatedProviders currentCountryCode="us" currentProviderSlug="windstream" />
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}