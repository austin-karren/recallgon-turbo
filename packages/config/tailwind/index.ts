import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [""],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var, sans-serif", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
