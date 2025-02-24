module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#1a2f77",
        bg: "#111827",
        text: "#fff",
        grad_from: "#111827",
        grad_via: "#1f2937",
        grad_to: "#4b5563",
        border: "#4b5563",
        text_live: "#0db25b",
        text_hd: "#6063af",
        menu_icon: "#bbbddd",
        bg_nav: "#191a32",
        text_yellow: "#ffcc5b",
        bg_join: "#3957ea",
        bg_join_shadow: "0px 3px #ffcc5b,0px 5px #ffcc5b,0px 0px #ffcc5b",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "980px" },
      // => @media (max-width: 1023px) { ... }

      lgm: { min: "600px", max: "870px" },

      md: { max: "600px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "350px" },
      // => @media (max-width: 639px) { ... }
      big: { min: "1536px", max: "2000px" },
    },
    boxShadow: {
      custom: "inset 0px 0px 10px 10px",
    },
    backgroundImage: {
      footballGround: "url('/src/Assets/background_football.png')",
    },
  },
  plugins: [],
};
