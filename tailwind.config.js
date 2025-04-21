module.exports = {
  content: [
    "./index.html",         // <- add this
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  
  theme: {
    extend: {
      // This will apply global styles to the body using Tailwind's base layer
      // But we need to do it inside a CSS file too (explained below)
    },
  },
  plugins: [],
};
