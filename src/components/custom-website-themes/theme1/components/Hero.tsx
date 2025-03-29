import { Heart } from "lucide-react";
export default function Hero({
  data,
  primaryFont,
  secondaryFont
}: {
  primaryFont:string;
  secondaryFont:string;
  data: {
    title: { type: string; text: string; className: string };
    description: { type: string; text: string; className: string };
    icon: React.ReactNode;
    bgImageUrl: string;
  };
}) {
  return (
    <main className="flex-1 relative overflow-hidden h-screen">
      <div className="absolute inset-0">
        <img
          src={data.bgImageUrl}
          alt="Wedding background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className={data.title.className}  style={{ fontFamily: primaryFont }}>{data.title.text}</h1>
        <p className={data.description.className} style={{ fontFamily: secondaryFont }}>
          {data.description.text}
        </p>
        <div className="absolute bottom-12 text-white">
          <Heart />
        </div>
      </div>
    </main>
  );
}
