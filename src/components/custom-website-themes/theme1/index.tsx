import React, { useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import CoupleInfo from "./components/CoupleInfo";
import Hero from "./components/Hero";
import ReverseTimer from "./components/ReverseTimer";
import OurStory from "./components/OurStory";
import WeddingDate from "./components/WeddingDate";
import WeddingTimeline from "./components/WeddingTimeline";
import Gallery from "./components/Gallery";
import QandA from "./components/QandA";
import RsvpForm from "./components/RsvpForm";
import FoodMenu from "./components/FoodMenu";
import { MarqueeDemo } from "./components/MarqueeDemo";
import Footer from "./components/Footer";
import { injectFontStyles } from "./styles/fonts";
import { useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils/cn";

interface Props{
  compactMode:boolean
}

export const Theme1: React.FC<Props> = ({compactMode}) => {
  useEffect(() => {
    injectFontStyles();
  }, []);
  const value= useAppSelector((state) => state.theme1);
  return (
    <div className="flex min-h-screen w-full relative">
      {/* Desktop Sidebar */}
      {!compactMode&&<div className="hidden lg:block">
        <Sidebar
          bgColor={value.secondaryColor}
          primaryColor={value.primaryColor}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}
        />
      </div>}

      {/* Main Content */}
      <div className={cn("flex-1 overflow-auto ",!compactMode&&"lg:ml-64")}>
        {value.sections[0].enabled && <Hero data={value.sections[0].children} primaryFont={value.primaryFont.cssStyleName} secondaryFont={value.secondaryFont.cssStyleName} />}
        {value.sections[1].enabled && <CoupleInfo
          data={value.sections[1].children}
          bgColor={value?.custom_utils?.quaternaryColor || "#FAF8F7"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
          compactMode={compactMode}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}

        />}
        {value.sections[2].enabled && <ReverseTimer
          data={value.sections[2].children}
          bgColor={value?.custom_utils?.tertiaryColor || "#F7F3F0"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
        />}
        {value.sections[3].enabled && <OurStory
          data={value.sections[3].children}
          bgDotsColor={value?.custom_utils?.quaternaryColor || "#FAF8F7"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
          compactMode={compactMode}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}  
        />}
        {value.sections[4].enabled && <WeddingDate
          data={value.sections[4].children}
          bgColor={value?.custom_utils?.tertiaryColor || "#F7F3F0"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
        />}
        {value.sections[5].enabled && <WeddingTimeline
          data={value.sections[5].children}
          bgColor={value?.custom_utils?.quaternaryColor || "#FAF8F7"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
          compactMode={compactMode}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}
        />}
        {value.sections[6].enabled && <Gallery
          data={value.sections[6].children}
          bgColor={value?.custom_utils?.tertiaryColor || "#F7F3F0"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
          compactMode={compactMode}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}
        />}
        {value.sections[7].enabled && <QandA
          data={value.sections[7].children}
          bgColor={value?.custom_utils?.quaternaryColor || "#FAF8F7"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
          compactMode={compactMode}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}
        />}
        {value.sections[6].enabled && <Gallery
          data={value.sections[6].children}
          bgColor={value?.custom_utils?.tertiaryColor || "#F7F3F0"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
          compactMode={compactMode}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}
        />}
        {value.sections[8].enabled && <FoodMenu
          data={value.sections[8].children}
          bgColor={value?.custom_utils?.quaternaryColor || "#FAF8F7"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
          tertiaryFont={value.custom_utils.tertiaryFont.cssStyleName}
        />}
        {value.sections[9].enabled && <RsvpForm
          data={value.sections[9].children}
          bgColor={value?.custom_utils?.quaternaryColor || "#FAF8F7"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
        />}
        {value.sections[10].enabled && <MarqueeDemo />}
        {value.sections[11].enabled && <Footer
          data={value.sections[11].children}
          bgColor={value?.custom_utils?.quaternaryColor || "#FAF8F7"}
          primaryFont={value.primaryFont.cssStyleName}
          secondaryFont={value.secondaryFont.cssStyleName}
          primaryColor={value.primaryColor}
        />}
      </div>
    </div>
  );
};
