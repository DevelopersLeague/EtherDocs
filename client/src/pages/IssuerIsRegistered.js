import React, { useState } from 'react'
import { useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css'
import { getClient } from '../lib/ClientManager'

const IssuerIsRegistered = () => {
    const [certiCount, setCertiCount] = useState(0)

    useEffect(() => {
        async function fn()
        {
            const client = getClient();
            let res = await client.getCertificatesIssuedBy();
            console.log(res);
            setCertiCount(res.length)
        }
        fn();
    }, [])
    
    

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
                        <Thead bg={
                            useColorModeValue("teal.200", "teal.700")
                        }>
                            <Tr>
                                <Th>ID</Th>
                                <Th w="30%">Name </Th>
                                <Th>Issued For </Th>
                                <Th>Address </Th>
                                <Th>Certificate link </Th>
                                

                            </Tr>
                        </Thead>
                        <Tbody bg={
                            useColorModeValue("teal.100", "teal.700")
                        }
                            opacity={"0.9"}>
                            <Tr>
                                <Td>1</Td>
                                <Td>Sem-6 Marksheet</Td>
                                <Td>Shyren More</Td>
                                <Td>0xffedheje</Td>
                                <Td>
                                    <Link to="https://">
                                        https://
                                    </Link>
                                    
                                </Td>
                                {/* <Td>0xffeueueehejej</Td> */}
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>HSC Marksheet</Td>
                                <Td>Aniket More</Td>
                                <Td>0xffedheje</Td>
                                <Td>
                                    <Link to="https://">
                                        https://
                                    </Link>

                                </Td>
                                
                            </Tr>
                            <Tr>
                                <Td>3</Td>
                                <Td>SSC Marksheet</Td>
                                <Td>Chirag M</Td>
                                <Td>0xffedheje</Td>
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

export default IssuerIsRegistered