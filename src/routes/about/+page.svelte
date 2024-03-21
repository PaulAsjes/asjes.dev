<script>
	import { MY_TWITTER_HANDLE } from '$lib/siteConfig';
</script>

<section class="flex justify-center">
	<div class="relative m-4 h-[150px] w-[150px] rounded-full sm:h-[250px] sm:w-[250px]">
		<img
			src="/about-profile.jpg"
			class="rounded-full bg-gradient-to-r from-white to-blue-400 p-1 filter"
			alt="Paul Asjes"
		/>
	</div>
</section>

<section
	class="mx-auto flex max-w-5xl flex-col items-start justify-center px-4 py-8 text-black dark:text-white sm:px-8"
>
	<h1 class="mb-4 text-3xl font-bold tracking-tight md:text-5xl">About me</h1>
	<div class="space-y-4">
		<p>
			Hello, I'm Paul Asjes. I work as a Developer Experience Engineer at WorkOS. I focus on raising
			awareness, being the voice of the developer and giving internal teams what they need to build
			great products.
		</p>
		<p>
			Prior to WorkOS I ran Developer Relations at Stripe. Before that I was a product engineer for
			10+ years, working at Tumblr and various start ups over the years. I started my career as a
			Flash developer back in the stone age of the internet, now preferring to work in the
			JavaScript ecosystem.
		</p>
	</div>
</section>

<section
	class="mx-auto flex max-w-5xl flex-col items-start justify-center px-4 py-8 text-black dark:text-white sm:px-8"
>
	<h1 class="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Contact</h1>
	<p>
		If you want to get a hold of me, the best way is via <a
			href={`https://twitter.com/${MY_TWITTER_HANDLE}`}
			class="dark:text-blue-400">Twitter</a
		>
		or you can <a href="mailto:hello@asjes.dev" class="dark:text-blue-400">email</a> me directly. If
		inquiring about speaking at a conference, please include the dates, location, type of conference
		and talk type in your message.
	</p>
</section>

<section
	class="mx-auto flex w-full max-w-5xl flex-col items-start justify-center px-4 py-8 text-black dark:text-white sm:px-8"
>
	<h1 class="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Uses</h1>

	<div class="m-4">
		<h2 class="mb-2 text-xl font-bold">Website</h2>
		<ul class="list-disc">
			<li><a href="https://svelte.dev/" class="dark:text-blue-400">Svelte</a></li>
			<li><a href="https://swyxkit.netlify.app/" class="dark:text-blue-400">Swyxkit</a></li>
			<li><a href="https://vercel.com/" class="dark:text-blue-400">Vercel</a></li>
		</ul>
	</div>

	<div class="m-4">
		<h2 class="mb-2 text-xl font-bold">Software</h2>
		<ul class="list-disc">
			<li>
				VSCode (with <a
					href="https://draculatheme.com/visual-studio-code"
					class="dark:text-blue-400">Dracula</a
				> theme)
			</li>
			<li><a href="https://iterm2.com/" class="dark:text-blue-400">iTerm2</a></li>
			<li><a href="https://bear.app/" class="dark:text-blue-400">Bear notes</a></li>
		</ul>
	</div>
</section>
