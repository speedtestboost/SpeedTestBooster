import { useEffect } from "react";
import { applyPageSEO, buildWebPageJsonLd } from "@/lib/seo";
import { getProviderSeoMeta } from "@/lib/providerSeo";
import { providerKeywords } from "@/seo/providerKeywords";

interface ProviderSEOProps {
  providerSlug: string;
}

/** @deprecated Use ProviderPageSEO with countryCode + providerSlug instead. */
export function ProviderSEO({ providerSlug }: ProviderSEOProps) {
  useEffect(() => {
    const slash = providerSlug.indexOf("/");
    if (slash !== -1) {
      const countryCode = providerSlug.slice(0, slash);
      const slug = providerSlug.slice(slash + 1);
      const meta = getProviderSeoMeta(countryCode, slug);
      return applyPageSEO({
        title: meta.title,
        description: meta.description,
        canonical: meta.canonical,
        jsonLd: buildWebPageJsonLd({
          url: meta.canonical,
          title: meta.title,
          description: meta.description,
        }),
      });
    }

    const config = providerKeywords[providerSlug];
    if (!config) {
      console.warn(`No SEO config found for provider: ${providerSlug}`);
      return;
    }

    const canonical = `https://speedtestboost.com/providers/us/${providerSlug}`;
    return applyPageSEO({
      title: config.titleTemplate,
      description: config.metaTemplate,
      canonical,
      jsonLd: buildWebPageJsonLd({
        url: canonical,
        title: config.titleTemplate,
        description: config.metaTemplate,
      }),
    });
  }, [providerSlug]);

  return null;
}

export default ProviderSEO;
