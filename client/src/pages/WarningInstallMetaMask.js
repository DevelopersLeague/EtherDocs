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
const WarningInstallMetaMask = () => {
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
                  You need install MetaMask Wallet
              </Heading>

          </Container>


      </main>
  )
}

export default WarningInstallMetaMask