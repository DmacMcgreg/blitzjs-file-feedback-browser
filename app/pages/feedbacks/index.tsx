import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  useSession,
  useMutation,
  useQuery,
  invoke,
} from "blitz"
import FeedbackLayout from "app/core/layouts/FeedbackLayout"
import getFeedbacks from "app/feedbacks/queries/getFeedbacks"
import ResponsiveTableWithEdit from "app/core/components/ResponsiveTableWithEdit"
import { Feedback, Feedback_like } from "@prisma/client"
import updateFeedback_like from "app/feedback_likes/mutations/updateFeedback_like"
import updateFeedbackApproval from "app/feedbacks/mutations/updateFeedbackApproval"
import Pagination from "app/core/components/Pagination"
import { Box, Checkbox, Flex } from "@chakra-ui/react"
import { useDebounce } from "react-use"

import db, { Prisma } from "db"

const ITEMS_PER_PAGE = 10

export const FeedbacksPage = () => {
  const router = useRouter()
  const session = useSession()
  const isLoggedIn = !!session.userId
  const page = Number(router.query.page) || 1
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("")
  const [showApproved, setShowApproved] = useState(false)
  const [showRejected, setShowRejected] = useState(false)

  useDebounce(
    () => {
      setDebouncedSearchValue(searchValue)
    },
    300,
    [searchValue]
  )

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  const showAdminApproved = isLoggedIn ? showApproved && session?.role?.includes("ADMIN") : false
  const showAdminRejected = isLoggedIn ? showRejected && session?.role?.includes("ADMIN") : false

  const [{ feedbacks, hasMore, count }, { refetch }] = usePaginatedQuery(getFeedbacks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * (page - 1),
    take: ITEMS_PER_PAGE,
    where: {
      // admin_rejected; showAdminRejected,
      OR: [{ admin_approved: false }, { admin_approved: showAdminApproved }],
      ...(debouncedSearchValue?.length > 0 && { title: { contains: debouncedSearchValue } }),
    },
  })

  const tableData = feedbacks.map((feedback) => ({
    ...feedback,
    approved: feedback.admin_approved,
    likes: feedback._count.feedbackLikes,
  }))

  const [updateFeedbackLikeMutation] = useMutation(updateFeedback_like)
  const [updateFeedbackApprovalMutation] = useMutation(updateFeedbackApproval)

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  const goToPage = (p) => router.push({ query: { page: p } })

  useEffect(() => {
    console.log(showApproved)
    refetch()
  }, [showApproved, showRejected, refetch])

  const showAlreadyApproved = (props) => (
    <Checkbox
      {...props}
      isChecked={showApproved}
      color="white"
      onChange={(e) => {
        console.log(e.target.checked)
        setShowApproved(e.target.checked)
      }}
    >
      Show Accepted
    </Checkbox>
  )
  const showAlreadyRejected = (props) => (
    <Checkbox
      {...props}
      isChecked={showRejected}
      color="white"
      onChange={(e) => {
        setShowRejected(e.target.checked)
      }}
    >
      Show rejected
    </Checkbox>
  )

  const filters = [showAlreadyApproved, showAlreadyRejected]

  return (
    <Flex h="100vh" minH="100%" position="relative" direction="column">
      <ResponsiveTableWithEdit
        data={tableData}
        filters={filters}
        onSearchInputChange={handleSearchValueChange}
        searchInputValue={searchValue}
        canEdit
        viewLink={(id) => Routes.ShowFeedbackPage({ feedbackId: id })}
        editLink={(id) => Routes.EditFeedbackPage({ feedbackId: id })}
        like={async (feedbackId: number) => {
          const userId = session.userId
          userId && (await updateFeedbackLikeMutation({ userId, feedbackId }))

          refetch()
        }}
        approve={async (id: number, approve: boolean) => {
          session.userId && (await updateFeedbackApprovalMutation({ id, approve }))

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

FeedbacksPage.getLayout = (page) => <FeedbackLayout>{page}</FeedbackLayout>

export default FeedbacksPage
