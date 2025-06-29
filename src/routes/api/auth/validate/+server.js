import jwt from 'jsonwebtoken';
import { json } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';

export async function POST({ request }) {
	try {
		const { token } = await request.json();
		if (!token) {
			return json({ error: 'Token is missing' }, { status: 400 });
		}

		const payload = jwt.verify(token, JWT_SECRET);
		return json({
			success: true,
			user: {
				username: payload.username,
				email: payload.email,
				role: payload.role
			}
		});
	} catch (error) {
		return json({ error: 'Invalid token' }, { status: 401 });
	}
}
