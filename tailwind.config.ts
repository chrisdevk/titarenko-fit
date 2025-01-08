import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: "1.063rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "off-white": "#F4F4F4",
        "indigo-custom": "#4945FF",
        "off-black": "#32324D",
        "grey-custom": "#666687",
        "baby-slate": "#F6F6FF",
      },
      fontFamily: {
        sans: ["var(--font-roboto)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  variants: {
    extend: {
      before: ["hover"],
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
