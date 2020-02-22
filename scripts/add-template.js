const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const templatePath = join(__dirname, "..", "template.html");
const templateHtml = readFileSync(templatePath, { encoding: "utf8" });

const indexPath = join(".", "index.html");
writeFileSync(indexPath, templateHtml);

console.log("Written index.html");
