// import { featureFlags } from "../subscriptionConstants"

export interface PricingPlanCardProps {
  planName: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  isMonthly: boolean
}

export interface FeatureGuardProps {
  // feature: keyof typeof featureFlags
  userPlan: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export interface PricePlan {
  title: string
  price: number
  popular: boolean
  features: string[]
  product_id: string
  price_id: string
}
