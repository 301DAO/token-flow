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
                'custom-gray': '#B3D5B4'
            }
        },
    },
    plugins: [],
}
