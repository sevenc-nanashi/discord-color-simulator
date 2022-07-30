/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "discord-theme": "#5865f2",
        "discord-light-bg": "#fff",
        "discord-light-text": "#2D3338",
        "discord-light-accent": "#dbdee1",
        "discord-dark-bg": "#36393f",
        "discord-dark-text": "#fff",
        "discord-dark-accent": "#454950",
        "discord-black-bg": "#000",
        "discord-black-text": "#fff",
        "discord-black-accent": "#36393f",
        "discord-light-link": "#0068E0",
        "discord-dark-link": "#00AFF4"
      },
      fontFamily: {
        sans: 'Whitney,"Hiragino Sans","ヒラギノ角ゴ ProN W3","Hiragino Kaku Gothic ProN",メイリオ,Meiryo,Osaka,"MS PGothic","Helvetica Neue",Helvetica,Arial,sans-serif',
      },
    },
  },
  plugins: [],
};
