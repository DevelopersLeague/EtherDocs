import React from "react";
import { useState, useEffect } from "react";
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
  Button,
} from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { useClient } from "../hooks/useClient";

const StudentIsRegistered = () => {
  const { client } = useClient();
  const [certiCount, setCertiCount] = useState(3);
  const [certificates, setCertificates] = useState([]);
  const [viewCertificateUrl, setViewCertificateUrl] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    async function fn() {
      if (client) {
        let res = await client.getCertificatesIssuedFor();
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
        <HStack spacing={2}>
          <SkeletonCircle size="4" />
          <Heading as="h4" size="lg" textAlign="left" ml="-2">
            Found {certiCount} Certificates
          </Heading>
        </HStack>

        <Divider marginTop="4" />

        <Box overflowX="auto">
          <Table>
            <Thead bg={useColorModeValue("teal.200", "teal.700")}>
              <Tr>
                <Th w={"15%"}>Name</Th>
                <Th w={"30%"}>UUID</Th>
                {/* <Th w="30%">Name </Th> */}
                <Th w="40%">Issued By</Th>
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
                console.log(cert);
                return (
                  <Tr>
                    <Td>{cert.name}</Td>
                    <Td>{cert.uuid}</Td>
                    {/* <Td>Sem-6 Marksheet</Td> */}
                    <Td>{cert.issuerAddr}</Td>
                    <Td>
                      <Button onClick={ () => {navigate("/certificate/"+cert.uuid)}}>View Certificate</Button>                    
                    </Td>
                  </Tr>
                );
              })}

              {/* <Tr>
                <Td>2</Td>
                <Td>HSC Marksheet</Td>
                <Td>SVP College of Science and Commerce</Td>
                <Td>0xffeyyeyeyeye</Td>
                <Td>
                  <Link to="https://">https://</Link>
                </Td>
              </Tr>
              <Tr>
                <Td>3</Td>
                <Td>SSC Marksheet</Td>
                <Td>Shantinagar HighSchool</Td>
                <Td>0xffeyyeyeyeye</Td>
                <Td>
                  <Link to="https://">https://</Link>
                </Td>
              </Tr> */}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </main>
  );
};

export default StudentIsRegistered;
