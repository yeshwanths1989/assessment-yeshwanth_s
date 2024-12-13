/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    screens: {
      sm: { max: "600px" },
      xs: { max: "425px" },
      m: { max: "800px" },
    },
    extend: {
      colors: {
        // add custom colors (outside of tailwind)
      },
      spacing: {
        // add custom spacings (outside of tailwind)
      },
      borderRadius: {
        // Use this for custom border radius
      },
      boxShadow: {
        // Use this for custom shadows
      },
      fontFamily: {
        // DO NOT CHANGE THIS, for RTE the default font should be Arial - hence for all texts use "font-primary"
        primary: ["Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        // Add custom font sizes (outside of tailwind)
      },
      letterSpacing: theme => ({
        ...theme("width"),
      }),
      lineHeight: theme => ({
        ...theme("width"),
      }),
      maxWidth: theme => ({
        ...theme("width"),
        xs: "160px",
        sm: "192px",
        md: "224px",
        lg: "256px",
        xl: "288px",
        "2xl": "336px",
        "3xl": "384px",
        "4xl": "448px",
        "5xl": "512px",
        "6xl": "576px",
        "7xl": "640px",
      }),
      minHeight: theme => ({
        ...theme("width"),
      }),
      minWidth: theme => ({
        ...theme("width"),
      }),
    },
  },
  corePlugins: {
    preflight: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    textOpacity: false,
  },
  plugins: [
    require("tailwindcss-mso"),
    require("tailwindcss-box-shadow"),
    require("tailwindcss-email-variants"),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".align-center-table": {},
        ".align-right-table": {},
        ".align-left-table": {},
        ".underline": { textDecoration: "underline" },
        ".decoration-none": { textDecoration: "none" },
        ".sup": {
          verticalAlign: "4px",
          fontSize: "70%",
          lineHeight: "0",
        },
      });
    }),
  ],
};
