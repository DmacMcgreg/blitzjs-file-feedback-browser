import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFiles from "app/files/queries/getFiles"
import "devextreme/dist/css/dx.light.css"
import FileManager from "devextreme-react/file-manager"
import CustomFileSystemProvider from "devextreme/file_management/custom_provider"

const ITEMS_PER_PAGE = 100

export const FilesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ files }] = usePaginatedQuery(getFiles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div>
      <FileManager fileSystemProvider={files}></FileManager>
    </div>
  )
}

const FilesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Files</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewFilePage()}>
            <a>Create File</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <FilesList />
        </Suspense>
      </div>
    </>
  )
}

FilesPage.authenticate = true
FilesPage.getLayout = (page) => <Layout>{page}</Layout>

export default FilesPage
