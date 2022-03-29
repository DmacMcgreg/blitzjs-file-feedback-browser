import React from "react"
import { Button, Flex, forwardRef, useColorModeValue } from "@chakra-ui/react"
import Pagination from "@choc-ui/paginator"

const Prev = forwardRef((props, ref) => (
  <Button ref={ref} {...props}>
    Prev
  </Button>
))
const Next = forwardRef((props, ref) => (
  <Button ref={ref} {...props}>
    Next
  </Button>
))

const itemRender = (_, type) => {
  if (type === "prev") {
    return Prev
  }
  if (type === "next") {
    return Next
  }
}

export default function Component({ h, ...props }) {
  return (
    <Flex
      w="full"
      h={h}
      bg={useColorModeValue("gray.400", "gray.600")}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        {...props}
        itemRender={itemRender}
        defaultCurrent={1}
        paginationProps={{ display: "flex" }}
      />
    </Flex>
  )
}
