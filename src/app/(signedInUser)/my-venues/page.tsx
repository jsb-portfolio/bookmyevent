import { validateAuth } from '@/utils/lucia'
import ShowFormModalBtn from './ShowFormModalBtn'
import VenueForm from './VenueForm'
import { pool } from '@/utils/database/postgres'
import Venue from '@/components/Venue'

async function fetchVenues() {
	const { user } = await validateAuth()

	const venues = await pool.query('SELECT * FROM venues WHERE user_id = $1', [user.id])
	return venues.rows
}
export default async function MyVenuesPage() {
	const venues = await fetchVenues()
	return (
		<>
			<VenueForm />
			<div className="w-full m-6">
				<ShowFormModalBtn />
			</div>
			<div className="grid grid-cols-4 m-6 gap-y-8">
				{venues.map((venue) => (
					<Venue
						key={venue.id}
						id={venue.id}
						name={venue.name}
						address={venue.address}
						showEditAndDelete={true}
					/>
				))}
			</div>
		</>
	)
}
