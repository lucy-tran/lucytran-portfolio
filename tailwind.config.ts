import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./app/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "profilepic-1":
          "url('https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/5191d462-d03d-4bc8-bf93-71580430f355')",
        "profilepic-1-squared":
          "url('https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fd7504b8-26da-4c0d-87ba-7ec634da5fee')",
        "profilepic-2":
          "url('https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/a28423c4-14da-4ab6-bf79-ea774ed599d4')",
        "profilepic-2-squared":
          "url('https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/32f2e283-0610-4198-92d4-ee3b1fba8c10')",

        "hero-1":
          "url('https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/be421578-c436-4104-a61e-c2b7fbfaae2e')",
        "hero-2":
          "url('https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/fdc11aed-e730-4984-96a5-a39aa624857e')",
        "hero-3":
          "url('https://github.com/lucy-tran/lucytran-portfolio/assets/54861558/5376ac75-6eb8-4ddf-a3a5-3ee9a96fa60')",
        "search-bar":
          "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E')",
      },
    },
    fontFamily: {
      serif: ["Forum", "Playfair Display"],
      sans: ["Lato", "Inter", "Roboto"],
      mono: ["Roboto Mono", "Source Code Pro", "IBM Plex Mono"],
    },
  },
  plugins: [],
  darkMode: "class",
});
