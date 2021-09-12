module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        rocket: "rocket 4s ease-in-out 1",
        rocketMessage: "rocketMessage 3.5s ease-in 1",
      },
      keyframes: {
        rocket: {
          "0%": { transform: "translateY(0vh) rotate(-6deg)" },
          "5%": { transform: "rotate(5deg)" },
          "10%": { transform: "rotate(-4deg)" },
          "15%": { transform: "rotate(3deg)" },
          "20%": { transform: "rotate(-2deg)" },
          "25%": { transform: "rotate(1deg)" },
          "30%": { transform: "rotate(0deg)" },
          "100%": { transform: "translateY(-200vh)" },
        },
        rocketMessage: {
          "0%": { opacity: "0%" },
          "90%": {
            opacity: "0%",
          },
          "100%": { opacity: "100%" },
        },
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
    },
  },
  plugins: [],
};
