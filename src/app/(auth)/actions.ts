'use server'

import { hash, verify } from '@node-rs/argon2'

import type { LoginFormData, SignupFormData } from '@/types/zodSchema'
import { addUserViaSignup } from '@/utils/database/services/auth/addUser'
import { setPasswordSession } from '@/utils/lucia/setSession'
import { getPasswordUser } from '@/utils/database/services/auth/getExistingUser'

export async function emailLogin(_: any, formData: LoginFormData): Promise<ActionResult> {
	const { email, password } = formData

	const existingAccount = await getPasswordUser(email)
	if (!existingAccount) {
		return { error: 'Incorrect email' }
	}

	if (!existingAccount.hashed_password) {
		return {
			error: 'Password authentication is not enabled! Try logging in with OAuth Provider below!'
		}
	}
	const validPassword = await verify(existingAccount.hashed_password, password, hashPasswordParams)
	if (!validPassword) {
		return { error: 'Incorrect password' }
	}

	return await setPasswordSession(existingAccount.id)
}

// export async function forgotPwd(prevState: any, formData: ForgotPwdFormData) {
// 	const supabase = createClient()

// 	const data = {
// 		email: formData.email
// 	}

// 	const { error } = await supabase.auth.resetPasswordForEmail(data.email)

// 	if (error) {
// 		return { msg: error.toString() }
// 	}
// }

export async function emailSignup(_: any, formData: SignupFormData): Promise<ActionResult> {
	const { email, password } = formData
	const hashed_password = await hash(password, hashPasswordParams)
	const userId = await addUserViaSignup(email, hashed_password)

	return await setPasswordSession(userId)
}
const hashPasswordParams = {
	// recommended minimum parameters
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
}

interface ActionResult {
	error: string
}
