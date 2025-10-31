import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Wifi, 
  Monitor, 
  Smartphone, 
  Activity, 
  Signal, 
  Zap, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Router,
  Scan,
  Radio,
  Search,
  TrendingUp,
  BarChart3
} from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import Header from "@/components/Header";
import { Link } from "wouter";
import GenericFooter from "@/components/GenericFooter";
import { trackEvent, trackEngagement } from "@/lib/analytics";
import Breadcrumbs from "@/components/Breadcrumbs";

interface NetworkInfo {
  ssid: string;
  signalStrength: number;
  channel: number;
  frequency: string;
  security: string;
  bandwidth: string;
  status: "excellent" | "good" | "fair" | "poor";
}

interface DiagnosticResult {
  test: string;
  status: "pass" | "warning" | "fail";
  value: string;
  recommendation?: string;
}

export default function WiFiAnalyzer() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [networks, setNetworks] = useState<NetworkInfo[]>([]);
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  // SEO Meta Tags for WiFi Analyzer page
  useEffect(() => {
    document.title = "WiFi Speed Test - Free WiFi Analyzer & Signal Strength Test Online";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free WiFi speed test and analyzer. Check wifi signal strength test, wifi checker, wifi speed tester, and wifi test speed online. Run wifi network speed test, wifi strength test, and optimize your wireless connection now!');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'wifi speed test, wifi test, wifi checker, wifi speed checker, test wifi speed, wifi signal strength test, wifi tester speed free, wifi strength test, my wifi speed, wifi test speed, free wifi speed test, wifi speed test online, wifi analyzer, wifi speed test free, test wifi, wifi test free, wifi network speed test, wifi signal speed checker';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'WiFi Analyzer & Network Diagnostics Tool - Free Network Scanner 2025' },
      { property: 'og:description', content: 'Professional WiFi analyzer and network diagnostics tool. Scan WiFi networks, analyze signal strength, diagnose network issues, and optimize wireless performance.' },
      { property: 'og:url', content: 'https://speedtestboost.com/wifi-analyzer' },
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
      { name: 'twitter:title', content: 'WiFi Analyzer & Network Diagnostics Tool - Free Network Scanner 2025' },
      { name: 'twitter:description', content: 'Professional WiFi analyzer and network diagnostics tool. Scan WiFi networks, analyze signal strength, and optimize wireless performance.' }
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.name = tag.name;
        document.head.appendChild(twitterTag);
      }
      twitterTag.content = tag.content;
    });
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/wifi-analyzer';
    
    // Structured Data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "WiFi Analyzer & Network Diagnostics Tool",
      "description": "Professional WiFi analyzer and network diagnostics tool for scanning WiFi networks, analyzing signal strength, and optimizing wireless performance.",
      "url": "https://speedtestboost.com/wifi-analyzer",
      "applicationCategory": "NetworkingApplication",
      "operatingSystem": "Web Browser, Windows, Mac, Android, iOS",
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
        "WiFi network scanning",
        "Signal strength analysis",
        "Channel congestion detection",
        "Network diagnostics",
        "Interference analysis",
        "Security protocol checking",
        "Real-time monitoring",
        "Performance optimization"
      ],
      "keywords": "wifi analyzer, network diagnostics, wifi scanner, wireless analyzer, network scanner, wifi troubleshooting"
    });
  }, []);

  // Mock network data for demonstration
  const mockNetworks: NetworkInfo[] = [
    {
      ssid: "MyHomeWiFi",
      signalStrength: 85,
      channel: 6,
      frequency: "2.4 GHz",
      security: "WPA3",
      bandwidth: "80 MHz",
      status: "excellent"
    },
    {
      ssid: "Neighbor_5G",
      signalStrength: 60,
      channel: 36,
      frequency: "5 GHz",
      security: "WPA2",
      bandwidth: "160 MHz",
      status: "good"
    },
    {
      ssid: "Office_Network",
      signalStrength: 45,
      channel: 11,
      frequency: "2.4 GHz",
      security: "WPA2",
      bandwidth: "40 MHz",
      status: "fair"
    }
  ];

  const mockDiagnostics: DiagnosticResult[] = [
    {
      test: "Signal Strength",
      status: "pass",
      value: "85 dBm",
      recommendation: "Excellent signal strength"
    },
    {
      test: "Channel Congestion",
      status: "warning",
      value: "Moderate",
      recommendation: "Consider switching to channel 1 or 11"
    },
    {
      test: "DNS Response",
      status: "pass",
      value: "12ms",
      recommendation: "DNS resolution is optimal"
    },
    {
      test: "Interference",
      status: "warning",
      value: "2.4GHz crowded",
      recommendation: "Switch to 5GHz for better performance"
    },
    {
      test: "Security Protocol",
      status: "pass",
      value: "WPA3",
      recommendation: "Using latest security standard"
    }
  ];

  const startScan = async () => {
    // Track WiFi analyzer scan start
    trackEvent('wifi_scan_started', 'wifi_analyzer', 'network_scan');
    trackEngagement('wifi_analyzer_used', { action: 'scan_networks', page: '/wifi-analyzer' });

    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setScanProgress(i);
    }
    
    setNetworks(mockNetworks);
    setDiagnostics(mockDiagnostics);
    setIsScanning(false);

    // Track successful scan completion
    trackEvent('wifi_scan_completed', 'wifi_analyzer', 'scan_success', mockNetworks.length);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": case "pass": return "text-green-600";
      case "good": case "warning": return "text-yellow-600";
      case "fair": case "fail": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": case "pass": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "good": case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "fair": case "fail": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPath="/wifi-analyzer" />
      
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* SEO Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            WiFi Analyzer & Network Diagnostics Tool
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Discover hidden network issues affecting your WiFi performance. Our advanced wireless scanner identifies interference, 
            channel conflicts, and security vulnerabilities that slow down your connection.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="secondary" className="bg-purple-800 text-white">WiFi Analyzer</Badge>
            <Badge variant="secondary" className="bg-blue-800 text-white">Network Scanner</Badge>
            <Badge variant="secondary" className="bg-indigo-800 text-white">Signal Analyzer</Badge>
            <Badge variant="secondary" className="bg-pink-800 text-white">Network Diagnostics</Badge>
          </div>
        </div>

        {/* Main Analysis Tool */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Wifi className="w-6 h-6" />
                WiFi Network Scanner
              </CardTitle>
              <CardDescription className="text-gray-300">
                Scan and analyze all available WiFi networks in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <Button 
                  onClick={startScan}
                  disabled={isScanning}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  {isScanning ? "Scanning Networks..." : "Start WiFi Analysis"}
                </Button>
              </div>

              {isScanning && (
                <div className="mb-6">
                  <div className="text-center text-white mb-2">
                    Scanning for networks... {scanProgress}%
                  </div>
                  <Progress value={scanProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Tabs */}
          {networks.length > 0 && (
            <Tabs defaultValue="networks" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
                <TabsTrigger value="networks" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  <Wifi className="w-4 h-4 mr-2" />
                  WiFi Networks
                </TabsTrigger>
                <TabsTrigger value="diagnostics" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  <Activity className="w-4 h-4 mr-2" />
                  Network Diagnostics
                </TabsTrigger>
                <TabsTrigger value="tools" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analysis Tools
                </TabsTrigger>
              </TabsList>

              <TabsContent value="networks" className="mt-6">
                <div className="grid gap-4">
                  {networks.map((network, index) => (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Router className="w-6 h-6 text-blue-400" />
                            <div>
                              <h3 className="text-lg font-semibold text-white">{network.ssid}</h3>
                              <p className="text-gray-300">{network.frequency} • Channel {network.channel}</p>
                            </div>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`${getStatusColor(network.status)} bg-white/20`}
                          >
                            {network.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Signal Strength</p>
                            <div className="flex items-center gap-2">
                              <Signal className="w-4 h-4 text-green-400" />
                              <span className="text-white font-medium">{network.signalStrength} dBm</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Security</p>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-blue-400" />
                              <span className="text-white font-medium">{network.security}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Bandwidth</p>
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <span className="text-white font-medium">{network.bandwidth}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Channel</p>
                            <div className="flex items-center gap-2">
                              <Radio className="w-4 h-4 text-purple-400" />
                              <span className="text-white font-medium">{network.channel}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="diagnostics" className="mt-6">
                <div className="grid gap-4">
                  {diagnostics.map((diagnostic, index) => (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(diagnostic.status)}
                            <div>
                              <h3 className="text-lg font-semibold text-white">{diagnostic.test}</h3>
                              <p className="text-gray-300">{diagnostic.value}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant="secondary" 
                              className={`${getStatusColor(diagnostic.status)} bg-white/20 mb-2`}
                            >
                              {diagnostic.status.toUpperCase()}
                            </Badge>
                            {diagnostic.recommendation && (
                              <p className="text-sm text-gray-300 max-w-xs">
                                {diagnostic.recommendation}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Alert className="mt-6 bg-blue-900/50 border-blue-600">
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle className="text-white">Performance Recommendation</AlertTitle>
                  <AlertDescription className="text-gray-300">
                    Your network shows moderate congestion on 2.4GHz. Consider switching to 5GHz or WiFi 6 for optimal performance.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Internet Speed Test
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Test your internet connection speed and performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => {
                          trackEvent('speed_test_modal_opened', 'wifi_analyzer', 'speed_test_button');
                          setShowSpeedTest(true);
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Run Speed Test
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Advanced Analysis
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Deep packet inspection and network monitoring
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Packet Loss</span>
                          <span className="text-white">0.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Jitter</span>
                          <span className="text-white">1.2ms</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">MTU Size</span>
                          <span className="text-white">1500 bytes</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto mt-16 space-y-8">
          <Separator className="bg-white/20" />
          
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Complete WiFi Analyzer & Network Diagnostics Guide</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-blue-400" />
                  WiFi Analyzer Features
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Instant wireless network scanning across all channels</li>
                  <li>• Real-time signal strength monitoring with visual heatmaps</li>
                  <li>• Smart channel optimization recommendations</li>
                  <li>• Complete security audit (WPA3, WPA2, open networks)</li>
                  <li>• Multi-band analysis for 2.4GHz, 5GHz, and WiFi 6E</li>
                  <li>• Detailed network performance reports</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Network Diagnostics Tools
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Comprehensive network health monitoring</li>
                  <li>• DNS resolution testing and optimization</li>
                  <li>• Packet loss and jitter analysis</li>
                  <li>• Interference detection and mitigation</li>
                  <li>• Bandwidth utilization monitoring</li>
                  <li>• Connection stability assessment</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-white">
            <h3 className="text-2xl font-bold mb-6">Why Use Our WiFi Analyzer?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 text-center">
                  <Monitor className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Cross-Platform</h4>
                  <p className="text-gray-300 text-sm">Works on Windows, Mac, Android, and iOS devices</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Real-Time Analysis</h4>
                  <p className="text-gray-300 text-sm">Live network monitoring and instant diagnostics</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Secure & Private</h4>
                  <p className="text-gray-300 text-sm">No data collection, all analysis done locally</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-white">
            <h3 className="text-2xl font-bold mb-6">Real-World WiFi Analyzer Applications</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Router className="w-5 h-5 text-blue-400" />
                  Home Network Optimization
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your neighbor's router on channel 6 is crushing your WiFi speeds. Use our wireless scanner to find the least crowded channel, 
                  then switch your router settings. In apartments with 20+ networks, this simple fix often doubles download speeds.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  Security Vulnerability Detection
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Spot unprotected networks broadcasting your personal data. Our network diagnostics reveal WEP encryption (easily hacked), 
                  open guest networks without isolation, and suspicious access points that could be security risks.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Office WiFi Planning
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Before deploying enterprise WiFi, map existing interference. Our analyzer shows which channels are saturated by neighboring 
                  businesses, microwave ovens, and Bluetooth devices. Plan your access point placement to avoid dead zones.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-400" />
                  Troubleshooting Connection Issues
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  When WiFi suddenly slows down, run network diagnostics to identify the cause. Check if signal strength dropped, 
                  DNS servers are responding slowly, or interference increased. Get specific solutions instead of just "restart your router."
                </p>
              </div>
            </div>
          </div>

          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold mb-2">What is a WiFi analyzer and why do I need one?</h4>
                <p className="text-gray-300">Think of a WiFi analyzer as a detective for your wireless network. It scans all nearby networks, measures signal strength, and spots problems like overcrowded channels or weak security. Most people don't realize their slow WiFi isn't due to their internet plan—it's often interference from neighbors or poor channel selection.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold mb-2">How can network diagnostics actually boost my speed?</h4>
                <p className="text-gray-300">Network diagnostics reveal the real culprits behind slow connections. Maybe your router picked channel 6, but so did five neighbors. Or your DNS server takes forever to respond. By running diagnostics, you'll discover specific fixes—like switching to channel 1 or changing DNS servers—that can double your speeds.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold mb-2">Should I use 2.4GHz or 5GHz for better performance?</h4>
                <p className="text-gray-300">Here's the truth: 2.4GHz travels further but moves slower, like a diesel truck. 5GHz is like a sports car—fast but shorter range. If you're far from your router, 2.4GHz wins. Close to your router? 5GHz dominates. Our wireless scanner shows both bands so you can test which performs better in your specific location.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO-Optimized Footer Content */}
      <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">WiFi Analyzer Tools & Features</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our comprehensive WiFi analyzer provides professional-grade network diagnostics for home and business users. 
                  Scan wireless networks, detect signal interference, analyze channel congestion, and identify security vulnerabilities. 
                  Compatible with Windows, Mac, Android, and iOS devices for complete network visibility and optimization.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Network Diagnostics Guide</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Learn how network diagnostics can improve your internet speed and reliability. Our wireless scanner identifies 
                  common issues like DNS problems, packet loss, channel conflicts, and interference from neighboring networks. 
                  Get actionable recommendations to optimize your WiFi performance and troubleshoot connection problems.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Related Network Tools</h3>
                <div className="space-y-2">
                  <Link href="/" className="block text-primary hover:underline text-sm">
                    Internet Speed Test
                  </Link>
                  <Link href="/internet-speed-requirements" className="block text-primary hover:underline text-sm">
                    Speed Requirements Guide
                  </Link>
                  <Link href="/help" className="block text-primary hover:underline text-sm">
                    Network Troubleshooting Help
                  </Link>
                  <Link href="/about" className="block text-primary hover:underline text-sm">
                    About Our Network Tools
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Speed Test & Boost. Free WiFi analyzer and network diagnostics tools for optimal internet performance.
            </p>
          </div>
        </div>
      </footer>

      {/* Speed Test Modal */}
      {showSpeedTest && (
        <SpeedTestModal 
          onClose={() => setShowSpeedTest(false)} 
        />
      )}

      <GenericFooter />
      </div>
    </div>
  );
}