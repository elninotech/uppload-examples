const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { join, resolve } = require("path");
const { format } = require("prettier");
const marked = require("marked");

let templateHtml = `<!DOCTYPE html>
<html>
  <head>
    <title><!-- Title --> &middot; Uppload</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/purecss@1.0.1/build/pure-min.css"
      integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47"
      crossorigin="anonymous"
    />
    <style>
      a {
        color: #0078e7;
      }
      .uppload-image {
        display: block;
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <div
      style="padding: 2rem; max-width: 800px; margin: auto; line-height: 1.5"
    >
      <main>
        <!-- Contents -->
        <p style="opacity: 0.5">Click on the button below to try this demo.</p>
        <img alt="" class="uppload-image" />
        <button class="pure-button pure-button-primary">
          Upload
        </button>
      </main>
      <footer style="margin-top: 4rem">
        <h2>Uppload</h2>
        <p>
          Uppload is a better JavaScript image uploader. It's highly
          customizable with 30+ plugins, completely free and open-source, and
          can be used with any file uploading backend.
        </p>
        <a href="https://github.com/elninotech/uppload" class="pure-button"
          >GitHub</a
        >
        <a href="https://uppload.js.org" class="pure-button">Docs</a>
      </footer>
    </div>
    <script src="index.ts"></script>
  </body>
</html>`;

const examples = readdirSync(join(__dirname, "examples"));
examples.forEach(example => {
  const readmePath = join(__dirname, "examples", example, "README.md");
  try {
    const readmeMd = readFileSync(readmePath, { encoding: "utf8" });
    const readmeHtml = marked(readmeMd.toString())
      .split("\n", 2)
      .join("\n");
    templateHtml = templateHtml
      .toString()
      .replace(
        "<!-- Contents -->",
        readmeHtml +
          `<p>You can <strong><a href="https://github.com/elninotech/uppload-examples/tree/master/examples/${example}">view the source code</a></strong> of this example or <a href="https://codesandbox.io/s/github/elninotech/uppload-examples/tree/master/examples/${example}">try it on CodeSandbox</a></p>`
      );
    const readmeTitle = readmeMd.split("\n", 1)[0].replace("# ", "");
    templateHtml = templateHtml.replace("<!-- Title -->", readmeTitle);
  } catch (error) {
    console.log(error);
  }

  const indexPath = join(__dirname, "examples", example, "index.html");
  writeFileSync(indexPath, format(templateHtml, { parser: "html" }));

  console.log(`Written examples/${example}/index.html`);
});
