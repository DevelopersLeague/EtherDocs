import React from 'react'
import {
  Heading,
  Container,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  SkeletonCircle,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
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
            <Thead bg={
              useColorModeValue("teal.200", "teal.700")
            }>
              <Tr>
                <Th>ID</Th>
                <Th w="30%">Name </Th>
                <Th>Issued By </Th>
                <Th maxW="12%" isTruncated>
                  Wallet Address
                </Th>
                <Th>Link to certificate </Th>
              </Tr>
            </Thead>
            <Tbody bg={
              useColorModeValue("teal.100", "teal.700")
            }
              opacity={"0.9"}>
              <Tr>
                <Td>1</Td>
                <Td>Sem-6 Marksheet</Td>
                <Td>Thadomal Shahani Engineering College</Td>
                <Td>0xffeueueehejej</Td>
                <Td>
                  <Link to="https://">
                    https://
                  </Link>

                </Td>
              </Tr>
              <Tr>
                <Td>2</Td>
                <Td>HSC Marksheet</Td>
                <Td>SVP College of Science and Commerce</Td>
                <Td>0xffeyyeyeyeye</Td>
                <Td>
                  <Link to="https://">
                    https://
                  </Link>

                </Td>
              </Tr>
              <Tr>
                <Td>3</Td>
                <Td>SSC Marksheet</Td>
                <Td>Shantinagar HighSchool</Td>
                <Td>0xffeyyeyeyeye</Td>
                <Td>
                  <Link to="https://">
                    https://
                  </Link>

                </Td>
              </Tr>
            </Tbody>

          </Table>
        </Box>
      </Container>
    </main>
  )
}

export default StudentIsRegistered