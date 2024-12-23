import { pool } from '@/utils/database/postgres'

export async function getAvatar(userId: string) {
	const avatar_url = await pool.query('SELECT avatar_url FROM auth.users WHERE id = $1', [
		userId
	])
	return avatar_url.rows[0].avatar_url
}
