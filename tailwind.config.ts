import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FAFAFA",
          secondary: "#F5F5F0",
        },
        primary: {
          DEFAULT: "#1A1A1A",
          text: "#1A1A1A",
        },
        secondary: {
          text: "#6B6B6B",
        },
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#EFF6FF",
        },
        sale: "#DC2626",
        success: "#16A34A",
        border: {
          subtle: "rgba(0, 0, 0, 0.06)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "DM Serif Display", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        card: "0 2px 8px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.02)",
        drawer: "-4px 0 24px rgba(0,0,0,0.08)",
        modal: "0 20px 40px rgba(0,0,0,0.12)",
      },
      spacing: {
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "64": "64px",
        "80": "80px",
        "120": "120px",
      },
      maxWidth: {
        site: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
