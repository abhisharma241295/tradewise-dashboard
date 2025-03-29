import Cookies from "js-cookie"
import { NextPageContext } from "next"

export const saveAuthSession = (access_token: string) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = JSON.stringify({
    access_token: access_token,
    expires,
  })

  Cookies.set("session", session, {
    expires: expires,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  })
}

export const getSessionToken = (): string | null => {
  const sessionCookie = Cookies.get("session")
  if (!sessionCookie) return null

  try {
    const session = JSON.parse(sessionCookie)
    if (new Date(session.expires) > new Date()) {
      return session.access_token
    }
  } catch (error) {
    console.error("Error parsing session cookie:", error)
  }

  return null
}
export const getAuthToken = () => {
  return JSON.parse(Cookies.get("session") || "{}").access_token || ""
}

//NEW CODE

export const setCookie = (name: string, value: any, days: number) => {
  if (days > 0) {
    Cookies.set(name, JSON.stringify(value || ""), {
      expires: days,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
  } else {
    Cookies.set(name, JSON.stringify(value || ""))
  }
}

export const getCookie = (name: string) => {
  const sessionData = Cookies.get(name)
  if (!sessionData) return null
  const cookiesData = JSON.parse(sessionData)
  return cookiesData
}

export const eraseCookie = (name: string) => {
  Cookies.remove(name)
}

export function parseCookies(ctx?: NextPageContext): { userToken?: string } {
  try {
    // If we're on the server side
    if (ctx?.req) {
      const cookieHeader = ctx.req.headers.cookie

      if (!cookieHeader) {
        return { userToken: undefined }
      }

      // Extract the session cookie
      const sessionMatch = cookieHeader.match(
        /AKITU_DASHBOARD_USER_TOKEN=([^;]*)/
      )
      if (!sessionMatch) {
        return { userToken: undefined }
      }
      const decodedSession = decodeURIComponent(sessionMatch[1])
      const sessionData = JSON.parse(decodedSession)
      return {
        userToken: sessionData,
      }
    }

    // If we're on the client side
    if (typeof window !== "undefined") {
      const cookies = document.cookie
      const sessionMatch = cookies.match(/AKITU_DASHBOARD_USER_TOKEN=([^;]*)/)

      if (!sessionMatch) {
        return { userToken: undefined }
      }

      const decodedSession = decodeURIComponent(sessionMatch[1])
      const sessionData = JSON.parse(decodedSession)

      return {
        userToken: sessionData,
      }
    }
  } catch (error) {
    console.error("Error parsing cookies:", error)
    return { userToken: undefined }
  }

  // Fallback
  return { userToken: undefined }
}
