import React from 'react'
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Container,
  SimpleGrid,
  Box,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tooltip,
  Tr,
  Th,
  Td,
  TableCaption,
  Skeleton,
  Alert,
  AlertIcon,
  AlertDescription,
  HStack,
  Stack,
  Link,
  SkeletonCircle,
  Divider,
} from "@chakra-ui/react";
import styles from '../styles/Home.module.css'
const StudentIsRegistered = () => {
  return (
    <main className={styles.main}>
      <Container py={{ base: "10", md: "12" }} maxW={"7xl"}>
        <HStack spacing={2}>
          <SkeletonCircle size="4" />
          <Heading as="h4" size="lg" textAlign="left" ml="-2">
            Found {"3"} Certificates
          </Heading>
        </HStack>

        <Divider marginTop="4" />

        <Box overflowX="auto">
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th w="30%">Name </Th>
                <Th>Issued By </Th>
                <Th maxW="12%" isTruncated>
                  Wallet Address
                </Th>

              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Sem-6 Marksheet</Td>
                <Td>Thadomal Shahani Engineering College</Td>
                <Td>0xffeueueehejej</Td>
              </Tr>
              <Tr>
                <Td>2</Td>
                <Td>HSC Marksheet</Td>
                <Td>SVP College of Science and Commerce</Td>
                <Td>0xffeyyeyeyeye</Td>
              </Tr>
              <Tr>
                <Td>3</Td>
                <Td>SSC Marksheet</Td>
                <Td>Shantinagar HighSchool</Td>
                <Td>0xffeyyeyeyeye</Td>
              </Tr>
            </Tbody>

          </Table>
        </Box>
      </Container>
    </main>
  )
}

export default StudentIsRegistered