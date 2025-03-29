export function errorFilter(error: Error | null): string | null {
  if (error == null) return null
  try {
    if (error.name === "AxiosError") {
      return (error as any).response.data.message
    }
  } catch {
    return "Unknown error"
  }
  return "Unknown error"
}
