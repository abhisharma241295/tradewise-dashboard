import { Leaf } from "lucide-react";

interface Props {
  data: any;
  primaryColor: string;
  bgColor: string;
  primaryFont: string;
  secondaryFont: string;
}

export default function Footer({ data, primaryColor, bgColor, primaryFont, secondaryFont }: Props) {
  return (
    <footer className={`flex flex-col items-center justify-center py-8 px-4 space-y-3 bg-[${bgColor}]`}>
      <div className="text-gray-800" style={{ color: primaryColor }}>
        <Leaf className="w-12 h-12 rotate-90" strokeWidth={1} />
      </div>
      <h2 className={data.text.className} style={{ color: primaryColor, fontFamily: primaryFont }}>{data.text.text}</h2>
      <p className="font-serif text-base text-gray-500 italic" style={{ fontFamily: secondaryFont }}>{data.date.text}</p>
    </footer>
  );
}