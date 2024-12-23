import { Pool } from 'pg'

export const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB
})
