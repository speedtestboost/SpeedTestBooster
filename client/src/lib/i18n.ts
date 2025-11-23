// Multilingual support utilities with geolocation-based language detection
import { trackEvent } from './analytics';

export interface Translation {
  lang: string;
  title: string;
  metaDescription: string;
  keywords: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  startTest: string;
  optimize: string;
  connected: string;
  ipAddress: string;
  latestResults: string;
  downloadSpeed: string;
  uploadSpeed: string;
  ping: string;
  jitter: string;
  runningTest: string;
  aboutSpeedTest: string;
  understandingResults: string;
  speedRequirements: string;
  // Footer content
  internationalTests: string;
  expertGuides: string;
  wifiAnalyzer: string;
  faqTitle: string;
  // Common terms
  mbps: string;
  ms: string;
  free: string;
  noApps: string;
  instantResults: string;
  worksAnywhere: string;
  // Features
  noDownloads: string;
  noPlugins: string;
  crossPlatform: string;
  globalServers: string;
  allISPs: string;
}

// Country to language mapping based on primary language
const countryLanguageMap: Record<string, string> = {
  // English-speaking countries
  'US': 'en', 'CA': 'en', 'GB': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en', 'ZA': 'en', 'SG': 'en',
  // Spanish-speaking countries
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'VE': 'es', 'CL': 'es', 'EC': 'es', 
  'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 
  'CR': 'es', 'PA': 'es', 'UY': 'es', 'PR': 'es',
  // Portuguese-speaking countries
  'BR': 'pt-BR', 'PT': 'pt', 'AO': 'pt', 'MZ': 'pt',
  // French-speaking countries
  'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr', 'MC': 'fr', 'CD': 'fr', 'CI': 'fr', 'CM': 'fr',
  'SN': 'fr', 'ML': 'fr', 'BF': 'fr', 'NE': 'fr', 'TD': 'fr', 'MG': 'fr', 'CG': 'fr', 'GA': 'fr',
  // Indonesian-speaking countries
  'ID': 'id', 'MY': 'id', 'BN': 'id',
  // German-speaking countries
  'DE': 'de', 'AT': 'de',
  // Italian-speaking countries
  'IT': 'it',
  // Dutch-speaking countries
  'NL': 'nl',
  // Other major countries default to English but can be expanded
  'IN': 'en', 'JP': 'en', 'KR': 'en', 'CN': 'en', 'TH': 'en', 'VN': 'en', 'PH': 'en'
};

