#!/bin/bash

echo "🚀 Deploying Keyword Optimization Updates..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in SpeedTestBooster root directory"
    exit 1
fi

# Install dependencies if needed
echo "📦 Checking dependencies..."
npm install

# Build the client
echo "🏗️  Building client with keyword optimizations..."
cd client
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Client build successful"
else
    echo "❌ Client build failed"
    exit 1
fi

cd ..

# Build the server
echo "🏗️  Building server..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Server build successful"
else
    echo "❌ Server build failed"
    exit 1
fi

# Run tests if they exist
if [ -f "package.json" ] && grep -q "test" package.json; then
    echo "🧪 Running tests..."
    npm test
fi

echo "✅ Keyword optimization deployment complete!"
echo ""
echo "🎯 New Keywords Implemented:"
echo "   - free internet speed test online"
echo "   - speed test no ads"
echo "   - internet speed booster test"
echo "   - lightweight speed test"
echo "   - speed test no download"
echo "   - mobile internet speed test"
echo "   - speed test for gaming"
echo ""
echo "📈 Expected SEO Improvements:"
echo "   - Better rankings for low-competition keywords"
echo "   - Improved click-through rates"
echo "   - Enhanced user experience messaging"
echo "   - Mobile optimization benefits"
