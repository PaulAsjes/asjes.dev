<script>
	import '../tailwind.css';
	import Nav from '../components/Nav.svelte';
	import { MY_TWITTER_HANDLE, REPO_URL, SITE_TITLE } from '$lib/siteConfig';
</script>

<div class="flex flex-col justify-center px-4 py-8 dark:bg-black sm:px-8">
	<Nav />
</div>
<main class="mt-8 flex flex-col justify-center bg-gray-50 dark:bg-black">
	<slot />
</main>

<div class="my-5 flex justify-center dark:bg-black sm:px-8">
	<footer class="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start">
		<div class="flex w-full max-w-2xl justify-evenly">
			<a class="text-gray-500 transition hover:text-gray-300 hover:no-underline" href="/">Home</a>
			<a class="text-gray-500 transition hover:text-gray-300 hover:no-underline" href="/blog"
				>Blog</a
			>
			<a class="text-gray-500 transition hover:text-gray-300 hover:no-underline" href="/talks"
				>Talks</a
			>
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
				href='https://www.linkedin.com/in/paul-asjes-4a903a18/'
			>
				LinkedIn
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
		<div class="my-5 flex w-full justify-center">
			<p class="prose px-4 text-xs dark:prose-invert sm:px-10 n">
				This site is based on the
				<a href="https://swyxkit.netlify.app/">swyxkit</a>
				template.
			</p>
		</div>
	</footer>
</div>
