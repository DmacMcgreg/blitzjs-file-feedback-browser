import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateFeedback = z.object({
  title: z.string(),
  text: z.string(),
  userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateFeedback),
  resolver.authorize(),
  async ({ userId, text, title }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const feedback = await db.feedback.create({ data: { userId, text, title } })

    return feedback
  }
)
