import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetFeedback_like = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetFeedback_like),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const feedback_like = await db.feedback_like.findFirst({ where: { id } })

    if (!feedback_like) throw new NotFoundError()

    return feedback_like
  }
)
