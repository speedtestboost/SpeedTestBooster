import { useEffect, useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Wifi, Settings, Shield, Gauge, Router, Smartphone, CheckCircle, AlertCircle } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import Breadcrumbs from "@/components/Breadcrumbs";

interface OptimizationStep {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'pending' | 'running' | 'completed' | 'error';
}

export default function WiFiSpeedOptimization() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationSteps, setOptimizationSteps] = useState<OptimizationStep[]>([
    {
      id: 'scan',
      title: 'Network Environment Scan',
      description: 'Analyzing WiFi channels and detecting interference sources',
      progress: 0,
      status: 'pending'
    },
    {
      id: 'bandwidth',
      title: 'Bandwidth Optimization',
      description: 'Optimizing channel selection and frequency bands',
      progress: 0,
      status: 'pending'
    },
    {
      id: 'cache',
      title: 'Network Cache Clearing',
      description: 'Clearing DNS cache and network configurations',
      progress: 0,
      status: 'pending'
    },
    {
      id: 'qos',
      title: 'Quality of Service Tuning',
      description: 'Prioritizing traffic and reducing latency',
      progress: 0,
      status: 'pending'
    },
    {
      id: 'security',
      title: 'Security Optimization',
      description: 'Updating security protocols and removing unauthorized devices',
      progress: 0,
      status: 'pending'
    }
  ]);

  useEffect(() => {
    document.title = "WiFi Speed Optimization Guide: Boost Your Internet 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete WiFi speed optimization guide. Learn how to boost your wireless internet speed with our optimization tool, expert tips, and troubleshooting solutions.');
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/wifi-speed-optimization';

    // Open Graph and Twitter meta tags
    const createOrUpdateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    const createOrUpdateTwitterMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    createOrUpdateMetaTag('og:title', 'WiFi Speed Optimization Guide: Boost Your Internet 2025');
    createOrUpdateMetaTag('og:description', 'Complete WiFi speed optimization guide. Learn how to boost your wireless internet speed with our optimization tool, expert tips, and troubleshooting solutions.');
    createOrUpdateMetaTag('og:type', 'article');
    createOrUpdateMetaTag('og:url', 'https://speedtestboost.com/wifi-speed-optimization');
    createOrUpdateMetaTag('og:image', 'https://speedtestboost.com/logo-option-5.svg');
    createOrUpdateTwitterMetaTag('twitter:card', 'summary_large_image');
    createOrUpdateTwitterMetaTag('twitter:title', 'WiFi Speed Optimization Guide: Boost Your Internet 2025');
    createOrUpdateTwitterMetaTag('twitter:description', 'Complete WiFi speed optimization guide. Learn how to boost your wireless internet speed with our optimization tool, expert tips, and troubleshooting solutions.');
    createOrUpdateTwitterMetaTag('twitter:image', 'https://speedtestboost.com/logo-option-5.svg');

    // Structured data for article
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://speedtestboost.com/wifi-speed-optimization#article",
          "headline": "WiFi Speed Optimization Guide: Boost Your Internet 2025",
          "description": "Complete WiFi speed optimization guide. Learn how to boost your wireless internet speed with our optimization tool, expert tips, and troubleshooting solutions.",
          "author": {
            "@type": "Organization",
            "name": "Speed Test & Boost"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Speed Test & Boost",
            "logo": {
              "@type": "ImageObject",
              "url": "https://speedtestboost.com/logo-option-5.svg"
            }
          },
          "datePublished": "2025-01-17",
          "dateModified": "2025-01-17",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://speedtestboost.com/wifi-speed-optimization"
          },
          "articleSection": "Technology",
          "keywords": ["wifi speed", "internet optimization", "wireless network", "router optimization", "network troubleshooting"]
        },
        {
          "@type": "HowTo",
          "@id": "https://speedtestboost.com/wifi-speed-optimization#howto",
          "name": "How to Optimize WiFi Speed",
          "description": "Step-by-step guide to optimize your WiFi speed using our optimization tool and expert techniques.",
          "totalTime": "PT15M",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "WiFi Router"
            },
            {
              "@type": "HowToSupply", 
              "name": "Connected Device"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "Speed Test & Boost WiFi Optimizer"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Run Initial Speed Test",
              "text": "Test your current WiFi speed to establish baseline performance"
            },
            {
              "@type": "HowToStep", 
              "name": "Use WiFi Optimization Tool",
              "text": "Run our automated optimization tool to scan and optimize your network"
            },
            {
              "@type": "HowToStep",
              "name": "Implement Manual Optimizations", 
              "text": "Apply additional manual optimizations based on your specific setup"
            },
            {
              "@type": "HowToStep",
              "name": "Verify Improvements",
              "text": "Run another speed test to confirm performance improvements"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://speedtestboost.com/wifi-speed-optimization#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can I boost my WiFi speed instantly?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use our WiFi optimization tool above, restart your router, switch to 5GHz band, move closer to the router, and close bandwidth-heavy applications."
              }
            },
            {
              "@type": "Question",
              "name": "What is the best channel for WiFi?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For 2.4GHz: channels 1, 6, or 11 (non-overlapping). For 5GHz: channels 36, 40, 44, 48 are usually less congested. Use our tool to find the optimal channel for your area."
              }
            },
            {
              "@type": "Question",
              "name": "Why is my WiFi slower than ethernet?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "WiFi is affected by interference, distance, obstacles, and shared airspace. Ethernet provides dedicated, stable connections. The difference indicates WiFi optimization opportunities."
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'wifi-optimization-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#wifi-optimization-structured-data');
      if (existingScript) existingScript.remove();
      
      // Clean up meta tags
      const tagsToRemove = [
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:type"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]'
      ];
      
      tagsToRemove.forEach(selector => {
        const tag = document.querySelector(selector);
        if (tag) tag.remove();
      });
    };
  }, []);

  const runOptimization = async () => {
    setIsOptimizing(true);
    
    for (let i = 0; i < optimizationSteps.length; i++) {
      // Update current step to running
      setOptimizationSteps(prev => prev.map((step, index) => 
        index === i 
          ? { ...step, status: 'running' as const }
          : step
      ));

      // Simulate optimization process
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setOptimizationSteps(prev => prev.map((step, index) => 
          index === i 
            ? { ...step, progress }
            : step
        ));
      }

      // Mark step as completed
      setOptimizationSteps(prev => prev.map((step, index) => 
        index === i 
          ? { ...step, status: 'completed' as const, progress: 100 }
          : step
      ));
    }

    setIsOptimizing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/wifi-speed-optimization" />
      
      
      
      <main className="pt-24 pb-12">
        <Breadcrumbs 
          items={[
            { label: "Tools", href: "/" },
            { label: "Wifi Speed Optimization", href: "/wifi-speed-optimization" }
          ]} 
        />

        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full">
                <Wifi className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
              WiFi Speed Optimization
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Boost your wireless internet speed with our advanced optimization tool and expert techniques. 
              Fix slow WiFi, eliminate interference, and maximize your network performance instantly.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 transition-opacity mr-4"
                data-testid="button-test-wifi-speed"
              >
                <Gauge className="mr-2 h-5 w-5" />
                Test WiFi Speed First
              </Button>
            </div>
          </div>

          {/* WiFi Optimization Tool */}
          <Card className="mb-8" data-testid="card-wifi-optimizer">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-4">Automated WiFi Speed Optimizer</h2>
                <p className="text-muted-foreground mb-6">
                  Our intelligent optimization tool analyzes your network environment and automatically applies 
                  the best settings to maximize your WiFi performance.
                </p>
                
                {!isOptimizing && optimizationSteps.every(step => step.status === 'pending') && (
                  <Button 
                    onClick={runOptimization}
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3"
                    data-testid="button-start-optimization"
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Start WiFi Optimization
                  </Button>
                )}
              </div>

              {(isOptimizing || optimizationSteps.some(step => step.status !== 'pending')) && (
                <div className="space-y-4">
                  {optimizationSteps.map((step, index) => (
                    <div key={step.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {step.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {step.status === 'running' && <Settings className="h-5 w-5 text-blue-500 animate-spin" />}
                          {step.status === 'pending' && <div className="h-5 w-5 border-2 border-muted rounded-full" />}
                          {step.status === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                        <span className="text-sm text-muted-foreground">{step.progress}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <Progress value={step.progress} className="h-2" />
                    </div>
                  ))}
                  
                  {optimizationSteps.every(step => step.status === 'completed') && (
                    <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">WiFi Optimization Complete!</h3>
                      <p className="text-muted-foreground mb-4">
                        Your network has been optimized for maximum performance. Test your speed again to see the improvements.
                      </p>
                      <Button 
                        onClick={() => setShowSpeedTest(true)}
                        className="bg-green-500 hover:bg-green-600"
                        data-testid="button-test-after-optimization"
                      >
                        <Gauge className="mr-2 h-4 w-4" />
                        Test Optimized Speed
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manual Optimization Techniques */}
          <Card className="mb-8" data-testid="card-manual-optimization">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Manual WiFi Optimization Techniques</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Router Placement and Positioning</h3>
                  <p className="text-muted-foreground mb-3">
                    Router placement dramatically affects WiFi performance. Position your router centrally, elevated, 
                    and away from obstacles for optimal signal distribution throughout your space.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Place router in central, elevated location (shelf, wall mount)</li>
                    <li>• Keep away from walls, metal objects, and electronic devices</li>
                    <li>• Avoid closets, cabinets, and enclosed spaces</li>
                    <li>• Position antennas perpendicular to each other if adjustable</li>
                    <li>• Maintain 2-3 feet clearance from walls and obstacles</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Channel Selection and Frequency Bands</h3>
                  <p className="text-muted-foreground mb-3">
                    WiFi channels can become congested, especially in dense areas. Switching to less crowded channels 
                    and utilizing 5GHz bands can significantly improve performance.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-1">2.4GHz Band</h4>
                      <p className="text-xs text-muted-foreground">Longer range, better penetration</p>
                      <p className="text-sm">Recommended channels: 1, 6, 11</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-1">5GHz Band</h4>
                      <p className="text-xs text-muted-foreground">Faster speeds, less congestion</p>
                      <p className="text-sm">Recommended channels: 36, 40, 44, 48</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Quality of Service (QoS) Configuration</h3>
                  <p className="text-muted-foreground mb-3">
                    QoS settings prioritize important traffic like video calls and streaming over background downloads, 
                    ensuring consistent performance for critical applications.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Enable QoS in router settings</li>
                    <li>• Prioritize video conferencing and VoIP traffic</li>
                    <li>• Limit bandwidth for backup and update services</li>
                    <li>• Set device-specific bandwidth limits</li>
                    <li>• Schedule heavy downloads during off-peak hours</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-xl font-semibold mb-2">Network Security and Access Control</h3>
                  <p className="text-muted-foreground mb-3">
                    Unauthorized devices can consume bandwidth and compromise security. Proper security settings 
                    and access control ensure your network resources are used efficiently.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use WPA3 security (or WPA2 if WPA3 unavailable)</li>
                    <li>• Change default router login credentials</li>
                    <li>• Regularly audit connected devices</li>
                    <li>• Enable guest network for visitors</li>
                    <li>• Update router firmware regularly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common WiFi Issues and Solutions */}
          <Card className="mb-8" data-testid="card-wifi-troubleshooting">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Common WiFi Problems and Solutions</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Speed-Related Issues</h3>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        Slow WiFi Throughout Home
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Weak signal in distant rooms, consistent slow speeds
                      </p>
                      <p className="text-sm text-green-600">
                        <strong>Solution:</strong> Upgrade to mesh system, add WiFi extenders, or reposition router centrally
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                        Fast Ethernet, Slow WiFi
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Wired connections work well, wireless is significantly slower
                      </p>
                      <p className="text-sm text-green-600">
                        <strong>Solution:</strong> Optimize WiFi channels, upgrade router, check for interference
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                        Intermittent Speed Drops
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Speed varies dramatically throughout the day
                      </p>
                      <p className="text-sm text-green-600">
                        <strong>Solution:</strong> Check for network congestion, limit background apps, enable QoS
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Connection Issues</h3>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                        Frequent Disconnections
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Devices regularly lose WiFi connection and reconnect
                      </p>
                      <p className="text-sm text-green-600">
                        <strong>Solution:</strong> Update device drivers, check power saving settings, restart router
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                        Can't Connect to 5GHz
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Devices only see 2.4GHz network, not 5GHz
                      </p>
                      <p className="text-sm text-green-600">
                        <strong>Solution:</strong> Enable 5GHz in router settings, check device compatibility, separate band names
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                        Poor Video Call Quality
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Video calls lag, freeze, or have poor audio quality
                      </p>
                      <p className="text-sm text-green-600">
                        <strong>Solution:</strong> Prioritize video traffic in QoS, use 5GHz band, reduce background usage
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Optimization Tips */}
          <Card className="mb-8" data-testid="card-advanced-optimization">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Advanced WiFi Optimization Strategies</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Professional-Grade Optimizations</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <Router className="h-8 w-8 mb-2 text-primary" />
                      <h4 className="font-semibold mb-2">Hardware Upgrades</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Upgrade to WiFi 6 (802.11ax) router</li>
                        <li>• Install mesh networking system</li>
                        <li>• Add dedicated wireless access points</li>
                        <li>• Upgrade to gigabit ethernet backbone</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <Settings className="h-8 w-8 mb-2 text-primary" />
                      <h4 className="font-semibold mb-2">Advanced Configuration</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Enable band steering and load balancing</li>
                        <li>• Configure multiple SSIDs for different purposes</li>
                        <li>• Implement VLAN segmentation</li>
                        <li>• Set up enterprise-grade security protocols</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Monitoring and Maintenance</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold">Regular Performance Monitoring</h4>
                      <p className="text-muted-foreground text-sm">
                        Test your WiFi speed weekly at different times and locations to identify patterns and issues. 
                        Keep logs of performance changes to track optimization effectiveness.
                      </p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold">Proactive Maintenance Schedule</h4>
                      <p className="text-muted-foreground text-sm">
                        Restart your router monthly, update firmware quarterly, and review network usage patterns 
                        to optimize settings based on changing household needs and new devices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-semibold mb-2">🚀 Pro Tip: WiFi 6 Benefits</h4>
                  <p className="text-sm text-muted-foreground">
                    WiFi 6 routers offer 40% faster speeds, better performance with multiple devices, 
                    improved battery life for connected devices, and advanced security features. 
                    Consider upgrading if you have many smart home devices or work from home regularly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-8" data-testid="card-wifi-faq">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">WiFi Optimization FAQ</h2>
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">How can I boost my WiFi speed instantly?</h3>
                  <p className="text-muted-foreground">
                    Use our WiFi optimization tool above, restart your router, switch to the 5GHz band if available, 
                    move closer to your router, and close unnecessary applications that consume bandwidth. 
                    These steps can provide immediate improvements.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">What's the best WiFi channel to use?</h3>
                  <p className="text-muted-foreground">
                    For 2.4GHz: channels 1, 6, or 11 don't overlap and are usually best. For 5GHz: channels 36, 40, 44, 48 
                    are typically less congested. Our optimization tool automatically finds the best channel for your specific location.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">Why is my WiFi slower than my internet plan?</h3>
                  <p className="text-muted-foreground">
                    WiFi speed can be affected by interference, distance from router, obstacles, device limitations, 
                    and network congestion. Test with ethernet first to confirm your internet speed, then optimize WiFi accordingly.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">Should I use 2.4GHz or 5GHz WiFi?</h3>
                  <p className="text-muted-foreground">
                    Use 5GHz for faster speeds when close to the router and 2.4GHz for better range and penetration through walls. 
                    Modern routers can broadcast both simultaneously, allowing devices to choose the best option automatically.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">How often should I restart my router?</h3>
                  <p className="text-muted-foreground">
                    Restart your router monthly for optimal performance, or immediately when experiencing connectivity issues. 
                    Some routers have automatic restart scheduling features to maintain peak performance without manual intervention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card data-testid="card-wifi-related">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Related Speed Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/download-speed-guide" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Download Speed Explained</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about download speeds and how they affect your WiFi performance and internet experience.
                  </p>
                </Link>
                <Link href="/upload-speed-guide" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Upload Speed Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand upload speeds and their importance for video calls, file sharing, and remote work.
                  </p>
                </Link>
              </div>
              <div className="mt-6 text-center">
                <Link href="/wifi-analyzer" className="text-primary hover:underline mr-4">
                  Advanced WiFi Analyzer →
                </Link>
                <Link href="/internet-speed-requirements" className="text-primary hover:underline">
                  Complete Speed Requirements Guide →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}

      <GenericFooter />
    </div>
  );
}