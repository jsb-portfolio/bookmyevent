import { pool } from '@/utils/database/postgres'

interface AddUserViaOAuth {
	provider_id: string
	provider_user_id: string
	email: string
	email_verified: boolean
	username?: string
	avatar_url?: string
}

export async function addUserViaSignup(email: string, hashed_password: string) {
	const usernameToInsert = await checkUsername(email)

	const addedUser = await pool.query(
		'INSERT INTO auth.users (email, hashed_password, username) VALUES ($1, $2, $3) RETURNING id',
		[email, hashed_password, usernameToInsert]
	)
	const userId = addedUser.rows[0].id // Retrieve the generated UUID

	return userId
}
export async function addUserViaOAuth(params: AddUserViaOAuth) {
	const { provider_id, provider_user_id, email, email_verified, username, avatar_url } = params
	const usernameToInsert = await checkUsername(email, username)

	const client = await pool.connect()
	try {
		await client.query('BEGIN')

		const addedUser = await client.query(
			'INSERT INTO auth.users (email, username, avatar_url, email_verified) VALUES ($1, $2, $3, $4) RETURNING id',
			[email, usernameToInsert, avatar_url, email_verified]
		)
		const userId = addedUser.rows[0].id // Retrieve the generated UUID

		await client.query(
			'INSERT INTO auth.oauth_accounts (provider_id, provider_user_id, user_id) VALUES ($1, $2, $3)',
			[provider_id, provider_user_id, userId]
		)

		await client.query('COMMIT')
		return userId
	} catch (err) {
		await client.query('ROLLBACK')
		throw new err()
	} finally {
		client.release()
	}
}

const checkUsername = async (email: string, username?: string) => {
	const email_username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '_') // Extract and clean username from email
	// Check if email_username exists in the database
	const client = await pool.connect()
	try {
		const emailUsernameCheckResult = await client.query(
			'SELECT id FROM auth.users WHERE username = $1',
			[email_username]
		)

		let usernameToInsert = `user_${Math.random().toString(36).slice(2, 10)}`
		if (emailUsernameCheckResult.rowCount === 0) {
			usernameToInsert = email_username // email_username doesn't exist, use it
		} else if (username) {
			// If email_username exists and username is passed, check it
			const cleanedUsername = username.replace(/[^a-zA-Z0-9]/g, '_') // Clean username to remove special characters and add _
			const providerUsernameCheckResult = await client.query(
				'SELECT id FROM auth.users WHERE username = $1',
				[cleanedUsername]
			)

			if (providerUsernameCheckResult.rowCount === 0) {
				usernameToInsert = cleanedUsername // username doesn't exist, use it
			}
		}
		return usernameToInsert
	} catch (err) {
		throw new err()
	} finally {
		client.release()
	}
}