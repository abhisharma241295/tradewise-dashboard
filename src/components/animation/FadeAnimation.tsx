import React, { ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface FadeAnimationProps {
  children: ReactNode
  duration?: number
  delay?: number
}

const FadeAnimation: React.FC<FadeAnimationProps> = ({
  children,
  duration = 0.5,
  delay = 0,
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration, delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

export default FadeAnimation
