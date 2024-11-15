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
			tablet: '640px',
			laptop: '1024px',
			desktop: '1280px'
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
