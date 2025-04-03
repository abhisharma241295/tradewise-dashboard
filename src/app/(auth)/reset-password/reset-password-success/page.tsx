"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordSuccess() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          router.push("/login");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

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
        <h3 className="pt-2 pb-1">Password Reset Successfully</h3>
        <p className="pb-6 text-[#525866]">
          Your password has been reset successfully
        </p>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-[#E1E4EA] w-full"></div>
        </div>
        <p className="pb-6 text-[#525866]">
          Redirecting you to dashboard{" "}
          <span className="font-bold">0{timeLeft}:00</span>
        </p>
      </div>
    </div>
  );
}
