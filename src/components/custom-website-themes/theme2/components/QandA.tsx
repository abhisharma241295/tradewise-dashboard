import { MapPin, Clock, Hotel } from "lucide-react";


export default function QandA() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-[#FAF8F7]">
      <div className="text-center mb-16">
        <h2 className="font-dancing-script text-[#C4A484] text-4xl mb-2">
          Questions
        </h2>
        <h1 className="font-cormorant text-3xl tracking-wider">WHEN & WHERE</h1>
      </div>

      <div className="grid gap-1 md:grid-cols-3">
        {/* Wedding Ceremony */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4 bg-white">
            <div className="aspect-[4/3] relative overflow-hidden ">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qm0bxbCguLdSkEzgkrFxnGOw9Xm3EU.png"
                alt="Wedding ceremony location"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-cormorant text-2xl tracking-wide">
                WEDDING CEREMONY
              </h3>
              <div className="space-y-2 text-neutral-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p>175 Broadway, Brooklyn, New York 11244, USA</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p>12:00am – 13:00pm</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
