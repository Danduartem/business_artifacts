/**
 * Oitavo Café Tailwind Configuration
 * Generated: 2025-12-12
 * Version: 1.0.0
 *
 * Design system tokens for Tailwind CSS
 * Extends default Tailwind with Oitavo Café brand tokens
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ═══════════════════════════════════════════════════════════════════════
       * COLORS
       * ═══════════════════════════════════════════════════════════════════════ */
      colors: {
        // Primary: Coffee Maroon
        primary: {
          50: '#FCF5F4',
          100: '#F8ECEA',
          200: '#F0D3D0',
          300: '#E4B2AE',
          400: '#D18880',
          500: '#B75B53',
          600: '#993A33',
          700: '#75201C',
          800: '#5D1916',
          900: '#451311',
          DEFAULT: '#75201C',
        },
        // Secondary: Terracotta
        secondary: {
          50: '#FBF4F1',
          100: '#F5E8E2',
          200: '#EDD1C6',
          300: '#E0AE99',
          400: '#CD886B',
          500: '#B45F3D',
          600: '#973E16',
          700: '#7A3212',
          800: '#61280E',
          900: '#4A1E0B',
          DEFAULT: '#973E16',
        },
        // Accent: Golden Amber
        accent: {
          50: '#FBF5E6',
          100: '#F5E8C5',
          200: '#EDD38E',
          300: '#E0B54A',
          400: '#C78F00',
          500: '#AA6B00',
          600: '#8D4C00',
          700: '#6F3D00',
          800: '#5A3200',
          900: '#462700',
          DEFAULT: '#8D4C00',
        },
        // Neutral: Warm Gray
        neutral: {
          50: '#F8F5F2',
          100: '#EDE7E1',
          200: '#D6CEC7',
          300: '#BEB3AE',
          400: '#9B8B86',
          500: '#8A7B76',
          600: '#685A56',
          700: '#453C39',
          800: '#2B2523',
          900: '#1A1817',
        },
        // Support: Cream (warm backgrounds)
        support: {
          50: '#FCFAF9',
          100: '#F8F4F2',
          200: '#EDE7E1',
        },
        // Semantic: Feedback colors
        success: '#2D5016',
        warning: '#8D4C00',
        error: '#B91C1C',
        info: '#75201C',
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * TYPOGRAPHY
       * ═══════════════════════════════════════════════════════════════════════ */
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.64rem', { lineHeight: '1.6' }],    // 10px
        'sm': ['0.8rem', { lineHeight: '1.6' }],     // 13px
        'base': ['1rem', { lineHeight: '1.5' }],     // 16px
        'md': ['1.25rem', { lineHeight: '1.5' }],    // 20px
        'lg': ['1.563rem', { lineHeight: '1.4' }],   // 25px
        'xl': ['1.953rem', { lineHeight: '1.3' }],   // 31px
        '2xl': ['2.441rem', { lineHeight: '1.3' }],  // 39px
        '3xl': ['3.052rem', { lineHeight: '1.2' }],  // 49px
        '4xl': ['3.815rem', { lineHeight: '1.2' }],  // 61px
        '5xl': ['4.768rem', { lineHeight: '1.1' }],  // 76px
        '6xl': ['5.96rem', { lineHeight: '1.1' }],   // 95px
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0',
        wide: '0.02em',
        wider: '0.05em',
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.2',
        normal: '1.5',
        relaxed: '1.6',
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * SPACING (8pt Grid)
       * ═══════════════════════════════════════════════════════════════════════ */
      spacing: {
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.5rem',    // 24px
        '6': '2rem',      // 32px
        '7': '2.5rem',    // 40px
        '8': '3rem',      // 48px
        '9': '4rem',      // 64px
        '10': '5rem',     // 80px
        '11': '6rem',     // 96px
        '12': '8rem',     // 128px
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * BORDER RADIUS
       * ═══════════════════════════════════════════════════════════════════════ */
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',   // 4px
        'DEFAULT': '0.5rem', // 8px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
        '2xl': '1.5rem',   // 24px
        'full': '9999px',
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * SHADOWS
       * ═══════════════════════════════════════════════════════════════════════ */
      boxShadow: {
        'none': 'none',
        'xs': '0 1px 2px 0 rgba(43, 37, 35, 0.05)',
        'sm': '0 2px 4px 0 rgba(43, 37, 35, 0.08), 0 1px 2px 0 rgba(43, 37, 35, 0.04)',
        'DEFAULT': '0 4px 8px 0 rgba(43, 37, 35, 0.10), 0 2px 4px 0 rgba(43, 37, 35, 0.06)',
        'md': '0 4px 8px 0 rgba(43, 37, 35, 0.10), 0 2px 4px 0 rgba(43, 37, 35, 0.06)',
        'lg': '0 8px 16px 0 rgba(43, 37, 35, 0.12), 0 4px 8px 0 rgba(43, 37, 35, 0.08)',
        'xl': '0 12px 24px 0 rgba(43, 37, 35, 0.14), 0 6px 12px 0 rgba(43, 37, 35, 0.10)',
        '2xl': '0 16px 32px 0 rgba(43, 37, 35, 0.16), 0 8px 16px 0 rgba(43, 37, 35, 0.12)',
        'inner': 'inset 0 2px 4px 0 rgba(43, 37, 35, 0.06)',
        'focus': '0 0 0 3px rgba(117, 32, 28, 0.20)',
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * Z-INDEX
       * ═══════════════════════════════════════════════════════════════════════ */
      zIndex: {
        'base': '0',
        'dropdown': '100',
        'sticky': '200',
        'fixed': '300',
        'modal-backdrop': '400',
        'modal': '500',
        'popover': '600',
        'tooltip': '700',
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * TRANSITIONS
       * ═══════════════════════════════════════════════════════════════════════ */
      transitionDuration: {
        'instant': '0ms',
        'micro': '100ms',
        'fast': '200ms',
        'DEFAULT': '300ms',
        'base': '300ms',
        'moderate': '400ms',
        'deliberate': '500ms',
        'slow': '700ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'accelerate': 'cubic-bezier(0.4, 0.0, 1, 1)',
        'emphasized': 'cubic-bezier(0.2, 0.0, 0, 1)',
        'sharp': 'cubic-bezier(0.4, 0.0, 0.6, 1)',
        'gentle': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * CONTAINERS
       * ═══════════════════════════════════════════════════════════════════════ */
      maxWidth: {
        'container-mobile': '343px',
        'container-tablet': '704px',
        'container-desktop': '1312px',
      },

      /* ═══════════════════════════════════════════════════════════════════════
       * SCREENS (Mobile-First Breakpoints)
       * ═══════════════════════════════════════════════════════════════════════ */
      screens: {
        'sm': '375px',   // Mobile
        'md': '768px',   // Tablet
        'lg': '1024px',  // Small desktop
        'xl': '1440px',  // Desktop
        '2xl': '1920px', // Large desktop
      },
    },
  },

  /* ═══════════════════════════════════════════════════════════════════════════
   * PLUGINS
   * ═══════════════════════════════════════════════════════════════════════════ */
  plugins: [
    // Add custom utilities for brand-specific needs
    function({ addUtilities }) {
      addUtilities({
        // Focus visible utility
        '.focus-ring': {
          '&:focus-visible': {
            outline: '3px solid rgba(117, 32, 28, 0.40)',
            'outline-offset': '2px',
          },
        },
        // Minimum touch target
        '.touch-target': {
          'min-width': '44px',
          'min-height': '44px',
        },
      });
    },
  ],
};
