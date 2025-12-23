/**
 * Oitavo Café - Tailwind CSS Configuration
 * Version: 1.0.0
 * Generated: 2025-12-23
 *
 * This config extends Tailwind with the Oitavo Café design system tokens.
 * Use with: @import "tailwindcss";
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}",
    "./pages/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,ts,tsx}",
    "./app/**/*.{html,js,jsx,ts,tsx}",
    "./*.html",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      /* ==================== COLORS ==================== */
      colors: {
        // Primary - Café Escuro
        primary: {
          50: "#FCF5F4",
          100: "#F5E3E1",
          200: "#E8C5C0",
          300: "#D49D94",
          400: "#B86D5F",
          500: "#9A4A3B",
          600: "#7A2E21",
          700: "#4E130D", // LOCKED - Brand Primary
          800: "#380B07",
          900: "#240504",
          DEFAULT: "#4E130D",
        },
        // Secondary - Café Intenso
        secondary: {
          50: "#FDF5F3",
          100: "#F7E2DD",
          200: "#ECC2B8",
          300: "#D99585",
          400: "#C0614D",
          500: "#9E3A25",
          600: "#7A1307", // LOCKED - Brand Secondary
          700: "#5E0E05",
          800: "#430904",
          900: "#2B0502",
          DEFAULT: "#7A1307",
        },
        // Accent - Terracotta
        accent: {
          50: "#FBF6F4",
          100: "#F4E6E0",
          200: "#E5C9BD",
          300: "#CFA28F",
          400: "#B87A62",
          500: "#A1523C", // LOCKED - Brand Accent
          600: "#844231",
          700: "#663325",
          800: "#4A251B",
          900: "#301812",
          DEFAULT: "#A1523C",
        },
        // Neutral - Caramelo
        neutral: {
          50: "#FFFCF9",
          100: "#F8E8D8", // LOCKED - Brand Neutral
          200: "#EDD5C0",
          300: "#D9BBA0",
          400: "#C4A080",
          500: "#AD8665",
          600: "#8E6D50",
          700: "#6E543D",
          800: "#4F3C2B",
          900: "#32261C",
          DEFAULT: "#F8E8D8",
        },
        // Gray - Cinza
        gray: {
          50: "#FAFAFA",
          100: "#ECECEC", // LOCKED
          200: "#D9D9D9",
          300: "#BFBFBF",
          400: "#A3A3A3",
          500: "#878787",
          600: "#6B6B6B",
          700: "#525252",
          800: "#3B3B3B",
          900: "#262626",
        },
        // Semantic - Success
        success: {
          50: "#F0FDF4",
          500: "#22C55E",
          700: "#15803D",
          DEFAULT: "#22C55E",
        },
        // Semantic - Warning
        warning: {
          50: "#FFFBEB",
          500: "#F59E0B",
          700: "#B45309",
          DEFAULT: "#F59E0B",
        },
        // Semantic - Error
        error: {
          50: "#FEF2F2",
          500: "#EF4444",
          700: "#B91C1C",
          DEFAULT: "#EF4444",
        },
        // Semantic - Info
        info: {
          50: "#EFF6FF",
          500: "#3B82F6",
          700: "#1D4ED8",
          DEFAULT: "#3B82F6",
        },
      },

      /* ==================== TYPOGRAPHY ==================== */
      fontFamily: {
        display: ['"Hartwell"', "system-ui", "-apple-system", "sans-serif"],
        body: ['"DIN Pro"', "system-ui", "sans-serif"],
        condensed: ['"DIN Pro Condensed"', '"DIN Pro"', "system-ui", "sans-serif"],
        mono: ["ui-monospace", '"JetBrains Mono"', "monospace"],
      },

      // Font sizes based on 1.25 Major Third scale (16px base)
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }], // 12px
        sm: ["0.875rem", { lineHeight: "1.5" }], // 14px
        base: ["1rem", { lineHeight: "1.6" }], // 16px
        lg: ["1.25rem", { lineHeight: "1.5" }], // 20px
        xl: ["1.563rem", { lineHeight: "1.4" }], // 25px
        "2xl": ["1.953rem", { lineHeight: "1.3" }], // 31px
        "3xl": ["2.441rem", { lineHeight: "1.2" }], // 39px
        "4xl": ["3.052rem", { lineHeight: "1.1" }], // 49px
        "5xl": ["3.815rem", { lineHeight: "1.1" }], // 61px
      },

      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900",
      },

      lineHeight: {
        none: "1",
        tight: "1.1",
        snug: "1.2",
        normal: "1.5",
        relaxed: "1.6",
        loose: "1.8",
      },

      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
      },

      /* ==================== SPACING ==================== */
      // Based on 8px unit
      spacing: {
        1: "0.25rem", // 4px
        2: "0.5rem", // 8px
        3: "0.75rem", // 12px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        8: "2rem", // 32px
        10: "2.5rem", // 40px
        12: "3rem", // 48px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
      },

      /* ==================== BORDERS ==================== */
      borderRadius: {
        sm: "0.25rem", // 4px
        DEFAULT: "0.5rem", // 8px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        full: "9999px",
      },

      borderWidth: {
        thin: "1px",
        DEFAULT: "1px",
        thick: "2px",
      },

      /* ==================== SHADOWS ==================== */
      // Using brand primary color for warmth
      boxShadow: {
        sm: "0 1px 2px 0 rgba(78, 19, 13, 0.05)",
        DEFAULT: "0 4px 6px -1px rgba(78, 19, 13, 0.1), 0 2px 4px -2px rgba(78, 19, 13, 0.1)",
        md: "0 4px 6px -1px rgba(78, 19, 13, 0.1), 0 2px 4px -2px rgba(78, 19, 13, 0.1)",
        lg: "0 10px 15px -3px rgba(78, 19, 13, 0.1), 0 4px 6px -4px rgba(78, 19, 13, 0.1)",
        xl: "0 20px 25px -5px rgba(78, 19, 13, 0.1), 0 8px 10px -6px rgba(78, 19, 13, 0.1)",
        focus: "0 0 0 3px rgba(161, 82, 60, 0.2)",
        none: "none",
      },

      /* ==================== MOTION ==================== */
      transitionDuration: {
        fast: "100ms",
        normal: "200ms",
        DEFAULT: "200ms",
        slow: "300ms",
        slower: "500ms",
      },

      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      /* ==================== LAYOUT ==================== */
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      maxWidth: {
        container: "1280px",
      },

      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
      },

      /* ==================== GRADIENTS ==================== */
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #4E130D 0%, #7A1307 50%, #A1523C 100%)",
        "gradient-brand-vertical": "linear-gradient(180deg, #4E130D 0%, #7A1307 50%, #A1523C 100%)",
        "gradient-subtle": "linear-gradient(180deg, #FFFCF9 0%, #F8E8D8 100%)",
        "gradient-dark": "linear-gradient(135deg, #4E130D 0%, #240504 100%)",
        "gradient-warm": "linear-gradient(135deg, #F8E8D8 0%, #E5C9BD 50%, #CFA28F 100%)",
      },
    },
  },

  /* ==================== PLUGINS ==================== */
  plugins: [
    // Custom plugin for brand utilities
    function ({ addUtilities, addComponents, theme }) {
      // Typography utilities
      addUtilities({
        ".text-display": {
          fontFamily: theme("fontFamily.display"),
          fontWeight: theme("fontWeight.bold"),
          letterSpacing: theme("letterSpacing.tight"),
          lineHeight: theme("lineHeight.tight"),
        },
        ".text-body": {
          fontFamily: theme("fontFamily.body"),
          fontWeight: theme("fontWeight.normal"),
          lineHeight: theme("lineHeight.normal"),
        },
        ".text-condensed": {
          fontFamily: theme("fontFamily.condensed"),
          letterSpacing: theme("letterSpacing.tighter"),
        },
        ".gradient-text-brand": {
          background: theme("backgroundImage.gradient-brand"),
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
      });

      // Component base styles
      addComponents({
        ".btn": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${theme("spacing.3")} ${theme("spacing.6")}`,
          borderRadius: theme("borderRadius.md"),
          fontWeight: theme("fontWeight.semibold"),
          fontSize: theme("fontSize.base")[0],
          lineHeight: theme("fontSize.base")[1].lineHeight,
          transition: `all ${theme("transitionDuration.normal")} ${theme("transitionTimingFunction.out")}`,
          cursor: "pointer",
          "&:focus": {
            outline: "none",
            boxShadow: theme("boxShadow.focus"),
          },
        },
        ".btn-primary": {
          backgroundColor: theme("colors.primary.600"),
          color: theme("colors.neutral.50"),
          "&:hover": {
            backgroundColor: theme("colors.primary.700"),
          },
          "&:active": {
            backgroundColor: theme("colors.primary.800"),
          },
        },
        ".btn-secondary": {
          backgroundColor: "transparent",
          color: theme("colors.primary.600"),
          border: `1px solid ${theme("colors.primary.400")}`,
          "&:hover": {
            color: theme("colors.primary.700"),
            borderColor: theme("colors.primary.600"),
          },
        },
        ".btn-accent": {
          backgroundColor: theme("colors.accent.500"),
          color: theme("colors.neutral.50"),
          "&:hover": {
            backgroundColor: theme("colors.accent.600"),
          },
        },
        ".card": {
          backgroundColor: theme("colors.neutral.50"),
          borderRadius: theme("borderRadius.lg"),
          padding: theme("spacing.6"),
          boxShadow: theme("boxShadow.md"),
          border: `1px solid ${theme("colors.gray.200")}`,
        },
        ".input": {
          width: "100%",
          padding: `${theme("spacing.3")} ${theme("spacing.4")}`,
          borderRadius: theme("borderRadius.md"),
          border: `1px solid ${theme("colors.gray.200")}`,
          backgroundColor: theme("colors.neutral.50"),
          fontSize: theme("fontSize.base")[0],
          lineHeight: theme("fontSize.base")[1].lineHeight,
          transition: `border-color ${theme("transitionDuration.fast")} ${theme("transitionTimingFunction.out")}, box-shadow ${theme("transitionDuration.fast")} ${theme("transitionTimingFunction.out")}`,
          "&:hover": {
            borderColor: theme("colors.gray.300"),
          },
          "&:focus": {
            outline: "none",
            borderColor: theme("colors.accent.500"),
            boxShadow: theme("boxShadow.focus"),
          },
          "&::placeholder": {
            color: theme("colors.gray.500"),
          },
        },
      });
    },
  ],
};
