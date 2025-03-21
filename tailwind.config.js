/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        weekly: 'url(/images/bg-weekly.png)',
      },
      keyframes: {
        'bounce-timedeal': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        'bounce-timedeal': 'bounce-timedeal 0.7s ease-in-out infinite',
      },
      boxShadow: {
        custom: '0 0.2rem 0.4rem 0 rgba(22, 23, 29, 0.04), 0 0 0.1rem 0 rgba(22, 23, 29, 0.2)',
      },
    },
  },
  plugins: [],
};
