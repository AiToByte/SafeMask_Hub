import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🚀 搬运 SafeMask 标志性的琥珀黑
        background: "#0c0b0a", 
        foreground: "#fffbeb", // amber-50
        panel: "#0d0d0f",
      },
      // 🚀 搬运你之前的 4.5 间距
      spacing: {
        '4.5': '1.125rem',
      }
    },
  },
  plugins: [],
};
export default config;