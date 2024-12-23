import { githubAuth } from '@/utils/lucia'
import { OAuth2RequestError } from 'arctic'
import { cookies } from 'next/headers'

import { getOAuthUser } from '@/utils/database/services/auth/getExistingUser'
import { setOAuthSession } from '@/utils/lucia/setSession'
import { addUserViaOAuth } from '@/utils/database/services/auth/addUser'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const state = url.searchParams.get('state')
	const code = url.searchParams.get('code')

	const stateCookie = cookies().get('github_oauth_state')?.value ?? null

	// verify state
	if (!state || !code || stateCookie !== state) {
		return new Response(null, {
			status: 400
		})
	}

	try {
		const tokens = await githubAuth.validateAuthorizationCode(code)
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		})
		const githubUser: GitHubUserResult = await githubUserResponse.json()
		// Sign in user if they already exist
		const existingAccount = await getOAuthUser('github', githubUser.id)
		if (existingAccount) {
			return await setOAuthSession(existingAccount.user_id)
		}

		{
			const githubUserEmails = await fetch('https://api.github.com/user/emails', {
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`
				}
			})
			const githubUserEmailsJson = await githubUserEmails.json()
			githubUser.email = githubUserEmailsJson[0].email
			githubUser.email_verified = githubUserEmailsJson[0].verified
		}
        
		const userId = await addUserViaOAuth({
			provider_id: 'github',
			provider_user_id: githubUser.id,
			username: githubUser.login,
			email: githubUser.email,
			email_verified: githubUser.email_verified,
			avatar_url: githubUser.avatar_url
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

interface GitHubUserResult {
	id: string
	login: string // username
	email: string
	email_verified: boolean
	avatar_url: string
}
