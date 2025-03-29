export const authPosters: string[] = [
  "/auth-posters/auth-poster1.png",
  "/auth-posters/auth-poster2.png",
  "/auth-posters/auth-poster3.png",
  "/auth-posters/auth-poster4.png",
  "/auth-posters/auth-poster5.png",
  "/auth-posters/auth-poster6.png",
  "/auth-posters/auth-poster7.png",
  "/auth-posters/auth-poster8.png",
]
export default function getAuthPoster(
  path: string,
  onboardingIndex: number
): string {
  if (path === "/login") {
    return authPosters[1]
  } else if (path === "/signup") {
    return authPosters[0]
  } else if (path === "/signup/confirm") {
    return authPosters[2]
  } else if (path === "/login/confirm") {
    return authPosters[1]
  } else if (path === "/reset-password") {
    return authPosters[1]
  } else if (path === "/reset-password/confirm") {
    return authPosters[3]
  } else if (path === "reset-password/new-password") {
    return authPosters[3]
  } else if (path === "/onboarding" && onboardingIndex === 0) {
    return authPosters[4]
  } else if (path === "/onboarding" && onboardingIndex === 1) {
    return authPosters[5]
  } else if (path === "/onboarding" && onboardingIndex === 2) {
    return authPosters[6]
  } else if (path === "/onboarding" && onboardingIndex === 3) {
    return authPosters[7]
  } else {
    return authPosters[0]
  }
}
