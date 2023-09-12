<script>
  import { page } from '$app/stores'
  $: console.log('page', $page);
</script>

<h1>Oops!</h1>
<h2>{$page.error?.code}</h2>
<p>{$page.error?.message}</p>