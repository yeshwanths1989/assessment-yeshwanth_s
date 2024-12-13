/** @type {import('@maizzle/framework').Config} */

/*
|-------------------------------------------------------------------------------
| Production config                       https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is where you define settings that optimize your emails for production.
| These will be merged on top of the base config.js, so you only need to
| specify the options that are changing.
|
*/
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
  build: {
    templates: {
      destination: {
        path: "dist/full_version",
      },
      source: "src/templates",
      assets: {
        source: "src/images",
        destination: "images",
      },
    },
    posthtml: {
      expressions: {
        delimiters: ["[[", "]]"],
        unescapeDelimiters: ["[[[", "]]]"],
      },
    },
    tailwind: {
      config: require("./tailwind.config.cjs"),
    },
    options: {
      singleTags: ["img", "br"],
      closingSingleTag: "slash",
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
    whitelist: [".AE_customText"],
  },
  shorthandCSS: true,
  prettify: true,
  replaceStrings: {
    "<!-- Add more <tr> as shown above to add more sections, or delete unused sections -->":
      "",
  },
  events: {
    afterTransformers(html, config) {
      // Parse the HTML file
      const dom = new JSDOM(html);
      const document = dom.window.document;
      // Function to recursively process text content of an element
      const processTextContent = element => {
        element.childNodes.forEach(node => {
          if (node.nodeType === node.TEXT_NODE) {
            // Replace sequences of digits with the digits followed by &zwj; (\u200D)

            // Reglar expression to find sequences of at least two digits not inside token
            let regex = /(?<!{{[^{}]*?)\b\d{2,}\b(?![^{}]*?}})/g;

            // Add &zwj; (\u200D) after each digit in the found sequences
            node.textContent = node.textContent.replace(regex, match => {
              return match.replace(/\d/g, "$&\u200D");
            });
          } else if (node.nodeType === node.ELEMENT_NODE) {
            processTextContent(node); // Recursively process child elements
          }
        });
      };
      // Process the body content, excluding head section
      const body = document.querySelector("body");
      let data = body.innerHTML;

      // Reglar expression to find email addresses not inside <a> tags
      let regex =
        /(?<!<a[^>]*?>[^<]*)(?<!href="[^"]*)(?<!src="[^"]*)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

      // Replace the found email addresses
      data = data.replace(regex, function (match) {
        // Replace dots in the email with &zwj;.&zwj (\u200D);
        let replaced = match.replace(/\./g, "\u200D.\u200D");

        // Add hidden span before the @ symbol
        replaced = replaced.replace(
          "@",
          '<span style="display:none;mso-hide:all;">&nbsp;</span>@'
        );

        return replaced;
      });

      // Reglar expression to find URLs not inside <a> tags, token {{}} or <v:roundrect>
      regex =
        /(?<!<a\s+(?:[^>]*?\s+)?href=["'][^"']*|\{\{|<v:roundrect\s+(?:[^>]*?\s+)?href=["'][^"']*)\b(https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([^\s\/<]*)?(?![^<]*<\/a>)/g;

      // Replace the found URLs
      data = data.replace(regex, function (match) {
        // Replace dots in the URL with &zwj;.&zwj; (\u200D)
        let replaced = match.replace(/\./g, "\u200D.\u200D");

        // If URL starts with 'www', add &zwj; (\u200D) after first 'w'
        if (replaced.startsWith("www")) {
          replaced = replaced.replace("www", "w\u200Dww");
        }

        // If URL starts with 'http', add &zwj; (\u200D) after 'h'
        if (replaced.startsWith("http")) {
          replaced = replaced.replace("http", "h\u200Dttp");
        }

        return replaced;
      });

      // Reglar expression to find {{userEmailAddress}} not inside <a>
      regex =
        /(?<!<(?:a|v:roundrect)[^>]*?href=["'][^"']*?)\{\{userEmailAddress\}\}([^\s\/<]*)?(?![^<]*<\/(?:a|v:roundrect)>)/g;

      // Replace the found {{userEmailAddress}}
      data = data.replace(regex, function (match) {
        // Make it <a href="#" style="color:inherit;text-decoration:none;">{{userEmailAddress}}</a>
        let replaced = match.replace(
          "{{userEmailAddress}}",
          '<a href="#" style="color:inherit;text-decoration:none;">{{userEmailAddress}}</a>'
        );

        return replaced;
      });

      // Reglar expression to find {{User.Phone}} not inside <a>
      regex =
        /(?<!<(?:a|v:roundrect)[^>]*?href=["'][^"']*?)\{\{User\.Phone\}\}([^\s\/<]*)?(?![^<]*<\/(?:a|v:roundrect)>)/g;

      // Replace the found {{User.Phone}}
      data = data.replace(regex, function (match) {
        // Make it <a href="#" style="color:inherit;text-decoration:none;">{{User.Phone}}</a>
        let replaced = match.replace(
          "{{User.Phone}}",
          '<a href="#" style="color:inherit;text-decoration:none;">{{User.Phone}}</a>'
        );

        return replaced;
      });

      // Reglar expression to find {{User.MobilePhone}} not inside <a>
      regex =
        /(?<!<a\s+(?:[^>]*?\s+)?href=["'][^"']*?href=["'][^"']*)\{\{User.MobilePhone\}\}([^\s\/<]*)?(?![^<]*<\/a>)/g;

      // Replace the found {{User.MobilePhone}}
      data = data.replace(regex, function (match) {
        // Make it <a href="#" style="color:inherit;text-decoration:none;">{{User.MobilePhone}}</a>
        let replaced = match.replace(
          "{{User.MobilePhone}}",
          '<a href="#" style="color:inherit;text-decoration:none;">{{User.MobilePhone}}</a>'
        );

        return replaced;
      });

      // Convert RGB color to HEX color
      function rgbToHex(rgb) {
        const rgbValues = rgb.match(/\d+/g);
        const hex = rgbValues.map(value => {
          const hexValue = parseInt(value).toString(16);
          return hexValue.length === 1 ? "0" + hexValue : hexValue;
        });
        return `#${hex.join("")}`;
      }
      // Set the color of links with href="#" to the color of their ancestor elements
      function setLinkColorToAncestorColor(html) {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const window = dom.window;

        const links = document.querySelectorAll('a[href="#"]');

        links.forEach(link => {
          const ancestor = link.closest('[style*="color"]');
          let ancestorColorHex = "#000000"; // Default color if ancestor color is not found

          if (ancestor) {
            const ancestorColor = window.getComputedStyle(ancestor).color;
            if (ancestorColor) {
              ancestorColorHex = rgbToHex(ancestorColor);
            }
          }

          // Construct the new style string with color first, followed by text-decoration
          let newStyle = `color:${ancestorColorHex};text-decoration:none;`;

          // Merge the new style with existing styles, excluding any existing color or text-decoration styles
          const existingStyle = link.getAttribute("style") || "";
          const existingStyles = existingStyle
            .split(";")
            .filter(
              style =>
                !/color\s*:/i.test(style) && !/text-decoration\s*:/i.test(style)
            );
          if (existingStyles.length > 0) {
            newStyle += ` ${existingStyles.join(";")}`;
          }

          link.setAttribute("style", newStyle.trim());
        });

        return dom.serialize();
      }
      data = setLinkColorToAncestorColor(data);
      // Reglar expression to find <img>
      regex = /<img\s+[^>]*?src\s*=\s*["'][^"']*["'][^>]*>/g;

      // Replace the found <img>
      data = data.replace(regex, function (match) {
        // Remove &zwj; (\u200D) from image path
        let replaced = match.replace(/\u200D/g, "");

        return replaced;
      });
      body.innerHTML = data;
      processTextContent(body);
      data = body.innerHTML;

      // Reglar expression to find Veeva token
      regex = /\{\{[^\}]+\}\}/g;

      // Replace the found Veeva token
      data = data.replace(regex, function (match) {
        /// Remove &zwj; (\u200D) from Veeva token
        let replaced = match.replace(/\u200D/g, "");
        return replaced;
      });
      body.innerHTML = data;

      // must return `html`
      return dom.serialize();
    },
    afterBuild() {
      // Remove .gitkeep from the build folder
      const fs = require("fs");
      const IMAGES_PATH = "./dist/full_version/images/";
      const GIT_KEEP = ".gitkeep";
      const files = fs.readdirSync(IMAGES_PATH);
      const isIncludesGit = files.includes(GIT_KEEP);
      if (isIncludesGit) {
        fs.rmSync(`${IMAGES_PATH}${GIT_KEEP}`);
      }
    },
  },
};
