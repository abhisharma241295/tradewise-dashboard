"use client"

import { useState } from "react"
import { cn } from "../../../utils";

type Tab = "all" | "ceremony" | "party"

const tabs: { value: Tab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ceremony", label: "Ceremony" },
  { value: "party", label: "Party" },
]

const images = [
  {
    src: "./rsvp-bg.png",
    alt: "Wedding couple portrait with sunlight",
    category: "ceremony",
  },
  {
    src: "./rsvp-bg.png",
    alt: "Wedding details flatlay with shoes and stationery",
    category: "ceremony",
  },
  {
    src: "./rsvp-bg.png",
    alt: "Wedding couple portrait by brick wall",
    category: "ceremony",
  },
  {
    src: "./rsvp-bg.png",
    alt: "Wedding cake with candles",
    category: "party",
  },
  {
    src: "./rsvp-bg.png",
    alt: "Reception table setting",
    category: "party",
  },
  {
    src: "./rsvp-bg.png",
    alt: "Wedding stationery details",
    category: "ceremony",
  },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Tab>("all")

  const filteredImages = images.filter((image) => activeTab === "all" || image.category === activeTab)

  return (
    <div className="min-h-screen text-black p-8">
      <h1 className="text-5xl font-serif text-[#C8A97E] mb-12 font-medium">Gallery</h1>

      <div className="flex gap-8 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "text-lg transition-colors",
              activeTab === tab.value ? "bg-[#C8A97E] px-4 py-2" : "text-gray-400 hover:text-[#C8A97E]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

