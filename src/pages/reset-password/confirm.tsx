import Button from "@/components/ui/Button"
import ValidationError from "@/components/ui/ValidationError"
import { sendResetCode } from "@/lib/auth/authApis"
import { useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils/cn"
import { errorFilter } from "@/lib/utils/errorFilter"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function ForgetPasswordConfirmationPage() {
  const router = useRouter()
  const email = useAppSelector((state) => state.auth.userEmail)
  const mutation = useMutation({
    mutationFn: async () => {
      if (email) await sendResetCode(email)
    },
    retry: false,
  })
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
        <strong className="mb-6 text-4xl text-foreground">
          Check your mailbox
        </strong>
        <span className="mb-6 text-lg text-muted-foreground">
          An email with a link to reset your password has been sent to your
          inbox. Please check your email and follow the instructions provided to
          securely reset your password. If you do not receive the email within a
          few minutes, kindly check your spam or junk folder.
        </span>
        {mutation.error && (
          <ValidationError
            error={errorFilter(mutation.error) ?? "Unknown Error"}
          />
        )}

        <Button
          className="w-full font-semibold"
          disabled={mutation.isPending}
          loading={mutation.isPending}
          onClick={() => {
            mutation.mutate()
          }}
          size="lg"
        >
          Resend Link
        </Button>
        <p className="item-center mt-6 flex flex-row justify-center gap-2 text-muted-foreground">
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/login")
            }}
            className="text-primary hover:underline"
          >
            Go back to Login Page
          </Button>
        </p>
      </div>
    </div>
  )
}
