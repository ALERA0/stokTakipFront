import withMT from "@material-tailwind/react/src/utils/withMT";

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-mont)"],
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96", // 240,86,199
        primaryDark: "#58E6D9",
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)", // 80,230,217
      },
    },
  },
  plugins: [],
});
