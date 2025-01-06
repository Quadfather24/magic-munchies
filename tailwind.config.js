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
      },
    },
  },
  plugins: [],
};
