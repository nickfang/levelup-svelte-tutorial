<script>
  import { navigating, page, updated, getStores } from '$app/stores';
  import Test from '$lib/Test.svelte';
  import '$db/start';
  export let data;

  $: console.log($navigating, $page);

  // $ makes the destructure statement reactive.
  $: ({ latestEpisode} = data)
</script>

<h3>{latestEpisode.title}</h3>



<Test />