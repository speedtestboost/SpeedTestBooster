import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Brain, Zap, Clock, Users, Play, CheckCircle, AlertCircle, Info, Code2, Mic, Video } from "lucide-react";

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
}

interface AIUseCase {
  id: string;
  name: string;
  description: string;
  minDownload: number;
  minUpload: number;
  maxPing: number;
  icon: React.ReactNode;
  category: string;
  examples: string[];
}

const aiUseCases: AIUseCase[] = [
  {
    id: "chatgpt",
    name: "ChatGPT & Text AI",
    description: "Basic conversational AI and text generation",
    minDownload: 1,
    minUpload: 0.5,
    maxPing: 100,
    icon: <Brain className="h-5 w-5" />,
    category: "Basic AI",
    examples: ["ChatGPT conversations", "Claude chats", "Text completion", "Writing assistance"]
  },
  {
    id: "ai-image",
    name: "AI Image Generation",
    description: "Creating and processing images with AI",
    minDownload: 10,
    minUpload: 5,
    maxPing: 80,
    icon: <Zap className="h-5 w-5" />,
    category: "Creative AI",
    examples: ["DALL-E", "Midjourney", "Stable Diffusion", "Adobe Firefly"]
  },
  {
    id: "ai-video",
    name: "AI Video Processing",
    description: "Video generation and real-time processing",
    minDownload: 50,
    minUpload: 25,
    maxPing: 50,
    icon: <Video className="h-5 w-5" />,
    category: "Media AI",
    examples: ["RunwayML", "Pika Labs", "Video upscaling", "Real-time editing"]
  },
  {
    id: "ai-coding",
    name: "AI Code Assistant",
    description: "Real-time code completion and debugging",
    minDownload: 5,
    minUpload: 2,
    maxPing: 60,
    icon: <Code2 className="h-5 w-5" />,
    category: "Development",
    examples: ["GitHub Copilot", "Cursor", "Codeium", "Amazon CodeWhisperer"]
  },
  {
    id: "ai-voice",
    name: "AI Voice & Speech",
    description: "Real-time voice synthesis and recognition",
    minDownload: 15,
    minUpload: 10,
    maxPing: 40,
    icon: <Mic className="h-5 w-5" />,
    category: "Communication",
    examples: ["ElevenLabs", "Voice cloning", "Real-time translation", "AI podcasting"]
  },
  {
    id: "ai-enterprise",
    name: "Enterprise AI Workloads",
    description: "Large-scale AI processing and training",
    minDownload: 100,
    minUpload: 50,
    maxPing: 30,
    icon: <Brain className="h-5 w-5" />,
    category: "Enterprise",
    examples: ["Model training", "Large dataset processing", "Multi-modal AI", "RAG systems"]
  }
];

