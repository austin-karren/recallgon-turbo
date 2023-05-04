const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var, sans-serif", ...fontFamily.sans],
      },
    },
  },
};
