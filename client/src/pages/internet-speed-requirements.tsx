import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { 
  Monitor, 
  Gamepad2, 
  Video, 
  Briefcase, 
  Home, 
  Users, 
  Wifi, 
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Globe,
  Smartphone,
  Tv,
  Camera,
  Headphones
} from "lucide-react";

interface ActivityRequirement {
  activity: string;
  minSpeed: number;
  recommendedSpeed: number;
  description: string;
  icon: any;
  category: 'streaming' | 'gaming' | 'work' | 'smart-home';
}

interface CalculatorState {
  users: number;
  activities: {
    hd_streaming: boolean;
    uhd_4k_streaming: boolean;
    casual_gaming: boolean;
    competitive_gaming: boolean;
    cloud_gaming: boolean;
    video_calls: boolean;
    large_downloads: boolean;
    live_streaming: boolean;
    smart_home: boolean;
    multiple_devices: boolean;
  };
}

const speedRequirements: ActivityRequirement[] = [
  // Streaming
  { activity: "HD Video Streaming (1080p)", minSpeed: 5, recommendedSpeed: 8, description: "Netflix, YouTube, Disney+", icon: Video, category: 'streaming' },
  { activity: "4K Ultra HD Streaming", minSpeed: 25, recommendedSpeed: 35, description: "4K Netflix, Prime Video", icon: Tv, category: 'streaming' },
  { activity: "Multiple 4K Streams", minSpeed: 50, recommendedSpeed: 75, description: "Family watching different 4K content", icon: Users, category: 'streaming' },
  { activity: "Live Streaming (Twitch/YouTube)", minSpeed: 15, recommendedSpeed: 25, description: "Broadcasting 1080p content", icon: Camera, category: 'streaming' },
  
  // Gaming
  { activity: "Casual Gaming", minSpeed: 3, recommendedSpeed: 10, description: "Minecraft, Roblox, turn-based games", icon: Gamepad2, category: 'gaming' },
  { activity: "Competitive Gaming", minSpeed: 15, recommendedSpeed: 50, description: "Fortnite, Call of Duty, Apex Legends", icon: Zap, category: 'gaming' },
  { activity: "Cloud Gaming", minSpeed: 35, recommendedSpeed: 50, description: "GeForce Now, Xbox Cloud Gaming", icon: Monitor, category: 'gaming' },
  { activity: "VR Gaming", minSpeed: 50, recommendedSpeed: 100, description: "Meta Quest, Steam VR", icon: Headphones, category: 'gaming' },
  
  // Work
  { activity: "Video Conferencing", minSpeed: 2, recommendedSpeed: 8, description: "Zoom, Teams, Google Meet", icon: Briefcase, category: 'work' },
  { activity: "HD Video Calls", minSpeed: 8, recommendedSpeed: 15, description: "High quality business meetings", icon: Monitor, category: 'work' },
  { activity: "Large File Uploads", minSpeed: 10, recommendedSpeed: 25, description: "Cloud storage, video files", icon: TrendingUp, category: 'work' },
  { activity: "Remote Desktop", minSpeed: 5, recommendedSpeed: 15, description: "Accessing work computers remotely", icon: Globe, category: 'work' },
  
  // Smart Home
  { activity: "Security Cameras (4 cams)", minSpeed: 5, recommendedSpeed: 10, description: "1080p home security system", icon: Camera, category: 'smart-home' },
  { activity: "Smart Home Devices", minSpeed: 1, recommendedSpeed: 5, description: "IoT devices, smart speakers", icon: Home, category: 'smart-home' },
  { activity: "Multiple Smart TVs", minSpeed: 15, recommendedSpeed: 25, description: "Smart TV apps, streaming", icon: Tv, category: 'smart-home' }
];

