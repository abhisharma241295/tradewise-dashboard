import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function EmptyListFallbackUI() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-16">
      <div className="w-[148px] h-[148px] relative mb-6 mt-20">
        <Image src="/images/EmptyListFallbackImage.svg" alt="Compliance Not Found" layout="fill" />
      </div>
      <h2 className="text-[18px] font-medium text-[#0E121B]">Compliance Data Not Found</h2>
      <p className="text-[14px] font-normal text-[#99A0AE] mb-4">Tradewise can help you check compliance compatibility.</p>
      <Button  className="text-[14px] font-medium text-[#525866] w-[142px] h-[36px] p-2 shadow-none border border-[#E1E4EA] bg-white hover:bg-white">
        Check Compliance</Button>
    </div>
  );
}