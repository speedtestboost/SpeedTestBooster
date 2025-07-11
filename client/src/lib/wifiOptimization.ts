export interface DeviceCapabilities {
  cpu: string;
  memory: string;
  connection: string;
  browser: string;
  platform: string;
  maxTouchPoints: number;
  screenSize: string;
  hardwareConcurrency: number;
  deviceMemory?: number;
  networkType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export interface NetworkConditions {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  ipAddress: string;
  isp?: string;
  connectionType: string;
}

export interface OptimizationSuggestion {
  id: string;
  category: 'hardware' | 'network' | 'software' | 'location' | 'security';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: string[];
  estimatedImprovement: string;
  icon: string;
}

export interface OptimizationReport {
  overallScore: number;
  deviceScore: number;
  networkScore: number;
  suggestions: OptimizationSuggestion[];
  summary: string;
}

export async function analyzeDeviceCapabilities(): Promise<DeviceCapabilities> {
  const userAgent = navigator.userAgent;
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  // Detect browser
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  // Detect platform
  let platform = 'Unknown';
  if (userAgent.includes('Windows')) platform = 'Windows';
  else if (userAgent.includes('Mac')) platform = 'macOS';
  else if (userAgent.includes('Linux')) platform = 'Linux';
  else if (userAgent.includes('Android')) platform = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) platform = 'iOS';
  
  // Detect device type
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android.*Tablet/i.test(userAgent);
  
  let deviceType = 'Desktop';
  if (isTablet) deviceType = 'Tablet';
  else if (isMobile) deviceType = 'Mobile';
  
  // Memory estimation
  const deviceMemory = (navigator as any).deviceMemory || 
    (navigator.hardwareConcurrency >= 8 ? 8 : 
     navigator.hardwareConcurrency >= 4 ? 4 : 2);
  
  return {
    cpu: `${navigator.hardwareConcurrency || 2} cores`,
    memory: `${deviceMemory}GB estimated`,
    connection: connection ? connection.effectiveType || 'Unknown' : 'Unknown',
    browser,
    platform,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    screenSize: `${screen.width}x${screen.height}`,
    hardwareConcurrency: navigator.hardwareConcurrency || 2,
    deviceMemory,
    networkType: connection?.type,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt
  };
}

