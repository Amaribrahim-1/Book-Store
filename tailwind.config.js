import flowbite from "flowbite-react/tailwind";
import flowbiteReact from "flowbite-react/plugin/tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    flowbite.content(),
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), flowbiteReact],
};