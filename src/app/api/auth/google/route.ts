import { googleAuth } from '@/utils/lucia'
import { generateCodeVerifier, generateState } from 'arctic'
import { cookies } from 'next/headers'

export async function GET() {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()
	const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
		scopes: ['email']
	})

	cookies().set('google_oauth_state', state, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production', // set `Secure` flag in HTTPS
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax'
	})

	cookies().set('google_oauth_code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production', // set `Secure` flag in HTTPS
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax'
	})

	return Response.redirect(url)
}
