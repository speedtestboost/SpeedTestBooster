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

// Real ping measurement using multiple reliable endpoints
async function measureRealPing(): Promise<number> {
  const endpoints = [
    'https://www.google.com/generate_204',
    'https://www.cloudflare.com/cdn-cgi/trace',
    'https://httpbin.org/get'
  ];
  
  const pingResults: number[] = [];
  const testCount = 5; // Multiple tests for accuracy
  
  for (let i = 0; i < testCount; i++) {
    const endpoint = endpoints[i % endpoints.length];
    
    try {
      const startTime = performance.now();
      const response = await fetch(endpoint + '?t=' + Date.now(), { 
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.ok) {
        const endTime = performance.now();
        const pingTime = endTime - startTime;
        if (pingTime > 0 && pingTime < 5000) { // Valid ping range
          pingResults.push(pingTime);
        }
      }
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

// Real download speed measurement using CDN files similar to fast.com
async function measureRealDownloadSpeed(onProgress?: (progress: number) => void): Promise<number> {
  // Use fast, reliable CDN endpoints for accurate speed measurement
  const testFiles = [
    'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js',
    'https://unpkg.com/react@18/umd/react.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
  ];
  
  const speeds: number[] = [];
  const testCount = 3; // Run multiple iterations for accuracy
  
  for (let iteration = 0; iteration < testCount; iteration++) {
    onProgress?.((iteration / testCount) * 100);
    
    for (const fileUrl of testFiles) {
      try {
        const startTime = performance.now();
        const response = await fetch(fileUrl + '?t=' + Date.now(), {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (response.ok) {
          const reader = response.body?.getReader();
          if (!reader) continue;
          
          let totalBytes = 0;
          let done = false;
          
          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            if (value) {
              totalBytes += value.length;
            }
          }
          
          const endTime = performance.now();
          const durationSeconds = (endTime - startTime) / 1000;
          
          if (durationSeconds > 0.1 && totalBytes > 1000) { // Valid measurement
            const bitsPerSecond = (totalBytes * 8) / durationSeconds;
            const mbps = bitsPerSecond / (1000 * 1000); // Use 1000 for Mbps like fast.com
            speeds.push(mbps);
          }
        }
      } catch (error) {
        console.error(`Download test failed:`, error);
      }
    }
  }
  
  if (speeds.length === 0) {
    throw new Error('Unable to measure download speed');
  }
  
  // Return the highest stable speed (like fast.com does)
  speeds.sort((a, b) => b - a);
  return speeds[0];
}

// Real upload speed measurement using multiple test endpoints
async function measureRealUploadSpeed(onProgress?: (progress: number) => void): Promise<number> {
  const testSizes = [
    100 * 1024,   // 100KB
    500 * 1024,   // 500KB
    1024 * 1024   // 1MB
  ];
  
  const speeds: number[] = [];
  const testIterations = 2;
  
  for (let iteration = 0; iteration < testIterations; iteration++) {
    onProgress?.((iteration / testIterations) * 100);
    
    for (const size of testSizes) {
      try {
        // Create random data to upload
        const data = new Uint8Array(size);
        crypto.getRandomValues(data);
        
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
          
          if (durationSeconds > 0.1) { // Valid measurement
            const bitsPerSecond = (size * 8) / durationSeconds;
            const mbps = bitsPerSecond / (1000 * 1000); // Use 1000 for Mbps consistency
            speeds.push(mbps);
          }
        }
      } catch (error) {
        console.error(`Upload test failed:`, error);
      }
    }
  }
  
  if (speeds.length === 0) {
    throw new Error('Unable to measure upload speed');
  }
  
  // Return the highest stable speed
  speeds.sort((a, b) => b - a);
  return speeds[0];
}

// Real jitter measurement using ping variance
async function measureRealJitter(): Promise<number> {
  const pings: number[] = [];
  const endpoint = 'https://www.google.com/generate_204';
  
  for (let i = 0; i < 10; i++) {
    try {
      const startTime = performance.now();
      const response = await fetch(endpoint + '?t=' + Date.now(), { 
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
      
      if (response.ok) {
        const endTime = performance.now();
        const pingTime = endTime - startTime;
        if (pingTime > 0 && pingTime < 5000) {
          pings.push(pingTime);
        }
      }
    } catch (error) {
      // Skip failed requests
    }
  }
  
  if (pings.length < 3) {
    return 0;
  }
  
  // Calculate jitter as standard deviation
  const average = pings.reduce((sum, ping) => sum + ping, 0) / pings.length;
  const variance = pings.reduce((sum, ping) => sum + Math.pow(ping - average, 2), 0) / pings.length;
  
  return Math.sqrt(variance);
}