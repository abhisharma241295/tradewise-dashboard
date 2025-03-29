import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { InputText } from "primereact/inputtext"
import Button from "@/components/ui/Button"
import { useMutation } from "@tanstack/react-query"
import ValidationError from "@/components/ui/ValidationError"
import { useAppDispatch } from "@/lib/redux/hooks"
import { sendResetCode } from "@/lib/auth/authApis"
import { setEmail } from "@/lib/redux/features/slices/authSlice"
import { cn } from "@/lib/utils/cn"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { errorFilter } from "@/lib/utils/errorFilter"

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
})

type FormData = yup.InferType<typeof schema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()

  const mutation = useMutation({
    mutationFn: sendResetCode,
    onSuccess: () => {
      dispatch(setEmail(getValues("email")))
      router.push("/reset-password/confirm")
    },
    retry: false,
  })
  const onSubmit = (data: FormData) => {
    mutation.mutate(data.email)
  }
  return (
    <div className="h-screen py-8">
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
          Forget Password
        </strong>
        <span className="mx-4 mb-6 text-lg text-muted-foreground">
          Please enter your email address below, and we&apos;ll send you a
          secure link to reset your password. Follow the instructions in the
          email to regain access to your account. Make sure to check your inbox
          or spam folder if you don&apos;t see it right away.
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-4 text-start md:mx-20"
        >
          <div className="mb-5 flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <InputText
              {...register("email")}
              id="email"
              invalid={!!mutation.error}
              placeholder="example@email.com"
              aria-describedby="email-help"
            />
            {errors.email && (
              <ValidationError
                className="!justify-start"
                error={errors.email.message ?? "Unknown Error"}
              />
            )}
          </div>
          {mutation.error && (
            <ValidationError
              error={errorFilter(mutation.error) ?? "Unknown Error"}
            />
          )}
          <Button
            disabled={mutation.isPending}
            loading={mutation.isPending}
            className="w-full font-semibold"
            size="lg"
          >
            Send Email to my mailbox
          </Button>
        </form>
      </div>
    </div>
  )
}
