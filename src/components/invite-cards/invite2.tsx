/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils/cn"
// import {
//   playfairDisplay,
//   montserrat,
//   playfairDisplay1,
// } from "@/lib/utils/fonts"
import { InvitePageProps } from "@/types/InviteCard"
import { formatWeddingDate, getWeekday } from "./utils"

export default function Invite2({ invite }: InvitePageProps) {
  return (
    <section
      className="relative size-full text-center"
      style={{ fontFamily: invite.secondary_font.cssStyleName }}
    >
      <img
        src="/invites/invite2-bg.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-fill"
      />
      <img
        src="/invites/invite2-frame.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-fill"
      />
      <div className="relative z-10 flex flex-col items-center justify-center px-12 py-16">
        <img
          src="/invites/invite2-icon.png"
          alt="Top Decoration"
          width="120"
          height="120"
          className="mx-auto"
        />

        <p
          className="pt-4 font-medium italic text-[#0B4881]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          Together with their families
        </p>
        <p
          className="pt-2 text-[50px] font-bold italic text-[#0B4881]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          {invite?.groom_name.split(" ")[0]} &{" "}
          {invite?.bride_name.split(" ")[0]}
        </p>
        <p
          className="pb-4 pt-4 text-lg text-[#0B4881]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          invite you to celebrate their wedding
        </p>

        <p
          className="text-[20px] font-[800] italic text-[#0E4686]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          {getWeekday(invite?.wedding_date)},{" "}
          {formatWeddingDate(invite?.wedding_date)}
        </p>
        <p
          className="pt-8 text-[20px] font-[800] italic text-[#0E4686]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          {invite?.venue}, {invite?.location}
        </p>
        <p
          className="italic tracking-wider text-[#0E4686]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          Reception To follow
        </p>
      </div>
    </section>
  )
}
