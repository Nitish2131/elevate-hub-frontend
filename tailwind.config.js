/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        "screen-3xl": "1920px",
      },
      colors: {
        'vibrant-green': '#2CC84D',
        'orange-color': '#FFDD40',
        'gray-color': '#fef4d1',
        'button-color':'#fec200',
      },
    },
  },
  plugins: [],
};
