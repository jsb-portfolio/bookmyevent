import { pool } from '@/utils/database/postgres'

export async function getOAuthUser(provider_id: string, provider_user_id: string) {
	const existingAccountResult = await pool.query(
		'SELECT * FROM auth.oauth_accounts WHERE provider_id = $1 AND provider_user_id = $2',
		[provider_id, provider_user_id]
	)
	return existingAccountResult.rows[0]
}
export async function getPasswordUser(email: string) {
	const existingAccountResult = await pool.query('SELECT * FROM auth.users WHERE email = $1', [
		email
	])
	return existingAccountResult.rows[0]
}
