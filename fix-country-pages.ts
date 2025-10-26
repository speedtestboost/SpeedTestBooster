import { readFileSync, writeFileSync } from 'fs';

const countryPages = [
  'client/src/pages/us-speed-test.tsx',
  'client/src/pages/au-speed-test.tsx',
  'client/src/pages/ca-speed-test.tsx',
  'client/src/pages/spanish-speed-test.tsx',
  'client/src/pages/bangalore-speed-test.tsx',
  'client/src/pages/chennai-speed-test.tsx',
  'client/src/pages/delhi-speed-test.tsx',
  'client/src/pages/hyderabad-speed-test.tsx',
  'client/src/pages/mumbai-speed-test.tsx',
  'client/src/pages/kolkata-speed-test.tsx'
];

console.log('Fixing country/city pages...');

countryPages.forEach(filePath => {
  let content = readFileSync(filePath, 'utf-8');
  
  // Add Breadcrumbs import if not present
  if (!content.includes('import Breadcrumbs from "@/components/Breadcrumbs"')) {
    // Find GenericFooter import
    const footerImportIndex = content.indexOf('import GenericFooter from "@/components/GenericFooter";');
    if (footerImportIndex !== -1) {
      const endOfLine = content.indexOf('\n', footerImportIndex);
      content = content.slice(0, endOfLine + 1) + 
                'import Breadcrumbs from "@/components/Breadcrumbs";\n' +
                content.slice(endOfLine + 1);
    }
  }
  
  // Add breadcrumbs after Header if not present
  if (!content.includes('<Breadcrumbs')) {
    // Find the return statement and add breadcrumbs
    const headerPattern = /(<Header currentPath="[^"]*" \/>)\s*\n\s*(<main className="max-w-md)/;
    if (headerPattern.test(content)) {
      const pageName = filePath.split('/').pop()?.replace('.tsx', '') || 'test';
      const labelName = pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace('Speed Test', '').trim();
      
      content = content.replace(
        headerPattern,
        `$1\n      \n      <main className="max-w-md lg:max-w-7xl mx-auto px-4 lg:px-8 pt-24 pb-6 space-y-6">\n        <Breadcrumbs \n          items={[\n            { label: "Country Tests", href: "/" },\n            { label: "${labelName} Speed Test", href: "/${pageName}" }\n          ]} \n        />\n\n      $2`
      );
    }
  }
  
  writeFileSync(filePath, content);
  console.log(`Fixed: ${filePath}`);
});

console.log('Done!');
