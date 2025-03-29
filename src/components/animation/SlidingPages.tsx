import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppSelector } from "@/lib/redux/hooks"
// import { useAppSelector } from '@/lib/redux/hooks';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

interface SlidingPagesProps {
  children: React.ReactNode[]
}

export const SlidingPages: React.FC<SlidingPagesProps> = ({ children }) => {
  const direction = useAppSelector(
    (state) => state.onboardingSliderReducer.direction
  )
  const page = useAppSelector((state) => state.onboardingSliderReducer.page)
  return (
    <div className="relative w-full">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute w-full"
        >
          {children[page]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
