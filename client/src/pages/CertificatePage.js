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
  Text,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import { useClient } from "../hooks/useClient";
import { useParams } from 'react-router-dom';
import { useProfile } from "../hooks/useProfile";
const CertificatePage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { client } = useClient();  
    const [certificate, setCertificate] = useState([]);
    const { profile } = useProfile();
    const teal200700 = useColorModeValue("teal.200", "teal.700");
    const teal100700 = useColorModeValue("teal.100", "teal.700");
    const [userProfile, setUserProfile] = useState([]);
    const [issuerProfile, setIssuerProfile] = useState([]);

    const invalidateCertificateAction = async (uuidOfCertificate) => {
        let res = await client.invalidateCertificate(uuidOfCertificate);
        res = await client.getCertificate(uuidOfCertificate);
        setCertificate(res);
    }

    // const getProfile = async(addressOfProfile) => {
    //     return {
    //         address: "aa",
    //         name: "Chirag",
    //         role: "User"
    //     };
    // }
    
  useEffect(() => {
    if (client && params.uuid) {
        async function fn() {            
            setIsLoading(true);                        
            let res = await client.getCertificate(params.uuid);
            let userProfileRes = await client.getProfileByAddress(res.userAddr);
            let issuerProfileRes = await client.getProfileByAddress(res.issuerAddr);
            setUserProfile(userProfileRes);
            setIssuerProfile(issuerProfileRes);
            setCertificate(res);
            setIsLoading(false);      
        }
        fn();
    }
  }, [client, params, params.uuid]); 
  console.log(profile);
  return (
    <main className={styles.main}>        
      <Container py={{ base: "10", md: "12" }} maxW={"7xl"}>        
        <HStack spacing={2}>
          <SkeletonCircle size="4" />          
            {!isLoading ? 
            <Heading as="h4" size="lg" textAlign="left" ml="-2">
                Certificate {certificate.name} For Chirag By TSEC
                </Heading>
                 : 
                <Heading as="h4" size="lg" textAlign="left" ml="-2">Certificate Page</Heading>
            }             
        </HStack>

        <Divider marginTop="4" />

        <Box overflowX="auto">
          <Table>
            <Tbody>
                <Tr>
                    <Th bg={useColorModeValue("teal.200", "teal.700")} w={"30%"}>Name Of Issuer</Th>    
                    <Td 
                        bg={useColorModeValue("teal.100", "teal.700")}
                        opacity={"0.7"}
                    >
                        {!isLoading ? 
                            <Text>
                                {issuerProfile.name}
                            </Text>
                                : 
                            <Text>Loading...</Text>
                        }
                    </Td>
                </Tr>
                <Tr>
                    <Th bg={useColorModeValue("teal.200", "teal.700")} w={"30%"}>Name Of Student</Th>    
                    <Td
                        bg={useColorModeValue("teal.100", "teal.700")}
                        opacity={"0.7"}
                    >
                        {!isLoading ? 
                            <Text>
                                {userProfile.name}
                            </Text>
                                : 
                            <Text>Loading...</Text>
                        }
                    </Td>
                </Tr>
                <Tr>
                    <Th bg={useColorModeValue("teal.200", "teal.700")} w="30%">Issued By (ADDRESS)</Th>    
                    <Td
                        bg={useColorModeValue("teal.100", "teal.700")}
                        opacity={"0.7"}
                    >
                        {!isLoading ? 
                            <Text>
                            {certificate.issuerAddr}
                            </Text>
                                : 
                            <Text>Loading...</Text>
                        }
                    </Td>
                </Tr>
                <Tr>
                    <Th bg={useColorModeValue("teal.200", "teal.700")} w="30%">Issued For (ADDRESS)</Th>    
                    <Td
                        bg={useColorModeValue("teal.100", "teal.700")}
                        opacity={"0.7"}
                    >
                        {!isLoading ? 
                            <Text>
                            {certificate.userAddr}                            
                            </Text>
                                : 
                            <Text>Loading...</Text>
                        }
                    </Td>
                </Tr>
                <Tr>
                    <Th bg={useColorModeValue("teal.200", "teal.700")} w={"30%"}>IPFS Link</Th>    
                    <Td
                        bg={useColorModeValue("teal.100", "teal.700")}
                        opacity={"0.7"}
                    >
                        {!isLoading ? 
                            <Text>
                            <a href={certificate.ipfsUrl}>Access IPFS Link ({certificate.ipfsUrl})</a>
                            </Text>
                                : 
                            <Text>Loading...</Text>
                        }
                    </Td>
                </Tr>
                <Tr>
                    <Th bg={useColorModeValue("teal.200", "teal.700")} w="30%">Certificate Status</Th>    
                    <Td
                        bg={useColorModeValue("teal.100", "teal.700")}
                        opacity={"0.7"}
                    >
                        {!isLoading ? (certificate.isValid ?
                            <Text>Valid Certificate</Text>
                            :
                            <Text>In-Valid Certificate</Text>)
                                : 
                            <Text>Loading...</Text>
                        }
                    </Td>
              </Tr>
                {(profile && profile.address == certificate.issuerAddr) && (certificate.isValid) ? 
                    <Tr>
                        <Th bg={teal200700} w="30%">Action </Th>    
                        <Td
                            bg={teal100700}
                            opacity={"0.7"}
                        >
                            {!isLoading ? (certificate.isValid ?
                                <Button onClick={() => {invalidateCertificateAction(certificate.uuid)} } colorScheme='teal' size='md'>
                                    Invalidate Certificate
                                </Button>
                                :
                                <Text>In-Valid Certificate</Text>)
                                    : 
                                <Text>Loading...</Text>
                            }                        
                        </Td>
                    </Tr> 
                    :
                    null
                }
            </Tbody>            
          </Table>
        </Box>        
      </Container>      
    </main>
  );
}

export default CertificatePage;
