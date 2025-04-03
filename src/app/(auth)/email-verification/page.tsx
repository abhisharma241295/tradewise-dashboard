"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "react-otp-input";
import { Formik, Form } from "formik";
import { OTPSchema } from "@/validationSchemas/authValidationSchema";
import ValidationError from "@/components/common/validationError";
import {
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
} from "@/redux/apis/userApi";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { getCookie } from "@/lib/cookies";
import { TRADEWISE_EMAIL_RESET_PASSWORD } from "@/lib/constants";
import { toast } from "sonner";
import { setCredentials } from "@/redux/slices/authSlice";

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const dispatch = useAppDispatch();
  const codeRequestedRef = useRef(false);

  const signUpData = useAppSelector((state) => state.auth.signUpData);
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const resetEmail = getCookie(TRADEWISE_EMAIL_RESET_PASSWORD);

  useEffect(() => {
    // Only send verification code once
    if (
      !codeRequestedRef.current &&
      ((signUpData && signUpData.email) || resetEmail)
    ) {
      codeRequestedRef.current = true;
      sendVerificationCode({
        email: (signUpData && signUpData.email) || resetEmail,
      }).then((result) => {
        if ("error" in result) {
          toast.error("Failed to send verification code. Please try again.");
          codeRequestedRef.current = false;
        }
      });
    }
  }, [signUpData, resetEmail, sendVerificationCode]);

  const handleSubmit = async (values: { otp: string }) => {
    try {
      const result = await verifyCode({
        email: (signUpData && signUpData.email) || resetEmail,
        otp: values.otp,
      });

      if ("data" in result && result.data) {
        if (action === "reset") {
          router.push("/reset-password/new-password");
        } else {
          dispatch(
            setCredentials({
              fullName: result.data.full_name,
              isUserVerified: true,
              token: result.data.access_token,
              days: 0,
              email: result.data.email || signUpData?.email || "",
              department: result.data.department || "",
              designation: result.data.designation || "",
              biography: result.data.biography || "",
            })
          );
          router.push("/email-verification-success");
        }
      } else if ("error" in result) {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
    }
  };

  const handleResendCode = async () => {
    try {
      const emailToSend = signUpData?.email || resetEmail;
      if (!emailToSend) {
        toast.error("Email is missing!");
        return;
      }

      codeRequestedRef.current = true;
      const result = await sendVerificationCode({ email: emailToSend });

      if ("data" in result) {
        toast.success("Verification code resent successfully!");
      } else if ("error" in result) {
        toast.error("Failed to resend verification code. Please try again.");
        codeRequestedRef.current = false;
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
      codeRequestedRef.current = false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-center items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-xl p-6 flex flex-col items-center bg-white z-10 shadow-[0px_1px_2px_rgba(27,28,29,0.48)] shadow-[0px_0px_0px_1px_#242628]">
        <div
          className="rounded-full p-4 bg-[#E1E4EA] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(113, 119, 132, 0.10) 0%, rgba(113, 119, 132, 0.00) 100%)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className=" bg-white rounded-full p-4 flex items-center justify-center">
            <Image
              src="/icons/user-add-fill.svg"
              alt="User Icon"
              width={32}
              height={32}
            />
          </div>
        </div>
        <h3 className="pt-2 pb-1">
          {action === "reset"
            ? "Enter OTP to Reset password"
            : "Email Address Verification"}
        </h3>
        <p className="pb-6 text-[#525866]">
          We`&apos;`ve sent a code to{" "}
          <span className="text-[#0E121B] font-medium">
            {signUpData ? signUpData?.email : resetEmail}
          </span>
        </p>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-[#E1E4EA] w-full"></div>
        </div>
        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={OTPSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => {
            return (
              <Form>
                <div className="p-2 w-full">
                  <div className="mb-3 py-4 px-2">
                    <OtpInput
                      value={values.otp}
                      onChange={(otp) => setFieldValue("otp", otp)}
                      numInputs={4}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={{
                        width: "clamp(60px, 20vw, 90px)",
                        height: "clamp(48px, 15vw, 64px)",
                        fontSize: "clamp(18px, 5vw, 24px)",
                        margin: "0 10px ",
                        borderRadius: "10px",
                        border: "1px solid #E1E4EA",
                        padding: "16px 8px",
                        alignItems: "flex-start",
                      }}
                    />
                    {errors.otp && touched.otp && (
                      <ValidationError message={errors.otp} />
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    size={"lg"}
                    className={`w-full my-6 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Please wait..." : "Done"}
                  </Button>
                  <p className="text-sm text-[#525866] mt-4">
                    Experiencing issues receiving the code?
                  </p>
                  <p
                    className="underline text-sm cursor-pointer"
                    onClick={handleResendCode}
                  >
                    Resend code
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default function EmailVerification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationContent />
    </Suspense>
  );
}
