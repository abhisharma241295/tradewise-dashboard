export default function Ceremony() {
	return (
		<section className="bg-white md:px-28 px:4 md:py-28 py-6">
			<div className="mb-12 text-center">
				<p className="text-[14px] text-[#B08C3E] didact-gothic-regular tracking-[5px]">
					SAVE THE DATE
				</p>
				<p className="text-[40px] md:text=[60px] alex-brush-regular">
					When & Where
				</p>
			</div>
			<div className="grid md:grid-cols-2 grid-cols-1 grid-rows-2">
				<div className="flex items-center justify-center">
					<img src="/theme2/bride.png" alt="Wedding Ceremony" />
				</div>
				<div className="flex flex-col justify-center p-6">
					<p className="text-sm uppercase text-[#B08C3E] didact-gothic-regular tracking-[5px]">
						Are You Ready?
					</p>
					<h3 className="text-[40px] alex-brush-regular ">Wedding Ceremony</h3>
					<p className="text-[16px] didact-gothic-regular items-start">
						24 Dec 2022
					</p>
					<p className="text-gray-600 didact-gothic-regular">
						175 Broadway, Brooklyn NY
					</p>
					<p className="text-gray-600 didact-gothic-regular">12:00pm - 1:00pm</p>
				</div>
				<div className="flex flex-col justify-center p-6">
					<p className="text-sm uppercase text-[#B08C3E] didact-gothic-regular tracking-[5px]">
						Are You Ready?
					</p>
					<h3 className="text-[40px] alex-brush-regular ">Wedding Ceremony</h3>
					<p className="text-[16px] didact-gothic-regular items-start">
						24 Dec 2022
					</p>
					<p className="text-gray-600 didact-gothic-regular">
						175 Broadway, Brooklyn NY
					</p>
					<p className="text-gray-600 didact-gothic-regular">12:00pm - 1:00pm</p>
				</div>
				<div className="flex items-center justify-center ">
					<img src="/theme2/groom.png" alt="Wedding Party" />
				</div>
			</div>
		</section>
	);
}