export function generateOptimizationSuggestions(
  capabilities: DeviceCapabilities,
  network: NetworkConditions
): OptimizationReport {
  const suggestions: OptimizationSuggestion[] = [];
  
  // Analyze network performance
  const networkScore = calculateNetworkScore(network);
  const deviceScore = calculateDeviceScore(capabilities);
  const overallScore = Math.round((networkScore + deviceScore) / 2);
  
  // Speed-based suggestions
  if (network.downloadSpeed < 25) {
    suggestions.push({
      id: 'upgrade-plan',
      category: 'network',
      priority: 'high',
      title: 'Upgrade Internet Plan',
      description: 'Your current download speed is below modern standards. Consider upgrading to a faster plan.',
      impact: 'Significantly faster browsing, streaming, and downloads',
      difficulty: 'easy',
      steps: [
        'Contact your ISP to discuss available plans',
        'Compare speeds: 25+ Mbps for basic use, 50+ Mbps for multiple devices',
        'Consider fiber optic if available in your area',
        'Ask about promotional rates for new plans'
      ],
      estimatedImprovement: '2-5x speed increase',
      icon: 'TrendingUp'
    });
  }
  
  if (network.uploadSpeed < 5) {
    suggestions.push({
      id: 'upload-optimization',
      category: 'network',
      priority: 'medium',
      title: 'Improve Upload Speed',
      description: 'Low upload speed affects video calls and file sharing. Several optimizations can help.',
      impact: 'Better video call quality and faster file uploads',
      difficulty: 'medium',
      steps: [
        'Check if your router supports QoS (Quality of Service)',
        'Prioritize video calling apps in router settings',
        'Consider upgrading to a plan with symmetric speeds',
        'Use wired connection for important uploads'
      ],
      estimatedImprovement: '50-100% upload improvement',
      icon: 'Upload'
    });
  }
  
  // Ping-based suggestions
  if (network.ping > 50) {
    suggestions.push({
      id: 'reduce-latency',
      category: 'network',
      priority: 'high',
      title: 'Reduce Network Latency',
      description: 'High ping affects online gaming and video calls. Multiple factors can be optimized.',
      impact: 'More responsive online experience',
      difficulty: 'medium',
      steps: [
        'Use wired Ethernet instead of WiFi when possible',
        'Move closer to your WiFi router',
        'Change WiFi channel to less congested one (1, 6, or 11 for 2.4GHz)',
        'Update router firmware',
        'Consider gaming-optimized router or mesh system'
      ],
      estimatedImprovement: '30-60% latency reduction',
      icon: 'Zap'
    });
  }
  
  // Device-specific suggestions
  if (capabilities.hardwareConcurrency < 4) {
    suggestions.push({
      id: 'optimize-device',
      category: 'hardware',
      priority: 'medium',
      title: 'Optimize Device Performance',
      description: 'Your device has limited processing power. Optimize for better network performance.',
      impact: 'Smoother browsing and better multitasking',
      difficulty: 'easy',
      steps: [
        'Close unnecessary browser tabs and applications',
        'Clear browser cache and cookies regularly',
        'Disable browser extensions you don\'t need',
        'Use lightweight browsers like Chrome or Edge',
        'Consider upgrading device if very old'
      ],
      estimatedImprovement: '20-40% performance boost',
      icon: 'Cpu'
    });
  }
  
  // Mobile-specific suggestions
  if (capabilities.maxTouchPoints > 0) {
    suggestions.push({
      id: 'mobile-optimization',
      category: 'software',
      priority: 'medium',
      title: 'Mobile Network Optimization',
      description: 'Mobile devices have unique optimization opportunities.',
      impact: 'Better mobile internet experience and battery life',
      difficulty: 'easy',
      steps: [
        'Enable WiFi calling if supported by carrier',
        'Use 5GHz WiFi band when available',
        'Disable background app refresh for unnecessary apps',
        'Turn off automatic app updates over cellular',
        'Consider WiFi analyzer apps to find best channels'
      ],
      estimatedImprovement: '15-30% speed improvement',
      icon: 'Smartphone'
    });
  }
  
  // Router and location suggestions
  suggestions.push({
    id: 'router-placement',
    category: 'location',
    priority: 'medium',
    title: 'Optimize Router Placement',
    description: 'Router location significantly affects WiFi performance throughout your home.',
    impact: 'Better coverage and speeds in all rooms',
    difficulty: 'easy',
    steps: [
      'Place router in central, elevated location',
      'Avoid enclosed cabinets or metal objects nearby',
      'Keep router away from microwaves and baby monitors',
      'Point antennas vertically for better horizontal coverage',
      'Consider WiFi extenders for large homes'
    ],
    estimatedImprovement: '25-50% coverage improvement',
    icon: 'MapPin'
  });
  
  // Security suggestions
  if (network.connectionType === 'Unknown' || network.connectionType === 'Public') {
    suggestions.push({
      id: 'security-optimization',
      category: 'security',
      priority: 'high',
      title: 'Secure Your Connection',
      description: 'Unsecured networks can be slow and unsafe. Implement proper security measures.',
      impact: 'Faster speeds and better security',
      difficulty: 'medium',
      steps: [
        'Use WPA3 or WPA2 encryption on your router',
        'Change default router password',
        'Enable guest network for visitors',
        'Use VPN on public networks',
        'Regularly update router firmware'
      ],
      estimatedImprovement: '10-20% speed increase',
      icon: 'Shield'
    });
  }
  
  // Advanced suggestions for good connections
  if (network.downloadSpeed >= 50 && network.ping <= 30) {
    suggestions.push({
      id: 'advanced-optimization',
      category: 'network',
      priority: 'low',
      title: 'Advanced Network Tuning',
      description: 'Your connection is already good. Fine-tune for maximum performance.',
      impact: 'Squeeze out every bit of performance',
      difficulty: 'hard',
      steps: [
        'Enable QoS on router to prioritize important traffic',
        'Use DNS servers like 1.1.1.1 or 8.8.8.8',
        'Configure bandwidth allocation per device',
        'Enable beamforming if supported by router',
        'Consider upgrading to WiFi 6 router for future-proofing'
      ],
      estimatedImprovement: '5-15% optimization',
      icon: 'Settings'
    });
  }
  
  // Sort suggestions by priority
  suggestions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  
  // Generate summary
  const summary = generateOptimizationSummary(overallScore, networkScore, deviceScore, suggestions.length);
  
  return {
    overallScore,
    deviceScore,
    networkScore,
    suggestions: suggestions.slice(0, 8), // Limit to top 8 suggestions
    summary
  };
}

