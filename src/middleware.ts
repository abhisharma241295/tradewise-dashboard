import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  AKITU_DASHBOARD_USER_DATA,
  AKITU_DASHBOARD_USER_TOKEN,
} from "./lib/raw-data/constants"

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get(AKITU_DASHBOARD_USER_TOKEN)?.value
  const userDataCookie = request.cookies.get(AKITU_DASHBOARD_USER_DATA)?.value

  const userData = userDataCookie ? JSON.parse(userDataCookie) : null
  // Temporary fix, as we know we are using jwt as session token it will be greater than 5
  if (sessionToken && sessionToken !== `""`) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (
      !userData?.isVerified &&
      (request.nextUrl.pathname === "/onboarding" ||
        request.nextUrl.pathname === "/dashboard")
    ) {
      return NextResponse.redirect(new URL("/signup/confirm", request.url))
    }

    if (!userData?.isOnboarded && request.nextUrl.pathname === "/onboarding") {
      return NextResponse.next()
    }

    if (userData?.isOnboarded && request.nextUrl.pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }
  // Redirect if user is not logged in and trying to access protected routes
  else if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/onboarding"],
}
