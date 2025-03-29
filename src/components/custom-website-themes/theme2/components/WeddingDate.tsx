
export default function WeddingDate() {
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
        </div>
      </div>
    </div>
  )
}

