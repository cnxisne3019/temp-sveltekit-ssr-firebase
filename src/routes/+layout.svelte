<script lang="ts">
	import type { LayoutData } from './$types';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore/lite';
	import { browser } from '$app/environment';
	import { env } from '$env/dynamic/public';

	export let data: LayoutData;
	console.log('🚀 ~ file: +layout.svelte:5 ~ data:', data);

	if (browser) {
		try {
			const app = initializeApp(JSON.parse(env.PUBLIC_FIREBASE_CLIENT_CONFIG));
			const db = getFirestore(app);

			console.log('🚀 ~ file: +layout.svelte:21 ~ db:', db);
		} catch (error) {
			console.log('🚀 ~ file: +layout.svelte:22 ~ error:', error);
		}
	}
</script>

<slot />
