const fs = require("node:fs/promises");
const esbuild = require("esbuild");
const fg = require("fast-glob");

const importPath = (filePath) => `import "./${filePath}";`;

const componentFiles = fg.sync([
  "node_modules/@kickstartds/ds-agency/dist/global.client.js",
  "node_modules/@kickstartds/ds-agency/dist/components/**/*.client.js",
  "components/**/*.client.js",
]);
const entryFile = `\
${componentFiles.map(importPath).join("\n")}
`;

const build = async () => {
  await fs.rm("public/_", { force: true, recursive: true });

  await esbuild.build({
    stdin: {
      contents: entryFile,
      resolveDir: ".",
      loader: "ts",
    },
    format: "esm",
    bundle: true,
    minify: true,
    splitting: true,
    treeShaking: true,
    outdir: "public/_",
    entryNames: "[dir]/client",
    logLevel: "info",
    plugins: [],
    loader: {
      ".scss": "empty",
      ".css": "empty",
    },
  });
};

build();
