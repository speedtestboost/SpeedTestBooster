#!/bin/bash

# Script to fix network info queries in all city pages
# This replaces the API endpoint with client-side network utility

set -e

echo "🔧 Fixing network info in city pages..."

# List of files that need to be fixed
FILES=(
  "client/src/pages/ca-speed-test.tsx"
  "client/src/pages/us-speed-test.tsx"
  "client/src/pages/delhi-speed-test.tsx"
  "client/src/pages/kolkata-speed-test.tsx"
  "client/src/pages/au-speed-test.tsx"
  "client/src/pages/ai-speed-test.tsx"
  "client/src/pages/uk-speed-test.tsx"
  "client/src/pages/chennai-speed-test.tsx"
  "client/src/pages/hyderabad-speed-test.tsx"
  "client/src/pages/bangalore-speed-test.tsx"
)

for file in "${FILES[@]}"; do
  echo "📝 Updating $file..."
  
  # Add the import if not already present
  if ! grep -q "fetchNetworkInfo" "$file"; then
    # Add import after other imports
    sed -i '' '/import { performSpeedTest, type SpeedTestResult } from "@\/lib\/speedTest";/a\
import { fetchNetworkInfo, type NetworkInfo } from "@\/lib\/networkUtils";
' "$file"
  fi
  
  # Replace the network info query
  sed -i '' 's/queryKey: \[\"\/api\/network-info\"\]/queryKey: ["network-info"], queryFn: fetchNetworkInfo, staleTime: 5 * 60 * 1000, retry: 2/g' "$file"
  
  # Handle different query formats
  sed -i '' 's/{ queryKey: \[\"\/api\/network-info\"\] }/{ queryKey: ["network-info"], queryFn: fetchNetworkInfo, staleTime: 5 * 60 * 1000, retry: 2 }/g' "$file"
  
  echo "✅ Updated $file"
done

echo "🎉 All city pages updated!"
echo "📝 Don't forget to:"
echo "1. Build the application: npm run build"
echo "2. Deploy: ./quick-deploy.sh"
