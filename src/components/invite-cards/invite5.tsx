import { cn } from "@/lib/utils/cn"
// import { moondance, notoSerif } from "@/lib/utils/fonts"
import { InvitePageProps } from "@/types/InviteCard"
import { formatWeddingDate, getWeekday } from "./utils"

export default function Invite5({ invite }: InvitePageProps) {
  return (
    <section
      className="relative size-full text-center"
      style={{ fontFamily: invite.secondary_font.cssStyleName }}
    >
      <img
        src="/invites/invite5-bg.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 pt-56">
        <img
          src="/invites/invite5-frame.png"
          alt="Frame"
          className="bottom-37 absolute w-full object-contain pr-2"
        />
        <div className="z-50 flex flex-col items-center justify-center px-16 pt-16">
          <p
            className="z-[60] pr-2 pt-2 text-6xl text-[#CF6833]"
            style={{ fontFamily: invite.primary_font.cssStyleName }}
          >
            {invite?.groom_name.split(" ")[0]}{" "}
            <span className="text-4xl">&</span>
          </p>
          <p
            className="z-[60] pl-16 pt-8 text-6xl leading-6 text-[#CF6833]"
            style={{ fontFamily: invite.primary_font.cssStyleName }}
          >
            {invite?.bride_name.split(" ")[0]}
          </p>
          <p className="z-[60] pb-4 pt-4 text-lg uppercase text-[#124768]">
            are getting married
          </p>
          <div className="z-[60] m-auto w-48 border-t border-[#CF6833]" />
          <p
            className="z-[60] pt-2 text-3xl text-[#CF6833]"
            style={{ fontFamily: invite.primary_font.cssStyleName }}
          >
            Save the Date
          </p>
          <p className="z-[60] pt-2 text-base text-[#124768]">
            {getWeekday(invite?.wedding_date)},{" "}
            {formatWeddingDate(invite?.wedding_date)}{" "}
          </p>
          <p className="z-[60] pb-4 pt-1 text-base text-[#124768]">
            {invite?.venue}, {invite?.location}
          </p>
        </div>
      </div>
    </section>
  )
}
