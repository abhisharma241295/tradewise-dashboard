
export default function OurStory() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #E5E5E5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.5,
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left column with photo */}
          <div className="relative w-full md:w-[520px]">
            {/* Gold frame */}
            <div className="absolute -inset-4 border border-[#B38B3F] z-0" />

            {/* Photo container */}
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qm0bxbCguLdSkEzgkrFxnGOw9Xm3EU.png"
                alt="Wedding photo"
                className="w-full relative z-10"
              />

              {/* Circular text overlay */}
              <div className="absolute top-4 right-4 w-32 h-32 z-20">
                <div className="relative w-full h-full">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full transform -rotate-12"
                  >
                    <path
                      id="curve"
                      d="M 25,50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0"
                      fill="none"
                      className="text-black"
                    />
                    <text className="text-[8px] fill-black uppercase tracking-[0.2em]">
                      <textPath href="#curve" startOffset="0%">
                        Olivia & Enrico • 15.11.2021 •
                      </textPath>
                    </text>
                  </svg>
                  {/* Small floral element */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-xl">
                    ❋
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with text */}
          <div className="flex-1 space-y-8">
            <h1
              className="text-[#B38B3F] text-5xl font-script"
            >
              Our love.
            </h1>

            <div className="space-y-6 text-gray-600">
              <p>
                Curabit aliquet orci elit genes tristique lorem commodo vitae.
                Tuliaum tincidunt nete sede gravida aliquam, neque libero
                hendrerit magna, sit amet mollis lacus ithe maurise. Dunya erat
                volutpat edat themo the druanye semper.
              </p>

              <p>
                Luality fringilla duiman at elit vinibus viverra nec a lacus
                themo the druanye sene sollicitudin mi suscipit non sagie the
                fermen.
              </p>

              <p>
                Phasellus viverra tristique justo duis vitae diam neque nivamus
                ac est augue artine aringilla dui at elit finibus viverra nec a
                lacus. Nedana themo eros odio semper soe suscipit non. Curabit
                aliquet orci elit genes tristique.
              </p>

              <p>
                Luality fringilla duiman at elit finibus viverra nec a lacus
                themo the druanye sene sollicitudin mi suscipit non sagie the
                fermen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
