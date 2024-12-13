/** @type {import('@maizzle/framework').Config} */

/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  build: {
    templates: {
      source: "src/templates",
      destination: {
        path: "build_local_frame",
      },
      assets: [
        {
          source: "src/images",
          destination: "",
        },
        {
          source: "scripts/redactor.js",
          destination: "scripts/redactor.js",
        },
        {
          source: "frame",
          destination: "scripts",
        },
      ],
    },
    posthtml: {
      plugins: [require("./posthtml-add-align-center.cjs")()],
      expressions: {
        delimiters: ["[[", "]]"],
        unescapeDelimiters: ["[[[", "]]]"],
      },
      options: {
        singleTags: ["img", "br"],
        closingSingleTag: "slash",
      },
    },
    tailwind: {
      config: require("./tailwind.config.cjs"),
    },
  },
  applyTransformers: true,
  extraAttributes: {
    table: {
      role: "presentation",
      border: "0",
      cellspacing: "0",
      cellpadding: "0",
    },
  },
  inlineCSS: {
    applyWidthAttributes: ["img"],
  },
  removeUnusedCSS: {
    removeHTMLComments: false,
    whitelist: [
      ".fragment-togglers",
      ".toggler",
      ".preview",
      ".frags-toggler",
      ".tokens-toggler",
    ],
  },
  shorthandCSS: true,
  prettify: true,
  safeClassNames: true,
  replaceStrings: {
    "<!-- Add more <tr> as shown above to add more sections, or delete unused sections -->":
      "",
  },
  events: {
    afterBuild() {
      // Remove .gitkeep from the build folder
      const fs = require("fs");

      const IMAGES_PATH = "./build_local_frame";
      const GIT_KEEP = ".gitkeep";

      const files = fs.readdirSync(IMAGES_PATH);

      const isIncludesGit = files.includes(GIT_KEEP);

      if (isIncludesGit) {
        fs.rmSync(`${IMAGES_PATH}/${GIT_KEEP}`);
      }
    },
  },
};
