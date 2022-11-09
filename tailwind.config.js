module.exports = {
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#1E1E1E",
        white: "#FFFFFF",
        grey: {
          lighter: "#E9E9E9",
          light: "#868686",
          main: "#727272",
          dark: "#5D5D5D",
          darker: "#484848",
        },
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
