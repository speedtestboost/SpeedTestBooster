/**
 * Remove unused useEffect/setCanonicalHref imports from provider pages.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PROVIDERS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "client",
  "src",
  "pages",
  "providers",
);

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
for (const file of walk(PROVIDERS_DIR)) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  if (!content.includes("useEffect(")) {
    content = content.replace(
      /import \{ useEffect, useState \} from "react";/g,
      'import { useState } from "react";',
    );
  }

  if (!content.includes("setCanonicalHref")) {
    content = content.replace(
      /import \{ setCanonicalHref \} from "@\/lib\/seo";\r?\n/g,
      "",
    );
    content = content.replace(
      /import \{ setCanonicalHref, removeHomepageJsonLd \} from "@\/lib\/seo";\r?\n/g,
      "",
    );
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    count++;
  }
}
console.log(`Cleaned imports in ${count} provider files.`);
