/**
 * Replaces duplicate <link rel="canonical"> injection with setCanonicalHref()
 * so only index.html's #canonical-url is updated (fixes Ahrefs non-canonical sitemap).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "..", "client", "src");

const BLOCK_RE =
  /const canonical = document\.createElement\((['"])link\1\);[\s\S]*?canonical\.href = (['"])(https:\/\/speedtestboost\.com[^'"]*)\2;[\s\S]*?document\.head\.appendChild\(canonical\);/g;

const CLEANUP_RE =
  /\n?\s*\/\/ Remove the specific canonical element[^\n]*\n\s*if \(canonical\.parentNode\) \{\s*\n\s*canonical\.parentNode\.removeChild\(canonical\);\s*\n\s*\}/g;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

function ensureSeoImport(content) {
  if (/import\s*\{[^}]*\bsetCanonicalHref\b[^}]*\}\s*from\s*["']@\/lib\/seo["']/.test(content)) {
    return content;
  }
  if (/from\s*["']@\/lib\/seo["']/.test(content)) {
    return content.replace(
      /import\s*\{([^}]*)\}\s*from\s*(["'])@\/lib\/seo\2;/,
      (full, inner, q) => {
        const parts = inner.split(",").map((s) => s.trim()).filter(Boolean);
        if (parts.some((p) => p.includes("setCanonicalHref"))) return full;
        parts.push("setCanonicalHref");
        return `import { ${parts.join(", ")} } from ${q}@/lib/seo${q};`;
      },
    );
  }
  const firstNl = content.indexOf("\n");
  const insertAt = firstNl === -1 ? 0 : firstNl + 1;
  return (
    content.slice(0, insertAt) +
    `import { setCanonicalHref } from "@/lib/seo";\n` +
    content.slice(insertAt)
  );
}

let changed = 0;
for (const file of walk(SRC)) {
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes("const canonical = document.createElement")) continue;

  const before = s;
  s = s.replace(
    BLOCK_RE,
    (_m, _linkQ, _hrefQ, url) => `setCanonicalHref('${url}');`,
  );
  if (s === before) continue;

  s = s.replace(CLEANUP_RE, "");
  s = s.replace(
    /\n\s*if \(canonical\.parentNode\) \{\s*\n\s*canonical\.parentNode\.removeChild\(canonical\);\s*\n\s*\}/g,
    "",
  );
  s = ensureSeoImport(s);
  fs.writeFileSync(file, s, "utf8");
  changed++;
  console.log("updated:", path.relative(SRC, file));
}

console.log(`Done. Files changed: ${changed}`);
