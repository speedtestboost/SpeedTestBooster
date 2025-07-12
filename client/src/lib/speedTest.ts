export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  serverLocation: string;
  connectionType: string;
}

export interface SpeedTestOptions {
  onProgress?: (progress: number, status: string) => void;
}

export async function performSpeedTest(options: SpeedTestOptions = {}): Promise<SpeedTestResult> {
  const { onProgress } = options;
  
  try {
    // Phase 1: Real ping test
    onProgress?.(10, "Measuring ping...");
    const pingResult = await measureRealPing();
    
    // Phase 2: Real download test
    onProgress?.(30, "Testing download speed...");
    const downloadSpeed = await measureRealDownloadSpeed((p) => {
      const phaseProgress = 30 + (p * 0.4); // 30% to 70%
      onProgress?.(phaseProgress, "Testing download speed...");
    });
    
    // Phase 3: Real upload test
    onProgress?.(75, "Testing upload speed...");
    const uploadSpeed = await measureRealUploadSpeed((p) => {
      const phaseProgress = 75 + (p * 0.15); // 75% to 90%
      onProgress?.(phaseProgress, "Testing upload speed...");
    });
    
    // Phase 4: Real jitter calculation
    onProgress?.(95, "Calculating jitter...");
    const jitter = await measureRealJitter();
    
    onProgress?.(100, "Test complete!");
    
    // Return actual measured values
    const result = {
      downloadSpeed: Math.round(downloadSpeed * 100) / 100,
      uploadSpeed: Math.round(uploadSpeed * 100) / 100,
      ping: Math.round(pingResult * 100) / 100,
      jitter: Math.round(jitter * 100) / 100,
      serverLocation: "Global Edge Network",
      connectionType: "Broadband"
    };
    
    console.log("Real speed test result:", result);
    return result;
    
  } catch (error) {
    console.error("Speed test failed:", error);
    throw new Error("Speed test failed");
  }
}

// Real ping measurement using multiple endpoints
async function measureRealPing(): Promise<number> {
  const endpoints = [
    'https://www.google.com/favicon.ico',
    'https://www.cloudflare.com/favicon.ico',
    'https://httpbin.org/json'
  ];
  
  const pingResults: number[] = [];
  
  for (const endpoint of endpoints) {
    try {
      const startTime = performance.now();
      const response = await fetch(endpoint, { 
        method: 'HEAD',
        cache: 'no-cache',
        mode: 'no-cors'
      });
      const endTime = performance.now();
      pingResults.push(endTime - startTime);
    } catch (error) {
      // Skip failed requests
    }
  }
  
  if (pingResults.length === 0) {
    throw new Error('Unable to measure ping');
  }
  
  // Return median ping to avoid outliers
  pingResults.sort((a, b) => a - b);
  return pingResults[Math.floor(pingResults.length / 2)];
}

// Real download speed measurement using actual file downloads
async function measureRealDownloadSpeed(onProgress?: (progress: number) => void): Promise<number> {
  const testFiles = [
    'https://httpbin.org/bytes/1048576',  // 1MB
    'https://httpbin.org/bytes/2097152',  // 2MB
    'https://httpbin.org/bytes/5242880'   // 5MB
  ];
  
  const speeds: number[] = [];
  
  for (let i = 0; i < testFiles.length; i++) {
    const fileUrl = testFiles[i];
    onProgress?.((i / testFiles.length) * 100);
    
    try {
      const startTime = performance.now();
      const response = await fetch(fileUrl, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.arrayBuffer();
        const endTime = performance.now();
        
        const durationSeconds = (endTime - startTime) / 1000;
        const bitsPerSecond = (data.byteLength * 8) / durationSeconds;
        const mbps = bitsPerSecond / (1024 * 1024);
        
        speeds.push(mbps);
      }
    } catch (error) {
      console.error(`Download test ${i + 1} failed:`, error);
    }
  }
  
  if (speeds.length === 0) {
    throw new Error('Unable to measure download speed');
  }
  
  // Return median speed to avoid outliers
  speeds.sort((a, b) => a - b);
  return speeds[Math.floor(speeds.length / 2)];
}

// Real upload speed measurement using actual data uploads
async function measureRealUploadSpeed(onProgress?: (progress: number) => void): Promise<number> {
  const testSizes = [
    512 * 1024,      // 512KB
    1024 * 1024,     // 1MB
    2 * 1024 * 1024  // 2MB
  ];
  
  const speeds: number[] = [];
  
  for (let i = 0; i < testSizes.length; i++) {
    const size = testSizes[i];
    onProgress?.((i / testSizes.length) * 100);
    
    try {
      // Create random data to upload
      const data = new Uint8Array(size);
      for (let j = 0; j < size; j++) {
        data[j] = Math.floor(Math.random() * 256);
      }
      
      const startTime = performance.now();
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.ok) {
        const endTime = performance.now();
        const durationSeconds = (endTime - startTime) / 1000;
        const bitsPerSecond = (size * 8) / durationSeconds;
        const mbps = bitsPerSecond / (1024 * 1024);
        
        speeds.push(mbps);
      }
    } catch (error) {
      console.error(`Upload test ${i + 1} failed:`, error);
    }
  }
  
  if (speeds.length === 0) {
    throw new Error('Unable to measure upload speed');
  }
  
  // Return median speed to avoid outliers
  speeds.sort((a, b) => a - b);
  return speeds[Math.floor(speeds.length / 2)];
}

// Real jitter measurement using ping variance
async function measureRealJitter(): Promise<number> {
  const pings: number[] = [];
  const endpoint = 'https://httpbin.org/json';
  
  for (let i = 0; i < 5; i++) {
    try {
      const startTime = performance.now();
      await fetch(endpoint, { 
        method: 'HEAD',
        cache: 'no-cache',
        mode: 'no-cors'
      });
      const endTime = performance.now();
      pings.push(endTime - startTime);
    } catch (error) {
      // Skip failed requests
    }
  }
  
  if (pings.length < 2) {
    return 0;
  }
  
  // Calculate jitter as standard deviation
  const average = pings.reduce((sum, ping) => sum + ping, 0) / pings.length;
  const variance = pings.reduce((sum, ping) => sum + Math.pow(ping - average, 2), 0) / pings.length;
  
  return Math.sqrt(variance);
}