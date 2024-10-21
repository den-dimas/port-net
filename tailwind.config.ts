import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-main": "#fc4825",
      },
      fontFamily: {
        "fira-sans": "Fira sans",
      },
    },
  },
  plugins: [],
} satisfies Config;
