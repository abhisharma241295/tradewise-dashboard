"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Step3 from "@/components/auth/step3Form";

function NewPasswordContent() {
  const searchParams = useSearchParams();
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
              src="/icons/lock-fill.svg"
              alt="User Icon"
              width={32}
              height={32}
            />
          </div>
        </div>
        <h3 className="pt-2 pb-1">Password Setup</h3>
        <p className="text-[#525866]">
          Set up a secure password to protect your account.
        </p>
        <div className="flex items-center w-full my-6">
          <div className="flex-1 border-t border-[#E1E4EA] w-full"></div>
        </div>
        <Step3 pageType="reset" />
      </div>
    </div>
  );
}

export default function NewPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  );
}
