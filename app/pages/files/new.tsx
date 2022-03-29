import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFile from "app/files/mutations/createFile"
import { FileForm, FORM_ERROR } from "app/files/components/FileForm"

const NewFilePage: BlitzPage = () => {
  const router = useRouter()
  const [createFileMutation] = useMutation(createFile)

  return (
    <div>
      <h1>Create New File</h1>

      <FileForm
        submitText="Create File"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateFile}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const file = await createFileMutation(values)
            router.push(Routes.ShowFilePage({ fileId: file.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.FilesPage()}>
          <a>Files</a>
        </Link>
      </p>
    </div>
  )
}

NewFilePage.authenticate = true
NewFilePage.getLayout = (page) => <Layout title={"Create New File"}>{page}</Layout>

export default NewFilePage
