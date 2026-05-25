/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1D34',
        electric: '#0077C8',
        lime: '#66B32E',
        sky: '#A7D6F5',
        neutral: '#6D737A',
        primary: '#0077C8',
        secondary: '#66B32E',
        fiberion: {
          navy: '#0B1D34',
          blue: '#0077C8',
          green: '#66B32E',
          lightBlue: '#A7D6F5',
          gray: '#6D737A'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif']
      }
    }
  },
  plugins: []
};
