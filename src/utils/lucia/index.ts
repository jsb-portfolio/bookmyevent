import { Lucia } from 'lucia'
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql'
import { pool } from '../database/postgres'

const adapter = new NodePostgresAdapter(pool, {
	user: 'auth.users',
	session: 'auth.sessions'
})

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (attributes) => {
		return {
			githubId: attributes.github_id ?? null,
			googleId: attributes.google_id ?? null,
			username: attributes.username
		}
	}
})

// IMPORTANT!
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: {
			github_id?: number
			google_id?: string
			username: string
		}
	}
}

export { github as githubAuth, google as googleAuth } from './auth'
export { validateAuth } from './validateAuth'