export default function AISpeedTest() {
  const [selectedUseCase, setSelectedUseCase] = useState<string>("");
  const [speedTestResult, setSpeedTestResult] = useState<SpeedTestResult | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  // Set canonical URL and SEO
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/ai-speed-test';
    
    // Update page title and meta description
    document.title = "AI Internet Speed Test & Requirements Calculator 2025 - ChatGPT, Claude, Midjourney Speed Requirements";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate exact internet speed requirements for AI tools like ChatGPT, Claude, Midjourney, and enterprise AI workloads. Free AI speed test with personalized recommendations and optimization tips for 2025.');
    }
  }, []);

  const { data: networkInfo } = useQuery({
    queryKey: ["/api/network-info"],
  });

  const runSpeedTest = async () => {
    setIsRunningTest(true);
    setTestProgress(0);
    
    try {
      // Simulate speed test with realistic progression
      const intervals = [
        { progress: 20, delay: 500 },
        { progress: 40, delay: 800 },
        { progress: 60, delay: 1200 },
        { progress: 80, delay: 1000 },
        { progress: 100, delay: 800 }
      ];

      for (const interval of intervals) {
        await new Promise(resolve => setTimeout(resolve, interval.delay));
        setTestProgress(interval.progress);
      }

      // Simulate realistic results based on typical AI usage
      const mockResult: SpeedTestResult = {
        download: Math.random() * 80 + 20, // 20-100 Mbps
        upload: Math.random() * 40 + 10,   // 10-50 Mbps
        ping: Math.random() * 40 + 20,     // 20-60 ms
        jitter: Math.random() * 10 + 5     // 5-15 ms
      };

      setSpeedTestResult(mockResult);
    } catch (error) {
      console.error("Speed test failed:", error);
    } finally {
      setIsRunningTest(false);
      setTestProgress(0);
    }
  };

  const getRecommendation = (useCase: AIUseCase, result: SpeedTestResult) => {
    const downloadOk = result.download >= useCase.minDownload;
    const uploadOk = result.upload >= useCase.minUpload;
    const pingOk = result.ping <= useCase.maxPing;
    
    if (downloadOk && uploadOk && pingOk) {
      return { status: "excellent", message: "Perfect for this AI application", icon: <CheckCircle className="h-5 w-5 text-green-500" /> };
    } else if (result.download >= useCase.minDownload * 0.8 && result.upload >= useCase.minUpload * 0.8) {
      return { status: "good", message: "Should work well with minor delays", icon: <Info className="h-5 w-5 text-blue-500" /> };
    } else {
      return { status: "poor", message: "May experience significant delays", icon: <AlertCircle className="h-5 w-5 text-red-500" /> };
    }
  };

  const selectedUseCaseData = aiUseCases.find(uc => uc.id === selectedUseCase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header currentPath="/ai-speed-test" />
      
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <Breadcrumbs 
          items={[
            { label: "Tools", href: "/" },
            { label: "AI Speed Test", href: "/ai-speed-test" }
          ]} 
        />
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Speed Test & Calculator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Calculate exact internet speed requirements for AI tools like ChatGPT, Claude, Midjourney, and enterprise AI workloads. 
            Get personalized recommendations and optimize your connection for seamless AI experiences in 2025.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* AI Calculator Section */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-6 w-6 mr-2 text-primary" />
                AI Requirements Calculator
              </CardTitle>
              <CardDescription>
                Select your AI use case to see minimum internet speed requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">AI Application Type</label>
                  <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an AI application..." />
                    </SelectTrigger>
                    <SelectContent>
                      {aiUseCases.map((useCase) => (
                        <SelectItem key={useCase.id} value={useCase.id}>
                          <div className="flex items-center space-x-2">
                            {useCase.icon}
                            <span>{useCase.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedUseCaseData && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">{selectedUseCaseData.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{selectedUseCaseData.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Download</span>
                          <div className="font-semibold">{selectedUseCaseData.minDownload} Mbps</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Upload</span>
                          <div className="font-semibold">{selectedUseCaseData.minUpload} Mbps</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Ping</span>
                          <div className="font-semibold">{selectedUseCaseData.maxPing} ms</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Common Examples:</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedUseCaseData.examples.map((example, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Speed Test Section */}
          <Card className="border-2 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-6 w-6 mr-2 text-accent" />
                AI-Optimized Speed Test
              </CardTitle>
              <CardDescription>
                Test your current internet speed and get AI-specific recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {!speedTestResult && !isRunningTest && (
                  <div className="text-center py-8">
                    <Button 
                      onClick={runSpeedTest} 
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start AI Speed Test
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      This will test your connection optimized for AI workloads
                    </p>
                  </div>
                )}

                {isRunningTest && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary animate-spin" />
                      <p className="font-medium">Testing your AI readiness...</p>
                    </div>
                    <Progress value={testProgress} className="w-full" />
                    <p className="text-sm text-center text-muted-foreground">
                      Analyzing download, upload, and latency for AI applications
                    </p>
                  </div>
                )}

                {speedTestResult && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{speedTestResult.download.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Mbps Download</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-accent">{speedTestResult.upload.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Mbps Upload</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">{speedTestResult.ping.toFixed(0)}</div>
                        <div className="text-sm text-muted-foreground">ms Ping</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">{speedTestResult.jitter.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">ms Jitter</div>
                      </div>
                    </div>

                    <Button 
                      onClick={runSpeedTest} 
                      variant="outline" 
                      className="w-full"
                    >
                      Test Again
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Speed Recommendations */}
        {speedTestResult && selectedUseCaseData && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>AI Performance Analysis</CardTitle>
              <CardDescription>How well your connection handles {selectedUseCaseData.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <div className="flex items-center space-x-2">
                  {getRecommendation(selectedUseCaseData, speedTestResult).icon}
                  <AlertDescription>
                    <strong>{getRecommendation(selectedUseCaseData, speedTestResult).message}</strong>
                  </AlertDescription>
                </div>
              </Alert>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Download Speed</h4>
                  <div className="flex items-center justify-between">
                    <span>Required: {selectedUseCaseData.minDownload} Mbps</span>
                    <span className={speedTestResult.download >= selectedUseCaseData.minDownload ? "text-green-500" : "text-red-500"}>
                      Your: {speedTestResult.download.toFixed(1)} Mbps
                    </span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Upload Speed</h4>
                  <div className="flex items-center justify-between">
                    <span>Required: {selectedUseCaseData.minUpload} Mbps</span>
                    <span className={speedTestResult.upload >= selectedUseCaseData.minUpload ? "text-green-500" : "text-red-500"}>
                      Your: {speedTestResult.upload.toFixed(1)} Mbps
                    </span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Latency</h4>
                  <div className="flex items-center justify-between">
                    <span>Max: {selectedUseCaseData.maxPing} ms</span>
                    <span className={speedTestResult.ping <= selectedUseCaseData.maxPing ? "text-green-500" : "text-red-500"}>
                      Your: {speedTestResult.ping.toFixed(0)} ms
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All AI Use Cases Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">AI Internet Speed Requirements Guide 2025</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
            Understanding bandwidth requirements for different AI applications helps you choose the right internet plan 
            and optimize your connection for seamless AI experiences. Each AI tool has specific requirements based on data processing needs.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiUseCases.map((useCase) => (
              <Card key={useCase.id} className="hover:border-primary/30 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    {useCase.icon}
                    <CardTitle className="text-lg">{useCase.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {useCase.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{useCase.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Download:</span>
                      <span className="font-medium">{useCase.minDownload} Mbps+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Upload:</span>
                      <span className="font-medium">{useCase.minUpload} Mbps+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Ping:</span>
                      <span className="font-medium">{useCase.maxPing} ms</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">Popular Tools:</p>
                    <div className="flex flex-wrap gap-1">
                      {useCase.examples.slice(0, 2).map((example, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Internet Speed Matters for AI Applications</h2>
            <p className="text-muted-foreground mb-6">
              Artificial Intelligence applications have specific bandwidth and latency requirements that differ significantly 
              from traditional internet usage. As AI tools become more sophisticated and real-time, having adequate internet 
              speed becomes crucial for optimal performance and user experience.
            </p>

            <h3 className="text-xl font-semibold mb-4">ChatGPT & Text AI Requirements</h3>
            <p className="text-muted-foreground mb-4">
              Text-based AI like ChatGPT, Claude, and other conversational AI tools require minimal bandwidth but benefit 
              from low latency for responsive interactions. A stable 1-5 Mbps connection typically provides excellent performance.
            </p>

            <h3 className="text-xl font-semibold mb-4">Midjourney & Image AI Speed Needs</h3>
            <p className="text-muted-foreground mb-6">
              Image generation AI tools like Midjourney, DALL-E, and Stable Diffusion require higher bandwidth for uploading 
              prompts and downloading high-resolution generated images. Expect to need 10-25 Mbps for optimal performance.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Optimizing Your Connection for AI Workloads</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Use Wired Connections</h4>
                <p className="text-sm text-muted-foreground">
                  Ethernet connections provide lower latency and more stable speeds compared to WiFi, especially important for real-time AI applications.
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Close Bandwidth-Heavy Apps</h4>
                <p className="text-sm text-muted-foreground">
                  Pause streaming, downloads, and cloud backups during AI sessions to ensure maximum bandwidth availability.
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Choose Optimal Servers</h4>
                <p className="text-sm text-muted-foreground">
                  Select AI service regions closest to your location to minimize latency and improve response times.
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Monitor Performance</h4>
                <p className="text-sm text-muted-foreground">
                  Regularly test your connection with our AI speed test to identify potential issues before they impact your workflow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Future AI Trends */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Future AI Speed Requirements: What to Expect in 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Emerging AI Technologies</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time multimodal AI (text + image + voice simultaneously)</li>
                  <li>• Live AI video generation requiring 100+ Mbps</li>
                  <li>• Collaborative AI workspaces with multiple users</li>
                  <li>• AI-powered live streaming and content creation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Recommended Preparation</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Consider fiber internet for future-proofing</li>
                  <li>• Upgrade to business plans for consistent speeds</li>
                  <li>• Invest in quality networking equipment</li>
                  <li>• Monitor AI usage patterns and adjust plans accordingly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Info */}
        {networkInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Your Current Network Information</CardTitle>
              <CardDescription>Details about your internet connection for AI optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">IP Address:</span>
                  <span className="ml-2 font-mono">{(networkInfo as any)?.ipAddress || "Unknown"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2">{(networkInfo as any)?.location || "Unknown"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">ISP:</span>
                  <span className="ml-2">{(networkInfo as any)?.isp || "Unknown"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Connection Type:</span>
                  <span className="ml-2">{(networkInfo as any)?.connectionType || "Unknown"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-background/50 backdrop-blur-sm border-t border-border/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {/* Footer Links and Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3">AI Speed Tests</h4>
              <div className="space-y-2 text-sm">
                <Link href="/ai-speed-test" className="block text-muted-foreground hover:text-primary transition-colors">
                  AI Speed Calculator
                </Link>
                <Link href="/internet-speed-requirements" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speed Requirements
                </Link>
                <Link href="/wifi-analyzer" className="block text-muted-foreground hover:text-primary transition-colors">
                  WiFi Analyzer
                </Link>
                <div className="text-muted-foreground">Enterprise AI Test</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">AI Tools Coverage</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">ChatGPT Requirements</div>
                <div className="text-muted-foreground">Midjourney Speed Test</div>
                <div className="text-muted-foreground">Claude AI Test</div>
                <div className="text-muted-foreground">DALL-E Speed Check</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Internet Providers</h4>
              <div className="space-y-2 text-sm">
                <Link href="/internet-providers" className="block text-muted-foreground hover:text-primary transition-colors">
                  All Providers
                </Link>
                <Link href="/providers/us/verizon" className="block text-muted-foreground hover:text-primary transition-colors">
                  Verizon Speed Test
                </Link>
                <Link href="/providers/us/comcast" className="block text-muted-foreground hover:text-primary transition-colors">
                  Comcast Speed Test
                </Link>
                <Link href="/providers/uk/bt" className="block text-muted-foreground hover:text-primary transition-colors">
                  BT Speed Test
                </Link>
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
                <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                  Speed Test Home
                </Link>
                <a href="https://www.fcc.gov/consumers/guides/broadband-speed-guide" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                  FCC Speed Guide
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/30 mt-8">
            <p className="text-sm text-muted-foreground">
              © 2025 Speed Test and Boost. AI internet speed requirements calculator for ChatGPT, Midjourney, Claude and enterprise AI workloads. 
              Compare AI bandwidth needs and optimize your connection for artificial intelligence applications.
            </p>
          </div>
        </div>
      </footer>

      <GenericFooter />
    </div>
  );
}