<script>
	import { MY_TWITTER_HANDLE, SITE_URL } from '$lib/siteConfig';
	import Comments from '../../components/Comments.svelte';

	import 'prism-themes/themes/prism-shades-of-purple.min.css';
	import Reactions from '../../components/Reactions.svelte';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('$lib/types').ContentItem} */
	$: json = data.json; // warning: if you try to destructure content here, make sure to make it reactive, or your page content will not update when your user navigates

	$: canonical = SITE_URL + $page.url.pathname;
</script>

<svelte:head>
	<title>{json.title}</title>
	<meta name="description" content="blog" />

	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={json.title} />
	<meta name="Description" content={json.description} />
	<meta property="og:description" content={json.description} />
	<meta name="twitter:card" content={json.image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={json.title} />
	<meta name="twitter:description" content={json.description} />
	{#if json.image}
		<meta property="og:image" content={json.image} />
		<meta name="twitter:image" content={json.image} />
	{/if}
</svelte:head>

<article class="prose dark:prose-invert mx-auto mt-16 mb-32 w-2/3 max-w-5xl flex flex-col items-start justify-center">
	<h1 class="mb-8 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl ">
		{json.title}
	</h1>
	<div
		class="bg mt-2 flex w-full justify-between border-red sm:flex-col sm:items-start md:flex-row md:items-center"
	>
		<p class="min-w-32 flex items-center text-sm text-gray-600 dark:text-gray-400 md:mt-0">
			<a href={json.ghMetadata.issueUrl} rel="noreferrer" class="no-underline" target="_blank">
				<span class="mr-4 font-mono text-xs text-gray-700 text-opacity-70 dark:text-gray-300"
					>{json.ghMetadata.reactions.total_count} {json.ghMetadata.reactions.total_count === 1 ? "reaction" : "reactions"}</span
				>
			</a>
			{new Date(json.date).toISOString().slice(0, 10)}
		</p>
	</div>
	<div
		class="-mx-4 my-2 flex h-1 w-[100vw] bg-gradient-to-r from-white to-blue-400 sm:mx-0 sm:w-full"
	/>
	{@html json.content}	
</article>

<div class="mx-auto max-w-5xl w-2/3 flex justify-center">
	<div class="flex flex-col justify-center max-w-5xl w-2/3">
		<div class="prose mb-12 border-t border-b border-blue-400 p-4 dark:prose-invert">
			{#if json.ghMetadata.reactions.total_count > 0}
				Reactions: <Reactions
					issueUrl={json.ghMetadata.issueUrl}
					reactions={json.ghMetadata.reactions}
				/>
			{:else}
				<a href={json.ghMetadata.issueUrl}>Leave a reaction </a>
				if you liked this post! 🧡
			{/if}
		</div>
		<div class="mb-8">
			<Comments ghMetadata={json.ghMetadata} />
		</div>
	</div>
</div>
