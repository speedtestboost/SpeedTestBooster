/**
 * Strip "No Ads" spam from Indian city page titles and meta tags.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PAGES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "client",
  "src",
  "pages",
);

const CITY_FILES = [
  "bangalore-speed-test.tsx",
  "chennai-speed-test.tsx",
  "delhi-speed-test.tsx",
  "hyderabad-speed-test.tsx",
  "kolkata-speed-test.tsx",
  "mumbai-speed-test.tsx",
];

const REPLACEMENTS = [
  ["Free Internet Speed Test Online - No Ads & Boost", "Speed Test & Boost"],
  ["Free Internet Speed Test Online - No Ads", "Internet Speed Test"],
  ["Internet Free Internet Speed Test Online - No Adss", "Internet Speed Test"],
  ["Internet Free Internet Speed Test Online - No Ads", "Internet Speed Test"],
  ["Speed Test No Ads", "Speed Test"],
];

let count = 0;
for (const name of CITY_FILES) {
  const file = path.join(PAGES_DIR, name);
  let content = fs.readFileSync(file, "utf8");
  const original = content;
  for (const [from, to] of REPLACEMENTS) {
    content = content.split(from).join(to);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`Fixed: ${name}`);
    count++;
  }
}
console.log(`Done. Updated ${count} city files.`);
