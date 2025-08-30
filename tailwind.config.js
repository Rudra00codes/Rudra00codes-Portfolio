module.exports = {
  // Use class strategy so toggling `document.documentElement.classList.toggle('dark')` works
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk Variable"', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'display-lg': ['3.2rem', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['2.2rem', { lineHeight: '1.05' }]
      },
      fontWeight: {
        heavy: 800
      }
    }
  },
  plugins: []
};
