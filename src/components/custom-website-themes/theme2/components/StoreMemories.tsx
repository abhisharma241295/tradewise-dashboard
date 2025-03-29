export default function StoreMemories() {
  return (
    <div className="w-full px-4 py-10 md:py-28">
      <p className="text-[12px] md:text-[14px] text-[#B08C3E] didact-gothic-regular tracking-[5px] text-center">
        STORE IT IN YOUR GALLERY
      </p>
      <p className="text-[40px] md:text-[60px] alex-brush-regular text-center">
        Create Memories
      </p>

      {/* Filter Section */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-10">
        <p className="cursor-pointer bg-[#B08C3E] text-white px-4 py-2  didact-gothic-regular">
          All
        </p>
        <p className="cursor-pointer text-lg text-[#1B1B1B] didact-gothic-regular">
          Local Sightseeing
        </p>
        <p className="cursor-pointer text-lg text-[#1B1B1B] didact-gothic-regular">
          Food Accommodation
        </p>
      </div>

      {/* Image Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          <img src="/theme2/Sight1.png" alt="Couple" className="w-full h-auto  object-cover" />
          <img src="/theme2/Sight2.png" alt="Couple" className="w-full h-auto  object-cover" />
        </div>
        <div>
          <img src="/theme2/Sight3.png" alt="Couple" className="w-full h-auto  object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <img src="/theme2/Sight4.png" alt="Couple" className="w-full h-auto  object-cover" />
          <img src="/theme2/Sight5.png" alt="Couple" className="w-full h-auto  object-cover" />
        </div>
      </div>
    </div>
  );
}
