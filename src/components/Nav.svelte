<script>
	import MobileMenu from './MobileMenu.svelte';
	import { REPO_URL, MY_TWITTER_HANDLE } from '$lib/siteConfig';
	import NavLink from './NavLink.svelte';

	let isDark = false;
	let scrollY = -1;
	let prevY = 0;
	let hideNav = false;

	if (typeof localStorage !== 'undefined') {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			isDark = true;
		}
	}
	function toggleDarkMode() {
		if (isDark) {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
			isDark = false;
		} else {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
			isDark = true;
		}
	}

	function onScroll() {
		hideNav = scrollY > prevY;		

		prevY = scrollY;
	}

</script>

<svelte:window bind:scrollY={scrollY} on:scroll={onScroll}/>

<nav
	class="fixed top-0 left-0 right-0 mx-auto flex flex-col w-full items-center justify-between bg-white
	py-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-black
	dark:text-gray-100 sm:pb-8 will-change-scroll transition ease-in-out duration-300"
	style="transform: translate(0, {hideNav ? -100 : 0}px"
>	
	<div class="flex items-center justify-evenly w-full max-w-5xl">
		<a href="#skip" class="skip-nav">Skip to content</a>
		<MobileMenu />
		<ul class="ml-[-0.60rem] flex justify-between w-full">
			<li>
				<NavLink href="/">Home</NavLink>
			</li>
			<li>
				<NavLink href="/blog">Blog</NavLink>
			</li>
			<li>
				<NavLink href="/about">About</NavLink>
			</li>
			<li>
				<NavLink href="/talks">Talks</NavLink>
			</li>
			<li>
				<a
					class="rounded-lg text-gray-700 hover:text-blue-400 dark:hover:text-blue-400 dark:text-gray-200"
					href={'https://twitter.com/intent/follow?screen_name=' + MY_TWITTER_HANDLE}
					aria-label="Twitter"
				>
					<svg aria-hidden="true" class="h-9 w-9 p-1" fill="currentColor" viewBox="0 0 24 24">
						<path 
							fill-rule="evenodd"
							d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 
							1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 
							0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 
							2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 
							4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 
							1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 
							13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" 
							clip-rule="evenodd"
						/>
					</svg>		
				</a>			
			</li>
			<li>
				<a
					class="rounded-lg text-gray-700 hover:text-blue-400 dark:hover:text-blue-400 dark:text-gray-200"
					href={REPO_URL}
					aria-label="GitHub source"
				>
					<svg aria-hidden="true" class="h-9 w-9 p-1" fill="currentColor" viewBox="0 0 24 24">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
							0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608
							1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088
							2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988
							1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112
							6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202
							2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566
							4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019
							10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</li>
			<li>
				<button
					aria-label="Toggle Dark Mode"
					class="ml-1 flex h-9 w-14 items-center justify-center rounded-full bg-gray-800 ring-blue-400
					transition-all hover:ring-2 dark:bg-white"
					on:click={toggleDarkMode}
				>
					<div 
						class="rounded-full border-2 border-white dark:border-gray-800 bg-gray-800 dark:bg-white flex w-7 h-7 justify-center items-center transition ease-in-out duration-300"
						style="transform: translate({isDark ? 10 : -10}px, 0)"
					>
						{#if isDark}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5 text-gray-800 dark:text-black"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728
									0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								class="h-5 w-5 text-white dark:text-gray-200"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
								/>
							</svg>
						{/if}
					</div>
				</button>
			</li>
		</ul>
	</div>	
</nav>

<style>
	.skip-nav {
		position: absolute;
		left: -25%;
		top: -2rem;
		--tw-translate-y: -3rem;
		padding: 0.75rem 1rem;
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0.2s;
	}


</style>
