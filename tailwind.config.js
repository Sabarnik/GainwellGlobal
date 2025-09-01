/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gainwell: {
          orange: "#F5872E",
          green: "#40A748",
          blue: "#3A55A5",
          lightblue: "#3ABEEE",
          darkblue: "#08193C",
        },
        secondary: {
          gold: "#FAAD54",
          red: "#EF4D2F",
          maroon: "#BA2025",
          sky: "#7C97CD",
          teal: "#7EC57F",
        },
      },
      fontFamily: {
        din: ["'DIN Pro'", "Roboto", "Arial", "sans-serif"],
        roboto: ["Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}
