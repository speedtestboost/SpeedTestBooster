import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ChevronRight, HelpCircle } from "lucide-react";

export default function SpeedTestFAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set page title and meta tags
    document.title = "Internet Speed Test FAQ - Common Questions Answered | Speed Test & Boost";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get answers to the most common speed test questions. Learn why your speed test shows fast but internet feels slow, what speeds you need for Zoom and gaming, how to improve results, and more.');
    }

    // Update canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://speedtestboost.com/speed-test-faq';
    document.head.appendChild(canonical);

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

    const createOrUpdateKeywordsMetaTag = (content: string) => {
      let metaTag = document.querySelector('meta[name="keywords"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', 'keywords');
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    createOrUpdateMetaTag('og:title', 'Speed Test FAQ - Your Questions Answered');
    createOrUpdateMetaTag('og:description', 'Common speed test questions answered: Why is my test fast but internet slow? What speed for Zoom? How to improve results? Expert answers to 18+ FAQ.');
    createOrUpdateMetaTag('og:type', 'article');
    createOrUpdateMetaTag('og:url', 'https://speedtestboost.com/speed-test-faq');
    
    createOrUpdateTwitterMetaTag('twitter:card', 'summary_large_image');
    createOrUpdateTwitterMetaTag('twitter:title', 'Speed Test FAQ - Common Questions Answered');
    createOrUpdateTwitterMetaTag('twitter:description', 'Get answers to common speed test questions. Learn about speed requirements, troubleshooting, and optimizing your internet connection.');
    
    createOrUpdateKeywordsMetaTag('speed test faq, speed test showing fast but slow internet, speed test for zoom, gaming speed test, internet speed requirements, how to improve speed test, speed test results explained, speed test slower than expected');

    // FAQ Schema structured data
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is my speed test showing fast but my internet feels slow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This is one of the most common frustrations people experience. Your speed test might show 100 Mbps or higher, but web pages load slowly, videos buffer, or downloads crawl. The issue isn't your speed - it's usually about latency, network congestion, DNS problems, or server-side issues. Speed tests measure your connection to a nearby test server under ideal conditions, but real internet usage involves connecting to servers worldwide, often during peak times."
          }
        },
        {
          "@type": "Question",
          "name": "What internet speed do I need for Zoom calls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For standard Zoom video calls, you need at least 3 Mbps download and 3 Mbps upload for HD quality (720p). For Full HD (1080p) calls, Zoom recommends 3.8 Mbps download and upload. However, these are minimums - I recommend having at least 10-15 Mbps to account for other devices on your network and to ensure smooth, uninterrupted calls."
          }
        },
        {
          "@type": "Question",
          "name": "What's the best speed for gaming?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For online gaming, download speed isn't as critical as you might think. Most games run smoothly on just 3-6 Mbps download. What really matters for gaming is low ping (latency) and low jitter. Aim for ping under 20ms for competitive gaming, under 50ms for casual gaming. Jitter should be below 5ms."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good internet speed test result?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good speed test result depends on your needs. For basic browsing and email, 10-25 Mbps is fine. For HD streaming and video calls, aim for 25-50 Mbps. For 4K streaming, gaming, and multiple users, 100-200 Mbps is ideal. Your actual speed should be close to what you're paying for - if you're getting less than 80% of your plan's advertised speed, contact your ISP."
          }
        },
        {
          "@type": "Question",
          "name": "How can I improve my speed test results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To improve your speed test results: connect via Ethernet cable instead of WiFi, close all unnecessary programs and browser tabs, restart your modem and router, move closer to your router if using WiFi, update your router firmware, change your WiFi channel to avoid interference, and make sure no one else is streaming or downloading during the test."
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptTag);

    // Cleanup function to remove added elements
    return () => {
      if (canonical.parentNode) {
        canonical.parentNode.removeChild(canonical);
      }
      if (scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  const faqs = [
    { id: "fast-but-slow", title: "Why is my speed test showing fast but my internet feels slow?" },
    { id: "inconsistent", title: "Why do I get different results every time I test?" },
    { id: "good-speed", title: "What is a good internet speed test result?" },
    { id: "zoom-requirements", title: "What internet speed do I need for Zoom calls?" },
    { id: "gaming-speed", title: "What's the best speed for gaming?" },
    { id: "upload-vs-download", title: "What's the difference between upload and download speed?" },
    { id: "ping-jitter", title: "What do ping and jitter mean in my speed test?" },
    { id: "improve-results", title: "How can I improve my speed test results?" },
    { id: "slower-than-plan", title: "Why is my speed test slower than what I'm paying for?" },
    { id: "4k-streaming", title: "How much speed do I need for 4K streaming?" },
    { id: "wifi-vs-ethernet", title: "Should I test speed on WiFi or Ethernet?" },
    { id: "when-to-test", title: "When is the best time to run a speed test?" },
    { id: "multiple-devices", title: "How do multiple devices affect my speed test?" },
    { id: "vpn-impact", title: "Does using a VPN affect my speed test?" },
    { id: "mobile-vs-desktop", title: "Why is my mobile speed test different from desktop?" },
    { id: "netflix-buffering", title: "Speed test shows 100 Mbps but Netflix keeps buffering - why?" },
    { id: "accurate-test", title: "How do I run the most accurate speed test?" },
    { id: "isp-throttling", title: "Is my ISP throttling my connection?" }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Speed Test FAQ', href: '/speed-test-faq' }
  ];

  return (
    <>

      <div className="min-h-screen bg-background">
        <Header currentPath="/speed-test-faq" />
        
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="h-10 w-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Speed Test FAQ - Your Questions Answered
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about internet speed testing, troubleshooting slow connections, and understanding your results.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-muted/30 rounded-lg p-6 mb-12 border border-border/50">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 text-primary mr-2" />
              Table of Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-2">
              {faqs.map((faq, index) => (
                <a
                  key={faq.id}
                  href={`#${faq.id}`}
                  className="text-primary hover:underline text-sm flex items-start space-x-2"
                  data-testid={`toc-link-${faq.id}`}
                >
                  <span className="text-muted-foreground">{index + 1}.</span>
                  <span>{faq.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-12">
            {/* Q1 */}
            <div id="fast-but-slow" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-fast-but-slow">
                1. Why is my speed test showing fast but my internet feels slow?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This is hands down the most frustrating problem people face, and you're definitely not alone. Your speed test proudly displays 100 Mbps, 200 Mbps, or even higher - yet somehow your YouTube videos buffer, web pages take forever to load, and downloads feel painfully slow.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Here's the thing: speed tests measure your connection to a nearby test server under perfect conditions. But in real-world internet use, you're connecting to servers all over the world, often during peak hours when everyone else is online too. Think of it like testing your car's speed on an empty highway versus driving through rush hour traffic.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The main culprits are usually:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">
                <li><strong>High latency (ping):</strong> If your ping is over 100ms, everything will feel sluggish even with fast download speeds. It's the delay between clicking and getting a response.</li>
                <li><strong>DNS issues:</strong> Your DNS server translates website names into addresses. A slow DNS can add 2-3 seconds to every page load.</li>
                <li><strong>Network congestion:</strong> Too many devices on your network competing for bandwidth - smart TVs, phones, tablets, gaming consoles all eating up your connection.</li>
                <li><strong>Server-side problems:</strong> Sometimes the website you're trying to reach is simply slow or overloaded. Not your fault at all.</li>
                <li><strong>ISP throttling:</strong> Some internet providers slow down certain types of traffic like streaming or torrenting, especially during peak hours.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Try switching to a faster DNS like Google (8.8.8.8) or Cloudflare (1.1.1.1), restart your router, limit devices during important tasks, and test at different times of day. If the problem persists, your ISP might be the issue.
              </p>
            </div>

            {/* Q2 */}
            <div id="inconsistent" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-inconsistent">
                2. Why do I get different results every time I test?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                It's completely normal for speed test results to vary by 10-30% between tests. Your internet connection isn't like a water pipe with constant flow - it's more like a highway with variable traffic.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Several factors cause these fluctuations. Network congestion changes minute by minute as people in your neighborhood and across your ISP's network get online and offline. Your test might connect to different servers each time, some closer or faster than others. Background processes on your device - automatic updates, cloud syncing, apps refreshing - can steal bandwidth without you realizing it.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                WiFi interference plays a huge role too. Your microwave, baby monitors, neighboring WiFi networks, and even walls between you and your router affect signal strength. The time of day matters tremendously - testing at 3 PM when everyone's streaming will give different results than 3 AM when most people are asleep.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For the most accurate picture, run 3-5 tests at different times of day over several days, then average them. If your results vary wildly (like 100 Mbps one minute and 10 Mbps the next), that indicates a problem worth investigating - possibly router issues, WiFi interference, or ISP problems.
              </p>
            </div>

            {/* Q3 */}
            <div id="good-speed" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-good-speed">
                3. What is a good internet speed test result?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                There's no one-size-fits-all answer because it depends entirely on what you do online. Let me break it down by usage:
              </p>
              <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                <h3 className="font-bold mb-2 text-foreground">Basic Use (Email, Browsing):</h3>
                <p className="text-muted-foreground">10-25 Mbps download, 3-5 Mbps upload - Perfectly fine for one or two people doing basic tasks.</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                <h3 className="font-bold mb-2 text-foreground">HD Streaming & Video Calls:</h3>
                <p className="text-muted-foreground">25-50 Mbps download, 5-10 Mbps upload - Handles Netflix, Zoom calls, and moderate household use.</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                <h3 className="font-bold mb-2 text-foreground">4K Streaming, Gaming, Multiple Users:</h3>
                <p className="text-muted-foreground">100-200 Mbps download, 10-25 Mbps upload - Ideal for families, remote work, and heavy internet use.</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                <h3 className="font-bold mb-2 text-foreground">Power Users & Large Households:</h3>
                <p className="text-muted-foreground">300+ Mbps download, 35+ Mbps upload - For extensive streaming, large file uploads, smart homes with many devices.</p>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Beyond raw speed numbers, pay attention to these metrics:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">
                <li><strong>Ping:</strong> Under 20ms is excellent (great for gaming), 20-50ms is good, 50-100ms is acceptable, over 100ms indicates problems</li>
                <li><strong>Jitter:</strong> Under 5ms is ideal, under 10ms is acceptable, over 20ms causes issues with video calls and gaming</li>
                <li><strong>Upload speed:</strong> Should be at least 10-20% of your download speed, ideally more if you video call or upload files regularly</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Most importantly, you should consistently get at least 80% of your plan's advertised speed. If you're paying for 100 Mbps but only getting 40-50 Mbps regularly, something's wrong - time to troubleshoot or call your ISP.
              </p>
            </div>

            {/* Q4 */}
            <div id="zoom-requirements" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-zoom-requirements">
                4. What internet speed do I need for Zoom calls?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Zoom's official requirements are actually quite modest, but real-world experience teaches us to aim higher than the minimums. Here's what you actually need:
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>For standard one-on-one video calls:</strong> Zoom says 1.5 Mbps download and upload is enough. But honestly? That's cutting it way too close. I recommend at least 3-5 Mbps in both directions for smooth HD video without freezing or pixelation.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>For group video calls (3+ people):</strong> The official requirement is 3 Mbps down and up for 720p HD. In practice, aim for 10-15 Mbps to ensure everyone appears clearly and you don't freeze when screen sharing.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>For hosting large meetings or webinars:</strong> If you're presenting to dozens of people, especially with screen sharing or virtual backgrounds, you'll want 15-25 Mbps upload speed. This is often overlooked - people focus on download but upload matters more when YOU'RE the one broadcasting.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>The upload speed trap:</strong> Many internet plans have asymmetric speeds - like 100 Mbps download but only 10 Mbps upload. That 100 Mbps is useless for Zoom because what matters is sending your video to others (upload). Check your upload speed specifically.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Pro tips: Use Ethernet instead of WiFi for important calls. Close bandwidth-heavy apps like cloud backup or streaming. If others share your connection, ask them not to stream during your meetings. Low ping (under 50ms) is also crucial - high latency causes that awkward delay where people talk over each other.
              </p>
            </div>

            {/* Q5 */}
            <div id="gaming-speed" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-gaming-speed">
                5. What's the best speed for gaming?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Here's a secret that might surprise you: for online gaming itself, you don't need blazing fast internet. Most games use surprisingly little bandwidth - typically just 3-6 Mbps download. Even competitive shooters or MMOs rarely exceed 10 Mbps.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>What REALLY matters for gaming isn't speed - it's latency.</strong> This is where many people get confused. A 50 Mbps connection with 15ms ping will give you a far better gaming experience than a 500 Mbps connection with 100ms ping.
              </p>
              <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                <h3 className="font-bold mb-2 text-foreground">Ping (Latency) Requirements:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>0-20ms:</strong> Excellent - Perfect for competitive gaming (Fortnite, CS:GO, Valorant)</li>
                  <li><strong>20-50ms:</strong> Good - Smooth experience for most games</li>
                  <li><strong>50-100ms:</strong> Acceptable - Playable but you might notice slight delays</li>
                  <li><strong>100ms+:</strong> Poor - Laggy, frustrating, uncompetitive</li>
                </ul>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Jitter</strong> is the other critical metric most gamers ignore. It measures consistency of your ping. You want jitter under 5ms ideally, definitely under 10ms. High jitter causes rubber-banding where your character jumps around unpredictably.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>When you DO need high speeds for gaming:</strong> Game downloads and updates. Modern games are 50-150 GB. With 50 Mbps, a 100 GB game takes about 4.5 hours. With 500 Mbps, it's under 30 minutes. If you stream your gameplay to Twitch or YouTube, you need 5-10 Mbps upload for 1080p streaming.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Recommendation:</strong> For smooth gaming: 25-50 Mbps download, 5-10 Mbps upload, ping under 50ms, jitter under 10ms. Use wired Ethernet - WiFi adds 10-30ms latency. Close background downloads and streams. Play on servers closest to your location.
              </p>
            </div>

            {/* Q6 */}
            <div id="upload-vs-download" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-upload-vs-download">
                6. What's the difference between upload and download speed?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Think of your internet connection like a two-way street. Download speed is how fast data comes TO you from the internet. Upload speed is how fast you can send data OUT to the internet.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Download speed</strong> affects activities like: Watching Netflix, browsing websites, downloading files, playing online games (receiving game data), scrolling social media, listening to Spotify. This is what most people care about because it's what they notice most.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Upload speed</strong> matters for: Video calls (sending your video to others), uploading photos to Instagram or Google Photos, sending large email attachments, live streaming on Twitch/YouTube, cloud backup services, online gaming (sending your actions to the server), posting videos to TikTok.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Most residential internet plans are "asymmetric" - meaning download is much faster than upload. A typical plan might offer 100 Mbps download but only 10 Mbps upload. This is fine for most people, but if you work from home doing lots of video calls or you're a content creator uploading videos, that slow upload becomes a major bottleneck.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>How much upload do you need?</strong> For casual use (social media, occasional video calls): 3-5 Mbps is okay. For regular video calls and moderate uploads: 10-25 Mbps is better. For content creators, streamers, or working from home: 25-50 Mbps or more. Fiber internet often offers symmetric speeds (same upload and download), which is ideal if you do anything upload-heavy.
              </p>
            </div>

            {/* Q7 */}
            <div id="ping-jitter" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-ping-jitter">
                7. What do ping and jitter mean in my speed test?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                While everyone focuses on download speed, ping and jitter are often more important for how your internet actually feels to use.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Ping (also called latency)</strong> measures the round-trip time for data to travel from your device to a server and back. It's measured in milliseconds (ms). Think of it like this: when you click a link, ping is the delay before anything starts happening. Low ping means instant response. High ping means noticeable lag.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Real-world impact: With 10ms ping, web pages feel instant and snappy. With 100ms ping, there's a slight but noticeable delay. With 200ms+ ping, everything feels sluggish and unresponsive. For gaming, every millisecond matters - 20ms vs 100ms can be the difference between winning and losing a gunfight.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Jitter</strong> measures how much your ping varies. If your ping bounces between 20ms and 80ms, that's high jitter. Stable ping that stays around 30ms is low jitter. Jitter is especially important for real-time applications like video calls and gaming because it causes choppy audio, frozen video, and unpredictable lag.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>What causes high ping and jitter?</strong> Distance to servers (connecting to a server across the ocean adds 100-200ms), network congestion, WiFi interference, router quality, ISP routing inefficiencies, too many devices on your network, and background downloads.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>How to improve ping and jitter:</strong> Use Ethernet instead of WiFi (can cut latency in half), choose servers closer to you, upgrade your router if it's old, reduce devices on your network, enable QoS (Quality of Service) in your router settings to prioritize gaming and calls, and contact your ISP if ping is consistently over 100ms to nearby servers.
              </p>
            </div>

            {/* Q8 */}
            <div id="improve-results" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-improve-results">
                8. How can I improve my speed test results?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Getting accurate and optimal speed test results requires eliminating variables that can slow down your connection. Here's a comprehensive checklist:
              </p>
              <div className="space-y-4 mb-4">
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <h3 className="font-bold mb-2 text-foreground">Immediate Actions (Do Before Testing):</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Connect via Ethernet cable - WiFi always adds overhead and interference</li>
                    <li>Close all programs and browser tabs except the speed test</li>
                    <li>Pause cloud backup services (Dropbox, Google Drive, OneDrive)</li>
                    <li>Stop any downloads or uploads</li>
                    <li>Disable VPN - it adds latency and can reduce speeds by 20-50%</li>
                    <li>Make sure no one else is using the network (no streaming, gaming, or video calls)</li>
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <h3 className="font-bold mb-2 text-foreground">Router Optimization:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Restart your modem and router - unplug for 30 seconds, plug back in</li>
                    <li>Update router firmware through your router's admin panel</li>
                    <li>Change WiFi channel - use 1, 6, or 11 for 2.4GHz to avoid interference</li>
                    <li>Position router centrally, elevated, away from walls and metal objects</li>
                    <li>Switch to 5GHz WiFi if your device supports it (faster, less interference)</li>
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <h3 className="font-bold mb-2 text-foreground">Device Optimization:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Clear browser cache and cookies</li>
                    <li>Update your network drivers</li>
                    <li>Scan for malware - viruses can use your bandwidth</li>
                    <li>Disable bandwidth-hogging browser extensions</li>
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <h3 className="font-bold mb-2 text-foreground">If Problems Persist:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Test at different times - speeds often drop during evening peak hours (6-11 PM)</li>
                    <li>Upgrade old router (anything over 5 years old should be replaced)</li>
                    <li>Check for bandwidth thieves - someone might be using your WiFi without permission</li>
                    <li>Contact ISP if consistently getting less than 80% of advertised speeds</li>
                    <li>Consider upgrading internet plan if your current speeds can't meet your needs</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                After implementing these changes, run multiple tests over several days to get an average. One test isn't enough - network conditions vary constantly.
              </p>
            </div>

            {/* Q9 */}
            <div id="slower-than-plan" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-slower-than-plan">
                9. Why is my speed test slower than what I'm paying for?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This is incredibly frustrating - you're paying for 100 Mbps but getting 30-40 Mbps. Before calling your ISP angry, let's understand what's normal and what's not.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>First, the fine print:</strong> ISPs advertise "up to" speeds, not guaranteed speeds. Some overhead is normal - getting 80-95% of your advertised speed is actually pretty good. But if you're consistently getting less than 70%, something's wrong.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Common reasons for slow speeds:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">
                <li><strong>WiFi limitations:</strong> Even if your plan is 200 Mbps, old WiFi routers max out at 50-100 Mbps. Your device's WiFi card also has limits. This is why Ethernet testing is crucial.</li>
                <li><strong>Network congestion:</strong> During peak hours (evenings and weekends), speeds slow as everyone in your area streams and downloads simultaneously.</li>
                <li><strong>Old equipment:</strong> ISP-provided modem/router combos are often outdated. They might not support your full speed.</li>
                <li><strong>Too many connected devices:</strong> 10-20 devices all connected (even if not actively used) can bog down your router.</li>
                <li><strong>ISP throttling:</strong> Some ISPs deliberately slow certain traffic (streaming, torrenting) or throttle heavy users.</li>
                <li><strong>Infrastructure issues:</strong> Old cables, damaged lines, or ISP network problems in your area.</li>
              </ul>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>How to troubleshoot:</strong> Test via Ethernet directly to modem (bypassing router). Test at 3 AM when network is quiet. Use multiple speed test sites. Document results over several days. If consistently slow, call ISP - they can check for line issues and may need to send a technician.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Know your rights:</strong> If you're paying for a service you're not getting, demand account credits or plan downgrades. Some consumer protection laws require ISPs to deliver advertised speeds within a reasonable margin.
              </p>
            </div>

            {/* Q10 */}
            <div id="4k-streaming" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-4k-streaming">
                10. How much speed do I need for 4K streaming?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                4K streaming requires significantly more bandwidth than HD, and the requirements vary by service. Here's the real-world breakdown:
              </p>
              <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                <h3 className="font-bold mb-2 text-foreground">Official Minimum Requirements by Service:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li><strong>Netflix 4K:</strong> 15 Mbps minimum (25 Mbps recommended)</li>
                  <li><strong>YouTube 4K:</strong> 20 Mbps minimum</li>
                  <li><strong>Disney+ 4K:</strong> 25 Mbps minimum</li>
                  <li><strong>Amazon Prime 4K:</strong> 15 Mbps minimum</li>
                  <li><strong>Apple TV+ 4K:</strong> 25 Mbps minimum</li>
                </ul>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Real-world recommendation:</strong> Those are minimums for one device. In practice, I recommend at least 50-100 Mbps for comfortable 4K streaming, especially if multiple people use your internet. Here's why:
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                When Netflix says "15 Mbps," they mean constant, dedicated 15 Mbps. But your actual speed fluctuates. Other devices on your network use bandwidth even when idle. Video quality auto-adjusts based on available bandwidth - if speed dips, you'll see annoying quality drops and buffering.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Multiple devices scenario:</strong> If two people want to watch 4K simultaneously, you need 30-50 Mbps just for that. Add phones, tablets, smart home devices, and someone gaming - suddenly 100 Mbps seems barely adequate.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Pro tips:</strong> Use Ethernet for 4K smart TVs when possible - WiFi is less reliable. Close background apps and downloads during 4K streaming. Check if your TV actually supports 4K (many "4K TVs" have limited codec support). Some ISPs offer 4K streaming optimization - ask about it. HDR content uses even more bandwidth than regular 4K.
              </p>
            </div>

            {/* Q11 */}
            <div id="wifi-vs-ethernet" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-wifi-vs-ethernet">
                11. Should I test speed on WiFi or Ethernet?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                For accurate testing of your actual internet connection, always use Ethernet. For testing what speeds you'll actually get in daily use, test on WiFi. Let me explain the difference:
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Ethernet testing</strong> removes all WiFi-related variables. It shows you the pure speed between your ISP and your home. This is what you should use when troubleshooting with your ISP or determining if you're getting what you pay for. If Ethernet is slow, the problem is with your modem, your ISP, or their infrastructure.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>WiFi testing</strong> shows real-world performance - what you actually experience day-to-day. Most people use WiFi for everything nowadays, so this matters too. WiFi is almost always slower than Ethernet, and that's normal.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Expected WiFi vs Ethernet differences:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">
                <li><strong>Same room as router:</strong> WiFi might be 70-90% of Ethernet speed</li>
                <li><strong>One room away:</strong> WiFi drops to 50-70% of Ethernet</li>
                <li><strong>Two rooms or upstairs:</strong> WiFi could be 30-50% of Ethernet</li>
                <li><strong>Far away or through multiple walls:</strong> WiFi might be only 20-30% of Ethernet</li>
              </ul>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Why WiFi is slower:</strong> Signal degradation through walls, interference from other WiFi networks and devices (microwaves, baby monitors), distance from router, number of connected devices, older WiFi standards (WiFi 4/5 vs WiFi 6), and device limitations (your phone's WiFi chip might not support full speeds).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Best practice:</strong> Test both. If Ethernet is fast but WiFi is slow, your router is the bottleneck - upgrade it or improve placement. If both are slow, contact your ISP. For critical applications (gaming PC, work computer, streaming TV), use Ethernet whenever physically possible.
              </p>
            </div>

            {/* Q12 */}
            <div id="when-to-test" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-when-to-test">
                12. When is the best time to run a speed test?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Time of day dramatically affects your speed test results because internet networks experience peak and off-peak usage patterns, just like roads during rush hour.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Worst times to test (slowest speeds):</strong> 6 PM to 11 PM on weekdays and weekends - This is prime time when everyone's home streaming, gaming, and browsing. You might see 30-50% slower speeds than off-peak. Sunday evenings are particularly congested.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Best times to test (fastest speeds):</strong> 2 AM to 6 AM - Network is nearly empty. Early mornings (6 AM to 9 AM) on weekdays are also good. Mid-afternoon (1 PM to 4 PM) on weekdays is decent.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>For troubleshooting purposes:</strong> Test at multiple times to get the full picture. Run tests at 3 AM (baseline - this shows what your connection is capable of), 8 AM (morning usage), 3 PM (afternoon), and 8 PM (peak evening). If 3 AM is fast but 8 PM is terrible, that's network congestion, not a technical fault.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>When contacting ISP:</strong> Document speed tests from different times. They can't fix congestion issues as easily as technical faults, but persistent extreme slowdowns during peak hours might indicate they're overselling their network capacity in your area.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Pro tip:</strong> If you consistently need fast speeds during peak hours (work from home, evening gaming), this should factor into your internet plan choice. Sometimes paying for a higher tier means better performance during congested periods even if off-peak speeds would be adequate at a lower tier.
              </p>
            </div>

            {/* Q13 */}
            <div id="multiple-devices" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-multiple-devices">
                13. How do multiple devices affect my speed test?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Every device connected to your network shares your total bandwidth like slices of a pie. The more devices, the smaller each slice becomes. But it's more complex than simple division.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Active vs passive devices:</strong> A phone just sitting idle checking email occasionally uses minimal bandwidth. But someone streaming 4K Netflix actively consumes 15-25 Mbps constantly. Smart home devices (thermostats, cameras, lights) use little bandwidth individually but add up when you have 20+ devices.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Real-world impact:</strong> Let's say you have 100 Mbps internet. If you run a speed test alone, you might get 95 Mbps. Run it while someone streams Netflix (using 10 Mbps), and you'll get around 85 Mbps. Add someone gaming (5 Mbps) and two people browsing (10 Mbps combined), now you're down to 70 Mbps on your test.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Router limitations:</strong> Beyond bandwidth sharing, routers have processing limits. Cheap routers struggle with 15+ simultaneous connections even if bandwidth is available. This causes slowdowns and disconnections regardless of your internet speed.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>How many devices is too many?</strong> Average household has 10-25 connected devices now. For 1-5 devices, 50 Mbps is adequate. For 5-10 devices, aim for 100-200 Mbps. For 10-20 devices (smart home, multiple users), 200-500 Mbps recommended. For 20+ devices, consider gigabit (1000 Mbps) and a quality router.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>To test accurately:</strong> Temporarily disconnect all devices except your test device, or test via Ethernet with WiFi disabled. This isolates your internet connection from router congestion issues. If it's fast isolated but slow normally, you need better router management or fewer simultaneous connections.
              </p>
            </div>

            {/* Q14 */}
            <div id="vpn-impact" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-vpn-impact">
                14. Does using a VPN affect my speed test?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Yes, absolutely. VPNs almost always reduce your speed test results, and that's completely normal. The question isn't if a VPN will slow you down, but how much.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Why VPNs slow your connection:</strong> Your data takes a longer route (your device → VPN server → destination instead of direct). Encryption/decryption processing adds overhead. VPN server quality and load matters - cheap VPNs with overloaded servers are terrible. Distance to VPN server increases latency significantly.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Typical speed impact:</strong> Good VPNs (NordVPN, ExpressVPN, ProtonVPN): 10-30% speed reduction. Medium VPNs: 30-50% reduction. Free or poor VPNs: 50-80% reduction (sometimes worse). These are rough estimates - your experience varies based on server location, time of day, and protocol used.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Latency impact:</strong> Ping increases dramatically with VPNs. If you normally have 15ms ping, connecting to a VPN server in the same country might increase it to 30-50ms. International VPN servers can add 100-200ms or more. This makes gaming and video calls notably worse.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>For accurate speed testing:</strong> Always disable your VPN before testing to measure your actual internet connection. Speed test with VPN enabled tells you what speeds you'll get while using the VPN, which is useful separately but isn't testing your ISP connection.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Optimizing VPN speed:</strong> Choose VPN servers closest to you geographically. Use WireGuard protocol instead of OpenVPN (often 50% faster). Avoid free VPNs - they're slow and questionable privacy-wise. Test different VPN server locations - some are faster than others. For activities needing full speed (streaming, downloads), temporarily disable VPN if privacy isn't critical.
              </p>
            </div>

            {/* Q15 */}
            <div id="mobile-vs-desktop" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-mobile-vs-desktop">
                15. Why is my mobile speed test different from desktop?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                It's super common to see different speeds on mobile versus desktop, and several factors explain this:
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>WiFi hardware differences:</strong> Desktop computers, especially newer ones or those with dedicated WiFi cards, often have better WiFi antennas and support newer standards (WiFi 6/6E). Phones have smaller, less powerful WiFi chips constrained by size and battery considerations. Older phones might only support WiFi 4 or 5, maxing out at 100-300 Mbps regardless of your internet speed.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Desktop Ethernet advantage:</strong> If your desktop is wired via Ethernet but your phone uses WiFi, desktop will almost always be faster. Ethernet removes WiFi-related limitations entirely.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Processing power:</strong> Speed tests require CPU power to handle data processing. High-end desktops can handle faster speeds than budget phones. On very fast connections (500+ Mbps), weak devices might become the bottleneck.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Mobile data vs WiFi confusion:</strong> Make sure your phone is actually connected to WiFi, not cellular data. Many phones automatically switch between WiFi and mobile data, giving inconsistent results.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Battery saver mode:</strong> Phones in power-saving mode throttle WiFi performance to conserve battery. Disable battery saver during testing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Which is "correct"?</strong> Both are correct for their respective devices. If you primarily use your phone, its speed is what matters to you. For ISP troubleshooting, test on your newest/best device or via Ethernet to show maximum possible speed. Significant differences between devices suggests router or WiFi configuration issues rather than ISP problems.
              </p>
            </div>

            {/* Q16 */}
            <div id="netflix-buffering" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-netflix-buffering">
                16. Speed test shows 100 Mbps but Netflix keeps buffering - why?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                This is incredibly frustrating and more common than you'd think. Your speed test proudly displays triple-digit speeds, yet Netflix freezes every few minutes. The problem isn't your speed - it's usually one of these culprits:
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>1. ISP throttling streaming traffic:</strong> Some internet providers deliberately slow down Netflix, YouTube, and other streaming services while leaving speed test sites untouched. They want your speed tests to look good but don't want to handle the bandwidth load of streaming. This is technically legal in many places but ethically questionable. Test: Use a VPN and see if Netflix suddenly works fine - if so, your ISP is likely throttling.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>2. WiFi congestion and interference:</strong> Your speed test might hit a nearby server with great WiFi signal, but your smart TV in another room has weak signal. Netflix needs sustained bandwidth - one brief dropout causes buffering even if average speed is high.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>3. Netflix server issues:</strong> Sometimes Netflix's own content delivery network (CDN) has problems. Your connection to Netflix's servers might be slow even though your general internet is fast. Try other streaming services - if they work fine, it's Netflix-specific.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>4. Smart TV limitations:</strong> Many smart TVs have terrible WiFi chips and outdated software. They can't handle the speeds your other devices easily achieve. An old TV might max out at 30-40 Mbps on WiFi even if your internet is 200 Mbps.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>5. Background bandwidth hogs:</strong> Your speed test used all available bandwidth for 30 seconds. But during Netflix, your phone is backing up photos, laptop is updating Windows, smart devices are syncing - collectively stealing bandwidth that Netflix needs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Solutions to try:</strong> Connect smart TV via Ethernet cable - solves most issues instantly. Use a streaming device (Roku, Fire Stick, Apple TV) instead of built-in smart TV apps - much better WiFi and processing. Change DNS to Google (8.8.8.8) or Cloudflare (1.1.1.1). Restart TV and router. Reduce video quality temporarily in Netflix settings to see if it's a speed issue. Call ISP and specifically mention Netflix buffering - they may need to address throttling or routing issues.
              </p>
            </div>

            {/* Q17 */}
            <div id="accurate-test" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-accurate-test">
                17. How do I run the most accurate speed test?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Getting truly accurate speed test results requires following a specific protocol to eliminate variables. Here's the step-by-step process professionals use:
              </p>
              <div className="space-y-4 mb-4">
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-bold mb-2 text-foreground">Step 1: Prepare Your Setup</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Use Ethernet cable directly to modem (bypassing router if possible)</li>
                    <li>If WiFi testing, sit next to router with clear line of sight</li>
                    <li>Use a modern computer - old devices can't handle high speeds</li>
                    <li>Close absolutely everything - browsers, apps, background processes</li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-bold mb-2 text-foreground">Step 2: Eliminate Interference</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Disconnect all other devices from network (phones, tablets, smart TVs, IoT devices)</li>
                    <li>Disable VPN, proxy, and security software temporarily</li>
                    <li>Pause cloud backup services</li>
                    <li>Clear browser cache</li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-bold mb-2 text-foreground">Step 3: Restart Everything</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Restart your computer</li>
                    <li>Unplug modem and router for 30 seconds</li>
                    <li>Plug modem in first, wait 2 minutes for full startup</li>
                    <li>Then plug in router, wait 2 minutes</li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-bold mb-2 text-foreground">Step 4: Test Multiple Times and Services</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Run 5 tests on same service, note results</li>
                    <li>Try multiple test services (Ookla, Fast.com, Google Speed Test, this site)</li>
                    <li>Test at different times of day (early morning, afternoon, evening, late night)</li>
                    <li>Calculate average of all tests - this is your true speed</li>
                  </ul>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-bold mb-2 text-foreground">Step 5: Document Everything</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Record date, time, and all three metrics (download, upload, ping)</li>
                    <li>Note testing method (WiFi vs Ethernet)</li>
                    <li>Screenshot results if contacting ISP</li>
                    <li>Track over several days for patterns</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Common testing mistakes to avoid:</strong> Testing only once (one test proves nothing), testing on WiFi only, testing while others use network, testing with VPN enabled, comparing different test services (they use different servers and methods), testing on outdated devices, and expecting exactly advertised speed (some overhead is normal).
              </p>
            </div>

            {/* Q18 */}
            <div id="isp-throttling" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 text-foreground" data-testid="faq-isp-throttling">
                18. Is my ISP throttling my connection?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                ISP throttling - when your internet provider intentionally slows your connection - is real and happens more than most people realize. Here's how to detect it and what you can do:
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Signs of ISP throttling:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">
                <li>Speed tests show great speeds, but streaming services constantly buffer</li>
                <li>Specific websites or services are slow while others are fast</li>
                <li>Speeds tank during evening hours but are fine at 3 AM</li>
                <li>Using a VPN suddenly makes everything faster (this is a big tell)</li>
                <li>Downloads from certain sources (torrents, game updates) are inexplicably slow</li>
                <li>You hit your "data cap" and speeds dropped significantly</li>
              </ul>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>How to test for throttling:</strong>
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                1. Run a normal speed test - note the results<br />
                2. Connect to a reputable VPN (NordVPN, ExpressVPN, etc.)<br />
                3. Run another speed test<br />
                4. Try the problematic service (Netflix, YouTube, gaming)<br />
                5. If VPN is significantly faster, ISP is likely throttling
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Why ISPs throttle:</strong> Network congestion management (too many users, not enough infrastructure). Enforcing data caps or plan limitations. Targeting specific protocols they don't like (BitTorrent). Trying to upsell you to higher-tier plans. Conflicts with content providers over interconnection fees.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Legal status:</strong> In the US after net neutrality repeal, most throttling is legal if disclosed in fine print. Some countries still have strong net neutrality protections. Check your service agreement - throttling is usually buried in there.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>What you can do:</strong> Contact ISP and complain - sometimes they'll remove throttling or offer solutions. Switch providers if possible - competition helps. Use a VPN to bypass throttling (though this violates some ISPs' terms of service). File complaints with regulatory authorities (FCC in US, Ofcom in UK, etc.). Downgrade to cheaper plan if you're throttled anyway. Document everything - speeds, times, affected services - you need evidence.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-8 border border-primary/30">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Ready to Test Your Internet Speed?
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Use our free HTML5 speed test to check your download, upload, ping, and jitter in seconds.
            </p>
            <div className="flex justify-center">
              <Link href="/">
                <button 
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  data-testid="button-start-speed-test"
                >
                  Start Speed Test Now
                </button>
              </Link>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 border-t border-border/50 pt-8">
            <h3 className="text-xl font-bold mb-4">Related Guides</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/download-speed-guide" className="text-primary hover:underline" data-testid="link-download-guide">
                → Download Speed Guide
              </Link>
              <Link href="/upload-speed-guide" className="text-primary hover:underline" data-testid="link-upload-guide">
                → Upload Speed Guide
              </Link>
              <Link href="/wifi-speed-optimization" className="text-primary hover:underline" data-testid="link-wifi-guide">
                → WiFi Optimization Guide
              </Link>
            </div>
          </div>
        </div>

        <GenericFooter />
      </div>
    </>
  );
}