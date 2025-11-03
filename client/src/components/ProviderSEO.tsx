import { useEffect } from 'react';
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

    // Create canonical URL
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://speedtestboost.com/providers/${providerSlug.includes('/') ? providerSlug : `us/${providerSlug}`}`);
    document.head.appendChild(canonicalLink);

    // Create Open Graph meta tags
    const createOrUpdateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // Open Graph tags
    createOrUpdateMetaTag('og:title', config.titleTemplate);
    createOrUpdateMetaTag('og:description', config.metaTemplate);
    createOrUpdateMetaTag('og:type', 'website');
    createOrUpdateMetaTag('og:url', `https://speedtestboost.com/providers/${providerSlug.includes('/') ? providerSlug : `us/${providerSlug}`}`);
    createOrUpdateMetaTag('og:image', config.ogImage || 'https://speedtestboost.com/logo-option-5.svg');

    // Twitter Card tags
    createOrUpdateMetaTag('twitter:card', 'summary_large_image');
    createOrUpdateMetaTag('twitter:title', config.titleTemplate);
    createOrUpdateMetaTag('twitter:description', config.metaTemplate);

    // Create JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `https://speedtestboost.com/providers/${providerSlug.includes('/') ? providerSlug : `us/${providerSlug}`}#webpage`,
          "url": `https://speedtestboost.com/providers/${providerSlug.includes('/') ? providerSlug : `us/${providerSlug}`}`,
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
          "@id": `https://speedtestboost.com/providers/${providerSlug.includes('/') ? providerSlug : `us/${providerSlug}`}#faq`,
          "mainEntity": config.faq.map((item, index) => ({
            "@type": "Question",
            "@id": `https://speedtestboost.com/providers/${providerSlug.includes('/') ? providerSlug : `us/${providerSlug}`}#question-${index + 1}`,
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
      
      // Remove the specific canonical element we created
      if (canonicalLink.parentNode) {
        canonicalLink.parentNode.removeChild(canonicalLink);
      }
      
      // Remove Open Graph and Twitter tags
      const tagsToRemove = [
        'meta[property="og:title"]',
        'meta[property="og:description"]', 
        'meta[property="og:type"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[property="twitter:card"]',
        'meta[property="twitter:title"]',
        'meta[property="twitter:description"]'
      ];
      
      tagsToRemove.forEach(selector => {
        const tag = document.querySelector(selector);
        if (tag) {
          tag.remove();
        }
      });
    };
  }, [providerSlug]);

  return null; // This component doesn't render anything
}

export default ProviderSEO;