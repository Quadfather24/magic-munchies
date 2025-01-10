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
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        bounceWithRotateNormal: "bounceWithRotateNormal 1.5s infinite",
        bounceWithRotateReverse: "bounceWithRotateReverse 1.5s infinite",
        bounceWithTranslate: "bounceWithTranslate 1s infinite",
        gradient: "gradient ease infinite",
        tilt: "tilt 10s infinite linear",
      },
    },
  },
  plugins: [],
};
