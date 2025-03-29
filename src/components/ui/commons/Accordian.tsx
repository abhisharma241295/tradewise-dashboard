import { cn } from "@/lib/utils/cn"
import { ReactNode, useState } from "react"

interface AccordionProps {
  title: string
  children: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button
        className={cn(
          "flex w-full items-center justify-between border-t p-4 text-left font-medium",
          isOpen && "shadow-md"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>
          {isOpen ? (
            <svg
              width="9"
              height="2"
              viewBox="0 0 9 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1H8"
                stroke="#11131C"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            "☐"
          )}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "1000px" : "0" }}
      >
        {children}
      </div>
    </div>
  )
}
export default Accordion
