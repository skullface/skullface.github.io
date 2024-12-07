/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    colors: {
      primary: 'var(--color-primary)',
      foreground: 'var(--color-foreground)',
      midground: 'var(--color-midground)',
      background: 'var(--color-background)',
    },
    fontFamily: {
      sans: ['ARS Maquette', '-apple-system', 'Avenir Next', 'Avenir',
      'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      serif: ['Source Serif 4', 'ui-serif', 'Georgia', 'Times New Roman', 'serif'],
      mono: ['Courier Prime', 'ui-monospace', 'Courier New', 'mono'],
    },
		extend: {
      maxWidth: {
        'page': 'var(--page-width)',
      },
    },
	},
	plugins: [],
}
