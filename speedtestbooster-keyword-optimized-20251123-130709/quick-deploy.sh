#!/bin/bash

# Quick deployment script for SpeedTestBooster
# This script builds, packages, and prepares files for Hostinger upload

set -e

echo "🚀 Quick Deploy to Hostinger"
echo "================================"

# Build the application
echo "📦 Building application..."
npm run build

# Copy to hostinger-static
echo "📁 Copying files to hostinger-static..."
cp -r dist/public/* hostinger-static/

# Create deployment package
echo "🗜️ Creating deployment package..."
./create-static-deployment.sh

# Show the file that was created
LATEST_ZIP=$(ls -t speedtestbooster-static-*.zip | head -1)
echo ""
echo "✅ Ready for deployment!"
echo "📦 File: ${LATEST_ZIP}"
echo ""
echo "📋 Next steps:"
echo "1. Log into Hostinger File Manager"
echo "2. Upload ${LATEST_ZIP} to public_html/"
echo "3. Extract and replace files"
echo "4. Your changes will be live!"
