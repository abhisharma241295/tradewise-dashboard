import { SectionHeader } from "./SectionHeader";

export function Gallery() {
  return (
    <section className="max-w-3xl mx-auto">
      <SectionHeader title="Sweet Memories" pretext="Our Gallery" />
      <div className="grid grid-cols-4 gap-2 h-[500px]">
        {/* First column */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="text-center bg-[#CBCBBF] p-2 shrink-0">
            <h3 className="font-jost text-gray-700 border-8 border-white p-4">
              "We loved with a love that was more than love."
            </h3>
          </div>
          <div className="flex-1 min-h-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Wedding photo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Second column */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Wedding photo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        {/* Third column */}
        <div className="flex flex-col gap-2 min-h-0">
          
          <div className="flex-1 min-h-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Wedding photo"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center bg-[#E4D1CB] p-2 shrink-0">
            <h3 className="font-jost text-gray-700 border-8 border-white p-4">
            "A successful marriage requires falling in love many times, always with the same person."
            </h3>
          </div>
        </div>

        {/* Fourth column */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex-1 min-h-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Wedding photo"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 min-h-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Wedding photo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}