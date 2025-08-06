import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function DeutscheTelekomSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Deutsche Telekom Speed Test - Test Telekom Internet Germany 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test your Deutsche Telekom internet speed for free. Telekom Germany speed test for DSL, fibre, and 5G internet services nationwide.');
    }

    // Add canonical tag
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `${window.location.origin}/providers/de/deutsche-telekom`);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Deutsche Telekom Speed Test", 
      "description": "Test your Deutsche Telekom internet speed for free. Speed test for Telekom DSL and fibre customers in Germany.",
      "url": `${window.location.origin}/providers/de/deutsche-telekom`,
      "provider": {
        "@type": "Organization",
        "name": "Deutsche Telekom",
        "description": "Germany's largest telecommunications company providing internet, mobile, and digital services",
        "areaServed": { "@type": "Country", "name": "Germany" },
        "serviceType": ["DSL Internet", "Fibre Internet", "5G Mobile", "TV", "Cloud Services"]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) document.head.removeChild(existingCanonical);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/providers/de/deutsche-telekom" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Hero Section with Speed Test */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-pink-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-pink-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 bg-clip-text text-transparent">
              Deutsche Telekom Speed Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Test your <span className="font-semibold text-pink-500">Deutsche Telekom internet speed</span> for free. Check your DSL or fibre internet performance across Germany.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Telekom Speed Now
              </Button>
            </div>
          </div>

          {/* SEO Content About Deutsche Telekom */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About Deutsche Telekom</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Deutsche Telekom stands as Europe's largest telecommunications company and Germany's national digital 
                  infrastructure provider, connecting millions of customers across the country with comprehensive internet, 
                  mobile, and digital services. With deep roots in German telecommunications history, the company has 
                  evolved into a global technology leader while maintaining its commitment to German innovation and quality.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">National Infrastructure Backbone</h3>
                <p className="text-muted-foreground">
                  Deutsche Telekom operates Germany's most extensive telecommunications network, encompassing traditional 
                  copper-based DSL connections, modern fibre optic infrastructure, and cutting-edge 5G mobile networks. 
                  The company's infrastructure investments focus on digitizing Germany's economy, supporting Industry 4.0 
                  initiatives, and ensuring reliable connectivity for businesses and consumers nationwide. This comprehensive 
                  network forms the foundation of Germany's digital transformation.
                </p>

                <h3 className="text-xl font-semibold mb-3">European Technology Leadership</h3>
                <p className="text-muted-foreground">
                  As a founding member of the European telecommunications landscape, Deutsche Telekom influences industry 
                  standards and drives technological innovation across the continent. The company's research and development 
                  initiatives focus on next-generation technologies including artificial intelligence, Internet of Things 
                  (IoT), and cloud computing services. Deutsche Telekom's T-Systems division provides enterprise-grade 
                  digital solutions to businesses across Europe and beyond.
                </p>

                <h3 className="text-xl font-semibold mb-3">Fibre Network Expansion</h3>
                <p className="text-muted-foreground">
                  Deutsche Telekom's ambitious fibre expansion program aims to connect millions of German households and 
                  businesses with pure fibre optic connections. The company's Glasfaser (fibre glass) initiative represents 
                  one of Europe's largest network modernization projects, replacing aging copper infrastructure with 
                  future-ready fibre technology. This investment ensures Germany remains competitive in the global 
                  digital economy while supporting remote work and digital innovation.
                </p>

                <h3 className="text-xl font-semibold mb-3">Digital Services Integration</h3>
                <p className="text-muted-foreground">
                  Beyond traditional telecommunications, Deutsche Telekom offers comprehensive digital ecosystem services 
                  including cloud computing, cybersecurity, and smart home solutions. The company's MagentaZuhause and 
                  MagentaMobil brands integrate internet, television, and mobile services into cohesive digital packages. 
                  This holistic approach positions Deutsche Telekom as more than an internet provider – it's a complete 
                  digital services partner for German consumers and businesses.
                </p>

                <h3 className="text-xl font-semibold mb-3">Connection Quality Monitoring</h3>
                <p className="text-muted-foreground">
                  Testing your Deutsche Telekom connection helps ensure optimal performance from your internet service. 
                  Our speed test accurately measures download speeds, upload speeds, and network latency for both DSL 
                  and fibre connections. Regular monitoring helps identify performance variations and ensures you're 
                  receiving the quality service expected from Germany's leading telecommunications provider.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}