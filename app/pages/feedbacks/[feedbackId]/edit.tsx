import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeedback from "app/feedbacks/queries/getFeedback"
import updateFeedback from "app/feedbacks/mutations/updateFeedback"
import { FeedbackForm, FORM_ERROR } from "app/feedbacks/components/FeedbackForm"

export const EditFeedback = () => {
  const router = useRouter()
  const feedbackId = useParam("feedbackId", "number")
  const [feedback, { setQueryData }] = useQuery(
    getFeedback,
    { id: feedbackId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateFeedbackMutation] = useMutation(updateFeedback)

  return (
    <>
      <Head>
        <title>Edit Feedback {feedback.id}</title>
      </Head>

      <div>
        <h1>Edit Feedback {feedback.id}</h1>
        <pre>{JSON.stringify(feedback, null, 2)}</pre>

        <FeedbackForm
          submitText="Update Feedback"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateFeedback}
          initialValues={feedback}
          onSubmit={async (values) => {
            try {
              const updated = await updateFeedbackMutation({
                id: feedback.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowFeedbackPage({ feedbackId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditFeedbackPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFeedback />
      </Suspense>

      <p>
        <Link href={Routes.FeedbacksPage()}>
          <a>Feedbacks</a>
        </Link>
      </p>
    </div>
  )
}

// EditFeedbackPage.authenticate = true
EditFeedbackPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditFeedbackPage
