'use client'
import { usePathname } from 'next/navigation'
import OAuthLogin from './login/OAuthLogin'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <>
      <div className="bg-base-200 flex-1 hero">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-right p-6 w-1/2">
            <h1 className="text-5xl font-bold">{pathname==="/login" ? "Welcome Back!" : "Sign up now"}</h1>
            <p className="py-6">
              Sign In or Create New Account to add new venues or manage your existing listings.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            {children}
            <OAuthLogin />
          </div>
        </div>
      </div>
    </>
  )
}
