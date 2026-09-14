/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        primary: {
          DEFAULT: "#4F46E5",
          hover: "#4338CA",
          light: "#EEF2FF",
          dark: "#3730A3",
        },
        accent: {
          DEFAULT: "#14B8A6",
          hover: "#0D9488",
          light: "#F0FDFA",
          dark: "#0F766E",
        },
        slate: {
          900: "#0F172A",
          700: "#334155",
          500: "#64748B",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
          50: "#F8FAFC",
        },
        success: {
          DEFAULT: "#16A34A",
          light: "#F0FDF4",
          border: "#BBF7D0",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FFFBEB",
          border: "#FDE68A",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#FEF2F2",
          border: "#FECACA",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)",
        hover: "0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
        dialog: "0 25px 50px -12px rgba(15, 23, 42, 0.15)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
