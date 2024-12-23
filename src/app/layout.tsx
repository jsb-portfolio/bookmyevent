import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/assets/globals.css'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Book my Event',
	description:
		'Book Events, Venues for all your confernce and conventention needs in one place. Also have members/invitees get registered through our automated system at Book my Event'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="bg-base-100 overflow-auto">
					<div className="min-h-screen flex flex-col max-w-screen-2xl mx-auto">
						<Navbar />
						{children}
					</div>
				</main>
			</body>
		</html>
	)
}
