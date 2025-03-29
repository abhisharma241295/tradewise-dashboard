import { Heart } from "lucide-react";

export default function WeddingDate({
  data,
  bgColor,
  primaryFont,
  secondaryFont
}: {
  data: any;
  bgColor: string;
  primaryFont: string;
  secondaryFont: string;
}) {
  return (
    <div className="relative h-72 w-full overflow-hidden">
      <img
        src={data.bgImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
        <div className="text-center">
          <Heart className="text-white mb-2 size-8 mx-auto" />
          <h2 className={data.title.className} style={{ fontFamily: primaryFont }}>
            {data.title.text}
          </h2>
          <div className={data.date.className} style={{ fontFamily: secondaryFont }}>
            {data.date.text}
          </div>
        </div>
      </div>
    </div>
  );
}
