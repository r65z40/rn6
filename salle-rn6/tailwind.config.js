/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1A1A2E",
          50: "#F2F2F5",
          100: "#E0E0E8",
          200: "#B8B8CC",
          300: "#8E8EA8",
          400: "#5C5C78",
          500: "#3A3A52",
          600: "#2A2A40",
          700: "#1A1A2E",
          800: "#121222",
          900: "#0A0A16",
        },
        bronze: {
          DEFAULT: "#B8963E",
          50: "#FAF7F0",
          100: "#F2ECDA",
          200: "#E5D9B5",
          300: "#D4C286",
          400: "#C5AB5C",
          500: "#B8963E",
          600: "#977B33",
          700: "#735E27",
          800: "#4F411B",
          900: "#2B2310",
        },
        ruby: {
          DEFAULT: "#C41E3A",
          50: "#FDF2F4",
          100: "#FAE3E7",
          200: "#F5C7CF",
          300: "#EF9DAD",
          400: "#E66B83",
          500: "#C41E3A",
          600: "#A61832",
          700: "#8B1429",
        },
        stone: {
          DEFAULT: "#FAFAF8",
          50: "#FEFEFE",
          100: "#FAFAF8",
          200: "#F0EFEC",
          300: "#E4E3DE",
          400: "#D1CFCA",
          500: "#A8A6A0",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', '"Didot"', '"Georgia"', 'serif'],
        body: ['"Figtree"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "rise": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "enter": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rise": "rise 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "enter": "enter 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
