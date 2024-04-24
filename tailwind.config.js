const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        fontFamily: {
            'sans': 'Nunito, sans-serif'
        }
    },
    darkMode: 'class',
    plugins: [
        nextui({
            themes: {
                light: {
                    layout: {
                        radius: {
                            small: '0.25rem',
                            medium: '0.5rem',
                            large: '0.75rem'
                        }
                    },
                    colors: {
                        primary: {
                            foreground: '#fff',
                            DEFAULT: '#d8232f'
                        },
                        secondary: {
                            foreground: '#fff',
                            DEFAULT: '#1a254d'
                        },
                        default: {
                            foreground: '#11181c',
                            DEFAULT: '#eee'
                        },
                        neutral: {
                            foreground: '#fff',
                            DEFAULT: '#1e1e2d'
                        },
                        success: {
                            foreground: '#ebfcea',
                            DEFAULT: '#008009'
                        },
                        warning: {
                            foreground: '#fff8dd',
                            DEFAULT: '#ffc700'
                        },
                        danger: {
                            foreground: '#fff5f8',
                            DEFAULT: '#f1416c'
                        }
                    }
                }
            }
        })
    ]
};
