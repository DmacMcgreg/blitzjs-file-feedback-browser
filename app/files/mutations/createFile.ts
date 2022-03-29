import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateFile = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateFile), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const file = await db.file.create({ data: input })

  return file
})
