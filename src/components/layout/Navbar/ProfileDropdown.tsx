import { validateAuth } from '@/utils/lucia'
import Link from 'next/link'
import { logout } from './logout'
import { getAvatar } from '@/utils/database/services/auth/getAvatar'

export default async function ProfileDropdown() {
	const { user } = await validateAuth()
	const avatar_url = user ? await getAvatar(user.id) : null
	return (
		<>
			{user ? (
				<details className="dropdown dropdown-end">
					<summary role="button" className="avatar btn btn-circle btn-ghost">
						<div className="w-10 rounded-full">
							<img src={avatar_url} alt="Profile Avatar" />
						</div>
					</summary>
					<ul className="menu dropdown-content menu-sm z-[1] mt-5 w-52 rounded-box bg-base-200 p-2 shadow">
						{/* <li>
							<Link href="/profile" className="justify-between">
								Profile
								<span className="badge">New</span>
							</Link>
						</li>
						<li>
							<Link href="/settings">Settings</Link>
						</li> */}
						<form action={logout}>
							<li>
								<button type="submit">Logout</button>
							</li>
						</form>
					</ul>
				</details>
			) : (
				<Link href="/login" className="btn btn-primary btn-sm h-10 w-24">
					Login
				</Link>
			)}
		</>
	)
}
