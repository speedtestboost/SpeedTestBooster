#!/usr/bin/env python3
import pandas as pd
import sys

try:
    # Read the Excel file
    df = pd.read_excel('attached_assets/speedtestboost.com-Coverage-Drilldown-2025-08-06_1754456866057.xlsx')
    
    print('=== GOOGLE SEARCH CONSOLE CANONICAL TAG ANALYSIS ===')
    print(f'Total URLs in report: {len(df)}')
    print()
    
    # Show column names
    print('Available columns:', list(df.columns))
    print()
    
    # Show first few rows to understand structure
    print('Sample data (first 5 rows):')
    print(df.head().to_string())
    print()
    
    # Look for URL column and show all URLs
    url_columns = [col for col in df.columns if 'url' in col.lower()]
    if url_columns:
        print(f'Found URL column: {url_columns[0]}')
        urls = df[url_columns[0]].dropna().tolist()
        print(f'URLs with canonical issues ({len(urls)} total):')
        for i, url in enumerate(urls):
            print(f'{i+1:2d}. {url}')
    else:
        # If no URL column, show all data
        print('No URL column found. Showing all data:')
        print(df.to_string())
    
except Exception as e:
    print(f'Error reading Excel file: {e}')
    import traceback
    traceback.print_exc()