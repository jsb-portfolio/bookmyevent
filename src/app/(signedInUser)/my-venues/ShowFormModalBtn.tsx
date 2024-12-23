'use client'
export default function ShowFormModalBtn({btnText = 'Add New Venue'}) {
	return (
			<button
				type="button"
				className="btn btn-sm btn-primary"
				onClick={() => (document.getElementById('add-venue-modal') as HTMLDialogElement).showModal()}
			>
				{btnText}
			</button>
	)
}
