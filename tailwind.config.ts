import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  plugins: [typography],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        base: {
          50: "#fafafa",
          100: "#f5f5f5",
          900: "#111111",
        },
        accent: {
          50: "#fff7f5",
          200: "#ffd8cc",
          500: "#f4a88b",
          700: "#e07050",
        },
      },
      borderRadius: {
        xl2: "1rem",
      },
      boxShadow: {
        soft: "0 6px 20px rgba(0,0,0,0.06)",
      },
    },
  },
  safelist: [
    {
      pattern: /^text-accent-\d{2,3}$/,
    },
  ],
};

export default config;