import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetFilesInput
  extends Pick<Prisma.FileFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

const fs = require("fs")

function parseDirectory(directory) {
  return fs.readdirSync(directory).reduce((out, item) => {
    const itemPath = `${directory}/${item}`

    if (fs.statSync(itemPath).isDirectory()) {
      out.push({
        name: item,
        isDirectory: true,
        items: parseDirectory(itemPath),
      })
    } else {
      out.push({
        name: item,
        // size: 1024,
        published: "2019/05/08",
        // dateModified: "2019/05/08",
        // thumbnail: "/thumbnails/images/jpeg.ico",
        isDirectory: false,
      })
    }

    return out
  }, [])
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFilesInput) => {
    const files = parseDirectory(
      "/Users/davidmcgregor/Documents/2. Code/blitz-file-browser/public/file-manager/backend/root/my_files"
    )

    return {
      files,
      // nextPage,
      // hasMore,
      // count,
    }
  }
)
