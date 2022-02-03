module.exports = {
  content: ["./views/**/*.hbs", "./views/layouts/mainLayout.hbs"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
