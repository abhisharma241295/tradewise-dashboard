"use client";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import Step1 from "@/components/auth/step1Form";
import Step2 from "@/components/auth/step2Form";
import Step3 from "@/components/auth/step3Form";

export default function Onboarding() {
  const signUpData = useAppSelector((state) => state.auth.signUpData);

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
            {signUpData && signUpData.stepId === 1 ? (
              <Image
                src="/icons/account-pin-box-fill.svg"
                alt="information"
                width={32}
                height={32}
              />
            ) : signUpData && signUpData.stepId === 2 ? (
              <Image
                src="/icons/account-pin-circle-fill.svg"
                alt="information"
                width={32}
                height={32}
              />
            ) : (
              <Image
                src="/icons/lock-fill.svg"
                alt="information"
                width={32}
                height={32}
              />
            )}
          </div>
        </div>

        <h3 className="mb-2">
          {signUpData && signUpData.stepId === 1
            ? "Personal Information"
            : signUpData && signUpData.stepId === 2
            ? "Position Selection"
            : "Password Setup"}
        </h3>
        <p className="mb-4 text-[#525866]">
          {signUpData && signUpData.stepId === 1
            ? "Provide essential information to proceed."
            : signUpData && signUpData.stepId === 2
            ? "Select your department and title."
            : "Set up a secure password to protect your account."}
        </p>
        <div className="flex items-center w-full my-6">
          <div className="flex-1 border-t border-[#E1E4EA] w-full"></div>
        </div>
        {signUpData && signUpData.stepId === 1 && <Step1 />}
        {signUpData && signUpData.stepId === 2 && <Step2 />}
        {signUpData && signUpData.stepId === 3 && <Step3 pageType="signup" />}
      </div>
    </div>
  );
}
