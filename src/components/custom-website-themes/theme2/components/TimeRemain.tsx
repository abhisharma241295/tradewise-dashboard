
export default function TimeRemains() {
	return (
		<div
			className="relative flex h-[500px] w-full items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: `url("/theme2/BG2.png") `,
			}}
		>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
				<h2 className="text-[14px] tracking-[5px] didact-gothic-regular">
					WE WILL BECOME A FAMILY IN
				</h2>
				<p className="alex-brush-regular mt-2 md:text-[60px] text-[40px]">
					We're getting married in{" "}
				</p>
				<div className="flex flex-row gap-[60px]">
					<div className="md:text-[70px] text-[30px]">
						162
						<p className="flex flex-col text-[12px]">DAYS</p>
					</div>

					<div className="md:text-[70px] text-[30px]">
						19
						<p className="flex flex-col text-[12px]">HOURS</p>
					</div>

					<div className="md:text-[70px] text-[30px]">
						3<p className="flex flex-col text-[12px]">MINUTES</p>
					</div>

					<div className="md:text-[70px] text-[30px]">
						53
						<p className="flex flex-col text-[12px]">SECONDS</p>
					</div>
				</div>
			</div>
		</div>
	);
}
