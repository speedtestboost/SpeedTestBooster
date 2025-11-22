#!/bin/bash

# SpeedTestBooster - Quick Hostinger Deployment
echo "🚀 SpeedTestBooster - Creating Hostinger Deployment Package"
echo "========================================================"

# Get timestamp for unique filename
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
ZIP_NAME="speedtestbooster-hostinger-${TIMESTAMP}.zip"

# Check if hostinger-deploy directory exists
if [ ! -d "hostinger-deploy" ]; then
    echo "❌ Error: hostinger-deploy directory not found!"
    echo "   Run 'npm run deploy:hostinger' first to create the deployment package."
    exit 1
fi

# Create ZIP file
echo "📦 Creating deployment ZIP file..."
zip -r "${ZIP_NAME}" hostinger-deploy/ > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Success! Deployment package created:"
    echo "   📁 File: ${ZIP_NAME}"
    echo "   📊 Size: $(du -h "${ZIP_NAME}" | cut -f1)"
    echo ""
    echo "📋 Next steps:"
    echo "1. Upload ${ZIP_NAME} to your Hostinger File Manager"
    echo "2. Extract it in the public_html directory"
    echo "3. Follow the instructions in README.md"
    echo ""
    echo "🌐 Your site will be live at: https://speedtestboost.com"
else
    echo "❌ Error: Failed to create ZIP file"
    exit 1
fi
