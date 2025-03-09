/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      backdropBlur: {
        sm: "4px",
      },
      animation: {
        wave: "wave 2s infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideIn: "slideIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(8deg)" },
          "30%": { transform: "rotate(-2deg)" },
          "40%": { transform: "rotate(8deg)" },
          "50%": { transform: "rotate(-2deg)" },
          "60%": { transform: "rotate(9deg)" },
          "70%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
