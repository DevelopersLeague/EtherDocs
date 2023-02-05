import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputRightAddon,
    InputGroup,
    Alert,
    AlertIcon,
    AlertDescription,
    FormHelperText,
    Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import FileUpload from '../components/FileUpload';
import { useMetamask } from '../hooks/useMetamask';
import { getClient } from '../lib/ClientManager'

const IssuerForm = () => {

    const { handleSubmit, register, control, formState: { isSubmitting, errors } } = useForm({
        mode: "onChange"
    })
    const [error, setError] = useState("");
    const { isConnected } = useMetamask();
    const navigate = useNavigate();
    async function onSubmit(data) {
        // console.log(data);
        const client = getClient()
        client.issueCertificate(data.new_address, "UUID1", "hash1", "ipfs_url1").catch((err)=>console.log(err));
    }

    return (
        <>
            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6} my={20}>
                    <Text fontSize={"lg"} color={"teal.400"}>
                        <ArrowBackIcon mr={2} />
                        <Link to="/is-registered/issuer">Go Back</Link>
                    </Text>

                    <Stack>
                        <Heading fontSize={"4xl"}>Issue a new certificate</Heading>
                    </Stack>

                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>


                                <FormControl id="new_name">
                                    <FormLabel>Student Name</FormLabel>
                                    <Input
                                        {...register("new_name", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="new_address">
                                    <FormLabel>Address</FormLabel>
                                    <Input
                                        {...register("new_address", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>

                                <FormControl id="doc">
                                    <FormLabel>File Upload</FormLabel>
                                    <FileUpload name="PDF format"
                                        acceptedFileTypes="application/pdf"
                                        isRequired={true}
                                        placeholder="file_name.pdf"
                                        control={control}>
                                        Only PDF format is acceptable
                                    </FileUpload>

                                </FormControl>

                                {error ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}> {error}</AlertDescription>
                                    </Alert>
                                ) : null}

                                {errors.issuer_name || errors.new_address || errors.doc ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {" "}
                                            All Fields are Required
                                        </AlertDescription>
                                    </Alert>
                                ) : null}

                                <Stack spacing={10}>

                                    {/* conditional rendering if wallet is  connected will come here */}
                                    <Stack spacing={3}>
                                    {isConnected ? (
                                        <Button
                                            color={"white"}
                                            bg={"teal.400"}
                                            _hover={{
                                                bg: "teal.300",
                                            }}
                                            type={'submit'}
                                        >
                                            Submit{" "}
                                        </Button>
                                    
                                        ) : (        
                                            <Alert status="warning">
                                                <AlertIcon />
                                                <AlertDescription mr={2}>
                                                    Please Connect Your Wallet First to Register
                                                </AlertDescription>
                                            </Alert>
                                    )}
                                    </Stack>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </main>
        </>
    )
}

export default IssuerForm