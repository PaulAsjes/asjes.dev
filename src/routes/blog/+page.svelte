<script>
	import { queryParam } from "sveltekit-search-params";

	import { SITE_TITLE, POST_CATEGORIES } from '$lib/siteConfig';

	import IndexCard from '../../components/IndexCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// technically this is a slighlty different type because doesnt have 'content' but we'll let it slide
	/** @type {import('$lib/types').ContentItem[]} */
	$: items = data.items;

	let selectedCategories = queryParam("show", {
		encode: (arr)=> arr?.toString(),
		decode: (str)=> str?.split(",")?.filter((e) => e) ?? [],
	});
	let search = queryParam("filter");
	let inputEl;

	let isTruncated = items?.length > 20;
	$: list = items
		.filter((item) => {
			if ($selectedCategories?.length) {
				return $selectedCategories
					.map((element) => {
						return element.toLowerCase();
					})
					.includes(item.category.toLowerCase());
			}
			return true;
		})
		.filter((item) => {
			if ($search) {
				return item.title.toLowerCase().includes($search.toLowerCase());
			}
			return true;
		})
		.slice(0, isTruncated ? 2 : items.length);		
</script>

<svelte:head>
	<title>{SITE_TITLE} Blog Index</title>
	<meta name="description" content={`Latest ${SITE_TITLE} posts`} />
</svelte:head>

<section class="flex flex-col items-start justify-center max-w-5xl w-2/3 px-4 mx-auto mb-16 sm:px-8 py-8">
	<h1 class="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
		Blog
	</h1>
	<p class="mb-4 text-gray-600 dark:text-gray-400">
		You can find my writings here, or on Stripe's <a href="https://dev.to/stripe" rel="noreferrer" target="_blank">dev.to</a> page. In total, I've written {items.length} articles on my personal blog. Use the search below to
		filter by title.
	</p>
	<div class="relative w-full mb-4">
		<input
			aria-label="Search articles"
			type="text"
			bind:value={$search}
			bind:this={inputEl}
			placeholder="Search blogs and talks"
			class="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
		/><svg
			class="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/></svg
		>
	</div>
	
	<!-- if you have multiple categories enabled -->
	{#if POST_CATEGORIES.length > 1}
	<div class="flex items-center mt-2 mb-12 ">
		<div class="mr-2 text-gray-900 dark:text-gray-400">Filter:</div>
		<div class="grid grid-cols-3 rounded-md shadow-sm sm:grid-cols-6">
			{#each POST_CATEGORIES as availableCategory, i}
				<div>
					<input
						id="category-{availableCategory}"
						class="sr-only peer"
						type="checkbox"
						bind:group={$selectedCategories}
						value={availableCategory}
					/>
					<label
						for="category-{availableCategory}"
						class="{i === 0 ? 'rounded-l-lg' : (i === POST_CATEGORIES.length - 1 ? "rounded-r-lg" : "")} inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-400 peer-checked:text-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-400"
					>
						{availableCategory}
					</label>
				</div>
			{/each}
		</div>
	</div>
	{/if}

	<!-- you can hardcode your most popular posts or pinned post here if you wish -->
	{#if !$search}
		<h3 class="mt-8 mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
			Most Popular
		</h3>
		<IndexCard href="/designing-apis-for-humans-error-messages" title="Designing APIs for humans: Error Messages" stringData="">
			A deep dive on how to build useful error messages for the humans that need them.
		</IndexCard>

		<h3 class="mt-8 mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
			All Posts
		</h3>
	{/if}

	{#if list.length}
		<ul class="">
			{#each list as item}
				<li class="mb-8 text-lg">					
					<IndexCard
						href={item.slug}
						title={item.title}
						ghMetadata={item.ghMetadata}
						{item}
					>
						{item.description}
					</IndexCard>
				</li>
			{/each}
		</ul>
		{#if isTruncated}
			<div class="flex justify-center">
				<button
					on:click={() => (isTruncated = false)}
					class="inline-block p-4 text-lg font-bold tracking-tight text-black bg-blue-100 rounded hover:text-yellow-900 dark:bg-blue-900 dark:text-white hover:dark:text-yellow-200 md:text-2xl"
				>
					Load More Posts...
				</button>
			</div>
		{/if}
	{:else if $search}
		<div class="prose dark:prose-invert">
			No posts found for
			<code>{$search}</code>.
		</div>
		<button class="p-2 bg-slate-500" on:click={() => ($search = '')}>Clear your search</button>
	{:else}
		<div class="prose dark:prose-invert">No blogposts found!</div>
	{/if}
</section>
