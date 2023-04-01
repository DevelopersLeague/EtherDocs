import React, { useState } from "react";
import { useEffect } from "react";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Container,
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
  SkeletonCircle,
  Divider,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { useClient } from "../hooks/useClient";

const IssuerIsRegistered = () => {
  const { client } = useClient();
  const [certiCount, setCertiCount] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fn() {
      if (client) {
        let res = await client.getCertificatesIssuedBy();
        console.log(res);
        setCertificates(res);
        setCertiCount(res.length);
      }
    }
    fn();
  }, [client]);

  return (
    <main className={styles.main}>
      <Container py={{ base: "10", md: "12" }} maxW={"7xl"}>
        <Flex flexDirection={{ base: "column", lg: "row" }} py={4}>
          <Box py="2" pr="2">
            <Heading
              textAlign={useBreakpointValue({ base: "left" })}
              // fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              as="h4"
              isTruncated
              maxW={"3xl"}
              size={"lg"}
            >
              You have Issued {certiCount} Certificates
            </Heading>
          </Box>
          <Spacer />
          <Box py="2">
            <Link to={`/issuer/new-certificate`}>
              <Button
                display={{ sm: "inline-flex" }}
                justify={"flex-end"}
                fontSize={"md"}
                fontWeight={600}
                color={"white"}
                bg={"teal.400"}
                href={"#"}
                _hover={{
                  bg: "teal.300",
                }}
              >
                Issue New Certificate
              </Button>
            </Link>
          </Box>
        </Flex>{" "}
        {/* <Divider marginTop="4" /> */}
        <Box overflowX="auto">
          <Table>
            <Thead bg={useColorModeValue("teal.200", "teal.700")}>
              <Tr>
                <Th w={"15%"}>Name</Th>
                <Th w={"30%"}>UUID</Th>
                {/* <Th w="30%">Name </Th> */}
                <Th w="40%">Issued To </Th>
                {/* <Th maxW="12%" isTruncated>
                  Wallet Address
                </Th> */}
                <Th w="40%">Link to certificate </Th>
              </Tr>
            </Thead>
            <Tbody
              bg={useColorModeValue("teal.100", "teal.700")}
              opacity={"0.9"}
            >
              {certificates.map((cert) => {
                return (
                  <Tr key={cert.uuid}>
                    <Td>{cert.name}</Td>
                    <Td>{cert.uuid}</Td>
                    {/* <Td>Sem-6 Marksheet</Td> */}
                    <Td>{cert.userAddr}</Td>
                    <Td>
                    <Button onClick={ () => {navigate("/certificate/"+cert.uuid)}}>View Certificate</Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </main>
  );
};

export default IssuerIsRegistered;