// Translation data for supported languages
export const translations: Record<string, Translation> = {
  en: {
    lang: 'en',
    title: 'Free Internet Speed Test - Accurate WiFi & Broadband Speed Checker 2025',
    metaDescription: 'Test your internet speed instantly with our accurate HTML5 speed test tool. Check download, upload, ping & jitter. Works with all ISPs. 100% free, no downloads required.',
    keywords: 'internet speed test, wifi speed test, broadband speed test, html5 speed test, free speed test, check internet speed, bandwidth test, speed checker',
    heroTitle: 'Internet and WiFi Speed Test',
    heroSubtitle: 'No Apps • No Downloads • No Plugins Required!',
    heroDescription: '100% browser-based speed test that works on any device. Web-based bandwidth test with instant results for download, upload, ping & jitter.',
    startTest: 'Start Speed Test',
    optimize: 'Optimize WiFi Speed',
    connected: 'Connected',
    ipAddress: 'Current IP Address',
    latestResults: 'Latest Results',
    downloadSpeed: 'Download Speed',
    uploadSpeed: 'Upload Speed',
    ping: 'Ping',
    jitter: 'Jitter',
    runningTest: 'Running Test...',
    aboutSpeedTest: 'About Internet Speed Tests',
    understandingResults: 'Understanding Your Results',
    speedRequirements: 'Speed Requirements',
    internationalTests: 'International Speed Tests',
    expertGuides: 'Expert Speed Guides & Optimization',
    wifiAnalyzer: 'WiFi Analyzer & Network Tools',
    faqTitle: 'Frequently Asked Questions',
    mbps: 'Mbps',
    ms: 'ms',
    free: '100% Free',
    noApps: 'No Installation',
    instantResults: 'Instant Results',
    worksAnywhere: 'Works on Any Device',
    noDownloads: 'No Downloads',
    noPlugins: 'No Plugins',
    crossPlatform: 'Cross-platform',
    globalServers: 'Global Servers',
    allISPs: 'All ISP Support'
  },
  es: {
    lang: 'es',
    title: 'Test de Velocidad Internet Gratis - Medidor WiFi y Banda Ancha Preciso 2025',
    metaDescription: 'Mide tu velocidad de internet al instante con nuestra herramienta de test HTML5 precisa. Verifica descarga, subida, ping y jitter. Compatible con todos los ISPs. 100% gratis, sin descargas.',
    keywords: 'test velocidad internet, test velocidad wifi, test banda ancha, test velocidad html5, test velocidad gratis, verificar velocidad internet, test ancho banda',
    heroTitle: 'Test de Velocidad Internet y WiFi',
    heroSubtitle: '¡Sin Apps • Sin Descargas • Sin Plugins!',
    heroDescription: 'Test de velocidad 100% basado en navegador que funciona en cualquier dispositivo. Prueba de ancho de banda web con resultados instantáneos.',
    startTest: 'Iniciar Test de Velocidad',
    optimize: 'Optimizar Velocidad WiFi',
    connected: 'Conectado',
    ipAddress: 'Dirección IP Actual',
    latestResults: 'Últimos Resultados',
    downloadSpeed: 'Velocidad de Descarga',
    uploadSpeed: 'Velocidad de Subida',
    ping: 'Ping',
    jitter: 'Jitter',
    runningTest: 'Ejecutando Test...',
    aboutSpeedTest: 'Acerca de los Tests de Velocidad Internet',
    understandingResults: 'Entendiendo tus Resultados',
    speedRequirements: 'Requisitos de Velocidad',
    internationalTests: 'Tests de Velocidad Internacionales',
    expertGuides: 'Guías Expertas y Optimización',
    wifiAnalyzer: 'Analizador WiFi y Herramientas de Red',
    faqTitle: 'Preguntas Frecuentes',
    mbps: 'Mbps',
    ms: 'ms',
    free: '100% Gratis',
    noApps: 'Sin Instalación',
    instantResults: 'Resultados Instantáneos',
    worksAnywhere: 'Funciona en Cualquier Dispositivo',
    noDownloads: 'Sin Descargas',
    noPlugins: 'Sin Plugins',
    crossPlatform: 'Multiplataforma',
    globalServers: 'Servidores Globales',
    allISPs: 'Compatible con Todos los ISPs'
  },
  'pt-BR': {
    lang: 'pt-BR',
    title: 'Teste de Velocidade Internet Grátis - Medidor WiFi e Banda Larga Preciso 2025',
    metaDescription: 'Teste sua velocidade de internet instantaneamente com nossa ferramenta HTML5 precisa. Verifique download, upload, ping e jitter. Funciona com todos os provedores. 100% grátis, sem downloads.',
    keywords: 'teste velocidade internet, teste velocidade wifi, teste banda larga, teste velocidade html5, teste velocidade gratis, verificar velocidade internet, teste largura banda',
    heroTitle: 'Teste de Velocidade Internet e WiFi',
    heroSubtitle: 'Sem Apps • Sem Downloads • Sem Plugins!',
    heroDescription: 'Teste de velocidade 100% baseado no navegador que funciona em qualquer dispositivo. Teste de largura de banda web com resultados instantâneos.',
    startTest: 'Iniciar Teste de Velocidade',
    optimize: 'Otimizar Velocidade WiFi',
    connected: 'Conectado',
    ipAddress: 'Endereço IP Atual',
    latestResults: 'Últimos Resultados',
    downloadSpeed: 'Velocidade de Download',
    uploadSpeed: 'Velocidade de Upload',
    ping: 'Ping',
    jitter: 'Jitter',
    runningTest: 'Executando Teste...',
    aboutSpeedTest: 'Sobre os Testes de Velocidade de Internet',
    understandingResults: 'Entendendo seus Resultados',
    speedRequirements: 'Requisitos de Velocidade',
    internationalTests: 'Testes de Velocidade Internacionais',
    expertGuides: 'Guias Especialistas e Otimização',
    wifiAnalyzer: 'Analisador WiFi e Ferramentas de Rede',
    faqTitle: 'Perguntas Frequentes',
    mbps: 'Mbps',
    ms: 'ms',
    free: '100% Grátis',
    noApps: 'Sem Instalação',
    instantResults: 'Resultados Instantâneos',
    worksAnywhere: 'Funciona em Qualquer Dispositivo',
    noDownloads: 'Sem Downloads',
    noPlugins: 'Sem Plugins',
    crossPlatform: 'Multiplataforma',
    globalServers: 'Servidores Globais',
    allISPs: 'Suporte a Todos os Provedores'
  },
  fr: {
    lang: 'fr',
    title: 'Test de Vitesse Internet Gratuit - Testeur WiFi et Haut Débit Précis 2025',
    metaDescription: 'Testez votre vitesse internet instantanément avec notre outil HTML5 précis. Vérifiez téléchargement, upload, ping et gigue. Compatible avec tous les FAI. 100% gratuit, aucun téléchargement.',
    keywords: 'test vitesse internet, test vitesse wifi, test haut debit, test vitesse html5, test vitesse gratuit, verifier vitesse internet, test bande passante',
    heroTitle: 'Test de Vitesse Internet et WiFi',
    heroSubtitle: 'Sans Apps • Sans Téléchargements • Sans Plugins !',
    heroDescription: 'Test de vitesse 100% basé sur navigateur qui fonctionne sur tout appareil. Test de bande passante web avec résultats instantanés.',
    startTest: 'Démarrer Test de Vitesse',
    optimize: 'Optimiser Vitesse WiFi',
    connected: 'Connecté',
    ipAddress: 'Adresse IP Actuelle',
    latestResults: 'Derniers Résultats',
    downloadSpeed: 'Vitesse de Téléchargement',
    uploadSpeed: 'Vitesse d\'Upload',
    ping: 'Ping',
    jitter: 'Gigue',
    runningTest: 'Test en Cours...',
    aboutSpeedTest: 'À Propos des Tests de Vitesse Internet',
    understandingResults: 'Comprendre vos Résultats',
    speedRequirements: 'Exigences de Vitesse',
    internationalTests: 'Tests de Vitesse Internationaux',
    expertGuides: 'Guides d\'Experts et Optimisation',
    wifiAnalyzer: 'Analyseur WiFi et Outils Réseau',
    faqTitle: 'Questions Fréquemment Posées',
    mbps: 'Mbps',
    ms: 'ms',
    free: '100% Gratuit',
    noApps: 'Sans Installation',
    instantResults: 'Résultats Instantanés',
    worksAnywhere: 'Fonctionne sur Tout Appareil',
    noDownloads: 'Sans Téléchargements',
    noPlugins: 'Sans Plugins',
    crossPlatform: 'Multiplateforme',
    globalServers: 'Serveurs Globaux',
    allISPs: 'Support Tous FAI'
  },
  id: {
    lang: 'id',
    title: 'Test Kecepatan Internet Gratis - Penguji WiFi & Broadband Akurat 2025',
    metaDescription: 'Tes kecepatan internet Anda secara instan dengan alat HTML5 akurat kami. Periksa download, upload, ping & jitter. Bekerja dengan semua ISP. 100% gratis, tanpa unduhan.',
    keywords: 'test kecepatan internet, test kecepatan wifi, test broadband, test kecepatan html5, test kecepatan gratis, cek kecepatan internet, test bandwidth',
    heroTitle: 'Test Kecepatan Internet dan WiFi',
    heroSubtitle: 'Tanpa Aplikasi • Tanpa Unduhan • Tanpa Plugin!',
    heroDescription: 'Test kecepatan 100% berbasis browser yang bekerja di perangkat apa pun. Tes bandwidth web dengan hasil instan.',
    startTest: 'Mulai Test Kecepatan',
    optimize: 'Optimalkan Kecepatan WiFi',
    connected: 'Terhubung',
    ipAddress: 'Alamat IP Saat Ini',
    latestResults: 'Hasil Terbaru',
    downloadSpeed: 'Kecepatan Download',
    uploadSpeed: 'Kecepatan Upload',
    ping: 'Ping',
    jitter: 'Jitter',
    runningTest: 'Menjalankan Test...',
    aboutSpeedTest: 'Tentang Test Kecepatan Internet',
    understandingResults: 'Memahami Hasil Anda',
    speedRequirements: 'Kebutuhan Kecepatan',
    internationalTests: 'Test Kecepatan Internasional',
    expertGuides: 'Panduan Ahli & Optimisasi',
    wifiAnalyzer: 'Analyzer WiFi & Alat Jaringan',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    mbps: 'Mbps',
    ms: 'ms',
    free: '100% Gratis',
    noApps: 'Tanpa Instalasi',
    instantResults: 'Hasil Instan',
    worksAnywhere: 'Bekerja di Perangkat Apa Pun',
    noDownloads: 'Tanpa Unduhan',
    noPlugins: 'Tanpa Plugin',
    crossPlatform: 'Lintas Platform',
    globalServers: 'Server Global',
    allISPs: 'Dukungan Semua ISP'
  },
  de: {
    lang: 'de',
    title: 'Kostenloses Internet-Geschwindigkeitstest - Präziser WiFi & Breitband Checker 2025',
    metaDescription: 'Testen Sie Ihre Internetgeschwindigkeit sofort mit unserem präzisen HTML5-Tool. Prüfen Sie Download, Upload, Ping & Jitter. Funktioniert mit allen Anbietern. 100% kostenlos, keine Downloads.',
    keywords: 'internet geschwindigkeitstest, wifi geschwindigkeitstest, breitband test, html5 geschwindigkeitstest, kostenloser geschwindigkeitstest, internetgeschwindigkeit prüfen',
    heroTitle: 'Internet und WiFi Geschwindigkeitstest',
    heroSubtitle: 'Keine Apps • Keine Downloads • Keine Plugins!',
    heroDescription: '100% browser-basierter Geschwindigkeitstest, der auf jedem Gerät funktioniert. Web-basierte Bandbreitenprüfung mit sofortigen Ergebnissen.',
    startTest: 'Geschwindigkeitstest Starten',
    optimize: 'WiFi-Geschwindigkeit Optimieren',
    connected: 'Verbunden',
    ipAddress: 'Aktuelle IP-Adresse',
    latestResults: 'Neueste Ergebnisse',
    downloadSpeed: 'Download-Geschwindigkeit',
    uploadSpeed: 'Upload-Geschwindigkeit',
    ping: 'Ping',
    jitter: 'Jitter',
    runningTest: 'Test läuft...',
    aboutSpeedTest: 'Über Internet-Geschwindigkeitstests',
    understandingResults: 'Ihre Ergebnisse Verstehen',
    speedRequirements: 'Geschwindigkeitsanforderungen',
    internationalTests: 'Internationale Geschwindigkeitstests',
    expertGuides: 'Experten-Leitfäden & Optimierung',
    wifiAnalyzer: 'WiFi-Analyzer & Netzwerk-Tools',
    faqTitle: 'Häufig Gestellte Fragen',
    mbps: 'Mbps',
    ms: 'ms',
    free: '100% Kostenlos',
    noApps: 'Keine Installation',
    instantResults: 'Sofortige Ergebnisse',
    worksAnywhere: 'Funktioniert auf Jedem Gerät',
    noDownloads: 'Keine Downloads',
    noPlugins: 'Keine Plugins',
    crossPlatform: 'Plattformübergreifend',
    globalServers: 'Globale Server',
    allISPs: 'Alle Anbieter Unterstützt'
  }
};

