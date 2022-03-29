import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { Box } from "@chakra-ui/react"

const Home: BlitzPage = () => {
  return (
    <Box h="100vh" w="100%">
      <iframe src="https://presentationplatform-dev-cac-inv.azurewebsites.net/viewer/doc/Horizon-Corporate-Deck-.pdf#1"></iframe>
    </Box>
  )
}

Home.authenticate = { redirectTo: Routes.LoginPage() }
Home.redirectAuthenticatedTo = ({ session }) =>
  session.role.includes("admin") ? Routes.FeedbacksPage() : Routes.FeedbacksPageAll()
Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
