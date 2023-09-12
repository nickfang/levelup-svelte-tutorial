<script>
  // https://github.com/sveltejs/svelte-preprocess
  import { goto } from '$app/navigation';
  // lifecycle, afterNavigate, beforeNavigate
  // disableScrollHandling: SvelteKit's built in scroll handling
  // goto: programatically routing
  // invalidate: load functions on active page re-run
  // invalidateAll: causes all load functions to re-run
  // preloadCode: load js code for given routes
  // preloadData: load data from load functions for given routes
  import { env } from '$env/dynamic/public';
  import { PUBLIC_LUT_PUB_KEY } from '$env/static/public';
  console.log('PUBLIC_LUT_PUB_KEY', PUBLIC_LUT_PUB_KEY);

  import { browser, building, dev, version } from '$app/environment';
  import { navigating } from '$app/stores';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';

  import './styles.css';
  import Episodes from './Episodes.svelte';

  export let data;
  $: ({ allEpisodes } = data);
  console.log(browser, building, dev, version);
  // browser: boolean, if app is running in browser
  // building: boolean, true if currently building for production
  // dev: boolean, if in development
  // version: config.kit.version.name
</script>

<Header />

<!-- {#if !!$navigating}
  <div class="loading">Loading</div>
{/if} -->

<main>
  <div class="main">
    <button on:click={() => goto('/contact')}>Change Page</button>
    <slot />
  </div>
  <aside>
    <Episodes episodes={allEpisodes} />
  </aside>
</main>

<Footer />

<style lang="postcss">
  main {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 20px;
  }

  aside {
    order: -1;
  }

  /* .loading {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
    color: white
  } */
</style>