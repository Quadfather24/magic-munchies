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
      // Add new transition properties for swipe animations
      transitionProperty: {
        swipe: "transform, opacity",
      },
    },
    // Add keyframes for smooth entrance/exit animations
    keyframes: {
      "slide-left": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
      "slide-right": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(100%)" },
      },
    },
    // Add custom animation definitions
    animation: {
      "slide-left": "slide-left 0.3s ease-in-out",
      "slide-right": "slide-right 0.3s ease-in-out",
    },
  },
  // Make sure we can use all these animations
  safelist: [
    "animate-slide-left",
    "animate-slide-right",
    "translate-x-[var(--swipe-offset)]",
  ],

  plugins: [],
};
