import type { Handle } from '@sveltejs/kit';

export const handle: Handle = (async ({ event, resolve }) => {
	const cookie_token = event.cookies.get('session');

	if (!cookie_token) {
		const firebase_token = event.url.searchParams.get('firebase_token') ?? '';
		const access_token = event.url.searchParams.get('access_token') ?? '';
		if (!firebase_token || !access_token) {
			return await resolve(event);
		}

		event.locals.token = { firebase_token, access_token };
		const encoded_token = Buffer.from(JSON.stringify(event.locals.token)).toString('base64');

		event.cookies.set('session', encoded_token, {
			secure: false,
			maxAge: 60 * 60
		});
	} else {
		const decoded_token = Buffer.from(cookie_token, 'base64').toString('ascii');
		event.locals.token = JSON.parse(decoded_token);

		if (event.url.search.includes('firebase_token')) {
			return Response.redirect(`${event.url.origin}/`, 301);
		}
	}

	return resolve(event);
}) satisfies Handle;
