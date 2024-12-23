import Venue from '@/components/Venue'
import { pool } from '@/utils/database/postgres'

async function fetchVenues() {
	const venues = await pool.query('SELECT * FROM venues')
	return venues.rows
}
export default async function HomePage() {
	const venues = await fetchVenues()
	return (
		<>
			<div className="divider m-0" />
			<div className='w-full text-center text-primary font-semibold text-2xl'>Meeting & Event Venues</div>
			<div className="grid grid-cols-4 m-6 gap-y-8">
				{venues.map((venue) => (
					<Venue
						key={venue.id}
						id={venue.id}
						name={venue.name}
						address={venue.address}
						showEditAndDelete={false}
					/>
				))}
			</div>
		</>
	)
}
