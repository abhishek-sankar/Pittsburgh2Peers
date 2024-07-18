/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	  ],
  theme: {
    extend: {
      colors: {
        'cmu-red': '#C41230',
		'cmu-iron-gray': '#6D6E71',
		'cmu-cool-gray': '#E0E0E0'
      },
    },
  },
  plugins: [],
}
