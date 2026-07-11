/**
 * One-off script: replace manual provider SEO useEffects with ProviderPageSEO.
 * Run: node scripts/fix-provider-seo.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROVIDERS_DIR = path.join(__dirname, "..", "client", "src", "pages", "providers");

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith(".tsx")) files.push(full);
  }
  return files;
}

function fixFile(filePath) {
  const rel = path.relative(PROVIDERS_DIR, filePath).replace(/\\/g, "/");
  const match = rel.match(/^([a-z]{2})\/([a-z0-9-]+)\.tsx$/);
  if (!match) return false;

  const [, countryCode, providerSlug] = match;
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Remove SEO useEffect blocks that set document.title
  content = content.replace(
    /\r?\n  useEffect\(\(\) => \{[\s\S]*?document\.title[\s\S]*?\}, \[\]\);\r?\n/g,
    "\n",
  );

  // Remove ProviderSEO component usage and import
  content = content.replace(/\r?\n\s*<ProviderSEO[^/]*\/>\r?\n/g, "\n");
  content = content.replace(/import ProviderSEO from ["']@\/components\/ProviderSEO["'];\r?\n/g, "");
  content = content.replace(/import \{ providerKeywords \} from ["']@\/seo\/providerKeywords["'];\r?\n/g, "");

  // Remove seoConfig lines
  content = content.replace(/\r?\n\s*const seoConfig = providerKeywords\.[a-z0-9-]+;\r?\n/g, "\n");

  // Fix imports: remove setCanonicalHref if unused
  if (!content.includes("setCanonicalHref")) {
    content = content.replace(
      /import \{ setCanonicalHref \} from ["']@\/lib\/seo["'];\r?\n/g,
      "",
    );
    content = content.replace(
      /import \{ setCanonicalHref, removeHomepageJsonLd \} from ["']@\/lib\/seo["'];\r?\n/g,
      "",
    );
  }

  // useEffect only for SEO — drop useEffect from import if no longer used
  if (!content.includes("useEffect")) {
    content = content.replace(
      /import \{ useEffect, useState \} from "react";/g,
      'import { useState } from "react";',
    );
    content = content.replace(
      /import \{ useEffect, useState \} from 'react';/g,
      "import { useState } from 'react';",
    );
  }

  // Add ProviderPageSEO import if missing
  if (!content.includes("ProviderPageSEO")) {
    const reactImport = content.match(/import .+ from "react";/);
    if (reactImport) {
      content = content.replace(
        reactImport[0],
        `${reactImport[0]}\nimport ProviderPageSEO from "@/components/ProviderPageSEO";`,
      );
    }
  }

  // Insert ProviderPageSEO after opening page div
  if (!content.includes("<ProviderPageSEO")) {
    content = content.replace(
      /(<div className="min-h-screen[^>]*>)\r?\n/,
      `$1\n      <ProviderPageSEO countryCode="${countryCode}" providerSlug="${providerSlug}" />\n`,
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Fixed: ${rel}`);
    return true;
  }
  return false;
}

let count = 0;
for (const file of walk(PROVIDERS_DIR)) {
  if (fixFile(file)) count++;
}
console.log(`Done. Updated ${count} provider files.`);