function calculateNetworkScore(network: NetworkConditions): number {
  let score = 0;
  
  // Download speed scoring (0-40 points)
  if (network.downloadSpeed >= 100) score += 40;
  else if (network.downloadSpeed >= 50) score += 30;
  else if (network.downloadSpeed >= 25) score += 20;
  else if (network.downloadSpeed >= 10) score += 10;
  else score += 5;
  
  // Upload speed scoring (0-25 points)
  if (network.uploadSpeed >= 50) score += 25;
  else if (network.uploadSpeed >= 25) score += 20;
  else if (network.uploadSpeed >= 10) score += 15;
  else if (network.uploadSpeed >= 5) score += 10;
  else score += 5;
  
  // Ping scoring (0-25 points)
  if (network.ping <= 20) score += 25;
  else if (network.ping <= 40) score += 20;
  else if (network.ping <= 80) score += 15;
  else if (network.ping <= 150) score += 10;
  else score += 5;
  
  // Jitter scoring (0-10 points)
  if (network.jitter <= 5) score += 10;
  else if (network.jitter <= 15) score += 7;
  else if (network.jitter <= 30) score += 5;
  else score += 2;
  
  return Math.min(score, 100);
}

function calculateDeviceScore(capabilities: DeviceCapabilities): number {
  let score = 0;
  
  // CPU cores scoring (0-30 points)
  if (capabilities.hardwareConcurrency >= 8) score += 30;
  else if (capabilities.hardwareConcurrency >= 4) score += 25;
  else if (capabilities.hardwareConcurrency >= 2) score += 15;
  else score += 10;
  
  // Memory scoring (0-25 points)
  if (capabilities.deviceMemory && capabilities.deviceMemory >= 8) score += 25;
  else if (capabilities.deviceMemory && capabilities.deviceMemory >= 4) score += 20;
  else if (capabilities.deviceMemory && capabilities.deviceMemory >= 2) score += 15;
  else score += 10;
  
  // Browser scoring (0-20 points)
  if (['Chrome', 'Firefox', 'Safari', 'Edge'].includes(capabilities.browser)) score += 20;
  else score += 10;
  
  // Platform scoring (0-15 points)
  if (['Windows', 'macOS', 'Linux'].includes(capabilities.platform)) score += 15;
  else if (['iOS', 'Android'].includes(capabilities.platform)) score += 12;
  else score += 8;
  
  // Network capability scoring (0-10 points)
  if (capabilities.effectiveType === '4g') score += 10;
  else if (capabilities.effectiveType === '3g') score += 7;
  else if (capabilities.effectiveType === '2g') score += 4;
  else score += 8; // Assume good connection if unknown
  
  return Math.min(score, 100);
}

function generateOptimizationSummary(
  overallScore: number,
  networkScore: number,
  deviceScore: number,
  suggestionCount: number
): string {
  let summary = '';
  
  if (overallScore >= 85) {
    summary = `Excellent performance! Your connection is performing very well. We found ${suggestionCount} minor optimizations to squeeze out even more performance.`;
  } else if (overallScore >= 70) {
    summary = `Good performance with room for improvement. Your setup is solid but ${suggestionCount} key optimizations could boost your speeds significantly.`;
  } else if (overallScore >= 50) {
    summary = `Moderate performance detected. ${suggestionCount} important optimizations have been identified that could dramatically improve your internet experience.`;
  } else {
    summary = `Significant improvement needed. We've identified ${suggestionCount} critical optimizations that could transform your internet performance.`;
  }
  
  // Add specific insights
  if (networkScore < 50) {
    summary += ' Your network connection is the primary bottleneck.';
  } else if (deviceScore < 50) {
    summary += ' Your device capabilities are limiting performance.';
  }
  
  return summary;
}