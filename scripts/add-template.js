const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const marked = require("marked");

const templatePath = join(__dirname, "..", "template.html");
let templateHtml = readFileSync(templatePath, { encoding: "utf8" });

const readmePath = join(".", "README.md");
try {
  const readmeMd = readFileSync(readmePath, { encoding: "utf8" });
  const readmeHtml = marked(readmeMd.toString())
    .split("\n", 2)
    .join("\n");
  templateHtml = templateHtml
    .toString()
    .replace("<!-- Contents -->", readmeHtml);
} catch (error) {}

const indexPath = join(".", "index.html");
writeFileSync(indexPath, templateHtml);

console.log("Written index.html");
