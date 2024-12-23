import Link from 'next/link'
import ProfileDropdown from './ProfileDropdown'
import Links from './Links'
export default function Navbar() {
	return (
		<header>
			<nav className="navbar mt-1 max-w-screen-2xl mx-auto">
				<div className="flex-1">
					<Link href="/" className="text-3xl font-bold">
						Book my Event
					</Link>
				</div>
				<ul className="flex-none gap-10">
					<Links />
					<li key={'profile'}>
						<ProfileDropdown />
					</li>
				</ul>
			</nav>
		</header>
	)
}
