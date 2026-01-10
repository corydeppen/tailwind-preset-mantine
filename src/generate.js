// for reference:
// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/core/MantineProvider/MantineCssVariables/default-css-variables-resolver.ts
// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/core/MantineProvider/MantineCssVariables/get-css-color-variables.ts
// https://tailwindcss.com/docs/theme#default-theme-variable-reference

import { DEFAULT_THEME, mergeMantineTheme } from "@mantine/core";

export function generateDefaultImports() {
	return `
@layer theme, base, mantine, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);

@import "@mantine/core/styles.layer.css";
`;
}

/**
 * @param {import("@mantine/core").MantineTheme} theme
 * @param defaultsToExclude
 */
export function generateTheme(theme, defaultsToExclude = []) {
	const mergedTheme = mergeMantineTheme(DEFAULT_THEME, theme);

	return `
	@custom-variant dark (&:where([data-mantine-color-scheme="dark"], [data-mantine-color-scheme="dark"] *));
	
	@theme {
		--z-index-app: var(--mantine-z-index-app);
		--z-index-modal: var(--mantine-z-index-modal);
		--z-index-popover: var(--mantine-z-index-popover);
		--z-index-overlay: var(--mantine-z-index-overlay);
		--z-index-max: var(--mantine-z-index-max);
	
		--font-sans: var(--mantine-font-family);
		--font-mono: var(--mantine-font-family-monospace);
		--font-headings: var(--mantine-font-family-headings);
	
		${defaultsToExclude.includes("color") ? "--color-*: initial;" : ""}
		${Object.keys(mergedTheme.colors)
			.map((color) => {
				return `
		--color-${color}-50: var(--mantine-color-${color}-0);
		--color-${color}-100: var(--mantine-color-${color}-1);
		--color-${color}-200: var(--mantine-color-${color}-2);
		--color-${color}-300: var(--mantine-color-${color}-3);
		--color-${color}-400: var(--mantine-color-${color}-4);
		--color-${color}-500: var(--mantine-color-${color}-5);
		--color-${color}-600: var(--mantine-color-${color}-6);
		--color-${color}-700: var(--mantine-color-${color}-7);
		--color-${color}-800: var(--mantine-color-${color}-8);
		--color-${color}-900: var(--mantine-color-${color}-9);
		--color-${color}-text: var(--mantine-color-${color}-text);
		--color-${color}-filled: var(--mantine-color-${color}-filled);
		--color-${color}-filled-hover: var(--mantine-color-${color}-filled-hover);
		--color-${color}-light: var(--mantine-color-${color}-light);
		--color-${color}-light-hover: var(--mantine-color-${color}-light-hover);
		--color-${color}-light-color: var(--mantine-color-${color}-light-color);
		--color-${color}-outline: var(--mantine-color-${color}-outline);
		--color-${color}-outline-hover: var(--mantine-color-${color}-outline-hover);
			`.trimEnd();
			})
			.join("\n")}
		--color-white: var(--mantine-color-white);
		--color-black: var(--mantine-color-black);
		--color-text: var(--mantine-color-text);
		--color-body: var(--mantine-color-body);
		--color-error: var(--mantine-color-error);
		--color-placeholder: var(--mantine-color-placeholder);
		--color-anchor: var(--mantine-color-anchor);
		--color-default: var(--mantine-color-default);
		--color-default-hover: var(--mantine-color-default-hover);
		--color-default-color: var(--mantine-color-default-color);
		--color-default-border: var(--mantine-color-default-border);
		--color-dimmed: var(--mantine-color-dimmed);
		--color-disabled: var(--mantine-color-disabled);
		--color-disabled-color: var(--mantine-color-disabled-color);
		--color-disabled-border: var(--mantine-color-disabled-border);
		--color-primary-50: var(--mantine-primary-color-0);
		--color-primary-100: var(--mantine-primary-color-1);
		--color-primary-200: var(--mantine-primary-color-2);
		--color-primary-300: var(--mantine-primary-color-3);
		--color-primary-400: var(--mantine-primary-color-4);
		--color-primary-500: var(--mantine-primary-color-5);
		--color-primary-600: var(--mantine-primary-color-6);
		--color-primary-700: var(--mantine-primary-color-7);
		--color-primary-800: var(--mantine-primary-color-8);
		--color-primary-900: var(--mantine-primary-color-9);
		--color-primary-text: var(--mantine-primary-color-filled);
		--color-primary-filled: var(--mantine-primary-color-filled);
		--color-primary-filled-hover: var(--mantine-primary-color-filled-hover);
		--color-primary-light: var(--mantine-primary-color-light);
		--color-primary-light-hover: var(--mantine-primary-color-light-hover);
		--color-primary-light-color: var(--mantine-primary-color-light-color);
		--color-primary-outline: var(--mantine-primary-color-outline);
		--color-primary-outline-hover: var(--mantine-primary-color-outline-hover);
	
		${Object.keys(mergedTheme.spacing)
			.map((size) => {
				return `--spacing-${size}: var(--mantine-spacing-${size});`;
			})
			.join("\n  ")}
	
		${defaultsToExclude.includes("breakpoint") ? "--breakpoint-*: initial;" : ""}
		${Object.keys(mergedTheme.breakpoints)
			.map((size) => {
				return `--breakpoint-${size}: var(--mantine-breakpoint-${size});`;
			})
			.join("\n  ")}
	
		${defaultsToExclude.includes("text") ? "--text-*: initial;" : ""}
		${Object.keys(mergedTheme.fontSizes)
			.map((size) => {
				return `--text-${size}: var(--mantine-font-size-${size});`;
			})
			.join("\n  ")}
	
		${Object.keys(mergedTheme.lineHeights)
			.map((size) => {
				return `--text-${size}--line-height: var(--mantine-line-height-${size});`;
			})
			.join("\n  ")}
	
		${Object.keys(mergedTheme.headings.sizes)
			.map((heading) => {
				return `
		--text-${heading}: var(--mantine-${heading}-font-size);
		--text-${heading}--line-height: var(--mantine-${heading}-line-height);
		--font-weight-${heading}: var(--mantine-${heading}-font-weight);
			`.trimEnd();
			})
			.join("")}
		
		${defaultsToExclude.includes("shadow") ? "--shadow-*: initial;" : ""}
		${Object.keys(mergedTheme.shadows)
			.map((size) => {
				return `--shadow-${size}: var(--mantine-shadow-${size});`;
			})
			.join("\n  ")}
			
		${defaultsToExclude.includes("radius") ? "--radius-*: initial;" : ""}
		${Object.keys(mergedTheme.radius)
			.map((size) => {
				return `--radius-${size}: var(--mantine-radius-${size});`;
			})
			.join("\n  ")}
		
		/* ensure Tailwind width properties use container vars since Mantine uses custom spacing vars */
		/* read back tailwind's default containers vars to fix #24 */
		--width-3xs: var(--container-3xs);
		--width-2xs: var(--container-2xs);
		--width-xs: var(--container-xs);
		--width-sm: var(--container-sm);
		--width-md: var(--container-md);
		--width-lg: var(--container-lg);
		--width-xl: var(--container-xl);
		--width-2xl: var(--container-2xl);
		--width-3xl: var(--container-3xl);
		--width-4xl: var(--container-4xl);
		--width-5xl: var(--container-5xl);
		--width-6xl: var(--container-6xl);
		--width-7xl: var(--container-7xl);
	
		--min-width-3xs: var(--container-3xs);
		--min-width-2xs: var(--container-2xs);
		--min-width-xs: var(--container-xs);
		--min-width-sm: var(--container-sm);
		--min-width-md: var(--container-md);
		--min-width-lg: var(--container-lg);
		--min-width-xl: var(--container-xl);
		--min-width-2xl: var(--container-2xl);
		--min-width-3xl: var(--container-3xl);
		--min-width-4xl: var(--container-4xl);
		--min-width-5xl: var(--container-5xl);
		--min-width-6xl: var(--container-6xl);
		--min-width-7xl: var(--container-7xl);
	
		--max-width-3xs: var(--container-3xs);
		--max-width-2xs: var(--container-2xs);
		--max-width-xs: var(--container-xs);
		--max-width-sm: var(--container-sm);
		--max-width-md: var(--container-md);
		--max-width-lg: var(--container-lg);
		--max-width-xl: var(--container-xl);
		--max-width-2xl: var(--container-2xl);
		--max-width-3xl: var(--container-3xl);
		--max-width-4xl: var(--container-4xl);
		--max-width-5xl: var(--container-5xl);
		--max-width-6xl: var(--container-6xl);
		--max-width-7xl: var(--container-7xl);
	}
		`;
}
