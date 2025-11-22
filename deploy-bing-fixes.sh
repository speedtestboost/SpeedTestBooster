#!/bin/bash

# Bing SEO Fix Deployment Script
# Automates the deployment of Bing-specific SEO improvements

echo "🔧 Deploying Bing SEO Fixes..."

# Check if we're in the right directory
if [ ! -f "hostinger-static/index.html" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Create backup
echo "📦 Creating backup..."
mkdir -p backups
cp -r hostinger-static "backups/hostinger-static-$(date +%Y%m%d-%H%M%S)"

# Function to prompt for Bing verification code
get_bing_verification() {
    echo "🔍 Bing Webmaster Tools Setup Required:"
    echo "1. Go to https://www.bing.com/webmasters/"
    echo "2. Add your site: https://speedtestboost.com"
    echo "3. Get verification code from XML file method"
    echo ""
    read -p "Enter your Bing verification code: " bing_code
    
    if [ -z "$bing_code" ]; then
        echo "⚠️  Warning: No verification code provided. Using placeholder."
        bing_code="A1B2C3D4E5F6789012345678901234567890ABCD"
    fi
    
    return 0
}

# Function to update verification files
update_verification_files() {
    local verification_code=$1
    
    echo "📝 Updating Bing verification files..."
    
    # Update BingSiteAuth.xml
    sed -i.bak "s/A1B2C3D4E5F6789012345678901234567890ABCD/$verification_code/g" hostinger-static/BingSiteAuth.xml
    
    # Update msvalidate.01
    echo "$verification_code" > hostinger-static/msvalidate.01
    
    # Update meta tag in index.html
    sed -i.bak "s/BING-VERIFICATION-CODE-PLACEHOLDER/$verification_code/g" hostinger-static/index.html
    
    echo "✅ Verification files updated"
}

# Function to validate files
validate_files() {
    echo "🔍 Validating files..."
    
    local errors=0
    
    # Check if BingSiteAuth.xml exists and has content
    if [ ! -f "hostinger-static/BingSiteAuth.xml" ]; then
        echo "❌ BingSiteAuth.xml missing"
        ((errors++))
    fi
    
    # Check if msvalidate.01 exists
    if [ ! -f "hostinger-static/msvalidate.01" ]; then
        echo "❌ msvalidate.01 missing"
        ((errors++))
    fi
    
    # Check if sitemap has recent dates
    if ! grep -q "2025-11-22" hostinger-static/sitemap.xml; then
        echo "⚠️  Warning: Sitemap may not have current dates"
    fi
    
    # Check if index.html has canonical tag
    if ! grep -q "canonical" hostinger-static/index.html; then
        echo "❌ Canonical tag missing from index.html"
        ((errors++))
    fi
    
    if [ $errors -eq 0 ]; then
        echo "✅ All files validated successfully"
        return 0
    else
        echo "❌ Validation failed with $errors errors"
        return 1
    fi
}

# Function to create deployment package
create_deployment_package() {
    echo "📦 Creating deployment package..."
    
    local package_name="speedtestbooster-bing-fix-$(date +%Y%m%d-%H%M%S).zip"
    
    cd hostinger-static
    zip -r "../$package_name" . -x "*.bak" "*.DS_Store"
    cd ..
    
    echo "✅ Deployment package created: $package_name"
    echo ""
    echo "📋 Deployment Instructions:"
    echo "1. Upload $package_name to Hostinger File Manager"
    echo "2. Navigate to public_html directory"
    echo "3. Extract the ZIP file (replaces all files)"
    echo "4. Delete the ZIP file after extraction"
    echo "5. Submit sitemap to Bing: https://speedtestboost.com/sitemap.xml"
    echo ""
}

# Function to show post-deployment checklist
show_checklist() {
    echo "📋 Post-Deployment Checklist:"
    echo ""
    echo "✅ 1. Verify site in Bing Webmaster Tools"
    echo "   - Go to https://www.bing.com/webmasters/"
    echo "   - Verify https://speedtestboost.com"
    echo ""
    echo "✅ 2. Submit Sitemap"
    echo "   - Submit: https://speedtestboost.com/sitemap.xml"
    echo ""
    echo "✅ 3. Test URLs"
    echo "   - https://speedtestboost.com/BingSiteAuth.xml"
    echo "   - https://speedtestboost.com/msvalidate.01"
    echo "   - https://speedtestboost.com/sitemap.xml"
    echo ""
    echo "✅ 4. Monitor Indexing (24-72 hours)"
    echo "   - Check Bing Webmaster Tools dashboard"
    echo "   - Monitor crawl errors"
    echo "   - Verify pages are being indexed"
    echo ""
    echo "🎯 Expected Results:"
    echo "   - Site verification within 24 hours"
    echo "   - Improved indexing within 1-2 weeks"
    echo "   - Better Bing rankings within 2-4 weeks"
}

# Main execution
main() {
    echo "🚀 Bing SEO Fix Deployment Script"
    echo "================================="
    echo ""
    
    # Get Bing verification code
    get_bing_verification
    
    # Update verification files
    update_verification_files "$bing_code"
    
    # Validate all files
    if validate_files; then
        # Create deployment package
        create_deployment_package
        
        # Show checklist
        show_checklist
        
        echo ""
        echo "🎉 Bing SEO fixes ready for deployment!"
        echo "📖 See BING-SEO-FIX-GUIDE.md for detailed instructions"
    else
        echo "❌ Deployment package not created due to validation errors"
        exit 1
    fi
}

# Run the script
main
