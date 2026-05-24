/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9ecff",
          200: "#bcdcff",
          300: "#8cc6ff",
          400: "#56a6ff",
          500: "#2f7fff", // primary
          600: "#1f5fe6",
          700: "#1c4bbb",
          800: "#1c4096",
          900: "#1c387a"
        },
        ink: {
          50: "#f7f8fb",
          100: "#eef1f7",
          200: "#d9dfeb",
          300: "#b5c0d7",
          400: "#7f90b8",
          500: "#556892",
          600: "#3d4c6d",
          700: "#2d3750",
          800: "#1f2638",
          900: "#111628"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 22, 40, 0.10)",
        lift: "0 18px 45px rgba(17, 22, 40, 0.16)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both",
        "fade-in": "fade-in 600ms ease-out both"
      }
    }
  },
  plugins: []
};