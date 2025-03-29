import { SectionHeader } from "./SectionHeader"

export function WeddingParty() {
  const party = [
    { name: "Alexandra Campbell", role: "Bridesmaid"},
    { name: "David Cooper", role: "Groomsman" },
    { name: "Peter Meyer", role: "Groomsman" },
    { name: "Samantha Shaw", role: "Bridesmaid" },
    { name: "Jennifer Wilson", role: "Bridesmaid" },
    { name: "Henry Cooper", role: "Groomsman" },
    { name: "Robert Wilson", role: "Groomsman" },
    { name: "Margaret Russell", role: "Bridesmaid" },
  ]

  return (
    <section className="max-w-3xl mx-auto">
      <SectionHeader title="BRIDESMAIDS & GROOMSMEN" pretext="Important Persons" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {party.map((person, i) => (
          <div key={i} className="text-center space-y-1">
            <div className="relative size-40 mx-auto rounded-full overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
                alt={person.name}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
              <div className="absolute m-2 inset-0 border border-white opacity-40 rounded-full"></div>
            </div>
            <h4 className="!mt-4 font-medium font-monallesia-script text-[#323232]">{person.name}</h4>
            <p className="text-gray-400">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
