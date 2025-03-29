export default function WeddingTimeline() {
  const timelineItems = [
    {
      number: "01",
      title: "CEREMONY",
      description:
        "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
    },
    {
      number: "02",
      title: "LUNCH TIME",
      description:
        "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
    },
    {
      number: "03",
      title: "PARTY",
      description:
        "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
    },
    {
      number: "04",
      title: "CAKE CUTTING",
      description:
        "Delta tristiu the jusone duise vitae diam neque nivami mis est augue artine aringilla the at elit finibus vivera.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-[#FAF8F7]">
      <div className="text-center mb-16">
        <h2 className="font-serif">
          <span className="block font-dancing-script text-4xl text-amber-700 mb-2">
            Wedding
          </span>
          <span className="block text-3xl tracking-wider">ORGANIZATION</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-white">
        {timelineItems.map((item, index) => (
          <div key={index} className="relative text-center px-4 py-8">
            {index !== 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#F6F1F0]"></div>
            )}
            <div
              className="text-5xl font-light mb-6 text-amber-700"
              style={{
                WebkitTextStroke: "1px currentColor",
                WebkitTextFillColor: "transparent",
              }}
            >
              {item.number}
            </div>
            <h3 className="text-xl font-serif tracking-wide mb-4">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="h-4 w-full !bg-grey-800 overflow-hidden">
        <img
          src="/reverse-timer-bg.png"
          alt="Wedding Timeline"
          className="w-full h-auto "
        />
      </div>
    </div>
  );
}
