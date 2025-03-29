export default interface ExpenseEntry {
  description: string
  id: string
  paid: number
  due: number
  dueDate: string
  paymentTo: string
}
export interface ExpenseDto {
  amount: number
  category: string
  id: string
  title: string
}
