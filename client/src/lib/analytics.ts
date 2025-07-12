// Google Analytics integration for Speed Test & Boost
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Google Analytics measurement ID not found. Add VITE_GA_MEASUREMENT_ID to your environment variables.');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    });
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href
  });
};

// Track events - speed test actions, optimization events, etc.
export const trackEvent = (
  action: string, 
  category: string = 'engagement', 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    custom_map: {
      'speed_test': 'custom_speed_test'
    }
  });
};

// Track speed test results
export const trackSpeedTest = (result: {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  connectionType: string;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Track as custom event
  window.gtag('event', 'speed_test_completed', {
    event_category: 'speed_test',
    event_label: result.connectionType,
    download_speed: Math.round(result.downloadSpeed),
    upload_speed: Math.round(result.uploadSpeed),
    ping: Math.round(result.ping),
    jitter: Math.round(result.jitter),
    connection_type: result.connectionType
  });
  
  // Track as conversion
  window.gtag('event', 'conversion', {
    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual conversion tracking
    value: 1,
    currency: 'USD',
    transaction_id: Date.now().toString()
  });
};

// Track WiFi optimization usage
export const trackWifiOptimization = (action: 'start' | 'complete') => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', `wifi_optimization_${action}`, {
    event_category: 'optimization',
    event_label: action,
    value: action === 'complete' ? 1 : 0
  });
};

// Track user engagement
export const trackEngagement = (action: string, details?: any) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: 'engagement',
    event_label: JSON.stringify(details),
    engagement_time_msec: Date.now()
  });
};