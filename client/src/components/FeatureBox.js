import React from 'react';
import {
    Flex,
    Text,
    Stack,
    useColorModeValue,
    Center
} from "@chakra-ui/react";

const FeatureBox = ({ title, text, icon }) => {
    return (
        <Stack>
            <Center
                
                justify={"center"}
                align={"center"}
                color={"white"}
                
                mb={1}>
                <Center w={16}
                    rounded={"full"}
                    h={16} bg={useColorModeValue("gray.100", "gray.700")}>
                        {icon}
                </Center>
            </Center>
            <Center
                justify={"center"}
                align={"center"}                
                mb={1}
                >
                <Text fontWeight={600}>{title}</Text>
            </Center>
            <Center justify={"center"}
                align={"center"}                
                mb={1}>
                <Text color={useColorModeValue("gray.500", "gray.200")}>{text}</Text>
            </Center>
        </Stack>
    );
};

export default FeatureBox;