// Geolocation-based language detection
export async function detectUserLanguage(): Promise<string> {
  try {
    // First check browser language preference
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const shortLang = browserLang.split('-')[0];
    
    // Try to get user's country via IP geolocation
    let detectedCountry: string | null = null;
    
    try {
      // Use multiple geolocation services for reliability
      const geoServices = [
        'https://ipapi.co/country/',
        'https://api.country.is/',
        'http://ip-api.com/json/?fields=countryCode'
      ];
      
      for (const service of geoServices) {
        try {
          const response = await fetch(service, { 
            method: 'GET',
            signal: AbortSignal.timeout(3000) // 3 second timeout
          });
          
          if (response.ok) {
            if (service.includes('ipapi.co')) {
              detectedCountry = (await response.text()).trim().toUpperCase();
            } else if (service.includes('country.is')) {
              const data = await response.json();
              detectedCountry = data.country?.toUpperCase();
            } else if (service.includes('ip-api.com')) {
              const data = await response.json();
              detectedCountry = data.countryCode?.toUpperCase();
            }
            
            if (detectedCountry && detectedCountry.length === 2) {
              break; // Successfully got country code
            }
          }
        } catch (err) {
          console.warn(`Geolocation service ${service} failed:`, err);
          continue; // Try next service
        }
      }
    } catch (geoError) {
      console.warn('Geolocation detection failed:', geoError);
    }
    
    // Determine language based on country or browser preference
    let detectedLanguage = 'en'; // default
    
    if (detectedCountry && countryLanguageMap[detectedCountry]) {
      detectedLanguage = countryLanguageMap[detectedCountry];
    } else if (translations[browserLang]) {
      detectedLanguage = browserLang;
    } else if (translations[shortLang]) {
      detectedLanguage = shortLang;
    }
    
    // Track the detected language for analytics
    trackEvent('language_detected', 'i18n', detectedLanguage, 1);
    
    return detectedLanguage;
  } catch (error) {
    console.warn('Language detection failed, using default:', error);
    return 'en';
  }
}

