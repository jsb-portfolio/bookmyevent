'use client'
import { addNewVenue } from './actions'

export default function VenueForm() {
	return (
		<dialog id="add-venue-modal" className="modal">
			<div className="modal-box">
				<form
					action={addNewVenue}
					method="POST"
					onSubmit={() => (document.getElementById('add-venue-modal') as HTMLDialogElement).close()}
				>
					{/* Name Input */}
					<div className="form-control">
						<label className="label" htmlFor="name">
							<span className="label-text">Name</span>
						</label>
						<input
							id="name"
							name="name"
							type="text"
							className="input input-bordered w-full"
							required
							autoFocus
						/>
					</div>

					<div className="form-control">
						<label className="label" htmlFor="address">
							<span className="label-text">Address</span>
						</label>
						<input
							id="address"
							name="address"
							type="text"
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="form-control">
						<label className="label" htmlFor="images">
							<span className="label-text">Images</span>
						</label>
						<input
							id="images"
							name="images"
							type="file"
							accept="image/*"
							multiple
							className="file-input file-input-bordered w-full max-w-xs"
						/>
					</div>
					<div className="modal-action">
						<button type="submit" className="btn btn-sm btn-primary">
							Save
						</button>
					</div>
				</form>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button type="submit">close</button>
			</form>
		</dialog>
	)
}
