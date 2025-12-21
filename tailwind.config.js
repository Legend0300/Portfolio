/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(210, 36%, 98%)",
        foreground: "#0f172a",
        card: "#ffffff",
        muted: "#e2e8f0",
        accent: "#2563eb",
        accentSoft: "#dbeafe",
      },
      fontFamily: {
        display: ["'Manrope'", "system-ui", "sans-serif"],
        body: ["'Satoshi'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 50px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
