#!/bin/bash

# SpeedTestBooster - Hostinger Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 SpeedTestBooster Hostinger Deployment${NC}"
echo "================================================="

# Step 1: Clean previous builds
echo -e "${YELLOW}🧹 Cleaning previous builds...${NC}"
rm -rf dist/ hostinger-deploy/ || true

# Step 2: Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# Step 3: Build the application
echo -e "${YELLOW}🔨 Building application for production...${NC}"
npm run build:hostinger

# Step 4: Create deployment package
echo -e "${YELLOW}📦 Creating deployment package...${NC}"
npm run deploy:hostinger

# Step 5: Create ZIP file for upload
echo -e "${YELLOW}🗜️  Creating ZIP file...${NC}"
cd hostinger-deploy
zip -r ../speedtestbooster-hostinger-$(date +%Y%m%d-%H%M%S).zip .
cd ..

echo -e "${GREEN}✅ Deployment package created successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Upload the ZIP file to your Hostinger File Manager"
echo "2. Extract it in the public_html directory"
echo "3. Configure your .env file with actual values"
echo "4. Run 'npm install' in the Hostinger terminal"
echo "5. Enable Node.js in your Hostinger control panel"
echo "6. Start your application with 'npm run start:hostinger'"
echo ""
echo -e "${GREEN}🌐 Your app will be live at: https://speedtestboost.com${NC}"

# List created files
echo ""
echo -e "${BLUE}📁 Created files:${NC}"
ls -la speedtestbooster-hostinger-*.zip 2>/dev/null || echo "ZIP file creation failed"
echo ""
echo -e "${YELLOW}💡 Don't forget to:${NC}"
echo "- Update DNS records to point to Hostinger"
echo "- Configure SSL certificate in Hostinger panel"
echo "- Set up your Neon database connection"
echo "- Test your application thoroughly"
