import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Simple approach - just load core PrismJS without extra components
import Prism from 'prismjs';

// mdsvex config
const mdsvexConfig = {
	extensions: ['.svelte.md', '.md', '.svx'],
	layout: {
		_: './src/mdsvexlayout.svelte' // default mdsvex layout
	},
	highlight: {
		highlighter: (code, lang) => {
			// Use basic highlighting for supported languages, plain text otherwise
			if (lang && Prism.languages[lang]) {
				return Prism.highlight(code, Prism.languages[lang], lang);
			}
			// Return plain code block for unsupported languages
			return `<pre class="language-${lang || 'text'}"><code>${code}</code></pre>`;
		}
	},
	remarkPlugins: [
		[
			remarkGithub,
			{
				// Use your own repository
				repository: 'https://github.com/paulasjes/asjes.dev'
			}
		],
		remarkAbbr
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.html', '.svx', ...mdsvexConfig.extensions],
	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter({
			runtime: 'edge'
		})
	}
};

export default config;
