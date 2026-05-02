import { useEffect } from 'react';
import { setCanonicalHref } from '@/lib/seo';
import { providerKeywords } from '@/seo/providerKeywords';

interface ProviderSEOProps {
  providerSlug: string;
}

export function ProviderSEO({ providerSlug }: ProviderSEOProps) {
  useEffect(() => {
    const config = providerKeywords[providerSlug];
    if (!config) {
      console.warn(`No SEO config found for provider: ${providerSlug}`);
      return;
    }

    // Update document title
    document.title = config.titleTemplate;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.metaTemplate);
    }

    const providerPath = providerSlug.includes('/') ? providerSlug : `us/${providerSlug}`;
    setCanonicalHref(`https://speedtestboost.com/providers/${providerPath}`);

    const createOrUpdateMetaProperty = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    const createOrUpdateMetaName = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    const ogImageUrl = config.ogImage || 'https://speedtestboost.com/apple-touch-icon.png';

    // Open Graph (Open Graph protocol uses `property`)
    createOrUpdateMetaProperty('og:title', config.titleTemplate);
    createOrUpdateMetaProperty('og:description', config.metaTemplate);
    createOrUpdateMetaProperty('og:type', 'website');
    createOrUpdateMetaProperty('og:url', `https://speedtestboost.com/providers/${providerPath}`);
    createOrUpdateMetaProperty('og:image', ogImageUrl);
    createOrUpdateMetaProperty('og:image:alt', config.titleTemplate);

    // Twitter Cards use `name`, not `property`
    createOrUpdateMetaName('twitter:card', 'summary_large_image');
    createOrUpdateMetaName('twitter:title', config.titleTemplate);
    createOrUpdateMetaName('twitter:description', config.metaTemplate);
    createOrUpdateMetaName('twitter:image', ogImageUrl);

    // Create JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://speedtestboost.com/providers/${providerPath}#webpage`,
          "url": `https://speedtestboost.com/providers/${providerPath}`,
          "name": config.titleTemplate,
          "description": config.metaTemplate,
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://speedtestboost.com#website",
            "name": "Speed Test & Boost"
          },
          "about": {
            "@type": "Service",
            "name": config.primaryKeyword,
            "description": config.metaTemplate
          }
        },
        {
          "@type": "FAQPage",
          "@id": `https://speedtestboost.com/providers/${providerPath}#faq`,
          "mainEntity": config.faq.map((item, index) => ({
            "@type": "Question",
            "@id": `https://speedtestboost.com/providers/${providerPath}#question-${index + 1}`,
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        }
      ]
    };

    // Add structured data to head with unique ID
    const scriptId = `${providerSlug.replace('/', '-')}-structured-data`;
    const existingScript = document.querySelector(`script#${scriptId}`);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector(`script#${scriptId}`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // Next page useEffect sets canonical; do not reset here.
    };
  }, [providerSlug]);

  return null; // This component doesn't render anything
}

export default ProviderSEO;