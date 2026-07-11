import { useProviderPageSEO } from "@/lib/providerSeo";

interface ProviderPageSEOProps {
  countryCode: string;
  providerSlug: string;
}

/** Injects prerender-aligned SEO for ISP provider pages. */
export default function ProviderPageSEO({ countryCode, providerSlug }: ProviderPageSEOProps) {
  useProviderPageSEO(countryCode, providerSlug);
  return null;
}
