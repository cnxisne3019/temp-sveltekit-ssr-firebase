import type { Handle } from '@sveltejs/kit';

export const handle: Handle = (async ({ event, resolve }) => {
	const cookie_token = event.cookies.get('session');

	if (!cookie_token) {
		console.log(
			'Hooks.server.ts บอกว่า >> Cookies ว่างเปล่า กำลังทำการค้นหาโทเคนจาก URLSearchParam '
		);
		const firebase_token = event.url.searchParams.get('firebase_token') ?? '';
		const access_token = event.url.searchParams.get('access_token') ?? '';

		if (!firebase_token || !access_token) {
			console.log('Hooks.server.ts บอกว่า >> หาโทเคนจาก URLSearchParam ไม่เจอ ล้มเลิกภารกิจ ');
			// If there's no firebase_token or access_token in the search params, exit
			return await resolve(event);
		}

		console.log(
			'Hooks.server.ts บอกว่า >> พบโทเคนจาก URLSearchParam กำลังทำการเก็บค่าไว้ใน Locals และใน Cookie ในชื่อว่า session'
		);
		event.locals.token = { firebase_token, access_token };
		event.cookies.set('session', JSON.stringify(event.locals.token), {
			secure: false,
			maxAge: 60 * 60
		});
	} else {
		console.log(
			'Hooks.server.ts บอกว่า >> มีข้อมูลอยู่ใน Cookies อยู่แล้ว ให้ดึง Cookies มาแล้วเอาค่าไปเก็บใน locals.user ได้เลย'
		);
		event.locals.token = JSON.parse(cookie_token);
	}

	return resolve(event);
}) satisfies Handle;
