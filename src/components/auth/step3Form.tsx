"use client";
import { useState } from "react";
// import Button from "@/components/common/button";
import { Button } from "@/components/ui/button";
import { Formik, Form, FormikHelpers } from "formik";
import { Step3Schema } from "@/validationSchemas/authValidationSchema";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Input } from "@/components/common/input";
import { LockKeyholeIcon, EyeOffIcon, EyeIcon, Check, X } from "lucide-react";
import {
  useSignupMutation,
  usePasswordManagerMutation,
} from "@/redux/apis/userApi";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { setCredentials } from "@/redux/slices/authSlice";

interface FormValues {
  password: string;
  confirmPassword: string;
}

export default function Step3({ pageType }: { pageType: string }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const signUpData = useAppSelector((state) => state.auth.signUpData);
  const [signup] = useSignupMutation();
  const [passwordManager] = usePasswordManagerMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // Prevent duplicate submissions
    if (isProcessing) return;

    setIsProcessing(true);
    setSubmitting(true);

    try {
      if (pageType === "signup" && signUpData) {
        if (
          !signUpData.email ||
          !signUpData.fullName ||
          !signUpData.department ||
          !signUpData.designation
        ) {
          toast.error(
            "Missing required signup information. Please go back and complete all fields."
          );
          return;
        }

        const signupData = {
          email: signUpData.email,
          fullName: signUpData.fullName,
          department: signUpData.department,
          designation: signUpData.designation,
          biography: signUpData.biography || "",
          password: values.password,
          phoneNumber: signUpData.phoneNumber || "",
        };

        const result = await signup(signupData);

        if ("data" in result) {
          // Store user data in Redux state before redirecting
          if (result.data) {
            dispatch(
              setCredentials({
                email: signUpData.email || "",
                fullName: signUpData.fullName || "",
                department: signUpData.department || "",
                designation: signUpData.designation || "",
                biography: signUpData.biography || "",
                token: result.data.access_token || "",
                isUserVerified: false,
                days: 0,
              })
            );
            router.push("/email-verification");
          } else {
            toast.error("Signup successful but received invalid data");
          }
        } else if ("error" in result) {
          if (result.error && typeof result.error === "object") {
            if ("message" in result.error) {
              toast.error(String(result.error.message));
            } else {
              toast.error("An error occurred during signup");
            }
          } else {
            toast.error("Something went wrong during signup");
          }
        }
      } else if (pageType === "reset" && token) {
        const result = await passwordManager({
          action: "reset",
          password: values.password,
          token,
        });

        if ("data" in result) {
          router.push("/reset-password/reset-password-success");
        } else {
          router.push("/reset-password/reset-password-failed");
        }
      } else {
        toast.error("Invalid form state or missing required parameters");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
    } finally {
      setIsProcessing(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Step3Schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleChange, isSubmitting }) => {
        const passwordStrength = values.password
          ? (values.password.length >= 8 ? 1 : 0) +
            (/[A-Z]/.test(values.password) ? 1 : 0) +
            (/[0-9]/.test(values.password) ? 1 : 0)
          : 0;

        return (
          <Form className="w-full">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="........"
              fieldLabel={
                pageType === "reset"
                  ? "Create New Password"
                  : "Create a Password"
              }
              required
              startIcon={<LockKeyholeIcon className="h-5 w-5 text-[#99A0AE]" />}
              name="password"
              validationErr={
                touched.password && errors.password ? errors.password : null
              }
              onChange={handleChange}
              endIcon={
                isPasswordVisible ? (
                  <EyeOffIcon
                    className="h-5 w-5 text-[#E1E4EA]"
                    onClick={handleTogglePasswordVisibility}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-[#E1E4EA]"
                    onClick={handleTogglePasswordVisibility}
                  />
                )
              }
            />
            <Input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="........"
              fieldLabel="Confirm Password"
              required
              startIcon={<LockKeyholeIcon className="h-5 w-5 text-[#99A0AE]" />}
              name="confirmPassword"
              validationErr={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : null
              }
              onChange={handleChange}
              endIcon={
                isConfirmPasswordVisible ? (
                  <EyeOffIcon
                    className="h-5 w-5 text-[#E1E4EA]"
                    onClick={handleToggleConfirmPasswordVisibility}
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-[#E1E4EA]"
                    onClick={handleToggleConfirmPasswordVisibility}
                  />
                )
              }
            />
            <ol className="flex items-center w-full justify-between mt-4">
              <li className="flex items-center w-full">
                <div
                  className={`h-1 ${
                    passwordStrength >= 1 ? "bg-[#FB3748]" : "bg-[#E1E4EA]"
                  } w-24`}
                ></div>
              </li>
              <li className="flex items-center w-full mx-2">
                <div
                  className={`h-1 ${
                    passwordStrength >= 2 ? "bg-[#FF8447]" : "bg-[#E1E4EA]"
                  } w-24`}
                ></div>
              </li>
              <li className="flex items-center w-full">
                <div
                  className={`h-1 ${
                    passwordStrength >= 3 ? "bg-[#1FC16B]" : "bg-[#E1E4EA]"
                  } w-24`}
                ></div>
              </li>
            </ol>

            <div className="text-xs text-[#525866] my-4 text-left">
              Must contain at least:
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#525866] py-1">
              {/[A-Z]/.test(values.password) ? (
                <div className="bg-[#1FC16B] rounded-full p-1">
                  <Check className="text-white" size={12} />
                </div>
              ) : (
                <div className="bg-[#99A0AE] rounded-full p-1">
                  <X color="#fff" size={12} />
                </div>
              )}
              <span>At least 1 uppercase</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#525866] py-1">
              {/[0-9]/.test(values.password) ? (
                <div className="bg-[#1FC16B] rounded-full p-1">
                  <Check className="text-white" size={12} />
                </div>
              ) : (
                <div className="bg-[#99A0AE] rounded-full p-1">
                  <X color="#fff" size={12} />
                </div>
              )}
              <span>At least 1 number</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-[#525866] py-1">
              {values.password.length >= 8 ? (
                <div className="bg-[#1FC16B] rounded-full p-1">
                  <Check className="text-white" size={12} />
                </div>
              ) : (
                <div className="bg-[#99A0AE] rounded-full p-1">
                  <X color="#fff" size={12} />
                </div>
              )}
              <span>At least 8 characters</span>
            </div>
            <Button
              type="submit"
              size={"lg"}
              className="w-full my-6"
              disabled={isProcessing || isSubmitting}
              // loading={isProcessing || isSubmitting}
            >
              {isProcessing ? "Processing..." : "Continue"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
