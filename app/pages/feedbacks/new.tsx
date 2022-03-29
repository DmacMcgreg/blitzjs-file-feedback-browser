import { Link, useRouter, useMutation, BlitzPage, Routes, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFeedback from "app/feedbacks/mutations/createFeedback"
import { FeedbackForm, FORM_ERROR } from "app/feedbacks/components/FeedbackForm"
import { Box, chakra, Flex, Heading } from "@chakra-ui/react"
import { Suspense } from "react"
chakra

const Form = () => {
  const router = useRouter()
  const user = useSession()
  const [createFeedbackMutation] = useMutation(createFeedback)
  return (
    <Flex justifyContent="center" w="50%" direction="column" p="12">
      <FeedbackForm
        submitText="Create Feedback"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateFeedback}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            let data = {
              ...values,
              userId: user.userId,
            }
            const feedback = await createFeedbackMutation(data)
            router.push(Routes.FeedbacksPageAll())
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Flex>
  )
}

const NewFeedbackPage: BlitzPage = () => {
  return (
    <Flex direction="row" bg="gray.100" h="100vh">
      <Flex h="100%" alignItems="center" w="50%" justifyContent="center">
        <Heading as="h1">Create New Feedback</Heading>
      </Flex>
      <Suspense fallback={"Loading user..."}>
        <Form />
      </Suspense>

      {/* 
      <p>
      <Link href={Routes.FeedbacksPage()}>
          <a>Feedbacks</a>
        </Link>
      </p> */}
    </Flex>
  )
}

NewFeedbackPage.authenticate = true
NewFeedbackPage.getLayout = (page) => <Layout title={"Create New Feedback"}>{page}</Layout>

export default NewFeedbackPage
