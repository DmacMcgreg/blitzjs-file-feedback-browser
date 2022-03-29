import React, { ReactElement, useState } from "react"
import {
  chakra,
  Flex,
  Icon,
  useColorModeValue,
  Button,
  useBreakpointValue,
  Stack,
  SimpleGrid,
  ButtonGroup,
  IconButton,
  Box,
  useDisclosure,
  Input,
  FormLabel,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react"

import { AiFillEdit, AiTwotoneLock } from "react-icons/ai"
import { BsBoxArrowUpRight, BsFillTrashFill, BsCheck2Circle, BsHandThumbsUp } from "react-icons/bs"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, RouteUrlObject } from "blitz"

import Modal from "app/core/components/Modal"

const initialData = [
  { id: 1, title: "Daggy", createdAt: "7 days ago" },
  { id: 2, title: "Anubra", createdAt: "23 hours ago" },
  { id: 3, title: "Josef", createdAt: "A few seconds ago" },
  { id: 4, title: "Sage", createdAt: "A few hours ago" },
]

interface TableData {
  id: number
  title: string
  text: string
  canEdit?: boolean
  canDelete?: boolean
  createdAt?: Date | string
  approved?: boolean
  likes?: number
}
interface IProps {
  data: TableData[]
  filters?: Array<(props: any) => JSX.Element>
  canEdit?: boolean
  searchInputValue?: string
  onSearchInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  viewLink?: (id: number) => RouteUrlObject
  editLink?: (id: number) => RouteUrlObject
  approve?: (id: number, approve: boolean) => Promise<void>
  like: (id: number) => Promise<void>
}

const defaultUrlObject = { pathname: "", query: {}, hash: "" }
export default function ResponsiveTableWithEdit({
  data,
  canEdit,
  filters,
  viewLink = (id) => defaultUrlObject,
  editLink = (id) => defaultUrlObject,
  approve = async () => {},
  like = async () => {},
  onSearchInputChange = () => {},
  searchInputValue = "",
  ...rest
}: IProps) {
  const bg = useColorModeValue("white", "gray.800")
  const bg2 = useColorModeValue("white", "gray.800")
  const bg3 = useColorModeValue("gray.100", "gray.700")

  const [modalData, setModalData] = useState({ title: "", text: "" })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const canEditSettings = {
    cols: canEdit ? 4 : 4, //3,
    display: canEdit ? "inherit" : "inherit", //"none",
    adminActionsDisplay: canEdit ? "inherit" : "none",
    canEdit,
  }

  return (
    <Flex
      {...rest}
      w="full"
      bg="gray.600"
      overflow="scroll"
      p="50"
      h="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <HStack>
        <FormLabel>
          <Text color="white">Search</Text>
          <Input variant="solid" value={searchInputValue} onChange={onSearchInputChange} />
        </FormLabel>
        <VStack alignItems="flex-start">
          {filters?.map((Component, key) => {
            return <Component key={key} />
          })}
        </VStack>
      </HStack>
      <Stack
        direction={{ base: "column" }}
        w="full"
        bg={{ md: bg }}
        shadow="lg"
        h="600px"
        overflow="scroll"
      >
        <Modal title={modalData.title} text={modalData.text} isOpen={isOpen} onClose={onClose} />
        {data.map((token, tid) => {
          return (
            <Flex direction={{ base: "row", md: "column" }} bg={bg2} key={tid}>
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: canEditSettings.cols }}
                w={{ base: 120, md: "full" }}
                textTransform="uppercase"
                bg={bg3}
                color={"gray.500"}
                py={{ base: 1, md: 4 }}
                px={{ base: 2, md: 10 }}
                fontSize="md"
                fontWeight="hairline"
              >
                <chakra.span fontWeight="light" color="gray.900">
                  Name
                </chakra.span>
                <chakra.span fontWeight="light" color="gray.900">
                  Created
                </chakra.span>
                <chakra.span fontWeight="light" color="gray.900">
                  Data
                </chakra.span>
                <chakra.span
                  fontWeight="light"
                  color="gray.900"
                  display={canEditSettings.display}
                  textAlign={{ md: "right" }}
                >
                  Actions
                </chakra.span>
              </SimpleGrid>
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: canEditSettings.cols }}
                w="full"
                py={2}
                px={10}
                fontWeight="thin"
              >
                <chakra.span color="gray.800">{token.title}</chakra.span>
                <chakra.span
                  color="gray.800"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  pr="3"
                >
                  {/* {token.createdAt?.toString()} */}
                  {token.text}
                </chakra.span>

                <Flex>
                  <Button
                    size="sm"
                    ml="2"
                    variant="solid"
                    leftIcon={<Icon as={BsBoxArrowUpRight} />}
                    colorScheme="blue"
                    onClick={() => {
                      setModalData({ title: token.title, text: token.text })
                      onOpen()
                    }}
                  >
                    View Full Text
                  </Button>
                </Flex>

                <Flex justify={{ md: "end" }} display={canEditSettings.display}>
                  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    {canEdit && (
                      <>
                        <Link href={viewLink(token.id)}>
                          <IconButton
                            aria-label="View"
                            colorScheme="blue"
                            icon={<BsBoxArrowUpRight />}
                          />
                        </Link>
                        <IconButton
                          aria-label="Approve"
                          colorScheme="green"
                          variant={token.approved ? "solid" : "outline"}
                          onClick={() => approve(token.id, !token.approved)}
                          icon={<BsCheck2Circle />}
                        />
                        <Link href={editLink(token.id)}>
                          <IconButton aria-label="Edit" colorScheme="green" icon={<AiFillEdit />} />
                        </Link>
                        <IconButton
                          aria-label="Delete"
                          colorScheme="red"
                          variant="outline"
                          icon={<BsFillTrashFill />}
                        />
                      </>
                    )}

                    <IconButton
                      aria-label="Like"
                      colorScheme="blue"
                      variant={token.likes ? "solid" : "outline"}
                      onClick={() => like(token.id)}
                      icon={
                        <Flex>
                          {token.likes} <BsHandThumbsUp />
                        </Flex>
                      }
                    />
                  </ButtonGroup>
                </Flex>
              </SimpleGrid>
            </Flex>
          )
        })}
      </Stack>
    </Flex>
  )
}
