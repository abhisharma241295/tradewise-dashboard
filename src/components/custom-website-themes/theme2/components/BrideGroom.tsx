import { InstagramIcon, FacebookIcon, TwitterIcon } from "lucide-react";

export default function BrideGroom() {
	return (
		<section className="w-full bg-[#FAF8F7] px-4 md:py-28 py-6 gap-3">
			<div className="flex flex-col items-center justify-center text-center">
				<p className="text-[14px] text-[#B08C3E] didact-gothic-regular">
					BRIDE & GROOM
				</p>
				<p className="text-[60px] text-[#1B1B1B] alex-brush-regular">
					Happy <br /> Couple
				</p>
			</div>
			<div className="flex sm:flex-row flex-col items-center justify-center gap-4">
				<div className="flex md:w-1/4 sm:w-1/2 w-full flex-col items-center">
					<img
						src="/theme2/bride.png"
						alt="Bride"
						className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
					/>
					<h3 className="mt-4 text-[16px] text-[#1B1B1B] tracking-[3px] didact-gothic-regular">
						Marry Brown
					</h3>
					<h4 className="text-[24px] tracking-[3px] alex-brush-regular text-[#B08C3E]">
						The Bride
					</h4>
					<p className="mt-4 text-[16px] px-4 didact-gothic-regular text-[#666666]">
						Mary fringilla dui at elit finibus viverra nec alan. Seda couple the miss
						druane sema the wedding intono miss sollicitudin non the fermen.
					</p>
					<div className="flex flex-row text-[#666666] gap-4 mt-4">
						<div className="border rounded-full p-4">
							<FacebookIcon className="h-4 w-4" />
						</div>
						<div className="border rounded-full p-4">
							<TwitterIcon className="h-4 w-4" />
						</div>
						<div className="border rounded-full p-4">
							<InstagramIcon className="h-4 w-4" />
						</div>
					</div>
				</div>
				<div className="flex md:w-1/4 sm:w-1/2 w-full flex-col items-center text-center">
					<img
						src="/theme2/groom.png"
						alt="Groom"
						className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
					/>
					<h3 className="mt-4 text-[16px] text-[#1B1B1B] tracking-[3px] didact-gothic-regular">
						Brian Martin
					</h3>
					<h4 className="text-[24px] alex-brush-regular text-[#B08C3E]">
						The Groom
					</h4>
					<p className="mt-4 text-[16px] px-4 didact-gothic-regular text-[#666666]">
						Mary fringilla dui at elit finibus viverra nec alan. Seda couple the miss
						druane sema the wedding intono miss sollicitudin non the fermen.
					</p>
					<div className="flex flex-row text-[#666666] gap-4 mt-4">
						<div className="border rounded-full p-4">
							<FacebookIcon className="h-4 w-4" />
						</div>
						<div className="border rounded-full p-4">
							<TwitterIcon className="h-4 w-4" />
						</div>
						<div className="border rounded-full p-4">
							<InstagramIcon className="h-4 w-4" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
