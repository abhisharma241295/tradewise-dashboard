import Cookies from "js-cookie"

export const saveCurrentWedding = (weddingId: string | null) => {
  const cookieValue = JSON.stringify({
    current_wedding: weddingId,
  })

  Cookies.set("currentWedding", cookieValue, {
    expires: Infinity,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  })
}

export const getCurrentWedding = (): string | null => {
  const currentWeddingCookie = Cookies.get("currentWedding")
  if (!currentWeddingCookie) return null

  try {
    const { current_wedding } = JSON.parse(currentWeddingCookie)
    return current_wedding
  } catch (error) {
    console.error("Error parsing currentWedding cookie:", error)
  }

  return null
}
