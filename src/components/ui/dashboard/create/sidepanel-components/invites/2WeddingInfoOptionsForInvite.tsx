import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { useDispatch } from "react-redux"
import {
  updateSaveButtonVisibilityForInvite,
  updateInviteCardData,
} from "@/lib/redux/features/slices/custom-wedding-slices/inviteCardSlice"
import { useAppSelector } from "@/lib/redux/hooks"

interface WeddingInfoOptionsForInviteProps {
  onNavigate: (title: string, section: string) => void
}

export default function WeddingInfoOptionsForInvite({
  onNavigate,
}: WeddingInfoOptionsForInviteProps) {
  const dispatch = useDispatch()

  const inviteCardData = useAppSelector(
    (state) => state.inviteCard.inviteCardData
  )

  return (
    <div className="overflow-y-auto bg-white p-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Wedding Date</label>
          <Calendar
            value={new Date(inviteCardData?.wedding_date)}
            onChange={(e) => {
              console.log(e)
              dispatch(
                updateInviteCardData({
                  ...inviteCardData,
                  wedding_date: e.value,
                })
              )
              dispatch(updateSaveButtonVisibilityForInvite(true))
            }}
            placeholder="Select wedding date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Venue</label>
          <InputText
            value={inviteCardData?.venue}
            onChange={(e) => {
              dispatch(
                updateInviteCardData({
                  ...inviteCardData,
                  venue: e.target.value,
                })
              )
              dispatch(updateSaveButtonVisibilityForInvite(true))
            }}
            placeholder="Enter Venue"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Location</label>
          <InputText
            value={inviteCardData?.location}
            onChange={(e) => {
              dispatch(
                updateInviteCardData({
                  ...inviteCardData,
                  location: e.target.value,
                })
              )
              dispatch(updateSaveButtonVisibilityForInvite(true))
            }}
            placeholder="Enter Location"
          />
        </div>
      </div>
    </div>
  )
}
