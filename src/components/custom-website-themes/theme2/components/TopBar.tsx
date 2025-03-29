import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons for the menu toggle

export default function TopBar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="flex w-full items-center justify-between bg-white px-6 py-4 shadow-md">
			<h1 className="text-[36px] alex-brush-regular">Mary & Brian</h1>
			<nav className="hidden md:flex">
				<ul className="flex space-x-6 didact-gothic-regular text-[16px]">
					{[
						"Home",
						"Couple",
						"Story",
						"Friends",
						"Events",
						"Gallery",
						"When & Where",
						"R.S.V.P",
						"Blog",
					].map((item) => (
						<li key={item}>
							<a
								href="#"
								className="hover:text-[#B08C3E] transition-colors duration-300"
							>
								{item}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<button
				className="md:hidden focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Toggle Menu"
			>
				{isOpen ? <X size={28} /> : <Menu size={28} />}
			</button>
			{isOpen && (
				<nav className="absolute left-0 top-16 z-50 w-full bg-white shadow-md md:hidden">
					<ul className="flex flex-col items-center space-y-4 py-6 didact-gothic-regular text-[16px]">
						{[
							"Home",
							"Couple",
							"Story",
							"Friends",
							"Events",
							"Gallery",
							"When & Where",
							"R.S.V.P",
							"Blog",
						].map((item) => (
							<li key={item}>
								<a
									href="#"
									className="hover:text-[#B08C3E] transition-colors duration-300"
									onClick={() => setIsOpen(false)}
								>
									{item}
								</a>
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
}
