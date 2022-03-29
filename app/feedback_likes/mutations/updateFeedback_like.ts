import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateFeedback_like = z.object({
  userId: z.number(),
  feedbackId: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateFeedback_like),
  resolver.authorize(),
  async ({ feedbackId, userId }) => {
    const feedback_likeExists = await db.feedback_like.findMany({ where: { feedbackId, userId } })
    if (feedback_likeExists?.length) {
      return db.feedback_like.deleteMany({
        where: { feedbackId, userId },
      })
    } else {
      return db.feedback_like.create({
        data: {
          feedbackId,
          userId,
        },
      })
    }
  }
)
