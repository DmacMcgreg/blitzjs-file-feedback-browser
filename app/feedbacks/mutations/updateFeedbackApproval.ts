import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateFeedbackApproval = z.object({
  id: z.number(),
  approve: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(UpdateFeedbackApproval),
  resolver.authorize(),
  async ({ id, approve }) => {
    const feedback = await db.feedback.update({ where: { id }, data: { admin_approved: approve } })

    return feedback
  }
)
