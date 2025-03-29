"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type Tab = "all" | "ceremony" | "party";

interface Props {
  data: any;
  bgColor: string;
  primaryColor: string;
  compactMode: boolean;
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont: string;
}

export default function Gallery({
  data,
  bgColor,
  primaryColor,
  compactMode,
  primaryFont,
  secondaryFont ,
  tertiaryFont
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filteredImages = data.images.filter(
    (image: any) => activeTab === "all" || image.category === activeTab
  );

  return (
    <div className="text-black p-8">
      <h2 className="font-serif mb-5">
        <span
          className={data.title.className}
          style={{ color: primaryColor, 
            fontFamily: primaryFont

          }}
        >
          {data.title.text}
        </span>
        <span className={data.subtitle.className}
        style={{fontFamily: tertiaryFont}}
        >
          {data.subtitle.text}
        </span>
      </h2>
      <div className="flex gap-8 mb-12">
        {data.tabs.map((tab: any) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "text-lg transition-colors",
              activeTab === tab.value ? "px-4 py-2" : "text-gray-400"
            )}
            style={{
              backgroundColor:
                activeTab === tab.value ? primaryColor : "transparent",
              color: activeTab === tab.value ? "white" : "inherit",
              // ":hover": {
              //   color: primaryColor,
              // },
              fontFamily: secondaryFont
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", compactMode && "!grid-cols-2")}>
        {filteredImages.map((image: any, index: number) => (
          <div
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
