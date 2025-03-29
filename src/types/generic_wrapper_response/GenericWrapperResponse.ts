export interface ApiResponse<T> {
  data: T
  message: string
  status: string
  timestamp: string
}
