import { readFileSync, writeFileSync } from 'fs';

const toolPages = [
  'client/src/pages/internet-speed-requirements.tsx',
  'client/src/pages/ping-test.tsx',
  'client/src/pages/download-speed-guide.tsx',
  'client/src/pages/upload-speed-guide.tsx',
  'client/src/pages/wifi-speed-optimization.tsx',
  'client/src/pages/wifi-analyzer.tsx'
];

console.log('Fixing tool pages...');

toolPages.forEach(filePath => {
  let content = readFileSync(filePath, 'utf-8');
  
  // Add Breadcrumbs import if not present
  if (!content.includes('import Breadcrumbs from "@/components/Breadcrumbs"')) {
    // Find the last import statement
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport + 1) + 
              'import Breadcrumbs from "@/components/Breadcrumbs";\n' +
              content.slice(endOfLastImport + 1);
  }
  
  // Fix canonical tag if present (replace #canonical-tag with proper implementation)
  if (content.includes('#canonical-tag')) {
    content = content.replace(
      /const canonicalTag = document\.getElementById\('canonical-tag'\) as HTMLLinkElement;\s+if \(canonicalTag\) \{\s+canonicalTag\.href = '([^']+)';\s+\}/g,
      `let canonical = document.querySelector('link[rel="canonical"]');\n    if (!canonical) {\n      canonical = document.createElement('link');\n      canonical.rel = 'canonical';\n      document.head.appendChild(canonical);\n    }\n    canonical.href = '$1';`
    );
  }
  
  // Add breadcrumbs after Header if not present
  if (!content.includes('<Breadcrumbs')) {
    // Different pages have different layouts, so we need to be careful
    const patterns = [
      // Pattern 1: <Header ... />\n      <main
      {
        search: /(<Header[^>]*\/>\s*\n\s*<main[^>]*>)/,
        replace: (match: string) => {
          const headerPart = match.substring(0, match.indexOf('<main'));
          const mainPart = match.substring(match.indexOf('<main'));
          const pageName = filePath.split('/').pop()?.replace('.tsx', '') || 'tool';
          const labelName = pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          return `${headerPart}\n      \n      <main${mainPart.substring(5, mainPart.indexOf('>') + 1)}\n        <Breadcrumbs \n          items={[\n            { label: "Tools", href: "/" },\n            { label: "${labelName}", href: "/${pageName}" }\n          ]} \n        />\n`;
        }
      }
    ];
    
    patterns.forEach(({ search, replace }) => {
      if (search.test(content)) {
        content = content.replace(search, replace);
      }
    });
  }
  
  writeFileSync(filePath, content);
  console.log(`Fixed: ${filePath}`);
});

console.log('Done!');
