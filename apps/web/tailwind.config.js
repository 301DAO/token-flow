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
                'custom-gray': '#B3D5B4',
                'border-gray': '#F1F0F1',
                'primary': '#103636',
                // 'primary-bg': '#000000',
                // 'primary-alt': '#CCE4F1',
                // 'custom-gray': '#B3D5B4',
                // 'border-gray': '#F1F0F1',
                // 'primary': '#103636',
                'primary-text-color': '#000000',
                'secondary-text-color': '#6B7280',
            }
        },
    },
    plugins: [],
}
