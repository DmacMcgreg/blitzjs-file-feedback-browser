import { useParam } from "blitz"
import { useEffect } from "react"

const FilesViewer = () => {
  const filePath = useParam("filePath")

  return (
    <div>
      <h1>File Viewer</h1>
    </div>
  )
}

export default FilesViewer
