/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ".pages/*.js",
    ".components/*.js",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"],
  },
};
