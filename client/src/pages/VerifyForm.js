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
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import FileUpload from '../components/FileUpload';

const VerifyForm = () => {

    const [error, setError] = useState("");
    const { handleSubmit, register, control, formState: { isSubmitting, errors } } = useForm({
        mode: "onChange"
    })

    async function onSubmit(data) {
        console.log(
            // data.minimumContribution,
            // data.Issued by,
            // data.description,
            // data.UUID,
            // data.target
        );
    }

    return (
        <>
            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6} my={20}>
                    <Text fontSize={"lg"} color={"teal.400"}>
                        <ArrowBackIcon mr={2} />
                        <Link to="/is-not-registered">Back to Home</Link>
                    </Text>

                    <Stack>
                        <Heading fontSize={"4xl"}>Verify a document 📃</Heading>
                    </Stack>

                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>


                                <FormControl id="Issued_by">
                                    <FormLabel>Issued by</FormLabel>
                                    <Input
                                        {...register("Issued_by", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>

                                <FormControl id="Issued_to">
                                    <FormLabel>Issued to</FormLabel>
                                    <Input
                                        {...register("Issued_to", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>

                                <FormControl id="UUID">
                                    <FormLabel>UUID</FormLabel>
                                    <Input
                                        {...register("UUID", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>

                                <FormControl id="target">
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

                                {errors.minimumContribution || errors.name || errors.description || errors.UUID || errors.target ? (
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
                                        <Button
                                            color={"white"}
                                            bg={"teal.400"}
                                            _hover={{
                                                bg: "teal.300",
                                            }}
                                            onClick={
                                                // () => wallet.connect()
                                                console.log("Hello")
                                            }
                                        >
                                            Submit{" "}
                                        </Button>
                                        <Alert status="warning">
                                            <AlertIcon />
                                            <AlertDescription mr={2}>
                                                Please Connect Your Wallet First to Create a Fund
                                            </AlertDescription>
                                        </Alert>
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

export default VerifyForm