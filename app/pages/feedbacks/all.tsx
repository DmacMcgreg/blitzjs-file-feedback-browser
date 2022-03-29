import { Suspense } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  useSession,
  useMutation,
} from "blitz"
import FeedbackLayout from "app/core/layouts/FeedbackLayout"
import getFeedbacks from "app/feedbacks/queries/getFeedbacks"
import ResponsiveTableWithEdit from "app/core/components/ResponsiveTableWithEdit"
import { Feedback, Feedback_like } from "@prisma/client"
import updateFeedback_like from "app/feedback_likes/mutations/updateFeedback_like"
import updateFeedbackApproval from "app/feedbacks/mutations/updateFeedbackApproval"
import Pagination from "app/core/components/Pagination"
import { Box, Flex } from "@chakra-ui/react"

const ITEMS_PER_PAGE = 5

const FeedbacksPageAll = () => {
  const router = useRouter()
  const session = useSession()
  const isLoggedIn = !!session.userId
  const page = Number(router.query.page) || 1
  const [{ feedbacks, hasMore, count }, { refetch }] = usePaginatedQuery(getFeedbacks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    where: {
      admin_approved: true,
    },
  })

  const tableData = feedbacks.map((feedback) => ({
    ...feedback,
    likes: feedback._count.feedbackLikes,
  }))

  const [updateFeedbackLikeMutation] = useMutation(updateFeedback_like)
  const [updateFeedbackApprovalMutation] = useMutation(updateFeedbackApproval)

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  const goToPage = (p) => router.push({ query: { page: p } })

  return (
    <Flex h="100vh" minH="100%" position="relative" direction="column">
      <ResponsiveTableWithEdit
        data={tableData}
        viewLink={(id) => Routes.ShowFeedbackPage({ feedbackId: id })}
        like={async (feedbackId: number) => {
          const userId = session.userId
          userId && (await updateFeedbackLikeMutation({ userId, feedbackId }))

          refetch()
        }}
      />

      <Pagination
        h="200px"
        current={page}
        onChange={goToPage}
        pageSize={ITEMS_PER_PAGE}
        total={count}
        // itemRender={itemRender}
        paginationProps={{
          display: "flex",
          pos: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        colorScheme="blue"
        focusRing="blue.200"
      />
    </Flex>
  )
}

FeedbacksPageAll.authenticate = false
FeedbacksPageAll.getLayout = (page) => <FeedbackLayout>{page}</FeedbackLayout>

export default FeedbacksPageAll
