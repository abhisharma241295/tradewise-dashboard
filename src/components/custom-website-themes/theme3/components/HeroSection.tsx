export function HeroSection() {
  return (
    <section className="pt-12 min-h-screen">
      <div className="text-center mx-auto space-y-5" >
        <h1 className="font-monallesia-script text-5xl">Esabella & William</h1>
        <h2 className="font-monallesia-script text-lg">
          We Are Getting Married November 15,2022
        </h2>
      </div>
      <div className=" max-w-3xl mx-auto grid grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative aspect-[3/6] rounded-full overflow-hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Wedding photo"
              width={400}
              height={533}
              className="object-cover w-full h-full"
            />
            <div className="absolute m-2 inset-0 border border-white opacity-25 rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
