
export default function Invitation() {
	return (
		<div
			className="relative flex w-full items-center justify-center bg-cover bg-center"
			style={{
				backgroundImage: `url("/theme2/banner-bg.png")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "100%",
			}}
		>
			<div className="flex flex-col min-w-[40%] md:m-20 m-4 items-center rounded-lg bg-white p-8 md:p-[60px] text-center">
				<p className="text-[36px] didact-gothic-regular">R.S.V.P</p>
				<p className="mb-4 text-[30px] alex-brush-regular text-[#B08C3E]">
					Will you attend?
				</p>

				<form className="w-full flex flex-col gap-4">
					<input
						type="text"
						placeholder="Name"
						className="h-[45px] w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08C3E]"
						required
					/>
					<input
						type="email"
						placeholder="Email"
						className="h-[45px] w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08C3E]"
						required
					/>
					<input
						type="number"
						placeholder="Guests"
						className="h-[45px] w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08C3E]"
						required
					/>
					<textarea
						className="h-[130px] w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08C3E]"
						placeholder="Additional Notes"
						required
					/>
					<button
						type="submit"
						className="h-[47px] w-[102px] bg-[#B08C3E] font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#B08C3E] hover:bg-[#9d7a4f]"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
