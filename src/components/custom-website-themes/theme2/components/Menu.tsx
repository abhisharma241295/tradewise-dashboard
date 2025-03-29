export default function Menu() {
	return (
		<div
			className="relative flex h-[500px] w-full items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: `url("/food-bg.png")`,
			}}
		>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
				<h2 className="text-[14px] didact-gothic-regular tracking-[5px]">
					FOOD MENU
				</h2>
				<p className="alex-brush-regular mt-2 text-[60px]">
					Click here to download menu
				</p>
				<button className="mt-4 px-6 py-2 bg-white text-[#BD945A] didact-gothic-regular text-sm hover:bg-opacity-90 transition-colors">
					DOWNLOAD NOW
				</button>
			</div>
		</div>
	);
}
