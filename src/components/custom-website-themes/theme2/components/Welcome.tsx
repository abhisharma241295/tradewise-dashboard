import { Facebook, Twitter, Instagram, Heart } from "lucide-react";

export default function Welcome() {
	return (
		<section className="mt-[-50px] flex w-full max-w-2xl flex-col items-center md:mb-16 mb-4 text-center">
			<img
				src="/theme2/couple.png"
				alt="Couple"
				className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
			/>
			<h3 className="mt-4 text-[14px] text-[#B08C3E] didact-gothic-regular tracking-[5px]">
				HELLO & WELCOME
			</h3>
			<h4 className="md:text-[60px] text-[40px] text-[#1B1B1B] alex-brush-regular">
				We're getting married!
			</h4>
			<p className="mt-4 text-[16px] text-[#666] didact-gothic-regular mx-10 md:mx-0">
				Today and always, beyond tomorrow, I need you beside me, always as my best
				friend, lover and forever soul mate. Curabit aliquet orci elit genes
				tristique lorem commodo vitae. Tuliaum tincidunt nete sede gravida alisuan
				neque libero hendrerit magnation sit amet mollis lacus ithe maurise. Dunya
				erat couple wedding eda the semper. Event elit miss eget the solin miss
				citudino phasellus rutrum in the lacusi events vestibulum elen ornare drana
				company tortori eget the solin miss citudino sellus rutrum in lacus miss
				semper.
			</p>
		</section>
	);
}
