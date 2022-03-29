import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetFeedback_likesInput
  extends Pick<Prisma.Feedback_likeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFeedback_likesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: feedback_likes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.feedback_like.count({ where }),
      query: (paginateArgs) => db.feedback_like.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      feedback_likes,
      nextPage,
      hasMore,
      count,
    }
  }
)
