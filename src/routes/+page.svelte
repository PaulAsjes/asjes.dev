<script>
	import FeatureCard from '../components/FeatureCard.svelte';
	import {
		SITE_URL,
		SITE_TITLE,
		SITE_DESCRIPTION,
		DEFAULT_OG_IMAGE,
		MY_TWITTER_HANDLE
	} from '$lib/siteConfig';

	/** @type {import('./$types').PageData} */
	export let data;
	// technically this is a slightly different type because doesnt have 'content' but we'll let it slide
	/** @type {import('$lib/types').ContentItem[]} */
	$: items = data.items.slice(0, 10);
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta name="Description" content={SITE_DESCRIPTION} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE} />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
</svelte:head>

<div class="flex flex-col justify-center w-full pt-4 mx-auto border-gray-200 dark:border-gray-700">
	<section class="flex justify-center mb-16 pt-6 pb-6 w-full">
		<div class="flex flex-col max-w-5xl w-3/4">
			<h1 class="mb-3 text-2xl font-bold tracking-tight text-black dark:text-white md:text-2xl">
				Paul Asjes
			</h1>
			<h2 class="flex justify-between mb-4 text-gray-700 dark:text-gray-200 text-5xl">
				<div>
					<p>DX Engineer &</p>
					<p>Engineering Manager.</p>
				</div>
				<div class="w-[150px] h-[150px] rounded-full sm:w-[176px] sm:h-[136px] relative">
					<img
						src="/profile.png"
						class="rounded-full filter p-1 bg-gradient-to-r from-white to-blue-400"
						alt="Paul Asjes"
					/>
				</div>
			</h2>
			<p class="text-black dark:text-white">
				Hi, I'm Paul. I'm a dad x 2 and a Developer Experience Engineer at ElevenLabs.
			</p>
		</div>
	</section>

	<section class="flex justify-center bg-zinc-900 pt-6 pb-6 w-full">
		<div class="flex flex-col max-w-5xl w-3/4">
			<h1 class="mb-3 text-2xl font-bold tracking-tight text-white md:text-2xl">Writing</h1>
			<h3 class="mb-6 text-2xl font-bold tracking-tight text-white md:text-4xl">Featured Posts</h3>
			<div class="flex flex-col gap-6 md:flex-row justify-center">
				<FeatureCard
					title="Designing APIs for humans: Object IDs "
					href="/designing-apis-for-humans-object-ids"
					stringData="August 2022"
				/>
				<FeatureCard
					title="Designing APIs for humans: Error messages"
					href="/designing-apis-for-humans-error-messages"
					stringData="September 2022"
				/>
				<FeatureCard
					title="Designing APIs for humans: Design patterns"
					href="/designing-apis-for-humans-design-patterns"
					stringData="July 2023"
				/>
			</div>
		</div>
	</section>

	<section class="flex justify-center bg-zinc-800 pt-6 pb-6 w-full">
		<div class="flex flex-col max-w-5xl w-3/4">
			<h3 id="latest" class="mb-6 text-2xl font-bold tracking-tight text-white md:text-4xl">
				Latest Posts
			</h3>
			<ul class="space-y-2 text-white">
				{#each items as item (item.slug)}
					<li>
						<a
							class="font-bold text-blue-400 dark:text-blue-400"
							data-sveltekit-preload-data
							href={item.slug}>{item.title}</a
						>
						<span class="hidden text-xs text-gray-400 sm:inline"
							>{new Date(item.date).toISOString().slice(0, 10)}</span
						>
					</li>
				{/each}
			</ul>
			<a
				class="flex h-6 mt-2 leading-7 text-gray-400 hover:text-blue-400 transition-all rounded-lg dark:hover:text-blue-400"
				href="/blog"
			>
				Search and see all posts
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="w-6 h-6 ml-1"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
					/>
				</svg>
			</a>
		</div>
	</section>

	<section class="flex justify-center bg-white pt-6 pb-6 w-full">
		<div class="flex flex-col max-w-5xl w-3/4">
			<h1 class="mb-3 text-2xl font-bold tracking-tight text-black md:text-2xl">Speaking</h1>
			<h1 class="mb-6 text-2xl font-bold tracking-tight text-black md:text-4xl">Featured Talks</h1>
			<div class="flex flex-col gap-6 md:flex-row">
				<FeatureCard
					title="Dinos and Clouds: Node apps for Deno and Cloudflare Workers"
					href="https://www.youtube.com/watch?v=abA7dIP2BKc"
					stringData="May 2022"
				/>
				<FeatureCard
					title="Card Testing: A Developer’s Guide to Fighting Against the Dark Web"
					href="https://www.youtube.com/watch?v=sZKTWVDnBAQ"
					stringData="March 2022"
				/>
				<FeatureCard
					title="Making It All Fit Together with React and GraphQL"
					href="https://www.youtube.com/watch?v=EjJVf2s60s8"
					stringData="July 2019"
				/>
			</div>
		</div>
	</section>
</div>
