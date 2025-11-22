#!/bin/zsh

# Bing SEO Fix Verification Script
# Tests all implemented fixes to ensure proper functionality

echo "🔍 Verifying Bing SEO Fixes..."
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Function to test URL accessibility
test_url() {
    local url=$1
    local expected_content=$2
    local test_name=$3
    
    echo -n "Testing $test_name... "
    
    local response=$(curl -s -w "%{http_code}" -L "$url" -o /tmp/curl_response)
    local content=$(cat /tmp/curl_response)
    
    if [ "$response" = "200" ]; then
        if [ -n "$expected_content" ]; then
            if echo "$content" | grep -q "$expected_content"; then
                echo "${GREEN}✅ PASS${NC}"
                ((PASSED++))
            else
                echo "${RED}❌ FAIL${NC} - Expected content not found"
                ((FAILED++))
            fi
        else
            echo "${GREEN}✅ PASS${NC}"
            ((PASSED++))
        fi
    else
        echo "${RED}❌ FAIL${NC} - HTTP $response"
        ((FAILED++))
    fi
    
    rm -f /tmp/curl_response
}

# Function to validate XML structure
validate_xml() {
    local file=$1
    local test_name=$2
    
    echo -n "Validating $test_name XML... "
    
    if [ ! -f "$file" ]; then
        echo "${RED}❌ FAIL${NC} - File not found"
        ((FAILED++))
        return
    fi
    
    if xmllint --noout "$file" 2>/dev/null; then
        echo "${GREEN}✅ PASS${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ FAIL${NC} - Invalid XML"
        ((FAILED++))
    fi
}

# Function to check meta tags in HTML
check_meta_tags() {
    local file=$1
    local meta_name=$2
    local test_name=$3
    
    echo -n "Checking $test_name... "
    
    if [ ! -f "$file" ]; then
        echo "${RED}❌ FAIL${NC} - File not found"
        ((FAILED++))
        return
    fi
    
    if grep -q "$meta_name" "$file"; then
        echo "${GREEN}✅ PASS${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ FAIL${NC} - Meta tag not found"
        ((FAILED++))
    fi
}

# Function to validate structured data
validate_structured_data() {
    local file=$1
    local test_name=$2
    
    echo -n "Validating $test_name... "
    
    if [ ! -f "$file" ]; then
        echo "${RED}❌ FAIL${NC} - File not found"
        ((FAILED++))
        return
    fi
    
    # Extract JSON-LD from HTML and validate
    local json_content=$(grep -A 50 'application/ld+json' "$file" | grep -B 50 '</script>' | head -n -1 | tail -n +2)
    
    if echo "$json_content" | python3 -m json.tool >/dev/null 2>&1; then
        echo "${GREEN}✅ PASS${NC}"
        ((PASSED++))
    else
        echo "${RED}❌ FAIL${NC} - Invalid JSON-LD"
        ((FAILED++))
    fi
}

