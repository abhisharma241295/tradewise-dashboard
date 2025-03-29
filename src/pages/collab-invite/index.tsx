import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAcceptInviteMutation } from "@/lib/redux/features/apis/collabApi"
import { cn } from "@/lib/utils/cn"
import { sacramento } from "@/lib/utils/fonts"
import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button"
import { newCollabFormSchema } from "@/lib/form-schema/newCollabForm"
import { InputText } from "primereact/inputtext"
import { NewCollabFormType } from "@/lib/form-schema/newCollabForm"
import { Loader } from "lucide-react"
import ValidationError from "@/components/ui/ValidationError"
import { toast, Toaster } from "sonner"

export default function CollabInvite() {
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCollabFormType>({
    resolver: yupResolver(newCollabFormSchema),
  })

  const [
    acceptInvite,
    {
      isLoading: useAcceptInviteMutation_isLoading,
      error: useAcceptInviteMutation_error,
    },
  ] = useAcceptInviteMutation()

  useEffect(() => {
    if (useAcceptInviteMutation_error) {
      toast.error(
        "Failed to accept invite: " +
          (useAcceptInviteMutation_error as any)?.data?.message ||
          "Something went wrong"
      )
    }
  }, [useAcceptInviteMutation_error])

  const onSubmit = async (data: NewCollabFormType) => {
    try {
      console.log("data", data)
      const urlParams = new URLSearchParams(window.location.search)
      const tokenParam = urlParams.get("token")
      const response = await acceptInvite({
        token: tokenParam || "",
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
      })
      if (response?.data?.status === "success") {
        toast(response?.data?.message || "Invite sent successfully!")
        setShowSuccess(true)
      }
    } catch (error) {
      toast(`Error:${error}`)
    }
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Toaster position="top-center" />
      {showSuccess ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mt-3 flex flex-row items-center justify-center">
            <strong className="mb-4 text-4xl text-foreground">
              Congratulations!
            </strong>

            <svg
              width="50"
              height="50"
              viewBox="0 0 191 191"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4"
            >
              <path
                d="M92.4494 8.48366C93.7874 6.1047 97.2126 6.1047 98.5506 8.48366L102.897 16.2119C104.953 19.8673 109.881 20.6478 112.966 17.8067L119.488 11.7999C121.496 9.95081 124.753 11.0092 125.291 13.6852L127.037 22.3785C127.862 26.4902 132.308 28.7554 136.12 27.0066L144.179 23.3092C146.66 22.1711 149.431 24.1843 149.115 26.8954L148.089 35.7026C147.604 39.8683 151.132 43.3964 155.297 42.9111L164.105 41.8851C166.816 41.5693 168.829 44.3403 167.691 46.8211L163.993 54.8802C162.245 58.692 164.51 63.1377 168.622 63.9634L177.315 65.7092C179.991 66.2466 181.049 69.5041 179.2 71.5118L173.193 78.0339C170.352 81.1187 171.133 86.0468 174.788 88.1027L182.516 92.4494C184.895 93.7874 184.895 97.2126 182.516 98.5506L174.788 102.897C171.133 104.953 170.352 109.881 173.193 112.966L179.2 119.488C181.049 121.496 179.991 124.753 177.315 125.291L168.622 127.037C164.51 127.862 162.245 132.308 163.993 136.12L167.691 144.179C168.829 146.66 166.816 149.431 164.105 149.115L155.297 148.089C151.132 147.604 147.604 151.132 148.089 155.297L149.115 164.105C149.431 166.816 146.66 168.829 144.179 167.691L136.12 163.993C132.308 162.245 127.862 164.51 127.037 168.622L125.291 177.315C124.753 179.991 121.496 181.049 119.488 179.2L112.966 173.193C109.881 170.352 104.953 171.133 102.897 174.788L98.5506 182.516C97.2126 184.895 93.7874 184.895 92.4494 182.516L88.1027 174.788C86.0468 171.133 81.1187 170.352 78.0339 173.193L71.5118 179.2C69.5041 181.049 66.2466 179.991 65.7092 177.315L63.9634 168.622C63.1377 164.51 58.692 162.245 54.8802 163.993L46.8211 167.691C44.3403 168.829 41.5693 166.816 41.8851 164.105L42.9111 155.297C43.3964 151.132 39.8683 147.604 35.7026 148.089L26.8954 149.115C24.1843 149.431 22.1711 146.66 23.3092 144.179L27.0066 136.12C28.7554 132.308 26.4902 127.862 22.3785 127.037L13.6852 125.291L13.3899 126.761L13.6852 125.291C11.0092 124.753 9.95081 121.496 11.7999 119.488L17.8067 112.966C20.6478 109.881 19.8673 104.953 16.2119 102.897L8.48366 98.5506C6.1047 97.2126 6.1047 93.7874 8.48366 92.4494L16.2119 88.1027C19.8673 86.0468 20.6478 81.1187 17.8067 78.0339L11.7999 71.5118C9.95081 69.5041 11.0092 66.2466 13.6852 65.7092L22.3785 63.9634C26.4902 63.1377 28.7554 58.692 27.0066 54.8802L23.3092 46.8211C22.1711 44.3403 24.1843 41.5693 26.8954 41.8851L35.7026 42.9111C39.8683 43.3964 43.3964 39.8683 42.9111 35.7026L41.8851 26.8954C41.5693 24.1843 44.3403 22.1711 46.8211 23.3092L54.8802 27.0066C58.692 28.7554 63.1377 26.4902 63.9634 22.3785L65.7092 13.6852L64.2386 13.3899L65.7092 13.6852C66.2466 11.0092 69.5041 9.95081 71.5118 11.7999L78.0339 17.8067C81.1187 20.6478 86.0468 19.8673 88.1027 16.2119L92.4494 8.48366Z"
                fill="#11A843"
                stroke="#53C278"
                strokeWidth="1"
              />
              <path
                d="M58.0721 100.604L82.1386 125.021L130.271 63.9795"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/login")
            }}
            className="text-primary hover:underline"
          >
            Go to Akitu
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <h1
            className={cn(
              sacramento.className,
              "text-6xl text-secondary-foreground"
            )}
          >
            Akitu Events
          </h1>
          <div className="my-6 flex flex-col items-center justify-center">
            <strong className="mb-6 text-4xl text-foreground">
              You are Invited!
            </strong>
            <span className="text-xl font-medium">
              Do you want to accept the invitation?
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4">
            <div className="grid grid-cols-[1.5fr_3.5fr] items-center">
              <label htmlFor="email" className="mb-1 block">
                Email :
              </label>
              <InputText
                id="email"
                {...register("email")}
                className={`w-full ${errors.email ? "p-invalid" : ""}`}
                placeholder="Email"
              />
              <div />
              {errors.email && (
                <ValidationError
                  className="!justify-start"
                  error={errors.email.message ?? "Unknown error"}
                />
              )}
            </div>
            <div className="grid grid-cols-[1.5fr_3.5fr] items-center">
              <label htmlFor="firstName" className="mb-1 block">
                First Name :
              </label>
              <InputText
                id="firstName"
                {...register("firstName")}
                className={`w-full ${errors.firstName ? "p-invalid" : ""}`}
                placeholder="First Name"
              />
              <div />
              {errors.firstName && (
                <ValidationError
                  className="!justify-start"
                  error={errors.firstName.message ?? "Unknown error"}
                />
              )}
            </div>
            <div className="grid grid-cols-[1.5fr_3.5fr] items-center">
              <label htmlFor="lastName" className="mb-1 block">
                Last Name :
              </label>
              <InputText
                id="lastName"
                {...register("lastName")}
                className={`w-full ${errors.lastName ? "p-invalid" : ""}`}
                placeholder="Last Name"
              />
              <div />
              {errors.lastName && (
                <ValidationError
                  className="!justify-start"
                  error={errors.lastName.message ?? "Unknown error"}
                />
              )}
            </div>
            <div className="grid grid-cols-[1.5fr_3.5fr] items-center">
              <label htmlFor="password" className="mb-1 block">
                Password :
              </label>
              <InputText
                id="password"
                type="password"
                {...register("password")}
                className={`w-full ${errors.password ? "p-invalid" : ""}`}
                placeholder="Password"
              />
              <div />
              {errors.password && (
                <ValidationError
                  className="!justify-start"
                  error={errors.password.message ?? "Unknown error"}
                />
              )}
            </div>
            <Button
              type="submit"
              disabled={useAcceptInviteMutation_isLoading}
              className="item-center flex w-full flex-row justify-center gap-2"
            >
              {useAcceptInviteMutation_isLoading && (
                <Loader className="animate-spin" />
              )}
              Accept invitation
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
