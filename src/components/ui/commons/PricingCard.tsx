import React from "react"
import { User } from "lucide-react"
import { RadioButton } from "primereact/radiobutton"

interface PricingCardProps {
  price?: number
  benefits?: string[]
  selected?: boolean
  onSelect?: () => void
}

const PricingCard: React.FC<PricingCardProps> = ({
  price = 9.99,
  benefits = ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"],
  selected = false,
  onSelect = () => {},
}) => {
  return (
    <div className="w-[290px] rounded-xl border border-[#E3E3E7] bg-white shadow-sm">
      <div className="flex flex-row gap-4 p-4">
        {/* Radio Button */}
        <div className="pt-1">
          <RadioButton color="blue" checked={selected} onChange={onSelect} />
        </div>

        <div className="flex-1">
          <div className="flex w-full items-start justify-between">
            <div>
              <div className="flex items-baseline text-[#23273C]">
                <span className="text-4xl font-bold">$</span>
                <span className="text-4xl font-bold">{price.toFixed(2)}</span>
              </div>
              <div className="mt-1 text-[#898DA2]">per month</div>
            </div>
            <div className="rounded-lg bg-[#9AE6F5] p-2">
              <User className="h-6 w-6 text-[#141C25]" />
            </div>
          </div>

          <div className="mt-6">
            <div className="font-semibold text-[#23273C]">
              This plan includes:
            </div>

            <div className="mt-4 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1769_13658)">
                      <path
                        d="M18.3335 9.23333V10C18.3325 11.7971 17.7506 13.5455 16.6746 14.9849C15.5986 16.4242 14.0862 17.477 12.363 17.9866C10.6397 18.4962 8.79792 18.4349 7.11226 17.8122C5.4266 17.1894 3.98741 16.0384 3.00933 14.5309C2.03126 13.0234 1.5667 11.2401 1.68494 9.44693C1.80318 7.6538 2.49788 5.94694 3.66544 4.58089C4.833 3.21485 6.41086 2.26281 8.1637 1.86679C9.91654 1.47076 11.7504 1.65194 13.3919 2.38333M18.3335 3.33333L10.0002 11.675L7.50016 9.175"
                        stroke="#60BCBC"
                        strokeWidth="1.875"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1769_13658">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[#23273C]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCard
