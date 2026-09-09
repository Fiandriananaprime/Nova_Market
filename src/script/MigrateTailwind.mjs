import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".vite",
  "coverage",
  "target",
]);

const EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".html",
  ".vue",
  ".svelte",
]);

const WRITE_MODE = process.argv.includes("--write");

const THEME = {
  background: "#F5EFFF",
  foreground: "#16262E",
  card: "#FFFFFF",
  "card-foreground": "#16262E",

  primary: "#0077B6",
  "primary-foreground": "#FFFFFF",

  secondary: "#EBE8F0",
  "secondary-foreground": "#16262E",

  muted: "#EBE8F0",
  "muted-foreground": "#5D6D75",

  accent: "#5ABCB9",
  "accent-foreground": "#FFFFFF",

  border: "#D0CCD0",
  ring: "#0077B6",

  navy: "#16262E",
  turquoise: "#5ABCB9",
  blue: "#0077B6",
  lavender: "#F5EFFF",
  gray: "#D0CCD0",

  darkBackground: "#0f1e25",
  darkSecondary: "#1e3540",
  darkMutedForeground: "#8da8b5",
  darkBorder: "#2a4555",
};

function normalizeHex(value) {
  if (!value) return null;

  let color = value.trim().toUpperCase();

  if (/^#[0-9A-F]{3}$/i.test(color)) {
    color =
      "#" +
      color
        .slice(1)
        .split("")
        .map((char) => char + char)
        .join("");
  }

  return /^#[0-9A-F]{6}$/i.test(color) ? color : null;
}

function findThemeName(value) {
  const variableMatch = value
    .trim()
    .match(/^var\(\s*--([^)]+)\s*\)$/i);

  if (variableMatch) {
    const variableName = variableMatch[1].trim();

    if (Object.hasOwn(THEME, variableName)) {
      return variableName;
    }

    return null;
  }

  const color = normalizeHex(value);

  if (!color) return null;

  for (const [name, themeColor] of Object.entries(THEME)) {
    if (normalizeHex(themeColor) === color) {
      return name;
    }
  }

  return null;
}

const UTILITIES = [
  "bg",
  "text",
  "border",
  "border-t",
  "border-r",
  "border-b",
  "border-l",
  "divide",
  "ring",
  "outline",
  "decoration",
  "placeholder",
  "from",
  "via",
  "to",
  "fill",
  "stroke",
  "caret",
  "accent",
  "shadow",
];

const utilityPattern = UTILITIES
  .sort((a, b) => b.length - a.length)
  .map((utility) => utility.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");

const arbitraryClassRegex = new RegExp(
  `((?:[a-z0-9-]+:)*)(${utilityPattern})-\\[([^\\]]+)\\]`,
  "gi"
);

function shouldIgnore(filePath) {
  const relative = path.relative(ROOT, filePath);
  return relative
    .split(path.sep)
    .some((part) => IGNORE_DIRS.has(part));
}

function getFiles(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(directory, entry.name);

    if (shouldIgnore(fullPath)) continue;

    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath));
      continue;
    }

    if (EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  let changed = false;
  const replacements = [];
  const unknown = new Set();

  const updated = original.replace(
    arbitraryClassRegex,
    (match, variants, utility, value) => {
      const themeName = findThemeName(value);

      if (!themeName) {
        unknown.add(match);
        return match;
      }

      const replacement = `${variants}${utility}-${themeName}`;

      changed = true;

      replacements.push({
        from: match,
        to: replacement,
      });

      return replacement;
    }
  );

  if (changed && WRITE_MODE) {
    fs.writeFileSync(filePath, updated, "utf8");
  }

  return {
    filePath,
    changed,
    replacements,
    unknown: [...unknown],
  };
}

console.log("");
console.log("==========================================");
console.log(" Tailwind Theme Migration");
console.log("==========================================");
console.log("");

console.log(
  WRITE_MODE
    ? "MODE: WRITE"
    : "MODE: DRY RUN"
);

console.log("");

const files = getFiles(ROOT);

let totalFiles = 0;
let changedFiles = 0;
let totalReplacements = 0;

const unknownValues = new Map();

for (const file of files) {
  const result = processFile(file);

  totalFiles++;

  if (result.changed) {
    changedFiles++;
    totalReplacements += result.replacements.length;

    console.log(`\n📄 ${path.relative(ROOT, file)}`);

    for (const replacement of result.replacements) {
      console.log(
        `   ${replacement.from} → ${replacement.to}`
      );
    }
  }

  for (const className of result.unknown) {
    if (!unknownValues.has(className)) {
      unknownValues.set(className, new Set());
    }

    unknownValues
      .get(className)
      .add(path.relative(ROOT, file));
  }
}

console.log("");
console.log("==========================================");
console.log(" Summary");
console.log("==========================================");
console.log("");

console.log(`Files scanned:       ${totalFiles}`);
console.log(`Files with changes:  ${changedFiles}`);
console.log(`Replacements:        ${totalReplacements}`);

if (!WRITE_MODE && totalReplacements > 0) {
  console.log("");
  console.log("To apply:");
  console.log("");
  console.log("  node src/script/migrate-tailwind-theme.js --write");
}

if (unknownValues.size > 0) {
  console.log("");
  console.log("==========================================");
  console.log(" Unmatched arbitrary classes");
  console.log("==========================================");
  console.log("");

  for (const [className, fileSet] of unknownValues) {
    console.log(`⚠ ${className}`);

    for (const file of fileSet) {
      console.log(`  - ${file}`);
    }

    console.log("");
  }
}

console.log("Done.");