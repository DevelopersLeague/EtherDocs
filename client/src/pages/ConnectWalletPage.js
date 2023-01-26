import React, { useEffect } from "react";
import {
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Button,
  Container,
} from "@chakra-ui/react";
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
          Click the button to connect your wallet
        </Heading>
        {/* Navlink will come here */}
        {/* <Link to="/is-registered"> */}
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
    </main>
  );
};

export default ConnectWalletPage;
