import React, { useEffect, useState } from "react"
import ConfettiExplosion from "react-confetti-explosion"
import { useRouter } from "next/navigation"

export default function SendOnboardingData() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const confettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    width: 1600,
    height: 1600,
  }

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const redirectTimer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000)

    return () => {
      clearInterval(countdownInterval)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <>
      <div className="mt-12 h-full flex-col items-center justify-center text-center">
        <ConfettiExplosion {...confettiProps} />
        <span className="text-4xl text-foreground">
          Congratulations! 🎉
          <br />
          Your onboarding is complete
          <br />
        </span>
        <span className="mt-4 text-lg text-muted-foreground">
          Redirecting in {countdown} seconds...
        </span>
      </div>
    </>
  )
}
