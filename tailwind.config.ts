import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: "smooth",
      },
      boxShadow: {
        light: "0px 1px 4px rgba(0, 0, 0, 0.16)",
        hover_card:
          "rgba(14, 30, 37, 0.3) 0px 4px 8px 0px, rgba(14, 30, 37, 0.6) 0px 4px 24px 0px",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-elektro-massive-horizontal":
          "linear-gradient(to right, #990000, #663333, #333333)",
        "gradient-elektro-massive-vertical":
          "linear-gradient(to bottom, #663333, #5A3449, #343165)",
      },
    },
  },
  plugins: [],
};
export default config;
