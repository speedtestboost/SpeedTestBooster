import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    // Update page title and meta description for SEO
    document.title = "Terms of Service - Speed Test & Boost | Usage Agreement";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for Speed Test & Boost. Usage agreement, service limitations, and legal information for our free internet speed testing tool.');
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
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-primary font-medium">
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
              Legal Information
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using Speed Test & Boost. By using our service, you agree to these terms and conditions.
            </p>
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Last updated: January 12, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Service</h3>
                <p className="text-muted-foreground text-sm">
                  Our internet speed testing service is completely free to use with no hidden charges or subscriptions.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fair Use</h3>
                <p className="text-muted-foreground text-sm">
                  Use our service reasonably and don't attempt to overload or abuse our testing infrastructure.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Warranty</h3>
                <p className="text-muted-foreground text-sm">
                  Service is provided "as is" without warranties. We strive for accuracy but cannot guarantee perfect results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Service Description</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding what Speed Test & Boost provides and how you can use it.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">What We Provide</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Free internet speed testing service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Download and upload speed measurements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Ping latency and jitter testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Network information and connection details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>WiFi optimization recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Test history during your session</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Service Limitations</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Results may vary based on network conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Service availability depends on server status</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>No guarantee of 100% accuracy in all conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>May be temporarily unavailable for maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Data usage applies when running tests</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Not responsible for ISP billing or charges</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Acceptable Use */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Acceptable Use Policy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Guidelines for using Speed Test & Boost responsibly and fairly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Permitted Uses</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Testing your internet connection speed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Diagnosing network performance issues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Monitoring your ISP's service quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Comparing speeds across different networks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Educational and research purposes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Reasonable testing frequency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold">Prohibited Uses</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Automated or excessive testing (abuse)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Attempting to overload our servers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Reverse engineering or hacking attempts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Using the service for illegal activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Interfering with other users' testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Commercial use without permission</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Disclaimers & Limitations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Important legal disclaimers and limitations of liability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Service Accuracy</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    While we strive to provide accurate speed test results, we cannot guarantee 100% accuracy in all conditions. 
                    Results may vary based on:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Network congestion and traffic</li>
                    <li>• Your device's hardware capabilities</li>
                    <li>• WiFi interference and signal strength</li>
                    <li>• Server load and geographic distance</li>
                    <li>• ISP throttling or traffic management</li>
                  </ul>
                  <p>
                    Use results as a general indication of your connection performance, not as definitive measurements.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Limitation of Liability</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Speed Test & Boost is provided "as is" without warranties of any kind. We are not liable for:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Inaccurate test results or measurements</li>
                    <li>• Data usage charges from your ISP</li>
                    <li>• Service interruptions or downtime</li>
                    <li>• Decisions made based on test results</li>
                    <li>• Any direct or indirect damages</li>
                  </ul>
                  <p>
                    Our total liability is limited to the amount you paid for the service (which is zero, as it's free).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Usage */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Data Usage & Charges</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Important information about data consumption and potential charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Data Consumption</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Each speed test consumes data to measure your connection. Typical usage:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete test: 10-50 MB</li>
                  <li>• Download test: 5-25 MB</li>
                  <li>• Upload test: 5-25 MB</li>
                  <li>• Ping test: &lt;1 MB</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Mobile Data Warning</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Be cautious when testing on mobile networks with limited data plans:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your data allowance first</li>
                  <li>• Consider using WiFi instead</li>
                  <li>• Monitor your usage carefully</li>
                  <li>• We're not responsible for charges</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">ISP Charges</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Your internet service provider may charge for data usage:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check your plan terms</li>
                  <li>• Monitor monthly usage</li>
                  <li>• Consider unlimited plans</li>
                  <li>• We don't control ISP billing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Changes to These Terms</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How we handle updates and modifications to our terms of service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    We may update these Terms of Service from time to time to reflect changes in our service, 
                    legal requirements, or business practices. When we make changes:
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>We'll update the "Last updated" date at the top of this page</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>For significant changes, we may display a notice on our website</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Your continued use of the service constitutes acceptance of new terms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>You can always review the current terms on this page</span>
                    </li>
                  </ul>
                  
                  <p>
                    If you don't agree with updated terms, please stop using our service. 
                    We recommend checking this page periodically for any changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            If you have questions about these Terms of Service, please contact us or review our help documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help">
              <Button size="lg" className="gradient-bg text-white px-8 py-6">
                Get Help
              </Button>
            </Link>
            <Link href="/privacy">
              <Button size="lg" variant="outline" className="px-8 py-6">
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}