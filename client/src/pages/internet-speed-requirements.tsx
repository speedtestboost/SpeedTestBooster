import { useState, useEffect } from "react";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { trackEvent } from "@/lib/analytics";
import { 
  Wifi, 
  Gamepad2, 
  Video, 
  Phone, 
  Monitor, 
  Users, 
  Zap, 
  CheckCircle,
  AlertCircle,
  Info,
  Calculator,
  TrendingUp,
  Globe
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

interface ActivityRequirement {
  name: string;
  icon: React.ComponentType<any>;
  download: { min: number; recommended: number };
  upload: { min: number; recommended: number };
  latency: number;
  description: string;
  category: string;
}

const speedRequirements: ActivityRequirement[] = [
  {
    name: "4K Streaming (Netflix, YouTube)",
    icon: Video,
    download: { min: 25, recommended: 50 },
    upload: { min: 3, recommended: 5 },
    latency: 100,
    description: "Ultra HD 4K video streaming requires consistent high speeds",
    category: "streaming"
  },
  {
    name: "Competitive Gaming (FPS, MOBA)",
    icon: Gamepad2,
    download: { min: 25, recommended: 100 },
    upload: { min: 5, recommended: 25 },
    latency: 20,
    description: "Low latency crucial for competitive online gaming",
    category: "gaming"
  },
  {
    name: "Video Conferencing (Zoom, Teams)",
    icon: Phone,
    download: { min: 5, recommended: 15 },
    upload: { min: 1, recommended: 5 },
    latency: 150,
    description: "HD video calls for business and remote work",
    category: "work"
  },
  {
    name: "Live Streaming (Twitch, YouTube)",
    icon: Monitor,
    download: { min: 5, recommended: 25 },
    upload: { min: 10, recommended: 50 },
    latency: 50,
    description: "Broadcasting content requires high upload speeds",
    category: "streaming"
  },
  {
    name: "Cloud Gaming (Xbox, GeForce)",
    icon: Globe,
    download: { min: 35, recommended: 100 },
    upload: { min: 10, recommended: 25 },
    latency: 15,
    description: "Gaming from the cloud needs ultra-low latency",
    category: "gaming"
  },
  {
    name: "Smart Home Devices (IoT)",
    icon: Wifi,
    download: { min: 10, recommended: 25 },
    upload: { min: 2, recommended: 5 },
    latency: 200,
    description: "Connected devices for automation and monitoring",
    category: "smart"
  }
];

export default function InternetSpeedRequirements() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [simultaneousUsers, setSimultaneousUsers] = useState<number>(1);
  const [results, setResults] = useState<{
    minDownload: number;
    recommendedDownload: number;
    minUpload: number;
    recommendedUpload: number;
    maxLatency: number;
  } | null>(null);

  useEffect(() => {
    // SEO meta tags
    document.title = "Internet Speed Requirements Calculator 2025 - Gaming, Streaming, Work from Home | Speed Test & Boost";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate exact internet speed requirements for gaming, 4K streaming, video calls, and work from home. Free interactive calculator with 2025 speed recommendations for all activities.');
    }
    
    // Keywords meta tag
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content = 'internet speed requirements calculator, gaming internet speed needed, 4K streaming speed requirements, video call internet speed, work from home internet speed, internet speed by activity 2025, bandwidth calculator, internet speed guide';
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Internet Speed Requirements Calculator 2025 - Gaming, Streaming, Work' },
      { property: 'og:description', content: 'Calculate exact internet speed requirements for gaming, 4K streaming, video calls, and work from home. Free interactive calculator with 2025 recommendations.' },
      { property: 'og:url', content: 'https://speedtestboost.com/internet-speed-requirements' },
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
    
    // Update canonical tag
    const canonical = document.createElement('link');

    canonical.rel = 'canonical';

    canonical.href = 'https://speedtestboost.com/internet-speed-requirements';

    document.head.appendChild(canonical);
    
    // Structured Data (JSON-LD)
    let structuredData = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Internet Speed Requirements Calculator",
      "description": "Free online calculator to determine exact internet speed requirements for gaming, streaming, video calls, and work from home activities in 2025",
      "url": "https://speedtestboost.com/internet-speed-requirements",
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
        "Gaming speed requirements",
        "4K streaming bandwidth calculator",
        "Video conferencing speed needs",
        "Work from home internet guide",
        "Activity-based speed recommendations",
        "Household bandwidth planning"
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": ["Gamers", "Remote Workers", "Streamers", "Home Users"]
      }
    });

    return () => {
      // Remove the specific canonical element we created
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
    };
  }, []);

  const calculateRequirements = () => {
    if (selectedActivities.length === 0) return;

    trackEvent('speed_calculator_used', 'requirements', 'calculate_button');

    const selectedReqs = speedRequirements.filter(req => 
      selectedActivities.includes(req.name)
    );

    // Calculate base requirements
    const baseMinDownload = Math.max(...selectedReqs.map(req => req.download.min));
    const baseRecDownload = Math.max(...selectedReqs.map(req => req.download.recommended));
    const baseMinUpload = Math.max(...selectedReqs.map(req => req.upload.min));
    const baseRecUpload = Math.max(...selectedReqs.map(req => req.upload.recommended));
    const minLatency = Math.min(...selectedReqs.map(req => req.latency));

    // Apply multipliers for household size and simultaneous users
    const householdMultiplier = Math.max(1, householdSize * 0.3);
    const simultaneousMultiplier = simultaneousUsers;

    const finalMultiplier = householdMultiplier + (simultaneousMultiplier - 1) * 0.7;

    setResults({
      minDownload: Math.round(baseMinDownload * finalMultiplier),
      recommendedDownload: Math.round(baseRecDownload * finalMultiplier),
      minUpload: Math.round(baseMinUpload * finalMultiplier),
      recommendedUpload: Math.round(baseRecUpload * finalMultiplier),
      maxLatency: minLatency
    });
  };

  const toggleActivity = (activityName: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityName)
        ? prev.filter(name => name !== activityName)
        : [...prev, activityName]
    );
  };

  const getSpeedRecommendation = (speed: number) => {
    if (speed < 25) return { level: "Basic", color: "bg-yellow-500", description: "Suitable for light usage" };
    if (speed < 100) return { level: "Standard", color: "bg-blue-500", description: "Good for most activities" };
    if (speed < 300) return { level: "Premium", color: "bg-green-500", description: "Excellent performance" };
    return { level: "Ultra", color: "bg-purple-500", description: "Professional grade" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/internet-speed-requirements" />
      
      
      
      <main className="pt-24 pb-12">
        <Breadcrumbs 
          items={[
            { label: "Tools", href: "/" },
            { label: "Internet Speed Requirements", href: "/internet-speed-requirements" }
          ]} 
        />

        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full">
                <Calculator className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
              Internet Speed Requirements Calculator
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Calculate the exact internet speed you need for <span className="font-semibold text-blue-500">gaming</span>, 
              <span className="font-semibold text-purple-500"> 4K streaming</span>, 
              <span className="font-semibold text-green-500"> video calls</span>, and 
              <span className="font-semibold text-orange-500"> work from home</span>. 
              Get personalized 2025 speed recommendations based on your activities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Calculator Section */}
            <Card className="border-2 border-blue-500/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-500" />
                  Speed Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Activity Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select Your Activities</Label>
                  <div className="grid gap-3">
                    {speedRequirements.map((activity) => {
                      const Icon = activity.icon;
                      const isSelected = selectedActivities.includes(activity.name);
                      return (
                        <div
                          key={activity.name}
                          onClick={() => toggleActivity(activity.name)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`} />
                            <div className="flex-1">
                              <div className="font-medium">{activity.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {activity.description}
                              </div>
                            </div>
                            {isSelected && <CheckCircle className="h-5 w-5 text-blue-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Household Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="household-size">Household Size</Label>
                    <Select value={householdSize.toString()} onValueChange={(value) => setHouseholdSize(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8].map(size => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? 'person' : 'people'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="simultaneous-users">Peak Simultaneous Users</Label>
                    <Select value={simultaneousUsers.toString()} onValueChange={(value) => setSimultaneousUsers(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6].map(users => (
                          <SelectItem key={users} value={users.toString()}>
                            {users} {users === 1 ? 'user' : 'users'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={calculateRequirements}
                  disabled={selectedActivities.length === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate My Speed Requirements
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-2 border-green-500/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Your Speed Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    {/* Download Speed */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Download Speed</span>
                        <Badge className={getSpeedRecommendation(results.recommendedDownload).color}>
                          {getSpeedRecommendation(results.recommendedDownload).level}
                        </Badge>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {results.recommendedDownload} Mbps
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Recommended (Minimum: {results.minDownload} Mbps)
                        </div>
                      </div>
                    </div>

                    {/* Upload Speed */}
                    <div className="space-y-3">
                      <span className="font-medium">Upload Speed</span>
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {results.recommendedUpload} Mbps
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Recommended (Minimum: {results.minUpload} Mbps)
                        </div>
                      </div>
                    </div>

                    {/* Latency */}
                    <div className="space-y-3">
                      <span className="font-medium">Maximum Latency (Ping)</span>
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          Under {results.maxLatency}ms
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          For optimal performance
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-700 dark:text-blue-300">
                            {getSpeedRecommendation(results.recommendedDownload).description}
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                            Consider fiber internet for the best gaming and streaming experience.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Select your activities above to calculate your speed requirements
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Activity Details Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              2025 Internet Speed Requirements by Activity
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speedRequirements.map((activity) => {
                const Icon = activity.icon;
                return (
                  <Card key={activity.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="h-5 w-5 text-blue-500" />
                        {activity.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Download:</span>
                          <span className="font-medium">{activity.download.min}-{activity.download.recommended} Mbps</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Upload:</span>
                          <span className="font-medium">{activity.upload.min}-{activity.upload.recommended} Mbps</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Max Latency:</span>
                          <span className="font-medium">Under {activity.latency}ms</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What internet speed do I need for 4K streaming?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  For reliable 4K streaming on Netflix, YouTube, or other platforms, you need at least 25 Mbps download speed. 
                  We recommend 50 Mbps to account for multiple devices and ensure buffer-free viewing.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How much internet speed is needed for competitive gaming?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Competitive gaming requires 25-100 Mbps download and 5-25 Mbps upload speeds. More importantly, 
                  latency should be under 20ms for optimal performance in FPS and MOBA games.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What upload speed do I need for video calls?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  HD video conferencing on Zoom, Teams, or Google Meet needs 1-5 Mbps upload speed. 
                  For hosting large meetings or live streaming, consider 10+ Mbps upload speeds.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Is fiber internet better for gaming and streaming?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, fiber provides the lowest latency (under 10ms), symmetrical upload/download speeds, 
                  and the most consistent performance for gaming, streaming, and work from home activities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold mb-4">Test Your Current Internet Speed</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Now that you know your requirements, test if your current internet meets your needs.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            >
              <Zap className="mr-2 h-4 w-4" />
              Test My Internet Speed
            </Button>
          </div>
        </div>
      </main>

      <GenericFooter />
    </div>
  );
}