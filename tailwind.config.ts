import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': "fadeIn 0.3s ease-in-out",
        'fade-out': "fadeOut 0.3s ease-in-out",
      },
      keyframes: {
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1'},
				},
        fadeOut: {
					from: { opacity: '1' },
					to: { opacity: '0'},
				},
			},
    },
  },
  plugins: [],
} satisfies Config;
