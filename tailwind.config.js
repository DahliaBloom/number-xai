/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#DC2C84",
          secondary: "#fa7268",
          accent: "#f3cc30",
          neutral: "#221551",
          "base-100": "#1a103c",
          info: "#53c0f3",
          success: "#71ead2",
          warning: "#f3cc30",
          error: "#e24056",
        },
      },
    ],
  },
};
