import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFile from "app/files/queries/getFile"
import updateFile from "app/files/mutations/updateFile"
import { FileForm, FORM_ERROR } from "app/files/components/FileForm"

export const EditFile = () => {
  const router = useRouter()
  const fileId = useParam("fileId", "number")
  const [file, { setQueryData }] = useQuery(
    getFile,
    { id: fileId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateFileMutation] = useMutation(updateFile)

  return (
    <>
      <Head>
        <title>Edit File {file.id}</title>
      </Head>

      <div>
        <h1>Edit File {file.id}</h1>
        <pre>{JSON.stringify(file, null, 2)}</pre>

        <FileForm
          submitText="Update File"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateFile}
          initialValues={file}
          onSubmit={async (values) => {
            try {
              const updated = await updateFileMutation({
                id: file.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowFilePage({ fileId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditFilePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFile />
      </Suspense>

      <p>
        <Link href={Routes.FilesPage()}>
          <a>Files</a>
        </Link>
      </p>
    </div>
  )
}

EditFilePage.authenticate = true
EditFilePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditFilePage
