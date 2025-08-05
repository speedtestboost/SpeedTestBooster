import { useEffect, useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, Globe, Zap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SpeedTestModal from "@/components/SpeedTestModal";

const countries = [
  {
    name: "United States",
    code: "us",
    flag: "🇺🇸",
    population: "331M",
    providers: [
      { name: "Verizon", slug: "verizon", type: "Fiber/5G", coverage: "Nationwide" },
      { name: "Comcast Xfinity", slug: "comcast-xfinity", type: "Cable/Fiber", coverage: "39 States" },
      { name: "AT&T", slug: "att", type: "Fiber/DSL", coverage: "Nationwide" }
    ]
  },
  {
    name: "United Kingdom",
    code: "uk",
    flag: "🇬🇧",
    population: "67M",
    providers: [
      { name: "BT", slug: "bt", type: "Fiber/ADSL", coverage: "Nationwide" },
      { name: "Sky", slug: "sky", type: "Fiber/ADSL", coverage: "Nationwide" },
      { name: "Virgin Media", slug: "virgin-media", type: "Cable/Fiber", coverage: "Nationwide" }
    ]
  },
  {
    name: "Canada",
    code: "ca",
    flag: "🇨🇦",
    population: "38M",
    providers: [
      { name: "Bell", slug: "bell", type: "Fiber/DSL", coverage: "Nationwide" },
      { name: "Rogers", slug: "rogers", type: "Cable/5G", coverage: "Nationwide" },
      { name: "Telus", slug: "telus", type: "Fiber/LTE", coverage: "Western Canada" }
    ]
  },
  {
    name: "Germany",
    code: "de",
    flag: "🇩🇪",
    population: "83M",
    providers: [
      { name: "Deutsche Telekom", slug: "deutsche-telekom", type: "Fiber/DSL", coverage: "Nationwide" },
      { name: "Vodafone", slug: "vodafone-de", type: "Cable/5G", coverage: "Nationwide" },
      { name: "O2", slug: "o2-de", type: "DSL/LTE", coverage: "Nationwide" }
    ]
  },
  {
    name: "Australia",
    code: "au",
    flag: "🇦🇺",
    population: "26M",
    providers: [
      { name: "Telstra", slug: "telstra", type: "NBN/5G", coverage: "Nationwide" },
      { name: "Optus", slug: "optus", type: "NBN/5G", coverage: "Nationwide" },
      { name: "TPG", slug: "tpg", type: "NBN/ADSL", coverage: "Nationwide" }
    ]
  }
];

export default function InternetProviders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Internet Service Providers Worldwide - Speed Test & Compare ISPs 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare internet service providers worldwide. Test speeds for major ISPs including Verizon, BT, Bell, Telstra, Deutsche Telekom, Jio Fiber, Orange, Vivo, NTT, and KT. Find the best broadband plans in your country.');
    }

    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Internet Service Providers Worldwide",
      "description": "Compare internet service providers worldwide. Test speeds for major ISPs and find the best broadband plans in your country.",
      "url": `${window.location.origin}/internet-providers`,
      "mainEntity": {
        "@type": "ItemList",
        "name": "Internet Service Providers by Country",
        "numberOfItems": countries.length,
        "itemListElement": countries.map((country, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Organization",
            "name": `${country.name} Internet Providers`,
            "description": `Internet service providers available in ${country.name}`,
            "serviceArea": {
              "@type": "Country",
              "name": country.name
            }
          }
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Internet Providers",
            "item": `${window.location.origin}/internet-providers`
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const filteredCountries = countries.filter(country => {
    if (selectedCountry && country.code !== selectedCountry) return false;
    if (!searchTerm) return true;
    
    return country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           country.providers.some(provider => 
             provider.name.toLowerCase().includes(searchTerm.toLowerCase())
           );
  });

  const totalProviders = countries.reduce((sum, country) => sum + country.providers.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/internet-providers" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Internet Service Providers
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Compare and test internet speeds from <span className="font-semibold text-primary">{totalProviders}+ ISPs</span> across <span className="font-semibold text-primary">{countries.length} countries</span>. Find the best broadband provider in your area and optimize your connection.
            </p>
            
            {/* Speed Test CTA */}
            <div className="mb-8">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Your Internet Speed
              </Button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search countries or providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCountry || ""}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
                className="px-4 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country) => (
              <Card key={country.code} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{country.name}</h3>
                        <p className="text-sm text-muted-foreground">{country.population} population</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{country.providers.length} ISPs</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {country.providers.slice(0, 4).map((provider) => (
                      <Link 
                        key={provider.slug} 
                        href={`/providers/${country.code}/${provider.slug}`}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Wifi className="h-4 w-4 text-primary" />
                            <span className="font-medium">{provider.name}</span>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              {provider.type}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{provider.coverage}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {country.providers.length > 4 && (
                    <Link href={`/providers/${country.code}`}>
                      <Button variant="outline" className="w-full">
                        View All {country.providers.length} Providers
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SEO Content */}
          <div className="mt-16 max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            <h2 className="text-2xl font-bold mb-6">Global Internet Provider Speed Testing</h2>
            <p className="text-muted-foreground mb-6">
              Our comprehensive database includes speed test capabilities for major internet service providers across 10 countries, 
              covering over {totalProviders} ISPs. Test your connection speed, compare providers, and find the best broadband plan for your needs.
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Featured Countries & Top ISPs:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🇺🇸 United States</h4>
                <p className="text-sm text-muted-foreground">Verizon, Comcast Xfinity, AT&T, Spectrum</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🇬🇧 United Kingdom</h4>
                <p className="text-sm text-muted-foreground">BT, Sky, Virgin Media, TalkTalk</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🇨🇦 Canada</h4>
                <p className="text-sm text-muted-foreground">Bell, Rogers, Telus, Shaw</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🇦🇺 Australia</h4>
                <p className="text-sm text-muted-foreground">Telstra, Optus, TPG, iiNet</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🇩🇪 Germany</h4>
                <p className="text-sm text-muted-foreground">Deutsche Telekom, Vodafone, O2, 1&1</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">🇮🇳 India</h4>
                <p className="text-sm text-muted-foreground">Jio Fiber, Airtel Xstream, ACT Fibernet, BSNL</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}
    </div>
  );
}