#!/bin/zsh

# Bing SEO Monitoring Script
# Tracks ongoing SEO performance and alerts for issues

echo "📊 Bing SEO Monitoring Dashboard"
echo "================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Configuration
SITE_URL="https://speedtestboost.com"
LOG_FILE="bing-seo-monitoring.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Function to log messages
log_message() {
    echo "[$TIMESTAMP] $1" >> "$LOG_FILE"
}

# Function to check site accessibility
check_site_accessibility() {
    echo "${BLUE}🌐 Site Accessibility Check${NC}"
    echo "----------------------------"
    
    local response=$(curl -s -w "%{http_code}\n%{time_total}\n" -o /dev/null "$SITE_URL")
    local status_code=$(echo "$response" | head -n1)
    local load_time=$(echo "$response" | tail -n1)
    
    echo -n "Homepage status: "
    if [ "$status_code" = "200" ]; then
        echo "${GREEN}✅ Online ($status_code)${NC}"
    else
        echo "${RED}❌ Issue ($status_code)${NC}"
        log_message "ERROR: Homepage returned status $status_code"
    fi
    
    echo "Load time: ${load_time}s"
    
    # Check if load time is acceptable (<3 seconds)
    if (( $(echo "$load_time < 3.0" | bc -l) )); then
        echo "${GREEN}⚡ Good performance${NC}"
    else
        echo "${YELLOW}⚠️  Slow loading${NC}"
        log_message "WARNING: Slow load time: ${load_time}s"
    fi
    
    echo ""
}

# Function to verify Bing-specific files
check_bing_files() {
    echo "${BLUE}🔍 Bing Files Verification${NC}"
    echo "--------------------------"
    
    local files=("BingSiteAuth.xml" "msvalidate.01" "sitemap.xml" "robots.txt")
    
    for file in "${files[@]}"; do
        echo -n "Checking $file: "
        local response=$(curl -s -w "%{http_code}" -o /dev/null "$SITE_URL/$file")
        
        if [ "$response" = "200" ]; then
            echo "${GREEN}✅ Accessible${NC}"
        else
            echo "${RED}❌ Error ($response)${NC}"
            log_message "ERROR: $file returned status $response"
        fi
    done
    
    echo ""
}

# Function to analyze robots.txt
analyze_robots() {
    echo "${BLUE}🤖 Robots.txt Analysis${NC}"
    echo "----------------------"
    
    local robots_content=$(curl -s "$SITE_URL/robots.txt")
    
    echo -n "Sitemap declaration: "
    if echo "$robots_content" | grep -q "Sitemap:"; then
        echo "${GREEN}✅ Found${NC}"
    else
        echo "${RED}❌ Missing${NC}"
        log_message "ERROR: Sitemap not declared in robots.txt"
    fi
    
    echo -n "Bingbot instructions: "
    if echo "$robots_content" | grep -q "Bingbot"; then
        echo "${GREEN}✅ Present${NC}"
    else
        echo "${YELLOW}⚠️  Generic rules only${NC}"
    fi
    
    echo ""
}

# Function to check sitemap health
check_sitemap() {
    echo "${BLUE}🗺️  Sitemap Health Check${NC}"
    echo "------------------------"
    
    local sitemap_content=$(curl -s "$SITE_URL/sitemap.xml")
    
    # Check if sitemap is valid XML
    echo -n "XML validity: "
    if echo "$sitemap_content" | xmllint --noout - 2>/dev/null; then
        echo "${GREEN}✅ Valid${NC}"
    else
        echo "${RED}❌ Invalid XML${NC}"
        log_message "ERROR: Sitemap XML is invalid"
    fi
    
    # Count URLs
    local url_count=$(echo "$sitemap_content" | grep -c "<url>")
    echo "URL count: $url_count"
    
    # Check for recent dates
    echo -n "Recent updates: "
    if echo "$sitemap_content" | grep -q "2025-11-22"; then
        echo "${GREEN}✅ Current${NC}"
    else
        echo "${YELLOW}⚠️  May be outdated${NC}"
        log_message "WARNING: Sitemap may have outdated timestamps"
    fi
    
    echo ""
}

# Function to test meta tags
check_meta_tags() {
    echo "${BLUE}🏷️  Meta Tags Verification${NC}"
    echo "---------------------------"
    
    local html_content=$(curl -s "$SITE_URL")
    
    local meta_tags=("canonical" "robots" "msvalidate.01" "description")
    
    for tag in "${meta_tags[@]}"; do
        echo -n "$tag: "
        if echo "$html_content" | grep -q "$tag"; then
            echo "${GREEN}✅ Present${NC}"
        else
            echo "${RED}❌ Missing${NC}"
            log_message "ERROR: Meta tag '$tag' is missing"
        fi
    done
    
    echo ""
}

# Function to check structured data
check_structured_data() {
    echo "${BLUE}📊 Structured Data Check${NC}"
    echo "------------------------"
    
    local html_content=$(curl -s "$SITE_URL")
    
    echo -n "JSON-LD present: "
    if echo "$html_content" | grep -q "application/ld+json"; then
        echo "${GREEN}✅ Found${NC}"
        
        # Count schema types
        local schema_count=$(echo "$html_content" | grep -o '"@type"[^,]*' | wc -l)
        echo "Schema types: $schema_count"
        
    else
        echo "${RED}❌ Missing${NC}"
        log_message "ERROR: No structured data found"
    fi
    
    echo ""
}

