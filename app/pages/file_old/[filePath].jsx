import { Box, Button, Flex, Heading, HStack, Spacer } from "@chakra-ui/react"
import { Link, useParam, useParams } from "blitz"

import { useEffect } from "react"

const FileViewer = () => {
  const filePath = useParam("filePath", String)
  const params = useParams()

  useEffect(() => {
    if (!filePath) return
    const loadWebviewer = async () => {
      const WebViewer = (await import("@pdftron/webviewer")).default
      WebViewer(
        {
          path: "/webviewer",
        },
        document.getElementById("viewer")
      ).then((instance) => {
        const { UI, Core } = instance
        const { documentViewer, annotationManager, Tools, Annotations } = Core
        // call methods from UI, Core, documentViewer and annotationManager as needed

        documentViewer.addEventListener("documentLoaded", () => {
          // call methods relating to the loaded document
        })

        instance.UI.loadDocument(
          `http://localhost:3001/file-manager/backend/root/My files/Documents/${filePath}`
        )
      })
    }
    loadWebviewer()
  }, [filePath])

  return (
    <Flex direction="column" maxH="100vh" bg="linkedin.200">
      <Box h="48px">
        <HStack px="12">
          <Heading>LOGO</Heading>
          <Spacer></Spacer>
          <Button variant="link">Home</Button>
          <Button variant="link">Presentations</Button>
        </HStack>
      </Box>
      <Box h="100vh" id="viewer"></Box>
      <Box h="48px" bg="linkedin.200">
        <HStack px="12">
          <Heading>LOGO</Heading>
          <Spacer></Spacer>
          <Button variant="link">Home</Button>
          <Button variant="link">Presentations</Button>
        </HStack>
      </Box>
    </Flex>
  )
}

export default FileViewer
