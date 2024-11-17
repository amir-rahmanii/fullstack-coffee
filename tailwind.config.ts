import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }
		},
		extend: {
			fontFamily: {
				danaRegular: 'var(--font-dana-Regular)',
				danaMedium: 'var(--font-dana-Medium)',
				danaBold: 'var(--font-dana-Bold)'
			},
			colors: {
				background: '#ffffff',
				foreground: '#1D1D1B',
				goldnes: '#E6C498',
				darknes: '#505049',
				lightnes: '#F5F5F5',
				veronese: '#009879'
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '16px',
					sm: '12px'
				}
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
			},
			spacing: {
				'calc-vh': "calc(1vh * 100 - 300px)",
			}
		}
	},
	plugins: [
		function ({ addVariant }: { addVariant: Function }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		},
		require("tailwindcss-animate")
	],
} satisfies Config;