// Get translation for current language
export function getTranslation(lang: string): Translation {
  return translations[lang] || translations.en;
}

// Get supported languages list
export function getSupportedLanguages(): Array<{ code: string; name: string; flag: string }> {
  return [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];
}

// Get language-specific route
export function getLanguageRoute(lang: string): string {
  const routeMap: Record<string, string> = {
    'en': '/',
    'es': '/es',
    'pt-BR': '/pt-br',
    'fr': '/fr',
    'id': '/id',
    'de': '/de'
  };
  
  return routeMap[lang] || '/';
}

// Generate hreflang links for SEO
export function generateHreflangLinks(currentLang: string): Array<{ hreflang: string; href: string }> {
  const baseUrl = 'https://speedtestboost.com';
  const links: Array<{ hreflang: string; href: string }> = [];
  
  // Add all supported languages
  Object.keys(translations).forEach(lang => {
    const route = getLanguageRoute(lang);
    links.push({
      hreflang: lang,
      href: `${baseUrl}${route}`
    });
  });
  
  // Add x-default (fallback)
  links.push({
    hreflang: 'x-default',
    href: `${baseUrl}/`
  });
  
  return links;
}

// Set document language and meta tags
export function setLanguageMeta(translation: Translation): void {
  try {
    // Set document language
    document.documentElement.lang = translation.lang;
    
    // Update title
    document.title = translation.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', translation.metaDescription);
    }
    
    // Update keywords
    let keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', translation.keywords);
    
    // Update content-language meta tag
    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', translation.lang);
    
    // Update Open Graph locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    
    const localeMap: Record<string, string> = {
      'en': 'en_US',
      'es': 'es_ES',
      'pt-BR': 'pt_BR',
      'fr': 'fr_FR',
      'id': 'id_ID',
      'de': 'de_DE'
    };
    
    ogLocale.setAttribute('content', localeMap[translation.lang] || 'en_US');
    
    // Update OG title and description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', translation.title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', translation.metaDescription);
    }
    
  } catch (error) {
    console.warn('Failed to set language meta tags:', error);
  }
}
