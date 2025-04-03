import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { TRADEWISE_USER_TOKEN } from "@/lib/constants"

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get(TRADEWISE_USER_TOKEN)?.value || 'dummy_token'
  console.log(sessionToken)

  // Debug logging (remove in production)
  console.log(`Middleware running for path: ${request.nextUrl.pathname}`)
  console.log(`Token exists: ${!!sessionToken}`)

  if (sessionToken) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup" ||
      request.nextUrl.pathname.startsWith("/onboarding")
    ) {
      console.log("Redirecting authenticated user to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    // Redirect from /dashboard root to /dashboard/policy-monitoring
    if (request.nextUrl.pathname === "/dashboard") {
      console.log("Redirecting from dashboard root to policy-monitoring")
      return NextResponse.redirect(new URL("/dashboard/policy-monitoring", request.url))
    }
  } 
  console.log("sessionToken", sessionToken)
  if (
    !sessionToken &&
    (request.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    console.log("Redirecting unauthenticated user to login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/login", 
    "/signup", 
    "/dashboard/:path*", 
    "/onboarding/:path*",
    "/email-verification",
    "/email-verification-success"
  ],
} 