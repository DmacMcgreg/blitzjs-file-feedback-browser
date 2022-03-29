import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateFeedback = z.object({
  id: z.number(),
  title: z.string(),
})

const UpdateFeedbackApproval = z.object({
  id: z.number(),
  approve: z.boolean(),
})

export const updateFeedbackApproval = resolver.pipe(
  resolver.zod(UpdateFeedbackApproval),
  resolver.authorize(),
  async ({ id, approve }) => {
    const feedback = await db.feedback.update({ where: { id }, data: { admin_approved: approve } })

    return feedback
  }
)

export default resolver.pipe(
  resolver.zod(UpdateFeedback),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const feedback = await db.feedback.update({ where: { id }, data })

    return feedback
  }
)
