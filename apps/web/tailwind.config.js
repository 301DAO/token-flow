/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-bg': '#DBFDD5',
                'primary-alt': '#CCE4F1',
                'custom-gray': '#B3D5B4'
            }
        },
    },
    plugins: [],
}
