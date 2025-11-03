import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Link } from "wouter";

export default function SpeedTest() {

  // SEO Meta Tags for homepage
  useEffect(() => {
    document.title = "Speed Test - Free WiFi Speed Test & Internet Speed Check Online";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free speed test online - Check WiFi speed test, internet speed test, and fiber speed test in seconds. Run net speed test, data speed test, and broadband speed checker. Test your speed now!');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', 'speed test, wifi speed test, internet speed test, wifispeed, net speed test, fiber speed test, data speed test, run speed test, speed test online, test wifi speed, my fiber speed test, wifi test, net speed, check internet speed, internet speed check, free internet speed test, spped test, test my speed, speed test fast');
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Free Internet Speed Test - Check WiFi & Broadband Speed' },
      { property: 'og:description', content: 'Free internet speed test tool. Test WiFi and broadband speeds instantly with accurate results. Check download, upload speeds and ping. Works globally with all ISPs.' },
      { property: 'og:url', content: 'https://speedtestboost.com/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Speed Test & Boost' },
      { property: 'og:locale', content: 'en_US' }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });
    
    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Free Internet Speed Test - Check WiFi & Broadband Speed' },
      { name: 'twitter:description', content: 'Free internet speed test tool. Test WiFi and broadband speeds instantly with accurate results.' }
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', tag.content);
    });
    
    // Bing-specific content-language meta tag
    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', 'en-US');
    
    // Canonical URL for homepage
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://speedtestboost.com/');
    
    // Hreflang tags for multilingual support
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    const hreflangEn = document.createElement('link');
    hreflangEn.setAttribute('rel', 'alternate');
    hreflangEn.setAttribute('hreflang', 'en');
    hreflangEn.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangEn);

    const hreflangEs = document.createElement('link');
    hreflangEs.setAttribute('rel', 'alternate');
    hreflangEs.setAttribute('hreflang', 'es');
    hreflangEs.setAttribute('href', 'https://speedtestboost.com/es');
    document.head.appendChild(hreflangEs);

    const hreflangId = document.createElement('link');
    hreflangId.setAttribute('rel', 'alternate');
    hreflangId.setAttribute('hreflang', 'id');
    hreflangId.setAttribute('href', 'https://speedtestboost.com/id');
    document.head.appendChild(hreflangId);

    const hreflangPtBr = document.createElement('link');
    hreflangPtBr.setAttribute('rel', 'alternate');
    hreflangPtBr.setAttribute('hreflang', 'pt-BR');
    hreflangPtBr.setAttribute('href', 'https://speedtestboost.com/pt-br');
    document.head.appendChild(hreflangPtBr);

    const hreflangFr = document.createElement('link');
    hreflangFr.setAttribute('rel', 'alternate');
    hreflangFr.setAttribute('hreflang', 'fr');
    hreflangFr.setAttribute('href', 'https://speedtestboost.com/fr');
    document.head.appendChild(hreflangFr);

    const hreflangDefault = document.createElement('link');
    hreflangDefault.setAttribute('rel', 'alternate');
    hreflangDefault.setAttribute('hreflang', 'x-default');
    hreflangDefault.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangDefault);
    
    // Structured Data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Speed Test & Boost",
      "description": "Free internet speed test tool with global coverage. Test WiFi and broadband speeds instantly with accurate results for all ISPs.",
      "url": "https://speedtestboost.com/",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "Speed Test & Boost",
        "url": "https://speedtestboost.com/"
      },
      "featureList": [
        "Download speed test",
        "Upload speed test", 
        "Ping test",
        "WiFi optimization",
        "Global server coverage",
        "All ISP support"
      ]
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/" />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Free Internet Speed Test
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Test your WiFi and broadband connection speed instantly. Check download, upload speeds and ping latency with our accurate online speed test tool.
          </p>
        </div>

        {/* OpenSpeedTest Embed */}
        <Card className="mb-8">
          <CardContent className="p-0 overflow-hidden">
            <div style={{ minHeight: '600px', width: '100%' }}>
              <iframe 
                src="https://openspeedtest.com/" 
                style={{
                  border: 'none',
                  width: '100%',
                  height: '700px',
                  minHeight: '600px'
                }}
                title="Internet Speed Test"
                data-testid="speed-test-iframe"
              />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* SEO-Optimized Footer Content */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Educational Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">About Internet Speed Tests</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  An internet speed test measures your connection's download speed, upload speed, and ping latency. 
                  Our free bandwidth test tool provides accurate results for WiFi, broadband, fiber, and mobile connections 
                  including 4G and 5G networks. Test your speed in major cities like <Link href="/delhi-speed-test" className="text-primary hover:underline">Delhi</Link>, <Link href="/mumbai-speed-test" className="text-primary hover:underline">Mumbai</Link>, and <Link href="/bangalore-speed-test" className="text-primary hover:underline">Bangalore</Link>. 
                  Compare your results with <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast.com</a> or <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Speedtest.net</a>.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Understanding Your Results</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">Download Speed:</strong> How fast you receive data</div>
                  <div><strong className="text-foreground">Upload Speed:</strong> How fast you send data</div>
                  <div><strong className="text-foreground">Ping:</strong> Response time in milliseconds</div>
                  <div><strong className="text-foreground">Jitter:</strong> Variation in ping times</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Speed Requirements by City</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><strong className="text-foreground">HD Streaming:</strong> 5-10 Mbps</div>
                  <div><strong className="text-foreground">4K Streaming:</strong> 25+ Mbps</div>
                  <div><strong className="text-foreground">Gaming:</strong> 3-6 Mbps + low ping</div>
                  <div><strong className="text-foreground">Video Calls:</strong> 1-4 Mbps</div>
                  <div className="pt-2 border-t border-border/30">
                    <div className="text-xs">Test across India's major tech hubs: <Link href="/chennai-speed-test" className="text-primary hover:underline">Chennai</Link>, <Link href="/hyderabad-speed-test" className="text-primary hover:underline">Hyderabad</Link>, <Link href="/kolkata-speed-test" className="text-primary hover:underline">Kolkata</Link></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


          {/* International Country Speed Tests Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">International Speed Tests</h2>
            <p className="text-center text-muted-foreground mb-8">
              Test your internet speed with servers optimized for your country's network infrastructure
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/us-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇺🇸 USA Speed Test</div>
                <div className="text-xs text-muted-foreground">Verizon, AT&T, Comcast</div>
              </Link>
              <Link href="/uk-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇬🇧 UK Speed Test</div>
                <div className="text-xs text-muted-foreground">BT, Sky, Virgin Media</div>
              </Link>
              <Link href="/au-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇦🇺 Australia Speed Test</div>
                <div className="text-xs text-muted-foreground">NBN, Telstra, Optus</div>
              </Link>
              <Link href="/ca-speed-test" className="group block p-4 bg-background/50 hover:bg-primary/10 rounded-lg border border-border/50 hover:border-primary/20 transition-all duration-200">
                <div className="text-sm font-medium text-foreground group-hover:text-primary">🇨🇦 Canada Speed Test</div>
                <div className="text-xs text-muted-foreground">Rogers, Bell, Telus</div>
              </Link>
            </div>
          </div>

          {/* Speed Guide Articles Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Expert Speed Guides & Optimization</h2>
            <p className="text-center text-muted-foreground mb-8">
              Comprehensive guides to understand, test, and optimize your internet connection for maximum performance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover group h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 text-2xl">
                      ⬇️
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Download Speed Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    Complete guide to understanding download speeds, requirements for different activities, and optimization techniques for streaming, gaming, and browsing.
                  </p>
                  <Link 
                    href="/download-speed-guide" 
                    data-testid="card-download-speed-guide"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm mt-auto"
                  >
                    Read Complete Guide →
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-hover group h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 text-2xl">
                      ⬆️
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Upload Speed Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    Essential upload speed knowledge for video calls, file sharing, streaming, and remote work. Learn requirements and improvement strategies.
                  </p>
                  <Link 
                    href="/upload-speed-guide" 
                    data-testid="card-upload-speed-guide"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm mt-auto"
                  >
                    Read Complete Guide →
                  </Link>
                </CardContent>
              </Card>

              <Card className="card-hover group h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4 text-2xl">
                      📶
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">WiFi Optimization Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    Advanced WiFi optimization techniques, troubleshooting tips, and our interactive WiFi optimization tool to maximize your wireless performance.
                  </p>
                  <Link 
                    href="/wifi-speed-optimization" 
                    data-testid="card-wifi-optimization-guide"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm mt-auto"
                  >
                    Read Complete Guide →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Professional WiFi Analyzer & Network Tools Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Professional WiFi Analyzer & Network Tools</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
              Advanced network diagnostics and WiFi optimization suite designed for IT professionals, network administrators, and power users who demand comprehensive network analysis
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main WiFi Analyzer Card */}
              <div className="lg:col-span-2">
                <Card className="card-hover group h-full bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-20 h-20 bg-primary/15 rounded-2xl flex items-center justify-center mr-6 text-4xl">
                        📡
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">WiFi Analyzer & Network Diagnostics</h3>
                        <p className="text-primary font-medium">Professional Network Analysis Tool</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Comprehensive WiFi network analysis with real-time signal monitoring, channel optimization, 
                      interference detection, and advanced network diagnostics. Perfect for troubleshooting 
                      connectivity issues and optimizing network performance.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          📊
                        </div>
                        <span className="text-sm font-medium text-foreground">Real-time Signal Analysis</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          ⚙️
                        </div>
                        <span className="text-sm font-medium text-foreground">Channel Optimization</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          🔍
                        </div>
                        <span className="text-sm font-medium text-foreground">Interference Detection</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">
                          🩺
                        </div>
                        <span className="text-sm font-medium text-foreground">Network Diagnostics</span>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <Link 
                        href="/wifi-analyzer" 
                        data-testid="card-wifi-analyzer"
                        className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
                      >
                        Launch WiFi Analyzer
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Features */}
              <div className="space-y-6">
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-2xl">
                      ⚡
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Speed Optimization</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automated WiFi optimization with intelligent QoS configuration and bandwidth management for maximum performance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-2xl">
                      📋
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Professional Reports</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Generate comprehensive network analysis reports with detailed insights and recommendations for IT documentation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Speed Test Types Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Types of Internet Speed Tests</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Run different speed tests based on your connection type. Our free speed test online supports WiFi speed test, fiber speed test, net speed test, and broadband speed checker.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">WiFi Speed Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Check WiFi speed test, test wifi speed, and wifi signal strength test. Run wifi speed checker to test my wifi speed and optimize wireless performance.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Fiber Speed Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    My fiber speed test for Jio Fiber, Airtel Xstream, ACT Fibernet. Run fiber speed test to check internet speed and broadband performance.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Data Speed Test</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Data speed test online, net speed test, and bandwidth test. Test internet speed, check my internet speed, and run speed test for accurate results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">How to run speed test online?</h4>
                  <p className="text-sm text-muted-foreground">
                    Simply click "Start Test" to run speed test. Our free internet speed test checks download, upload, ping, and jitter in seconds. Works on all devices.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What affects my internet speed?</h4>
                  <p className="text-sm text-muted-foreground">
                    Network congestion, WiFi interference, device limitations, background downloads, and distance 
                    from your router can all impact your connection speed.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Is this speed test free?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! Free internet speed test, free wifi speed test online, no signup required. Check internet speed test free, wifi test free anytime.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">How can I improve my internet speed?</h4>
                  <p className="text-sm text-muted-foreground">
                    Upgrade your plan, use wired connections, update your router, reduce network interference, 
                    and close unnecessary applications consuming bandwidth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-border/30">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Major City Tests</h4>
              <div className="space-y-2 text-sm">
                <Link href="/delhi-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Delhi Speed Test
                </Link>
                <Link href="/mumbai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Mumbai Speed Test
                </Link>
                <Link href="/bangalore-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Bangalore Speed Test
                </Link>
                <Link href="/chennai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Chennai Speed Test
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Regional Cities</h4>
              <div className="space-y-2 text-sm">
                <Link href="/hyderabad-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Hyderabad Speed Test
                </Link>
                <Link href="/kolkata-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  Kolkata Speed Test
                </Link>
                <div className="text-muted-foreground">WiFi Speed Test</div>
                <div className="text-muted-foreground">Fiber Speed Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">External Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speedtest by Ookla
                </a>
                <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Fast.com by Netflix
                </a>
                <a href="https://www.google.com/search?q=internet+speed+test" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Google Speed Test
                </a>
                <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  FCC Broadband Guide
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">About & Help</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
                </Link>
                <Link href="/ping-test" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-ping-test">
                  Ping Test Tool
                </Link>
                <a href="https://en.wikipedia.org/wiki/Internet_speed_test" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speed Test Info
                </a>
                <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  FCC Speed Guide
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 Speed Test and Boost. Free internet speed test tool for accurate bandwidth measurement. 
              Test your connection speed on any device. Compare with <a href="https://fast.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fast.com</a> and <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Speedtest.net</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
