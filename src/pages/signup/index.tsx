import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { InputText } from "primereact/inputtext"
import Button from "@/components/ui/Button"
import { Password } from "primereact/password"
import { Controller, useForm } from "react-hook-form"
import { Checkbox } from "primereact/checkbox"
import { useMutation } from "@tanstack/react-query"
import { useAppDispatch } from "@/lib/redux/hooks"
import ValidationError from "@/components/ui/ValidationError"
import { signupUser } from "@/lib/auth/authApis"
import {
  AuthState,
  setCredentials,
} from "@/lib/redux/features/slices/authSlice"
import { cn } from "@/lib/utils/cn"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { errorFilter } from "@/lib/utils/errorFilter"

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  readTermsAndConditions: yup
    .bool()
    .required("You must check it before continuing..."),
})

type FormData = yup.InferType<typeof schema>

export default function SignupPage() {
  const router = useRouter()
  // const signup=useMutation()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const signupMutation = useMutation({
    mutationFn: signupUser,
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
      router.push("/signup/confirm")
    },
    onError: (error) => {
      console.error("Signup error:", error)
    },
  })
  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data)
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
        Create an Account
      </strong>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 text-start md:mx-20"
      >
        <div className="flex flex-row justify-between gap-3">
          <div className="mb-5 flex flex-grow flex-col gap-1">
            <label htmlFor="first-name">First Name</label>
            <InputText
              {...register("firstName")}
              id="first-name"
              className="custom-text-field min-w-0"
              placeholder="First Name"
              aria-describedby="firstName-help"
              invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <ValidationError
                className="justify-start"
                error={errors.firstName.message ?? "Unknown Error"}
              />
            )}
          </div>
          <div className="mb-5 flex flex-grow flex-col gap-1">
            <label htmlFor="last-name">Last Name</label>
            <InputText
              className="custom-text-field min-w-0"
              {...register("lastName")}
              id="last-name"
              placeholder="Last Name"
              aria-describedby="lastName-help"
              invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <ValidationError
                className="justify-start"
                error={errors.lastName.message ?? "Unknown Error"}
              />
            )}
          </div>
        </div>
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
              className="justify-start"
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
                  invalid={!!errors.password}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="custom-text-field w-full"
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
              className="justify-start"
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
                  id="confirmPassword"
                  invalid={!!errors.confirmPassword}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="custom-text-field w-full"
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
              className="justify-start"
              error={errors.confirmPassword.message ?? "Unknown Error"}
            />
          )}
        </div>
        <Controller
          control={control}
          name="readTermsAndConditions"
          render={({ field }) => {
            return (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="readTermsAndConditions"
                  checked={field.value}
                  invalid={!!errors.readTermsAndConditions}
                  onChange={(e) => field.onChange(e.checked)}
                />
                <label htmlFor="readTermsAndConditions">
                  I agree to the Terms and Conditions
                </label>
              </div>
            )
          }}
        />
        {errors.readTermsAndConditions && (
          <ValidationError
            className="justify-start"
            error={errors.readTermsAndConditions.message ?? "Unknown Error"}
          />
        )}
        <div className="mt-6" />
        {signupMutation.error && (
          <ValidationError
            error={errorFilter(signupMutation.error) ?? "Unknown Error"}
          />
        )}
        <Button
          loading={signupMutation.isPending}
          disabled={signupMutation.isPending}
          className="text-md w-full font-bold"
          size="lg"
        >
          Let’s Begin!
        </Button>
      </form>
      <p className="item-center mt-6 flex flex-row justify-center gap-2 text-sm text-muted-foreground">
        Already have an account?
        <Button
          variant={"link"}
          onClick={() => router.push("/login")}
          className="!h-min font-bold text-primary hover:underline"
        >
          Login
        </Button>
      </p>
    </div>
  )
}
