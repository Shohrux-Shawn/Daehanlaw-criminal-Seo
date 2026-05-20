/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs':  '480px',
        'md2': '900px',
        'lg2': '1200px',
        '3xl': '1920px',
        '5xl': '2560px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        navy: {
          50:  '#f0f3fb',
          100: '#d9e1f5',
          200: '#b3c2eb',
          300: '#8da3e1',
          400: '#6784d7',
          500: '#3d5aa8',
          600: '#2d4280',
          700: '#1e2d5a',
          800: '#1a2952',
          900: '#0d1629',
        },
        gold: {
          300: '#f0d992',
          400: '#e5c56e',
          500: '#d4a843',
          600: '#c9a04c',
          700: '#a8842a',
          800: '#866720',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '"Noto Sans KR"', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.93)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },
      animation: {
        'fade-in-up':      'fadeInUp 0.65s ease-out both',
        'fade-in-up-slow': 'fadeInUp 0.85s ease-out both',
        'fade-in':         'fadeIn 0.5s ease-out both',
        'slide-in-left':   'slideInLeft 0.65s ease-out both',
        'slide-in-right':  'slideInRight 0.65s ease-out both',
        'scale-in':        'scaleIn 0.55s ease-out both',
        'float':           'float 4s ease-in-out infinite',
        'shimmer':         'shimmer 2.5s linear infinite',
        'pulse2':          'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
