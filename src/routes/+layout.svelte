<script>
	import '../tailwind.css';
	import Nav from '../components/Nav.svelte';
	import { MY_TWITTER_HANDLE, REPO_URL, SITE_TITLE } from '$lib/siteConfig';
</script>

<div class="flex flex-col justify-center px-4 dark:bg-black sm:px-8 py-8">
	<Nav />
</div>
<main class="flex flex-col justify-center bg-gray-50 dark:bg-black mt-8">
	<slot />
</main>

<div class="flex justify-center dark:bg-black sm:px-8 my-5">
	<footer class="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start">
		<div class="flex justify-evenly w-full max-w-2xl">
			<a class="text-gray-500 transition hover:text-gray-300 hover:no-underline" href="/">Home</a>
			<a class="text-gray-500 transition hover:text-gray-300 hover:no-underline" href="/about">Blog</a>			
			<a class="text-gray-500 transition hover:text-gray-300 hover:no-underline" href="/about">About</a>
			<a class="text-gray-500 transition hover:text-gray-300 hover:no-underline" href="/about">Talks</a>			
			<a
					class="text-gray-500 transition hover:text-gray-300 hover:no-underline"
					target="_blank"
					rel="noopener noreferrer"
					href={'https://twitter.com/intent/follow?screen_name=' + MY_TWITTER_HANDLE}
				>
					Twitter
				</a>
				<a
					class="text-gray-500 transition hover:text-gray-300 hover:no-underline"
					target="_blank"
					rel="noopener noreferrer"
					href={REPO_URL}
				>
					Source
				</a>			
		</div>						
		<div class="flex w-full justify-center my-5">
			<p class="prose px-4 dark:prose-invert sm:px-10 text-xs">
				This site is based on the
				<a href="https://swyxkit.netlify.app/">swyxkit</a>
				template.
			</p>
		</div>
	</footer>
</div>

