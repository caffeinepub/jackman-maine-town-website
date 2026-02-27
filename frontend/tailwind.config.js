import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
            },
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                forest: {
                    50:  'oklch(0.96 0.02 155)',
                    100: 'oklch(0.90 0.04 155)',
                    200: 'oklch(0.80 0.07 155)',
                    300: 'oklch(0.68 0.09 155)',
                    400: 'oklch(0.55 0.10 155)',
                    500: 'oklch(0.42 0.10 155)',
                    600: 'oklch(0.32 0.09 155)',
                    700: 'oklch(0.25 0.07 155)',
                    800: 'oklch(0.20 0.05 155)',
                    900: 'oklch(0.14 0.03 155)',
                },
                slate: {
                    50:  'oklch(0.97 0.005 220)',
                    100: 'oklch(0.93 0.010 220)',
                    200: 'oklch(0.86 0.015 220)',
                    300: 'oklch(0.76 0.020 220)',
                    400: 'oklch(0.62 0.025 220)',
                    500: 'oklch(0.50 0.025 220)',
                    600: 'oklch(0.40 0.025 220)',
                    700: 'oklch(0.30 0.020 220)',
                    800: 'oklch(0.22 0.015 220)',
                    900: 'oklch(0.15 0.010 220)',
                },
                amber: {
                    50:  'oklch(0.97 0.03 85)',
                    100: 'oklch(0.93 0.06 80)',
                    200: 'oklch(0.87 0.09 78)',
                    300: 'oklch(0.80 0.11 75)',
                    400: 'oklch(0.72 0.12 72)',
                    500: 'oklch(0.65 0.13 70)',
                    600: 'oklch(0.55 0.12 68)',
                    700: 'oklch(0.45 0.10 65)',
                    800: 'oklch(0.35 0.08 62)',
                    900: 'oklch(0.25 0.06 60)',
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                card: '0 2px 12px 0 rgba(0,0,0,0.08)',
                hero: '0 8px 40px 0 rgba(0,0,0,0.18)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
