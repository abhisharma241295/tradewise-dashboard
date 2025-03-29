import { SectionHeader } from "./SectionHeader";

const posts = [
  {
    id: 1,
    title: "Photography is the important part of wedding",
    date: "25 Mar 2023",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png",
    featured: true,
  },
  {
    id: 2,
    title: "Best Wedding Gown For Your Dream Day",
    date: "22 Mar 2023",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png",
  },
  {
    id: 3,
    title: "Top 10 wedding fresh flower decoration idea",
    date: "18 Mar 2023",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png",
  },
  {
    id: 4,
    title: "Best wedding gift you may like & choose",
    date: "25 Sep 2022",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png",
  },
];

export function NewsSection() {
  const [featured, ...regular] = posts;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader pretext={"Latest News"} title={"READ OUR WEDDING NEWS"} />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Featured Post */}
        <div className="md:col-span-3">
          <a href="#" className="group block">
            <div className="aspect-[16/10] overflow-hidden mb-4">
              <img
                src={
                  featured.img ||
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
                }
                alt={featured.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center font-jost">
                <div className="text-3xl sm:text-5xl font-semibold" style={{ WebkitTextStroke: '1px #323232', WebkitTextFillColor: 'transparent' }}>
                  25
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{"June"}</p>
              </div>
              <h4 className="text-lg sm:text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                {featured.title}
              </h4>
            </div>
          </a>
        </div>

        {/* Regular Posts */}
        <div className="md:col-span-2 space-y-6">
          {regular.map((post) => (
            <a key={post.id} href="#" className="flex gap-4 group items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden flex-shrink-0">
                <img
                  src={
                    post.img ||
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
                  }
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h4 className="font-jost text-sm sm:text-base font-regular group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#939580] mt-1">{post.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
