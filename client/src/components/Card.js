import React from 'react';
import {
    useColorModeValue,
    Text,
    Flex,
    Box,
    Img,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
const Card = ({ name, desc, imageURL, id, path }) => {

    return (
        // pls add a Navlink component
        <Link to={`/${path}/${id}`}>
            <Box
                bg={useColorModeValue("white", "gray.800")}
                maxW={{ md: "sm" }}
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition={"transform 0.3s ease"}
                _hover={{
                    transform: "translateY(-8px)",
                }}
            >
                <Box height="18em">
                    <Img
                        src={imageURL}
                        alt={`Picture of ${name}`}
                        roundedTop="lg"
                        objectFit="cover"
                        w="full"
                        h="full"
                        display="block"
                    />
                </Box>
                <Box p="6">
                    <Flex
                        mt="1"
                        justifyContent="space-between"
                        alignContent="center"
                        py={2}
                    >
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {name}
                        </Box>


                    </Flex>
                    <Flex alignContent="center" py={2}>
                        {" "}
                        <Text size="base">
                            {desc}
                        </Text>
                    </Flex>
                    
                </Box>
            </Box>
        </Link>
    );
};

export default Card;
