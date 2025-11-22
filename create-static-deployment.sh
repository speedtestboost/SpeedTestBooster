#!/bin/bash

# Script to create a deployment package for Hostinger
# This script creates a zip file of the hostinger-static folder for manual upload

echo "🚀 Creating deployment package for Hostinger..."

# Navigate to the project directory
cd "$(dirname "$0")"

# Create timestamp for unique filename
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
PACKAGE_NAME="speedtestbooster-static-${TIMESTAMP}.zip"

# Create zip package excluding unnecessary files
echo "📦 Packaging files..."
cd hostinger-static
zip -r "../${PACKAGE_NAME}" . \
    -x "*.DS_Store" \
    -x "*.git*" \
    -x "node_modules/*" \
    -x "*.log" \
    -x "*.tmp"

cd ..

echo "✅ Deployment package created: ${PACKAGE_NAME}"
echo ""
echo "📋 Next steps:"
echo "1. Log into your Hostinger File Manager"
echo "2. Navigate to public_html folder"
echo "3. Upload the ${PACKAGE_NAME} file"
echo "4. Extract it to replace existing files"
echo "5. Clear any caches in Hostinger control panel"
echo ""
echo "🔗 Or use Hostinger's Git integration if available"
echo "💡 Updated SEO title: 'HTML5 Speed Test - Free WiFi & Internet Speed Boost | No Apps Required'"