import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
type OAuthProvider = {
  name: string
  icon?: JSX.Element
  apiRoute: string
}

export default function OAuthLogin() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: 'Google',
      icon: <FcGoogle className="size-5" />,
      apiRoute: '/api/auth/google',
    },
    {
      name: 'GitHub',
      icon: <FaGithub className="size-5" />,
      apiRoute: '/api/auth/github',
    },
  ]

  return (
    <>
      <div className="card-body flex-col pt-0 gap-2">
        {oAuthProviders.map((provider) => (
          <Link
            key={provider.name}
            href={provider.apiRoute}
            className="btn btn-ghost w-full text-xl"
            type="submit">
            {provider.icon}
            Login with {provider.name}
          </Link>
        ))}
      </div>
    </>
  )
}
