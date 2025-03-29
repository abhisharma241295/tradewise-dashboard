import Button from "@/components/ui/Button"
import React, { useState, useEffect } from "react"
import WeddingOverview from "@/types/WeddingOverview"
import Image from "next/image"
interface Props {
  data: WeddingOverview | undefined
}

export default function HomeGallery({ data }: Props) {
  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [images.length])
  if (Object.keys(data?.album ?? {}).length === 0) {
    return (
      <div className="relative h-[17rem] w-full cursor-pointer">
        <div className="h-full overflow-hidden rounded-[10px] border border-[#E3E3E7] p-4">
          <div className="flex size-full flex-col items-center justify-center rounded-[6px] bg-[#ECF4F5]">
            <svg
              width="114"
              height="114"
              viewBox="0 0 114 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                opacity="0.3"
                cx="57"
                cy="110.58"
                rx="57"
                ry="3.42"
                fill="#B6D3D6"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M87.1187 13.4226C87.1187 11.7639 88.4634 10.4192 90.1221 10.4192C91.7809 10.4192 93.1256 11.7639 93.1256 13.4226V19.6012C93.1256 21.26 91.7809 22.6046 90.1221 22.6046C88.4634 22.6046 87.1187 21.26 87.1187 19.6012V13.4226ZM90.1221 12.6992C89.7226 12.6992 89.3987 13.0231 89.3987 13.4226V19.6012C89.3987 20.0008 89.7226 20.3246 90.1221 20.3246C90.5217 20.3246 90.8456 20.0008 90.8456 19.6012V13.4226C90.8456 13.0231 90.5217 12.6992 90.1221 12.6992ZM22.8 33.06C22.8 27.3935 27.3936 22.8 33.06 22.8H80.94C86.6064 22.8 91.2 27.3935 91.2 33.06V71.0473C98.371 72.6129 103.74 78.9994 103.74 86.64C103.74 95.4545 96.5945 102.6 87.78 102.6C80.5501 102.6 74.443 97.7926 72.4809 91.2H33.06C27.3936 91.2 22.8 86.6064 22.8 80.94V33.06ZM71.9816 88.92C71.8751 88.1753 71.82 87.4141 71.82 86.64C71.82 82.1742 73.6542 78.1368 76.6103 75.24H36.48C32.7024 75.24 29.64 72.1776 29.64 68.4V36.48C29.64 32.7024 32.7024 29.64 36.48 29.64H77.52C81.2976 29.64 84.36 32.7024 84.36 36.48V68.4C84.36 69.3932 84.1483 70.3369 83.7676 71.1886C85.0496 70.8566 86.3942 70.68 87.78 70.68C88.1633 70.68 88.5435 70.6935 88.92 70.7201V33.06C88.92 28.6528 85.3472 25.08 80.94 25.08H33.06C28.6528 25.08 25.08 28.6528 25.08 33.06V80.94C25.08 85.3472 28.6528 88.92 33.06 88.92H71.9816ZM36.48 31.92C33.9616 31.92 31.92 33.9616 31.92 36.48V61.9981L40.6877 52.9494C43.3753 50.1757 47.8247 50.1757 50.5123 52.9494L58.3004 60.9871C59.5086 62.2341 61.4594 62.3778 62.8373 61.3214L67.6583 57.6253C70.1135 55.743 73.5265 55.743 75.9817 57.6253L82.08 62.3007V36.48C82.08 33.9616 80.0384 31.92 77.52 31.92H36.48ZM69.1791 48.5977C69.1791 51.221 67.0583 53.3477 64.4422 53.3477C61.8261 53.3477 59.7053 51.221 59.7053 48.5977C59.7053 45.9743 61.8261 43.8477 64.4422 43.8477C67.0583 43.8477 69.1791 45.9743 69.1791 48.5977ZM93.6548 25.8034C93.6548 24.1447 94.9995 22.8 96.6582 22.8H102.837C104.496 22.8 105.84 24.1447 105.84 25.8034C105.84 27.4622 104.496 28.8069 102.837 28.8069H96.6582C94.9995 28.8069 93.6548 27.4622 93.6548 25.8034ZM96.6582 25.08C96.2587 25.08 95.9348 25.4039 95.9348 25.8034C95.9348 26.203 96.2587 26.5269 96.6582 26.5269H102.837C103.236 26.5269 103.56 26.203 103.56 25.8034C103.56 25.4039 103.236 25.08 102.837 25.08H96.6582ZM74.1 86.64C74.1 79.0847 80.2247 72.96 87.78 72.96C95.3353 72.96 101.46 79.0847 101.46 86.64C101.46 94.1953 95.3353 100.32 87.78 100.32C80.2247 100.32 74.1 94.1953 74.1 86.64ZM84.93 79.23C84.93 77.656 86.206 76.38 87.78 76.38C89.354 76.38 90.63 77.656 90.63 79.23V86.07C90.63 87.644 89.354 88.92 87.78 88.92C86.206 88.92 84.93 87.644 84.93 86.07V79.23ZM87.78 78.66C87.4652 78.66 87.21 78.9152 87.21 79.23V86.07C87.21 86.3848 87.4652 86.64 87.78 86.64C88.0948 86.64 88.35 86.3848 88.35 86.07V79.23C88.35 78.9152 88.0948 78.66 87.78 78.66ZM87.78 96.9C86.206 96.9 84.93 95.624 84.93 94.05C84.93 92.476 86.206 91.2 87.78 91.2C89.354 91.2 90.63 92.476 90.63 94.05C90.63 95.624 89.354 96.9 87.78 96.9ZM87.21 94.05C87.21 94.3648 87.4652 94.62 87.78 94.62C88.0948 94.62 88.35 94.3648 88.35 94.05C88.35 93.7352 88.0948 93.48 87.78 93.48C87.4652 93.48 87.21 93.7352 87.21 94.05Z"
                fill="#D2E1E2"
              />
            </svg>
            <Button className="text-sm font-semibold" variant="link">
              Add an album
            </Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="relative h-[17rem] w-full overflow-hidden rounded-[5px]">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="h-full w-full flex-shrink-0">
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`Image ${index}`}
                layout="fill"
                objectFit="cover"
                width={500}
                height={500}
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
