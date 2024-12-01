/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    colors: {
      primary: 'rgb(var(--color-primary))',
      foreground: 'rgb(var(--color-foreground))',
      midground: 'var(--color-midground)',
      background: 'rgb(var(--color-background))',
    },
		extend: {
      maxWidth: {
        'page': 'var(--page-width)',
      },
    },
	},
	plugins: [],
}
