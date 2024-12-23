'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Links() {
	const pathname = usePathname()
	const headerLinks = [
		{
			title: 'Home',
			path: '/'
		},
		{
			title: 'My Venues',
			path: '/my-venues'
		},
		{
			title: 'About',
			path: '/about'
		}
	]
	return (
		<>
			{headerLinks.map((link) => (
				<li key={link.title} className={pathname === link.path ? 'text-primary' : 'link-hover'}>
					<Link href={link.path}>{link.title}</Link>
				</li>
			))}
		</>
	)
}
