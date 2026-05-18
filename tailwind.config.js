/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
        accent: 'var(--accent)',
        highlight: 'var(--highlight)',
        text: 'var(--text)',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)'],
        geistMono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
};
