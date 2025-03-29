/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils/cn"
// import { ubuntu, meowScript } from "@/lib/utils/fonts"
import { InvitePageProps } from "@/types/InviteCard"
import { formatWeddingDate, getDateOrMonthOrYear, getInitials } from "./utils"

export default function Invite3({ invite }: InvitePageProps) {
  return (
    <section
      className="relative size-full text-center"
      style={{ fontFamily: invite.secondary_font.cssStyleName }}
    >
      <img
        src="/invites/invite3-frame.png"
        alt="Frame"
        className="absolute inset-0 h-full w-full object-fill"
      />
      <div className="relative z-10 flex flex-col items-center justify-center px-12 py-5">
        <p
          className="-rotate-12 pr-16 text-[80px] text-[#2294C4]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          {invite?.groom_name.split(" ")[0]}
        </p>
        <p
          className="-rotate-12 pl-28 text-[80px] leading-8 text-[#2294C4]"
          style={{ fontFamily: invite.primary_font.cssStyleName }}
        >
          <span className="text-[50px]"> & </span>
          {invite?.bride_name.split(" ")[0]}
        </p>

        <div className="relative mt-8 flex w-full items-center justify-center gap-8">
          <div className="flex flex-col items-start text-[20px] font-semibold text-[#2294C4]">
            <p>{getDateOrMonthOrYear(invite?.wedding_date, "day")}</p>
            <p>{getDateOrMonthOrYear(invite?.wedding_date, "month")}</p>
            <p>{getDateOrMonthOrYear(invite?.wedding_date, "year")}</p>
          </div>
          <img
            src="/invites/invite3-couple.svg"
            alt="Center Element"
            className="w-[50%]"
          />
          <div className="flex flex-col items-center text-[20px] font-semibold text-[#2294C4]">
            <p>{getInitials(invite?.groom_name)}</p>
            <img
              src="/invites/invite3-icon.png"
              alt="Center Element"
              className="h-12 w-12"
            />
            <p>{getInitials(invite?.bride_name)}</p>
          </div>
        </div>

        <p className="pt-6 text-[#2294C4]">
          invite you to celebrate their wedding
        </p>
        <div className="my-4 w-60 border-t-2 border-[#2294C4]" />
        <p className="text-[#2294C4]">
          {formatWeddingDate(invite?.wedding_date)}
        </p>
        <p className="pt-2 text-[#2294C4]">
          {invite?.venue}, {invite?.location}
        </p>
        <p className="mt-4 bg-white px-8 py-2 uppercase text-[#2294C4]">
          Save the Date
        </p>
      </div>
    </section>
  )
}
