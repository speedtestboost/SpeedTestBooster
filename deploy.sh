#!/bin/bash

# SpeedTestBooster Deployment Script
set -e

echo "🚀 Starting deployment to speedtestboost.com..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're on the server
if [[ ! -f "/etc/nginx/nginx.conf" ]]; then
    echo -e "${RED}❌ This script should be run on your production server${NC}"
    exit 1
fi

# Stop the application if it's running
echo -e "${YELLOW}⏸️  Stopping current application...${NC}"
pkill -f "node.*dist/index.js" || true
docker-compose down || true

# Pull latest changes (if using git)
echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
git pull origin main || echo "⚠️  Git pull failed - make sure you're in a git repository"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --only=production

# Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Start the application
echo -e "${YELLOW}🚀 Starting application...${NC}"
if [[ -f "docker-compose.yml" ]]; then
    docker-compose up -d app
else
    # Start with PM2 if available, otherwise nohup
    if command -v pm2 &> /dev/null; then
        pm2 start dist/index.js --name speedtestboost
    else
        nohup npm start > /dev/null 2>&1 &
    fi
fi

# Wait for app to start
echo -e "${YELLOW}⏳ Waiting for application to start...${NC}"
sleep 5

# Check if the app is running
if curl -f http://localhost:5000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Application is running successfully!${NC}"
else
    echo -e "${RED}❌ Application failed to start${NC}"
    exit 1
fi

# Reload Nginx
echo -e "${YELLOW}🔄 Reloading Nginx...${NC}"
sudo nginx -t && sudo systemctl reload nginx

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your site should be available at: https://speedtestboost.com${NC}"
