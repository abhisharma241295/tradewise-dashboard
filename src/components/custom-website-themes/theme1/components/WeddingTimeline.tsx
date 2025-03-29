import { cn } from "@/lib/utils/cn";

interface Props {
  bgColor: string;
  primaryColor: string;
  data: any;
  compactMode: boolean;
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont: string;
}

export default function WeddingTimeline({
  data,
  primaryColor,
  bgColor,
  compactMode,
  primaryFont,
  secondaryFont,
  tertiaryFont
}: Props) {
  return (
    <div className="max-w-7x px-4 py-16 sm:px-6 lg:px-8" style={{ backgroundColor: bgColor }}>
      <div className="text-left mb-8">
        {/* <h2 className="font-serif"> */}
          <h1 className="text-3xl italic" style={{color: primaryColor, fontFamily: primaryFont}}>
          {data.title.text}
        </h1>
          <span className={data.subtitle.className} style={{fontFamily:tertiaryFont}}>
            {data.subtitle.text}
          </span>
        {/* </h2> */}
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white", compactMode && "!grid-cols-2")}>
        {data.events.map((item: any, index: number) => (
          <div key={index} className="relative text-left px-4 py-8">
            {index !== 0 && (
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#F6F1F0]"></div>
            )}
            <div
              className="text-8xl font-cormorant font-medium mb-2"
              style={{
                WebkitTextStroke: "1px currentColor",
                WebkitTextFillColor: "transparent",
                color: primaryColor,
              }}
            >
              {item.number}
            </div>
            <h3 className="text-xl tracking-wide mb-4" style={{fontFamily: tertiaryFont}}>
              {item.title}
            </h3>
            <p className="text-gray-500 leading-relaxed" style={{ fontFamily: secondaryFont }}>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="h-4 w-full !bg-grey-800 overflow-hidden">
        <img
          src={data.bgImageUrl}
          alt="Wedding Timeline"
          className="w-full h-auto "
        />
      </div>
    </div>
  );
}
