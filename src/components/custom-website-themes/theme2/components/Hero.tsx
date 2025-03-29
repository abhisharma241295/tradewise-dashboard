import { Heart } from "lucide-react";
// import bannerImg from "../images/banner-bg.png";

export default function Hero() {
	return (
		<div
			className="flex lg:h-[800px] md:h-[500px] sm:h-[400px] h-[200px] w-full items-center justify-center"
			style={{
				backgroundImage: `url("/theme2/banner-bg.png")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "100%",
			}}
		>
			<div className=" text-white md:mt-20">
				<h2 className="md:text-[120px] text-[40px] alex-brush-regular">
					We hope to see you soon
				</h2>
				<p className="md:text-[16px] text-[12px] didact-gothic-regular">
					24 December, 2022 — New York
				</p>
			</div>
		</div>
	);
}
