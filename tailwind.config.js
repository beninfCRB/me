/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        /* Artistic palette used by the 3D + aurora layers */
        ink: "#030b18",
        ocean: {
          glow: "#38bdf8",
          deep: "#1d4ed8",
        },
        azure: {
          glow: "#3b82f6",
        },
        sky: {
          glow: "#7dd3fc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -12px hsl(var(--primary) / 0.65)",
        "glow-lg": "0 0 90px -20px hsl(var(--primary) / 0.7)",
        "glow-sky": "0 0 50px -14px rgba(56, 189, 248, 0.65)",
        "inner-top": "inset 0 1px 0 0 rgb(255 255 255 / 0.08)",
        depth: "0 30px 60px -30px rgb(0 0 0 / 0.6)",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
        "art-gradient":
          "linear-gradient(120deg, #38bdf8 0%, #3b82f6 45%, #1d4ed8 100%)",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -22px, 0)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        marquee2: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        /* Seamless marquee: the track holds two copies, so a -50% shift
           lands exactly one copy over and the loop never gaps. */
        "marquee-track": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-track-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%", opacity: "0.75" },
          "50%": { backgroundPosition: "100% 50%", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "spin-reverse-slow": {
          to: { transform: "rotate(-360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        beam: {
          "0%": { transform: "translateY(120%)", opacity: "0" },
          "40%": { opacity: "0.55" },
          "100%": { transform: "translateY(-120%)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(18px,-26px,0) rotate(6deg)" },
          "66%": { transform: "translate3d(-22px,14px,0) rotate(-5deg)" },
        },
        "border-spin": {
          to: { "--border-angle": "360deg" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
        "marquee-track": "marquee-track 30s linear infinite",
        "marquee-track-reverse": "marquee-track-reverse 30s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        blob: "blob 7s infinite",
        aurora: "aurora 18s ease-in-out infinite",
        shimmer: "shimmer 3.2s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "spin-reverse-slow": "spin-reverse-slow 34s linear infinite",
        "pulse-ring": "pulse-ring 2.8s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        beam: "beam 6s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
