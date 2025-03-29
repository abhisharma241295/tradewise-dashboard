import axios from "axios"
import Cookies from "js-cookie"

type SignupUserArgs = {
  firstName: string
  lastName: string
  email: string
  password: string
}

type LoginUserArg = {
  email: string
  password: string
}

// Signup mutation function
export const signupUser = async (data: SignupUserArgs) => {
  const headersList = {
    Accept: "*/*",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    "Content-Type": "application/json",
  }
  console.log(headersList)
  const bodyContent = JSON.stringify({
    email: data.email,
    first_name: `${data.firstName}`,
    last_name: `${data.lastName}`,
    password: data.password,
    role: "user",
  })
  console.log(bodyContent)

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  try {
    const response = await axios.request(reqOptions)
    return { ...response.data, email: data.email }
  } catch (error) {
    console.error("Signup error:", error)
    throw error
  }
}

export const loginUser = async (data: LoginUserArg) => {
  const headersList = {
    Accept: "*/*",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    "Content-Type": "application/json",
  }

  const bodyContent = JSON.stringify({
    email: data.email,
    password: data.password,
  })

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  try {
    const response = await axios.request(reqOptions)
    return response.data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export const logOut = async () => {
  // Destroy the session
  Cookies.set("session", "", { expires: new Date(0) })
  localStorage.clear()
}

export const sendResetCode = async (email: string) => {
  const headersList = {
    Accept: "*/*",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    "Content-Type": "application/json",
  }

  const bodyContent = JSON.stringify({ email })

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot-password`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  try {
    const response = await axios.request(reqOptions)
    return response.data
  } catch {
    throw new Error("Failed to send reset code")
  }
}

export const resetPassword = async (
  resetToken?: string,
  password?: string,
  isUpdate: boolean = false
) => {
  const headersList = {
    Accept: "*/*",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    authToken: isUpdate ? getAuthToken() : resetToken,
    "Content-Type": "application/json",
  }

  const bodyContent = JSON.stringify({
    password: password,
    action: isUpdate ? "update" : "reset",
  })

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/password-manager`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  try {
    const response = await axios.request(reqOptions)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Reset password error:", error)
    throw error
  }
}

export const sendVerificationCode = async (email: string) => {
  const headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    "Content-Type": "application/json",
  }

  const bodyContent = JSON.stringify({
    email: email,
  })

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/send-verification-code`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  try {
    const response = await axios.request(reqOptions)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Send verification code error:", error)
    throw error
  }
}

export const verifyCode = async ({
  email,
  verificationCode,
}: {
  email: string
  verificationCode: string
}) => {
  const headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    "Content-Type": "application/json",
  }

  const bodyContent = JSON.stringify({
    email: email,
    verification_code: verificationCode,
  })

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-code`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  try {
    const response = await axios.request(reqOptions)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Verify code error:", error)
    throw error
  }
}
export const sendOnboardingData = async (body: {
  email: string
  designation: string
  city: string
  state: string
  purpose: string
  source: string
}) => {
  const headersList = {
    Accept: "*/*",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    "Content-Type": "application/json",
  }

  const bodyContent = JSON.stringify(body)

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/onboarding`,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  try {
    const response = await axios.request(reqOptions)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Onboarding error:", error)
    throw error
  }
}

export const getOnboardingData = async () => {
  const headersList = {
    Accept: "*/*",
    "Authorization-Token": process.env.NEXT_PUBLIC_AUTH_TOKEN,
    "Content-Type": "application/json",
    "user-token": getAuthToken(),
  }

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding`,
    method: "GET",
    headers: headersList,
  }

  try {
    const response = await axios.request(reqOptions)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Onboarding error:", error)
    throw error
  }
}
function getAuthToken() {
  return "THIS IS AUTH TOKEN"
}
