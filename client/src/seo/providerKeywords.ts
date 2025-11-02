export interface H2Section {
  title: string;
  keyPhrases: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProviderSEOConfig {
  primaryKeyword: string;
  titleTemplate: string;
  metaTemplate: string;
  h1: string;
  h2Sections: H2Section[];
  faq: FAQItem[];
  geoVariants: string[];
  technology?: string; // fiber, cable, DSL, 5G
  ogImage?: string;
}

// Long-tail keyword mapping for all 26 ISP providers
export const providerKeywords: Record<string, ProviderSEOConfig> = {
  // United States (9 providers)
  verizon: {
    primaryKeyword: "Verizon Fios speed test",
    titleTemplate: "Verizon Fios Speed Test - Test Verizon Internet Speed 2025",
    metaTemplate: "Test your Verizon Fios internet speed with our accurate speed test tool. Check download, upload speeds and ping for fiber optic connection.",
    h1: "Verizon Fios Speed Test - Check Your Fiber Internet Speed",
    technology: "fiber",
    geoVariants: ["New York", "Philadelphia", "Boston", "Washington DC", "Richmond"],
    h2Sections: [
      {
        title: "Verizon Fios Internet Speed Test Online",
        keyPhrases: ["verizon fios speed test online", "fios internet speed test", "verizon fiber speed test"]
      },
      {
        title: "Check Verizon Upload Speed Test",
        keyPhrases: ["verizon upload speed test", "fios upload speed check", "verizon fiber upload test"]
      },
      {
        title: "Verizon Ping and Latency Test",
        keyPhrases: ["verizon ping test", "fios latency test", "verizon connection ping"]
      },
      {
        title: "Verizon 5G Home Internet Speed Test", 
        keyPhrases: ["verizon 5g speed test", "verizon 5g home speed test", "5g internet speed verizon"]
      },
      {
        title: "Verizon Speed Test Near Me",
        keyPhrases: ["verizon speed test near me", "local verizon speed test", "verizon speed check nearby"]
      }
    ],
    faq: [
      {
        question: "How do I test my Verizon Fios internet speed?",
        answer: "Click the 'Start Speed Test' button above to test your Verizon Fios connection speed. Our tool measures your download speed, upload speed, and ping latency in real-time."
      },
      {
        question: "What is a good Verizon Fios speed test result?",
        answer: "Verizon Fios typically delivers speeds matching your plan: 200 Mbps, 400 Mbps, or Gigabit plans. Good results show 90%+ of your subscribed speed with low ping under 20ms."
      },
      {
        question: "Why is my Verizon internet speed slow?",
        answer: "Slow Verizon speeds can be caused by WiFi interference, outdated equipment, network congestion, or device limitations. Try testing with ethernet connection first."
      },
      {
        question: "How accurate is this Verizon speed test?",
        answer: "Our speed test uses multiple test servers and measures sustained peak bandwidth similar to Netflix's Fast.com methodology for accurate Verizon Fios results."
      },
      {
        question: "Does Verizon Fios throttle internet speeds?",
        answer: "Verizon Fios generally does not throttle speeds for home internet customers. Their fiber network provides consistent speeds without data caps. If you experience slowdowns, it's more likely due to WiFi issues or equipment problems."
      },
      {
        question: "What's the difference between WiFi and wired speeds on Verizon Fios?",
        answer: "WiFi speeds typically range 40-60% of your plan speed due to interference and distance. Ethernet connections should reach 90-95% of your Verizon Fios plan's advertised fiber speed for optimal performance."
      },
      {
        question: "When should I contact Verizon support about slow speeds?",
        answer: "Contact Verizon at 1-800-VERIZON if wired speed tests consistently show speeds below 80% of your plan, or if troubleshooting steps don't resolve persistent connectivity issues."
      },
      {
        question: "How fast should my Verizon Fios connection be?",
        answer: "Your speeds should reach at least 90% of your plan's advertised rate on wired connections. Common Verizon Fios plans: 300 Mbps, 500 Mbps, 1 Gig (1000 Mbps), and 2 Gig (2000 Mbps)."
      },
      {
        question: "How much internet speed does my household need?",
        answer: "For basic use, 100-200 Mbps works well. Multiple 4K streams and gaming require 300-500 Mbps. Heavy usage households benefit from Gigabit plans. Use our internet speed requirements calculator for personalized recommendations."
      }
    ]
  },
  
  comcast: {
    primaryKeyword: "Comcast Xfinity speed test",
    titleTemplate: "Comcast Xfinity Speed Test - Test Xfinity Internet Speed 2025",
    metaTemplate: "Test your Comcast Xfinity internet speed with our reliable speed test. Check cable internet download, upload speeds and latency performance.",
    h1: "Comcast Xfinity Speed Test - Check Your Cable Internet Speed",
    technology: "cable",
    geoVariants: ["Chicago", "Atlanta", "Denver", "Seattle", "Miami"],
    h2Sections: [
      {
        title: "Xfinity Internet Speed Test Online",
        keyPhrases: ["xfinity speed test online", "comcast internet speed test", "xfinity cable speed test"]
      },
      {
        title: "Comcast Upload Speed Test",
        keyPhrases: ["comcast upload speed test", "xfinity upload speed check", "comcast cable upload test"]
      },
      {
        title: "Xfinity WiFi Speed Test",
        keyPhrases: ["xfinity wifi speed test", "comcast wifi speed check", "xfinity wireless speed test"]
      },
      {
        title: "Comcast Ping and Latency Test",
        keyPhrases: ["comcast ping test", "xfinity latency test", "comcast connection ping"]
      },
      {
        title: "Xfinity Speed Test Tool",
        keyPhrases: ["xfinity speed test tool", "comcast speed check tool", "xfinity bandwidth test"]
      }
    ],
    faq: [
      {
        question: "How do I test my Comcast Xfinity internet speed?",
        answer: "Use our speed test tool above by clicking 'Start Speed Test'. It will measure your Xfinity cable internet download speed, upload speed, and ping in seconds."
      },
      {
        question: "What speeds should I expect with Xfinity?",
        answer: "Xfinity plans range from 75 Mbps to 2000 Mbps (2 Gig). Your actual speeds should be close to your plan speed during off-peak hours."
      },
      {
        question: "Why is my Xfinity internet slow?",
        answer: "Slow Xfinity speeds may be due to network congestion, old modem/router, WiFi interference, or too many connected devices. Check during different times of day."
      },
      {
        question: "Is this Xfinity speed test accurate?",
        answer: "Yes, our test uses advanced algorithms to measure your true Xfinity connection speed by testing sustained bandwidth over multiple connections."
      }
    ]
  },

  att: {
    primaryKeyword: "AT&T internet speed test",
    titleTemplate: "AT&T Internet Speed Test - Test AT&T Fiber & DSL Speed 2025",
    metaTemplate: "Test your AT&T internet speed for fiber, DSL and wireless connections. Check AT&T download, upload speeds and ping latency instantly.",
    h1: "AT&T Internet Speed Test - Check Your AT&T Connection Speed",
    technology: "hybrid",
    geoVariants: ["Dallas", "Austin", "Nashville", "Charlotte", "Birmingham"],
    h2Sections: [
      {
        title: "AT&T Fiber Speed Test Online",
        keyPhrases: ["att fiber speed test", "at&t fiber speed test online", "att gigapower speed test"]
      },
      {
        title: "AT&T DSL Speed Test",
        keyPhrases: ["att dsl speed test", "at&t dsl internet speed test", "att dsl connection test"]
      },
      {
        title: "AT&T Upload Speed Test",
        keyPhrases: ["att upload speed test", "at&t upload speed check", "att fiber upload test"]
      },
      {
        title: "AT&T WiFi Speed Test",
        keyPhrases: ["att wifi speed test", "at&t wireless speed test", "att wifi speed check"]
      },
      {
        title: "AT&T Fixed Wireless Speed Test",
        keyPhrases: ["att fixed wireless speed test", "at&t wireless internet speed test", "att rural internet test"]
      }
    ],
    faq: [
      {
        question: "How do I test my AT&T internet speed?",
        answer: "Click 'Start Speed Test' above to test your AT&T connection. Our tool works with AT&T Fiber, DSL, and Fixed Wireless services to measure real speeds."
      },
      {
        question: "What's the difference between AT&T Fiber and DSL speeds?",
        answer: "AT&T Fiber offers speeds up to 5 Gig with equal upload/download, while DSL typically provides 1-100 Mbps with lower upload speeds."
      },
      {
        question: "Why is my AT&T internet slow?",
        answer: "AT&T speed issues can stem from line quality (DSL), equipment age, network congestion, or service plan limits. Fiber connections are generally more consistent."
      },
      {
        question: "How accurate is this AT&T speed test?",
        answer: "Our test is calibrated for AT&T's network infrastructure and provides accurate measurements for fiber, DSL, and wireless AT&T services."
      }
    ]
  },

  spectrum: {
    primaryKeyword: "Spectrum internet speed test",
    titleTemplate: "Spectrum Internet Speed Test - Test Charter Spectrum Speed 2025",
    metaTemplate: "Test your Spectrum cable internet speed with our accurate speed test tool. Check Spectrum download, upload speeds and ping performance.",
    h1: "Spectrum Internet Speed Test - Check Your Cable Connection Speed",
    technology: "cable",
    geoVariants: ["Los Angeles", "New York", "Texas", "Florida", "Ohio"],
    h2Sections: [
      {
        title: "Charter Spectrum Speed Test Online",
        keyPhrases: ["charter spectrum speed test", "spectrum cable speed test", "spectrum internet speed test online"]
      },
      {
        title: "Spectrum Upload Speed Test",
        keyPhrases: ["spectrum upload speed test", "charter upload speed check", "spectrum cable upload test"]
      },
      {
        title: "Spectrum WiFi Speed Test",
        keyPhrases: ["spectrum wifi speed test", "spectrum wireless speed test", "charter wifi speed check"]
      },
      {
        title: "Spectrum Gig Speed Test",
        keyPhrases: ["spectrum gig speed test", "spectrum gigabit speed test", "spectrum 1000 mbps test"]
      },
      {
        title: "Spectrum Connection Test Tool",
        keyPhrases: ["spectrum connection test", "spectrum bandwidth test", "spectrum network test"]
      }
    ],
    faq: [
      {
        question: "How do I test my Spectrum internet speed?",
        answer: "Use our Spectrum speed test above by clicking 'Start Speed Test'. It measures your Charter Spectrum cable internet download, upload, and ping speeds."
      },
      {
        question: "What speeds does Spectrum offer?",
        answer: "Spectrum plans include 300 Mbps, 500 Mbps, and 1000 Mbps (1 Gig) with upload speeds typically 10-35 Mbps depending on your plan."
      },
      {
        question: "Why is my Spectrum internet slow?",
        answer: "Spectrum slowdowns can be caused by peak usage times, old equipment, WiFi interference, or network maintenance. Try testing at different times."
      },
      {
        question: "Is this Spectrum speed test reliable?",
        answer: "Yes, our test is designed to accurately measure Spectrum's cable network performance using multiple test methodologies for reliable results."
      }
    ]
  },

  centurylink: {
    primaryKeyword: "CenturyLink speed test",
    titleTemplate: "CenturyLink Speed Test - Test CenturyLink Internet Speed 2025",
    metaTemplate: "Test your CenturyLink DSL and fiber internet speed. Check CenturyLink download, upload speeds and ping latency with our speed test tool.",
    h1: "CenturyLink Speed Test - Check Your DSL & Fiber Speed",
    technology: "hybrid",
    geoVariants: ["Denver", "Phoenix", "Minneapolis", "Salt Lake City", "Omaha"],
    h2Sections: [
      {
        title: "CenturyLink DSL Speed Test",
        keyPhrases: ["centurylink dsl speed test", "centurylink dsl internet test", "century link dsl speed check"]
      },
      {
        title: "CenturyLink Fiber Speed Test",
        keyPhrases: ["centurylink fiber speed test", "quantum fiber speed test", "centurylink gigabit test"]
      },
      {
        title: "CenturyLink Upload Speed Test",
        keyPhrases: ["centurylink upload speed test", "century link upload test", "centurylink upload check"]
      },
      {
        title: "CenturyLink Rural Internet Test",
        keyPhrases: ["centurylink rural speed test", "century link country internet", "centurylink remote area test"]
      },
      {
        title: "CenturyLink Connection Test Tool",
        keyPhrases: ["centurylink connection test", "century link network test", "centurylink line test"]
      }
    ],
    faq: [
      {
        question: "How do I test my CenturyLink internet speed?",
        answer: "Click 'Start Speed Test' to measure your CenturyLink connection speed. Our tool works with both CenturyLink DSL and fiber services."
      },
      {
        question: "What speeds does CenturyLink offer?",
        answer: "CenturyLink DSL ranges from 1.5-100 Mbps, while CenturyLink Fiber (Quantum Fiber) offers up to 940 Mbps with symmetrical upload speeds."
      },
      {
        question: "Why is my CenturyLink internet slow?",
        answer: "CenturyLink DSL speeds depend on distance from central office. Fiber connections are more consistent. Check for line issues or equipment problems."
      },
      {
        question: "How accurate is this CenturyLink speed test?",
        answer: "Our test is optimized for CenturyLink's network infrastructure and provides accurate measurements for both DSL and fiber connections."
      }
    ]
  },

  optimum: {
    primaryKeyword: "Optimum internet speed test",
    titleTemplate: "Optimum Internet Speed Test - Test Optimum Cable Speed 2025",
    metaTemplate: "Test your Optimum cable internet speed with our accurate speed test. Check Optimum download, upload speeds and ping for Altice One service.",
    h1: "Optimum Internet Speed Test - Check Your Cable Connection Speed",
    technology: "cable",
    geoVariants: ["Long Island", "Westchester", "Connecticut", "New Jersey", "Bronx"],
    h2Sections: [
      {
        title: "Optimum Cable Speed Test Online",
        keyPhrases: ["optimum cable speed test", "optimum internet speed test online", "altice optimum speed test"]
      },
      {
        title: "Optimum Upload Speed Test",
        keyPhrases: ["optimum upload speed test", "optimum upload speed check", "altice upload test"]
      },
      {
        title: "Optimum WiFi Speed Test",
        keyPhrases: ["optimum wifi speed test", "optimum wireless speed test", "altice wifi speed check"]
      },
      {
        title: "Optimum Gig Speed Test",
        keyPhrases: ["optimum gigabit speed test", "optimum 1 gig test", "optimum fiber speed test"]
      },
      {
        title: "Optimum Connection Test Tool",
        keyPhrases: ["optimum connection test", "optimum network test", "optimum bandwidth test"]
      }
    ],
    faq: [
      {
        question: "How do I test my Optimum internet speed?",
        answer: "Click 'Start Speed Test' above to test your Optimum cable internet connection. Our tool measures download, upload, and ping speeds for Altice One services."
      },
      {
        question: "What speeds does Optimum offer?",
        answer: "Optimum plans range from 300 Mbps to 1 Gig, with upload speeds typically 20-35 Mbps. Optimum Fiber offers symmetrical gigabit speeds."
      },
      {
        question: "Why is my Optimum internet slow?",
        answer: "Optimum slowdowns can be due to network congestion, equipment issues, or WiFi interference. Try testing with ethernet connection first."
      },
      {
        question: "Is this Optimum speed test accurate?",
        answer: "Yes, our test is calibrated for Optimum's Altice network infrastructure and provides reliable speed measurements for cable and fiber services."
      }
    ]
  },

  cox: {
    primaryKeyword: "Cox internet speed test",
    titleTemplate: "Cox Internet Speed Test - Test Cox Cable Internet Speed 2025",
    metaTemplate: "Test your Cox cable internet speed with our reliable speed test tool. Check Cox download, upload speeds and ping latency performance.",
    h1: "Cox Internet Speed Test - Check Your Cable Connection Speed",
    technology: "cable",
    geoVariants: ["Phoenix", "Las Vegas", "San Diego", "Oklahoma City", "New Orleans"],
    h2Sections: [
      {
        title: "Cox Cable Speed Test Online",
        keyPhrases: ["cox cable speed test", "cox internet speed test online", "cox communications speed test"]
      },
      {
        title: "Cox Upload Speed Test",
        keyPhrases: ["cox upload speed test", "cox upload speed check", "cox cable upload test"]
      },
      {
        title: "Cox Gigabit Speed Test",
        keyPhrases: ["cox gigabit speed test", "cox gig speed test", "cox gigablast test"]
      },
      {
        title: "Cox WiFi Speed Test",
        keyPhrases: ["cox wifi speed test", "cox wireless speed test", "cox panoramic wifi test"]
      },
      {
        title: "Cox Connection Test Tool",
        keyPhrases: ["cox connection test", "cox network test", "cox bandwidth test"]
      }
    ],
    faq: [
      {
        question: "How do I test my Cox internet speed?",
        answer: "Use our Cox speed test by clicking 'Start Speed Test'. It measures your Cox cable internet download, upload, and ping speeds accurately."
      },
      {
        question: "What speeds does Cox offer?",
        answer: "Cox plans include 100 Mbps, 500 Mbps, and Gigablast (1000 Mbps) with upload speeds ranging from 10-35 Mbps depending on your plan."
      },
      {
        question: "Why is my Cox internet slow?",
        answer: "Cox speed issues may be caused by network congestion during peak hours, outdated equipment, or WiFi interference. Test at different times."
      },
      {
        question: "Is this Cox speed test reliable?",
        answer: "Yes, our test uses advanced algorithms optimized for Cox's cable network to provide accurate speed measurements and latency testing."
      }
    ]
  },

  frontier: {
    primaryKeyword: "Frontier internet speed test",
    titleTemplate: "Frontier Internet Speed Test - Test Frontier DSL & Fiber 2025",
    metaTemplate: "Test your Frontier internet speed for DSL and fiber connections. Check Frontier download, upload speeds and ping in rural areas.",
    h1: "Frontier Internet Speed Test - Check Your DSL & Fiber Speed",
    technology: "hybrid",
    geoVariants: ["West Virginia", "Connecticut", "California", "Florida", "Indiana"],
    h2Sections: [
      {
        title: "Frontier DSL Speed Test",
        keyPhrases: ["frontier dsl speed test", "frontier dsl internet test", "frontier broadband test"]
      },
      {
        title: "Frontier Fiber Speed Test",
        keyPhrases: ["frontier fiber speed test", "frontier fios speed test", "frontier gigabit test"]
      },
      {
        title: "Frontier Rural Internet Test",
        keyPhrases: ["frontier rural speed test", "frontier country internet", "frontier remote area test"]
      },
      {
        title: "Frontier Upload Speed Test",
        keyPhrases: ["frontier upload speed test", "frontier upload speed check", "frontier dsl upload test"]
      },
      {
        title: "Frontier Connection Test Tool",
        keyPhrases: ["frontier connection test", "frontier network test", "frontier line test"]
      }
    ],
    faq: [
      {
        question: "How do I test my Frontier internet speed?",
        answer: "Click 'Start Speed Test' to measure your Frontier connection. Our tool works with both Frontier DSL and fiber internet services."
      },
      {
        question: "What speeds does Frontier offer?",
        answer: "Frontier DSL ranges from 6-115 Mbps, while Frontier Fiber offers up to 2 Gig speeds in select areas with symmetrical upload/download."
      },
      {
        question: "Why is my Frontier internet slow?",
        answer: "Frontier DSL speeds depend on distance from central office and line quality. Fiber connections are more consistent but less widely available."
      },
      {
        question: "How accurate is this Frontier speed test?",
        answer: "Our test is designed for Frontier's network infrastructure and provides accurate measurements for both DSL and fiber connections in rural areas."
      }
    ]
  },

  windstream: {
    primaryKeyword: "Windstream internet speed test",
    titleTemplate: "Windstream Internet Speed Test - Test Windstream DSL Speed 2025",
    metaTemplate: "Test your Windstream DSL and fiber internet speed. Check Windstream download, upload speeds and ping for rural internet connections.",
    h1: "Windstream Internet Speed Test - Check Your DSL & Fiber Speed",
    technology: "hybrid",
    geoVariants: ["Arkansas", "Georgia", "Kentucky", "Alabama", "Nebraska"],
    h2Sections: [
      {
        title: "Windstream DSL Speed Test",
        keyPhrases: ["windstream dsl speed test", "windstream dsl internet test", "windstream broadband test"]
      },
      {
        title: "Windstream Kinetic Speed Test",
        keyPhrases: ["windstream kinetic speed test", "kinetic fiber speed test", "windstream gigabit test"]
      },
      {
        title: "Windstream Rural Internet Test",
        keyPhrases: ["windstream rural speed test", "windstream country internet", "windstream remote test"]
      },
      {
        title: "Windstream Upload Speed Test",
        keyPhrases: ["windstream upload speed test", "windstream upload check", "kinetic upload test"]
      },
      {
        title: "Windstream Connection Test Tool",
        keyPhrases: ["windstream connection test", "windstream network test", "windstream line test"]
      }
    ],
    faq: [
      {
        question: "How do I test my Windstream internet speed?",
        answer: "Use our Windstream speed test by clicking 'Start Speed Test'. It measures both Windstream DSL and Kinetic fiber internet speeds."
      },
      {
        question: "What speeds does Windstream offer?",
        answer: "Windstream DSL offers 25-100 Mbps, while Kinetic fiber provides up to 1 Gig speeds with symmetrical upload/download in select areas."
      },
      {
        question: "Why is my Windstream internet slow?",
        answer: "Windstream DSL speeds vary by distance from equipment and line quality. Kinetic fiber offers more consistent speeds but limited availability."
      },
      {
        question: "How accurate is this Windstream speed test?",
        answer: "Our test is optimized for Windstream's rural network infrastructure and provides reliable measurements for both DSL and fiber services."
      }
    ]
  },

  // United Kingdom (3 providers)
  sky: {
    primaryKeyword: "Sky broadband speed test",
    titleTemplate: "Sky Broadband Speed Test - Test Sky Internet Speed UK 2025",
    metaTemplate: "Test your Sky broadband speed with our reliable speed test tool. Check Sky fibre and ADSL download, upload speeds and ping in the UK.",
    h1: "Sky Broadband Speed Test - Check Your UK Internet Speed",
    technology: "fibre",
    geoVariants: ["London", "Manchester", "Birmingham", "Edinburgh", "Bristol"],
    h2Sections: [
      {
        title: "Sky Fibre Speed Test Online",
        keyPhrases: ["sky fibre speed test", "sky broadband speed test online", "sky superfast speed test"]
      },
      {
        title: "Sky Upload Speed Test",
        keyPhrases: ["sky upload speed test", "sky broadband upload test", "sky fibre upload check"]
      },
      {
        title: "Sky WiFi Speed Test",
        keyPhrases: ["sky wifi speed test", "sky hub speed test", "sky wireless speed test"]
      },
      {
        title: "Sky ADSL Speed Test",
        keyPhrases: ["sky adsl speed test", "sky basic broadband test", "sky standard speed test"]
      },
      {
        title: "Sky Ultrafast Speed Test",
        keyPhrases: ["sky ultrafast speed test", "sky gigafast speed test", "sky 900 mbps test"]
      }
    ],
    faq: [
      {
        question: "How do I test my Sky broadband speed?",
        answer: "Click 'Start Speed Test' above to test your Sky broadband connection. Our tool measures Sky fibre and ADSL speeds accurately across the UK."
      },
      {
        question: "What speeds does Sky broadband offer?",
        answer: "Sky offers ADSL up to 17 Mbps, Superfast fibre up to 67 Mbps, Ultrafast up to 145 Mbps, and Gigafast up to 900 Mbps in select areas."
      },
      {
        question: "Why is my Sky broadband slow?",
        answer: "Sky speed issues can be due to line quality, distance from exchange (ADSL), network congestion, or WiFi interference. Check your Sky Hub connection."
      },
      {
        question: "Is this Sky speed test accurate?",
        answer: "Yes, our test is calibrated for Sky's UK network infrastructure and provides reliable measurements for both fibre and ADSL connections."
      }
    ]
  }
};