import { lucia } from '@/utils/lucia'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { UUID } from 'node:crypto'

export async function setOAuthSession(userId: UUID) {
	const session = await lucia.createSession(userId, {})
	const sessionCookie = lucia.createSessionCookie(session.id)

	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	})
}
export async function setPasswordSession(userId: UUID) {
	const session = await lucia.createSession(userId, {})
	const sessionCookie = lucia.createSessionCookie(session.id)

	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

	revalidatePath('/', 'layout')
	return redirect('/')
}
