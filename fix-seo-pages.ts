import * as fs from 'fs';
import * as path from 'path';

const providerPagesDir = 'client/src/pages/providers';
const countryPagesDir = 'client/src/pages';

function fixCanonicalTag(content: string): string {
  const oldPattern1 = /const canonical = document\.querySelector\('link\[rel="canonical"\]#canonical-tag'\);\s+if \(canonical\) \{\s+canonical\.setAttribute\('href', '([^']+)'\);\s+\}/;
  const oldPattern2 = /let canonical = document\.querySelector\('link\[rel="canonical"\]'\) as HTMLLinkElement;\s+if \(!canonical\) \{\s+canonical = document\.createElement\('link'\);\s+canonical\.rel = 'canonical';\s+document\.head\.appendChild\(canonical\);\s+\}\s+canonical\.href = '([^']+)';/;
  
  const url = content.match(oldPattern1)?.[1] || content.match(oldPattern2)?.[1];
  
  if (!url) return content;
  
  const replacement = `let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = '${url}';`;
  
  return content.replace(oldPattern1, replacement).replace(oldPattern2, replacement);
}

function addBreadcrumbs(content: string, filePath: string): string {
  if (content.includes('Breadcrumbs')) return content;
  
  const parts = filePath.split('/');
  const countryCode = parts[parts.length - 2];
  const providerSlug = path.basename(filePath, '.tsx');
  
  const countryNames: Record<string, string> = {
    'us': 'United States', 'uk': 'United Kingdom', 'ca': 'Canada', 
    'de': 'Germany', 'au': 'Australia', 'nl': 'Netherlands', 
    'in': 'India', 'fr': 'France', 'it': 'Italy', 'br': 'Brazil',
    'mx': 'Mexico', 'ph': 'Philippines', 'id': 'Indonesia', 'es': 'Spain',
    'my': 'Malaysia', 'ar': 'Argentina', 'za': 'South Africa',
    'ae': 'UAE', 'sa': 'Saudi Arabia'
  };
  
  const providerName = providerSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const breadcrumbsImport = `import Breadcrumbs from "@/components/Breadcrumbs";`;
  const contentWithImport = content.replace(
    /(import .*from "wouter";)/,
    `$1\n${breadcrumbsImport}`
  );
  
  const breadcrumbsJSX = `<Breadcrumbs 
            items={[
              { label: "Internet Providers", href: "/internet-providers" },
              { label: "${countryNames[countryCode] || countryCode.toUpperCase()}", href: "/internet-providers" },
              { label: "${providerName}", href: "/providers/${countryCode}/${providerSlug}" }
            ]} 
          />
          
          `;
  
  return contentWithImport.replace(
    /(<main className="pt-24 pb-12">\s+<div className="max-w-4xl mx-auto px-4 lg:px-8">)/,
    `$1\n          ${breadcrumbsJSX}`
  );
}

function replaceProviderFooter(content: string): string {
  if (!content.includes('ProviderFooter')) return content;
  
  return content
    .replace(/import ProviderFooter from "@\/components\/ProviderFooter";/, 'import GenericFooter from "@/components/GenericFooter";')
    .replace(/<ProviderFooter \/>/, '<GenericFooter />');
}

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  content = fixCanonicalTag(content);
  content = addBreadcrumbs(content, filePath);
  content = replaceProviderFooter(content);
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx')) {
      processFile(filePath);
    }
  }
}

console.log('Fixing provider pages...');
walkDir(providerPagesDir);
console.log('Done!');
