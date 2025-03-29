import { Leaf } from "lucide-react";
export default function Footer() {
    return (
      <footer className="flex flex-col items-center justify-center py-8 px-4 space-y-3 bg-[#FAF8F7]">
        <div className="text-gray-800">
          <Leaf className="w-12 h-12 rotate-90" strokeWidth={1} />
        </div>
        <h2 className="font-serif text-xl md:text-2xl text-gray-800 font-medium">Olivia & Enrico</h2>
        <p className="font-serif text-sm text-gray-500 italic">December 15, 2023 — New York, Brooklyn</p>
      </footer>
    )
  }