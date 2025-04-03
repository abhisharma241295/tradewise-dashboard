"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
// import Button from "@/components/common/button";
import { Button } from "@/components/ui/button";

export default function ResetPasswordFailed() {
  const router = useRouter();

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
        <h3 className="pt-2 pb-1">Reset Password Failed</h3>
        <p className="pb-6 text-[#525866]">
          For verification, please enter the correct code
        </p>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-[#E1E4EA] w-full"></div>
        </div>
        <Button
          type="button"
          size="lg"
          className="w-full mt-6"
          onClick={() => router.push("/reset-password")}
        >
          Try Again
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="w-full my-6"
          onClick={() => router.push("/login")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
