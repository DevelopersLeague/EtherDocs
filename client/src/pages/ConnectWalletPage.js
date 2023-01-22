import React, { useEffect } from 'react'
import {
    Heading,
    useBreakpointValue,
    useColorModeValue,
    Button,
    Container,
    SimpleGrid,
    Divider,
    Icon,
    SkeletonCircle,
    HStack,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';
const ConnectWalletPage = () => {
    const navigate = useNavigate()
    const { connect, metaState } = useMetamask();

    useEffect(()=>{
        if (!metaState.isConnected) {
      (async () => {
        try {
          await connect(ethers.providers.Web3Provider);
          console.log(metaState)
        } catch (error) {
          console.log(error);
        }
      })();
    }
    },[])

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
                        // onClick={() => {
                        //         connect(ethers.providers.Web3Provider).then(()=>{

                        //         // navigate("/")
                        //         // window.location.href = "/";
                        //         }).catch(err =>{

                        //         console.log(err);
                        //         })
                        // }}
                    >
                        Connect Wallet
                    </Button>
                {/* </Link> */}
            </Container>


        </main>
    )
}

export default ConnectWalletPage