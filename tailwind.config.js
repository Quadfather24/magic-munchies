/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        magicPeach: "#ffb6a1",
        magicPink: "#f97c7c",
        magicTeal: "#5CE0E6",
        magicPurple: "#F84FFFE3",
        magicHot: "#F81894",
      },
      backgroundImage: {
        "magic-gradient": "linear-gradient(135deg, #ffb6a1, #fff4e6, #f97c7c)",
        contactImage: "url('./src/assets/images/background/contact.svg')",
        contactImage1: "url('./src/assets/images/background/contact1.svg')",
      },
      fontFamily: {
        roboto: ["Roboto", "ui-sans-serif", "system-ui"],
        sourGummy: ["Sour Gummy", "serif"],
      },
      spacing: {
        46: "11.5rem",
      },
      transitionProperty: {
        swipe: "transform, opacity",
      },
      // Add the new keyframes for the X rotation
      keyframes: {
        "half-rotate": {
          // Start position
          "0%": { transform: "rotate(0deg)" },

          "100%": { transform: "rotate(180deg)" },
        },
      },
      // Add the new animation
      animation: {
        "slide-left": "slide-left 0.3s ease-in-out",
        "slide-right": "slide-right 0.3s ease-in-out",
        "x-rotate": "half-rotate 2s",

        "bounce-slow": "bounce 3s linear infinite",
      },
    },
  },
  safelist: [
    "animate-slide-left",
    "animate-slide-right",
    "translate-x-[var(--swipe-offset)]",
    "animate-x-rotate", // Add the new animation to safelist
  ],
  plugins: [],
};
