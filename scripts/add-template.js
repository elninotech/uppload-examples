const { readFileSync, writeFileSync } = require("fs");
const { join, resolve } = require("path");
const marked = require("marked");

const templatePath = join(__dirname, "..", "template.html");
let templateHtml = readFileSync(templatePath, { encoding: "utf8" });

const readmePath = join(".", "README.md");
try {
  const readmeMd = readFileSync(readmePath, { encoding: "utf8" });
  const readmeHtml = marked(readmeMd.toString())
    .split("\n", 2)
    .join("\n");
  const exampleName = resolve(".")
    .split("/")
    .pop();
  templateHtml = templateHtml
    .toString()
    .replace(
      "<!-- Contents -->",
      readmeHtml +
        `<p>You can <strong><a href="https://github.com/elninotech/uppload-examples/tree/master/examples/${exampleName}">view the source code</a></strong> of this example or <a href="https://codesandbox.io/s/github/elninotech/uppload-examples/tree/master/examples/${exampleName}">try it on CodeSandbox</a></p>`
    );
  const readmeTitle = readmeMd.split("\n", 1)[0].replace("# ", "");
  templateHtml = templateHtml.replace("<!-- Title -->", readmeTitle);
} catch (error) {}

const indexPath = join(".", "index.html");
writeFileSync(indexPath, templateHtml);

console.log("Written index.html");
