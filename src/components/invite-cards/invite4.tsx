/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils/cn"
// import {
//   playfairDisplay,
//   montserrat,
//   playfairDisplay1,
// } from "@/lib/utils/fonts"
import { InvitePageProps } from "@/types/InviteCard"
import { formatWeddingDate, getWeekday } from "./utils"

export default function Invite4({ invite }: InvitePageProps) {
  return (
    <section
      className="mx-auto min-h-screen max-w-lg text-center"
      style={{
        backgroundImage: "url('/invites/invite4-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        fontFamily: invite.secondary_font.cssStyleName,
      }}
    >
      <div
        style={{
          backgroundImage: "url('/invites/invite4-bg2.png')",
          backgroundSize: "100% 100%",
          outline: "10px solid transparent",
          backgroundRepeat: "no-repeat",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundImage: "url('/invites/invite4-bgpattern.png')",
            backgroundSize: "auto",
            outline: "10px solid transparent",
            backgroundRepeat: "no-repeat",
            padding: "30px",
          }}
        >
          <div
            style={{
              backgroundImage: "url('/invites/invite4-bgpattern2.png')",
              backgroundSize: "100% 100%",
              outline: "10px solid transparent",
              backgroundRepeat: "no-repeat",
              padding: "50px",
            }}
          >
            <img
              src="/invites/invite4-logo.png"
              alt="Top Decoration"
              width="80"
              height="80"
              className="mx-auto block pt-4"
            />

            <p
              className="pt-4 text-sm italic text-[#0E4686]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              Please join us for the
            </p>
            <p
              className="text-lg font-bold italic text-[#0E4686]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              Wedding Ceremony
            </p>
            <p
              className="pt-3 text-2xl text-[#CC9610]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              {invite?.groom_name}
            </p>
            <p
              className="text-xl text-[#0E4686]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              &
            </p>
            <p
              className="pb-3 text-2xl text-[#CC9610]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              {invite?.bride_name}
            </p>
            <p
              className="text-base font-semibold italic text-[#0E4686]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              {getWeekday(invite?.wedding_date)},{" "}
              {formatWeddingDate(invite?.wedding_date)}
            </p>
            <p
              className="pb-4 text-base font-semibold italic text-[#0E4686]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              {invite?.venue}, {invite?.location}
            </p>
            <p
              className="pb-4 text-sm font-bold uppercase italic text-[#0E4686]"
              style={{ fontFamily: invite.primary_font.cssStyleName }}
            >
              Reception To follow
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
