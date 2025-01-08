/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        magicPeach: "#ffb6a1",
        magicPink: "#f97c7c",
      },
      backgroundImage: {
        "magic-gradient": "linear-gradient(135deg, #ffb6a1, #fff4e6, #f97c7c)",
        phoneImage: "url('./src/assets/images/background/phone.jpg')",
      },
      fontFamily: {
        roboto: ["Roboto", "ui-sans-serif", "system-ui"],
        sourGummy: ["Sour Gummy", "serif"],
      },
      spacing: {
        46: "11.5rem", // Example: 46 equals 11.5rem (46 x 0.25rem)
      },
      keyframes: {
        bounceWithRotateReverse: {
          "0%, 100%": { transform: "translateY(0) rotate(-45deg)" },
          "50%": { transform: "translateY(-5px) rotate(-45deg)" },
        },
        bounceWithRotateNormal: {
          "0%, 100%": { transform: "translateY(0) rotate(45deg)" },
          "50%": { transform: "translateY(-5px) rotate(45deg)" },
        },

        bounceWithTranslate: {
          "0%, 100%": { transform: "translateY(0) translateX(2px)" },
          "50%": { transform: "translateY(-10px) translateX(2px)" },
        },
      },
      animation: {
        bounceWithRotateNormal: "bounceWithRotateNormal 1.5s infinite",
        bounceWithRotateReverse: "bounceWithRotateReverse 1.5s infinite",
        bounceWithTranslate: "bounceWithTranslate 1s infinite",
      },
    },
  },
  plugins: [],
};
