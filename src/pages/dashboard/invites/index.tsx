import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@/components/ui/Button"
import ValidationError from "@/components/ui/ValidationError"
import { X } from "lucide-react"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import {
  inviteCardForm,
  InviteCardFormType,
} from "@/lib/form-schema/inviteCardForm"
import { Calendar } from "primereact/calendar"
import Image from "next/image"

export default function Invites() {
  const [showCustomizableForm, setShowCustomizableForm] = useState<
    string | false
  >(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InviteCardFormType>({
    resolver: yupResolver(inviteCardForm),
  })

  const handleOpenForm = (id: string) => {
    setShowCustomizableForm(id)
  }

  const onSubmit = async (data: InviteCardFormType) => {
    console.log(data)
  }

  return (
    <div className="container mt-2">
      <h3 className="my-4 text-center text-xl font-bold md:text-2xl">
        Invites
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Image
          src={"/invites/invite1.jpg"}
          alt={""}
          height={300}
          width={300}
          className="mt-2 cursor-pointer"
          onClick={() => handleOpenForm("1")}
        ></Image>
        <Image
          src={"/invites/invite2.jpg"}
          alt={""}
          height={300}
          width={300}
          className="mt-2 cursor-pointer"
          onClick={() => handleOpenForm("2")}
        ></Image>
        <Image
          src={"/invites/invite3.jpg"}
          alt={""}
          height={300}
          width={300}
          className="mt-2 cursor-pointer"
          onClick={() => handleOpenForm("3")}
        ></Image>
        <Image
          src={"/invites/invite4.jpg"}
          alt={""}
          height={300}
          width={300}
          className="mt-2 cursor-pointer"
          onClick={() => handleOpenForm("4")}
        ></Image>
        <Image
          src={"/invites/invite5.jpg"}
          alt={""}
          height={300}
          width={300}
          className="mt-2 cursor-pointer"
          onClick={() => handleOpenForm("5")}
        ></Image>
      </div>
      <Dialog
        draggable={false}
        visible={!!showCustomizableForm}
        onHide={() => setShowCustomizableForm(false)}
        className="relative w-full max-w-md"
        header="Add your Details"
      >
        <X
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setShowCustomizableForm(false)}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div>
            <label htmlFor="expenseName" className="mb-1 block">
              Your Full Name
            </label>
            <InputText
              id="person1"
              {...register("person1")}
              className={`w-full ${errors.person1 ? "p-invalid" : ""}`}
              placeholder="Your Full Name"
            />
            {errors.person1 && (
              <ValidationError
                className="!justify-start"
                error={errors.person1.message ?? "Unknown error"}
              />
            )}
          </div>
          <div>
            <label htmlFor="person2" className="mb-1 block">
              Your Partner&apos;s Full Name
            </label>
            <InputText
              id="person2"
              {...register("person2")}
              className={`w-full ${errors.person2 ? "p-invalid" : ""}`}
              placeholder="Your Partner's Full Name"
            />
            {errors.person2 && (
              <ValidationError
                className="!justify-start"
                error={errors.person2.message ?? "Unknown error"}
              />
            )}
          </div>
          <div>
            <label htmlFor="weddingDate" className="mb-1 block">
              Wedding Date
            </label>
            <Controller
              name="weddingDate"
              control={control}
              render={({ field }) => (
                <Calendar
                  id="weddingDate"
                  value={field.value} // Ensure controlled component behavior
                  onChange={(e) => field.onChange(e.value)} // Handle undefined safely
                  dateFormat="mm/dd/yy"
                  placeholder="MM/DD/YYYY"
                  className={`w-full ${errors.weddingDate ? "p-invalid" : ""}`}
                />
              )}
            />

            {errors.weddingDate && (
              <ValidationError
                className="!justify-start"
                error={errors.weddingDate.message ?? "Unknown error"}
              />
            )}
          </div>
          <div>
            <label htmlFor="venue" className="mb-1 block">
              Venue
            </label>
            <InputText
              id="venue"
              {...register("venue")}
              className={`w-full ${errors.venue ? "p-invalid" : ""}`}
              placeholder="Venue"
            />
            {errors.venue && (
              <ValidationError
                className="!justify-start"
                error={errors.venue.message ?? "Unknown error"}
              />
            )}
          </div>
          <Button
            className="item-center mt-10 flex w-full flex-row justify-center gap-2"
            type="submit"
          >
            {/* {useSendInviteMutuation_isLoading && (
                  <Loader className="animate-spin" />
                )} */}
            Customize Design{" "}
          </Button>
        </form>
      </Dialog>
    </div>
  )
}
