export default function BestFriend() {
	const friends = [
		{ name: "Eleanor Chris", role: "Bridesmaid", image: "/theme2/b1.png" },
		{ name: "Vanessa Brown", role: "Bridesmaid", image: "/theme2/b2.png" },
		{ name: "Fredia Halle", role: "Bridesmaid", image: "/theme2/b3.png" },
		{ name: "Stefano Smiht", role: "Bridesmaid", image: "/theme2/w1.png" },
		{ name: "Matthew Brown", role: "Bridesmaid", image: "/theme2/w2.png" },
		{ name: "Pablo Dante", role: "Bridesmaid", image: "/theme2/w3.png" },
	];

	return (
		<div className="bg-[#FAF8F7] w-full p-20">
			<p className="text-[14px] text-[#B08C3E] tracking-[5px] didact-gothic-regular">
				BEST FRIENDS
			</p>
			<p className="text-[60px] text-[#1B1B1B] alex-brush-regular">
				Thanks for being there
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{friends.map((friend, index) => (
					<div key={index} className="flex flex-col items-center text-center">
						<img
							src={friend.image}
							alt={friend.name}
							className="h-40 w-40 rounded-full border-4 border-white shadow-lg"
						/>
						<p className="text-[16px] didact-gothic-regular tracking-[3px] mt-4">
							{friend.name}
						</p>
						<p className="text-[22px] alex-brush-regular text-[#B08C3E]">
							{friend.role}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
