export default function SaveDate() {
	return (
		<div
			className="relative flex h-[500px] w-full items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: `url("/theme2/Background3.png")`,
			}}
		>
			<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white">
				<h2 className="text-[14px] tracking-[5px] didact-gothic-regular">
					SAVE THE DATE
				</h2>
				<p className="alex-brush-regular  mt-2 text-[60px]">
					Looking Forward to see you{" "}
				</p>
				<p className="didact-gothic-regular mt-2 text-[60px]">24.11.2024 </p>
			</div>
		</div>
	);
}
