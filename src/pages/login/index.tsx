import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { InputText } from "primereact/inputtext"
import Button from "@/components/ui/Button"
import { Password } from "primereact/password"
import { useMutation } from "@tanstack/react-query"
import { useAppDispatch } from "@/lib/redux/hooks"
import ValidationError from "@/components/ui/ValidationError"
import { loginUser } from "@/lib/auth/authApis"
import {
  setCredentials,
  setEmail,
  setOnboardingStatus,
  setVerificationStatus,
  updateCredentials,
} from "@/lib/redux/features/slices/authSlice"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { cn } from "@/lib/utils/cn"
import { errorFilter } from "@/lib/utils/errorFilter"
import { Checkbox } from "primereact/checkbox"
import { setCurrentWedding } from "@/lib/redux/features/slices/currentWeddingSlice"

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
})

type FormData = yup.InferType<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const rememberMeDays = getValues("rememberMe") ? 7 : 0
      const authState = {
        isVerified: true,
        isOnboarded: data.user_onboarded,
        userName: `${data.first_name} ${data.last_name}`,
        userEmail: data.email,
        days: rememberMeDays,
        token: data.access_token,
        onboardingData: data.onboarding_data || {
          designation: null,
          purpose: null,
          source: null,
        },
        address: data.address || {
          state: null,
          city: null,
        },
      }

      if (!data.user_verified) {
        dispatch(setEmail(data.email))
        dispatch(setCurrentWedding(null))
        router.push("/login/confirm")
      } else {
        dispatch(setCredentials(authState))
        dispatch(setVerificationStatus(true))
        dispatch(setOnboardingStatus(data.user_onboarded))
        if (data.user_onboarded) {
          dispatch(updateCredentials(authState))
          dispatch(setCurrentWedding(null))
          router.push("/dashboard")
        } else {
          dispatch(setCurrentWedding(null))
          router.push("/onboarding")
        }
      }
    },
    onError: () => {},
  })
  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data)
  }
  return (
    <div className="container mx-auto flex max-w-2xl flex-col justify-center text-center md:my-16 md:justify-start">
      <h1
        className={cn(
          cinzelDecorative.className,
          "text-5xl text-secondary-foreground"
        )}
      >
        Akitu Events
      </h1>
      {/* TODO - need to check border needed or not */}
      {/* <div className="mb-10 mt-16 h-px bg-border" /> */}
      <strong className="mb-6 mt-10 text-4xl text-foreground">
        Welcome Back!
      </strong>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 text-start md:mx-20"
      >
        <div className="mb-5 flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <InputText
            {...register("email")}
            id="email"
            placeholder="example@email.com"
            aria-describedby="email-help"
            invalid={!!errors.email}
            className="custom-text-field min-w-0"
          />
          {errors.email && (
            <ValidationError
              className="!justify-start"
              error={errors.email.message ?? "Unknown Error"}
            />
          )}
        </div>
        <div className="mb-3 flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <Password
                  placeholder="Password123"
                  id="password"
                  value={field.value}
                  invalid={!!errors.password}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="custom-text-field w-full"
                  aria-describedby="password-help"
                  toggleMask
                  feedback={false}
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
        <div className="mb-7 flex items-center justify-between">
          <div>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  inputId="rememberMe"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.checked)}
                  // className={errors.rememberMe ? "p-invalid" : ""}
                />
              )}
            />
            <label htmlFor="rememberMe" className="ml-2">
              Remember Me
            </label>
          </div>
          <Button
            type="button"
            variant={"link"}
            onClick={() => router.push("/reset-password")}
            className="text-sm font-bold text-primary hover:underline"
          >
            Forgot Password?
          </Button>
        </div>
        {loginMutation.error && (
          <ValidationError
            error={errorFilter(loginMutation.error) ?? "Unknown Error"}
          />
        )}
        <Button
          type="submit"
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
          className="text-md w-full font-bold"
          size="lg"
        >
          Let’s Begin!
        </Button>
      </form>
      <p className="item-center mt-6 flex flex-row justify-center gap-2 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button
          variant={"link"}
          onClick={() => router.push("/signup")}
          className="!h-min font-bold text-primary hover:underline"
        >
          Sign Up
        </Button>
      </p>
    </div>
  )
}
