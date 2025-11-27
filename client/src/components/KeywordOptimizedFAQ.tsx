import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "How to test internet speed accurately?",
    answer: "For the most accurate internet speed test results, close all background applications, connect via ethernet if possible, and run our free speed test multiple times. Our lightweight speed test provides consistent, reliable measurements without ads or downloads.",
    keywords: "how to test internet speed, accurate internet speed test"
  },
  {
    question: "What is good internet speed for streaming?",
    answer: "For HD streaming, you need at least 5 Mbps download speed. For 4K streaming, aim for 25 Mbps or higher. Gaming requires low ping (under 50ms). Use our speed test for gaming to check if your connection meets these requirements.",
    keywords: "internet speed for streaming, speed test for gaming"
  },
  {
    question: "Why choose a speed test with no ads?",
    answer: "Speed tests with ads can interfere with accurate measurements and slow down your testing experience. Our ad-free internet speed test provides clean, uninterrupted testing with faster loading times and more reliable results.",
    keywords: "speed test no ads, ad-free speed test"
  },
  {
    question: "Is this speed test accurate on mobile devices?",
    answer: "Yes! Our mobile internet speed test is fully optimized for smartphones and tablets. Get accurate wifi speed test results on any device without downloading apps. The lightweight speed test works perfectly on mobile networks.",
    keywords: "mobile internet speed test, mobile speed test, wifi speed test"
  },
  {
    question: "Do I need to download anything for this speed test?",
    answer: "No downloads required! Our browser-based speed test works entirely in your web browser. This HTML5 speed test runs instantly without installing apps, plugins, or software. Just click start and get your internet speed booster test results immediately.",
    keywords: "speed test no download, browser based speed test, html5 speed test"
  }
];

export default function KeywordOptimizedFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions - Speed Test Help
      </h2>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <Card key={index} className="border border-gray-200">
            <div className="cursor-pointer" onClick={() => toggleItem(index)}>
              <CardHeader className="hover:bg-gray-50 transition-colors">
                <CardTitle className="text-left flex justify-between items-center text-base font-semibold text-gray-700">
                  {item.question}
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`} 
                  />
                </CardTitle>
              </CardHeader>
            </div>
            
            {openItems.includes(index) && (
              <CardContent className="pt-0">
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  Keywords: {item.keywords}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Schema markup for FAQ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
