module.exports = {
  purge: [
    "./src/components/**/*.jsx",
    "./src/components/*.jsx",
    "./src/pages/**/*.jsx",
    "./src/pages/*.jsx",
    "./src/*.jsx",
  ],
  theme: {
    extend: {},
    fontFamily: {
      fatfrank: ["fatfrank", "sans-serif"],
      helvetica: ["Helvetica"],
    },
    colors: {
      transparent: "transparent",
      primary: "#465558",
      white: "#ffffff",
      lightgray: "#A7A7A7",
      gray: "#e4e4e4",
      darkgray: "#424242",
      green: "#3CBC00",
      purple: "#8501ff",
      cyan: "#008272",
      red: "#ff0101",
      black: "#000",
      blue: "#33446C",
      blueHover: "#33446Cee",
    },
  },
  plugins: [
    //require("@tailwindcss/forms"),
    //require("tw-elements/dist/plugin")
  ],
};
