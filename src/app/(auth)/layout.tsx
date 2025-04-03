"use client";
// import Button from "@/components/common/button";
import Image from "next/image";
import { GlobeIcon, ChevronDownIcon, HeadphonesIcon } from "lucide-react";
import Stepper from "@/components/common/stepper";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen relative md:overflow-hidden">
      <Toaster theme="system" richColors position="top-right" />
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center border-b bg-white border-[#E1E4EA] z-[50]">
        <div className="w-full px-11 py-6 flex justify-between items-center">
          <Image
            src="/icons/synergy.svg"
            alt="Synergy logo"
            width={40}
            height={40}
          />
          {pathname.includes("onboarding") && <Stepper />}
          <div className="flex items-center space-x-4 text-sm">
            <p className="hidden md:block">Need help?</p>{" "}
            <Button className="px-4 rounded-lg" variant={"outline"} size={"lg"}>
              <HeadphonesIcon />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <div className="h-screen background-grid">{children}</div>
      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end px-4"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundSize: "cover",
          height: "280px",
          width: "100%",
        }}
      >
        <div className="w-full px-12 py-8 flex justify-between items-center">
          <p className="text-[#E1E4EA] text-sm">@2025 Tradewise</p>
          <div className="flex flex-col items-end text-sm">
            <p className="flex items-center pl-2 text-[#E1E4EA] text-sm ">
              <GlobeIcon className="h-5 w-5 pr-1" />
              ENG
              <ChevronDownIcon className="h-5 w-5 " />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
