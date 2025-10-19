import { useEffect, useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Upload, Video, FileUp, Cloud, Users } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";

export default function UploadSpeedGuide() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Internet Upload Speed Explained: Complete Guide 2025";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete guide to internet upload speeds. Learn what upload speed you need for video calls, file sharing, streaming, and remote work.');
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('id', 'canonical-tag');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://speedtestboost.com/upload-speed-guide');

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

    createOrUpdateMetaTag('og:title', 'Internet Upload Speed Explained: Complete Guide 2025');
    createOrUpdateMetaTag('og:description', 'Complete guide to internet upload speeds. Learn what upload speed you need for video calls, file sharing, streaming, and remote work.');
    createOrUpdateMetaTag('og:type', 'article');
    createOrUpdateMetaTag('og:url', 'https://speedtestboost.com/upload-speed-guide');
    createOrUpdateMetaTag('og:image', 'https://speedtestboost.com/logo-option-5.svg');
    createOrUpdateTwitterMetaTag('twitter:card', 'summary_large_image');
    createOrUpdateTwitterMetaTag('twitter:title', 'Internet Upload Speed Explained: Complete Guide 2025');
    createOrUpdateTwitterMetaTag('twitter:description', 'Complete guide to internet upload speeds. Learn what upload speed you need for video calls, file sharing, streaming, and remote work.');
    createOrUpdateTwitterMetaTag('twitter:image', 'https://speedtestboost.com/logo-option-5.svg');

    // Structured data for article
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "@id": "https://speedtestboost.com/upload-speed-guide#article",
          "headline": "Internet Upload Speed Explained: Complete Guide 2025",
          "description": "Complete guide to internet upload speeds. Learn what upload speed you need for video calls, file sharing, streaming, and remote work.",
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
            "@id": "https://speedtestboost.com/upload-speed-guide"
          },
          "articleSection": "Technology",
          "keywords": ["upload speed", "internet speed", "video calling", "file upload", "remote work", "livestreaming"]
        },
        {
          "@type": "FAQPage",
          "@id": "https://speedtestboost.com/upload-speed-guide#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a good upload speed?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good upload speed depends on your needs. For video calls: 3-5 Mbps, file sharing: 10+ Mbps, livestreaming: 15-25 Mbps, and professional content creation: 50+ Mbps."
              }
            },
            {
              "@type": "Question",
              "name": "Why is upload speed important?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload speed affects video call quality, file sharing efficiency, cloud backup speed, livestreaming performance, and any activity where you send data to the internet."
              }
            },
            {
              "@type": "Question",
              "name": "Why is my upload speed slower than download?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most internet plans are asymmetric, prioritizing download speed since users typically consume more content than they upload. Cable and DSL connections often have much lower upload speeds, while fiber offers more balanced speeds."
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'upload-speed-guide-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script#upload-speed-guide-structured-data');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/upload-speed-guide" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-accent/10 rounded-full">
                <Upload className="h-12 w-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Internet Upload Speed Explained
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover everything about upload speeds and why they matter for modern internet usage. Learn optimal speeds for video calls, 
              file sharing, streaming, and remote work scenarios.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity"
                data-testid="button-test-upload-speed"
              >
                <Zap className="mr-2 h-5 w-5" />
                Test Your Upload Speed Now
              </Button>
            </div>
          </div>

          {/* Quick Summary */}
          <Card className="mb-8" data-testid="card-upload-basics">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">What is Upload Speed?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Upload speed measures how quickly your internet connection can send data from your device to servers on the internet. 
                While often overshadowed by download speeds, upload speed is crucial for video calls, file sharing, cloud backups, 
                livestreaming, and any activity where you send data online.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Video className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="font-semibold">Video Calls</div>
                  <div className="text-sm text-muted-foreground">3-5 Mbps</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <FileUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="font-semibold">File Sharing</div>
                  <div className="text-sm text-muted-foreground">10+ Mbps</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="font-semibold">Livestreaming</div>
                  <div className="text-sm text-muted-foreground">15-25 Mbps</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Speed Requirements */}
          <Card className="mb-8" data-testid="card-upload-requirements">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Upload Speed Requirements by Activity</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-semibold mb-2">Email and Basic File Sharing (1-3 Mbps)</h3>
                  <p className="text-muted-foreground">
                    Sending emails with attachments, sharing photos on social media, and uploading documents to cloud storage 
                    require minimal upload speeds. Even slower connections can handle these tasks, though larger files take longer.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-semibold mb-2">Video Calling and Conferencing (3-5 Mbps)</h3>
                  <p className="text-muted-foreground">
                    Zoom, Teams, and other video conferencing platforms need consistent upload speeds for clear video and audio. 
                    HD video calls require 3-5 Mbps upload, while group calls with multiple participants may need higher speeds 
                    for optimal quality without freezing or pixelation.
                  </p>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-xl font-semibold mb-2">Cloud Backup and File Sync (5-15 Mbps)</h3>
                  <p className="text-muted-foreground">
                    Services like Google Drive, Dropbox, and iCloud continuously sync files in the background. 
                    Professional workflows with large files, photos, or videos benefit significantly from higher upload speeds 
                    to maintain productivity without waiting for uploads to complete.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h3 className="text-xl font-semibold mb-2">Live Streaming and Content Creation (15-25 Mbps)</h3>
                  <p className="text-muted-foreground">
                    Twitch, YouTube Live, and Facebook Live require substantial upload bandwidth for quality streams. 
                    1080p streaming typically needs 15-25 Mbps, while 4K streaming can require 50+ Mbps. 
                    Consistent speeds matter more than peak speeds for uninterrupted broadcasting.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-xl font-semibold mb-2">Professional Content Upload (25+ Mbps)</h3>
                  <p className="text-muted-foreground">
                    Video producers, photographers, and content creators uploading large files to clients or platforms 
                    benefit from high upload speeds. A 10 GB video file takes 1 hour at 25 Mbps versus 4 hours at 6 Mbps, 
                    directly impacting productivity and deadlines.
                  </p>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h3 className="text-xl font-semibold mb-2">Remote Work and VPN (5-10 Mbps)</h3>
                  <p className="text-muted-foreground">
                    Working from home often involves VPN connections, video meetings, file uploads, and screen sharing. 
                    While basic remote work functions with lower speeds, 5-10 Mbps upload ensures smooth performance 
                    for professional applications without disrupting colleagues or clients.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Upload Speed Reality Check</h4>
                <p className="text-sm text-muted-foreground">
                  Many internet plans offer much lower upload than download speeds. Cable internet might provide 
                  100 Mbps download but only 10 Mbps upload. Fiber connections typically offer more balanced speeds.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why Upload Speed Matters */}
          <Card className="mb-8" data-testid="card-upload-importance">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Why Upload Speed is Critical in 2025</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Remote Work Revolution</h3>
                  <p className="text-muted-foreground">
                    The shift to remote and hybrid work has made upload speed essential for professional success. 
                    Video meetings, file collaboration, and cloud-based workflows require reliable upload performance. 
                    Poor upload speeds directly impact career productivity and meeting participation quality.
                  </p>
                  
                  <h3 className="text-xl font-semibold">Content Creation Economy</h3>
                  <p className="text-muted-foreground">
                    Social media influencers, YouTubers, streamers, and digital creators depend on upload speeds 
                    for their livelihoods. Uploading videos, streaming live content, and maintaining social media 
                    presence requires consistent, high-quality upload performance.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Cloud-First Computing</h3>
                  <p className="text-muted-foreground">
                    Modern computing relies heavily on cloud services. From automatic photo backups to 
                    real-time document collaboration, upload speed affects daily digital experiences. 
                    Slow uploads create bottlenecks in cloud-dependent workflows.
                  </p>
                  
                  <h3 className="text-xl font-semibold">Interactive Communication</h3>
                  <p className="text-muted-foreground">
                    Video calls with family, online gaming, and virtual events require bidirectional communication. 
                    While download speed affects what you receive, upload speed determines how clearly 
                    others can see and hear you in real-time interactions.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-2">🎯 Future-Proofing Tip</h4>
                <p className="text-sm text-muted-foreground">
                  As virtual reality, augmented reality, and real-time collaboration tools evolve, 
                  upload speed requirements will continue increasing. Choosing higher upload speeds now 
                  prepares you for emerging technologies and applications.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upload vs Download Comparison */}
          <Card className="mb-8" data-testid="card-upload-vs-download">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Upload Speed vs Download Speed: Key Differences</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left">Connection Type</th>
                      <th className="border border-border p-3 text-left">Download Speed</th>
                      <th className="border border-border p-3 text-left">Upload Speed</th>
                      <th className="border border-border p-3 text-left">Speed Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 font-semibold">Fiber Optic</td>
                      <td className="border border-border p-3">100-1000 Mbps</td>
                      <td className="border border-border p-3">100-1000 Mbps</td>
                      <td className="border border-border p-3 text-green-600">1:1 (Symmetrical)</td>
                    </tr>
                    <tr className="bg-muted/25">
                      <td className="border border-border p-3 font-semibold">Cable Internet</td>
                      <td className="border border-border p-3">25-400 Mbps</td>
                      <td className="border border-border p-3">3-35 Mbps</td>
                      <td className="border border-border p-3 text-orange-600">10:1 to 15:1</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 font-semibold">DSL</td>
                      <td className="border border-border p-3">1-100 Mbps</td>
                      <td className="border border-border p-3">1-10 Mbps</td>
                      <td className="border border-border p-3 text-red-600">10:1 to 20:1</td>
                    </tr>
                    <tr className="bg-muted/25">
                      <td className="border border-border p-3 font-semibold">5G Home</td>
                      <td className="border border-border p-3">50-1000 Mbps</td>
                      <td className="border border-border p-3">10-50 Mbps</td>
                      <td className="border border-border p-3 text-yellow-600">5:1 to 20:1</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 font-semibold">Satellite</td>
                      <td className="border border-border p-3">12-100 Mbps</td>
                      <td className="border border-border p-3">1-3 Mbps</td>
                      <td className="border border-border p-3 text-red-600">12:1 to 30:1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-700 dark:text-green-400">Symmetrical Connections (Fiber)</h4>
                  <p className="text-sm text-muted-foreground">
                    Offer equal upload and download speeds, ideal for content creators, remote workers, and heavy uploaders.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400">Asymmetrical Connections (Cable/DSL)</h4>
                  <p className="text-sm text-muted-foreground">
                    Prioritize download speed since most users consume more content than they upload, but may limit upload-heavy activities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Upload Speed */}
          <Card className="mb-8" data-testid="card-upload-testing">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">How to Test Your Upload Speed Accurately</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Pre-Test Optimization</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Close cloud backup services (Google Drive, Dropbox, iCloud)</li>
                    <li>Pause any file uploads or video/photo syncing</li>
                    <li>Exit video calling applications completely</li>
                    <li>Stop any streaming software or screen recording</li>
                    <li>Connect directly via ethernet for most accurate results</li>
                    <li>Test multiple times throughout the day</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Understanding Upload Test Results</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Upload Speed Measurement</h4>
                      <p className="text-sm text-muted-foreground">
                        Measured in Mbps, this shows how fast you can send data to the internet. 
                        Compare against your plan's advertised upload speed and your usage requirements.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Upload Consistency</h4>
                      <p className="text-sm text-muted-foreground">
                        Multiple tests should show similar results. Large variations indicate network 
                        instability that could affect video calls and live streaming quality.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-accent/5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3">Test Your Upload Performance</h4>
                  <Button 
                    onClick={() => setShowSpeedTest(true)} 
                    className="bg-accent hover:bg-accent/90"
                    data-testid="button-test-upload-middle"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Run Upload Speed Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Improving Upload Speed */}
          <Card className="mb-8" data-testid="card-upload-optimization">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">How to Improve Your Upload Speed</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Immediate Optimizations</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Network Management</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Prioritize upload traffic in router QoS settings</li>
                        <li>• Schedule large uploads during off-peak hours</li>
                        <li>• Limit background application uploads</li>
                        <li>• Use ethernet instead of WiFi for important uploads</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Hardware Optimization</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Upgrade to a modern router with better processors</li>
                        <li>• Ensure network drivers are current</li>
                        <li>• Position router optimally for best signal strength</li>
                        <li>• Consider mesh systems for large homes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Service and Plan Considerations</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold">Evaluate Your Internet Plan</h4>
                      <p className="text-muted-foreground text-sm">
                        If your upload needs consistently exceed your plan's capabilities, consider upgrading. 
                        Business plans often offer better upload speeds than residential plans from the same provider.
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold">Consider Fiber Optic Service</h4>
                      <p className="text-muted-foreground text-sm">
                        Fiber connections offer symmetrical speeds, providing equal upload and download bandwidth. 
                        This is ideal for content creators, remote workers, and households with high upload demands.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold mb-2">🔧 Professional Upload Optimization</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our WiFi optimization tool can help identify upload bottlenecks and provide targeted solutions 
                    for your specific network configuration and usage patterns.
                  </p>
                  <Link href="/wifi-speed-optimization" className="text-sm text-primary hover:underline">
                    Optimize Your Upload Performance →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-8" data-testid="card-upload-faq">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Upload Speed FAQ</h2>
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">What upload speed do I need for video calls?</h3>
                  <p className="text-muted-foreground">
                    For standard video calls: 3-5 Mbps upload. HD video conferencing: 5-10 Mbps. 
                    Group video calls with multiple participants may require 10-15 Mbps for optimal quality without lag or pixelation.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">Why is my upload speed much slower than download?</h3>
                  <p className="text-muted-foreground">
                    Most internet plans are asymmetrical, designed for typical usage patterns where people download more than they upload. 
                    Cable and DSL technologies inherently favor download speeds, while fiber offers more balanced speeds.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">Can I increase upload speed without changing my plan?</h3>
                  <p className="text-muted-foreground">
                    Yes, through optimization: use ethernet connections, upgrade your router, manage bandwidth usage, 
                    and optimize QoS settings. However, your maximum upload speed is ultimately limited by your internet plan.
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <h3 className="text-lg font-semibold mb-2">How does upload speed affect cloud backup?</h3>
                  <p className="text-muted-foreground">
                    Upload speed directly determines how fast files sync to cloud services. Low upload speeds create bottlenecks, 
                    causing delays in backup completion and potentially affecting productivity when working with cloud-stored files.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Is upload speed important for gaming?</h3>
                  <p className="text-muted-foreground">
                    While gaming doesn't require high upload speeds (1-3 Mbps is usually sufficient), consistent upload performance 
                    affects voice chat quality, streaming your gameplay, and uploading game clips or screenshots.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card data-testid="card-upload-related">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Related Speed Guides</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/download-speed-guide" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Download Speed Explained</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about download speeds, requirements for streaming, gaming, and everyday internet usage.
                  </p>
                </Link>
                <Link href="/wifi-speed-optimization" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">WiFi Speed Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover how to maximize both upload and download performance with our optimization tools.
                  </p>
                </Link>
              </div>
              <div className="mt-6 text-center">
                <Link href="/internet-speed-requirements" className="text-primary hover:underline">
                  View Complete Speed Requirements Guide →
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