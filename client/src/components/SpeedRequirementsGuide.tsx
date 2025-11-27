import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Monitor, Gamepad2, Video, Users } from "lucide-react";

const speedCategories = [
  {
    icon: Monitor,
    title: "Basic Browsing & Email",
    speed: "1-5 Mbps",
    description: "Perfect for basic web browsing, email, and social media",
    activities: ["Web browsing", "Email", "Social media", "Music streaming"]
  },
  {
    icon: Video,
    title: "HD Streaming",
    speed: "5-25 Mbps", 
    description: "Ideal for HD video streaming and video calls",
    activities: ["HD Netflix/YouTube", "Video calls", "Online shopping", "Cloud storage"]
  },
  {
    icon: Gamepad2,
    title: "Gaming & 4K Streaming",
    speed: "25-100 Mbps",
    description: "Great for online gaming and 4K video streaming",
    activities: ["4K streaming", "Online gaming", "Large downloads", "Multiple devices"]
  },
  {
    icon: Users,
    title: "Heavy Usage & Work",
    speed: "100+ Mbps",
    description: "Perfect for multiple users and business needs",
    activities: ["Multiple 4K streams", "Video conferencing", "File uploads", "Smart home devices"]
  }
];

export default function SpeedRequirementsGuide() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Internet Speed Test Guide - What Your Results Mean
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use our free internet speed test to check if your connection meets these requirements. 
          Our accurate wifi speed test shows download, upload, and ping speeds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {speedCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {category.title}
                  </CardTitle>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {category.speed}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  {category.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 text-sm">Perfect for:</h4>
                  <ul className="space-y-1">
                    {category.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="text-xs text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Gaming & Low Latency Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-xl font-bold text-green-600">0-20ms</div>
            <div className="text-sm text-gray-600">Excellent for gaming</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-xl font-bold text-yellow-600">21-50ms</div>
            <div className="text-sm text-gray-600">Good for most games</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-xl font-bold text-red-600">50ms+</div>
            <div className="text-sm text-gray-600">May affect gaming</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Use our speed test for gaming to check your ping and latency
        </p>
      </div>
    </div>
  );
}
