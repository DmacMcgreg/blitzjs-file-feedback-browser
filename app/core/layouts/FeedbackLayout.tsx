import { Head, BlitzLayout } from "blitz"
import { Suspense } from "react"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "file-browser-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={"Loading..."}>{children}</Suspense>
    </>
  )
}

export default Layout
