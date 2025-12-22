import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                ink: '#0B0B0B',
                forest: '#0F3B2E',
                acid: '#5CFF5C',
                sun: '#FFE14A',
                bone: '#F3F1E8',
                steel: '#8A8F98',
                beige: '#D8C6A3',
                leather: '#6B4E2E'
            },
            fontFamily: {
                display: ['var(--font-display)', 'system-ui', 'sans-serif'],
                body: ['var(--font-body)', 'system-ui', 'sans-serif']
            },
            boxShadow: {
                sticker: '0 10px 30px rgba(0,0,0,0.35)'
            }
        }
    },
    plugins: []
};

export default config;
