// React hook for multilingual support with automatic language detection
import { useState, useEffect, useCallback } from 'react';
import { 
  detectUserLanguage, 
  getTranslation, 
  generateHreflangLinks, 
  setLanguageMeta,
  type Translation 
} from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

export interface UseTranslationReturn {
  t: Translation;
  currentLanguage: string;
  isLoading: boolean;
  changeLanguage: (lang: string) => void;
  hreflangLinks: Array<{ hreflang: string; href: string }>;
}

export function useTranslation(initialLanguage?: string): UseTranslationReturn {
  const [currentLanguage, setCurrentLanguage] = useState<string>(initialLanguage || 'en');
  const [isLoading, setIsLoading] = useState(true);
  const [translation, setTranslation] = useState<Translation>(() => getTranslation('en'));

  // Initialize language detection and setup
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        setIsLoading(true);
        
        // Check if language is already stored in localStorage
        const storedLang = localStorage.getItem('speedtest-language');
        
        let languageToUse: string;
        
        if (initialLanguage) {
          // Use explicitly provided language (from URL route)
          languageToUse = initialLanguage;
        } else if (storedLang && getTranslation(storedLang)) {
          // Use stored preference
          languageToUse = storedLang;
        } else {
          // Auto-detect based on geolocation and browser
          languageToUse = await detectUserLanguage();
        }
        
        // Update state and translation
        setCurrentLanguage(languageToUse);
        const newTranslation = getTranslation(languageToUse);
        setTranslation(newTranslation);
        
        // Update document meta tags
        setLanguageMeta(newTranslation);
        
        // Update canonical URL and hreflang tags
        updateCanonicalAndHreflang(languageToUse);
        
        // Store the detected/selected language
        localStorage.setItem('speedtest-language', languageToUse);
        
        // Track language initialization
        trackEvent('language_initialized', 'i18n', languageToUse, 1);
        
      } catch (error) {
        console.warn('Language initialization failed:', error);
        // Fallback to English
        setCurrentLanguage('en');
        setTranslation(getTranslation('en'));
        setLanguageMeta(getTranslation('en'));
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, [initialLanguage]);

  // Update canonical URL and hreflang tags
  const updateCanonicalAndHreflang = useCallback((lang: string) => {
    try {
      const baseUrl = 'https://speedtestboost.com';
      
      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      
      // Set canonical URL based on language
      const canonicalUrls: Record<string, string> = {
        'en': `${baseUrl}/`,
        'es': `${baseUrl}/es`,
        'pt-BR': `${baseUrl}/pt-br`,
        'fr': `${baseUrl}/fr`,
        'id': `${baseUrl}/id`,
        'de': `${baseUrl}/de`
      };
      
      canonical.href = canonicalUrls[lang] || `${baseUrl}/`;
      
      // Remove existing hreflang tags
      const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflang.forEach(link => link.remove());
      
      // Add new hreflang tags
      const hreflangLinks = generateHreflangLinks(lang);
      hreflangLinks.forEach(({ hreflang, href }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        document.head.appendChild(link);
      });
      
    } catch (error) {
      console.warn('Failed to update canonical and hreflang tags:', error);
    }
  }, []);

  // Change language manually
  const changeLanguage = useCallback((lang: string) => {
    try {
      const newTranslation = getTranslation(lang);
      
      setCurrentLanguage(lang);
      setTranslation(newTranslation);
      
      // Update document meta tags
      setLanguageMeta(newTranslation);
      
      // Update canonical and hreflang
      updateCanonicalAndHreflang(lang);
      
      // Store preference
      localStorage.setItem('speedtest-language', lang);
      
      // Track language change
      trackEvent('language_changed', 'i18n', lang, 1);
      
    } catch (error) {
      console.warn('Failed to change language:', error);
    }
  }, [updateCanonicalAndHreflang]);

  // Generate hreflang links for current language
  const hreflangLinks = generateHreflangLinks(currentLanguage);

  return {
    t: translation,
    currentLanguage,
    isLoading,
    changeLanguage,
    hreflangLinks
  };
}

// Hook specifically for route-based language detection
export function useRouteTranslation(routePath: string): UseTranslationReturn {
  // Extract language from route
  const getLanguageFromRoute = (path: string): string => {
    if (path === '/' || path === '') return 'en';
    if (path === '/es') return 'es';
    if (path === '/pt-br') return 'pt-BR';
    if (path === '/fr') return 'fr';
    if (path === '/id') return 'id';
    if (path === '/de') return 'de';
    return 'en'; // Default fallback
  };

  const languageFromRoute = getLanguageFromRoute(routePath);
  return useTranslation(languageFromRoute);
}
