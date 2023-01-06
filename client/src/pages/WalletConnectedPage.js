import React from 'react';
import FeatureBox from '../components/FeatureBox';
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
    Text
} from "@chakra-ui/react";
import { FcDonate, FcManager, FcFlashOn } from "react-icons/fc";
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import styles from '../styles/Home.module.css'
import data from '../WalletConnectedData';

const WalletConnectedPage = () => {

    return <div>
        <main className={styles.main}>            
            <Container py={{ base: "4", md: "12" }} maxW={"7xl"}>
                <HStack spacing={2}>
                    <SkeletonCircle size="4" />
                    <Heading as="h2" size="lg">
                        Welcome back!
                    </Heading>
                </HStack>

                <Divider marginTop="4" />
                
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={8}>
                    {data.map((fund) => {
                        return (
                            <div key={fund.id}>
                                <Card
                                    name={fund.name}
                                    desc={fund.desc}
                                    imageURL={fund.imageURL}
                                    id={fund.id}
                                    ethPrice="NA"
                                />
                            </div>
                        );
                    })}

                </SimpleGrid>
            </Container>

        </main>
    </div>;
};

export default WalletConnectedPage;