export default function InternetSpeedRequirements() {
  const [calculator, setCalculator] = useState<CalculatorState>({
    users: 2,
    activities: {
      hd_streaming: false,
      uhd_4k_streaming: false,
      casual_gaming: false,
      competitive_gaming: false,
      cloud_gaming: false,
      video_calls: false,
      large_downloads: false,
      live_streaming: false,
      smart_home: false,
      multiple_devices: false
    }
  });

  const [recommendedSpeed, setRecommendedSpeed] = useState(0);
  const [currentTest, setCurrentTest] = useState<{ download: number; upload: number } | null>(null);

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Internet Speed Requirements 2025 - Complete Guide & Calculator | Speed Test & Boost";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete 2025 guide to internet speed requirements. Interactive calculator for gaming, streaming, work from home. Find out what speed you need for Netflix 4K, competitive gaming, video calls.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'internet speed requirements 2025, how much internet speed do I need, speed for gaming, speed for streaming, netflix speed requirements, gaming internet speed, work from home internet, 4K streaming speed, video call speed requirements';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Internet Speed Requirements 2025 - Complete Guide & Calculator' },
      { property: 'og:description', content: 'Complete 2025 guide to internet speed requirements. Interactive calculator for gaming, streaming, work from home. Find out what speed you need for Netflix 4K, competitive gaming, video calls.' },
      { property: 'og:url', content: 'https://speedtestboost.com/internet-speed-requirements' },
      { property: 'og:type', content: 'article' },
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
      { name: 'twitter:title', content: 'Internet Speed Requirements 2025 - Complete Guide & Calculator' },
      { name: 'twitter:description', content: 'Interactive calculator to find your perfect internet speed for gaming, streaming, and work.' }
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement;
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.name = tag.name;
        document.head.appendChild(twitterTag);
      }
      twitterTag.content = tag.content;
    });
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/internet-speed-requirements';
    
    // Structured Data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Internet Speed Requirements 2025 - Complete Guide & Calculator",
      "description": "Comprehensive guide to internet speed requirements for gaming, streaming, work from home, and smart home devices in 2025.",
      "url": "https://speedtestboost.com/internet-speed-requirements",
      "datePublished": "2025-02-02",
      "dateModified": "2025-02-02",
      "author": {
        "@type": "Organization",
        "name": "Speed Test & Boost",
        "url": "https://speedtestboost.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Speed Test & Boost",
        "url": "https://speedtestboost.com/"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What internet speed do I need for 4K streaming?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For 4K Ultra HD streaming, you need a minimum of 25 Mbps download speed, but 35 Mbps is recommended for consistent quality without buffering."
            }
          },
          {
            "@type": "Question", 
            "name": "What internet speed do I need for gaming?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Casual gaming requires 3-10 Mbps, competitive gaming needs 15-50 Mbps, and cloud gaming requires 35-50 Mbps for optimal performance."
            }
          },
          {
            "@type": "Question",
            "name": "How much internet speed do I need for work from home?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For video conferencing, 8-15 Mbps is recommended. For large file uploads and remote desktop work, 25 Mbps or higher is ideal."
            }
          }
        ]
      }
    });
  }, []);

  // Calculate recommended speed based on activities and users
  useEffect(() => {
    let baseSpeed = 10; // Base household internet
    let activitySpeed = 0;
    
    // Calculate speed for selected activities
    if (calculator.activities.hd_streaming) activitySpeed += 8;
    if (calculator.activities.uhd_4k_streaming) activitySpeed += 35;
    if (calculator.activities.casual_gaming) activitySpeed += 10;
    if (calculator.activities.competitive_gaming) activitySpeed += 50;
    if (calculator.activities.cloud_gaming) activitySpeed += 50;
    if (calculator.activities.video_calls) activitySpeed += 15;
    if (calculator.activities.large_downloads) activitySpeed += 25;
    if (calculator.activities.live_streaming) activitySpeed += 25;
    if (calculator.activities.smart_home) activitySpeed += 10;
    if (calculator.activities.multiple_devices) activitySpeed += 20;
    
    // Multiply by user factor (with diminishing returns)
    const userMultiplier = calculator.users > 1 ? 1 + (calculator.users - 1) * 0.6 : 1;
    const totalSpeed = Math.ceil((baseSpeed + activitySpeed) * userMultiplier);
    
    setRecommendedSpeed(totalSpeed);
  }, [calculator]);

  const handleActivityChange = (activity: keyof typeof calculator.activities, checked: boolean) => {
    setCalculator(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [activity]: checked
      }
    }));
  };

  const handleUsersChange = (value: number[]) => {
    setCalculator(prev => ({
      ...prev,
      users: value[0]
    }));
  };

  const getSpeedCategory = (speed: number) => {
    if (speed <= 25) return { label: "Basic", color: "bg-blue-100 text-blue-800", description: "Good for basic browsing and SD streaming" };
    if (speed <= 100) return { label: "Standard", color: "bg-green-100 text-green-800", description: "Perfect for HD streaming and casual gaming" };
    if (speed <= 300) return { label: "High-Speed", color: "bg-purple-100 text-purple-800", description: "Great for 4K streaming and competitive gaming" };
    return { label: "Ultra-Fast", color: "bg-orange-100 text-orange-800", description: "Ideal for power users and large households" };
  };

  const speedCategory = getSpeedCategory(recommendedSpeed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Speed Test & Boost
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">Speed Test</Link>
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
            <Link to="/help" className="text-white/80 hover:text-white transition-colors">Help</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Internet Speed Requirements 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 2025</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Find out exactly how much internet speed you need for gaming, streaming, work from home, and smart devices. Use our interactive calculator to get personalized recommendations.
          </p>
          <Badge className={speedCategory.color + " text-lg px-4 py-2"}>
            Updated for 2025 • Comprehensive Guide
          </Badge>
        </div>

        {/* Interactive Speed Calculator */}
        <Card className="bg-white/5 border-white/10 mb-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              Interactive Speed Calculator
            </CardTitle>
            <p className="text-white/70">Tell us about your internet usage and we'll recommend the perfect speed for your needs.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Input */}
              <div className="space-y-6">
                {/* Number of Users */}
                <div>
                  <label className="text-white font-medium mb-3 block">
                    Number of users in your household: {calculator.users}
                  </label>
                  <Slider
                    value={[calculator.users]}
                    onValueChange={handleUsersChange}
                    max={8}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60 mt-1">
                    <span>1 user</span>
                    <span>8+ users</span>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <label className="text-white font-medium mb-3 block">
                    Select your activities:
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { key: 'hd_streaming', label: 'HD Streaming (Netflix, YouTube)', desc: '1080p video content' },
                      { key: 'uhd_4k_streaming', label: '4K Ultra HD Streaming', desc: '4K Netflix, Prime Video' },
                      { key: 'casual_gaming', label: 'Casual Gaming', desc: 'Minecraft, mobile games' },
                      { key: 'competitive_gaming', label: 'Competitive Gaming', desc: 'Fortnite, Call of Duty, Apex' },
                      { key: 'cloud_gaming', label: 'Cloud Gaming', desc: 'GeForce Now, Xbox Cloud Gaming' },
                      { key: 'video_calls', label: 'Video Calls & Meetings', desc: 'Zoom, Teams, work calls' },
                      { key: 'large_downloads', label: 'Large File Downloads', desc: 'Software, games, cloud storage' },
                      { key: 'live_streaming', label: 'Live Streaming', desc: 'Twitch, YouTube broadcasting' },
                      { key: 'smart_home', label: 'Smart Home Devices', desc: 'Security cameras, IoT devices' },
                      { key: 'multiple_devices', label: 'Multiple Devices', desc: '5+ connected devices' }
                    ].map((activity) => (
                      <div key={activity.key} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <Checkbox
                          id={activity.key}
                          checked={calculator.activities[activity.key as keyof typeof calculator.activities]}
                          onCheckedChange={(checked) => handleActivityChange(activity.key as keyof typeof calculator.activities, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={activity.key} className="text-white cursor-pointer font-medium">
                            {activity.label}
                          </label>
                          <p className="text-white/60 text-sm">{activity.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Results */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      Recommended Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-5xl font-bold text-white mb-2">
                      {recommendedSpeed}
                      <span className="text-2xl text-white/80 ml-2">Mbps</span>
                    </div>
                    <Badge className={speedCategory.color + " mb-4"}>
                      {speedCategory.label} Plan
                    </Badge>
                    <p className="text-white/80 text-sm">
                      {speedCategory.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">
                      Speed Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Base household internet:</span>
                        <span className="text-white">10 Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Your activities:</span>
                        <span className="text-white">{Math.max(0, Math.floor(recommendedSpeed / (calculator.users > 1 ? 1 + (calculator.users - 1) * 0.6 : 1) - 10))} Mbps</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Multiple users ({calculator.users}):</span>
                        <span className="text-white">×{(calculator.users > 1 ? 1 + (calculator.users - 1) * 0.6 : 1).toFixed(1)}</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Total recommended:</span>
                        <span className="text-purple-400">{recommendedSpeed} Mbps</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Link to="/">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Wifi className="w-5 h-5 mr-2" />
                      Test My Current Speed
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Speed Requirements by Category */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Speed Requirements by Activity
          </h2>
          
          <div className="grid gap-8">
            {/* Streaming Requirements */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Video className="w-6 h-6 text-red-400" />
                  Video Streaming Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {speedRequirements.filter(req => req.category === 'streaming').map((req) => (
                    <div key={req.activity} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <req.icon className="w-5 h-5 text-red-400" />
                        <h4 className="font-medium text-white text-sm">{req.activity}</h4>
                      </div>
                      <p className="text-white/60 text-xs mb-3">{req.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Minimum:</span>
                          <span className="text-yellow-400">{req.minSpeed} Mbps</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Recommended:</span>
                          <span className="text-green-400">{req.recommendedSpeed} Mbps</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gaming Requirements */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gamepad2 className="w-6 h-6 text-green-400" />
                  Gaming Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {speedRequirements.filter(req => req.category === 'gaming').map((req) => (
                    <div key={req.activity} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <req.icon className="w-5 h-5 text-green-400" />
                        <h4 className="font-medium text-white text-sm">{req.activity}</h4>
                      </div>
                      <p className="text-white/60 text-xs mb-3">{req.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Minimum:</span>
                          <span className="text-yellow-400">{req.minSpeed} Mbps</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Recommended:</span>
                          <span className="text-green-400">{req.recommendedSpeed} Mbps</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Requirements */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                  Work From Home Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {speedRequirements.filter(req => req.category === 'work').map((req) => (
                    <div key={req.activity} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <req.icon className="w-5 h-5 text-blue-400" />
                        <h4 className="font-medium text-white text-sm">{req.activity}</h4>
                      </div>
                      <p className="text-white/60 text-xs mb-3">{req.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Minimum:</span>
                          <span className="text-yellow-400">{req.minSpeed} Mbps</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Recommended:</span>
                          <span className="text-green-400">{req.recommendedSpeed} Mbps</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart Home Requirements */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Home className="w-6 h-6 text-purple-400" />
                  Smart Home & IoT Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {speedRequirements.filter(req => req.category === 'smart-home').map((req) => (
                    <div key={req.activity} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <req.icon className="w-5 h-5 text-purple-400" />
                        <h4 className="font-medium text-white text-sm">{req.activity}</h4>
                      </div>
                      <p className="text-white/60 text-xs mb-3">{req.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Minimum:</span>
                          <span className="text-yellow-400">{req.minSpeed} Mbps</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Recommended:</span>
                          <span className="text-green-400">{req.recommendedSpeed} Mbps</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Reference Guide */}
        <Card className="bg-white/5 border-white/10 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-center">Quick Reference: Common Internet Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { speed: "25 Mbps", plan: "Basic", good: ["HD streaming", "Light gaming", "Email"], limited: ["Multiple 4K streams", "Cloud gaming"] },
                { speed: "100 Mbps", plan: "Standard", good: ["4K streaming", "Gaming", "Video calls", "Smart home"], limited: ["Multiple cloud gaming", "Heavy uploading"] },
                { speed: "300 Mbps", plan: "Premium", good: ["Multiple 4K streams", "Competitive gaming", "Live streaming", "Large households"], limited: ["Extreme power usage"] },
                { speed: "1000 Mbps", plan: "Gigabit", good: ["Everything", "Multiple power users", "Professional streaming", "Business use"], limited: ["None"] }
              ].map((plan) => (
                <div key={plan.speed} className="p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.speed}</h3>
                  <p className="text-purple-400 font-medium mb-3">{plan.plan} Plan</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-green-400 text-sm font-medium mb-1">✓ Great for:</p>
                      <ul className="text-white/70 text-xs space-y-1">
                        {plan.good.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    {plan.limited[0] !== "None" && (
                      <div>
                        <p className="text-yellow-400 text-sm font-medium mb-1">⚠ Limited:</p>
                        <ul className="text-white/70 text-xs space-y-1">
                          {plan.limited.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-white/5 border-white/10 mb-12">
          <CardHeader>
            <CardTitle className="text-white text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "What's the difference between download and upload speed?",
                  a: "Download speed affects streaming, gaming, and browsing. Upload speed is important for video calls, live streaming, and uploading files to the cloud."
                },
                {
                  q: "Do I need different speeds for 4K vs HD streaming?",
                  a: "Yes. HD (1080p) streaming needs 5-8 Mbps, while 4K streaming requires 25-35 Mbps per stream for smooth playback without buffering."
                },
                {
                  q: "Is ping more important than speed for gaming?",
                  a: "For competitive gaming, ping (latency) under 50ms is crucial. Speed matters too - 15-50 Mbps prevents lag during downloads and updates."
                },
                {
                  q: "How many devices can use my internet at once?",
                  a: "It depends on your speed and what each device is doing. A 100 Mbps connection can support 10-15 basic devices or 4-5 devices streaming 4K."
                },
                {
                  q: "Do smart home devices use a lot of internet?",
                  a: "Individual smart devices use very little (1-5 Mbps total), but security cameras streaming 4K can use 8-10 Mbps per camera."
                },
                {
                  q: "What speed do I need for working from home?",
                  a: "For video calls: 8-15 Mbps. For large file uploads and remote desktop: 25+ Mbps. Consider upload speed for sending files and presentations."
                }
              ].map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5">
                  <h4 className="text-white font-medium mb-2">{faq.q}</h4>
                  <p className="text-white/70 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Test Your Current Speed?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Now that you know what speed you need, test your current internet connection to see if it meets your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Wifi className="w-5 h-5 mr-2" />
                Test My Speed Now
              </Button>
            </Link>
            <Link to="/help">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Learn More About Speed Testing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}