# Main test execution
main() {
    local base_url="https://speedtestboost.com"
    local local_files="hostinger-static"
    
    echo "${BLUE}🧪 Running Bing SEO Fix Tests${NC}"
    echo ""
    
    # Test 1: Bing verification files
    echo "${YELLOW}📋 Testing Bing Verification Files${NC}"
    test_url "$base_url/BingSiteAuth.xml" "<?xml version" "BingSiteAuth.xml accessibility"
    test_url "$base_url/msvalidate.01" "" "msvalidate.01 accessibility"
    validate_xml "$local_files/BingSiteAuth.xml" "BingSiteAuth.xml"
    
    echo ""
    
    # Test 2: Sitemap and robots
    echo "${YELLOW}🗺️  Testing Sitemap and Robots${NC}"
    test_url "$base_url/sitemap.xml" "2025-11-22" "Sitemap with updated dates"
    test_url "$base_url/robots.txt" "Sitemap: https://speedtestboost.com/sitemap.xml" "Robots.txt"
    validate_xml "$local_files/sitemap.xml" "sitemap.xml"
    
    echo ""
    
    # Test 3: Meta tags and canonical
    echo "${YELLOW}🏷️  Testing Meta Tags${NC}"
    check_meta_tags "$local_files/index.html" 'rel="canonical"' "Canonical tag"
    check_meta_tags "$local_files/index.html" 'name="msvalidate.01"' "Bing meta verification"
    check_meta_tags "$local_files/index.html" 'name="robots"' "Robots meta tag"
    
    echo ""
    
    # Test 4: Structured data
    echo "${YELLOW}📊 Testing Structured Data${NC}"
    validate_structured_data "$local_files/index.html" "JSON-LD structured data"
    
    echo ""
    
    # Test 5: .htaccess rules
    echo "${YELLOW}⚙️  Testing .htaccess Configuration${NC}"
    if [ -f "$local_files/.htaccess" ]; then
        echo -n "Checking HTTPS redirect rules... "
        if grep -q "RewriteCond.*HTTPS.*off" "$local_files/.htaccess"; then
            echo "${GREEN}✅ PASS${NC}"
            ((PASSED++))
        else
            echo "${YELLOW}⚠️  WARNING${NC} - HTTPS redirect not found"
            ((WARNINGS++))
        fi
        
        echo -n "Checking WWW redirect rules... "
        if grep -q "RewriteCond.*HTTP_HOST.*www" "$local_files/.htaccess"; then
            echo "${GREEN}✅ PASS${NC}"
            ((PASSED++))
        else
            echo "${YELLOW}⚠️  WARNING${NC} - WWW redirect not found"
            ((WARNINGS++))
        fi
    else
        echo "${RED}❌ FAIL${NC} - .htaccess file not found"
        ((FAILED++))
    fi
    
    echo ""
    
    # Test 6: Performance and accessibility
    echo "${YELLOW}🚀 Testing Performance Features${NC}"
    test_url "$base_url" "Speed Test" "Homepage accessibility"
    
    # Check if gzip is working (through headers)
    echo -n "Testing GZIP compression... "
    local gzip_test=$(curl -s -H "Accept-Encoding: gzip" -I "$base_url" | grep -i "content-encoding: gzip")
    if [ -n "$gzip_test" ]; then
        echo "${GREEN}✅ PASS${NC}"
        ((PASSED++))
    else
        echo "${YELLOW}⚠️  WARNING${NC} - GZIP not detected"
        ((WARNINGS++))
    fi
    
    echo ""
    
    # Final results
    echo "${BLUE}📊 Test Results Summary${NC}"
    echo "======================="
    echo "${GREEN}✅ Passed: $PASSED${NC}"
    echo "${RED}❌ Failed: $FAILED${NC}"
    echo "${YELLOW}⚠️  Warnings: $WARNINGS${NC}"
    echo ""
    
    local total=$((PASSED + FAILED + WARNINGS))
    local success_rate=$((PASSED * 100 / total))
    
    if [ $FAILED -eq 0 ]; then
        echo "${GREEN}🎉 All critical tests passed! Success rate: $success_rate%${NC}"
        echo ""
        echo "${BLUE}✅ Your site is ready for Bing indexing!${NC}"
        echo ""
        echo "📋 Next steps:"
        echo "1. Add your actual Bing verification code"
        echo "2. Submit sitemap to Bing Webmaster Tools"
        echo "3. Monitor indexing progress"
        return 0
    else
        echo "${RED}❌ Some tests failed. Please fix the issues before deploying.${NC}"
        return 1
    fi
}

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "${RED}❌ curl is required but not installed.${NC}"
    exit 1
fi

# Check if xmllint is available
if ! command -v xmllint &> /dev/null; then
    echo "${YELLOW}⚠️  xmllint not found. Installing via brew...${NC}"
    brew install libxml2 2>/dev/null || echo "${YELLOW}⚠️  Please install xmllint manually${NC}"
fi

# Run the main function
main
