import { useCountdown } from "../hooks/useCountdown"

export default function ReverseTimeCounter() {
  const timeLeft = useCountdown(3600) // Start from 1 hour (3600 seconds)

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative h-72 w-full overflow-hidden">
      <img
        src="./reverse-timer-bg.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Time Remaining</h1>
          <div className="text-6xl font-bold text-white">{formatTime(timeLeft)}</div>
        </div>
      </div>
    </div>
  )
}

