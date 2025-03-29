import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "@/components/ui/Button"
import { Password } from "primereact/password"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import ValidationError from "@/components/ui/ValidationError"
import { resetPassword } from "@/lib/auth/authApis"
import { cn } from "@/lib/utils/cn"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { errorFilter } from "@/lib/utils/errorFilter"

/*This page needs testing. Token verification is not working right now. */
const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
})

type FormData = yup.InferType<typeof schema>

export default function NewPasswordPage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get("token")
    if (!tokenParam) {
      router.push("/")
    } else {
      setToken(tokenParam)
    }
  }, [router])
  const mutation = useMutation({
    mutationFn: (data: FormData) => resetPassword(token!, data.password),
    onSuccess: () => {
      router.push("/login")
    },
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    // loginMutation.mutate(data)
    mutation.mutate(data)
  }
  return (
    <div className="h-screen py-8">
      <div className="container mx-auto flex h-full max-w-2xl flex-col justify-center pb-16 text-center md:mb-0 md:mt-16 md:justify-start">
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
          Create an new Password
        </strong>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-4 text-start md:mx-20"
        >
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <Password
                    invalid={!!errors.password}
                    placeholder="Password123"
                    id="password"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full"
                    aria-describedby="password-help"
                    toggleMask
                    feedback={true}
                    tabIndex={1}
                  />
                )
              }}
            />

            {errors.password && (
              <ValidationError
                className="!justify-start"
                error={errors.password.message ?? "Unknown Error"}
              />
            )}
          </div>
          <div className="mb-6 flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <Password
                    placeholder="Password123"
                    invalid={!!errors.confirmPassword}
                    id="confirmPassword"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full"
                    aria-describedby="confirmPassword-help"
                    toggleMask
                    feedback={false}
                    tabIndex={1}
                  />
                )
              }}
            />
            {errors.confirmPassword && (
              <ValidationError
                className="!justify-start"
                error={errors.confirmPassword.message ?? "Unknown Error"}
              />
            )}
          </div>
          {mutation.error && (
            <ValidationError
              error={errorFilter(mutation.error) ?? "Unknown Error"}
            />
          )}
          <Button
            className="mt-6 w-full font-semibold"
            disabled={mutation.isPending}
            loading={mutation.isPending}
            size="lg"
          >
            Set Password
          </Button>
        </form>
        <p className="item-center mt-6 flex flex-row justify-center gap-2 text-muted-foreground">
          Go back to
          <Button
            variant={"link"}
            onClick={() => router.push("/login")}
            className="!h-min text-primary hover:underline"
          >
            Login Page
          </Button>
        </p>
      </div>
    </div>
  )
}
