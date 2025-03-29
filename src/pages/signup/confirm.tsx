import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button"
import { InputOtp } from "primereact/inputotp"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { ErrorAlert, SuccessAlert } from "@/components/ui/Alerts"
import ValidationError from "@/components/ui/ValidationError"
import { sendVerificationCode, verifyCode } from "@/lib/auth/authApis"
import {
  AuthState,
  setCredentials,
} from "@/lib/redux/features/slices/authSlice"
import { cn } from "@/lib/utils/cn"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { errorFilter } from "@/lib/utils/errorFilter"
import { setCurrentWedding } from "@/lib/redux/features/slices/currentWeddingSlice"

export default function ConfirmationPage() {
  const router = useRouter()
  const [otp, setOtp] = useState<string>("")
  const dispatch = useAppDispatch()
  const email = useAppSelector((state) => state.auth.userEmail)

  const { mutate: sendCode } = useMutation({
    mutationFn: async () => {
      if (email) {
        await sendVerificationCode(email)
      }
    },
    onSuccess: () => {
      toast(
        <SuccessAlert
          title={"Send Verification code to your account"}
          message={"Check your mailbox"}
        />,
        { unstyled: true }
      )
    },
    onError: (error) => {
      toast(
        <ErrorAlert title={"Problem while Login"} message={error.toString()} />,
        { unstyled: true }
      )
    },
    retry: false,
  })
  const verifyAccountMutation = useMutation({
    mutationFn: async (props: { email: string; verificationCode: string }) =>
      verifyCode(props),
    onSuccess: (data) => {
      const userData: AuthState = {
        isVerified: true,
        isOnboarded: false,
        userName: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
        userEmail: data?.email || "",
        days: 0,
        token: data?.access_token || "",
        onboardingData: data?.onboarding_data || {
          designation: null,
          purpose: null,
          source: null,
        },
        address: data?.address || {
          state: null,
          city: null,
        },
      }
      dispatch(setCredentials(userData))
      dispatch(setCurrentWedding(null))

      router.push("/onboarding")
    },
    retry: false,
  })

  useEffect(() => {
    sendCode()
  }, [])

  return (
    <div className="h-screen px-4 py-8">
      <div className="container mx-auto flex h-full max-w-xl flex-col justify-center pb-16 text-center md:mb-0 md:mt-16 md:justify-start">
        <h1
          className={cn(
            cinzelDecorative.className,
            "text-5xl text-secondary-foreground"
          )}
        >
          Akitu Events
        </h1>
        <div className="mb-10 mt-16 h-px bg-border" />
        <strong className="mb-6 text-4xl text-foreground">Confirm Code!</strong>
        <span className="text-lg text-muted-foreground">
          You have received a confirmation code in your email. Input the number
          to proceed.
        </span>
        <div className="mt-6 flex flex-row justify-center">
          <InputOtp
            value={otp}
            invalid={!!verifyAccountMutation.error}
            integerOnly
            length={6}
            className="!w-min !text-4xl"
            onChange={(e) => setOtp(e.value?.toString() ?? "")}
          />
        </div>
        {verifyAccountMutation.error && (
          <ValidationError
            error={errorFilter(verifyAccountMutation.error) ?? "Unknown Error"}
          />
        )}
        <Button
          variant={"link"}
          onClick={() => sendCode()}
          className="!mt-6 text-primary hover:underline"
        >
          Resend code
        </Button>
        <Button
          className="w-full font-semibold"
          loading={verifyAccountMutation.isPending}
          disabled={verifyAccountMutation.isPending || otp.length < 6}
          onClick={() =>
            verifyAccountMutation.mutate({
              email: email || "",
              verificationCode: otp,
            })
          }
          size="lg"
        >
          Verify Account
        </Button>
      </div>
    </div>
  )
}
