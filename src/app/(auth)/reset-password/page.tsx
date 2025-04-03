"use client";
// import Button from "@/components/common/button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { ResetPasswordSchema } from "@/validationSchemas/authValidationSchema";
import { MailIcon } from "lucide-react";
import { Input } from "@/components/common/input";
import { usePasswordResetEmailMutation } from "@/redux/apis/userApi";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const [passwordResetEmail, { isLoading }] = usePasswordResetEmailMutation();

  const handleSubmit = async (values: { email: string }) => {
    try {
      const result = await passwordResetEmail(values);
      if (result.data) {
        router.push("/reset-password/reset-password-email-success");
      } else {
        // toast.error((result?.error as any).message || "Something went wrong!");
        toast.error("Something went wrong!");
      }
    } catch (err: Error | unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
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
          <div className="bg-white rounded-full p-4 flex items-center justify-center">
            <Image
              src="/icons/user-add-fill.svg"
              alt="User Icon"
              width={32}
              height={32}
            />
          </div>
        </div>
        <h3 className="pt-2 pb-1">Reset Password</h3>
        <p className="text-[#525866]">
          Enter your email to reset your password
        </p>
        <div className="flex items-center w-full my-6">
          <div className="flex-1 border-t border-[#E1E4EA] w-full"></div>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ResetPasswordSchema}
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
                  touched.email && errors.email ? errors.email : null
                }
                name="email"
                onChange={handleChange}
              />

              <div className="flex items-center space-x-2 mb-5">
                <Image
                  src="/icons/information-fill.svg"
                  width={16}
                  height={16}
                  alt="Information Icon"
                />
                <span className="text-[#525866] text-xs text-left">
                  Enter the email with which you ve registered.
                </span>
              </div>
              <Button
                type="submit"
                size={"lg"}
                className="w-full my-6"
                disabled={isLoading}
                // loading={isLoading}
              >
                {isLoading ? "Please Wait..." : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-[#525866]">
          Don&apos;t have an account?{"  "}
          <a href="/signup" className="text-[#0E121B] font-medium underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
