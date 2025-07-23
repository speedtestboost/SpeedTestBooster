import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "How Fast Should Your Internet Be in 2025? Speed Requirements Guide",
    excerpt: "Discover the minimum internet speeds needed for streaming, gaming, work from home, and smart homes. Complete guide to choosing the right internet plan.",
    author: "Speed Test Team",
    date: "2025-01-23",
    readTime: "5 min read",
    category: "Speed Guides",
    slug: "internet-speed-requirements-2025",
    keywords: ["internet speed requirements", "how fast internet do I need", "speed for streaming"]
  },
  {
    id: 2,
    title: "Why Is My Internet So Slow? 12 Common Causes & Quick Fixes",
    excerpt: "Learn the most common reasons for slow internet speeds and step-by-step solutions to improve your connection. Troubleshoot WiFi issues like a pro.",
    author: "Speed Test Team", 
    date: "2025-01-22",
    readTime: "8 min read",
    category: "Troubleshooting",
    slug: "why-is-internet-slow-fixes",
    keywords: ["why is my internet slow", "slow internet fixes", "WiFi troubleshooting"]
  },
  {
    id: 3,
    title: "Best Internet Providers in India 2025: Speed Test Comparison",
    excerpt: "Compare internet speeds and performance across major Indian ISPs including Jio Fiber, Airtel, BSNL, and Vi. Real speed test data and user reviews.",
    author: "Speed Test Team",
    date: "2025-01-21", 
    readTime: "12 min read",
    category: "Provider Reviews",
    slug: "best-internet-providers-india-2025",
    keywords: ["best internet provider India", "Jio Fiber vs Airtel", "internet speed comparison"]
  },
  {
    id: 4,
    title: "5G vs Fiber Internet: Speed Test Results & Performance Analysis",
    excerpt: "Comprehensive comparison of 5G and fiber internet speeds, latency, and reliability. Which technology offers better performance for your needs?",
    author: "Speed Test Team",
    date: "2025-01-20",
    readTime: "10 min read", 
    category: "Technology",
    slug: "5g-vs-fiber-internet-speed-comparison",
    keywords: ["5G vs fiber", "5G internet speed", "fiber vs wireless internet"]
  },
  {
    id: 5,
    title: "How to Improve WiFi Speed: 15 Proven Methods That Actually Work",
    excerpt: "Boost your WiFi speed with these expert-tested techniques. From router placement to advanced settings, get faster internet in your home.",
    author: "Speed Test Team",
    date: "2025-01-19",
    readTime: "15 min read",
    category: "Optimization",
    slug: "improve-wifi-speed-guide",
    keywords: ["improve WiFi speed", "boost internet speed", "WiFi optimization"]
  },
  {
    id: 6,
    title: "Understanding Internet Speed Tests: Download, Upload, Ping & Jitter Explained",
    excerpt: "Learn what download speed, upload speed, ping, and jitter mean. How to interpret speed test results and what speeds you actually need.",
    author: "Speed Test Team",
    date: "2025-01-18", 
    readTime: "7 min read",
    category: "Education",
    slug: "understanding-internet-speed-test-results",
    keywords: ["what is download speed", "ping vs latency", "internet speed test explained"]
  }
];

export default function Blog() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  useEffect(() => {
    document.title = "Internet Speed & WiFi Blog - Tips, Guides & Reviews | Speed Test & Boost";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Expert guides on internet speed, WiFi optimization, ISP reviews, and network troubleshooting. Learn how to get faster internet and solve connection issues.');
    }
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://speedtestboost.com/blog';
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 min-h-[400px] flex items-center">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" stroke="url(#speedGradient)" strokeWidth="6" fill="none" className="animate-spin" style={{animationDuration: '8s'}} />
                    <path d="M50 20 L55 30 L45 30 Z" fill="url(#speedGradient)" className="animate-pulse" />
                    <circle cx="50" cy="50" r="4" fill="url(#speedGradient)" className="animate-pulse" />
                  </svg>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Speed Test & Boost
                </div>
              </Link>
              <div className="flex items-center space-x-4">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-6">
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Speed Test
                  </Link>
                  <Link href="/blog" className="text-primary font-medium">
                    Blog
                  </Link>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                    Help & FAQ
                  </Link>
                </div>
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
                >
                  {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="lg:hidden mt-4 py-4 border-t border-border/20">
                <div className="flex flex-col space-y-3">
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors py-2">
                    Speed Test
                  </Link>
                  <Link href="/blog" className="text-primary font-medium py-2">
                    Blog
                  </Link>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors py-2">
                    About
                  </Link>
                  <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors py-2">
                    Help & FAQ
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Header Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Internet Speed Blog
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Expert guides, tips, and insights to optimize your internet connection and solve speed issues
          </p>
        </div>
      </header>

      {/* Blog Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        {/* Featured Categories */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {["Speed Guides", "Troubleshooting", "Provider Reviews", "Technology", "Optimization", "Education"].map((category) => (
            <Badge key={category} variant="secondary" className="text-sm px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </div>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Internet Speed Tips</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get weekly tips on improving your internet speed, troubleshooting connection issues, and staying informed about the latest networking technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer with SEO-optimized content */}
      <footer className="bg-muted/30 border-t border-border/40 mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-primary">Speed Test Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">Internet Speed Test</Link></li>
                <li><Link href="/mumbai-speed-test" className="hover:text-primary transition-colors">Mumbai Speed Test</Link></li>
                <li><Link href="/delhi-speed-test" className="hover:text-primary transition-colors">Delhi Speed Test</Link></li>
                <li><Link href="/bangalore-speed-test" className="hover:text-primary transition-colors">Bangalore Speed Test</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-primary">Speed Guides</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog/internet-speed-requirements-2025" className="hover:text-primary transition-colors">Speed Requirements</Link></li>
                <li><Link href="/blog/improve-wifi-speed-guide" className="hover:text-primary transition-colors">Improve WiFi Speed</Link></li>
                <li><Link href="/blog/why-is-internet-slow-fixes" className="hover:text-primary transition-colors">Fix Slow Internet</Link></li>
                <li><Link href="/blog/understanding-internet-speed-test-results" className="hover:text-primary transition-colors">Understand Results</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-primary">Provider Reviews</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog/best-internet-providers-india-2025" className="hover:text-primary transition-colors">Best ISPs in India</Link></li>
                <li><Link href="/blog/5g-vs-fiber-internet-speed-comparison" className="hover:text-primary transition-colors">5G vs Fiber</Link></li>
                <li>Jio Fiber Review</li>
                <li>Airtel Broadband Review</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-primary">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/help" className="hover:text-primary transition-colors">Help & FAQ</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Speed Test & Boost. Free internet speed testing and network optimization tools.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}