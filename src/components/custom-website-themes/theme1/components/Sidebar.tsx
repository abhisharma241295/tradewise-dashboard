import React from 'react'
import { SidebarNav } from "./SidebarNav"
import { Leaf } from 'lucide-react'

interface Props {
  bgColor: string;
  primaryColor: string;
  primaryFont:string;
  secondaryFont:string;
  tertiaryFont:string;
}

export const Sidebar: React.FC<Props> = ({ bgColor, primaryColor, primaryFont, secondaryFont, tertiaryFont }) => {
  return (
    <div className="absolute top-0 left-0 w-64 p-8 flex flex-col items-center max-w-[inherit]" style={{ backgroundColor: bgColor, height: '100vh' }}>
      <div className="mb-2">
        <Leaf className="size-8 rotate-90" strokeWidth={1} />
      </div>

      <div className="text-center mb-8">
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: primaryFont, color: primaryColor }}>Olivia & Enrico</h1>
        <p className="text-xs tracking-widest" style={{ fontFamily: secondaryFont, color: primaryColor }}>15.11.2023</p>
      </div>

      <div style={{
        fontFamily: tertiaryFont}
      }>

      <SidebarNav/>
      </div>

      <div className="mt-auto text-center text-xs text-gray-500 space-y-1">
        <p style={{ color: primaryColor, fontFamily: secondaryFont }}>Olivia & Enrico wedding</p>
        <p style={{ fontFamily: secondaryFont }}>15 December 2023, New York</p>
      </div>
    </div>
  )
}
