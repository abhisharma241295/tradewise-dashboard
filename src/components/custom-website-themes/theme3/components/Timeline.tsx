import { SectionHeader } from "./SectionHeader";

export function Timeline() {
  return (
    <section className="max-w-4xl mx-auto">
      <SectionHeader title="WHEN & WHERE" pretext="Our Celebration" />
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto border-2 border-[#EEE1DD]">
          {/* The Reception */}
          <div className="aspect-square relative overflow-hidden border-2 border-[#EEE1DD] p-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9C33ECxPIII33SBfYpiocGYToKd0EF.png"
              alt="Wedding couple"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-[#323232] font-monallesia-script text-xl font-serif bg-white/40 p-2">
                  The Reception
                </h2>
              </div>
            </div>
          </div>

          {/* Center Details 1 */}
          <div className="aspect-square bg-white flex flex-col items-center justify-center text-center border-2 border-[#EEE1DD]">
            <div className="space-y-2">
              <p className="text-[#828282] font-jost text-lg">Monday, 12 Apr. 2022</p>
              <p className="text-[#828282] font-jost text-lg">1:00 PM — 2:30 PM</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#828282] font-jost">4517 Washington Ave.</p>
              <p className="text-[#828282] font-jost">Manchester, Kentucky 39495</p>
            </div>
            <p className="text-[#828282] font-jost">+1 234-567-8910</p>
            <button className="text-[#D4B0A5] font-jost hover:underline mt-4 transition-colors">
              See Location
            </button>
          </div>

          {/* The Party */}
          <div className="aspect-square relative overflow-hidden border-2 border-[#EEE1DD] p-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9C33ECxPIII33SBfYpiocGYToKd0EF.png"
              alt="Wedding couple"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-[#323232] font-monallesia-script text-xl font-serif bg-white/40 p-2">
                  The Party
                </h2>
              </div>
            </div>
          </div>

          {/* Details 2 */}
          <div className="aspect-square bg-white flex flex-col items-center justify-center text-center border-2 border-[#EEE1DD]">
            <div className="space-y-2">
              <p className="text-[#828282] font-jost text-lg">Monday, 12 Apr. 2022</p>
              <p className="text-[#828282] font-jost text-lg">1:00 PM — 2:30 PM</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#828282] font-jost">4517 Washington Ave.</p>
              <p className="text-[#828282] font-jost">Manchester, Kentucky 39495</p>
            </div>
            <p className="text-[#828282] font-jost">+1 234-567-8910</p>
            <button className="text-[#D4B0A5] font-jost hover:underline mt-4 transition-colors">
              See Location
            </button>
          </div>

          {/* The Ceremony */}
          <div className="aspect-square relative overflow-hidden border-2 border-[#EEE1DD] p-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9C33ECxPIII33SBfYpiocGYToKd0EF.png"
              alt="Wedding couple"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-[#323232] font-monallesia-script text-xl font-serif bg-white/40 p-2">
                  The Ceremony
                </h2>
              </div>
            </div>
          </div>

          {/* Details 3 */}
          <div className="aspect-square bg-white flex flex-col items-center justify-center text-center border-2 border-[#EEE1DD]">
            <div className="space-y-2">
              <p className="text-[#828282] font-jost text-lg">Monday, 12 Apr. 2022</p>
              <p className="text-[#828282] font-jost text-lg">1:00 PM — 2:30 PM</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#828282] font-jost">4517 Washington Ave.</p>
              <p className="text-[#828282] font-jost">Manchester, Kentucky 39495</p>
            </div>
            <p className="text-[#828282] font-jost">+1 234-567-8910</p>
            <button className="text-[#D4B0A5] font-jost hover:underline mt-4 transition-colors">
              See Location
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
