/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-base)",
        surface: "var(--bg-surface)",
        brand: {
          green: "#10B981",
          secondary: "#14B8A6",
          black: "#0A0A0A",
          white: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#10B981",
          hover: "#14B8A6",
          light: "#10B981",
          dark: "#10B981",
        },
        secondary: {
          DEFAULT: "#14B8A6",
          hover: "#10B981",
        },
        accent: {
          DEFAULT: "#14B8A6",
          hover: "#10B981",
          light: "#14B8A6",
          dark: "#14B8A6",
        },
        success: {
          DEFAULT: "#10B981",
          light: "#10B981",
          border: "#10B981",
        },
        warning: {
          DEFAULT: "#0A0A0A",
          light: "#0A0A0A",
          border: "#0A0A0A",
        },
        danger: {
          DEFAULT: "#14B8A6",
          light: "#14B8A6",
          border: "#14B8A6",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(10, 10, 10, 0.05), 0 1px 2px -1px rgba(10, 10, 10, 0.04)",
        hover: "0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(10, 10, 10, 0.04)",
        dialog: "0 25px 50px -12px rgba(10, 10, 10, 0.25)",
      },
      borderRadius: {
        'lg': '0.5rem',  /* 8px */
        'xl': '0.75rem', /* 12px */
        '2xl': '1rem',    /* 16px */
        '3xl': '1.25rem', /* 20px */
      }
    },
  },
  plugins: [],
}
