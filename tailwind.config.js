/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',    // 바다 파란색 (Sky Blue)
        secondary: '#06B6D4',  // 청록색 (Cyan)
        accent: '#F59E0B',     // 따뜻한 황금색 (Warm Amber)
      },
    },
  },
  plugins: [],
};
