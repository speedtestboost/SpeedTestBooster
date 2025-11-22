/**
 * Client-side network information utilities
 * For static deployments without backend API
 */

export type NetworkInfo = {
  ipAddress: string;
  connectionType: string;
  serverLocation: string;
  isp: string;
};

/**
 * Fetch comprehensive network information from IP geolocation services
 */
export async function fetchNetworkData(): Promise<Partial<NetworkInfo>> {
  const services = [
    {
      url: 'https://ipapi.co/json/',
      parser: (data: any) => ({
        ipAddress: data.ip,
        isp: data.org || data.asn_org || 'Unknown ISP',
        serverLocation: data.city && data.country_name ? `${data.city}, ${data.country_name}` : data.country_name || 'Unknown'
      })
    },
    {
      url: 'https://api.my-ip.io/ip.json',
      parser: (data: any) => ({
        ipAddress: data.ip,
        isp: data.org || 'Unknown ISP',
        serverLocation: data.country || 'Unknown'
      })
    },
    {
      url: 'http://ip-api.com/json/',
      parser: (data: any) => ({
        ipAddress: data.query,
        isp: data.isp || data.org || 'Unknown ISP',
        serverLocation: data.city && data.country ? `${data.city}, ${data.country}` : data.country || 'Unknown'
      })
    },
    {
      url: 'https://api.ipify.org?format=json',
      parser: (data: any) => ({
        ipAddress: data.ip,
        isp: 'Detecting...',
        serverLocation: 'Auto-detected'
      })
    }
  ];

  for (const service of services) {
    try {
      console.log(`Fetching network data from ${service.url}...`);
      
      const response = await fetch(service.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.warn(`Service ${service.url} returned ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      console.log(`Response from ${service.url}:`, data);
      
      const parsed = service.parser(data);
      
      if (parsed.ipAddress) {
        console.log(`Successfully got network data:`, parsed);
        return parsed;
      }
      
    } catch (error) {
      console.warn(`Failed to fetch from ${service.url}:`, error);
      continue;
    }
  }
  
  return {
    ipAddress: 'Unable to detect',
    isp: 'Unknown ISP',
    serverLocation: 'Unknown'
  };
}

/**
 * Get connection type based on browser APIs
 */
export function getConnectionType(): string {
  // @ts-ignore - navigator.connection is experimental
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    return connection.effectiveType || connection.type || 'Unknown';
  }
  
  // Fallback detection
  if (navigator.userAgent.includes('Mobile')) {
    return 'Mobile';
  }
  
  return 'WiFi/Ethernet';
}

/**
 * Fetch network information for static deployments
 */
export async function fetchNetworkInfo(): Promise<NetworkInfo> {
  try {
    const networkData = await fetchNetworkData();
    
    return {
      ipAddress: networkData.ipAddress || 'Unable to detect',
      connectionType: getConnectionType(),
      serverLocation: networkData.serverLocation || 'Unknown',
      isp: networkData.isp || 'Unknown ISP'
    };
  } catch (error) {
    console.error('Failed to fetch network info:', error);
    
    return {
      ipAddress: 'Unable to detect',
      connectionType: getConnectionType(),
      serverLocation: 'Unknown',
      isp: 'Unknown ISP'
    };
  }
}
