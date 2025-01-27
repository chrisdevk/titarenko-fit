import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontSize: {
  			base: '1.063rem'
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			'off-white': '#F2FBFF',
  			'indigo-custom': '#4945FF',
  			'off-black': '#32324D',
  			'grey-custom': '#666687',
  			'baby-slate': '#F6F6FF',
  			'turquoise-dark': '#179CAF',
  			'turquoise-light': '#C1EAF1',
  			'purple-custom': '#5E60CE'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-roboto)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  variants: {
    extend: {
      before: ["hover"],
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
