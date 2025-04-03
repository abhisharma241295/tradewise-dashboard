"use client";
import React, { useState } from "react";
// import Button from "@/components/common/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { SignUpSchema } from "@/validationSchemas/authValidationSchema";
import { MailIcon } from "lucide-react";
import { Input } from "@/components/common/input";
import { setSignUpData } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useCheckEmailExistMutation } from "@/redux/apis/userApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [checkEmailExist, { isLoading }] = useCheckEmailExistMutation();

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAgreed(e.target.checked);
  };

  const handleSubmit = async (values: { email: string }) => {
    try {
      const result = await checkEmailExist(values);
      console.log("res", result);
      if (result.data) {
        toast.error("Email already Exists!");
        // toast.error((result?.error as any).message || "Something went wrong!");
      } else {
        dispatch(setSignUpData({ ...values, stepId: 1 }));
        router.push("/onboarding");
      }
    } catch (err: Error | unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
    }
  };

  return (
    <div className="h-full flex flex-col text-center items-center justify-center py-10">
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
        <h3 className="pt-2 pb-1">Join Synergy Team</h3>
        <p className="pb-6 text-[#525866]">
          Get started by submitting your email address.
        </p>
        <div className="rounded-lg border border-[#E1E4EA] p-2 flex items-center justify-center w-full mb-6">
          <Image
            src="/icons/Google-logo.svg"
            alt="Google Logo"
            width={20}
            height={20}
          />
        </div>
        <div className="flex items-center w-full mb-6">
          <div className="flex-1 border-t border-[#E1E4EA]"></div>
          <p className="text-[#99A0AE] text-xs px-2.5">OR</p>
          <div className="flex-1 border-t border-[#E1E4EA]"></div>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange }) => (
            <Form className="w-full">
              <Input
                type="email"
                placeholder="hello@alignui.com"
                fieldLabel={"Email Address"}
                required
                startIcon={<MailIcon className="h-5 w-5 text-[#99A0AE]" />}
                validationErr={
                  errors.email && touched.email ? errors.email : null
                }
                name="email"
                onChange={handleChange}
              />
              <div className="flex justify-between w-full text-sm text-blue-600 mt-4">
                <label className="flex items-center text-[#525866]">
                  <input
                    type="checkbox"
                    className="mr-2 mt-1 md:mt-0"
                    onChange={handleTermsChange}
                    checked={termsAgreed}
                  />
                  <span className="flex flex-wrap">
                    I agree to the &nbsp;
                    <a href="#" className="text-[#0E121B] underline">
                      Terms & Conditions
                    </a>
                    &nbsp; and &nbsp;
                    <a href="#" className="text-[#0E121B] underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>
              <Button
                type="submit"
                size={"lg"}
                className="w-full my-6"
                disabled={(!termsAgreed)||isLoading}
                // loading={isLoading}
              >
                {isLoading ? "Please Wait..." : "Get Started"}
              </Button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-[#525866] ">
          Already have an account?{" "}
          <a href="/login" className="text-[#0E121B] font-medium underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
