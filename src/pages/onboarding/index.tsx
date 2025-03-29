import React from "react"
import { SlidingPages } from "@/components/animation/SlidingPages"
import LocationPage from "./screens/location"
import Purpose from "./screens/purpose"
import SourcePage from "./screens/source"
import SendOnboardingData from "./screens/acknowledgement"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { cn } from "@/lib/utils/cn"

export default function DashboardPage() {
  return (
    <div className="flex h-screen flex-col p-4">
      <div className="container mx-auto flex h-full max-w-2xl flex-col justify-start pb-16 text-center md:mb-0 md:mt-16">
        <h1
          className={cn(
            cinzelDecorative.className,
            "text-5xl text-secondary-foreground"
          )}
        >
          Akitu Events
        </h1>
        {/* TODO - need to check border needed or not */}

        {/* <div className="mb-10 mt-16 h-px bg-border" /> */}
        <SlidingPages>
          <LocationPage />
          <Purpose />
          <SourcePage />
          <SendOnboardingData />
        </SlidingPages>
      </div>
    </div>
  )
}
