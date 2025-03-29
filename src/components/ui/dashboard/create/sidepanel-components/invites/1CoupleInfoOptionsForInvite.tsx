import { InputText } from "primereact/inputtext"
import ImageUploader from "@/components/ui/commons/ImageUploader"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  updateSaveButtonVisibilityForInvite,
  updateInviteCardData,
} from "@/lib/redux/features/slices/custom-wedding-slices/inviteCardSlice"

interface CoupleInfoOptionsForInviteProps {
  onNavigate: (title: string, section: string) => void
}

export default function CoupleInfoOptionsForInvite({
  onNavigate,
}: CoupleInfoOptionsForInviteProps) {
  const dispatch = useAppDispatch()
  const inviteCardData = useAppSelector(
    (state) => state.inviteCard.inviteCardData
  )

  return (
    <div className="overflow-y-auto bg-white p-2">
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Bride&apos;s Name</label>
            <InputText
              value={inviteCardData?.bride_name}
              onChange={(e) => {
                dispatch(
                  updateInviteCardData({
                    ...inviteCardData,
                    bride_name: e.target.value,
                  })
                )
                dispatch(updateSaveButtonVisibilityForInvite(true))
              }}
              placeholder="Enter bride's name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Groom&apos;s Name</label>
            <InputText
              value={inviteCardData?.groom_name}
              onChange={(e) => {
                dispatch(
                  updateInviteCardData({
                    ...inviteCardData,
                    groom_name: e.target.value,
                  })
                )
                dispatch(updateSaveButtonVisibilityForInvite(true))
              }}
              placeholder="Enter groom's name"
            />
          </div>
          {inviteCardData &&
            (inviteCardData.template_id === "3" ||
              inviteCardData.template_id === "5") && (
              <div className="flex flex-col gap-2">
                <label className="font-medium">Couple Image</label>
                <ImageUploader
                  slug={"test3"}
                  onUploadSuccess={(imageUrl) => {
                    dispatch(
                      updateInviteCardData({
                        ...inviteCardData,
                        couple_image: imageUrl,
                      })
                    )
                    dispatch(updateSaveButtonVisibilityForInvite(true))
                  }}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
