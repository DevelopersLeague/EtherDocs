import React, { useEffect } from "react";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Container,
  SimpleGrid,
  Divider,
  Icon,
  SkeletonCircle,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FcApproval, FcManager, FcBusinessman } from "react-icons/fc";
import FeatureBox from "../components/FeatureBox";
import styles from "../styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useMetamask } from "../hooks/useMetamask";

const ConnectWalletPage = () => {
  const navigate = useNavigate();
  const { connect, isConnected } = useMetamask();

  useEffect(() => {
    if (isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  return (
    <main className={styles.main}>
      <Container py={{ base: "4", md: "12" }} maxW={"7xl"} align={"left"}>
        {" "}
        <Heading
          textAlign={useBreakpointValue({ base: "left" })}
          fontFamily={"heading"}
          color={useColorModeValue("gray.800", "white")}
          as="h1"
          py={4}
        >
          A modern & secure way of managing student documents using <br />{" "}
          Ethereum Blockchain ✨
        </Heading>
        <Button
          display={{ sm: "inline-flex" }}
          fontSize={"lg"}
          fontWeight={600}
          color={"white"}
          bg={"teal.400"}
          _hover={{
            bg: "teal.300",
          }}
          onClick={() => {
            connect();
          }}
        >
          Connect Wallet
        </Button>
        {/* </Link> */}
      </Container>
      <Container
        py={{ base: "4", md: "12" }}
        maxW={"7xl"}
        id="howitworks"
      >
        <HStack spacing={2}>
          <SkeletonCircle size="4" />
          <Heading as="h2" size="lg">
            Type of users
          </Heading>
        </HStack>
        <Divider marginTop="4" />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
          <FeatureBox
            icon={<Icon as={FcApproval} w={10} h={10} />}
            title={"Verifier"}
            text={
              "Verifier is an external authority eg: an employer who is trying to verify the authenticity of certificate"
            }
          />
          <FeatureBox
            icon={<Icon as={FcBusinessman} w={10} h={10} />}
            title={"Issuer"}
            text={
              "Issuer is an entity that issues the certificate in student's name, eg: University"
            }
          />
          <FeatureBox
            icon={<Icon as={FcManager} w={10} h={10} />}
            title={"Student"}
            text={
              "The person who is enrolled in a university and has a certificate issued by university"
            }
          />
        </SimpleGrid>
      </Container>
    </main>
  );
};

export default ConnectWalletPage;
