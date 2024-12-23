import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z
    .string()
    .refine(
      (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(value),
      {
        message:
          'Password must be between 8 to 20 characters and include at least one uppercase letter, one lowercase letter, and one number',
      }
    ),
})
export type LoginFormData = z.infer<typeof loginSchema>

export const forgotPwdSchema = z.object({
  email: z.string().email('Invalid email address format'),
})
export type ForgotPwdFormData = z.infer<typeof forgotPwdSchema>

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(value),
        {
          message:
            'Password must be between 8 to 20 characters and include at least one uppercase letter, one lowercase letter, and one number',
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export type SignupFormData = z.infer<typeof signupSchema>
