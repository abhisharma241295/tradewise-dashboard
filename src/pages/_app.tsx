// pages/_app.tsx
import "@/styles/globals.css"
import "@/styles/table.css"
import "primereact/resources/themes/lara-light-cyan/theme.css"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { PrimeReactProvider } from "primereact/api"
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider"
import { TailwindIndicator } from "@/components/ui/TailwindIndicator"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import AuthLayout from "@/components/layouts/AuthLayout"
import { mulish } from "@/lib/utils/fonts"
import { wrapper } from "@/lib/redux/store"
import { getWeddings, weddingApi } from "@/lib/redux/features/apis/weddingApi"
import SettingLayout from "@/components/layouts/SettingLayout"

export type LayoutWrapperProps = {
  children: React.ReactNode
  pathName: string
  weddingInfo?: any
}

const AuthLayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  pathName,
}) => <AuthLayout pathName={pathName}>{children}</AuthLayout>

const DashboardLayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  weddingInfo,
}) => <DashboardLayout weddingInfo={weddingInfo}>{children}</DashboardLayout>

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const isDashboardRoute = router.pathname.startsWith("/dashboard")
  const isSettingRoute = router.pathname.startsWith("/settings")
  const isAuthRoute = [
    "/login",
    "/signup",
    "/signup/confirm",
    "/login/confirm",
    "/reset-password",
    "/reset-password/confirm",
    "reset-password/new-password",
    "/onboarding",
  ].includes(router.pathname)

  const getLayout = (page: React.ReactNode) => {
    if (isDashboardRoute) {
      return (
        <DashboardLayoutWrapper
          weddingInfo={pageProps.weddingData}
          pathName={""}
        >
          {page}
        </DashboardLayoutWrapper>
      )
    }
    if (isAuthRoute) {
      return (
        <AuthLayoutWrapper pathName={router.pathname}>{page}</AuthLayoutWrapper>
      )
    }
    if (isSettingRoute) {
      return (
        <DashboardLayoutWrapper
          weddingInfo={pageProps.weddingData}
          pathName={""}
        >
          <SettingLayout>{page}</SettingLayout>
        </DashboardLayoutWrapper>
      )
    }
    return page
  }

  return (
    <PrimeReactProvider>
      <ReactQueryProvider>
        <main className={mulish.className}>
          {getLayout(
            <>
              <Component {...pageProps} />
              <TailwindIndicator />
            </>
          )}
        </main>
      </ReactQueryProvider>
    </PrimeReactProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }) => {
      const isDashboardRoute =
        ctx.pathname.startsWith("/dashboard") ||
        ctx.pathname.startsWith("/settings")

      let pageProps = {}

      // Get page-specific props if getInitialProps exists
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }

      const isLoggedOut = !store.getState().auth.token
      // If the user has logged out, clear persistent data
      if (isLoggedOut) {
        // console.log("User is logged out, clearing persisted data.")
        ;(store as any).__persistor
          .flush()
          .then(() => {
            return (store as any).__persistor.purge()
          })
          .catch((err: any) => console.error("Error during purge:", err))
      }
      // If it's a dashboard route, fetch the wedding data
      if (isDashboardRoute) {
        store.dispatch(getWeddings.initiate(undefined))
        await Promise.all(
          store.dispatch(weddingApi.util.getRunningQueriesThunk())
        )

        const weddingData =
          store.getState().weddingApi.queries["getWeddings(undefined)"]?.data ||
          null

        return {
          pageProps: {
            ...pageProps,
            weddingData,
          },
        }
      }

      return { pageProps }
    }
)

export default wrapper.withRedux(MyApp)
