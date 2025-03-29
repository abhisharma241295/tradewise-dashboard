export default function BestFriend() {
  const friends = [
    { name: "Eleanor Chris", role: "Bridesmaid", image: "/theme2/b1.png" },
    { name: "Vanessa Brown", role: "Bridesmaid", image: "/theme2/b2.png" },
    { name: "Fredia Halle", role: "Bridesmaid", image: "/theme2/b3.png" },
    { name: "Stefano Smith", role: "Bridesmaid", image: "/theme2/w1.png" },
    { name: "Matthew Brown", role: "Bridesmaid", image: "/theme2/w2.png" },
    { name: "Pablo Dante", role: "Bridesmaid", image: "/theme2/w3.png" },
  ];

  return (
    <div className="w-full bg-[#FAF8F7] px-4 py-10 md:py-28">
      <p className="text-[12px] md:text-[14px] text-[#B08C3E] tracking-[5px] didact-gothic-regular text-center">
        BEST FRIENDS
      </p>
      <p className="text-[40px] md:text-[60px] text-[#1B1B1B] alex-brush-regular text-center">
        Thanks for being there
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 md:gap-10">
        {friends.map((friend, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img src={friend.image} alt={friend.name} className="h-40 w-40 rounded-full border-4 border-white shadow-lg" />
            <p className="text-[14px] md:text-[16px] didact-gothic-regular tracking-[3px]">{friend.name}</p>
            <p className="text-[18px] md:text-[22px] alex-brush-regular text-[#B08C3E]">{friend.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
