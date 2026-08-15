/**
 * One-off: clean garbled "lightweight speed test for X" copy left over from
 * an old bad find-and-replace, and refresh stale 2025 titles/footers.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "client", "src", "pages");

// Order matters: plural forms first so the singular pass doesn't leave "s" behind.
const GARBLED = [
  ["lightweight speed test for ATinternet speedTs", "internet speeds"],
  ["lightweight speed test for ATinternet speedT", "internet speed"],
  ["lightweight speed test for Verizons", "internet speeds"],
  ["lightweight speed test for Verizon", "internet speed"],
  ["lightweight speed test for Comcasts", "internet speeds"],
  ["lightweight speed test for Comcast", "internet speed"],
  ["lightweight speed test for Spectrum", "internet speed"],
  ["lightweight speed test for BT", "internet speed"],
];

// Exact stale-date strings — deliberately excludes historical references in body copy.
const DATES = [
  ["© 2025 ", "© 2026 "],
  ["Free Network Scanner 2025", "Free Network Scanner 2026"],
  ["Boost Your Internet 2025", "Boost Your Internet 2026"],
  ["Compare ISPs 2025", "Compare ISPs 2026"],
  ["Gratuit 2025", "Gratuit 2026"],
  ["Broadband 2025", "Broadband 2026"],
  ["Grátis 2025", "Grátis 2026"],
  ["Requirements Calculator 2025", "Requirements Calculator 2026"],
  ["optimization tips for 2025", "optimization tips for 2026"],
  ["AI experiences in 2025", "AI experiences in 2026"],
  ["Requirements Guide 2025", "Requirements Guide 2026"],
  ["What to Expect in 2025", "What to Expect in 2026"],
  ["Complete Guide 2025", "Complete Guide 2026"],
  ["Critical in 2025", "Critical in 2026"],
  ["Hathway Broadband Speed Test 2025", "Hathway Broadband Speed Test 2026"],
  ["Jio Fiber Speed Test 2025", "Jio Fiber Speed Test 2026"],
  ["BSNL Broadband Speed Test 2025", "BSNL Broadband Speed Test 2026"],
  ['"dateModified": "2025-01-17"', '"dateModified": "2026-08-15"'],
];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith(".tsx")) files.push(full);
  }
  return files;
}

let count = 0;
for (const file of walk(ROOT)) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;
  for (const [from, to] of [...GARBLED, ...DATES]) {
    content = content.split(from).join(to);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`Fixed: ${path.relative(ROOT, file)}`);
    count++;
  }
}
console.log(`Done. Updated ${count} files.`);
