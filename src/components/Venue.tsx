import { deleteVenue } from '@/app/(signedInUser)/my-venues/actions'
import ShowFormModalBtn from '@/app/(signedInUser)/my-venues/ShowFormModalBtn'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

export default async function Venue({ id, name, address, showEditAndDelete }) {
	const imagePaths: string[] = []
	try {
		// 1. Determine the directory path
		const relativeUploadDir = join('uploads', 'venues', id) // Relative to the 'public' directory
		const uploadDir = join(process.cwd(), 'public', relativeUploadDir)

		// 2. Read the directory contents
		const filenames = await readdir(uploadDir)
		for (const filename of filenames) {
			imagePaths.push(join('/uploads', 'venues', id, filename))
		}
	} catch (error) {
		imagePaths.push(join('/no-image.jpg'))
	}
	return (
		<div className="card card-compact bg-base-200 w-72 shadow-xl group">
			{imagePaths.length === 1 ? (
				<figure>
					<img src={imagePaths[0]} alt={name} />
				</figure>
			) : (
				<div className="carousel w-full">
					{imagePaths.map((path, index) => (
						<div key={path} id={`slide${index + 1}`} className="carousel-item relative w-full">
							<img src={path} alt={`${name}-${index}`} />

							<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<a
									href={`#slide${index === 0 ? imagePaths.length : index}`}
									className="btn btn-circle"
								>
									❮
								</a>
								<a
									href={`#slide${index === imagePaths.length - 1 ? 1 : index + 2}`}
									className="btn btn-circle"
								>
									❯
								</a>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p>{address}</p>
				{showEditAndDelete && (
					<form className="card-actions justify-end">
						<input type="hidden" name="id" value={id} />
						{/* <ShowFormModalBtn btnText="Edit" /> */}
						<button type="submit" className="btn btn-sm btn-error" formAction={deleteVenue}>
							Delete
						</button>
					</form>
				)}
			</div>
		</div>
	)
}
