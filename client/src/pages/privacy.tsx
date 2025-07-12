import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Database, Lock, UserCheck, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Privacy Policy - Speed Test & Boost | Your Data Protection";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Speed Test & Boost privacy policy. Learn how we protect your data during internet speed tests. No personal information stored, anonymous testing, GDPR compliant.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <nav className="border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Speed Test & Boost
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Speed Test
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                Help
              </Link>
              <Link href="/privacy" className="text-primary font-medium">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Privacy & Security
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your privacy is our priority. Learn how we protect your data and ensure your internet speed tests remain anonymous and secure.
            </p>
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Last updated: January 12, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Personal Data</h3>
                <p className="text-muted-foreground text-sm">
                  We don't collect, store, or process any personal information. Your identity remains completely anonymous.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  We don't track your browsing habits, use cookies for advertising, or build profiles about you.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Minimal Data</h3>
                <p className="text-muted-foreground text-sm">
                  We only collect the technical data necessary to perform accurate speed tests - nothing more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Collect */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Information Do We Collect?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We collect only the minimum technical data required to provide accurate speed test results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Technical Data We Collect</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>IP Address:</strong> Used to determine your approximate location and select optimal test servers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Browser Information:</strong> Basic browser type and version for compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Connection Type:</strong> Detected connection method (WiFi, ethernet, mobile)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Test Results:</strong> Speed measurements, ping, and jitter values</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Session ID:</strong> Temporary identifier to group your test results</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">What We DON'T Collect</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Personal Information:</strong> No names, emails, phone numbers, or addresses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Browsing History:</strong> We don't track what websites you visit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Location Data:</strong> No precise GPS coordinates or exact location</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Device Information:</strong> No device identifiers or hardware details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Financial Data:</strong> No payment information or financial details</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Use Data */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We use collected data solely to provide accurate speed test results and improve our service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Lock className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Primary Use</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Conduct accurate internet speed measurements</li>
                  <li>• Select optimal test servers based on your location</li>
                  <li>• Provide connection type and ISP information</li>
                  <li>• Display your test history during your session</li>
                  <li>• Optimize test methodology for better accuracy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Database className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Analytics & Improvement</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Analyze aggregate speed test trends (anonymized)</li>
                  <li>• Improve test accuracy and reliability</li>
                  <li>• Monitor service performance and uptime</li>
                  <li>• Identify and fix technical issues</li>
                  <li>• Optimize server performance globally</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Data Security & Storage</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We implement industry-standard security measures to protect your data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Encryption</h3>
                <p className="text-muted-foreground text-sm">
                  All data transmission is encrypted using HTTPS/TLS protocols. Your test data is protected 
                  during transfer and temporary storage.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Limited Storage</h3>
                <p className="text-muted-foreground text-sm">
                  Test results are stored temporarily in your browser session only. We don't maintain 
                  permanent databases of user test results.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">No Sharing</h3>
                <p className="text-muted-foreground text-sm">
                  We never sell, rent, or share your data with third parties. Your information stays 
                  private and is used only for speed testing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Your Privacy Rights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You have full control over your data and privacy settings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Your Rights Include:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Access:</strong> Request information about data we collect</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Deletion:</strong> Clear your session data at any time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Opt-out:</strong> Disable analytics tracking if desired</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Portability:</strong> Export your test history data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Correction:</strong> Update any inaccurate information</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">How to Exercise Your Rights:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Clear your browser data to remove all stored information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Use private/incognito browsing mode for anonymous testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Contact us for questions about data collection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Report any privacy concerns immediately</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Request detailed privacy information if needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Compliance & Regulations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We comply with international privacy laws and regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-muted-foreground text-sm">
                  We comply with the European General Data Protection Regulation (GDPR) requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">CCPA Compliant</h3>
                <p className="text-muted-foreground text-sm">
                  We follow California Consumer Privacy Act (CCPA) guidelines for data protection.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Privacy by Design</h3>
                <p className="text-muted-foreground text-sm">
                  Our service is built with privacy as a core principle from the ground up.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            If you have any questions about this privacy policy or how we handle your data, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help">
              <Button size="lg" className="gradient-bg text-white px-8 py-6">
                Get Help
              </Button>
            </Link>
            <Link href="/terms">
              <Button size="lg" variant="outline" className="px-8 py-6">
                View Terms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}