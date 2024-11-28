const path = require("path");
const StyleDictionary = require("style-dictionary");
const { config } = require("@kickstartds/style-dictionary");

module.exports = StyleDictionary.extend(config).extend({
  source: [
    "token/dictionary/**/*.json",
    path.join(__dirname, "token/dictionary/**/*.svg"),
  ],
  platforms: {
    css: {
      buildPath: "token/",
    },
    html: {
      buildPath: "token/",
    },
    jsx: {
      buildPath: "token/",
    },
    storybook: {
      buildPath: "token/storybook/",
    },
    js: {
      transforms: ["attribute/cti", "name/cti/pascal", "size/rem", "color/css"],
      buildPath: "token/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
      ],
    },
  },
});
