import { useState, useEffect } from "react"

export function useCountdown(initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return timeLeft
}
