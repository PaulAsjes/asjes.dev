<script>
	import { page } from '$app/stores';
	$: isActive = $page.url.pathname === $$props.href;
	export let href;
</script>

<a
	class="hidden hover:no-underline rounded-lg p-1 text-gray-800 transition-all hover:text-blue-400 hover:dark:text-blue-400 dark:text-gray-200 sm:px-3 sm:py-2 md:inline-block"
	class:font-semibold={isActive}
	{href}
>
	<span class="capsize">
		<slot />
	</span>
</a>
