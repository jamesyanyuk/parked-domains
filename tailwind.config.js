const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      tablet: "768px",
      laptop: "1280px",
      desktop: "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      neutral: {
        base: "#222222",
        50: "#F6F6F6",
        75: "#EEEEEE",
        100: "#E5E5E5",
        200: "#BBBBBB",
        250: "#D4D4D4",
        300: "#888888",
        400: "#5D5D5D",
        500: "#444444",
        600: "#333333",
        700: "#2A2A2A",
        800: "#222222",
        900: "#1A1A1A",
      },
      primary: {
        heavy: "#002055",
        base: "#0047BB",
        alt: "#6691D6",
        light: "#CCDFFF",
      },
      secondary: {
        base: "#C6FCB9",
        50: "#FBFFFA",
        100: "#E1FDDA",
        200: "#C6FCB9",
        300: "#ABFB98",
        400: "#91F978",
        500: "#76F857",
        600: "#5CF637",
        700: "#41F516",
        800: "#33E00A",
        900: "#2CBF08",
      },
      red: {
        base: "#CF0A16",
        alt: "#F75974",
      },
      yellow: {
        base: "#FCCE2C",
        alt: "#FDDE6F",
      },
      green: {
        base: "#2BBB56",
        alt: "#53D77A",
      },
      purple: {
        base: "#C172D1",
        heavy: "#785BBA",
      },
      turquoise: {
        base: "#72D1C0",
      },
      gold: {
        base: "#BEA600",
      },
    },
    fontSize: {
      xs: ["12px", "22px"],
      sm: ["14px", "24px"],
      base: ["16px", "26px"],
      lg: ["18px", "28px"],
      xl: ["20px", "30px"],
      "2xl": ["28px", "38px"],
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
