<script>
	// href={item.slug} title={item.data.title} date={item.data.date}
	export let href = '#';
	/** @type {import('$lib/types').ContentItem} */
	export let item;
	/** @type {import('$lib/types').GHMetadata} */
	export let ghMetadata;
	export let title = 'Untitled post';
	/** @type {string} */
	export let stringData;

	console.log(item);
</script>

<a
	class="w-full text-gray-900 hover:text-yellow-600 dark:text-gray-100 dark:hover:text-yellow-100"
	target="_blank"
	rel="noreferrer"
	{href}
>
	<div class="mb-8 flex flex-row">
		<div class="flex flex-col justify-center m-5 w-full">
			<div class="flex flex-col justify-between md:flex-row">
				<h4 class="mb-2 w-full flex-auto text-lg font-medium md:text-xl">
					{title}
				</h4>
			</div>
			<p class="break-all text-gray-600 dark:text-gray-400 sm:break-words">
				<slot />
			</p>
			<div
				class="flex justify-between gap-1 text-left text-gray-500 sm:flex-row sm:justify-start sm:gap-4 md:mb-0 md:text-sm"
			>
				<!-- {JSON.stringify(item.readingTime)} -->
				{#if stringData}
					<p>{stringData}</p>
				{/if}
				{#if item?.date}
					<p>{new Date(item?.date).toLocaleDateString()}</p>
				{/if}
				{#if item?.readingTime}
					<p class="hidden sm:inline-block">{item?.readingTime}</p>
				{/if}
				{#if ghMetadata && ghMetadata.reactions.total_count}
					<p class="">{ghMetadata.reactions.total_count} ♥</p>
				{/if}
				<!-- comment this in if you have multiple categories -->
				<button class="rounded-xl bg-gray-200 px-4 capitalize dark:bg-gray-700 dark:text-gray-400"
					>{item?.category || 'blog'}</button
				>
			</div>
		</div>
		{#if item?.ytID}
			<div>
				<img class="rounded" alt="YouTube thumbnail" src={`https://img.youtube.com/vi/${item?.ytID}/mqdefault.jpg`} />
			</div>
		{/if}
	</div>
</a>
