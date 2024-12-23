export default function AboutPage() {
	return (
		<div className="bg-base-200 flex-1 hero">
			<div className="hero-content flex-col lg:flex-row">
				<img src="/about.webp" className="max-w-sm rounded-lg shadow-2xl" alt="About" />
				<div>
					<h1 className="text-5xl font-bold">Browse for Venues for your Meetings & Events</h1>
					<p className="py-6">
						The right venue can make all the difference. We're dedicated to helping you find the
						perfect space to host successful meetings, memorable events, and impactful gatherings.
						Explore our diverse collection and let us help you create an experience that resonates.
					</p>
				</div>
			</div>
		</div>
	)
}
