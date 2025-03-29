import { cn } from "@/lib/utils/cn";
import { Facebook, Twitter, Instagram, Heart } from "lucide-react";

type SocialMediaItem = {
  type: "Facebook" | "Twitter" | "Instagram";
  url: string;
};

type TextContent = {
  type: "text";
  className: string;
  text: string;
};

type CoupleInfo = {
  name: TextContent;
  role: string;
  description: TextContent;
  socialMedia: SocialMediaItem[];
  imageUrl: string;
};

type CoupleInfoProps = {
  couple: [CoupleInfo, CoupleInfo];
  bottomTitle: {
    className: string;
    text: string;
  };
  bottomSubtitle: TextContent;
};

interface Props {
  data: CoupleInfoProps;
  bgColor: string;
  primaryColor: string;
  compactMode: boolean;
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont: string;
}

export default function CoupleInfo({
  data,
  bgColor,
  primaryColor,
  compactMode,
  primaryFont,
  secondaryFont,
  tertiaryFont
}: Props) {
  return (
    <div className={cn("mx-auto pt-24", compactMode ? "px-4" : "px-16")} style={{ backgroundColor: bgColor }}>
      <div className={cn("max-w-5xl mx-auto grid md:grid-cols-2 gap-8", compactMode && "!grid-cols-1")}>
        {/* Bride Section */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 w-full max-w-xl relative flex">
            {/* Info Section */}
            <div className="flex-1 text-right">
              {/* Name and Heart */}
              <div className="mb-2">
                <div className="inline-flex items-center gap-2 justify-end">
                  <h2 className="text-3xl font-medium" style={{ fontFamily: tertiaryFont }}>
                    {data.couple[0].name.text}
                  </h2>
                  <Heart className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
              </div>

              {/* Title */}
              <div className="mb-2">
                <p className="italic text-2xl" style={{ color: primaryColor, fontFamily: primaryFont }}>
                  {data.couple[0].role}
                </p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-500 leading-relaxed text-base font-nunito" style={{ fontFamily: secondaryFont }}>
                  {data.couple[0].description.text}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex justify-end gap-4">
                {data.couple[0].socialMedia.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
                  >
                    {item.type === "Facebook" && (
                      <Facebook className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                    {item.type === "Twitter" && (
                      <Twitter className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                    {item.type === "Instagram" && (
                      <Instagram className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </a>
                ))}
              </div>
            </div>
            {/* Profile Image */}
            <div className="ml-4 flex-shrink-0">
              <div className="relative size-24">
                <img
                  src={data.couple[0].imageUrl}
                  alt="Bride"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Groom Section */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 w-full max-w-xl flex">
            {/* Profile Image */}
            <div className="mr-8 flex-shrink-0">
              <div className="relative size-24">
                <img
                  src={data.couple[1].imageUrl}
                  alt="Groom"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex-grow">
              <div className="max-w-sm">
                {/* Name and Heart */}
                <div className="mb-2">
                  <div className="inline-flex items-center gap-2">
                    <h2 className="text-3xl font-medium" style={{ fontFamily: tertiaryFont }}>
                      {data.couple[1].name.text}
                    </h2>
                    <Heart className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-2">
                  <p className="italic text-2xl" style={{ color: primaryColor, fontFamily: primaryFont }}>
                    {data.couple[1].role}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-500 leading-relaxed text-base font-nunito" style={{ fontFamily: secondaryFont }}>
                    {data.couple[1].description.text}
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4">
                  <div className="flex justify-end gap-4">
                    {data.couple[1].socialMedia.map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
                      >
                        {item.type === "Facebook" && (
                          <Facebook className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        )}
                        {item.type === "Twitter" && (
                          <Twitter className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        )}
                        {item.type === "Instagram" && (
                          <Instagram className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wedding Details */}
      <div className="text-center py-24">
        <h1 className="text-5xl italic" style={{ color: primaryColor, fontFamily: primaryFont }}>
          {data.bottomTitle.text}
        </h1>
        <p className="text-xl" style={{ fontFamily: tertiaryFont }}>
          {data.bottomSubtitle.text}
        </p>
      </div>
    </div>
  );
}
