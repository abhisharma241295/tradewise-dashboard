import { cn } from "@/lib/utils/cn";
import { MapPin, Clock, Hotel } from "lucide-react";

interface Props {
  data: any;
  primaryColor: string;
  bgColor: string;
  compactMode: boolean;
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont: string;
}
export default function QandA({
  data,
  primaryColor,
  bgColor,
  compactMode,
  primaryFont,
  secondaryFont,
  tertiaryFont
}: Props) {
  return (
    <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ backgroundColor: bgColor }}>
      <div className="text-left mb-6">
        {/* <h2 className="font-serif"> */}
          <h1 className="text-3xl italic" style={{color: primaryColor, fontFamily: primaryFont}}>
          {data.title.text}
        </h1>
          <span className={data.subtitle.className} style={{ fontFamily: tertiaryFont }}>
            {data.subtitle.text}
          </span>
        {/* </h2> */}
      </div>

      <div className={cn("grid gap-1.5", {
        'grid-cols-1': compactMode,
        'sm:grid-cols-2 md:grid-cols-3': !compactMode
      })}>
        {data.content.map((contentItem: any, i: number) => (
          <div key={i} className="bg-white group">
            <div className="aspect-[4/3] relative overflow-hidden">
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={contentItem.image.src}
                  alt={contentItem.image.alt}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="py-6 px-4">
              <h3 className="text-xl font-medium" style={{fontFamily:tertiaryFont}}>
                {contentItem.title}
              </h3>
              <div className="space-y-2 text-gray-500" style={{ fontFamily: secondaryFont }}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <p>{contentItem.text1.text}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <p>{contentItem.text2.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
