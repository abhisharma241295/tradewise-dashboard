import { cn } from "@/lib/utils/cn";

export default function OurStory({
  data,
  primaryColor,
  bgDotsColor,
  compactMode,
  primaryFont,
  secondaryFont,
  tertiaryFont
}: {
  data: any;
  primaryColor: string;
  bgDotsColor: string;
  compactMode: boolean;
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont: string;
}) {
  return (
    <div className={cn("container mx-auto max-w-5xl flex flex-col md:flex-row px-4", compactMode&&"!flex-col")}>
      <div className={cn("w-full md:w-1/2 relative mb-8 md:mb-0", compactMode&&"md:w-full")}>
        <div
          className="absolute inset-0 md:mr-12"
          style={{
            backgroundImage:
              "radial-gradient(circle, #E5D4BD 2px, transparent 2px)",
            backgroundSize: "20px 20px",
            opacity: 1,
          }}
        />
        <div className="absolute inset-4 mt-24 ml-16 border-8" style={{ borderColor: primaryColor}} />
        <div className="relative m-12">
          <img
            src={data.image.src}
            alt={data.image.alt}
            className="w-full relative z-10"
          />
          {/* Circular text overlay */}
          <div className="absolute top-4 right-4 w-24 md:w-32 h-24 md:h-32 z-20">
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
                    {data.circularText}
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

      <div className={cn("w-full md:w-1/2 p-4 md:p-8 flex flex-col items-start justify-center", compactMode&&"md:w-full")}>
        <h2 className="font-serif">
          <span className={data.title.className} style={{ color: primaryColor , fontFamily:primaryFont}}>
            {data.title.text}
          </span>
          <span className={data.subtitle.className} style={{ fontFamily: tertiaryFont }}>
            {data.subtitle.text}
          </span>
        </h2>
        <p className={cn("mt-4 text-gray-500")} style={{ fontFamily: secondaryFont}}>
          {data.description}
        </p>
      </div>
    </div>
  );
}
