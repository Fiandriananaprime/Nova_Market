import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve("./src");

function replaceTextForeground(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      replaceTextForeground(fullPath);
      continue;
    }

    if (!/\.(tsx|ts|jsx|js)$/.test(file)) {
      continue;
    }

    let content = fs.readFileSync(fullPath, "utf8");

    if (content.includes("text-foreground")) {
      content = content.replaceAll(
        "text-foreground",
        "text-secondary-foreground"
      );

      fs.writeFileSync(fullPath, content, "utf8");

      console.log(`Updated: ${fullPath}`);
    }
  }
}

replaceTextForeground(rootDir);