import { googleAuth } from '@/utils/lucia'
import { OAuth2RequestError } from 'arctic'
import { cookies } from 'next/headers'

import { getOAuthUser } from '@/utils/database/services/auth/getExistingUser'
import { setOAuthSession } from '@/utils/lucia/setSession'
import { addUserViaOAuth } from '@/utils/database/services/auth/addUser'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const state = url.searchParams.get('state')
	const code = url.searchParams.get('code')

	const stateCookie = cookies().get('google_oauth_state')?.value ?? null
	const codeVerifierCookie = cookies().get('google_oauth_code_verifier')?.value ?? null

	// verify state
	if (!state || !code || !codeVerifierCookie || stateCookie !== state) {
		return new Response(null, {
			status: 400
		})
	}

	try {
		const tokens = await googleAuth.validateAuthorizationCode(code, codeVerifierCookie)
		const googleUserResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		})
		const googleUser: GoogleUserResult = await googleUserResponse.json()

		// Sign in user if they already exist
		const existingAccount = await getOAuthUser('google', googleUser.sub)
		if (existingAccount) {
			return await setOAuthSession(existingAccount.user_id)
		}

		const userId = await addUserViaOAuth({
			provider_id: 'google',
			provider_user_id: googleUser.sub,
			email: googleUser.email,
			email_verified: googleUser.email_verified,
			avatar_url: googleUser.picture
		})
		return await setOAuthSession(userId)
		
	} catch (e) {
		console.log(e)
		if (e instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			return new Response(null, {
				status: 400
			})
		}
		return new Response(null, {
			status: 500
		})
	}
}

interface GoogleUserResult {
	sub: string // Unique identifier for the user from google
	picture: string // URL of the user's profile picture
	email: string
	email_verified: boolean
}
