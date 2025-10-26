import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Map of country code to proper breadcrumb href
const countryCodeToHref: Record<string, string> = {
  'ae': '/providers/ae',
  'ar': '/providers/ar',
  'es': '/providers/es',
  'id': '/providers/id',
  'in': '/providers/in',
  'mx': '/providers/mx',
  'my': '/providers/my',
  'ph': '/providers/ph',
  'sa': '/providers/sa',
  'uk': '/providers/uk',
  'us': '/providers/us',
  'za': '/providers/za'
};

// Map of country code to country name
const countryCodeToName: Record<string, string> = {
  'ae': 'UAE',
  'ar': 'Argentina',
  'es': 'Spain',
  'id': 'Indonesia',
  'in': 'India',
  'mx': 'Mexico',
  'my': 'Malaysia',
  'ph': 'Philippines',
  'sa': 'Saudi Arabia',
  'uk': 'UK',
  'us': 'USA',
  'za': 'South Africa'
};

function fixProviderBreadcrumbs(countryCode: string, providerDir: string) {
  const files = readdirSync(providerDir);
  
  files.forEach(file => {
    if (!file.endsWith('.tsx')) return;
    
    const filePath = join(providerDir, file);
    let content = readFileSync(filePath, 'utf-8');
    
    // Fix breadcrumb href for country - look for the pattern where the second item has wrong href
    const countryName = countryCodeToName[countryCode];
    const correctHref = countryCodeToHref[countryCode];
    
    if (!countryName || !correctHref) return;
    
    // Pattern: { label: "CountryName", href: "/internet-providers" },
    const wrongPattern = new RegExp(
      `(\\{ label: "${countryName}", href: ")(/internet-providers)(")`,
      'g'
    );
    
    if (wrongPattern.test(content)) {
      content = content.replace(wrongPattern, `$1${correctHref}$3`);
      writeFileSync(filePath, content);
      console.log(`Fixed breadcrumb in: ${filePath}`);
    }
  });
}

console.log('Fixing provider breadcrumbs...');

const providersBaseDir = 'client/src/pages/providers';
const countries = Object.keys(countryCodeToHref);

countries.forEach(countryCode => {
  const countryDir = join(providersBaseDir, countryCode);
  try {
    const stat = statSync(countryDir);
    if (stat.isDirectory()) {
      fixProviderBreadcrumbs(countryCode, countryDir);
    }
  } catch (e) {
    // Directory doesn't exist, skip
  }
});

console.log('Done!');
