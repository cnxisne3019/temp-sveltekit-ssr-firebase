<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<h1>{$page.status}: {$page.error?.message}</h1>
	This is a custom error page
</main>

<style>
	main {
		min-height: calc(100vh-4rem);
	}
</style>
