<script>
	/** @type {import('$lib/types').GHMetadata} */
	export let ghMetadata;
	let data = [];
	import { onMount } from 'svelte';
	onMount(async () => {
		data = await (await fetch(ghMetadata.commentsUrl)).json();
	});
	import Comment from './Comment.svelte';
</script>

<div class="prose mb-8 w-full dark:prose-invert">
	{#each data as comment}
		<Comment {comment} />
	{/each}
</div>
<a
	href={`${ghMetadata.issueUrl}#issuecomment-new`}
	rel="noreferrer"
	target="_blank"
	class="flex justify-center border-y shadow text-white bg-blue-400 p-4 no-underline dark:bg-white dark:text-black hover:no-underline dark:hover:no-underline hover:text-blue-400 hover:bg-white dark:hover:text-blue-400 sm:inline sm:rounded-xl sm:border-x"
>
	Add a new comment
</a>