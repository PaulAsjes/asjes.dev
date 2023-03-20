<script>
  import IndexCard from '../../components/IndexCard.svelte';
</script>

<section class="flex flex-col items-start justify-center max-w-5xl w-2/3 px-4 mx-auto mb-16 sm:px-8 py-8 text-black dark:text-white">
  <h1 class="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Talks</h1>
  <p class="mt-5">Any questions about the below or want to suggest a topic for me to speak on? <a href="mailto:hello@asjes.dev" class="dark:text-blue-400">Get in touch!</a></p>
</section>

<section class="flex flex-col items-start justify-center max-w-5xl w-2/3 px-4 mx-auto mb-16 sm:px-8 py-8">
  <IndexCard 
    href="https://www.youtube.com/watch?v=abA7dIP2BKc" 
    title="Dinos and Clouds: Node apps for Deno and Cloudflare Workers" 
    item={{
      category: 'talk', 
      ytID: 'abA7dIP2BKc',
      date: new Date(2022, 5, 22),
    }}
  >
  OpenJS World 2022
  </IndexCard>

  <IndexCard 
    href="https://www.youtube.com/watch?v=sZKTWVDnBAQ" 
    title="Card Testing: A Developer’s Guide to Fighting Against the Dark Web" 
    item={{
      category: 'talk', 
      ytID: 'sZKTWVDnBAQ',
      date: new Date(2022, 3, 24),
    }}
  >
  The Big Fix 2022
  </IndexCard>

  <IndexCard 
    href="https://www.youtube.com/watch?v=EjJVf2s60s8" 
    title="Making It All Fit Together with React and GraphQL" 
    item={{
      category: 'talk', 
      ytID: 'EjJVf2s60s8',
      date: new Date(2019, 7, 13),
    }}
  >
    JSConf Asia 2019
  </IndexCard>
</section>
