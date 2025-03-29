import React from 'react'
import { SidebarNav } from "./SidebarNav"
export const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white p-8 flex flex-col items-center !bg-[#F6F1F0]">
      <div className="mb-2">
        {/* SVgs */}
      </div>

      <div className="text-center mb-8">
        <h1 className="font-serif text-amber-700 text-xl mb-1">Olivia & Enrico</h1>
        <p className="text-xs tracking-widest">15.11.2023</p>
      </div>

      <SidebarNav />

      <div className="mt-auto text-center text-xs text-gray-500 space-y-1">
        <p>Olivia & Enrico wedding</p>
        <p>15 December 2023, New York</p>
      </div>
    </div>
  )
}
