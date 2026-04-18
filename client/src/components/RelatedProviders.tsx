import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi } from "lucide-react";

interface Provider {
  name: string;
  slug: string;
  type: string;
  coverage: string;
}

interface RelatedProvidersProps {
  currentCountryCode: string;
  currentProviderSlug: string;
}

const providersByCountry: Record<string, Provider[]> = {
  us: [
    { name: "Verizon", slug: "verizon", type: "Fiber/5G", coverage: "Nationwide" },
    { name: "Comcast Xfinity", slug: "comcast", type: "Cable/Fiber", coverage: "39 States" },
    { name: "AT&T", slug: "att", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "Spectrum", slug: "spectrum", type: "Cable", coverage: "41 States" },
    { name: "CenturyLink", slug: "centurylink", type: "Fiber/DSL", coverage: "36 States" },
    { name: "Optimum", slug: "optimum", type: "Fiber/Cable", coverage: "Northeast" },
    { name: "Cox", slug: "cox", type: "Cable", coverage: "18 States" },
    { name: "Frontier", slug: "frontier", type: "Fiber", coverage: "25 States" },
    { name: "Windstream", slug: "windstream", type: "Fiber/DSL", coverage: "18 States" }
  ],
  uk: [
    { name: "Sky", slug: "sky", type: "Fiber/ADSL", coverage: "Nationwide" },
    { name: "Virgin Media", slug: "virgin-media", type: "Cable/Fiber", coverage: "Nationwide" },
    { name: "BT", slug: "bt", type: "Fiber/ADSL", coverage: "Nationwide" }
  ],
  ca: [
    { name: "Bell", slug: "bell", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "Rogers", slug: "rogers", type: "Cable/5G", coverage: "Nationwide" },
    { name: "Telus", slug: "telus", type: "Fiber/LTE", coverage: "Western Canada" }
  ],
  de: [
    { name: "Deutsche Telekom", slug: "deutsche-telekom", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "Vodafone", slug: "vodafone-de", type: "Cable/5G", coverage: "Nationwide" },
    { name: "O2", slug: "o2-de", type: "DSL/LTE", coverage: "Nationwide" }
  ],
  au: [
    { name: "Telstra", slug: "telstra", type: "NBN/5G", coverage: "Nationwide" },
    { name: "Optus", slug: "optus", type: "NBN/5G", coverage: "Nationwide" },
    { name: "TPG", slug: "tpg", type: "NBN/ADSL", coverage: "Nationwide" }
  ],
  nl: [
    { name: "KPN", slug: "kpn", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "VodafoneZiggo", slug: "vodafoneziggo", type: "Cable/Fiber", coverage: "Nationwide" },
    { name: "Odido", slug: "odido", type: "Fiber/LTE", coverage: "Major Cities" }
  ],
  in: [
    { name: "Jio Fiber", slug: "jio-fiber", type: "Fiber", coverage: "1600+ Cities" },
    { name: "Airtel Broadband", slug: "airtel-broadband", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "ACT Fibernet", slug: "act-fibernet", type: "Fiber", coverage: "17 Cities" },
    { name: "BSNL Broadband", slug: "bsnl-broadband", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "Hathway Broadband", slug: "hathway-broadband", type: "Cable", coverage: "Major Cities" }
  ],
  fr: [
    { name: "Orange", slug: "orange", type: "Fiber/DSL", coverage: "Nationwide" }
  ],
  it: [
    { name: "TIM", slug: "tim", type: "Fiber/DSL", coverage: "Nationwide" }
  ],
  br: [
    { name: "Vivo", slug: "vivo", type: "Fiber", coverage: "Major Cities" }
  ],
  mx: [
    { name: "Telmex", slug: "telmex", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "Izzi", slug: "izzi", type: "Cable/Fiber", coverage: "Major Cities" },
    { name: "Megacable", slug: "megacable", type: "Cable/Fiber", coverage: "Western Mexico" },
    { name: "Totalplay", slug: "totalplay", type: "Fiber", coverage: "Major Cities" }
  ],
  ph: [
    { name: "PLDT", slug: "pldt", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "Globe", slug: "globe", type: "Fiber/LTE", coverage: "Nationwide" },
    { name: "Converge", slug: "converge", type: "Fiber", coverage: "Major Cities" },
    { name: "DITO", slug: "dito", type: "5G/4G", coverage: "Expanding" }
  ],
  id: [
    { name: "IndiHome", slug: "indihome", type: "Fiber/DSL", coverage: "Nationwide" },
    { name: "Biznet", slug: "biznet", type: "Fiber", coverage: "Major Cities" },
    { name: "First Media", slug: "first-media", type: "Cable/Fiber", coverage: "Urban Areas" },
    { name: "MyRepublic", slug: "myrepublic", type: "Fiber", coverage: "Jakarta/Surabaya" }
  ],
  es: [
    { name: "Movistar", slug: "movistar", type: "Fiber/ADSL", coverage: "Nationwide" },
    { name: "Orange", slug: "orange-es", type: "Fiber", coverage: "Nationwide" },
    { name: "Vodafone", slug: "vodafone-es", type: "Fiber/Cable", coverage: "Nationwide" },
    { name: "MásOrange", slug: "masorange", type: "Fiber", coverage: "Major Cities" }
  ],
  za: [
    { name: "Rain", slug: "rain", type: "4G/5G", coverage: "Major Cities" },
    { name: "Vodacom Fibre", slug: "vodacom-fibre", type: "Fiber", coverage: "Major Cities" },
    { name: "Cool Ideas", slug: "cool-ideas", type: "Fiber", coverage: "Major Cities" },
    { name: "Afrihost", slug: "afrihost", type: "Fiber/LTE", coverage: "Urban Areas" }
  ],
  my: [
    { name: "Unifi", slug: "unifi", type: "Fiber", coverage: "Nationwide" },
    { name: "Maxis", slug: "maxis", type: "Fiber/5G", coverage: "Nationwide" },
    { name: "TIME", slug: "time", type: "Fiber", coverage: "Major Cities" },
    { name: "Celcom", slug: "celcom", type: "Fiber/LTE", coverage: "Nationwide" }
  ],
  ar: [
    { name: "Movistar", slug: "movistar-ar", type: "Fiber/ADSL", coverage: "Nationwide" },
    { name: "Personal", slug: "personal", type: "Fiber/Cable", coverage: "Major Cities" },
    { name: "Claro", slug: "claro", type: "Fiber/Cable", coverage: "Nationwide" },
    { name: "Telecentro", slug: "telecentro", type: "Cable/Fiber", coverage: "Buenos Aires" }
  ],
  ae: [
    { name: "Etisalat", slug: "etisalat", type: "Fiber/5G", coverage: "Nationwide" },
    { name: "du", slug: "du", type: "Fiber/5G", coverage: "Nationwide" },
    { name: "Virgin Mobile", slug: "virgin-mobile-ae", type: "4G/5G", coverage: "Major Cities" },
    { name: "Yalla", slug: "yalla", type: "Fiber", coverage: "Expanding" }
  ],
  sa: [
    { name: "STC", slug: "stc", type: "Fiber/5G", coverage: "Nationwide" },
    { name: "Mobily", slug: "mobily", type: "Fiber/5G", coverage: "Nationwide" },
    { name: "Zain", slug: "zain", type: "Fiber/5G", coverage: "Major Cities" },
    { name: "GO", slug: "go", type: "Fiber/4G", coverage: "Urban Areas" }
  ],
  sg: [
    { name: "Singtel", slug: "singtel", type: "Fibre/5G", coverage: "Nationwide" },
    { name: "StarHub", slug: "starhub", type: "Fibre/Cable", coverage: "Nationwide" },
    { name: "M1", slug: "m1", type: "Fibre", coverage: "Nationwide" }
  ],
  th: [
    { name: "AIS Fibre", slug: "ais", type: "Fibre/5G", coverage: "Nationwide" },
    { name: "True", slug: "true-th", type: "Fibre/5G", coverage: "Nationwide" },
    { name: "3BB", slug: "3bb", type: "Fibre", coverage: "Major cities" }
  ],
  pl: [
    { name: "Orange", slug: "orange-pl", type: "Fibre/DSL", coverage: "Nationwide" },
    { name: "Play", slug: "play-pl", type: "5G/Fibre", coverage: "Nationwide" },
    { name: "T-Mobile", slug: "t-mobile-pl", type: "Fibre/DSL", coverage: "Nationwide" }
  ]
};

export default function RelatedProviders({ currentCountryCode, currentProviderSlug }: RelatedProvidersProps) {
  const countryProviders = providersByCountry[currentCountryCode] || [];
  
  // Filter out the current provider and get up to 4 related providers
  const relatedProviders = countryProviders
    .filter(p => p.slug !== currentProviderSlug)
    .slice(0, 4);

  if (relatedProviders.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8" data-testid="card-related-providers">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5 text-primary" />
          Related Internet Providers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedProviders.map((provider) => (
            <Link
              key={provider.slug}
              href={`/providers/${currentCountryCode}/${provider.slug}`}
              className="block group"
              data-testid={`link-provider-${provider.slug}`}
            >
              <div className="p-4 rounded-lg border border-border/40 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {provider.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {provider.type} • {provider.coverage}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link 
            href="/internet-providers"
            className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
            data-testid="link-view-all-providers"
          >
            View All Internet Providers →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
