// components/AuthLayout.tsx
import React, { ReactNode } from "react"
import Image from "next/image"
import getAuthPoster from "@/lib/raw-data/authPosters"
import { useAppSelector } from "@/lib/redux/hooks"
type AuthLayoutProps = {
  children: ReactNode
  pathName: string
}

export default function AuthLayout({ children, pathName }: AuthLayoutProps) {
  const page: number = useAppSelector(
    (state) => state.onboardingSliderReducer.page
  )
  return (
    <div className="relative flex max-h-screen overflow-hidden">
      {/* Left side - video with dark cyan tint */}
      <div className="relative hidden h-screen w-full flex-1 flex-col justify-between p-4 xl:flex">
        <Image
          src={getAuthPoster(pathName, page)}
          alt={""}
          className="size-full rounded-xl object-cover"
          height={500}
          width={500}
        ></Image>
      </div>

      {/* Right side - scrollable content */}
      <div className="h-screen w-full overflow-auto bg-[hsl(var(--background))] xl:w-1/2">
        {children}
      </div>
    </div>
  )
}