# Function to check SSL certificate
check_ssl() {
    echo "${BLUE}🔒 SSL Certificate Check${NC}"
    echo "------------------------"
    
    local ssl_info=$(curl -s -I "$SITE_URL" | head -n1)
    
    echo -n "HTTPS status: "
    if echo "$ssl_info" | grep -q "200"; then
        echo "${GREEN}✅ Secure${NC}"
    else
        echo "${RED}❌ Issue${NC}"
        log_message "ERROR: SSL/HTTPS issue detected"
    fi
    
    # Check for security headers
    local headers=$(curl -s -I "$SITE_URL")
    
    echo -n "Security headers: "
    if echo "$headers" | grep -q -i "content-security-policy\|strict-transport-security"; then
        echo "${GREEN}✅ Present${NC}"
    else
        echo "${YELLOW}⚠️  Basic${NC}"
    fi
    
    echo ""
}

# Function to estimate Bing crawling frequency
estimate_crawl_frequency() {
    echo "${BLUE}🕷️  Crawl Pattern Analysis${NC}"
    echo "---------------------------"
    
    # This would typically analyze server logs, but we'll check public indicators
    local last_modified=$(curl -s -I "$SITE_URL" | grep -i "last-modified")
    
    if [ -n "$last_modified" ]; then
        echo "Last modified: ${last_modified#*: }"
    else
        echo "Last modified: ${YELLOW}Not specified${NC}"
    fi
    
    # Check cache headers
    local cache_control=$(curl -s -I "$SITE_URL" | grep -i "cache-control")
    if [ -n "$cache_control" ]; then
        echo "Cache policy: ${cache_control#*: }"
    else
        echo "Cache policy: ${YELLOW}Not specified${NC}"
    fi
    
    echo ""
}

# Function to generate recommendations
generate_recommendations() {
    echo "${PURPLE}💡 SEO Recommendations${NC}"
    echo "----------------------"
    
    # Check log for recent errors
    if [ -f "$LOG_FILE" ]; then
        local recent_errors=$(tail -n 50 "$LOG_FILE" | grep "ERROR" | wc -l)
        local recent_warnings=$(tail -n 50 "$LOG_FILE" | grep "WARNING" | wc -l)
        
        if [ $recent_errors -gt 0 ]; then
            echo "${RED}🚨 $recent_errors recent errors detected${NC}"
            echo "   → Check log file: $LOG_FILE"
        fi
        
        if [ $recent_warnings -gt 0 ]; then
            echo "${YELLOW}⚠️  $recent_warnings recent warnings${NC}"
            echo "   → Review and optimize"
        fi
    fi
    
    echo ""
    echo "📋 General recommendations:"
    echo "• Monitor Bing Webmaster Tools dashboard daily"
    echo "• Submit updated sitemap when content changes"
    echo "• Check for crawl errors weekly"
    echo "• Update meta descriptions for better CTR"
    echo "• Monitor page load speeds"
    echo ""
}

# Function to create summary report
create_summary_report() {
    local report_file="bing-seo-report-$(date +%Y%m%d).txt"
    
    echo "📄 Generating summary report: $report_file"
    
    {
        echo "Bing SEO Monitoring Report"
        echo "Generated: $TIMESTAMP"
        echo "Site: $SITE_URL"
        echo "=========================="
        echo ""
        
        # Add quick stats
        echo "Quick Stats:"
        echo "- Homepage accessible: $(curl -s -w "%{http_code}" -o /dev/null "$SITE_URL")"
        echo "- Sitemap URLs: $(curl -s "$SITE_URL/sitemap.xml" | grep -c "<url>")"
        echo "- Last check: $TIMESTAMP"
        echo ""
        
        # Add recent log entries
        if [ -f "$LOG_FILE" ]; then
            echo "Recent Issues:"
            tail -n 10 "$LOG_FILE"
        fi
        
    } > "$report_file"
    
    echo "${GREEN}✅ Report saved: $report_file${NC}"
    echo ""
}

# Main monitoring function
main() {
    echo "Starting Bing SEO monitoring at $TIMESTAMP"
    log_message "INFO: Starting monitoring session"
    
    check_site_accessibility
    check_bing_files
    analyze_robots
    check_sitemap
    check_meta_tags
    check_structured_data
    check_ssl
    estimate_crawl_frequency
    generate_recommendations
    
    create_summary_report
    
    echo "${GREEN}🎉 Monitoring complete!${NC}"
    log_message "INFO: Monitoring session completed successfully"
}

# Check dependencies
if ! command -v curl &> /dev/null; then
    echo "${RED}❌ curl is required but not installed.${NC}"
    exit 1
fi

if ! command -v bc &> /dev/null; then
    echo "${YELLOW}⚠️  bc not found. Installing via brew...${NC}"
    brew install bc 2>/dev/null || echo "${YELLOW}⚠️  Please install bc manually${NC}"
fi

# Run monitoring
main
