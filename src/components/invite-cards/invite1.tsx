/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils/cn"
// import {
//   playfairDisplay,
//   montserrat,
//   playfairDisplay1,
//   ephesis,
// } from "@/lib/utils/fonts"
import { InvitePageProps } from "@/types/InviteCard"
import { formatWeddingDate, getWeekday } from "./utils"

export default function Invite1({ invite }: InvitePageProps) {
  return (
    <section
      className="relative size-full text-center"
      style={{ fontFamily: invite.secondary_font.cssStyleName }}
    >
      <img
        src="/invites/invite1-bg.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-fill"
      />
      <img
        src="/invites/invite1-frame.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-fill"
      />
      <div className="relative z-10 flex flex-col items-center justify-center px-20 pb-16 pt-20">
        <p className="mt-16 text-sm uppercase text-[#6e6d57]">
          Please join us for the
        </p>
        <p className="text-base font-bold uppercase text-[#625F45]">
          Wedding Ceremony{" "}
        </p>
        <p className="text-sm uppercase text-[#6e6d57]">of</p>
        <p
          className="pr-16 pt-4 text-6xl text-[#E2968F]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          {invite?.groom_name.split(" ")[0]} &
        </p>
        <p
          className="pl-16 pt-4 text-7xl leading-7 text-[#E2968F]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          {invite?.bride_name.split(" ")[0]}
        </p>
        <p className="px-10 pt-10 text-sm uppercase text-[#6e6d57]">
          Request your company at their
        </p>
        <p className="text-base font-bold uppercase text-[#625F45]">
          Wedding Celebration{" "}
        </p>
        <p
          className="text-2xl text-[#6e6d57]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          on
        </p>
        <p className="text-sm uppercase text-[#6e6d57]">
          {getWeekday(invite?.wedding_date)}
        </p>
        <p className="text-sm uppercase text-[#6e6d57]">
          {formatWeddingDate(invite?.wedding_date)}
        </p>
        <p
          className="text-2xl text-[#6e6d57]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          at
        </p>
        <p
          className="text-3xl text-[#E2968F]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          {invite?.venue}
        </p>
        <p className="text-sm uppercase text-[#6e6d57]">{invite?.location}</p>
        <p className="text-sm uppercase text-[#6e6d57]">Reception To follow</p>
      </div>
    </section>
  )
}
