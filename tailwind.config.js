// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        heading: ['"GmarketSans"', "sans-serif"],
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
};
