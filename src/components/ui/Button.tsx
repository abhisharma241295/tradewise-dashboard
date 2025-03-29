import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"
import { Loader } from "lucide-react"

const buttonVariants = cva(
  "rounded-lg font-medium transition-colors  disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline focus:ring-0 !m-0 !p-0",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
        fab: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  loading?: boolean
  bouncy?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  disabled = false,
  loading = false,
  bouncy = false,
  ...props
}) => {
  return (
    <motion.button
      className={cn(
        "flex flex-row items-center justify-center gap-1",
        buttonVariants({ variant, size, className })
      )}
      disabled={disabled}
      whileHover={!disabled && bouncy ? { scale: 1.05 } : undefined}
      whileTap={!disabled && bouncy ? { scale: 0.95 } : undefined}
      transition={
        !disabled && bouncy
          ? { type: "spring", stiffness: 400, damping: 17 }
          : undefined
      }
      {...props}
    >
      {loading && <Loader className="animate-spin" />}
      {children}
    </motion.button>
  )
}

export default Button
