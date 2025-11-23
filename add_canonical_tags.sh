#!/bin/bash

# Provider pages that need canonical tags added
declare -A providers=(
    ["uk/virgin-media"]="Virgin Media Speed Test - Test Virgin Media Broadband UK 2025"
    ["uk/bt"]="BT Broadband Speed Test - Test BT Internet UK 2025"
    ["ca/bell"]="Bell Internet Speed Test - Test Bell Fibe Internet Canada 2025"
    ["ca/rogers"]="Rogers Speed Test - Test Rogers Internet Canada 2025"
    ["ca/telus"]="Telus Speed Test - Test Telus Internet Canada 2025"
    ["de/deutsche-telekom"]="Deutsche Telekom Speed Test - Test Telekom Internet Germany 2025"
    ["de/vodafone-de"]="Vodafone Germany Speed Test - Test Vodafone Internet DE 2025"
    ["de/o2-de"]="O2 Germany Speed Test - Test O2 Internet Deutschland 2025"
    ["au/telstra"]="Telstra Speed Test - Test Telstra NBN Internet Australia 2025"
    ["au/optus"]="Optus Speed Test - Test Optus Internet Australia 2025"
    ["au/tpg"]="TPG Speed Test - Test TPG Internet Australia 2025"
)

for provider in "${!providers[@]}"; do
    file="client/src/pages/providers/${provider}.tsx"
    if [ -f "$file" ]; then
        echo "Checking $file..."
        if ! grep -q "canonical" "$file"; then
            echo "  -> Missing canonical tag"
        else
            echo "  -> Already has canonical tag"
        fi
    fi
done
