const fs = require("node:fs");
const path = require("node:path");
const glob = require("fast-glob");
const { extract } = require("custom-property-extract");

const componentCssFiles = glob
  .sync("node_modules/@kickstartds/ds-agency/dist/components/**/*.css")
  .filter((file) => !file.includes("page-wrapper"));

componentCssFiles.push("node_modules/@kickstartds/ds-agency/dist/global.css");
componentCssFiles.push("token/tokens.css");

fs.mkdirSync(path.resolve("token/components"), { recursive: true });
const allToken = componentCssFiles.reduce((acc, componentCssFile) => {
  const customProperties = extract(path.resolve(componentCssFile), {
    syntax: "css",
    mode: "full",
  });

  acc.push(customProperties);

  return acc;
}, []);

fs.writeFileSync(
  "token/components.js",
  `
const token = ${JSON.stringify(allToken)};
module.exports = token;
`
);
