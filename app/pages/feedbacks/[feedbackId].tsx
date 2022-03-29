import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeedback from "app/feedbacks/queries/getFeedback"
import deleteFeedback from "app/feedbacks/mutations/deleteFeedback"

export const Feedback = () => {
  const router = useRouter()
  const feedbackId = useParam("feedbackId", "number")
  const [deleteFeedbackMutation] = useMutation(deleteFeedback)
  const [feedback] = useQuery(getFeedback, { id: feedbackId })

  return (
    <>
      <Head>
        <title>Feedback {feedback.id}</title>
      </Head>

      <div>
        <h1>Feedback {feedback.id}</h1>
        <pre>{JSON.stringify(feedback, null, 2)}</pre>

        <Link href={Routes.EditFeedbackPage({ feedbackId: feedback.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFeedbackMutation({ id: feedback.id })
              router.push(Routes.FeedbacksPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowFeedbackPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.FeedbacksPage()}>
          <a>Feedbacks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Feedback />
      </Suspense>
    </div>
  )
}

// ShowFeedbackPage.authenticate = true
ShowFeedbackPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowFeedbackPage
